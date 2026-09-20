import React, { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Layers,
  Network,
  Scale,
  Building2,
  GraduationCap,
  Globe,
  Cpu,
  Database,
  Search,
  Lock,
  GitMerge,
  Smartphone,
  Gift,
  FileText,
  DollarSign,
  TrendingUp,
  Award,
  Terminal,
  Code2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Download,
  Copy,
  Check,
  Zap,
  Users,
  Compass,
  MessageSquare,
  Landmark,
  BadgeCheck,
  Layers2,
  Trophy,
  Target,
  Flame
} from "lucide-react";
import { GraphNode } from "../../types";

interface ModuleAboutUsProps {
  initialTab?: "mission" | "specs" | "services" | "why_network" | "architecture" | "gamification";
  nodesCount?: number;
  edgesCount?: number;
  onNavigateToDirectory: () => void;
  onNavigateToQuestionnaire: () => void;
  onNavigateToPricing: () => void;
  onNavigateToSandbox: () => void;
  onNavigateToMatchmaking: () => void;
  onNavigateToWiki: () => void;
  onNavigateToArchitecture: () => void;
  onNavigateToMarketplace: () => void;
  onNavigateToEdgeBot: () => void;
  onNavigateToNews: () => void;
  onNavigateToQuests?: () => void;
  onNavigateToPitchRoom?: () => void;
}

