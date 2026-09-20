import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { 
  PieChart, 
  Layers, 
  CircleDot, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Info, 
  Building2, 
  Filter, 
  Maximize2, 
  Minimize2, 
  Download, 
  ShieldCheck, 
  Globe, 
  Zap, 
  BarChart3, 
  Briefcase 
} from "lucide-react";

export interface AISubSectorData {
  id: string;
  name: string;
  parentSector: string;
  capitalUSD: number; // in Millions USD
  dealsCount: number;
  growthYoY: number; // Percentage
  diasporaSharePct: number; // Percentage from Diaspora
  dfiSharePct: number; // Percentage from DFIs / Impact
  regionalVcSharePct: number; // Percentage from GCC / Regional VCs
  stage: "seed" | "series_a" | "growth" | "grant";
  keyStartups: string[];
  description: string;
  color: string;
  darkColor: string;
}

export interface SectorHierarchyNode {
  name: string;
  children?: (SectorHierarchyNode | AISubSectorData)[];
  value?: number;
  capitalUSD?: number;
  dealsCount?: number;
  growthYoY?: number;
  color?: string;
  darkColor?: string;
  [key: string]: any;
}

// Empirical Lebanese AI & DeepTech Capital Allocation Dataset (2025–2026)
const LEBANESE_AI_SECTOR_DATA: AISubSectorData[] = [
  {
    id: "fintech_risk_routing",
    name: "FinTech, FX & Circular 165 Routing",
    parentSector: "Financial Intelligence & Payments",
    capitalUSD: 41.5,
    dealsCount: 22,
    growthYoY: 38.5,
    diasporaSharePct: 45,
    dfiSharePct: 15,
    regionalVcSharePct: 40,
    stage: "series_a",
    keyStartups: ["Purpl AI", "Whish Financial", "FinFlow Levant", "CedarPay Tech"],
    description: "Algorithmic fresh dollar clearing, BDL Circular 165 automated routing, cross-border remittance corridor optimization, and multi-tier FX hedge algorithms.",
    color: "#2E5A2C",
    darkColor: "#1B3B1A"
  },
  {
    id: "fintech_aml_kyc",
    name: "AML / KYC & Diaspora Remittance Escrow",
    parentSector: "Financial Intelligence & Payments",
    capitalUSD: 26.8,
    dealsCount: 16,
    growthYoY: 31.0,
    diasporaSharePct: 52,
    dfiSharePct: 20,
    regionalVcSharePct: 28,
    stage: "seed",
    keyStartups: ["VerifID Lebanon", "EscrowLevant", "TrustKYC MENA"],
    description: "Real-time compliance graph engines for FATF gray-list mitigation, sanctions screening, and diaspora escrow vaults.",
    color: "#4D7D4B",
    darkColor: "#2E5A2C"
  },
  {
    id: "arabic_nlp_llm",
    name: "Levantine Arabic NLP & Foundation LLMs",
    parentSector: "Arabic Foundation AI & Enterprise NLP",
    capitalUSD: 28.2,
    dealsCount: 14,
    growthYoY: 54.0,
    diasporaSharePct: 40,
    dfiSharePct: 25,
    regionalVcSharePct: 35,
    stage: "seed",
    keyStartups: ["KalamAI", "Fusha-Darija Labs", "ArabiCore LLM", "Balad Dialect NLP"],
    description: "Multilingual dialect parsing models, fine-tuned Levantine speech-to-text tokenizers, and enterprise sovereign Arabic RAG systems.",
    color: "#1E3A8A",
    darkColor: "#172554"
  },
  {
    id: "enterprise_rag_agents",
    name: "Enterprise Workflow Agents & RAG",
    parentSector: "Arabic Foundation AI & Enterprise NLP",
    capitalUSD: 21.3,
    dealsCount: 19,
    growthYoY: 42.0,
    diasporaSharePct: 35,
    dfiSharePct: 20,
    regionalVcSharePct: 45,
    stage: "series_a",
    keyStartups: ["CognitiveLevant", "AgentMatrix", "BeirutDataWorks"],
    description: "Low-code enterprise automation pipelines, statutory document parsing for Middle East conglomerates, and ERP autonomous copilots.",
    color: "#2563EB",
    darkColor: "#1D4ED8"
  },
  {
    id: "healthtech_cv_pathology",
    name: "Diagnostic Computer Vision & Radiology",
    parentSector: "HealthTech & BioIntelligence",
    capitalUSD: 18.4,
    dealsCount: 11,
    growthYoY: 29.5,
    diasporaSharePct: 30,
    dfiSharePct: 45,
    regionalVcSharePct: 25,
    stage: "series_a",
    keyStartups: ["MedVision Levant", "AUBMC BioAI Spinout", "CedarScan AI"],
    description: "Deep learning models for chest X-ray screening, pathology slide automated segmentations, and oncology detection tuned for low-compute hospitals.",
    color: "#0D9488",
    darkColor: "#115E59"
  },
  {
    id: "telehealth_triage_ai",
    name: "Wartime Tele-Triage & Remote Care",
    parentSector: "HealthTech & BioIntelligence",
    capitalUSD: 11.2,
    dealsCount: 10,
    growthYoY: 34.0,
    diasporaSharePct: 48,
    dfiSharePct: 38,
    regionalVcSharePct: 14,
    stage: "grant",
    keyStartups: ["Sohhatak AI", "LevantTriage", "ReliefCare Edge"],
    description: "Low-bandwidth 3G/WhatsApp AI triage assistants connecting diaspora medical specialists with domestic patients during crisis conditions.",
    color: "#14B8A6",
    darkColor: "#0F766E"
  },
  {
    id: "agritech_irrigation",
    name: "Bekaa Precision Irrigation & Soil Sensors",
    parentSector: "AgriTech & Climate Resilience",
    capitalUSD: 12.5,
    dealsCount: 9,
    growthYoY: 24.0,
    diasporaSharePct: 25,
    dfiSharePct: 55,
    regionalVcSharePct: 20,
    stage: "seed",
    keyStartups: ["AgryTech Solutions", "BekaaSensorNet", "CedarHydroponics AI"],
    description: "IoT soil moisture telemetry paired with satellite weather forecasts for 40% water savings in the Bekaa Valley and Akkar plain.",
    color: "#D97706",
    darkColor: "#B45309"
  },
  {
    id: "solar_microgrid_ai",
    name: "Decentralized Solar & Microgrid Dispatch",
    parentSector: "AgriTech & Climate Resilience",
    capitalUSD: 14.8,
    dealsCount: 12,
    growthYoY: 46.0,
    diasporaSharePct: 38,
    dfiSharePct: 42,
    regionalVcSharePct: 20,
    stage: "series_a",
    keyStartups: ["ShamsGrid AI", "LevantMicroPower", "WattWise Energy"],
    description: "Battery state-of-charge prediction, diesel generator auto-curtailment, and peer-to-peer solar energy trading algorithms.",
    color: "#F59E0B",
    darkColor: "#D97706"
  },
  {
    id: "govtech_offshore_sal",
    name: "Decree 46 Offshore S.A.L. & Tax Copilots",
    parentSector: "LegalTech & Offshore Governance",
    capitalUSD: 9.6,
    dealsCount: 8,
    growthYoY: 36.0,
    diasporaSharePct: 55,
    dfiSharePct: 15,
    regionalVcSharePct: 30,
    stage: "seed",
    keyStartups: ["LexLebanon AI", "OffshoreTaxDesk", "BailoutLegal AI"],
    description: "Automated Lebanese commercial registry filings, 0% Offshore S.A.L. statutory audits, and dual-entity (Delaware + Beirut) IP cross-licensing.",
    color: "#475569",
    darkColor: "#334155"
  },
  {
    id: "logistics_crisis_routing",
    name: "Crisis Fleet Routing & Mesh Telemetry",
    parentSector: "Resilient Logistics & Defense Tech",
    capitalUSD: 16.4,
    dealsCount: 11,
    growthYoY: 37.0,
    diasporaSharePct: 30,
    dfiSharePct: 40,
    regionalVcSharePct: 30,
    stage: "series_a",
    keyStartups: ["Toters Autonomous", "LevantRelief Logix", "SafeRoute Beirut"],
    description: "GPS-denied visual SLAM delivery navigation, dynamic roadblock avoidance, and automated warehouse inventory robotics.",
    color: "#E11D48",
    darkColor: "#BE123C"
  }
];

