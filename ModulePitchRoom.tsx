import React, { useState } from "react";
import { GraphNode, GraphEdge, StartupNewsArticle, KnowledgeResource, UserAuthSession } from "../../types";
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
  Network,
  Newspaper,
  TrendingUp,
  ArrowRight,
  Clock,
  Laptop,
  Award,
  BarChart3,
  Printer,
  MessageCircle,
  BookOpen,
  Copy,
  Check,
  Eye,
  X,
  Filter,
  ChevronRight,
  Info,
  Trophy,
  LogIn,
  UserPlus,
  UserCheck,
  Mail,
  Brain,
  Lightbulb,
  GitMerge,
  Landmark,
  HelpCircle
} from "lucide-react";
import { addSubscriberToMailingList } from "../../lib/mailingList";
import { SocialMediaBanner } from "../SocialMediaBanner";
import { CommunityNewsSection } from "./CommunityNewsSection";
import { DailyEcosystemDigestBanner } from "../DailyEcosystemDigestBanner";
import { HomePublishedResearchSection } from "../home/HomePublishedResearchSection";

interface ModuleHomePageProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
  deductCredits: (amount: number) => boolean;
  credits: number;
  onNavigateToQuestionnaire: () => void;
  onOpenGraphView?: () => void;
  onNavigateToMatchmaking?: () => void;
  onNavigateToDirectory: () => void;
  news?: StartupNewsArticle[];
  resources?: KnowledgeResource[];
  onNavigateToNews?: () => void;
  onNavigateToInvestmentReports?: (reportId?: string) => void;
  onNavigateToResearch?: () => void;
  onNavigateToMarketplace?: () => void;
  onNavigateToSandbox?: () => void;
  onNavigateToDashboard?: () => void;
  onQuickAskLegalAi?: (question: string) => void;
  onNavigateToAbout?: () => void;
  onNavigateToQuests?: () => void;
  onNavigateToPitchRoom?: () => void;
  onNavigateToSecondBrain?: () => void;
  onNavigateToIdeas?: () => void;
  onNavigateToMita?: () => void;
  onNavigateToPricing?: () => void;
  onNavigateToCommunityNews?: () => void;
  onNavigateToSubmitNews?: () => void;
  user?: UserAuthSession | null;
  onOpenAuth?: (mode?: "signin" | "signup", reason?: string) => void;
}