export const ModuleAboutUs: React.FC<ModuleAboutUsProps> = ({
  initialTab = "mission",
  nodesCount = 48,
  edgesCount = 112,
  onNavigateToDirectory,
  onNavigateToQuestionnaire,
  onNavigateToPricing,
  onNavigateToSandbox,
  onNavigateToMatchmaking,
  onNavigateToWiki,
  onNavigateToArchitecture,
  onNavigateToMarketplace,
  onNavigateToEdgeBot,
  onNavigateToNews,
  onNavigateToQuests,
  onNavigateToPitchRoom
}) => {
  const [activeTab, setActiveTab] = useState<"mission" | "specs" | "services" | "why_network" | "architecture" | "gamification">(initialTab);
  const [copiedSpec, setCopiedSpec] = useState(false);

  const copySpecsJson = () => {
    const specs = {
      platform: "961 AI Network - Lebanon Sovereign AI Graph & Second Brain",
      version: "2.5.0-Enterprise",
      database_layer: {
        relational: "PostgreSQL 16 with Row-Level Security (RLS) & Multi-Tenant Isolation",
        graph: "Neo4j Cypher Traversal Engine for multi-hop VC/Academic/Diaspora bridges",
        vector_index: "768-dim & 1536-dim Dense/Sparse Hybrid Cosine Similarity",
        vault_layer: "Immutable SHA-256 Raw Submission Store (Obsidian Vault 1_sources/)"
      },
      compiler: "Karpathy Second Brain Compiler (Markdown Frontmatter, [[Wikilinks]], Backlinks)",
      legal_framework: "Lebanese Law 126/2019 (0% Offshore S.A.L. Tax Exemption Engine)",
      monetization_rails: ["Stripe/Credit Card", "USDT TRC20", "Whish Money (+961 81 041 334)", "OMT Cash Settlement"],
      edge_integration: "Low-Bandwidth WhatsApp 3G/4G Telecom Relay Engine"
    };
    navigator.clipboard.writeText(JSON.stringify(specs, null, 2));
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-900">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 md:p-12 border border-slate-700/60 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            THE SOVEREIGN LEBANESE AI GRAPH & INTELLIGENCE INFRASTRUCTURE
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Bridging Beirut DeepTech with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Diaspora Capital</span> & Sovereign AI
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            <strong>961 AI Network</strong> is the authoritative institutional knowledge graph, vector intelligence engine, and venture bridge connecting Lebanese artificial intelligence scaleups, world-renowned diaspora researchers, and global venture funds. Built to transform Lebanon into a premier sovereign AI powerhouse.
          </p>

          {/* Quick Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/70 font-mono text-xs">
            <div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[11px]">VERIFIED NODES</span>
              <strong className="text-emerald-400 text-lg font-bold">{nodesCount}+ Entities</strong>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[11px]">GRAPH EDGES</span>
              <strong className="text-teal-300 text-lg font-bold">{edgesCount}+ Synapses</strong>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[11px]">OFFSHORE SHIELD</span>
              <strong className="text-amber-300 text-lg font-bold">0% Corporate Tax</strong>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[11px]">DIASPORA CAPITAL</span>
              <strong className="text-white text-lg font-bold">$8.5B+ Conduit</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToDirectory}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/40 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Explore Verified Directory</span>
            </button>
            <button
              onClick={onNavigateToQuestionnaire}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Claim / Submit Your Startup</span>
            </button>
            <button
              onClick={copySpecsJson}
              style={{ color: "#ffffff" }}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-white font-mono text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedSpec ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" style={{ color: "#ffffff" }} />}
              <span style={{ color: "#ffffff" }} className="!text-white font-bold">{copiedSpec ? "Specs JSON Copied!" : "Export System Specs"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("mission")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "mission"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>1. The Mission & Vision</span>
        </button>

        <button
          onClick={() => setActiveTab("why_network")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "why_network"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>2. Strategic Importance for Lebanon</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "services"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. Complete Service Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "specs"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>4. Technical & Architectural Specs</span>
        </button>

        <button
          onClick={() => setActiveTab("architecture")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "architecture"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>5. Governance, Legal & Security</span>
        </button>

        <button
          onClick={() => setActiveTab("gamification")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "gamification"
              ? "bg-emerald-700 text-white shadow-sm"
              : "bg-amber-50 text-amber-900 border border-amber-300/80 hover:bg-amber-100"
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>6. Gamified Community & Bounties (Special Section)</span>
        </button>
      </div>

      {/* TAB 1: THE MISSION & VISION */}
      {activeTab === "mission" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unifying the Fragmented AI Ecosystem</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Lebanon boasts world-class engineering talent, but intelligence has historically been siloed across university labs (AUB, LAU, USJ, LU), dispersed incubators (Berytech, BDD), and global tech hubs (Silicon Valley, Paris, London, Dubai). 961 AI Network aggregates every node into one unified graph.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Reversing the Brain Drain Cycle</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rather than losing top AI engineers to overseas migration, our platform empowers local engineers to build, incubate, and export high-margin sovereign AI products globally while remaining onshore under 0% tax corporate structures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Diaspora Capital Mobilization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Over 14 million Lebanese in the diaspora control billions in institutional and angel capital. We provide an institutional-grade diligence pipeline with objective multi-vector matching to derisk early-stage co-investments in Lebanese AI.
              </p>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
            <div className="max-w-2xl">
              <span className="text-emerald-400 font-mono text-xs font-bold tracking-wider">STRATEGIC PILLARS</span>
              <h2 className="text-2xl font-black text-white mt-1">The Four Pillars of 961 AI Network</h2>
              <p className="text-slate-400 text-sm mt-2">
                Built from the ground up to solve structural challenges in emerging DeepTech markets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Database className="w-4 h-4" />
                  <span>1. Institutional Knowledge & Graph Indexation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every company, AI researcher, thesis paper, patent, and funding round is parsed via our <strong>Karpathy Second Brain Compiler</strong> into interconnected Obsidian-style markdown documents and Neo4j relational graph synapses.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>2. Legal Sandbox & 0% Tax Protection</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Deep integration with <strong>Lebanese Law 126/2019</strong> for Offshore S.A.L. companies, exempting export tech software revenue from the 17% corporate income tax, with built-in runway and contractor payroll simulators.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <GitMerge className="w-4 h-4" />
                  <span>3. Multi-Vector Deal Matching Engine</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Proprietary cosine matching scoring combining check size compatibility, stage readiness, domain ontology (e.g. Arabic NLP, MedTech, Fintech), and diaspora geographic synergies (Silicon Valley, Paris, Dubai).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>4. Low-Bandwidth Edge Bot for Lebanon</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A high-resilience WhatsApp bot protocol optimized for 3G/4G Lebanese telecommunications, enabling instant intelligence lookup and founder intake even under strict power or internet constraints.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STRATEGIC IMPORTANCE OF THIS NETWORK */}
      {activeTab === "why_network" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 space-y-2">
            <h3 className="text-base font-bold text-amber-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <span>The Macroeconomic Rationale: Why Lebanon Needs a Dedicated Sovereign AI Graph</span>
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Lebanon is experiencing unprecedented economic transition. Traditional banking and service sectors have contracted, creating an imperative to build an export-driven knowledge economy based on high-leverage artificial intelligence software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thesis 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">01</span>
                <h4 className="text-base font-bold text-slate-900">From Talent Outsource to Product Sovereignty</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                For decades, Lebanese engineers have delivered offshore dev services at competitive hourly rates to Western and Gulf enterprises. While profitable, this created zero retained equity. 961 AI Network enables Lebanese founders to own foundation models, proprietary IP, and venture scaleups valued in hard currency ($ USD / EUR).
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                ⚡ <strong>Economic Multiplier:</strong> $1 of AI Product ARR captures 10x-25x valuation multiples vs 1.2x for hourly agency labor.
              </div>
            </div>

            {/* Thesis 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">02</span>
                <h4 className="text-base font-bold text-slate-900">Overcoming Institutional Capital Isolation</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                International VCs often struggle to perform due diligence in Lebanon due to geopolitical noise, lack of centralized verified data, and banking frictions. 961 AI Network solves this through institutional verification tiers, standardized diligence memos, and 0% tax offshore structuring.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                ⚡ <strong>Trust Rail:</strong> Tier-1 verification certifies company incorporation (Sijil Tijari), incubator affiliation, and university patent lineage.
              </div>
            </div>

            {/* Thesis 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">03</span>
                <h4 className="text-base font-bold text-slate-900">Preserving Sovereign Arabic Dialect Intelligence</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Global LLMs (OpenAI, Anthropic, Google) are optimized primarily for English and Modern Standard Arabic (MSA). The Levant, Gulf, and North Africa communicate predominantly in regional dialects. Lebanese AI researchers are uniquely positioned to build dialect-specialized reasoning models, AWQ quantization, and enterprise translation layers.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                ⚡ <strong>Market Opportunity:</strong> $4.2B+ MENA enterprise market across banking, telecom, and healthcare requiring sovereign Arabic LLMs.
              </div>
            </div>

            {/* Thesis 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">04</span>
                <h4 className="text-base font-bold text-slate-900">Multi-Rail Financial Resilience</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Lebanese tech entrepreneurs require resilient settlement rails that bypass local banking bottlenecks. 961 AI Network showcases best-in-class multi-rail settlement: Stripe for global cards, USDT (TRC20/ERC20) for decentralized liquidity, and Whish Money / OMT for instant Lebanese cash settlement.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                ⚡ <strong>Liquidity Gateway:</strong> Cash settlement via Whish Money (+961 81 041 334) enables local founders to subscribe and transact instantly.
              </div>
            </div>
          </div>

          {/* Ecosystem Quote Banner */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                <BadgeCheck className="w-4 h-4" />
                <span>COMMUNITY CONSENSUS</span>
              </div>
              <blockquote className="text-base italic text-slate-200">
                "Lebanon's greatest sovereign asset has never been physical resources—it is the raw cognitive horsepower of our engineers and diaspora. 961 AI Network is the digital infrastructure that converts this brainpower into global market capitalization."
              </blockquote>
            </div>
            <button
              onClick={onNavigateToQuestionnaire}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs whitespace-nowrap flex items-center gap-2 transition-all shadow-md"
            >
              <span>Join the Network Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: COMPLETE SERVICE CATALOG */}
      {activeTab === "services" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">MODULAR ARCHITECTURE</span>
            <h2 className="text-2xl font-black text-slate-900">Comprehensive Suite of 961 AI Services</h2>
            <p className="text-sm text-slate-600">
              Each module is purpose-built to address specific operational, legal, and capital requirements of the Lebanese DeepTech ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1: Yellow Pages Directory */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">1. Verified Yellow Pages Directory</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The single source of truth for Lebanese AI startups, R&D labs, VC investors, and diaspora advisors. Filter by Onshore Lebanon vs Diaspora, tech stack, funding stage, and verification tier.
                </p>
              </div>
              <button
                onClick={onNavigateToDirectory}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Access Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 2: Karpathy Wiki Ingestion Engine */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">2. Karpathy Wiki Ingestion Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Second-brain knowledge compiler parsing unstructured pitch decks, founder bios, and academic papers into interconnected Obsidian-compatible markdown documentation with automated [[Wikilinks]].
                </p>
              </div>
              <button
                onClick={onNavigateToWiki}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Launch Wiki Ingestion</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 3: VC Matchmaking & Diligence Memos */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <GitMerge className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">3. VC Matchmaking & Deal Memos</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Algorithmic investor-startup syndicate matching. Automatically generates objective institutional diligence memos, compatibility radar charts, and direct introduction channels.
                </p>
              </div>
              <button
                onClick={onNavigateToMatchmaking}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-amber-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Open VC Matchmaking</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 4: Lebanon Sandbox & 0% Legal Hub */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">4. Legal Sandbox & 0% Tax Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive compliance simulator for Lebanese Law 126/2019 Offshore S.A.L. entities. Calculates effective tax shields, runway models, Bar Association retainer rules, and multi-currency payroll.
                </p>
              </div>
              <button
                onClick={onNavigateToSandbox}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Open Legal Sandbox</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 5: Verified Provider Marketplace */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">5. Software & AI Marketplace</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Curated directory of vetted Lebanese software agencies and AI consultancies specializing in custom LLM development, computer vision, data annotation, and low-latency API architectures.
                </p>
              </div>
              <button
                onClick={onNavigateToMarketplace}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Browse Marketplace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 6: WhatsApp Low-Bandwidth Edge Bot */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">6. WhatsApp Edge Bot Protocol</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Low-payload mobile bridge providing instant lookup on WhatsApp (+961 70 961 247). Allows founders to query investor criteria, submit updates, and request warm introductions directly via chat.
                </p>
              </div>
              <button
                onClick={onNavigateToEdgeBot}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-green-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Test Edge Bot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 7: News & Knowledge Hub */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">7. News & Research Knowledge Hub</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Curated ecosystem intelligence covering Lebanese funding announcements, EU/MENA AI grants, research preprints from AUB/LAU, and downloadable legal toolkits.
                </p>
              </div>
              <button
                onClick={onNavigateToNews}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Read Ecosystem News</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 8: Founder Referrals & Growth Engine */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Gift className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900">8. Founder Referrals & Free Months</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Viral growth engine rewarding founders with <strong>1 Full Month Free (+30 Days)</strong> and +250 AI Credits for every verified Lebanese startup invited to the ecosystem graph.
                </p>
              </div>
              <button
                onClick={onNavigateToQuestionnaire}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Referral Rewards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 9: Postgres & Neo4j Architecture Inspector */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">9. D3 Graph & Schema Inspector</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive D3 force-directed physics graph visualizing multi-tier relationships across nodes, alongside production SQL schemas and Cypher query analyzers.
                </p>
              </div>
              <button
                onClick={onNavigateToArchitecture}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Inspect Graph Architecture</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TECHNICAL & ARCHITECTURAL SPECS */}
      {activeTab === "specs" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-emerald-400 font-mono text-xs font-bold">SYSTEM SPECIFICATIONS v2.5</span>
                <h3 className="text-xl font-bold text-white">Full-Stack Technical Architecture</h3>
              </div>
              <button
                onClick={copySpecsJson}
                style={{ color: "#ffffff" }}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-white flex items-center gap-2 cursor-pointer"
              >
                {copiedSpec ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" style={{ color: "#ffffff" }} />}
                <span style={{ color: "#ffffff" }} className="!text-white font-bold">{copiedSpec ? "JSON Copied" : "Copy Raw JSON"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold block">// DATABASE & KNOWLEDGE STORE</span>
                <ul className="space-y-1.5 text-slate-300">
                  <li><strong className="text-white">Relational Engine:</strong> PostgreSQL 16 + Row-Level Security (RLS)</li>
                  <li><strong className="text-white">Graph Engine:</strong> Neo4j 5.x Cypher Traversal Engine</li>
                  <li><strong className="text-white">Vector Search:</strong> 768-dim & 1536-dim HNSW Cosine Similarity</li>
                  <li><strong className="text-white">Raw Vault:</strong> SHA-256 Immutable Ingestion Records</li>
                  <li><strong className="text-white">Cache Layer:</strong> In-Memory Redis LRU Subscriptions</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-teal-300 font-bold block">// COMPILER & SECOND BRAIN</span>
                <ul className="space-y-1.5 text-slate-300">
                  <li><strong className="text-white">Format:</strong> Obsidian-Compatible Markdown with YAML Frontmatter</li>
                  <li><strong className="text-white">Linking Protocol:</strong> [[Wikilinks]] with Automated Backlink Resolution</li>
                  <li><strong className="text-white">Ingestion Pipeline:</strong> L1 Raw Extraction → L2 Entity Resolution → L3 Graph Node</li>
                  <li><strong className="text-white">AI Models:</strong> Gemini 2.5 Pro / Flash for DeepTech Entity Extraction</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-amber-300 font-bold block">// MATCHMAKING & SCORING ALGORITHM</span>
                <ul className="space-y-1.5 text-slate-300">
                  <li><strong className="text-white">Stage & Check Size:</strong> 30% Weight Compatibility Vector</li>
                  <li><strong className="text-white">Domain & Tech Stack:</strong> 35% Weight Multi-Token Cosine Match</li>
                  <li><strong className="text-white">Diaspora Synergy:</strong> 20% Geographic Conduit Scoring</li>
                  <li><strong className="text-white">Academic Lineage:</strong> 15% Verified AUB/LAU/USJ Patent/Research Root</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-indigo-300 font-bold block">// PAYMENT RAILS & SECURITY</span>
                <ul className="space-y-1.5 text-slate-300">
                  <li><strong className="text-white">Global Cards:</strong> Stripe Checkout Integration ($100/yr)</li>
                  <li><strong className="text-white">Decentralized:</strong> USDT (TRC20 / ERC20) Settlement</li>
                  <li><strong className="text-white">Local Lebanon:</strong> Whish Money (+961 81 041 334) & OMT Cash</li>
                  <li><strong className="text-white">Access Protocol:</strong> 6-Hour Unrestricted Demo + Annual Pro Access</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Specifications Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h4 className="text-sm font-bold text-slate-900">Granular Architectural Specifications</h4>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                <strong className="text-slate-900 font-mono">Frontend Runtime</strong>
                <div className="md:col-span-2 text-slate-600">
                  React 18+, TypeScript 5.x, Vite, Tailwind CSS with Modern Design Standards, D3.js Force Physics Engine, Lucide React Iconography.
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                <strong className="text-slate-900 font-mono">Server Runtime</strong>
                <div className="md:col-span-2 text-slate-600">
                  Node.js / Express.js REST and SSE Endpoints, CommonJS bundled via esbuild for high-throughput containerized deployment on Google Cloud Run.
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                <strong className="text-slate-900 font-mono">Telecommunications Edge</strong>
                <div className="md:col-span-2 text-slate-600">
                  Twilio WhatsApp Business API Webhook Gateway, optimized JSON payload buffering for Lebanese 3G/4G Alfa and Touch network latency mitigation.
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                <strong className="text-slate-900 font-mono">Compliance & Regulatory Shield</strong>
                <div className="md:col-span-2 text-slate-600">
                  Lebanese Law 126/2019 for Offshore S.A.L. incorporation, compliant with Ministry of Economy (MoET) and Beirut Commercial Registry standards.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GOVERNANCE, LEGAL & SECURITY */}
      {activeTab === "architecture" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Verification Tiers & Quality Assurance</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                To guarantee the integrity of institutional deal flow, 961 AI Network operates a dual verification hierarchy:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-emerald-700" />
                      <span>Tier 1: Institutional Verified</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">Highest Trust</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Requires verified Commercial Registry (Sijil Tijari) registration, incubation confirmation from Berytech or BDD, or accredited university R&D sponsorship (AUB/LAU/USJ).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>Tier 2: Community Verified</span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">Self-Asserted</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Community-submitted entities validated via GitHub repositories, live software demonstrations, and multi-signature founder verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Lock className="w-5 h-5" />
                <span>Data Privacy & Immutable Vaults</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Founders retain absolute ownership of their intellectual property and proprietary deck data:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Data Selling:</strong> We never sell founder contact information, cap tables, or pitch deck data to third-party data brokers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>SHA-256 Vault Hashing:</strong> Every intake submission is hashed into an immutable vault snapshot to prove prior art and timestamp registration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Granular Privacy Flags:</strong> Founders can designate sensitive financial metrics (e.g. current MRR, target valuation) as private to accredited investors only.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing & Access Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white space-y-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase">SUSTAINABLE ECOSYSTEM MODEL</span>
                <h3 className="text-2xl font-black text-white">Annual Pro Access ($100 / Year) & 6-Hour Demo</h3>
                <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
                  Our transparent $100/year membership supports ongoing graph ingestion, independent verification, and server compute. Try all features freely with our 6-hour unrestricted guest demo.
                </p>
              </div>
              <button
                onClick={onNavigateToPricing}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>View Pricing & Payment Rails</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GAMIFIED COMMUNITY ENGAGEMENT & REWARDS (SPECIAL SECTION) */}
      {activeTab === "gamification" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 text-white border border-amber-500/40 shadow-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>SPECIAL SECTION: GAMIFIED COMMUNITY WORKFLOW & SERVICES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              The Gamified Intelligence Engine: Micro-Incentives for Sovereign DeepTech
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
              How 961 AI Network leverages gamification, verifiable micro-bounties, and Cedar XP to crowdsource dataset annotations, audit corporate registrations under Law 126/2019, peer-review university preprints, and bridge diaspora capital into Beirut.
            </p>
            {onNavigateToQuests && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToQuests}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-slate-950" />
                  <span>Launch Live Quests & Bounties Board</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Core Workflow Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Verification & Bounties</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Founders and community contributors tackle actionable micro-tasks: validating Levantine Arabic speech benchmarks, checking Commercial Registry filings, and writing peer reviews on local preprints.
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                Reward: +350 to +1,000 XP & Cedar Credits
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Cedar Tiers & Badges</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contributors climb from <em>Cedar Seedling</em> to <em>DeepTech Contributor</em>, <em>Diaspora Catalyst</em>, and <em>Sovereign AI Architect</em>. High reputation unlocks premier directory badges and governance roles.
              </p>
              <div className="text-[11px] font-mono text-teal-700 font-bold bg-teal-50 p-2 rounded-lg border border-teal-200">
                Progression: Unlocks VIP Galas & Advisory Seats
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Real Service Subsidies</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Points are directly convertible into tangible startup infrastructure: $200 Cloud GPU compute grants (A100/H100), 1-on-1 VC pitch deck reviews, Beirut Digital District (BDD) flex passes, and legal retainer waivers.
              </p>
              <div className="text-[11px] font-mono text-indigo-700 font-bold bg-indigo-50 p-2 rounded-lg border border-indigo-200">
                Utility: Zero Out-of-Pocket Startup Costs
              </div>
            </div>
          </div>

          {/* Suggested Services Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Suggested Community Services & Redemption Catalog
              </h3>
              <p className="text-xs text-slate-500">
                Catalog of high-value services redeemable with Cedar Credits and contribution milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 text-sm">A100/H100 Cloud GPU Compute Grant ($200)</span>
                  <span className="text-emerald-700 font-mono">1,200 XP</span>
                </div>
                <p className="text-slate-600">
                  Subsidized GPU time for Lebanese AI research teams fine-tuning Arabic LLMs or hosting sovereign inference engines.
                </p>
                <div className="text-[11px] font-mono text-slate-500">Provider: 961 AI Compute Guild</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 text-sm">1-on-1 VC Pitch & Diligence Clinic ($350)</span>
                  <span className="text-emerald-700 font-mono">1,800 XP</span>
                </div>
                <p className="text-slate-600">
                  Private advisory session with Silicon Valley / London Lebanese diaspora syndicate partners before going to market.
                </p>
                <div className="text-[11px] font-mono text-slate-500">Provider: Diaspora Angel Syndicate</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 text-sm">Law 126/2019 Offshore S.A.L. Retainer Subsidy ($500)</span>
                  <span className="text-emerald-700 font-mono">1,500 XP</span>
                </div>
                <p className="text-slate-600">
                  Legal documentation review, Commercial Registry stamp filing, and 0% tax corporate structure validation with a Beirut Bar lawyer.
                </p>
                <div className="text-[11px] font-mono text-slate-500">Provider: Beirut Bar Tech Guild</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 text-sm">BDD / Berytech 1-Week Coworking Flex Pass ($75)</span>
                  <span className="text-emerald-700 font-mono">800 XP</span>
                </div>
                <p className="text-slate-600">
                  Reliable high-speed fiber internet and uninterrupted solar power hot-desking in Beirut's top innovation hubs.
                </p>
                <div className="text-[11px] font-mono text-slate-500">Provider: Beirut Digital District & Berytech</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Callout */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
        <h3 className="text-base font-bold text-slate-900">Are you a Lebanese AI Startup, Scaleup, or Researcher?</h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Claim your verified graph node today. Get listed in the Yellow Pages, compile your Karpathy wiki doc, and unlock automated matches with diaspora investors.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToQuestionnaire}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Complete 2-Minute Intake Questionnaire</span>
          </button>
          <button
            onClick={onNavigateToDirectory}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all"
          >
            <span>Search Verified Entities</span>
          </button>
        </div>
      </div>
    </div>
  );
};
