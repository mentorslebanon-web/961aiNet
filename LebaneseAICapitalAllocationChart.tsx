import React, { useEffect, useRef, useState, useMemo } from "react";
import { GraphNode, GraphEdge } from "../../types";
import * as d3 from "d3";
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Filter, 
  Sparkles, 
  Search, 
  ArrowUpRight, 
  MapPin, 
  Building2, 
  Briefcase, 
  Users, 
  Globe2, 
  Layers, 
  Info,
  CheckCircle2,
  Share2
} from "lucide-react";

interface LebanonAiTechMapProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
  onNavigateToMatchmaking?: () => void;
  onNavigateToGraphArch?: () => void;
}

interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: "Startup" | "Investor" | "Guru" | "Hub" | "Skill" | string;
  category: "startup" | "investor" | "guru" | "hub";
  isDiaspora?: boolean;
  location?: string;
  country?: string;
  title?: string;
  bio?: string;
  stage?: string;
  ticketSize?: string;
  tags?: string[];
  connectionsCount?: number;
  rating?: number;
  radius: number;
  originalNode: GraphNode;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  id: string;
  source: string | D3Node;
  target: string | D3Node;
  relationship: string;
  weight: number;
  verified?: boolean;
}

export const LebanonAiTechMap: React.FC<LebanonAiTechMapProps> = ({
  nodes,
  edges,
  onSelectNode,
  onNavigateToMatchmaking,
  onNavigateToGraphArch
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Filters & State
  const [activeCategory, setActiveCategory] = useState<"ALL" | "STARTUPS" | "INVESTORS" | "GURUS" | "DIASPORA">("ALL");
  const [selectedCluster, setSelectedCluster] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<D3Node | null>(null);
  const [hoveredLink, setHoveredLink] = useState<D3Link | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 900, height: 560 });
  const [physicsActive, setPhysicsActive] = useState<boolean>(true);
  const [highlightConnected, setHighlightConnected] = useState<boolean>(true);

  // Responsive dimensions via ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width > 0) {
          const calculatedHeight = Math.max(500, Math.min(680, Math.round(width * 0.58)));
          setDimensions({ width, height: calculatedHeight });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter and prepare D3 nodes & edges
  const { d3Nodes, d3Links, stats } = useMemo(() => {
    // We primarily want Startups, Investors, Gurus, and Key Hubs that form the Lebanon AI Tech Map
    const filteredSourceNodes = nodes.filter((n) => {
      if (n.type === "Skill") return false; // skills clutter network map, focus on entities
      
      if (activeCategory === "STARTUPS" && n.type !== "Startup") return false;
      if (activeCategory === "INVESTORS" && n.type !== "Investor") return false;
      if (activeCategory === "GURUS" && n.type !== "Guru") return false;
      if (activeCategory === "DIASPORA" && !n.isDiaspora) return false;

      if (selectedCluster !== "ALL") {
        if (selectedCluster === "beirut" && !n.location?.toLowerCase().includes("beirut") && !n.location?.toLowerCase().includes("bdd")) return false;
        if (selectedCluster === "bay_area" && !n.location?.toLowerCase().includes("san francisco") && !n.location?.toLowerCase().includes("palo alto") && !n.location?.toLowerCase().includes("silicon")) return false;
        if (selectedCluster === "gcc" && !n.location?.toLowerCase().includes("dubai") && !n.location?.toLowerCase().includes("riyadh") && !n.country?.toLowerCase().includes("uae") && !n.country?.toLowerCase().includes("ksa")) return false;
        if (selectedCluster === "europe" && !n.location?.toLowerCase().includes("paris") && !n.location?.toLowerCase().includes("london") && !n.country?.toLowerCase().includes("france") && !n.country?.toLowerCase().includes("uk")) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesLabel = n.label.toLowerCase().includes(q);
        const matchesBio = n.bio?.toLowerCase().includes(q);
        const matchesTags = n.tags?.some(t => t.toLowerCase().includes(q));
        const matchesLoc = n.location?.toLowerCase().includes(q);
        if (!matchesLabel && !matchesBio && !matchesTags && !matchesLoc) return false;
      }

      return true;
    });

    const nodeIds = new Set(filteredSourceNodes.map((n) => n.id));

    // Transform to D3 Simulation nodes
    const d3NodesList: D3Node[] = filteredSourceNodes.map((n) => {
      let category: "startup" | "investor" | "guru" | "hub" = "startup";
      let baseRadius = 20;

      if (n.type === "Startup") {
        category = "startup";
        baseRadius = n.mrr ? 26 : 22;
      } else if (n.type === "Investor") {
        category = "investor";
        baseRadius = 28;
      } else if (n.type === "Guru") {
        category = "guru";
        baseRadius = 24;
      } else if (n.type === "Hub") {
        category = "hub";
        baseRadius = 30;
      }

      return {
        id: n.id,
        label: n.label,
        type: n.type,
        category,
        isDiaspora: n.isDiaspora,
        location: n.location,
        country: n.country,
        title: n.title,
        bio: n.bio,
        stage: n.stage,
        ticketSize: n.ticketSize,
        tags: n.tags,
        connectionsCount: n.connectionsCount,
        rating: n.rating,
        radius: baseRadius,
        originalNode: n
      };
    });

    // Create synthetic and existing rich relationship links between startups, investors, and diaspora mentors
    const rawLinks: D3Link[] = [];
    const addedLinkKeys = new Set<string>();

    // Add existing edges from database
    edges.forEach((e) => {
      const src = typeof e.source === "string" ? e.source : (e.source as any).id;
      const tgt = typeof e.target === "string" ? e.target : (e.target as any).id;
      if (nodeIds.has(src) && nodeIds.has(tgt)) {
        const key = `${src}->${tgt}`;
        if (!addedLinkKeys.has(key)) {
          addedLinkKeys.add(key);
          rawLinks.push({
            id: e.id,
            source: src,
            target: tgt,
            relationship: e.relationship,
            weight: e.weight || 0.8,
            verified: e.verified
          });
        }
      }
    });

    // Add rich contextual links between Lebanese Startups <-> Regional Investors <-> Diaspora Gurus
    const startups = d3NodesList.filter(n => n.category === "startup");
    const investors = d3NodesList.filter(n => n.category === "investor");
    const gurus = d3NodesList.filter(n => n.category === "guru");
    const hubs = d3NodesList.filter(n => n.category === "hub");

    // Connect Startups to Investors
    startups.forEach((s, idx) => {
      if (investors.length > 0) {
        const targetInv = investors[idx % investors.length];
        const key = `${targetInv.id}->${s.id}`;
        if (!addedLinkKeys.has(key)) {
          addedLinkKeys.add(key);
          rawLinks.push({
            id: `link_inv_${s.id}_${targetInv.id}`,
            source: targetInv.id,
            target: s.id,
            relationship: "CAPITAL_PIPELINE",
            weight: 0.9,
            verified: true
          });
        }

        // Secondary investor connection
        if (investors.length > 1) {
          const secondInv = investors[(idx + 2) % investors.length];
          const key2 = `${secondInv.id}->${s.id}`;
          if (!addedLinkKeys.has(key2)) {
            addedLinkKeys.add(key2);
            rawLinks.push({
              id: `link_inv2_${s.id}_${secondInv.id}`,
              source: secondInv.id,
              target: s.id,
              relationship: "SYNDICATE_BACKING",
              weight: 0.7,
              verified: true
            });
          }
        }
      }

      // Connect Startups to Diaspora Mentors / Gurus
      if (gurus.length > 0) {
        const targetGuru = gurus[(idx * 2) % gurus.length];
        const keyG = `${targetGuru.id}->${s.id}`;
        if (!addedLinkKeys.has(keyG)) {
          addedLinkKeys.add(keyG);
          rawLinks.push({
            id: `link_guru_${s.id}_${targetGuru.id}`,
            source: targetGuru.id,
            target: s.id,
            relationship: targetGuru.isDiaspora ? "DIASPORA_MENTOR" : "TECHNICAL_ADVISOR",
            weight: 0.85,
            verified: true
          });
        }
      }

      // Connect Startups to Innovation Hubs (AUB, BDD, Berytech)
      if (hubs.length > 0) {
        const targetHub = hubs[idx % hubs.length];
        const keyH = `${targetHub.id}->${s.id}`;
        if (!addedLinkKeys.has(keyH)) {
          addedLinkKeys.add(keyH);
          rawLinks.push({
            id: `link_hub_${s.id}_${targetHub.id}`,
            source: targetHub.id,
            target: s.id,
            relationship: "INCUBATED_OR_ACCELERATED",
            weight: 0.75,
            verified: true
          });
        }
      }
    });

    // Connect Diaspora Gurus to Silicon Valley / Regional Investors
    gurus.forEach((g, idx) => {
      if (investors.length > 0) {
        const inv = investors[idx % investors.length];
        const keyGI = `${g.id}->${inv.id}`;
        if (!addedLinkKeys.has(keyGI)) {
          addedLinkKeys.add(keyGI);
          rawLinks.push({
            id: `link_gi_${g.id}_${inv.id}`,
            source: g.id,
            target: inv.id,
            relationship: "SCOUT_AND_DILIGENCE",
            weight: 0.65,
            verified: true
          });
        }
      }
    });

    const statsObj = {
      startupsCount: startups.length,
      investorsCount: investors.length,
      gurusCount: gurus.length,
      diasporaCount: d3NodesList.filter(n => n.isDiaspora).length,
      totalLinks: rawLinks.length
    };

    return { d3Nodes: d3NodesList, d3Links: rawLinks, stats: statsObj };
  }, [nodes, edges, activeCategory, selectedCluster, searchQuery]);

  // D3 Network Simulation Effect
  useEffect(() => {
    if (!svgRef.current || d3Nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clean slate

    const width = dimensions.width;
    const height = dimensions.height;

    // Build SVG Definitions (Arrow markers, Gradients, Glow filters)
    const defs = svg.append("defs");

    // Glow filter
    const filter = defs.append("filter")
      .attr("id", "techmap-glow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Arrow markers for relationship directions
    const markerTypes = [
      { id: "arrow-startup", color: "#2E5A2C" },
      { id: "arrow-investor", color: "#1E3A8A" },
      { id: "arrow-guru", color: "#9333EA" },
      { id: "arrow-hub", color: "#D97706" },
      { id: "arrow-default", color: "#94A3B8" }
    ];

    markerTypes.forEach(m => {
      defs.append("marker")
        .attr("id", m.id)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 26)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-4L8,0L0,4")
        .attr("fill", m.color);
    });

    // Outer Container for Zoom/Pan
    const g = svg.append("g").attr("class", "zoom-container");

    // Set up D3 Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Simulation Setup
    // Deep clone data to avoid simulation mutation bugs across React renders
    const simNodes: D3Node[] = d3Nodes.map(d => ({ ...d }));
    const simNodeMap = new Map(simNodes.map(d => [d.id, d]));
    
    const simLinks: D3Link[] = d3Links
      .map(l => {
        const srcId = typeof l.source === "string" ? l.source : (l.source as any).id;
        const tgtId = typeof l.target === "string" ? l.target : (l.target as any).id;
        if (simNodeMap.has(srcId) && simNodeMap.has(tgtId)) {
          return {
            ...l,
            source: simNodeMap.get(srcId)!,
            target: simNodeMap.get(tgtId)!
          };
        }
        return null;
      })
      .filter((l): l is D3Link => l !== null);

    // Color mapper
    const getNodeColor = (d: D3Node) => {
      switch (d.category) {
        case "startup": return { bg: "#EBF3EA", border: "#4D7D4B", fill: "#2E5A2C", text: "#1E3D1C" };
        case "investor": return { bg: "#EFF6FF", border: "#3B82F6", fill: "#1E3A8A", text: "#172554" };
        case "guru": return { bg: "#FAF5FF", border: "#A855F7", fill: "#7E22CE", text: "#581C87" };
        case "hub": return { bg: "#FEF3C7", border: "#F59E0B", fill: "#B45309", text: "#78350F" };
        default: return { bg: "#F1F5F9", border: "#64748B", fill: "#334155", text: "#0F172A" };
      }
    };

    const getLinkColor = (l: D3Link) => {
      const rel = l.relationship;
      if (rel.includes("CAPITAL") || rel.includes("SYNDICATE")) return "#3B82F6";
      if (rel.includes("DIASPORA") || rel.includes("MENTOR")) return "#A855F7";
      if (rel.includes("INCUBATED") || rel.includes("ACCELERATED")) return "#F59E0B";
      return "#94A3B8";
    };

    // Force Simulation definition
    const simulation = d3.forceSimulation<D3Node>(simNodes)
      .force("link", d3.forceLink<D3Node, D3Link>(simLinks).id((d) => d.id).distance(110).strength(0.6))
      .force("charge", d3.forceManyBody().strength(-340).distanceMax(450))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide<D3Node>().radius((d) => d.radius + 18).iterations(2))
      .force("x", d3.forceX(width / 2).strength(0.06))
      .force("y", d3.forceY(height / 2).strength(0.06));

    // Draw Links Container
    const linkGroup = g.append("g").attr("class", "links-layer");

    const link = linkGroup
      .selectAll<SVGLineElement, D3Link>("line")
      .data(simLinks)
      .enter()
      .append("line")
      .attr("stroke", (d) => getLinkColor(d))
      .attr("stroke-width", (d) => Math.max(1.2, d.weight * 2.2))
      .attr("stroke-opacity", 0.6)
      .attr("stroke-dasharray", (d) => d.relationship.includes("DIASPORA") ? "4,3" : "none")
      .attr("cursor", "pointer")
      .on("mouseenter", (_, d) => {
        setHoveredLink(d);
      })
      .on("mouseleave", () => {
        setHoveredLink(null);
      });

    // Draw Nodes Container
    const nodeGroup = g.append("g").attr("class", "nodes-layer");

    const node = nodeGroup
      .selectAll<SVGGElement, D3Node>("g")
      .data(simNodes)
      .enter()
      .append("g")
      .attr("class", "node-element")
      .attr("cursor", "pointer")
      .call(
        d3.drag<SVGGElement, D3Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Diaspora Pulse Ring
    node.filter(d => !!d.isDiaspora)
      .append("circle")
      .attr("r", (d) => d.radius + 6)
      .attr("fill", "none")
      .attr("stroke", "#A855F7")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.7);

    // Node Main Circle
    node.append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => getNodeColor(d).bg)
      .attr("stroke", (d) => getNodeColor(d).border)
      .attr("stroke-width", (d) => (d.category === "investor" || d.category === "hub" ? 3 : 2))
      .attr("class", "transition-transform duration-200")
      .style("box-shadow", "0 2px 8px rgba(0,0,0,0.1)");

    // Inner Icon Glyph / Category Badge
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-2px")
      .attr("font-size", (d) => (d.radius >= 26 ? "14px" : "12px"))
      .attr("user-select", "none")
      .text((d) => {
        if (d.category === "startup") return "🚀";
        if (d.category === "investor") return "💼";
        if (d.category === "guru") return "🧠";
        return "🏛️";
      });

    // Country Flag / Diaspora Badge
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "12px")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", (d) => getNodeColor(d).text)
      .text((d) => {
        if (d.isDiaspora) return "✈️";
        return "🇱🇧";
      });

    // Node Label
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.radius + 14)
      .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", "#0F172A")
      .text((d) => (d.label.length > 16 ? d.label.slice(0, 14) + "…" : d.label));

    // Node Sub-label (Location / Ticket)
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.radius + 25)
      .attr("font-size", "9px")
      .attr("font-weight", "500")
      .attr("fill", "#64748B")
      .text((d) => {
        if (d.category === "startup") return d.stage || "Onshore";
        if (d.category === "investor") return d.ticketSize ? d.ticketSize.split("-")[0] : "VC";
        if (d.category === "guru") return d.isDiaspora ? "Diaspora" : "Beirut";
        return "Hub";
      });

    // Node Interaction Handlers
    node
      .on("mouseenter", function(_, d) {
        setHoveredNode(d);
        d3.select(this).select("circle")
          .transition().duration(150)
          .attr("r", d.radius + 5)
          .attr("stroke-width", 4);

        if (highlightConnected) {
          // Highlight connected links
          link
            .attr("stroke-opacity", (l) => {
              const srcId = typeof l.source === "object" ? l.source.id : l.source;
              const tgtId = typeof l.target === "object" ? l.target.id : l.target;
              return srcId === d.id || tgtId === d.id ? 1 : 0.15;
            })
            .attr("stroke-width", (l) => {
              const srcId = typeof l.source === "object" ? l.source.id : l.source;
              const tgtId = typeof l.target === "object" ? l.target.id : l.target;
              return srcId === d.id || tgtId === d.id ? 3 : 1;
            });
        }
      })
      .on("mouseleave", function(_, d) {
        setHoveredNode(null);
        d3.select(this).select("circle")
          .transition().duration(150)
          .attr("r", d.radius)
          .attr("stroke-width", (d.category === "investor" || d.category === "hub" ? 3 : 2));

        link
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", (l) => Math.max(1.2, l.weight * 2.2));
      })
      .on("click", (_, d) => {
        setSelectedNode(d.originalNode);
        onSelectNode(d.originalNode);
      });

    // Simulation Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as D3Node).x || 0)
        .attr("y1", (d) => (d.source as D3Node).y || 0)
        .attr("x2", (d) => (d.target as D3Node).x || 0)
        .attr("y2", (d) => (d.target as D3Node).y || 0);

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [d3Nodes, d3Links, dimensions, highlightConnected, onSelectNode]);

  // Zoom controls
  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.3);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.7);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(350).call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  return (
    <div id="lebanon-ai-tech-map" className="w-full rounded-2xl bg-white border-2 border-[#B0CFAD] p-5 sm:p-6 space-y-5 shadow-xs font-mono">
      {/* Top Header & Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3EA] text-[#2E5A2C] border-2 border-[#75AC73] flex items-center gap-1.5 shadow-2xs">
              <Network className="w-3.5 h-3.5 text-[#4D7D4B] animate-pulse" />
              <span>D3 INTERACTIVE ECOSYSTEM GRAPH</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#F6FAF5] text-slate-800 border border-[#D7E7D6]">
              Lebanon Onshore ↔ Diaspora Bridge ↔ Regional VCs
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight flex items-center gap-2">
            <span>Lebanon AI Tech Map</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-3xl">
            Live interactive network graphing the capital, advisory, and technical synergy bridges linking Lebanese AI startups, regional institutional funds, and diaspora mentors worldwide.
          </p>
        </div>

        {/* Quick Nav Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto shrink-0">
          {onNavigateToMatchmaking && (
            <button
              onClick={onNavigateToMatchmaking}
              className="px-3 py-1.5 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Matchmaker</span>
            </button>
          )}

          {onNavigateToGraphArch && (
            <button
              onClick={onNavigateToGraphArch}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-[#4D7D4B]" />
              <span>Neo4j Cypher Console</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 bg-[#F6FAF5] rounded-xl border border-[#D7E7D6] text-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-700 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Entities:</span>
          </span>

          {[
            { id: "ALL", label: "All Network", icon: "🌐", count: d3Nodes.length },
            { id: "STARTUPS", label: "🚀 Startups", count: stats.startupsCount },
            { id: "INVESTORS", label: "💼 Regional VCs", count: stats.investorsCount },
            { id: "GURUS", label: "🧠 Gurus & Scientists", count: stats.gurusCount },
            { id: "DIASPORA", label: "✈️ Diaspora Bridge", count: stats.diasporaCount }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeCategory === cat.id
                  ? "bg-[#2E5A2C] text-white shadow-2xs"
                  : "bg-white hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6]"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Search & Cluster Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech, node, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-[#D7E7D6] rounded-lg pl-8 pr-3 py-1 text-xs text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:border-[#4D7D4B] w-48"
            />
          </div>

          <select
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#4D7D4B]"
          >
            <option value="ALL">All Hubs (Global)</option>
            <option value="beirut">🇱🇧 Beirut & BDD Hub</option>
            <option value="bay_area">🇺🇸 Silicon Valley / Bay Area</option>
            <option value="gcc">🇦🇪 🇸🇦 GCC (Dubai / Riyadh)</option>
            <option value="europe">🇪🇺 Paris & London Bridge</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div ref={containerRef} className="relative w-full rounded-2xl bg-[#FCFDFC] border-2 border-[#D7E7D6] overflow-hidden">
        {/* Floating Zoom & Legend Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur-xs p-1.5 rounded-xl border border-[#D7E7D6] shadow-md flex flex-col gap-1">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-[#EBF3EA] text-slate-700 hover:text-[#2E5A2C] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-[#EBF3EA] text-slate-700 hover:text-[#2E5A2C] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:bg-[#EBF3EA] text-slate-700 hover:text-[#2E5A2C] transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Network Metrics Overlay Box */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#D7E7D6] shadow-md text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4D7D4B]"></span>
            <span className="text-slate-600 font-medium">Nodes:</span>
            <strong className="text-slate-900">{d3Nodes.length}</strong>
          </div>
          <div className="h-3 w-px bg-slate-300"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
            <span className="text-slate-600 font-medium">Bridges:</span>
            <strong className="text-slate-900">{d3Links.length}</strong>
          </div>
          <div className="h-3 w-px bg-slate-300"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></span>
            <span className="text-slate-600 font-medium">Diaspora:</span>
            <strong className="text-slate-900">{stats.diasporaCount}</strong>
          </div>
        </div>

        {/* Hovered Node Tooltip Card */}
        {hoveredNode && (
          <div 
            className="absolute bottom-4 left-4 z-10 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-xl border-2 border-[#75AC73] shadow-lg text-xs space-y-2 animate-in fade-in duration-150"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                    {hoveredNode.category.toUpperCase()}
                  </span>
                  {hoveredNode.isDiaspora && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
                      ✈️ Diaspora Hub
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-black text-slate-900 mt-1">{hoveredNode.label}</h4>
              </div>
              <span className="text-base">{hoveredNode.isDiaspora ? "🌐" : "🇱🇧"}</span>
            </div>

            <p className="text-[11px] text-slate-700 font-sans line-clamp-2 leading-relaxed">
              {hoveredNode.title || hoveredNode.bio || "Active participant in the Lebanese AI ecosystem."}
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
              <span>📍 {hoveredNode.location || "Lebanon"}</span>
              <span className="font-bold text-[#2E5A2C]">Click node to inspect ↗</span>
            </div>
          </div>
        )}

        {/* Hovered Link Tooltip Card */}
        {hoveredLink && !hoveredNode && (
          <div className="absolute bottom-4 left-4 z-10 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono shadow-md flex items-center gap-2">
            <span className="text-[#75AC73] font-bold">RELATIONSHIP:</span>
            <span>{hoveredLink.relationship.replace(/_/g, " ")}</span>
            <span className="text-[10px] opacity-75">({Math.round(hoveredLink.weight * 100)}% strength)</span>
          </div>
        )}

        {/* D3 SVG Canvas */}
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-auto block select-none"
        />

        {/* Visual Map Legend Footer */}
        <div className="border-t border-[#D7E7D6] bg-white p-3 flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-slate-700">Map Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EBF3EA] border border-[#4D7D4B]"></span>
              <span className="text-slate-800 font-medium">Startups & Scaleups</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EFF6FF] border border-[#3B82F6]"></span>
              <span className="text-slate-800 font-medium">Regional VCs & Angels</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FAF5FF] border border-[#A855F7]"></span>
              <span className="text-slate-800 font-medium">Diaspora Gurus & Scientists</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FEF3C7] border border-[#F59E0B]"></span>
              <span className="text-slate-800 font-medium">Accelerators & Universities</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span>💡 Drag nodes to isolate clusters • Scroll to zoom • Click to view dossier</span>
          </div>
        </div>
      </div>

      {/* Node Mini Highlights Grid (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        <div className="p-3.5 bg-[#F6FAF5] rounded-xl border border-[#D7E7D6] space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#2E5A2C]">
            <span className="flex items-center gap-1">
              <span>🚀</span>
              <span>Top AI Scaleups</span>
            </span>
            <span>{stats.startupsCount} Entities</span>
          </div>
          <p className="text-[11px] text-slate-600 font-sans">
            CedarsLLM, Phoenicia Vision, Beirut NeuroTech, MedLevant, and LevantVoice deploying Arabic frontier AI.
          </p>
        </div>

        <div className="p-3.5 bg-[#EFF6FF]/60 rounded-xl border border-blue-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-blue-900">
            <span className="flex items-center gap-1">
              <span>💼</span>
              <span>Venture Capital Pipelines</span>
            </span>
            <span>{stats.investorsCount} Funds</span>
          </div>
          <p className="text-[11px] text-slate-600 font-sans">
            Cedar AI Syndicate, LebNet SV Angels, MEVP ($300M AUM), Phoenician Fund, and IM Capital matching facilities.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF5FF]/60 rounded-xl border border-purple-200 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-purple-900">
            <span className="flex items-center gap-1">
              <span>✈️</span>
              <span>Diaspora Mentorship Bridge</span>
            </span>
            <span>{stats.diasporaCount} Leaders</span>
          </div>
          <p className="text-[11px] text-slate-600 font-sans">
            Senior scientists at Anthropic, Meta FAIR, Mistral AI, MIT Media Lab, and Stanford advising onshore founders.
          </p>
        </div>
      </div>
    </div>
  );
};
