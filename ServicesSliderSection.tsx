import React, { useState, useMemo } from "react";
import { GraphNode, GraphEdge, IntroductionRequestLog } from "../../types";
import { 
  Search, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowUpRight, 
  Users, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Filter, 
  Send, 
  ExternalLink, 
  Network, 
  Clock, 
  Star, 
  Laptop, 
  Award,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Lock
} from "lucide-react";
import { UserAuthSession } from "../../types";

interface ModuleYellowPagesDirectoryProps {
  nodes: GraphNode[];
  edges?: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
  deductCredits: (amount: number) => boolean;
  credits: number;
  onNavigateToHome: () => void;
  onNavigateToQuestionnaire?: () => void;
  onNavigateToMarketplace?: () => void;
  onOpenGraphView?: () => void;
  user?: UserAuthSession | null;
  onOpenAuth?: (mode?: "signin" | "signup", reason?: string) => void;
  initialSearchQuery?: string;
}

export const ModuleYellowPagesDirectory: React.FC<ModuleYellowPagesDirectoryProps> = ({
  nodes,
  onSelectNode,
  deductCredits,
  credits,
  onNavigateToHome,
  onNavigateToQuestionnaire,
  onNavigateToMarketplace,
  onOpenGraphView,
  user,
  onOpenAuth,
  initialSearchQuery = ""
}) => {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [locationFilter, setLocationFilter] = useState<"ALL" | "onshore" | "diaspora" | "servesLebanon">("ALL");
  const [stageFilter, setStageFilter] = useState<string>("ALL");
  const [hourlyRateFilter, setHourlyRateFilter] = useState<string>("ALL");
  const [selectedTechTag, setSelectedTechTag] = useState<string>("ALL");
  const [selectedService, setSelectedService] = useState<string>("ALL");

  // Intro Request Modal State
  const [introTarget, setIntroTarget] = useState<GraphNode | null>(null);
  const [pitchNote, setPitchNote] = useState("");
  const [isSubmittingIntro, setIsSubmittingIntro] = useState(false);
  const [introSuccessMsg, setIntroSuccessMsg] = useState<string | null>(null);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastFeedback(msg);
    setTimeout(() => setToastFeedback(null), 3000);
  };

  const agencyNodesCount = nodes.filter(n => n.rating !== undefined || n.servicesBreakdown !== undefined || n.minProjectSize !== undefined).length;
  const startupNodesCount = nodes.filter(n => n.type === "Startup" && n.rating === undefined && n.servicesBreakdown === undefined).length;

  const categories = [
    { id: "ALL", label: "All Directory", icon: Layers, count: nodes.filter(n => n.type !== "Skill" && n.type !== "Location").length },
    { id: "Agency", label: "Software & AI Agencies", icon: Laptop, count: agencyNodesCount },
    { id: "Startup", label: "Startups & Labs", icon: Building2, count: startupNodesCount },
    { id: "Guru", label: "Gurus & Talent", icon: Users, count: nodes.filter(n => n.type === "Guru").length },
    { id: "Investor", label: "Investors & VCs", icon: Briefcase, count: nodes.filter(n => n.type === "Investor").length },
    { id: "Hub", label: "Universities & Hubs", icon: GraduationCap, count: nodes.filter(n => n.type === "Hub").length },
  ];

  const subServices = [
    "ALL",
    "AI Development",
    "Custom Software",
    "Generative AI",
    "Mobile App Development",
    "Cloud Consulting & SI",
    "NLP (Arabic Dialects)",
    "AI Agents",
    "BI & Big Data",
    "ERP Consulting",
    "CRM Consulting",
    "IT Staff Augmentation",
    "Computer Vision",
    "FinTech",
    "Robotics",
    "University AI Lab"
  ];

  const stages = ["ALL", "Pre-Seed", "Seed", "Series A", "Bootstrapped", "Angel / Micro-Fund", "$1k+ Projects", "$5k+ Projects", "$10k+ Projects", "$25k+ Enterprise"];
  const hourlyRates = ["ALL", "< $25 / hr", "$25 - $49 / hr", "$50 - $99 / hr", "$100 - $149 / hr"];

  // Extract all distinct tech tags
  const allTechTags = useMemo(() => {
    const set = new Set<string>();
    nodes.forEach(n => {
      if (n.tags) n.tags.forEach(t => set.add(t));
    });
    return Array.from(set).slice(0, 16);
  }, [nodes]);

  // Filtered Entities
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => {
      // Exclude pure meta skill/location nodes from entity cards
      if (n.type === "Skill" || n.type === "Location") return false;

      const isAgencyNode = n.rating !== undefined || n.servicesBreakdown !== undefined || n.minProjectSize !== undefined;

      // Category filter
      if (selectedCategory === "Agency") {
        if (!isAgencyNode) return false;
      } else if (selectedCategory === "Startup") {
        if (n.type !== "Startup" || isAgencyNode) return false;
      } else if (selectedCategory !== "ALL" && n.type !== selectedCategory) {
        return false;
      }

      // Location filter
      if (locationFilter === "onshore" && (n.isDiaspora || n.location?.toLowerCase().includes("serves lebanon"))) return false;
      if (locationFilter === "diaspora" && !n.isDiaspora) return false;
      if (locationFilter === "servesLebanon" && !n.servesLebanon && !n.location?.toLowerCase().includes("serves lebanon") && !n.location?.toLowerCase().includes("lebanon")) return false;

      // Stage filter
      if (stageFilter !== "ALL") {
        if (!n.stage || !n.stage.toLowerCase().includes(stageFilter.toLowerCase())) return false;
      }

      // Hourly Rate filter
      if (hourlyRateFilter !== "ALL") {
        if (!n.hourlyRate || !n.hourlyRate.toLowerCase().includes(hourlyRateFilter.toLowerCase())) return false;
      }

      // Tech tag filter
      if (selectedTechTag !== "ALL") {
        if (!n.tags || !n.tags.includes(selectedTechTag)) return false;
      }

      // Sub-service filter
      if (selectedService !== "ALL") {
        const matchesTitle = n.title && n.title.toLowerCase().includes(selectedService.toLowerCase());
        const matchesTags = n.tags && n.tags.some(t => t.toLowerCase().includes(selectedService.toLowerCase()));
        const matchesBio = n.bio && n.bio.toLowerCase().includes(selectedService.toLowerCase());
        const matchesServicesBreakdown = n.servicesBreakdown && n.servicesBreakdown.some(s => s.name.toLowerCase().includes(selectedService.toLowerCase()));
        if (!matchesTitle && !matchesTags && !matchesBio && !matchesServicesBreakdown) return false;
      }

      // Search text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesLabel = n.label.toLowerCase().includes(q);
        const matchesBio = n.bio ? n.bio.toLowerCase().includes(q) : false;
        const matchesTitle = n.title ? n.title.toLowerCase().includes(q) : false;
        const matchesLocation = n.location ? n.location.toLowerCase().includes(q) : false;
        const matchesTags = n.tags ? n.tags.some(t => t.toLowerCase().includes(q)) : false;
        const matchesHighlights = n.highlights ? n.highlights.some(h => h.toLowerCase().includes(q)) : false;
        if (!matchesLabel && !matchesBio && !matchesTitle && !matchesLocation && !matchesTags && !matchesHighlights) return false;
      }

      return true;
    });
  }, [nodes, selectedCategory, locationFilter, stageFilter, hourlyRateFilter, selectedTechTag, selectedService, searchQuery]);

  // Handle Introduction Request
  const handleRequestIntro = async () => {
    if (!introTarget) return;
    const requiredCredits = 25;
    if (credits < requiredCredits) {
      alert("Insufficient AI credits. You need at least 25 credits to request an introduction.");
      return;
    }

    setIsSubmittingIntro(true);
    try {
      const res = await fetch("/api/introductions/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterName: "Founder / Ecosystem Member",
          targetEntityName: introTarget.label,
          pitchNote: pitchNote || "Interested in exploring synergy and partnership.",
          creditsDeducted: requiredCredits
        })
      });
      await res.json();
      deductCredits(requiredCredits);

      setIntroSuccessMsg(`Introduction request dispatched to ${introTarget.label}! 25 credits deducted.`);
      showToast(`Introduction request dispatched to ${introTarget.label}!`);
      setTimeout(() => {
        setIntroTarget(null);
        setIntroSuccessMsg(null);
        setPitchNote("");
      }, 2500);
    } catch (err) {
      console.error("Failed to request intro:", err);
      alert("Failed to submit introduction request. Please try again.");
    } finally {
      setIsSubmittingIntro(false);
    }
  };

  const handleOpenIntroModal = (target: GraphNode) => {
    if (!user) {
      onOpenAuth?.("signup", `Request direct introduction to ${target.label} and unlock verified contact channels`);
      return;
    }
    setIntroTarget(target);
  };

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedService("ALL");
    setLocationFilter("ALL");
    setStageFilter("ALL");
    setHourlyRateFilter("ALL");
    setSelectedTechTag("ALL");
    setSearchQuery("");
  };

  const isFilterActive = selectedCategory !== "ALL" || locationFilter !== "ALL" || selectedService !== "ALL" || hourlyRateFilter !== "ALL" || stageFilter !== "ALL" || selectedTechTag !== "ALL" || searchQuery.trim() !== "";

  return (
    <div id="yellow-pages-directory-container" className="space-y-6">
      {/* Visitor Preview Mode Banner if !user */}
      {!user && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 p-4 sm:p-5 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Visitor Preview Mode</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    FREE SIGN-UP REQUIRED
                  </span>
                </div>
                <p className="text-slate-300 text-xs font-sans mt-0.5">
                  You are previewing public directory listings. <strong>Sign up free</strong> with your name and email to request direct introductions, access verified contacts, and join the 961AI Community Mailing List.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenAuth?.("signup", "Request founder introductions and view verified directory contacts")}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-mono"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sign Up Free to Access</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Header Hero Banner & Bottom Navigation */}
      <div className="rounded-2xl bg-white border-2 border-[#B0CFAD] p-6 md:p-8 shadow-xs space-y-6">
        {/* Top Header Row: Breadcrumb & Title Context */}
        <div className="space-y-3">
          {/* Breadcrumb & Layer Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onNavigateToHome}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#2E5A2C] hover:text-[#1E3B1D] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-400 text-xs">/</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] flex items-center gap-1 font-mono">
              <Layers className="w-3 h-3 text-[#4D7D4B]" />
              <span>Layer 3 Yellow Pages Directory</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 font-mono">
              {nodes.filter(n => n.type !== "Skill" && n.type !== "Location").length} Verified Entities Indexed
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              Lebanon AI Yellow Pages Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl leading-relaxed mt-1.5 font-sans">
              Comprehensive institutional directory of verified Lebanese AI startups, machine learning & software agencies, diaspora researchers, venture capital funds, and incubation hubs with cross-linked wikis and automated synergy routing.
            </p>
          </div>

          {/* Quick Ecosystem Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="p-2 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] flex items-center gap-2">
              <Laptop className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 font-mono block">AI & Dev Agencies</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{agencyNodesCount} Verified</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-700 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 font-mono block">Startups & Labs</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{startupNodesCount} Scaled</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 font-mono block">Gurus & Talent</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{nodes.filter(n => n.type === "Guru").length} Experts</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-rose-700 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 font-mono block">VCs & Hubs</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{nodes.filter(n => n.type === "Investor" || n.type === "Hub").length} Capital</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-[#F6FAF5] border-2 border-[#B0CFAD] rounded-xl p-3 shadow-xs">
          <Search className="w-5 h-5 text-[#2E5A2C] ml-1.5 shrink-0" />
          <input
            type="text"
            placeholder="Search by entity name, service, technology tag (e.g. LLM, Computer Vision, FinTech), location, or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-slate-700 hover:text-black px-2.5 py-1 bg-white border border-[#B0CFAD] rounded-md font-bold shrink-0 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Buttons Placed at the Bottom of the Section */}
        <div className="pt-3 border-t border-[#D7E7D6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#2E5A2C]" />
            <span>Quick Directory Actions</span>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5">
            {/* 1. Back to Home */}
            <button
              id="dir-btn-back-home"
              onClick={onNavigateToHome}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-[#2E5A2C] font-bold text-xs sm:text-sm border-2 border-[#B0CFAD] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#2E5A2C]" />
              <span>Back to Home</span>
            </button>

            {/* 2. Join / Submit Entity */}
            {onNavigateToQuestionnaire && (
              <button
                id="dir-btn-join-entity"
                onClick={onNavigateToQuestionnaire}
                style={{ color: "#ffffff" }}
                className="px-4 py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white !text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-[#1E3B1D]"
              >
                <Sparkles className="w-4 h-4 !text-white text-white" style={{ color: "#ffffff" }} />
                <span style={{ color: "#ffffff" }} className="!text-white text-white font-bold">Join / Submit Entity</span>
              </button>
            )}

            {/* 3. Provider Marketplace */}
            {onNavigateToMarketplace && (
              <button
                id="dir-btn-marketplace"
                onClick={onNavigateToMarketplace}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-slate-900 font-bold text-xs sm:text-sm border-2 border-[#D7E7D6] hover:border-[#B0CFAD] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Laptop className="w-4 h-4 text-[#4D7D4B]" />
                <span>Provider Marketplace</span>
              </button>
            )}

            {/* 4. Knowledge Graph */}
            {onOpenGraphView && (
              <button
                id="dir-btn-graph"
                onClick={onOpenGraphView}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-slate-900 font-bold text-xs sm:text-sm border-2 border-[#D7E7D6] hover:border-[#B0CFAD] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Network className="w-4 h-4 text-[#4D7D4B]" />
                <span>Knowledge Graph</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Filters + Directory Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 bg-white border-2 border-[#D7E7D6] rounded-2xl p-5 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EBF3EA] pb-3">
            <h2 className="text-sm font-black text-[#000000] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#4D7D4B]" />
              <span>Taxonomy Filters</span>
            </h2>
            {isFilterActive && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#2E5A2C] hover:text-black transition-colors font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#000000] font-mono">
              Primary Stakeholder Type
            </label>
            <div className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#4D7D4B] text-white shadow-xs font-bold border border-[#3D633C]"
                        : "text-[#000000] bg-[#F6FAF5] hover:bg-[#EBF3EA] border border-[#D7E7D6] font-semibold"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#4D7D4B]"}`} />
                      <span>{cat.label}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isSelected ? "bg-[#3D633C] text-white" : "bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]"
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location / Diaspora Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#000000] font-mono">
              Geography & Reach
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-[#F6FAF5] p-1 rounded-xl border border-[#D7E7D6] text-[11px]">
              <button
                onClick={() => setLocationFilter("ALL")}
                className={`py-1.5 px-2 rounded-lg font-bold transition-all ${
                  locationFilter === "ALL" ? "bg-[#4D7D4B] text-white shadow-xs" : "text-[#000000] hover:text-[#2E5A2C]"
                }`}
              >
                All Regions
              </button>
              <button
                onClick={() => setLocationFilter("onshore")}
                className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  locationFilter === "onshore" ? "bg-[#4D7D4B] text-white shadow-xs" : "text-[#000000] hover:text-[#2E5A2C]"
                }`}
              >
                <span>🇱🇧 Onshore</span>
              </button>
              <button
                onClick={() => setLocationFilter("diaspora")}
                className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  locationFilter === "diaspora" ? "bg-[#4D7D4B] text-white shadow-xs" : "text-[#000000] hover:text-[#2E5A2C]"
                }`}
              >
                <span>🌍 Diaspora</span>
              </button>
              <button
                onClick={() => setLocationFilter("servesLebanon")}
                className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  locationFilter === "servesLebanon" ? "bg-[#4D7D4B] text-white shadow-xs" : "text-[#000000] hover:text-[#2E5A2C]"
                }`}
              >
                <span>🤝 Serves Lebanon</span>
              </button>
            </div>
          </div>

          {/* Sub-Service Taxonomy Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#000000] font-mono">
              Service / Core Domain
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-xl px-3 py-2 text-xs text-[#000000] font-semibold focus:outline-none"
            >
              {subServices.map((srv) => (
                <option key={srv} value={srv} className="bg-white text-black">
                  {srv}
                </option>
              ))}
            </select>
          </div>

          {/* Hourly Rate Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#000000] font-mono">
              Hourly Rate Filter
            </label>
            <select
              value={hourlyRateFilter}
              onChange={(e) => setHourlyRateFilter(e.target.value)}
              className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-xl px-3 py-2 text-xs text-[#000000] font-semibold focus:outline-none"
            >
              {hourlyRates.map((hr) => (
                <option key={hr} value={hr} className="bg-white text-black">
                  {hr === "ALL" ? "All Hourly Rates" : hr}
                </option>
              ))}
            </select>
          </div>

          {/* Funding Stage / Project Size Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#000000] font-mono">
              Stage / Project Size
            </label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-xl px-3 py-2 text-xs text-[#000000] font-semibold focus:outline-none"
            >
              {stages.map((stg) => (
                <option key={stg} value={stg} className="bg-white text-black">
                  {stg === "ALL" ? "All Project Sizes / Stages" : stg}
                </option>
              ))}
            </select>
          </div>

          {/* Popular Tech Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#000000] font-mono">
              Popular Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allTechTags.map((tag) => {
                const isActive = selectedTechTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTechTag(isActive ? "ALL" : tag)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      isActive
                        ? "bg-[#4D7D4B] text-white shadow-xs"
                        : "bg-[#F6FAF5] text-[#000000] border border-[#D7E7D6] hover:bg-[#EBF3EA]"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Entity Listing */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results Bar */}
          <div className="flex items-center justify-between bg-white border-2 border-[#D7E7D6] rounded-xl px-4 py-2.5 text-xs text-[#000000] font-mono">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#000000] text-sm">{filteredNodes.length}</span>
              <span className="font-medium text-slate-700">entities indexed in directory</span>
              {isFilterActive && (
                <span className="px-2 py-0.5 rounded bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] text-[10px] font-bold">
                  Filtered Active
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#2E5A2C] font-bold bg-[#EBF3EA] px-2 py-0.5 rounded border border-[#B0CFAD]">
                Intro Rate: 25 Credits
              </span>
            </div>
          </div>

          {/* Entity Cards Grid */}
          {filteredNodes.length === 0 ? (
            <div className="rounded-2xl border-2 border-[#D7E7D6] bg-white p-12 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#F6FAF5] border border-[#D7E7D6] flex items-center justify-center mx-auto text-slate-500">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No entities found</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                No verified nodes match your current search and filter combination. Try resetting your filters or submit a new entity.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-white border border-[#D7E7D6] text-slate-800 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  Reset All Filters
                </button>
                {onNavigateToQuestionnaire && (
                  <button
                    onClick={onNavigateToQuestionnaire}
                    className="px-4 py-2 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>List Entity / Ingest</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNodes.map((node) => {
                const isAgency = node.rating !== undefined || node.servicesBreakdown !== undefined || node.minProjectSize !== undefined;
                const isStartup = node.type === "Startup" && !isAgency;
                const isGuru = node.type === "Guru";
                const isInvestor = node.type === "Investor";
                const isHub = node.type === "Hub";

                return (
                  <div
                    key={node.id}
                    className="group rounded-2xl bg-white hover:bg-[#F6FAF5] border-2 border-[#D7E7D6] hover:border-[#75AC73] p-5 transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isAgency ? "bg-emerald-50 text-emerald-900 border border-emerald-400" :
                            isStartup ? "bg-indigo-50 text-indigo-900 border border-indigo-300" :
                            isGuru ? "bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]" :
                            isInvestor ? "bg-amber-50 text-amber-900 border border-amber-400" :
                            "bg-teal-50 text-teal-900 border border-teal-300"
                          }`}>
                            {isAgency ? "Software & AI Agency" : node.type}
                          </span>

                          {node.premierVerified && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-400">
                              <Award className="w-3 h-3 text-amber-600" />
                              <span>Premier Verified</span>
                            </span>
                          )}

                          {!node.premierVerified && node.verified && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]">
                              <ShieldCheck className="w-3 h-3 text-[#4D7D4B]" />
                              <span>Verified</span>
                            </span>
                          )}

                          {node.servesLebanon || node.location?.toLowerCase().includes("serves lebanon") ? (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                              <span>🇱🇧 Serves Lebanon</span>
                            </span>
                          ) : node.isDiaspora ? (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-300">
                              <Globe className="w-3 h-3" />
                              <span>Diaspora</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-300">
                              <span>🇱🇧 Onshore Node</span>
                            </span>
                          )}
                        </div>

                        {/* Rating or Stage Tag */}
                        {node.rating !== undefined ? (
                          <div className="flex items-center gap-1 bg-[#F6FAF5] border border-[#B0CFAD] px-2 py-0.5 rounded-lg text-black font-black text-xs">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span>{node.rating.toFixed(1)}</span>
                            {node.reviewCount !== undefined && (
                              <span className="text-[10px] text-[#000000] font-semibold">({node.reviewCount})</span>
                            )}
                          </div>
                        ) : node.stage ? (
                          <span className="text-[11px] font-mono text-[#000000] font-bold bg-white px-2 py-0.5 rounded-md border border-[#D7E7D6]">
                            {node.stage}
                          </span>
                        ) : null}
                      </div>

                      {/* Title & Headline */}
                      <div>
                        <button
                          onClick={() => onSelectNode(node)}
                          className="text-left group-hover:text-[#2E5A2C] transition-colors"
                        >
                          <h3 className="text-base font-black text-[#000000] flex items-center gap-1.5">
                            <span>{node.label}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#4D7D4B]" />
                          </h3>
                        </button>
                        {node.title && (
                          <p className="text-xs font-bold text-[#2E5A2C] mt-0.5 line-clamp-1">
                            {node.title}
                          </p>
                        )}
                      </div>

                      {/* Agency Specific Metrics Row */}
                      {isAgency && (
                        <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-[#F6FAF5] rounded-xl border border-[#D7E7D6] text-[11px]">
                          <div>
                            <span className="text-[10px] text-[#000000] block uppercase font-mono font-semibold">Min Project</span>
                            <span className="font-bold text-[#000000]">{node.minProjectSize || "$1,000+"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#000000] block uppercase font-mono font-semibold">Hourly Rate</span>
                            <span className="font-bold text-[#000000]">{node.hourlyRate || "Undisclosed"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#000000] block uppercase font-mono font-semibold">Team Size</span>
                            <span className="font-bold text-[#000000]">{node.teamSize || "50 - 249"}</span>
                          </div>
                        </div>
                      )}

                      {/* Location & Affiliation */}
                      <div className="flex items-center gap-3 text-xs text-[#000000] font-medium">
                        {node.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#4D7D4B] shrink-0" />
                            <span className="truncate">{node.location}</span>
                          </span>
                        )}
                        {node.connectionsCount && (
                          <span className="flex items-center gap-1 font-mono text-[11px] text-[#000000] font-semibold">
                            <span>{node.connectionsCount} links</span>
                          </span>
                        )}
                      </div>

                      {/* Bio Summary */}
                      {node.bio && (
                        <p className="text-xs text-[#000000] font-medium line-clamp-2 leading-relaxed">
                          {node.bio}
                        </p>
                      )}

                      {/* Services Breakdown Bar (if present) */}
                      {node.servicesBreakdown && node.servicesBreakdown.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-[10px] text-[#000000] font-mono font-bold">
                            <span>Services Breakdown</span>
                            <span>{node.servicesBreakdown[0]?.percentage}% {node.servicesBreakdown[0]?.name}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {node.servicesBreakdown.map((s, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD] text-[10px] font-bold"
                              >
                                {s.percentage}% {s.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights Badges (if present) */}
                      {node.highlights && node.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {node.highlights.map((hl, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-bold"
                            >
                              ✓ {hl}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Cross-linked Tags (Karpathy [[Wikilinks]]) */}
                      {node.tags && node.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {node.tags.slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-white text-[#000000] border border-[#D7E7D6] text-[10px] font-mono font-bold hover:border-[#75AC73] hover:text-[#2E5A2C] transition-colors"
                            >
                              [[{t}]]
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3 border-t border-[#D7E7D6] flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectNode(node)}
                        className="text-xs font-bold text-[#000000] hover:text-[#2E5A2C] flex items-center gap-1 py-1.5 px-3 rounded-lg bg-white border border-[#D7E7D6] hover:bg-[#EBF3EA] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#4D7D4B]" />
                        <span>Inspect Wiki</span>
                      </button>

                      <button
                        onClick={() => handleOpenIntroModal(node)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                      >
                        <Send className="w-3 h-3" />
                        <span>{isAgency ? "Contact & Request Intro" : "Request Intro (25 CR)"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Introduction Request Modal */}
      {introTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EBF3EA] text-[#4D7D4B] border border-[#B0CFAD]">
                  Direct Syndicate Introduction
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Request Introduction to {introTarget.label}
                </h3>
                <p className="text-xs text-slate-500">
                  {introTarget.title || introTarget.location}
                </p>
              </div>
              <button
                onClick={() => setIntroTarget(null)}
                className="text-slate-400 hover:text-slate-800 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {introSuccessMsg ? (
              <div className="p-4 rounded-xl bg-[#EBF3EA] border border-[#B0CFAD] text-[#4D7D4B] text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5A8D58] shrink-0" />
                <span>{introSuccessMsg}</span>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#D7E7D6] text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between text-slate-700 font-medium">
                    <span>Introduction Protocol:</span>
                    <span className="text-[#4D7D4B] font-bold">Concierge Warm Forwarding</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Your Balance:</span>
                    <span className="font-mono text-amber-700 font-bold">{credits} AI Credits</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Cost:</span>
                    <span className="font-mono text-rose-600 font-bold">-25 Credits</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Pitch Note / Context for {introTarget.label}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly state your purpose (e.g., Seed investment thesis fit, requesting technical advisory on LLMs, or co-founder discussion)..."
                    value={pitchNote}
                    onChange={(e) => setPitchNote(e.target.value)}
                    className="w-full bg-[#FAFCFA] border border-[#D7E7D6] rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#75AC73]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIntroTarget(null)}
                    className="px-4 py-2 rounded-xl bg-white border border-[#D7E7D6] hover:bg-[#EBF3EA] text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestIntro}
                    disabled={isSubmittingIntro}
                    className="px-4 py-2 rounded-xl bg-[#75AC73] hover:bg-[#5A8D58] disabled:opacity-50 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
                  >
                    {isSubmittingIntro ? (
                      <span>Dispatching Intro...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm & Send Request (25 CR)</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastFeedback && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold font-mono animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastFeedback}</span>
        </div>
      )}
    </div>
  );
};