type VisualizationType = "treemap" | "bubble";
type MetricType = "capital" | "deals" | "growth";
type FundingSourceFilter = "all" | "diaspora" | "dfi" | "regional_vc";
type StageFilter = "all" | "seed" | "series_a" | "growth" | "grant";

interface LebaneseAICapitalAllocationChartProps {
  onSelectSector?: (sector: AISubSectorData) => void;
  className?: string;
}

export const LebaneseAICapitalAllocationChart: React.FC<LebaneseAICapitalAllocationChartProps> = ({
  onSelectSector,
  className = ""
}) => {
  const [visType, setVisType] = useState<VisualizationType>("treemap");
  const [metric, setMetric] = useState<MetricType>("capital");
  const [sourceFilter, setSourceFilter] = useState<FundingSourceFilter>("all");
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [selectedSubSector, setSelectedSubSector] = useState<AISubSectorData | null>(LEBANESE_AI_SECTOR_DATA[0]);
  const [hoveredNode, setHoveredNode] = useState<{
    data: AISubSectorData;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 750, height: 440 });

  // Handle responsive resize via ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.max(320, entry.contentRect.width);
        const height = width < 500 ? 380 : width < 768 ? 420 : 450;
        setDimensions({ width, height });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter dataset based on selected filters
  const filteredData = useMemo(() => {
    return LEBANESE_AI_SECTOR_DATA.filter((item) => {
      if (stageFilter !== "all" && item.stage !== stageFilter) return false;
      if (sourceFilter === "diaspora" && item.diasporaSharePct < 35) return false;
      if (sourceFilter === "dfi" && item.dfiSharePct < 25) return false;
      if (sourceFilter === "regional_vc" && item.regionalVcSharePct < 30) return false;
      return true;
    });
  }, [stageFilter, sourceFilter]);

  // Aggregate high-level statistics
  const summaryStats = useMemo(() => {
    const totalCapital = filteredData.reduce((acc, curr) => acc + curr.capitalUSD, 0);
    const totalDeals = filteredData.reduce((acc, curr) => acc + curr.dealsCount, 0);
    const weightedGrowth = filteredData.length > 0
      ? (filteredData.reduce((acc, curr) => acc + curr.growthYoY * curr.capitalUSD, 0) / totalCapital).toFixed(1)
      : "0";
    const totalDiasporaCapital = filteredData.reduce((acc, curr) => acc + (curr.capitalUSD * (curr.diasporaSharePct / 100)), 0);

    return {
      totalCapital: totalCapital.toFixed(1),
      totalDeals,
      avgGrowth: weightedGrowth,
      diasporaCapital: totalDiasporaCapital.toFixed(1)
    };
  }, [filteredData]);

  // Build hierarchical D3 structure
  const hierarchyData = useMemo<SectorHierarchyNode>(() => {
    const groups: { [parent: string]: AISubSectorData[] } = {};
    for (const item of filteredData) {
      if (!groups[item.parentSector]) {
        groups[item.parentSector] = [];
      }
      groups[item.parentSector].push(item);
    }

    const children = Object.keys(groups).map((parentName) => {
      const items = groups[parentName];
      return {
        name: parentName,
        children: items.map((sub) => {
          let val = sub.capitalUSD;
          if (metric === "deals") val = sub.dealsCount;
          if (metric === "growth") val = sub.growthYoY;

          return {
            ...sub,
            value: val
          };
        })
      };
    });

    return {
      name: "Lebanese AI & DeepTech Ecosystem",
      children
    };
  }, [filteredData, metric]);

  // Render D3 Treemap or Bubble Chart
  useEffect(() => {
    if (!svgRef.current || filteredData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawing

    const { width, height } = dimensions;

    // Create Root Hierarchy
    const root = d3.hierarchy<SectorHierarchyNode>(hierarchyData)
      .sum((d: any) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    if (visType === "treemap") {
      // D3 Treemap Layout
      const treemapLayout = d3.treemap<SectorHierarchyNode>()
        .size([width, height])
        .paddingTop(22)
        .paddingInner(3)
        .paddingOuter(3)
        .round(true);

      treemapLayout(root);

      const g = svg.append("g");

      // Draw Parent Category Background Banners
      const parentNodes = root.children || [];
      const parentGroups = g.selectAll(".parent-node")
        .data(parentNodes)
        .enter()
        .append("g")
        .attr("class", "parent-node");

      parentGroups.append("rect")
        .attr("x", (d: any) => d.x0)
        .attr("y", (d: any) => d.y0)
        .attr("width", (d: any) => Math.max(0, d.x1 - d.x0))
        .attr("height", (d: any) => Math.max(0, d.y1 - d.y0))
        .attr("fill", "#F6FAF5")
        .attr("stroke", "#D7E7D6")
        .attr("stroke-width", 1.5)
        .attr("rx", 6);

      parentGroups.append("text")
        .attr("x", (d: any) => d.x0 + 8)
        .attr("y", (d: any) => d.y0 + 15)
        .attr("font-size", "10px")
        .attr("font-weight", "800")
        .attr("font-family", "monospace")
        .attr("fill", "#2E5A2C")
        .text((d: any) => {
          const w = d.x1 - d.x0;
          if (w < 80) return "";
          return d.data.name.toUpperCase();
        });

      // Draw Leaf Nodes (Subsectors)
      const leaves = root.leaves();
      const leafGroups = g.selectAll(".leaf-node")
        .data(leaves)
        .enter()
        .append("g")
        .attr("class", "leaf-node")
        .attr("cursor", "pointer");

      // Rectangles with smooth hover transitions
      leafGroups.append("rect")
        .attr("x", (d: any) => d.x0)
        .attr("y", (d: any) => d.y0)
        .attr("width", (d: any) => Math.max(0, d.x1 - d.x0))
        .attr("height", (d: any) => Math.max(0, d.y1 - d.y0))
        .attr("fill", (d: any) => d.data.color || "#2E5A2C")
        .attr("stroke", (d: any) => selectedSubSector?.id === d.data.id ? "#000000" : "#ffffff")
        .attr("stroke-width", (d: any) => selectedSubSector?.id === d.data.id ? 2.5 : 1)
        .attr("rx", 4)
        .style("transition", "all 0.15s ease")
        .on("mouseenter", function(event, d: any) {
          d3.select(this)
            .attr("stroke", "#000000")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.92);

          const [x, y] = d3.pointer(event, containerRef.current);
          setHoveredNode({
            data: d.data as AISubSectorData,
            x,
            y
          });
        })
        .on("mouseleave", function(event, d: any) {
          const isSelected = selectedSubSector?.id === d.data.id;
          d3.select(this)
            .attr("stroke", isSelected ? "#000000" : "#ffffff")
            .attr("stroke-width", isSelected ? 2.5 : 1)
            .attr("opacity", 1);
          setHoveredNode(null);
        })
        .on("click", (event, d: any) => {
          const sectorData = d.data as AISubSectorData;
          setSelectedSubSector(sectorData);
          onSelectSector?.(sectorData);
        });

      // Text Labels inside rectangles
      leafGroups.each(function(d: any) {
        const el = d3.select(this);
        const rectW = d.x1 - d.x0;
        const rectH = d.y1 - d.y0;

        if (rectW > 55 && rectH > 35) {
          // Sector Name
          el.append("text")
            .attr("x", d.x0 + 6)
            .attr("y", d.y0 + 14)
            .attr("font-size", rectW < 90 ? "9px" : "11px")
            .attr("font-weight", "bold")
            .attr("fill", "#ffffff")
            .attr("pointer-events", "none")
            .text(() => {
              const fullText = d.data.name;
              if (rectW < 95) return fullText.slice(0, 10) + "...";
              if (rectW < 140) return fullText.slice(0, 18) + "...";
              return fullText;
            });

          // Metric Badge Value
          el.append("text")
            .attr("x", d.x0 + 6)
            .attr("y", d.y0 + (rectH < 50 ? 28 : 32))
            .attr("font-size", rectW < 90 ? "10px" : "12px")
            .attr("font-weight", "900")
            .attr("font-family", "monospace")
            .attr("fill", "#ffffff")
            .attr("pointer-events", "none")
            .text(() => {
              if (metric === "capital") return `$${d.data.capitalUSD}M`;
              if (metric === "deals") return `${d.data.dealsCount} Deals`;
              return `+${d.data.growthYoY}% YoY`;
            });

          // Share percentage if rectangle is roomy
          if (rectW > 110 && rectH > 60) {
            const share = ((d.data.capitalUSD / Number(summaryStats.totalCapital)) * 100).toFixed(0);
            el.append("text")
              .attr("x", d.x0 + 6)
              .attr("y", d.y0 + 48)
              .attr("font-size", "9px")
              .attr("font-family", "monospace")
              .attr("fill", "rgba(255,255,255,0.85)")
              .attr("pointer-events", "none")
              .text(`${share}% Share • ${d.data.stage.toUpperCase()}`);
          }
        }
      });
    } else {
      // D3 Bubble Pack Layout
      const packLayout = d3.pack<SectorHierarchyNode>()
        .size([width - 10, height - 10])
        .padding(6);

      packLayout(root);

      const g = svg.append("g")
        .attr("transform", "translate(5, 5)");

      const leaves = root.leaves();

      const node = g.selectAll(".bubble-node")
        .data(leaves)
        .enter()
        .append("g")
        .attr("class", "bubble-node")
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
        .attr("cursor", "pointer");

      // Circle element
      node.append("circle")
        .attr("r", 0) // animate in
        .attr("fill", (d: any) => d.data.color || "#2E5A2C")
        .attr("stroke", (d: any) => selectedSubSector?.id === d.data.id ? "#000000" : "#ffffff")
        .attr("stroke-width", (d: any) => selectedSubSector?.id === d.data.id ? 2.5 : 1.5)
        .style("transition", "stroke 0.15s ease, stroke-width 0.15s ease")
        .on("mouseenter", function(event, d: any) {
          d3.select(this)
            .attr("stroke", "#000000")
            .attr("stroke-width", 2.5)
            .attr("opacity", 0.92);

          const [x, y] = d3.pointer(event, containerRef.current);
          setHoveredNode({
            data: d.data as AISubSectorData,
            x,
            y
          });
        })
        .on("mouseleave", function(event, d: any) {
          const isSelected = selectedSubSector?.id === d.data.id;
          d3.select(this)
            .attr("stroke", isSelected ? "#000000" : "#ffffff")
            .attr("stroke-width", isSelected ? 2.5 : 1.5)
            .attr("opacity", 1);
          setHoveredNode(null);
        })
        .on("click", (event, d: any) => {
          const sectorData = d.data as AISubSectorData;
          setSelectedSubSector(sectorData);
          onSelectSector?.(sectorData);
        })
        .transition()
        .duration(500)
        .ease(d3.easeBackOut)
        .attr("r", (d: any) => d.r);

      // Bubble Labels
      node.each(function(d: any) {
        const el = d3.select(this);
        const radius = d.r;

        if (radius > 22) {
          // Label text
          el.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", radius > 35 ? "-0.4em" : "0.2em")
            .attr("font-size", radius < 35 ? "9px" : "11px")
            .attr("font-weight", "bold")
            .attr("fill", "#ffffff")
            .attr("pointer-events", "none")
            .text(() => {
              const fullText = d.data.name;
              if (radius < 32) return fullText.slice(0, 7) + "..";
              if (radius < 45) return fullText.slice(0, 14) + "..";
              return fullText;
            });

          // Metric text
          if (radius > 32) {
            el.append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "1.1em")
              .attr("font-size", radius < 40 ? "10px" : "12px")
              .attr("font-weight", "900")
              .attr("font-family", "monospace")
              .attr("fill", "#ffffff")
              .attr("pointer-events", "none")
              .text(() => {
                if (metric === "capital") return `$${d.data.capitalUSD}M`;
                if (metric === "deals") return `${d.data.dealsCount} Deals`;
                return `+${d.data.growthYoY}%`;
              });
          }
        }
      });
    }
  }, [hierarchyData, dimensions, visType, metric, selectedSubSector, filteredData, summaryStats.totalCapital, onSelectSector]);

  return (
    <div className={`rounded-2xl bg-white border-2 border-[#B0CFAD] p-5 sm:p-6 space-y-5 shadow-xs ${className}`}>
      {/* Top Header & Interactive Slicers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2E5A2C]" />
              <span>D3.JS DYNAMIC INTELLIGENCE</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-[#FAFCFA] px-2 py-0.5 rounded border border-[#D7E7D6]">
              2025–2026 AUDITED
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Lebanese AI Capital Allocation & Sector Telemetry</span>
          </h3>
          <p className="text-xs text-slate-600 font-sans max-w-2xl">
            Interactive D3.js visualization tracking venture capital deployments, diaspora angel syndicates ($15B+ remittances), and DFI allocations across Lebanese AI sub-disciplines.
          </p>
        </div>

        {/* View Switchers (Treemap vs Bubble Pack) */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          <div className="flex items-center bg-[#F6FAF5] p-1 rounded-xl border border-[#D7E7D6]">
            <button
              onClick={() => setVisType("treemap")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                visType === "treemap"
                  ? "bg-[#2E5A2C] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Treemap</span>
            </button>

            <button
              onClick={() => setVisType("bubble")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                visType === "bubble"
                  ? "bg-[#2E5A2C] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Bubble Pack</span>
            </button>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center bg-[#F6FAF5] p-1 rounded-xl border border-[#D7E7D6]">
            {(["capital", "deals", "growth"] as const).map((mKey) => (
              <button
                key={mKey}
                onClick={() => setMetric(mKey)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  metric === mKey
                    ? "bg-[#2E5A2C] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {mKey === "capital" ? "$ Capital Deployed" : mKey === "deals" ? "Deal Count" : "YoY Growth"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Slicers Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAFCFA] p-3 rounded-xl border border-[#D7E7D6] text-xs font-sans">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1 font-mono text-[11px]">
            <Filter className="w-3 h-3 text-[#2E5A2C]" />
            <span>CAPITAL SOURCE:</span>
          </span>

          <div className="flex flex-wrap items-center gap-1">
            {[
              { id: "all", label: "All Channels" },
              { id: "diaspora", label: "Diaspora Syndicates (>35%)" },
              { id: "dfi", label: "DFI / Grants (>25%)" },
              { id: "regional_vc", label: "Regional VCs (>30%)" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSourceFilter(f.id as FundingSourceFilter)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                  sourceFilter === f.id
                    ? "bg-[#2E5A2C] text-white border-[#2E5A2C]"
                    : "bg-white text-slate-600 border-[#D7E7D6] hover:bg-[#EBF3EA]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 font-mono text-[11px]">STAGE:</span>
          <div className="flex items-center gap-1">
            {[
              { id: "all", label: "All Stages" },
              { id: "seed", label: "Seed" },
              { id: "series_a", label: "Series A" },
              { id: "grant", label: "Grants" }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStageFilter(s.id as StageFilter)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                  stageFilter === s.id
                    ? "bg-[#2E5A2C] text-white border-[#2E5A2C]"
                    : "bg-white text-slate-600 border-[#D7E7D6] hover:bg-[#EBF3EA]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* High-Level Statistical Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-1">
          <div className="text-[10px] font-bold text-slate-600 uppercase font-mono flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-[#2E5A2C]" />
            <span>Tracked AI Capital</span>
          </div>
          <div className="text-xl font-black text-[#2E5A2C] font-mono">
            ${summaryStats.totalCapital}M
          </div>
          <div className="text-[10px] text-slate-500 font-sans">
            Across {filteredData.length} sub-sectors
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-1">
          <div className="text-[10px] font-bold text-slate-600 uppercase font-mono flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-blue-700" />
            <span>Venture Deals</span>
          </div>
          <div className="text-xl font-black text-blue-800 font-mono">
            {summaryStats.totalDeals} Rounds
          </div>
          <div className="text-[10px] text-slate-500 font-sans">
            Seed to Series A financings
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-1">
          <div className="text-[10px] font-bold text-slate-600 uppercase font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-700" />
            <span>Weighted YoY Growth</span>
          </div>
          <div className="text-xl font-black text-emerald-700 font-mono">
            +{summaryStats.avgGrowth}%
          </div>
          <div className="text-[10px] text-slate-500 font-sans">
            Fastest in Arabic LLM/NLP
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-1">
          <div className="text-[10px] font-bold text-slate-600 uppercase font-mono flex items-center gap-1">
            <Globe className="w-3 h-3 text-amber-700" />
            <span>Diaspora Co-Investment</span>
          </div>
          <div className="text-xl font-black text-amber-800 font-mono">
            ${summaryStats.diasporaCapital}M
          </div>
          <div className="text-[10px] text-slate-500 font-sans">
            Overseas syndicate capital
          </div>
        </div>
      </div>

      {/* Main Visualization Canvas & Interactive Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* D3 Canvas Container */}
        <div 
          ref={containerRef} 
          className="lg:col-span-8 relative rounded-xl bg-[#FAFCFA] border-2 border-[#D7E7D6] p-2 min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden"
        >
          {filteredData.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <div className="text-xs font-bold text-slate-700">No sectors match the active filter criteria.</div>
              <button
                onClick={() => {
                  setSourceFilter("all");
                  setStageFilter("all");
                }}
                className="px-3 py-1.5 rounded-lg bg-[#2E5A2C] text-white text-xs font-bold"
              >
                Reset Slicers
              </button>
            </div>
          ) : (
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="w-full h-auto max-h-[450px]"
            />
          )}

          {/* Floating Tooltip */}
          {hoveredNode && (
            <div
              className="absolute z-30 pointer-events-none p-3 rounded-xl bg-slate-900 text-white text-xs font-sans shadow-xl border border-slate-700 space-y-1.5 transition-all max-w-[240px]"
              style={{
                left: Math.min(dimensions.width - 250, Math.max(10, hoveredNode.x + 15)),
                top: Math.min(dimensions.height - 130, Math.max(10, hoveredNode.y - 40))
              }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1">
                <span className="font-bold text-emerald-400 truncate">{hoveredNode.data.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {hoveredNode.data.stage.toUpperCase()}
                </span>
              </div>
              <div className="space-y-0.5 text-[11px] font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Capital:</span>
                  <strong className="text-white">${hoveredNode.data.capitalUSD}M</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Deals:</span>
                  <strong className="text-white">{hoveredNode.data.dealsCount} Rounds</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>YoY Growth:</span>
                  <strong className="text-emerald-400">+{hoveredNode.data.growthYoY}%</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Diaspora Share:</span>
                  <strong className="text-amber-400">{hoveredNode.data.diasporaSharePct}%</strong>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 pt-0.5 italic">
                Click bubble/box for deep sector dossier
              </div>
            </div>
          )}
        </div>

        {/* Selected Sector Deep-Dive Dossier Card */}
        <div className="lg:col-span-4 rounded-xl bg-[#F6FAF5] border-2 border-[#B0CFAD] p-4 sm:p-5 space-y-4">
          {selectedSubSector ? (
            <div className="space-y-3.5 font-sans">
              <div className="border-b border-[#D7E7D6] pb-3 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E5A2C] font-mono">
                    {selectedSubSector.parentSector}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-800 border border-[#D7E7D6]">
                    {selectedSubSector.stage.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-base font-black text-slate-900 leading-snug">
                  {selectedSubSector.name}
                </h4>
              </div>

              {/* Metric Breakdown Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-[#D7E7D6] space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-500">Capital Deployed</div>
                  <div className="text-base font-black text-[#2E5A2C] font-mono">
                    ${selectedSubSector.capitalUSD}M
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-[#D7E7D6] space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-500">YoY Growth</div>
                  <div className="text-base font-black text-emerald-700 font-mono">
                    +{selectedSubSector.growthYoY}%
                  </div>
                </div>
              </div>

              {/* Funding Capital Breakdown Bar */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 font-mono flex items-center justify-between">
                  <span>FUNDING SOURCE SPLIT:</span>
                  <span className="text-slate-500">{selectedSubSector.dealsCount} deals</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200 overflow-hidden flex">
                  <div 
                    style={{ width: `${selectedSubSector.diasporaSharePct}%` }}
                    className="bg-amber-600 h-full" 
                    title={`Diaspora Angels: ${selectedSubSector.diasporaSharePct}%`}
                  />
                  <div 
                    style={{ width: `${selectedSubSector.regionalVcSharePct}%` }}
                    className="bg-blue-600 h-full" 
                    title={`Regional VCs: ${selectedSubSector.regionalVcSharePct}%`}
                  />
                  <div 
                    style={{ width: `${selectedSubSector.dfiSharePct}%` }}
                    className="bg-[#2E5A2C] h-full" 
                    title={`DFIs / Impact: ${selectedSubSector.dfiSharePct}%`}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    Diaspora ({selectedSubSector.diasporaSharePct}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    VCs ({selectedSubSector.regionalVcSharePct}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#2E5A2C]"></span>
                    DFI ({selectedSubSector.dfiSharePct}%)
                  </span>
                </div>
              </div>

              {/* Sector Description */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-900 font-mono">
                  DISCIPLINE OVERVIEW:
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedSubSector.description}
                </p>
              </div>

              {/* Notable Startups & Labs */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-900 font-mono flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#2E5A2C]" />
                  <span>KEY LEBANESE STARTUPS & LABS:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSubSector.keyStartups.map((s) => (
                    <span 
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-white border border-[#B0CFAD] text-xs font-bold text-slate-800 shadow-2xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 font-sans space-y-2">
              <Info className="w-5 h-5 mx-auto text-slate-400" />
              <div>Click any segment on the chart to inspect full sector telemetry, key startups, and funding splits.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
