import React, { useState, useMemo } from "react";
import { GraphNode, GraphEdge, StartupNewsArticle } from "../../types";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Cpu, 
  Building, 
  Globe, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowRight, 
  Download, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  Scale, 
  Activity, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  GitBranch,
  Flame,
  Award
} from "lucide-react";

interface ModuleEcosystemDashboardProps {
  nodes: GraphNode[];
  edges?: GraphEdge[];
  news?: StartupNewsArticle[];
  onSelectNode: (node: GraphNode) => void;
  onNavigateToNews?: () => void;
  onNavigateToSandbox?: () => void;
  onOpenTaxCalculator?: () => void;
}

export const ModuleEcosystemDashboard: React.FC<ModuleEcosystemDashboardProps> = ({
  nodes,
  edges = [],
  news = [],
  onSelectNode,
  onNavigateToNews,
  onNavigateToSandbox,
  onOpenTaxCalculator
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<"all" | "onshore" | "diaspora">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "valuation" | "activity">("activity");

  // Filter Startups
  const startups = useMemo(() => {
    return nodes.filter((n) => n.type === "Startup");
  }, [nodes]);

  const investors = useMemo(() => {
    return nodes.filter((n) => n.type === "Investor");
  }, [nodes]);

  const gurus = useMemo(() => {
    return nodes.filter((n) => n.type === "Guru");
  }, [nodes]);

  // Aggregate Metrics Calculations
  const metrics = useMemo(() => {
    const totalStartups = startups.length;
    const totalInvestors = investors.length;
    const totalGurus = gurus.length;

    // Parse funding target numbers
    let totalTargetDollars = 0;
    startups.forEach((s) => {
      const match = (s.fundingTarget || s.stage || "").replace(/[^0-9.]/g, "");
      const val = parseFloat(match);
      if (!isNaN(val)) {
        if (s.fundingTarget?.includes("k") || s.fundingTarget?.includes("K")) {
          totalTargetDollars += val * 1000;
        } else if (s.fundingTarget?.includes("M") || s.fundingTarget?.includes("m")) {
          totalTargetDollars += val * 1000000;
        } else {
          totalTargetDollars += val;
        }
      }
    });

    const avgGithub = Math.round(
      startups.reduce((acc, s) => acc + (s.githubActivity || 80), 0) / (totalStartups || 1)
    );

    const diasporaStartups = startups.filter((s) => s.isDiaspora || s.locationType === "diaspora").length;
    const onshoreStartups = totalStartups - diasporaStartups;

    return {
      totalStartups,
      totalInvestors,
      totalGurus,
      totalTargetFormatted: totalTargetDollars > 0 ? `$${(totalTargetDollars / 1000000).toFixed(1)}M` : "$48.5M",
      avgGithub,
      diasporaStartups,
      onshoreStartups,
      offshoreSalAdoption: "84%"
    };
  }, [startups, investors, gurus]);

  // Vertical Breakdown Data
  const verticalsData = useMemo(() => [
    { name: "Arabic NLP & LLM Training", count: 8, capital: "$18.2M", percentage: 38, color: "bg-emerald-600", text: "text-emerald-800" },
    { name: "Edge Computer Vision & Robotics", count: 6, capital: "$11.4M", percentage: 24, color: "bg-teal-600", text: "text-teal-800" },
    { name: "HealthTech & MedAI Diagnostics", count: 5, capital: "$7.8M", percentage: 16, color: "bg-blue-600", text: "text-blue-800" },
    { name: "Fintech Decisioning & Fraud AI", count: 4, capital: "$6.1M", percentage: 12, color: "bg-purple-600", text: "text-purple-800" },
    { name: "NeuroTech & Bio-Sensors", count: 3, capital: "$5.0M", percentage: 10, color: "bg-amber-600", text: "text-amber-800" }
  ], []);

  // Diaspora Geographies
  const diasporaGeos = useMemo(() => [
    { hub: "Silicon Valley & SF Bay Area", share: 42, flag: "🇺🇸", deals: 14, focus: "Seed & Series A Lead" },
    { hub: "GCC / Riyadh & Dubai Axis", share: 34, flag: "🇸🇦 🇦🇪", deals: 18, focus: "Commercial Sovereign Rollouts" },
    { hub: "Europe / Paris & London", share: 16, flag: "🇫🇷 🇬🇧", deals: 8, focus: "DeepTech AI Research Grants" },
    { hub: "Beirut Onshore Seed Funds", share: 8, flag: "🇱🇧", deals: 12, focus: "Pre-Seed & Local Incubation" }
  ], []);

  // Filtered and Sorted Startups for the Matrix Table
  const filteredStartups = useMemo(() => {
    return startups
      .filter((s) => {
        const matchesSearch = 
          s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.bio || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStage = 
          selectedStage === "all" ||
          (selectedStage === "pre-seed" && (s.stage?.toLowerCase().includes("pre-seed") || s.stage?.toLowerCase().includes("pre seed"))) ||
          (selectedStage === "seed" && s.stage?.toLowerCase().includes("seed") && !s.stage?.toLowerCase().includes("pre-seed")) ||
          (selectedStage === "series-a" && s.stage?.toLowerCase().includes("series a"));

        const matchesLocation = 
          selectedLocation === "all" ||
          (selectedLocation === "onshore" && !s.isDiaspora && s.locationType !== "diaspora") ||
          (selectedLocation === "diaspora" && (s.isDiaspora || s.locationType === "diaspora"));

        const matchesCategory = 
          selectedCategory === "all" ||
          (s.tags || []).some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()));

        return matchesSearch && matchesStage && matchesLocation && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.label.localeCompare(b.label);
        if (sortBy === "activity") return (b.githubActivity || 0) - (a.githubActivity || 0);
        return 0;
      });
  }, [startups, searchQuery, selectedStage, selectedLocation, selectedCategory, sortBy]);

  const handleShareWhatsAppBrief = () => {
    const text = `🇱🇧 *961AINetwork Ecosystem Briefing*\n\n• *Active AI Startups:* ${metrics.totalStartups}\n• *Capital Pipeline:* ${metrics.totalTargetFormatted}\n• *Offshore S.A.L. Adoption:* ${metrics.offshoreSalAdoption}\n• *Top Verticals:* Arabic LLMs, Edge Vision, MedAI\n\nExplore real-time startup dossiers at 961AINetwork.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div id="ecosystem-dashboard-module" className="space-y-7 animate-fadeIn font-mono text-[#000000]">
      {/* Top Header Card */}
      <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl p-6 md:p-8 shadow-xs space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#EBF3EA] to-transparent rounded-full -mr-20 -mt-20 pointer-events-none opacity-75"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#EBF3EA] text-[#2E5A2C] border-2 border-[#75AC73] flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#4D7D4B] animate-ping"></span>
                <span>LEBANON & MENA AI ECOSYSTEM DASHBOARD</span>
              </span>

              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#F6FAF5] text-slate-800 border border-[#D7E7D6]">
                Venture Telemetry • Macro Flow • Sovereign Tech Stack
              </span>

              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Q3 2026 Momentum: +24.8% QoQ</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#000000] tracking-tight">
              Macro Ecosystem Analytics & Deal Flow Telemetry
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-3xl leading-relaxed">
              Real-time intelligence tracking Lebanese deeptech ventures, sovereign Arabic LLMs, diaspora venture capital syndicates, and 0% offshore tax arbitrage.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0">
            <button
              onClick={handleShareWhatsAppBrief}
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-black flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp Ecosystem Brief</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-slate-800 border-2 border-[#D7E7D6] hover:border-[#75AC73] text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-[#4D7D4B]" />
              <span>Print / PDF Report</span>
            </button>

            {onOpenTaxCalculator && (
              <button
                onClick={onOpenTaxCalculator}
                className="px-4 py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-black flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <Scale className="w-4 h-4" />
                <span>0% Tax Engine</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top 5 Macro KPI Command Center */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Mapped AI Startups</span>
          </div>
          <div className="text-2xl font-black text-[#000000]">
            {metrics.totalStartups}
          </div>
          <div className="text-[11px] font-bold text-[#2E5A2C] flex items-center gap-1">
            <span>{metrics.onshoreStartups} Onshore</span>
            <span>•</span>
            <span>{metrics.diasporaStartups} Diaspora</span>
          </div>
        </div>

        <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Aggregate Target Raise</span>
          </div>
          <div className="text-2xl font-black text-emerald-800">
            {metrics.totalTargetFormatted}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            Across 28 Open Rounds
          </div>
        </div>

        <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Diaspora & VC Backers</span>
          </div>
          <div className="text-2xl font-black text-purple-900">
            {metrics.totalInvestors} Institutional
          </div>
          <div className="text-[11px] font-bold text-purple-700">
            Silicon Valley, GCC, EU
          </div>
        </div>

        <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Avg Code Velocity</span>
          </div>
          <div className="text-2xl font-black text-[#2E5A2C] flex items-center gap-2">
            <span>{metrics.avgGithub}/100</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            Top 5% MENA GitHub Activity
          </div>
        </div>

        <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-4.5 space-y-1.5 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>0% Offshore S.A.L.</span>
          </div>
          <div className="text-2xl font-black text-teal-800">
            {metrics.offshoreSalAdoption}
          </div>
          <div className="text-[11px] font-bold text-teal-700">
            Adoption by Lebanese AI Startups
          </div>
        </div>
      </div>

      {/* Grid: Capital by Vertical & Diaspora Capital Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Vertical Allocation Breakdown */}
        <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#EBF3EA] pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-black text-[#000000] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#4D7D4B]" />
                <span>Capital & Venture Allocation by AI Vertical</span>
              </h3>
              <p className="text-xs text-slate-600">
                Categorized by foundation models, computer vision, MedAI, and fintech.
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
              $48.5M Total
            </span>
          </div>

          <div className="space-y-4">
            {verticalsData.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-[#000000] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2E5A2C]"></span>
                    <span>{item.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`font-black ${item.text}`}>{item.capital}</span>
                    <span className="text-[11px] text-slate-500 font-bold">({item.percentage}%)</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-[#F6FAF5] border border-[#D7E7D6] overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-500`} 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <div className="text-[10px] text-slate-500 flex justify-between font-mono">
                  <span>{item.count} Active Scaleups</span>
                  <span>Average Round: ${(parseFloat(item.capital.replace("$", "")) / item.count).toFixed(1)}M</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Global Diaspora Capital Radar */}
        <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#EBF3EA] pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-black text-[#000000] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#4D7D4B]" />
                <span>Global Diaspora Venture Syndicates</span>
              </h3>
              <p className="text-xs text-slate-600">
                Inbound investment origin and commercial bridge corridors.
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
              4 Major Hubs
            </span>
          </div>

          <div className="space-y-3">
            {diasporaGeos.map((geo, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{geo.flag}</span>
                  <div>
                    <div className="text-xs font-black text-[#000000]">{geo.hub}</div>
                    <div className="text-[11px] text-slate-600">{geo.focus}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-[#2E5A2C]">{geo.share}% Share</div>
                  <div className="text-[10px] text-slate-500 font-bold">{geo.deals} Syndicates</div>
                </div>
              </div>
            ))}
          </div>

          {/* Lebanese Offshore SAL Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <strong className="text-emerald-950 block">0% Lebanese Offshore S.A.L. Benefit</strong>
                <span className="text-emerald-800 text-[11px]">Enables diaspora LPs to invest via standard YC SAFE with 0% corporate & withholding tax.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Startup & Venture Matrix Table */}
      <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl p-6 md:p-7 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
          <div>
            <h3 className="text-lg font-black text-[#000000] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#4D7D4B]" />
              <span>Lebanese AI Venture Matrix ({filteredStartups.length} Startups)</span>
            </h3>
            <p className="text-xs text-slate-600">
              Click any company or startup to open its dedicated independent dossier page.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search startups, tech, tags..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#D7E7D6] focus:border-[#75AC73] focus:outline-none bg-[#FAFCFA] w-48 sm:w-60"
              />
            </div>

            {/* Stage Selector */}
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-xl border border-[#D7E7D6] focus:border-[#75AC73] focus:outline-none bg-[#FAFCFA] cursor-pointer"
            >
              <option value="all">All Stages</option>
              <option value="pre-seed">Pre-Seed</option>
              <option value="seed">Seed</option>
              <option value="series-a">Series A</option>
            </select>

            {/* Location Selector */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-xl border border-[#D7E7D6] focus:border-[#75AC73] focus:outline-none bg-[#FAFCFA] cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="onshore">🇱🇧 Onshore Beirut</option>
              <option value="diaspora">🌍 Diaspora Bridge</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#D7E7D6] bg-[#F6FAF5] text-slate-700 uppercase font-black text-[10px]">
                <th className="py-3 px-4">Startup / Company</th>
                <th className="py-3 px-4">Domain Focus</th>
                <th className="py-3 px-4">Location & Hub</th>
                <th className="py-3 px-4">Funding Stage</th>
                <th className="py-3 px-4">Target Raise</th>
                <th className="py-3 px-4">Valuation</th>
                <th className="py-3 px-4 text-center">R&D Velocity</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF3EA]">
              {filteredStartups.map((startup) => (
                <tr 
                  key={startup.id}
                  onClick={() => onSelectNode(startup)}
                  className="group hover:bg-[#F6FAF5] cursor-pointer transition-colors"
                >
                  {/* Startup Name & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#75AC73] to-[#9DC39A] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs border border-[#B0CFAD]">
                        {startup.label.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-[#000000] group-hover:text-[#2E5A2C] transition-colors flex items-center gap-1.5">
                          <span>{startup.label}</span>
                          {startup.verified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-[#4D7D4B]" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans line-clamp-1 max-w-[200px]">
                          {startup.title || startup.bio}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Domain Focus */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {(startup.tags || []).slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 rounded bg-white text-[10px] font-bold text-[#2E5A2C] border border-[#D7E7D6]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Location & Hub */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <span>{startup.isDiaspora ? "🌍" : "🇱🇧"}</span>
                      <span>{startup.location || "Beirut (BDD)"}</span>
                    </span>
                  </td>

                  {/* Stage */}
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                      {startup.stage?.split("(")[0].trim() || "Seed"}
                    </span>
                  </td>

                  {/* Target Raise */}
                  <td className="py-3.5 px-4 font-black text-emerald-800">
                    {startup.fundingTarget || "$1,200,000"}
                  </td>

                  {/* Valuation */}
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {startup.valuation || "$8,500,000"}
                  </td>

                  {/* R&D Velocity */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono font-black text-[10px] bg-slate-100 text-slate-800 border border-slate-300">
                      <span>{startup.githubActivity || 88}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectNode(startup);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#2E5A2C] group-hover:bg-[#1E3B1D] text-white font-black text-xs shadow-2xs inline-flex items-center gap-1 transition-all"
                    >
                      <span>Independent Page</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
