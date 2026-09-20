import React, { useState } from "react";
import { UserAuthSession } from "../../types";
import {
  Search,
  ArrowRight,
  Layers,
  UserPlus,
  Trophy,
  BarChart3,
  Briefcase,
  Network,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Compass,
  X,
  FileText,
  Newspaper,
  Scale
} from "lucide-react";

interface PlatformCoreModulesBarProps {
  user?: UserAuthSession | null;
  onNavigateToModule?: (moduleId: number) => void;
  onNavigateToDirectory?: (searchQuery?: string) => void;
  onNavigateToQuestionnaire?: () => void;
  onOpenPricing?: () => void;
  compact?: boolean;
}

export const PlatformCoreModulesBar: React.FC<PlatformCoreModulesBarProps> = ({
  user,
  onNavigateToModule,
  onNavigateToDirectory,
  onNavigateToQuestionnaire,
  onOpenPricing,
  compact = false
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onNavigateToDirectory) {
      onNavigateToDirectory(searchValue.trim());
    } else if (onNavigateToModule) {
      onNavigateToModule(1);
    }
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchValue(tag);
    if (onNavigateToDirectory) {
      onNavigateToDirectory(tag);
    } else if (onNavigateToModule) {
      onNavigateToModule(1);
    }
  };

  const quickTags = [
    "LLM",
    "Computer Vision",
    "AUB",
    "LAU",
    "SF",
    "Paris",
    "Dubai"
  ];

  const userName = user?.name || "Maan Barazy";
  const userPlanText = user?.plan === "premium_annual" || user?.isPremium
    ? "Pro Member ($100/yr)"
    : "6-Hour Demo";

  const coreModules = [
    {
      id: 1,
      title: "Yellow Pages Directory",
      subtitle: "Lebanon AI Yellow Pages Directory",
      badge: "58 Verified Stakeholders Indexed",
      icon: Layers,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      action: () => {
        if (onNavigateToDirectory) onNavigateToDirectory("");
        else if (onNavigateToModule) onNavigateToModule(1);
      }
    },
    {
      id: 16,
      title: "INVESTMENT REPORTS & RESEARCH",
      subtitle: "Macro Diligence & Wartime Economics Reports",
      badge: "Research & Diligence",
      icon: FileText,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      action: () => {
        if (onNavigateToModule) onNavigateToModule(16);
      }
    },
    {
      id: 8,
      title: "961AINEWS & KNOWLEDGE REPOSITORY",
      subtitle: "Curated Lebanon & MENA AI News, PDF Toolkits & Reports",
      badge: "DeepTech Wire",
      icon: Newspaper,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      action: () => {
        if (onNavigateToModule) onNavigateToModule(8);
      }
    },
    {
      id: 10,
      title: "SERVICE 01 • Sovereign Legal Framework",
      subtitle: "Lebanon Regulatory Sandbox, Laws & Formalities",
      badge: "961 AI Network Sovereign Platform",
      icon: Scale,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
      action: () => {
        if (onNavigateToModule) onNavigateToModule(10);
      }
    },
    {
      id: 18,
      title: "D3 INTERACTIVE ECOSYSTEM GRAPH",
      subtitle: "Lebanon AI Tech Map",
      badge: "Lebanon Onshore ↔ Diaspora Bridge ↔ Regional VCs",
      icon: Network,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      action: () => {
        if (onNavigateToModule) onNavigateToModule(18);
      }
    },
    {
      id: 2,
      title: "Join / Submit Entity",
      subtitle: "Intake Questionnaire & Onboarding",
      badge: "Intake Form",
      icon: UserPlus,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      action: () => {
        if (onNavigateToQuestionnaire) onNavigateToQuestionnaire();
        else if (onNavigateToModule) onNavigateToModule(2);
      }
    }
  ];

  return (
    <section 
      id="platform-core-modules-workspace" 
      aria-label="Platform Core Modules & Quick Access"
      className="rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md"
    >
      {/* Top Bar: Section Title + Signed In User Info Card */}
      <div className="p-4 sm:p-5 border-b border-slate-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Platform Core Modules & Quick Access
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Workspace Hub
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct ecosystem navigation, directory search, and institutional services.
            </p>
          </div>
        </div>

        {/* Signed In User Card */}
        <div 
          id="workspace-signed-in-user-card"
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 shadow-xs text-xs font-mono"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Signed In:
              </span>
              <strong className="text-white font-bold text-xs">{userName}</strong>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {userPlanText}
              </span>
              {onOpenPricing && userPlanText.includes("6-Hour") && (
                <button
                  type="button"
                  onClick={onOpenPricing}
                  className="text-[10px] text-amber-300 hover:text-amber-200 underline cursor-pointer transition-colors"
                  title="Upgrade to Annual Pro ($100/yr)"
                >
                  Upgrade
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4 text-emerald-400" />
            </div>
            <input
              id="workspace-directory-search-input"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name, technology (e.g. LLM, Computer Vision), university (AUB, LAU), or diaspora city (SF, Paris, Dubai)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            id="workspace-search-directory-btn"
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-900/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <span>Search in Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Suggested Filters:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleQuickTagClick(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-mono transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Platform Core Modules */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {coreModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                role="button"
                tabIndex={0}
                onClick={mod.action}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); mod.action(); } }}
                className="group relative p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 transition-all cursor-pointer text-left flex items-start gap-3 shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${mod.color} transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {mod.title}
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0">
                      {mod.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {mod.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-2.5" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