export const ModuleHomePage: React.FC<ModuleHomePageProps> = ({
  nodes,
  edges,
  onSelectNode,
  deductCredits,
  credits,
  onNavigateToQuestionnaire,
  onOpenGraphView,
  onNavigateToMatchmaking,
  onNavigateToDirectory,
  news = [],
  resources = [],
  onNavigateToNews,
  onNavigateToInvestmentReports,
  onNavigateToResearch,
  onNavigateToMarketplace,
  onNavigateToSandbox,
  onNavigateToDashboard,
  onQuickAskLegalAi,
  onNavigateToAbout,
  onNavigateToQuests,
  onNavigateToPitchRoom,
  onNavigateToSecondBrain,
  onNavigateToIdeas,
  onNavigateToMita,
  onNavigateToPricing,
  onNavigateToCommunityNews,
  onNavigateToSubmitNews,
  user,
  onOpenAuth
}) => {
  // Search & Filter States for Home Page
  const [searchQuery, setSearchQuery] = useState("");

  // Join Our Mailing List subscription states
  const [dispatchName, setDispatchName] = useState(user?.name || "");
  const [dispatchEmail, setDispatchEmail] = useState(user?.email || "");
  const [dispatchRole, setDispatchRole] = useState(user?.role || "Founder");
  const [dispatchSubscribed, setDispatchSubscribed] = useState(false);
  const [lastSubscribedName, setLastSubscribedName] = useState("");

  const handleDispatchSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = (dispatchEmail || "").trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      alert("Please provide a valid email address to join the network mailing list.");
      return;
    }
    const enteredName = dispatchName.trim() || user?.name || cleanEmail.split("@")[0];
    addSubscriberToMailingList(
      cleanEmail,
      enteredName,
      dispatchRole || user?.role || "Founder",
      "Quick Lead Capture",
      user?.affiliation || "Lebanese AI Ecosystem Member",
      "Subscribed via Join Our Mailing List Hero Section Widget"
    );
    setLastSubscribedName(enteredName);
    setDispatchSubscribed(true);
    setDispatchEmail("");
    setDispatchName("");
    setTimeout(() => setDispatchSubscribed(false), 6000);
  };

  const [toastFeedback, setToastFeedback] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastFeedback(msg);
    setTimeout(() => setToastFeedback(null), 3000);
  };

  return (
    <div id="home-container" className="space-y-6">
      {/* Header Banner - Centered z961AINETWORK Headline & Paul Graham Quote */}
      <div id="home-hero-section" className="rounded-2xl bg-white border-2 border-[#B0CFAD] p-6 md:p-8 shadow-xs space-y-6">
        {/* Top: Centered z961AINETWORK & Paul Graham Quote */}
        <div className="space-y-4 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#EBF3EA] text-[#2E5A2C] border-2 border-[#75AC73] shadow-2xs">
              EcoSystemPortal
            </span>
            <span className="text-xs text-[#000000] font-mono font-semibold">
              LLM Knowledge Index
            </span>
            <span className="hidden sm:inline-block text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono font-medium">
              Law 126/2019 Ready
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-black text-[#000000] tracking-tight uppercase leading-none">
            z961AINETWORK
          </h1>

          <div className="space-y-1 text-center">
            <p className="text-sm sm:text-base font-bold text-[#2E5A2C] tracking-wide uppercase">
              A Proud Initiative of NCEILEBANON and ALKHAWARIZMI SOLUTIONS
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-mono tracking-wider uppercase">
              HOME OF LEBANON AI CREATORS AND INITIATIVES
            </p>
          </div>

          {/* Paul Graham Quote */}
          <div className="max-w-2xl mx-auto bg-[#F6FAF5] border-2 border-[#D7E7D6] rounded-xl p-4 sm:p-5 shadow-2xs space-y-2 text-center">
            <p className="text-xs sm:text-sm text-slate-800 font-serif italic leading-relaxed">
              “The way to get the very best startup ideas is not to look for startup ideas. If you’re consciously looking for them, you’ll be too conservative. You’ll lop off the outliers.”
            </p>
            <p className="text-xs sm:text-sm text-slate-900 font-serif italic font-medium leading-relaxed">
              “Instead, work on projects with your friends. Build things you think would be cool.”
            </p>
            <div className="pt-1 text-[11px] font-mono font-black text-[#2E5A2C] tracking-wide uppercase">
              — Paul Graham on How to Get Startup Ideas
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-[#F6FAF5] border-2 border-[#B0CFAD] rounded-xl p-2.5 shadow-xs">
          <div className="flex items-center gap-2 w-full">
            <Search className="w-5 h-5 text-[#2E5A2C] ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, technology (e.g. LLM, Computer Vision), university (AUB, LAU), or diaspora city (SF, Paris, Dubai)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onNavigateToDirectory();
                }
              }}
              className="w-full bg-transparent text-sm text-[#000000] font-medium placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#000000] hover:text-black px-2.5 py-1 bg-white border border-[#B0CFAD] rounded-md font-bold shrink-0 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={onNavigateToDirectory}
            style={{ color: "#ffffff" }}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-black hover:bg-neutral-800 !text-white text-xs font-bold shrink-0 flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <span style={{ color: "#ffffff" }} className="!text-white font-bold">Search in Directory</span>
            <ArrowRight className="w-3.5 h-3.5 !text-white text-white" style={{ color: "#ffffff" }} />
          </button>
        </div>

        {/* Platform Core Modules & Quick Access (Moved before Priority Ecosystem Links & Intelligence Engines) */}
        <div id="hero-platform-core-modules" className="pt-4 border-t border-[#D7E7D6] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-black" />
              <span>Platform Core Modules & Quick Access</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-semibold">Core Services</span>
          </div>

          {/* Quick Access Modules Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {/* 1. Yellow Pages Directory */}
            <button
              onClick={onNavigateToDirectory}
              style={{ color: "#ffffff" }}
              className="px-3.5 py-3 rounded-xl bg-black hover:bg-neutral-800 !text-white font-black text-xs sm:text-sm border-2 border-black shadow-xs flex items-center justify-between gap-2 transition-all transform active:scale-98 group cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Layers className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff" }} />
                <span style={{ color: "#ffffff" }} className="truncate !text-white font-black">Yellow Pages ({nodes.filter(n => n.type !== "Skill" && n.type !== "Location").length})</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 !text-white text-white group-hover:translate-x-0.5 transition-transform shrink-0" style={{ color: "#ffffff" }} />
            </button>

            {/* 2. Join / Submit Entity */}
            <button
              onClick={onNavigateToQuestionnaire}
              style={{ color: "#ffffff" }}
              className="px-3.5 py-3 rounded-xl bg-black hover:bg-neutral-800 !text-white font-bold text-xs sm:text-sm border-2 border-black shadow-xs flex items-center justify-between gap-2 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff" }} />
                <span style={{ color: "#ffffff" }} className="truncate !text-white font-bold">Join / Submit Entity</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 !text-white text-white group-hover:translate-x-0.5 transition-transform shrink-0" style={{ color: "#ffffff" }} />
            </button>

            {/* 3. Quests & Rewards */}
            {onNavigateToQuests && (
              <button
                onClick={onNavigateToQuests}
                className="px-3.5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm border-2 border-neutral-300 hover:border-black shadow-2xs flex items-center justify-between gap-2 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Trophy className="w-4 h-4 text-black shrink-0" />
                  <span className="truncate">Quests & Rewards</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )}

            {/* 4. Ecosystem Dashboard */}
            {onNavigateToDashboard && (
              <button
                onClick={onNavigateToDashboard}
                className="px-3.5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm border-2 border-neutral-300 hover:border-black shadow-2xs flex items-center justify-between gap-2 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <BarChart3 className="w-4 h-4 text-black shrink-0" />
                  <span className="truncate">Ecosystem Dashboard</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )}

            {/* 5. Provider Marketplace */}
            {onNavigateToMarketplace && (
              <button
                onClick={onNavigateToMarketplace}
                className="px-3.5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm border-2 border-neutral-300 hover:border-black shadow-2xs flex items-center justify-between gap-2 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Laptop className="w-4 h-4 text-black shrink-0" />
                  <span className="truncate">Provider Marketplace</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )}

            {/* 6. Knowledge Graph */}
            {onOpenGraphView && (
              <button
                onClick={onOpenGraphView}
                className="px-3.5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm border-2 border-neutral-300 hover:border-black shadow-2xs flex items-center justify-between gap-2 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Network className="w-4 h-4 text-black shrink-0" />
                  <span className="truncate">Knowledge Graph</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Ecosystem Buttons & Links (Requested) */}
        <div id="hero-featured-links" className="pt-4 border-t border-[#D7E7D6] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Priority Ecosystem Links & Intelligence Engines</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-semibold">Direct Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {/* 1. 💡 IdeasLab & "Got an Idea?" (NEW) */}
            <a
              id="hero-link-ideaslab"
              href="/ideas"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToIdeas?.();
              }}
              className="relative p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 hover:from-slate-800 hover:to-slate-900 text-white border-2 border-slate-800 hover:border-amber-400/90 shadow-xs flex flex-col justify-between gap-2.5 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-lg" role="img" aria-label="IdeasLab">💡</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black font-mono bg-amber-400 text-slate-950 border border-amber-300 shadow-2xs animate-pulse">
                  NEW
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-black font-mono text-white group-hover:text-amber-300 transition-colors leading-tight">
                  💡 IdeasLab & "Got an Idea?"
                </div>
                <div className="text-[11px] text-slate-300 font-sans leading-snug">
                  AI World Case Studies & Ecosystem Feedback Platform
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-amber-300 font-bold">
                <span>Explore / Submit</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-300" />
              </div>
            </a>

            {/* 2. 🧠 Second Brain (NotebookLLM) (AUTO-UNLOCKED) */}
            <a
              id="hero-link-second-brain"
              href="/second-brain"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToSecondBrain?.();
              }}
              className="relative p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950/90 hover:from-slate-800 hover:to-emerald-900 text-white border-2 border-emerald-800/70 hover:border-emerald-400 shadow-xs flex flex-col justify-between gap-2.5 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-lg" role="img" aria-label="Second Brain">🧠</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black font-mono bg-emerald-500 text-white border border-emerald-400 shadow-2xs">
                  AUTO-UNLOCKED
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-black font-mono text-white group-hover:text-emerald-300 transition-colors leading-tight">
                  🧠 Second Brain (NotebookLLM)
                </div>
                <div className="text-[11px] text-slate-300 font-sans leading-snug">
                  Personal AI Copilot & Multi-Doc Synthesis
                </div>
              </div>
              <div className="pt-1.5 border-t border-emerald-900/60 flex items-center justify-between text-[10px] font-mono text-emerald-300 font-bold">
                <span>Launch Notebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-emerald-300" />
              </div>
            </a>

            {/* 3. Provider Marketplace & Agencies */}
            <a
              id="hero-link-marketplace"
              href="/marketplace"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToMarketplace?.();
              }}
              className="relative p-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-black shadow-xs flex flex-col justify-between gap-2.5 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                  <Laptop className="w-4 h-4 text-black" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-slate-100 text-slate-700 border border-slate-200">
                  Verified
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-black font-mono text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                  Provider Marketplace & Agencies
                </div>
                <div className="text-[11px] text-slate-500 font-sans leading-snug">
                  Verified Software, AI Dev & Systems Integrators
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-700 font-bold">
                <span>Browse Agencies</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 4. Synergy & Matchmaking Engine */}
            <a
              id="hero-link-matchmaking"
              href="/matchmaking"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToMatchmaking?.();
              }}
              className="relative p-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-black shadow-xs flex flex-col justify-between gap-2.5 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                  <GitMerge className="w-4 h-4 text-black" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-slate-100 text-slate-700 border border-slate-200">
                  VC Scoring
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-black font-mono text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                  Synergy & Matchmaking Engine
                </div>
                <div className="text-[11px] text-slate-500 font-sans leading-snug">
                  Bespoke Deal Flow, Venture Scoring & Memos
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-700 font-bold">
                <span>Request Matches</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 5. Diaspora Pitch Room Syndicate */}
            <a
              id="hero-link-pitch-room"
              href="/pitch-room"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToPitchRoom?.();
              }}
              className="relative p-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-black shadow-xs flex flex-col justify-between gap-2.5 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4 text-black" />
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Diaspora SPVs
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-black font-mono text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                  Diaspora Pitch Room Syndicate
                </div>
                <div className="text-[11px] text-slate-500 font-sans leading-snug">
                  Automated Deck & Code Audit, Readiness Score
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-700 font-bold">
                <span>Enter Pitch Room</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* News from the community Section (Requested: Placed directly under Priority Ecosystem Links & Intelligence Engines) */}
        <div className="pt-4 border-t border-[#D7E7D6]">
          <CommunityNewsSection
            onNavigateToCommunityNews={onNavigateToCommunityNews || (() => {})}
            onNavigateToSubmitNews={onNavigateToSubmitNews || (() => {})}
          />
        </div>

        {/* Bottom of Section: Central Sign In / Sign Up */}
        <div className="pt-4 border-t border-[#D7E7D6]">
          <div id="headline-auth-section" className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono">
            {user ? (
              <div className="flex flex-wrap items-center justify-center gap-3 bg-[#F4F9F3] border border-[#B0CFAD] rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-slate-900">Signed In:</span>
                  <span className="font-bold text-[#2E5A2C]">{user.name}</span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-300">
                    {user.tier === "pro" ? "Pro Plan ($100/yr)" : "6-Hour Demo"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth?.("signin")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-black text-slate-800 hover:text-black text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Switch Account</span>
                  </button>
                  <button
                    onClick={() => onOpenAuth?.("signup")}
                    style={{ color: "#ffffff" }}
                    className="px-3.5 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white !text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <UserPlus className="w-3.5 h-3.5 !text-white text-white" style={{ color: "#ffffff" }} />
                    <span style={{ color: "#ffffff" }} className="!text-white text-white font-bold">New Account</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-xl">
                <button
                  id="hero-sign-in-btn"
                  onClick={() => onOpenAuth?.("signin")}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-50 text-slate-900 font-bold text-xs sm:text-sm border-2 border-slate-300 hover:border-black shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-700" />
                  <span>Sign In</span>
                </button>

                <button
                  id="hero-sign-up-btn"
                  onClick={() => onOpenAuth?.("signup")}
                  className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm border-2 border-emerald-800 shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-emerald-200" />
                  <span>Sign Up (6-Hour Demo / Pro)</span>
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono font-normal ml-1">Free</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Published Research Section: 1 Row 4 Columns with Excerpts and Direct PDFs */}
      <HomePublishedResearchSection
        id="home-admin-published-research-section"
        user={user}
        onOpenAuth={onOpenAuth}
        onNavigateToResearch={onNavigateToResearch || (() => {})}
      />

      {/* Daily Ecosystem Digest Email Subscription Banner (Requested: Directly After Hero Section) */}
      <DailyEcosystemDigestBanner
        id="home-daily-ecosystem-digest-banner"
        user={user}
        onNavigateToNews={onNavigateToNews}
        onNavigateToInvestmentReports={onNavigateToInvestmentReports}
      />

      {/* Community Social Media Network Banner - Right Before Joint National Initiative */}
      <SocialMediaBanner id="home-pre-joint-social-media-banner" />

      {/* Joint National Initiative - Alkharizmi Solutions & NCEI Lebanon Joint Platform (Moved right after Hero Section) */}
      <section id="joint-national-initiative-section" className="p-6 md:p-7 rounded-2xl bg-white border-2 border-[#B0CFAD] shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#2E5A2C] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
              Joint National Initiative
            </span>
            <span className="text-xs font-bold text-[#2E5A2C]">
              Alkharizmi Solutions & NCEI Lebanon Joint Platform
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            961AI Yellow Pages  Ecosystem & Diaspora DeepTech Bridge
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A unified national infrastructure uniting Lebanese onshore researchers, high-performance computing labs, and global diaspora venture syndicates under Lebanese Offshore Law 126/2019 and international GDPR data sovereignty standards.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[#F6FAF5] border border-[#D7E7D6] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E5A2C]" />
              <span className="text-slate-600 font-medium">Sovereign Law:</span>
              <strong className="text-[#2E5A2C]">Law 126/2019</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F6FAF5] border border-[#D7E7D6] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A2C]" />
              <span className="text-slate-600 font-medium">Data Standard:</span>
              <strong className="text-[#2E5A2C]">GDPR Compliant</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons: Join 961AI Network & What's In It For You */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
          {/* Button 1: Join 961AI Network */}
          <a
            id="btn-joint-join-network"
            href="/join"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateToQuestionnaire) {
                onNavigateToQuestionnaire();
              } else if (onOpenAuth) {
                onOpenAuth("signup");
              }
            }}
            style={{ color: "#ffffff" }}
            className="px-5 py-3 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] !text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all transform active:scale-98 cursor-pointer text-center"
          >
            <UserPlus className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff" }} />
            <span style={{ color: "#ffffff" }} className="!text-white font-bold whitespace-nowrap">Join 961AI Network</span>
            <ArrowRight className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff" }} />
          </a>

          {/* Button 2: What's In It For You */}
          <a
            id="btn-joint-whats-in-it"
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateToAbout) {
                onNavigateToAbout();
              } else if (onNavigateToPricing) {
                onNavigateToPricing();
              }
            }}
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all transform active:scale-98 cursor-pointer text-center"
          >
            <HelpCircle className="w-4 h-4 text-[#2E5A2C] shrink-0" />
            <span className="whitespace-nowrap">What's In It For You</span>
            <ChevronRight className="w-4 h-4 text-slate-700 shrink-0" />
          </a>
        </div>
      </section>

      {/* MODULE 19 • IDEAS & BENCHMARKS LAB: Introduction Section */}
      <section
        id="ideas-lab-intro-section"
        className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0F2212] border-2 border-emerald-500/50 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden font-sans"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-5">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>MODULE 19 • IDEAS & BENCHMARKS LAB</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                IdeasLab: Global Benchmarks & Ecosystem Voice
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                Two integrated environments: MIT-style global case studies and the Lebanese feedback platform.
              </p>
            </div>

            {/* Direct access button */}
            {onNavigateToIdeas && (
              <button
                onClick={onNavigateToIdeas}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer self-start md:self-auto"
              >
                <span>Launch IdeasLab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Two Integrated Environments Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Environment 1: "Got an Idea?" Feedback Platform */}
            <div
              onClick={() => onNavigateToIdeas && onNavigateToIdeas()}
              className="p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400/70 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Community Voice
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>"Got an Idea?" Feedback Platform</span>
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Submit, upvote, and track sovereign deep tech and policy proposals. Direct feedback triage with regulatory sandboxes and diaspora co-investment syndicates.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Structured Intake • Peer Upvoting</span>
                <span className="text-amber-400 font-bold group-hover:underline">Submit Idea →</span>
              </div>
            </div>

            {/* Environment 2: AI World Case Studies (MIT-Style) */}
            <div
              onClick={() => onNavigateToIdeas && onNavigateToIdeas()}
              className="p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400/70 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  MIT Benchmarks
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>AI World Case Studies</span>
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  MIT-style global benchmark dossiers across sovereign compute, healthcare LLMs, behavioral public sector pilots, and legal tech with lessons for Lebanon.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Case Studies • Global Benchmarks</span>
                <span className="text-emerald-400 font-bold group-hover:underline">Explore Dossiers →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MODULE 2 SPECIFICATION - Two-Way Matchmaking Engine & AI Memo */}
      <section
        id="module-2-specification-section"
        className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden font-mono"
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 space-y-5">
          {/* Header Tag & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
                <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
                <span>MODULE 2 SPECIFICATION</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                Deterministic SQL/Cypher + Vector Scoring
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Gemini 3.7 Institutional Engine</span>
            </div>
          </div>

          {/* Title & Subheading */}
          <div className="max-w-4xl space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight font-sans">
              Two-Way Matchmaking Engine & AI Memo
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Deterministic SQL/Cypher filters combined with multi-vector scoring and automated Gemini 3.7 Institutional Investment Briefs.
            </p>
          </div>

          {/* Mathematical Formula Banner */}
          <div className="p-4 sm:p-5 bg-slate-950/90 border border-emerald-500/30 rounded-xl space-y-2.5 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                Scoring Function Formulation:
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                ∑(w₁...w₄) = 1.0 • Normalized Multi-Vector Matrix
              </span>
            </div>

            <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-800 text-emerald-400 font-bold text-xs sm:text-sm md:text-base tracking-wide overflow-x-auto select-all">
              MatchScore = (w₁ · DomainSim) + (w₂ · StageCheck) + (w₃ · SkillOverlap) + (w₄ · DiasporaSynergy)
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] sm:text-[11px] text-slate-400 font-sans">
              <div className="flex items-center gap-1">
                <span className="text-emerald-400 font-mono font-bold">w₁:</span> Domain & Thesis (35%)
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-400 font-mono font-bold">w₂:</span> Stage Compatibility (25%)
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-400 font-mono font-bold">w₃:</span> Skill Overlap (20%)
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-400 font-mono font-bold">w₄:</span> Diaspora Synergy (20%)
              </div>
            </div>
          </div>

          {/* Action Links: Link to Service Page and Launch Engine */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-300 font-sans flex items-center gap-2">
              <span className="text-emerald-400 font-bold">Consortium Ecosystem:</span>
              <span>
                Available with Full Platform Access &amp; Yearly Membership (
                {onNavigateToPricing ? (
                  <button
                    onClick={onNavigateToPricing}
                    className="underline text-emerald-300 hover:text-emerald-100 font-medium cursor-pointer transition-colors"
                  >
                    see our services
                  </button>
                ) : (
                  <span className="text-emerald-300">see our services</span>
                )}
                ).
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {onNavigateToPricing && (
                <button
                  id="module-2-link-service-page-btn"
                  onClick={onNavigateToPricing}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 font-mono cursor-pointer"
                >
                  <span>Go to Services &amp; Membership ($100/yr)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onNavigateToMatchmaking && (
                <button
                  id="module-2-launch-engine-btn"
                  onClick={onNavigateToMatchmaking}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 font-mono cursor-pointer"
                >
                  <GitMerge className="w-3.5 h-3.5" />
                  <span>Launch Matchmaking Engine</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MITA Initiatives - Building the Digital Republic */}
      <section
        id="home-mita-initiatives-section"
        className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#0B2014] to-slate-900 border-2 border-emerald-500/40 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden font-mono"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>MITA Initiatives • Republic of Lebanon</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                Official Webpage: mitai.gov.lb
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Vision 2030 Transformation</span>
            </div>
          </div>

          <div className="max-w-4xl space-y-2 font-sans">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Building the Digital Republic: Inside Lebanon’s National AI and Technology Transformation Strategy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              In a region defined by resilience and reinvention, Lebanon is quietly laying the groundwork for its next great leap under the banner of a “startup ministry in a startup republic.”
            </p>
          </div>

          {/* Four Pillars Mini Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
              <div className="text-emerald-400 font-mono font-bold text-xs">Pillar 01</div>
              <div className="text-white font-bold text-xs font-sans">Governance Foundations</div>
              <div className="text-[11px] text-slate-400 font-sans leading-snug">Legal frameworks, sandboxes, cybersecurity &amp; AI Advisory Council.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
              <div className="text-emerald-400 font-mono font-bold text-xs">Pillar 02</div>
              <div className="text-white font-bold text-xs font-sans">Digital Infrastructure</div>
              <div className="text-[11px] text-slate-400 font-sans leading-snug">Lebanon Super App, National Digital ID, AI Data Centers &amp; Gov Cloud.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
              <div className="text-emerald-400 font-mono font-bold text-xs">Pillar 03</div>
              <div className="text-white font-bold text-xs font-sans">Talent Ecosystem</div>
              <div className="text-[11px] text-slate-400 font-sans leading-snug">Reversing brain drain, nationwide STEM, diaspora network &amp; civil service upskilling.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
              <div className="text-emerald-400 font-mono font-bold text-xs">Pillar 04</div>
              <div className="text-white font-bold text-xs font-sans">Growth &amp; Investments</div>
              <div className="text-[11px] text-slate-400 font-sans leading-snug">$500M target by 2027, Lebanese Tech &amp; AI Fund, Lebanon Angel Network.</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-300 font-sans flex items-center gap-2">
              <span className="text-emerald-400 font-bold">Source:</span>
              <a
                href="https://www.mitai.gov.lb/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-300 hover:text-emerald-100 font-mono text-[11px] flex items-center gap-1"
              >
                <span>https://www.mitai.gov.lb/</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {onNavigateToMita && (
                <button
                  id="home-open-mita-page-btn"
                  onClick={onNavigateToMita}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 font-mono cursor-pointer"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Read Full MITA Initiatives Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Join Our Mailing List */}
      <section id="join-our-mailing-list-section" className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#B0CFAD] shadow-xs font-mono text-[#000000] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#2E5A2C] text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-emerald-300" />
                <span>Join Our Mailing List</span>
              </span>
              <span className="text-xs font-semibold text-[#2E5A2C] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E5A2C]" />
                <span>Synced With Central Admin Repository</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
              Join Our Mailing List
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Subscribe to official Lebanese AI intelligence dispatches. Every subscriber’s name, role, and organization are synchronized directly into the centralized repository of all users in Admin for verified ecosystem intelligence, sovereign compute grants, and diaspora deals.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500 bg-[#F6FAF5] px-3.5 py-2 rounded-xl border border-[#D7E7D6] shrink-0 self-start lg:self-auto">
            <Users className="w-4 h-4 text-[#2E5A2C]" />
            <span className="font-bold text-[#2E5A2C]">GDPR & Law 126/2019</span>
            <span>Central CRM Opt-In</span>
          </div>
        </div>

        {/* Subscription Form with Name and Email */}
        <form onSubmit={handleDispatchSubscribe} className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-sans block">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Karim Haddad"
                value={dispatchName}
                onChange={(e) => setDispatchName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAFCFA] border border-[#D7E7D6] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2E5A2C] focus:ring-1 focus:ring-[#2E5A2C] font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-sans block">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@institution.lb"
                value={dispatchEmail}
                onChange={(e) => setDispatchEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAFCFA] border border-[#D7E7D6] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2E5A2C] focus:ring-1 focus:ring-[#2E5A2C] font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-sans block">
                Ecosystem Role
              </label>
              <select
                value={dispatchRole}
                onChange={(e) => setDispatchRole(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAFCFA] border border-[#D7E7D6] text-slate-900 focus:outline-none focus:border-[#2E5A2C] font-sans cursor-pointer"
              >
                <option value="Founder">Founder / Startup Lead</option>
                <option value="AI Guru / Researcher">AI Guru / Researcher</option>
                <option value="Investor">Investor / VC / Angel</option>
                <option value="Agency Lead">Software & AI Studio Lead</option>
                <option value="Academic / Stakeholder">Academic / Stakeholder</option>
              </select>
            </div>

            <div className="space-y-1 flex flex-col justify-end">
              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-98"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span style={{ color: "#ffffff" }} className="!text-white font-bold">Join Our Mailing List</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {dispatchSubscribed ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2.5 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold">
                  {lastSubscribedName ? `Success, ${lastSubscribedName}!` : "Subscribed successfully!"}
                </span>{" "}
                <span className="text-emerald-800 font-sans">
                  Your full name and verified credentials have been synced into the centralized repository of all users in Admin.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-sans pt-1">
              <span>✓ Added to centralized repository of Lebanese AI ecosystem intelligence in Admin</span>
              <span>✓ Zero spam • Explicit GDPR opt-in • Instant unsubscribe anytime via GDPR portal</span>
            </div>
          )}
        </form>
      </section>

      {/* ADVERTISING BANNER: Automated AI Due Diligence "Pitch Room" & Diaspora Syndicates */}
      {onNavigateToPitchRoom && (
        <section id="pitch-room-advertisement-banner" className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 border-2 border-amber-500/40 p-6 md:p-7 text-white shadow-lg relative overflow-hidden font-mono">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>NEW: PITCH ROOM & AI DUE DILIGENCE</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Instant 6-Pillar Score
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  Diaspora SPV Syndicates ($1k–$5k)
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Pitch Room: Automated AI Due Diligence & Valuation Benchmark
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Founders: Upload synthetic data representations of your pitch deck and GitHub code repository to receive an institutional-grade Readiness Score, technical moat audit, Law 126 tax structuring review, and diaspora angel syndicate allocation in ~5 seconds.
              </p>

              {/* Quick tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-amber-200/90">
                <span className="flex items-center gap-1">✓ Code AST & MLOps Audit</span>
                <span>•</span>
                <span className="flex items-center gap-1">✓ YC SAFE Valuation Benchmarking</span>
                <span>•</span>
                <span className="flex items-center gap-1">✓ Direct SPV Syndicate Deal Flow</span>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <button
                onClick={onNavigateToPitchRoom}
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Enter Pitch Room & Audit Deck</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-[11px] text-slate-400 text-center font-mono">
                Included in Pro Plan & 6-Hour Demo • 25 Credits
              </div>
            </div>
          </div>
        </section>
      )}

      {/* REVOLUTIONARY FEATURE • NOTEBOOK LLM COPILOT (SOVEREIGN SECOND BRAIN) */}
      <section
        id="second-brain-announcement-banner"
        className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 border-2 border-emerald-600/60 p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/30 font-sans relative overflow-hidden"
      >
        {/* Background ambient glow effect */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Pill & Highlight */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Brain className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Revolutionary Feature • Notebook LLM Copilot</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                Direct Sign-Up Access
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Law 126/2019 & GDPR Zero-Leakage Vault</span>
            </div>
          </div>

          {/* Headline & Core Thesis */}
          <div className="max-w-4xl space-y-2.5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Every Sign-Up Automatically Unlocks Your Sovereign Second Brain & Notebook LLM
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              No more scattered research notes, lost pitch deck iterations, or fragmented legal documents. The moment you create an account, 961AI directly provisions an isolated, encrypted <strong>Second Brain Notebook workspace</strong>. Save, arrange, and interrogate proprietary documents with an LLM copilot grounded in Lebanese corporate statutory frameworks, diaspora venture syndicates, and regional GPU cluster benchmarks.
            </p>
          </div>

          {/* Why It Is Revolutionary Section */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Why is this revolutionary for an ecosystem platform?
              </span>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Traditional directories are passive lists where user knowledge stays fragmented. 961AI transforms ecosystem data into an <strong>active cognitive engine</strong>: every founder, researcher, and investor receives their own private AI research laboratory directly connected to national tax exemptions (Offshore Law 126/2019), BDL clearing rails, and verified cross-border pipelines.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              {onNavigateToSecondBrain && (
                <button
                  id="banner-launch-second-brain-btn"
                  onClick={() => {
                    if (user) {
                      onNavigateToSecondBrain();
                    } else {
                      onOpenAuth?.("signup");
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transform active:scale-98"
                >
                  <Brain className="w-4 h-4 text-slate-950" />
                  <span>{user ? "Open Second Brain Notebook" : "Sign Up & Launch Second Brain"}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Toast Feedback */}
      {toastFeedback && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold font-mono animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastFeedback}</span>
        </div>
      )}
    </div>
  );
};
