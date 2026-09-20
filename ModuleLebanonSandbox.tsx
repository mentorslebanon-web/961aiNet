import React from "react";
import { GraphNode, GraphEdge } from "../../types";
import { LebanonAiTechMap } from "./LebanonAiTechMap";
import { 
  Network, 
  ArrowLeft, 
  Compass, 
  Sparkles, 
  Layers, 
  Building2, 
  Briefcase, 
  Users, 
  GraduationCap 
} from "lucide-react";

interface ModuleInteractiveTechMapProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
  onNavigateToMatchmaking?: () => void;
  onNavigateToGraphArch?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToDirectory?: () => void;
}

export const ModuleInteractiveTechMap: React.FC<ModuleInteractiveTechMapProps> = ({
  nodes,
  edges,
  onSelectNode,
  onNavigateToMatchmaking,
  onNavigateToGraphArch,
  onNavigateToHome,
  onNavigateToDirectory
}) => {
  const startupCount = nodes.filter((n) => n.type === "Startup").length;
  const investorCount = nodes.filter((n) => n.type === "Investor").length;
  const guruCount = nodes.filter((n) => n.type === "Guru").length;
  const hubCount = nodes.filter((n) => n.type === "Hub").length;
  const diasporaCount = nodes.filter((n) => n.isDiaspora).length;

  return (
    <div id="interactive-tech-map-page" className="space-y-6">
      {/* Top Banner with Navigation */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl text-white font-mono">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>D3 INTERACTIVE ECOSYSTEM GRAPH</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Lebanon Onshore ↔ Diaspora Bridge ↔ Regional VCs
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Lebanon AI Tech Map</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-sans leading-relaxed">
              Multi-dimensional topology mapping capital allocations, academic research nodes, diaspora angel syndicates, and deeptech ventures across Beirut, Paris, San Francisco, and Dubai.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto shrink-0">
            {onNavigateToHome && (
              <button
                type="button"
                onClick={onNavigateToHome}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home Hub</span>
              </button>
            )}

            {onNavigateToDirectory && (
              <button
                type="button"
                onClick={onNavigateToDirectory}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Yellow Pages</span>
              </button>
            )}
          </div>
        </div>

        {/* Real-Time Ecosystem Telemetry Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-4 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">Startups</span>
              <strong className="text-white text-xs">{startupCount} Indexed</strong>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">VCs & Angels</span>
              <strong className="text-white text-xs">{investorCount} Funds</strong>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">AI Gurus</span>
              <strong className="text-white text-xs">{guruCount} Researchers</strong>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">Hubs & Labs</span>
              <strong className="text-white text-xs">{hubCount} Academic/BDD</strong>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 col-span-2 sm:col-span-1">
            <Compass className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">Diaspora Nodes</span>
              <strong className="text-white text-xs">{diasporaCount} Overseas</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main D3 Interactive Canvas */}
      <LebanonAiTechMap
        nodes={nodes}
        edges={edges}
        onSelectNode={onSelectNode}
        onNavigateToMatchmaking={onNavigateToMatchmaking}
        onNavigateToGraphArch={onNavigateToGraphArch}
      />
    </div>
  );
};
