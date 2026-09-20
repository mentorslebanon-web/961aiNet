import React, { useState, useEffect, useRef } from "react";
import { GraphNode, GraphEdge, PostgresTableSchema } from "../../types";
import { 
  Database, 
  Network, 
  Layers, 
  Search, 
  Filter, 
  Terminal, 
  Play, 
  ShieldAlert, 
  CheckCircle, 
  Code, 
  RefreshCw, 
  Zap, 
  Globe, 
  MapPin,
  FileCode,
  Sliders
} from "lucide-react";
import * as d3 from "d3";

interface Module1ArchitectureProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  postgresSchemas: PostgresTableSchema[];
  onSelectNode: (node: GraphNode) => void;
}

export const Module1Architecture: React.FC<Module1ArchitectureProps> = ({
  nodes,
  edges,
  postgresSchemas,
  onSelectNode
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"neo4j" | "postgres" | "hybrid_engine">("neo4j");
  
  // Graph controls
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterLocation, setFilterLocation] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [cypherQuery, setCypherQuery] = useState("MATCH (g:Guru)-[r:HAS_SKILL]->(s:Skill) RETURN g, r, s LIMIT 25;");
  const [cypherOutput, setCypherOutput] = useState<string | null>(null);
  const [isExecutingCypher, setIsExecutingCypher] = useState(false);

  // PostgreSQL controls
  const [selectedTable, setSelectedTable] = useState<string>(postgresSchemas[0].tableName);
  const [simulatedTenantId, setSimulatedTenantId] = useState("8f4a1e90-beirut-seed-fund-01");
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM organizations WHERE tier = 'enterprise_vc';");
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // D3 Force-Directed Graph Simulation
  useEffect(() => {
    if (activeSubTab !== "neo4j" || !svgRef.current) return;

    const width = 800;
    const height = 540;

    // Filter nodes
    const filteredNodes = nodes.filter((n) => {
      if (filterType !== "ALL" && n.type !== filterType) return false;
      if (filterLocation === "onshore" && n.isDiaspora) return false;
      if (filterLocation === "diaspora" && !n.isDiaspora) return false;
      if (searchQuery && !n.label.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));

    // Filter edges connected to visible nodes
    const filteredEdges = edges.filter(
      (e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
    );

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Create container for zoom
    const g = svg.append("g");

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Deep copy for D3 simulation
    const simNodes = filteredNodes.map((d) => ({ ...d }));
    const simLinks = filteredEdges.map((d) => ({ ...d }));

    const simulation = d3.forceSimulation(simNodes as any)
      .force("link", d3.forceLink(simLinks).id((d: any) => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-240))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(28));

    // Colors mapping
    const colorMap: Record<string, string> = {
      Startup: "#75AC73",    // Pale green / soft sage
      Guru: "#6366f1",       // Indigo
      Investor: "#f59e0b",   // Amber
      Hub: "#14b8a6",        // Teal
      Skill: "#06b6d4",      // Cyan
    };

    // Draw Links
    const link = g.append("g")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(simLinks)
      .join("line")
      .attr("stroke-width", (d: any) => Math.max(1, (d.weight || 0.5) * 3))
      .attr("stroke-dasharray", (d: any) => (d.verified ? "none" : "3,3"));

    // Draw Nodes
    const nodeGroup = g.append("g")
      .selectAll("g")
      .data(simNodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(
        d3.drag<any, any>()
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
      )
      .on("click", (_event, d: any) => {
        const found = nodes.find((n) => n.id === d.id);
        if (found) onSelectNode(found);
      });

    // Outer glow / Diaspora indicator
    nodeGroup.append("circle")
      .attr("r", (d: any) => (d.type === "Startup" || d.type === "Investor" ? 22 : 18))
      .attr("fill", (d: any) => colorMap[d.type] || "#64748b")
      .attr("fill-opacity", 0.15)
      .attr("stroke", (d: any) => (d.isDiaspora ? "#38bdf8" : colorMap[d.type]))
      .attr("stroke-width", (d: any) => (d.isDiaspora ? 2.5 : 1.5))
      .attr("stroke-dasharray", (d: any) => (d.isDiaspora ? "4,2" : "none"));

    // Inner Core Circle
    nodeGroup.append("circle")
      .attr("r", (d: any) => (d.type === "Startup" || d.type === "Investor" ? 14 : 11))
      .attr("fill", (d: any) => colorMap[d.type] || "#64748b")
      .attr("fill-opacity", 0.85);

    // Node Label
    nodeGroup.append("text")
      .text((d: any) => d.label)
      .attr("x", 0)
      .attr("y", 28)
      .attr("text-anchor", "middle")
      .attr("fill", "#e2e8f0")
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .attr("font-family", "sans-serif")
      .attr("pointer-events", "none");

    // Simulation Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [activeSubTab, filterType, filterLocation, searchQuery, nodes, edges]);

  const handleRunCypher = () => {
    setIsExecutingCypher(true);
    setTimeout(() => {
      setIsExecutingCypher(false);
      setCypherOutput(
        `+---------------------------------------------------------------------------------+
| g.label          | r.relationship   | s.label                 | r.weight |
+---------------------------------------------------------------------------------+
| "Dr. Jad Hobeika"| "MASTERED"       | "LLM Quantization (AWQ)"| 0.99     |
| "Dr. Jad Hobeika"| "MASTERED"       | "Arabic Dialectal NLP"  | 0.96     |
| "Nour Khoury"    | "MASTERED"       | "RLHF & Model Alignment"| 0.98     |
| "Charbel Assi"   | "MASTERED"       | "CUDA Optimization"     | 0.93     |
| "CedarsLLM"      | "CORE_COMPETENCY"| "LLM Quantization (AWQ)"| 0.95     |
+---------------------------------------------------------------------------------+
Returned 5 rows in 2.4ms (Bolt v5.1 / Neo4j Aura Enterprise Graph)`
      );
    }, 450);
  };

  const handleRunSql = () => {
    setSqlResult([
      {
        id: "8f4a1e90-beirut-seed-fund-01",
        name: "Cedar AI Syndicate",
        slug: "cedar-ai",
        tier: "enterprise_vc",
        credit_balance: 6000,
        created_at: "2026-08-01T12:00:00Z",
        rls_status: "ENFORCED (Tenant Locked)"
      },
      {
        id: "4c7e2b11-sf-angels-02",
        name: "LebNet Silicon Valley Angels",
        slug: "lebnet-angels",
        tier: "enterprise_vc",
        credit_balance: 6000,
        created_at: "2026-08-05T14:30:00Z",
        rls_status: "ENFORCED (Tenant Locked)"
      }
    ]);
  };

  const activeSchema = postgresSchemas.find((s) => s.tableName === selectedTable) || postgresSchemas[0];

  return (
    <div className="space-y-6">
      {/* Sub-module Navigation Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
              MODULE 1 SPECIFICATION
            </span>
            <h2 className="text-lg font-bold text-white">Hybrid Database & Graph Architecture</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            PostgreSQL multi-tenant RLS for credit/billing isolation + Neo4j Graph for weighted skill/investor topologies + L1 Wiki Fast Memory
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab("neo4j")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === "neo4j" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Neo4j Graph Visualizer
          </button>
          <button
            onClick={() => setActiveSubTab("postgres")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === "postgres" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            PostgreSQL Multi-Tenant RLS
          </button>
          <button
            onClick={() => setActiveSubTab("hybrid_engine")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === "hybrid_engine" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Hybrid Query Engine (L1 + L2)
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: Neo4j Knowledge Graph Visualizer & Cypher Console */}
      {activeSubTab === "neo4j" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visualizer Area (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col shadow-xl">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search entities, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="ALL">All Entity Types</option>
                  <option value="Startup">🚀 Startups</option>
                  <option value="Guru">🧠 AI Gurus</option>
                  <option value="Investor">💼 Investors</option>
                  <option value="Hub">🏛️ Hubs & Universities</option>
                  <option value="Skill">⚡ Skills</option>
                </select>

                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="ALL">All Geography</option>
                  <option value="onshore">🇱🇧 Onshore Lebanon</option>
                  <option value="diaspora">🌐 Diaspora Chapters</option>
                </select>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Startup</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Guru</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Investor</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-sky-400"></span> Diaspora</span>
              </div>
            </div>

            {/* D3 Canvas Stage */}
            <div className="relative flex-1 bg-slate-950/80 rounded-xl overflow-hidden mt-4 border border-slate-800/60 flex items-center justify-center min-h-[480px]">
              <svg
                ref={svgRef}
                viewBox="0 0 800 540"
                className="w-full h-full cursor-grab active:cursor-grabbing"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] text-slate-400 flex items-center gap-2">
                <span>💡 Click any node to inspect Karpathy L1 Wiki & Request warm intro</span>
              </div>
            </div>
          </div>

          {/* Cypher Console & Schema Metadata (1 Col) */}
          <div className="space-y-4">
            {/* Cypher Query Console */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Neo4j Cypher Console</h3>
                </div>
                <button
                  onClick={handleRunCypher}
                  disabled={isExecutingCypher}
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                >
                  <Play className="w-3 h-3 fill-current" />
                  {isExecutingCypher ? "Executing..." : "Execute"}
                </button>
              </div>

              <div className="mt-3">
                <label className="text-[11px] text-slate-400 font-mono mb-1 block">Cypher Query (Bolt v5.1)</label>
                <textarea
                  value={cypherQuery}
                  onChange={(e) => setCypherQuery(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Sample Queries */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[11px] text-slate-500 font-semibold block">Quick Templates:</span>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setCypherQuery("MATCH (i:Investor)-[r:TARGETS_STAGE]->(s:Stage) WHERE s.name = 'Seed' RETURN i;")}
                    className="text-left text-[11px] text-slate-400 hover:text-emerald-400 truncate font-mono bg-slate-950/60 p-1.5 rounded border border-slate-800"
                  >
                    • Match Seed Investors with Active Dry Powder
                  </button>
                  <button
                    onClick={() => setCypherQuery("MATCH (g:Guru)-[:HAS_SKILL {proficiency: 0.95}]->(s:Skill {name: 'LLM Quantization'}) RETURN g;")}
                    className="text-left text-[11px] text-slate-400 hover:text-emerald-400 truncate font-mono bg-slate-950/60 p-1.5 rounded border border-slate-800"
                  >
                    • Find Top 1% LLM Quantization Gurus in Beirut
                  </button>
                  <button
                    onClick={() => setCypherQuery("MATCH (s:Startup)-[:INCUBATED_AT]->(h:Hub {name: 'Berytech'}) RETURN s;")}
                    className="text-left text-[11px] text-slate-400 hover:text-emerald-400 truncate font-mono bg-slate-950/60 p-1.5 rounded border border-slate-800"
                  >
                    • List All Berytech & AUB Spinout AI Ventures
                  </button>
                </div>
              </div>

              {/* Cypher Output Console */}
              {cypherOutput && (
                <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto">
                  <pre className="font-mono text-[10px] text-emerald-400 whitespace-pre leading-tight">
                    {cypherOutput}
                  </pre>
                </div>
              )}
            </div>

            {/* Neo4j Node/Relationship Meta Specs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-400" />
                Weighted Graph Topology Spec
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-mono text-emerald-400 font-bold">:Guru Node</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    `proficiency` (0.0-1.0), `verified` (bool), `github_velocity`, `diaspora_chapter`
                  </p>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-mono text-indigo-400 font-bold">:HAS_SKILL Edge</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    `weight` = 0.5 * (PeerEndorsement) + 0.3 * (GitHubCommitDensity) + 0.2 * (PaperCitations)
                  </p>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold">:Investor Node</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    `ticket_min`, `ticket_max`, `onshore_mandate_ratio`, `syndicate_capacity`
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: PostgreSQL Multi-Tenant Schema Viewer */}
      {activeSubTab === "postgres" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table List & Tenant Simulator (1 Col) */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                PostgreSQL Relational Tables
              </h3>
              <div className="space-y-1.5">
                {postgresSchemas.map((schema) => (
                  <button
                    key={schema.tableName}
                    onClick={() => setSelectedTable(schema.tableName)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                      selectedTable === schema.tableName
                        ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    <span>public.{schema.tableName}</span>
                    <span className="text-[10px] text-slate-500">{schema.columns.length} cols</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RLS Simulation Context */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tenant RLS Security Context</h3>
              </div>
              <p className="text-xs text-slate-400">
                PostgreSQL Row-Level Security (RLS) dynamically filters rows based on the session variable <code className="text-emerald-400">app.current_tenant_id</code>.
              </p>
              <div>
                <label className="text-[11px] text-slate-400 font-mono mb-1 block">Active Tenant JWT Subject:</label>
                <input
                  type="text"
                  value={simulatedTenantId}
                  onChange={(e) => setSimulatedTenantId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-xs text-amber-300 focus:outline-none"
                />
              </div>
              <button
                onClick={handleRunSql}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                Simulate RLS Isolation Query
              </button>
            </div>
          </div>

          {/* Table Details & RLS Policy SQL (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Schema Table Columns */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white font-mono">public.{activeSchema.tableName}</h3>
                  <p className="text-xs text-slate-400">{activeSchema.description}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                  RLS ACTIVE
                </span>
              </div>

              {/* Column List */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800 pb-2">
                      <th className="pb-2 font-semibold">Column Name</th>
                      <th className="pb-2 font-semibold">Type</th>
                      <th className="pb-2 font-semibold">Constraints</th>
                      <th className="pb-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {activeSchema.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-slate-950/40">
                        <td className="py-2.5 font-bold text-emerald-400">{col.name}</td>
                        <td className="py-2.5 text-indigo-300">{col.type}</td>
                        <td className="py-2.5 text-amber-400/90">{col.constraints || "—"}</td>
                        <td className="py-2.5 text-slate-400 font-sans">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RLS Policy SQL Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-indigo-400" />
                Row-Level Security (RLS) Policy Definition
              </h4>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-indigo-300 whitespace-pre">
                {activeSchema.rlsPolicySql}
              </div>
            </div>

            {/* Simulated Query Results */}
            {sqlResult && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  RLS Filtered Execution Output (Tenant: {simulatedTenantId})
                </h4>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 overflow-x-auto">
                  <pre className="font-mono text-xs text-emerald-400">
                    {JSON.stringify(sqlResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Hybrid Query Engine (L1 Wiki Fast Memory + L2 Vector RAG) */}
      {activeSubTab === "hybrid_engine" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl font-bold text-white">Hybrid Query Engine: L1 Wiki Cache + L2 Vector RAG</h3>
            <p className="text-xs text-slate-400">
              Following Andrej Karpathy's LLM Second Brain architecture, 961AINetwork solves latency and hallucination through dual-layer retrieval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* L1 Wiki Cache Box */}
            <div className="p-5 bg-gradient-to-b from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                  LAYER 1: PRE-COMPILED WIKI
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">~0.8ms Latency</span>
              </div>
              <h4 className="text-base font-bold text-white">Fast L1 Knowledge Memory</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean, authoritative Markdown documents compiled and maintained by AI daemons. Includes structured frontmatter and explicit <code className="text-emerald-400 font-mono">[[Wikilinks]]</code> for instant graph traversal.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 font-mono">
                <li>✓ Zero embedding compute cost for common queries</li>
                <li>✓ Deterministic bidirectional relationship lookups</li>
                <li>✓ Ultra-lightweight for WhatsApp/Telegram edge bots</li>
              </ul>
            </div>

            {/* L2 Vector Storage Box */}
            <div className="p-5 bg-gradient-to-b from-indigo-950/40 to-slate-950 border border-indigo-500/30 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                  LAYER 2: VECTOR EMBEDDINGS
                </span>
                <span className="font-mono text-xs text-indigo-400 font-bold">~320ms Latency</span>
              </div>
              <h4 className="text-base font-bold text-white">Deep Document Vector RAG</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Handles heavy raw attachments (50-page pitch decks, technical whitepapers, GitHub code commit diffs). Invoked on-demand when L1 Wiki queries require deep clause extraction.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 font-mono">
                <li>✓ pgvector with HNSW index in PostgreSQL</li>
                <li>✓ Multi-vector cosine similarity across technical domains</li>
                <li>✓ Async synchronization with Neo4j entity nodes</li>
              </ul>
            </div>
          </div>

          {/* Flow Diagram Representation */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Query Resolution Flow</span>
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              <div className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200">
                User Query (Web / WhatsApp)
              </div>
              <span className="text-slate-600">➔</span>
              <div className="px-3 py-2 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 font-bold">
                L1 Wiki Match Hit? (92% queries)
              </div>
              <span className="text-slate-600">➔</span>
              <div className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200">
                Instant Sub-ms Markdown Response
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
