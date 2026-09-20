import React, { useState, useEffect, useRef } from "react";
import {
  Scale,
  Layers,
  Briefcase,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Building,
  Coins,
  FileText,
  DollarSign,
  Users,
  Search,
  ExternalLink,
  ChevronRight,
  Play,
  Pause,
  Award,
  Globe,
  Code2,
  Cpu,
  Bot,
  Zap,
  Star,
  Clock,
  Landmark,
  Check,
  Send,
  UploadCloud,
  Percent,
  Sliders,
  Filter,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { GraphNode } from "../../types";

interface ServicesSliderSectionProps {
  nodes?: GraphNode[];
  onNavigateToDirectory: () => void;
  onNavigateToSandbox?: () => void;
  onNavigateToMarketplace?: () => void;
  onNavigateToMatchmaking?: () => void;
  onNavigateToQuestionnaire?: () => void;
  onQuickAskLegalAi?: (question: string) => void;
  onNavigateToPitchRoom?: () => void;
  onNavigateToInvestmentReports?: (reportId?: string) => void;
}

export const ServicesSliderSection: React.FC<ServicesSliderSectionProps> = ({
  nodes = [],
  onNavigateToDirectory,
  onNavigateToSandbox,
  onNavigateToMarketplace,
  onNavigateToMatchmaking,
  onNavigateToQuestionnaire,
  onQuickAskLegalAi,
  onNavigateToPitchRoom,
  onNavigateToInvestmentReports
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<number>(0);

  // Interactive widget states for Slide 1 (Legal Sandbox)
  const [selectedLawQuestion, setSelectedLawQuestion] = useState("");
  const [offshoreRevenue, setOffshoreRevenue] = useState(250000);
  const [isCalculatingTax, setIsCalculatingTax] = useState(false);

  // Interactive widget states for Slide 3 (Marketplace)
  const [marketplaceSubView, setMarketplaceSubView] = useState<"fractional" | "rfp">("fractional");
  const [selectedRfpCategory, setSelectedRfpCategory] = useState("Banking & Fintech");
  const [rfpBudget, setRfpBudget] = useState("$25,000 - $50,000");
  const [rfpSubmittedToast, setRfpSubmittedToast] = useState(false);

  // Interactive widget states for Slide 4 (Pitch Room & Angel SPV)
  const [capitalSubView, setCapitalSubView] = useState<"pitch_room" | "spv">("pitch_room");
  const [simulatedPitchScore, setSimulatedPitchScore] = useState<{
    techScore: number;
    moatScore: number;
    diasporaSynergy: number;
    valuationRange: string;
  }>({
    techScore: 94,
    moatScore: 89,
    diasporaSynergy: 96,
    valuationRange: "$2.5M - $4.0M USD (Post-Money)"
  });
  const [spvTicketAmount, setSpvTicketAmount] = useState(2500);

  // Interactive widget states for Slide 5 (MENA Venture Overview)
  const [menaSelectedSector, setMenaSelectedSector] = useState<string>("FinTech");

  // Auto-play timer
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 5);
      }, 7000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setActiveSubTab(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5);
    setActiveSubTab(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5);
    setActiveSubTab(0);
  };

  // 4 Core Slider Definitions
  const slidesData = [
    {
      id: "sandbox",
      number: "01",
      badge: "Sovereign Legal Framework",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      accentBg: "from-emerald-950 via-slate-900 to-emerald-900",
      title: "Lebanon Regulatory Sandbox, Laws & Formalities",
      tagline: "Navigate Law 126/2019 Offshore S.A.L., 0% Corporate Tax, and Ministry of Economy e-Filings",
      description:
        "Comprehensive sovereign legal codex tailored for Lebanese AI founders. Test algorithmic applications in an onshore sandbox, access BDL compliance templates, audit Commercial Registry (Sijil Tijari) stamps, and legally structure offshore entities.",
      metrics: [
        { label: "Corporate Tax Rate", value: "0% (Law 126/2019)" },
        { label: "Foreign IP Exemption", value: "100% Tax Deductible" },
        { label: "MoET E-Filing Speed", value: "3-5 Business Days" },
        { label: "Legal Blueprints", value: "18 Verified Templates" }
      ]
    },
    {
      id: "yellow_pages",
      number: "02",
      badge: "Verified Ecosystem Index",
      badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
      accentBg: "from-teal-950 via-slate-900 to-slate-900",
      title: "Lebanon AI Yellow Pages Directory",
      tagline: "The Authoritative Knowledge Index of 80+ Verified Startups, Research Labs & Gurus",
      description:
        "The verified public directory mapping Lebanon's leading deeptech enterprises, AUB & LAU AI research labs, autonomous robotics developers, and diaspora executives. Filter by stack, stage, and institutional verification badges.",
      metrics: [
        { label: "Verified Ventures", value: "80+ Startups & Labs" },
        { label: "Research Institutions", value: "AUB, LAU, USJ, BDD" },
        { label: "Diaspora Nodes", value: "SF, Paris, London, Dubai" },
        { label: "Direct Intro Requests", value: "1-Click Connect" }
      ]
    },
    {
      id: "marketplace",
      number: "03",
      badge: "B2B & Executive Procurement",
      badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
      accentBg: "from-indigo-950 via-slate-900 to-slate-900",
      title: "Specialized Marketplace Services",
      tagline: "On-Demand AI Fractional Executives & Enterprise Service Procurement",
      description:
        "Connect with top-tier diaspora leadership and bridge local AI engineering talent directly into Lebanese corporations, private hospitals, commercial banks, and regional conglomerates seeking custom AI deployments.",
      metrics: [
        { label: "Fractional CAIOs", value: "15+ Vetted Leaders" },
        { label: "Active Enterprise RFPs", value: "$450k+ Total Budget" },
        { label: "Average Project Match", value: "48 Hours" },
        { label: "Quality Guarantee", value: "Escrow & SOW Verified" }
      ]
    },
    {
      id: "capital",
      number: "04",
      badge: "Venture Deal Flow & SPVs",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      accentBg: "from-amber-950 via-slate-900 to-slate-950",
      title: "Ecosystem Capital & Pitch Acceleration",
      tagline: "Automated AI Due Diligence ('Pitch Room') & Standardized Diaspora Angel Syndicates",
      description:
        "Accelerate capital access for Lebanese founders. Upload pitch materials and GitHub repositories for instantaneous AI-driven diligence scoring, and co-invest through standardized SPVs with overseas diaspora angel networks.",
      metrics: [
        { label: "AI Diligence Audits", value: "Instant Memo & Score" },
        { label: "Diaspora Ticket Sizes", value: "$1,000 – $5,000 / Check" },
        { label: "Standardized Instruments", value: "Y Combinator SAFE + SPV" },
        { label: "Syndicate Deployed", value: "$1.85M+ Seed Capital" }
      ]
    },
    {
      id: "mena_venture",
      number: "05",
      badge: "MENA & Lebanon Venture 2026",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      accentBg: "from-emerald-950 via-slate-900 to-teal-950",
      title: "MENA & Lebanon Venture Capital Landscape",
      tagline: "$3B+ Regional Deployment • Sector Allocations • Bifurcated Diaspora Models",
      description:
        "Executive intelligence on MENA venture capital concentration ($3B+ deployed), top investment categories (FinTech ~35-40%, Enterprise AI ~18-22%), regional comparison vs. Lebanon, and Lebanese outbound engineering structures.",
      metrics: [
        { label: "MENA Total VC Deployed", value: "$3.0+ Billion (Record)" },
        { label: "Top Sector (FinTech)", value: "~35% – 40% Share" },
        { label: "Enterprise AI & SaaS", value: "~18% – 22% Share" },
        { label: "GCC Capital Dominance", value: ">70% (KSA & UAE)" }
      ]
    }
  ];

  const currentSlideData = slidesData[currentSlide];

  return (
    <section id="featured-services-slider" className="rounded-2xl bg-white border-2 border-[#B0CFAD] overflow-hidden shadow-xs">
      {/* Slider Control Header */}
      <div className="bg-[#F6FAF5] border-b-2 border-[#B0CFAD] p-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Step Tabs Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {slidesData.map((s, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-[#2E5A2C] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-[#EBF3EA] border border-[#D7E7D6]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                    isActive ? "bg-white text-[#2E5A2C]" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {s.number}
                </span>
                <span className="truncate max-w-[120px] sm:max-w-[160px]">{s.title.split(",")[0].split("(")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel Prev/Next & Auto-play Toggles */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="flex items-center gap-1 text-xs font-mono text-slate-600 font-bold bg-white px-2.5 py-1 rounded-lg border border-[#D7E7D6]">
            <span>{currentSlideData.number}</span>
            <span className="text-slate-400">/</span>
            <span>05</span>
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
              isAutoPlaying
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
            }`}
            title={isAutoPlaying ? "Pause Auto-Slide" : "Enable Auto-Slide"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">{isAutoPlaying ? "Auto" : "Auto"}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 rounded-lg bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white transition-colors shadow-2xs"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Content Banner */}
      <div className={`p-6 md:p-8 bg-gradient-to-r ${currentSlideData.accentBg} text-white space-y-6 transition-all duration-300`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border font-mono ${currentSlideData.badgeColor}`}>
                SERVICE {currentSlideData.number} • {currentSlideData.badge}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                961 AI Network Sovereign Platform
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {currentSlideData.title}
            </h2>

            <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed">
              {currentSlideData.tagline}
            </p>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {currentSlideData.description}
            </p>
          </div>

          {/* Quick Metrics Pillar */}
          <div className="grid grid-cols-2 gap-3 min-w-[280px] lg:max-w-sm">
            {currentSlideData.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                <div className="text-[10px] font-mono text-slate-300 uppercase font-bold">{m.label}</div>
                <div className="text-xs sm:text-sm font-black text-emerald-300 font-mono">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Detail Body per Slide */}
      <div className="p-6 md:p-8 bg-white space-y-6">
        {/* ========================================================================= */}
        {/* SLIDE 1: LEBANON REGULATORY SANDBOX, LAWS & FORMALITIES */}
        {/* ========================================================================= */}
        {currentSlide === 0 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Legal Sandbox Features */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Interactive Legal Sandbox</span>
                  <h3 className="text-lg font-black text-slate-900">
                    Sovereign Legal Blueprints & Registration Roadmap
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Structured guidance for local S.A.L., Offshore S.A.L. under Law 126/2019, MoET foreign revenue certifications, and commercial court registries.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Scale className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Law 126/2019 Offshore Framework</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Complete exemption from Lebanese corporate income tax on profits generated outside Lebanon, with 0% withholding on software exports.
                    </p>
                    <div className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                      0% Corporate Income Tax
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Commercial Registry (Sijil Tijari)</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Verified documentation checklists, stamp e-receipts, and Bar Association retainer requirements for tech companies.
                    </p>
                    <div className="text-[10px] font-mono text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
                      Beirut & Mount Lebanon Court
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                        <Coins className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Fresh USD FX & BDL Circulars</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Legal pathways for international SWIFT bank wire acceptance, Stripe Atlas / Wise holding subsidiaries, and crypto-to-fiat compliance.
                    </p>
                    <div className="text-[10px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 inline-block">
                      Fresh USD Guaranteed
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">AI IP Assignment & Data Protection</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Sovereign code repository copyright, algorithm patent protection, and Ministry of Economy IP registration filings.
                    </p>
                    <div className="text-[10px] font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Ministry of Economy (MoET)
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {onNavigateToSandbox && (
                    <button
                      onClick={onNavigateToSandbox}
                      className="px-4 py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
                    >
                      <Scale className="w-4 h-4 text-emerald-300" />
                      <span>Launch Full Legal Sandbox & AI Advisor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {onNavigateToDirectory && (
                    <button
                      onClick={onNavigateToDirectory}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-2 transition-all"
                    >
                      <Building className="w-4 h-4 text-slate-600" />
                      <span>View Verified Offshore Tech Entities</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Quick Tax & Legal Query Simulator */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#F6FAF5] to-white rounded-2xl border-2 border-[#B0CFAD] p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#D7E7D6] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#2E5A2C] text-white flex items-center justify-center font-bold text-xs">
                      <Percent className="w-4 h-4 text-emerald-300" />
                    </div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                      Law 126/2019 Tax Exemption Calculator
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#2E5A2C] font-bold bg-[#EBF3EA] px-2 py-0.5 rounded-md border border-[#B0CFAD]">
                    Live Tool
                  </span>
                </div>

                {/* Revenue Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Estimated Annual Software Exports:</span>
                    <span className="font-mono font-black text-[#2E5A2C] text-sm">
                      ${offshoreRevenue.toLocaleString()} USD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="1000000"
                    step="25000"
                    value={offshoreRevenue}
                    onChange={(e) => setOffshoreRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-[#D7E7D6] rounded-lg appearance-none cursor-pointer accent-[#2E5A2C]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>$25k (Seed)</span>
                    <span>$500k</span>
                    <span>$1.0M+ (Scaleup)</span>
                  </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                    <span className="text-[10px] text-rose-700 font-bold block">Standard Lebanese S.A.L. (17%)</span>
                    <div className="text-sm font-black text-rose-700">
                      -${Math.round(offshoreRevenue * 0.17).toLocaleString()} USD
                    </div>
                    <span className="text-[10px] text-rose-600 block">Plus 10% dividend tax</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1">
                    <span className="text-[10px] text-emerald-800 font-bold block">Law 126/2019 Offshore S.A.L.</span>
                    <div className="text-sm font-black text-emerald-700">
                      $0.00 USD Tax
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      You Save: ${Math.round(offshoreRevenue * 0.17).toLocaleString()}/yr
                    </span>
                  </div>
                </div>

                {/* Quick Advisor Prompt Trigger */}
                <div className="pt-2 border-t border-[#D7E7D6] space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Ask Lebanese Tech Legal Advisor AI:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      "How do I set up a 0% tax Law 126 Offshore S.A.L. in Beirut?",
                      "Can a Lebanese AI startup accept Stripe payments via Delaware holding co?",
                      "What are the MoET requirements for software copyright in Lebanon?"
                    ].map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (onQuickAskLegalAi) {
                            onQuickAskLegalAi(q);
                          } else if (onNavigateToSandbox) {
                            onNavigateToSandbox();
                          }
                        }}
                        className="text-left px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-[#D7E7D6] text-[11px] font-medium transition-all flex items-center justify-between group"
                      >
                        <span className="truncate pr-2">{q}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#2E5A2C] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 2: LEBANON AI YELLOW PAGES DIRECTORY */}
        {/* ========================================================================= */}
        {currentSlide === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Yellow Pages Directory Overview & Category Filters */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold text-teal-700 uppercase">Public Knowledge & Entity Directory</span>
                  <h3 className="text-lg font-black text-slate-900">
                    The Complete Index of Lebanon's Sovereign AI Ecosystem
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Explore verified deeptech startups, university research laboratories (AUB, LAU, USJ), venture capital firms, and diaspora angel partners.
                  </p>
                </div>

                {/* Directory Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                        <Bot className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                        28 Ventures
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-teal-900">NLP & Dialect Models</div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">Levantine Arabic LLMs, clinical transcription, financial sentiment.</p>
                  </div>

                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Cpu className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        19 Labs
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-emerald-900">Computer Vision & Edge</div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">AgriTech drone analytics, autonomous robotics, low-power edge inferencing.</p>
                  </div>

                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                        <Building className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                        14 Entities
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-indigo-900">Universities & Hubs</div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">AUB Artificial Intelligence Lab, LAU Robotics, BDD, Berytech.</p>
                  </div>

                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <Coins className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        22 Investors
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-amber-900">VC & Angel Syndicates</div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">Cedar Seed funds, diaspora angel syndicates, SAFE note investors.</p>
                  </div>

                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                        <Globe className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        4 Chapters
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-rose-900">Global Diaspora Nodes</div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">San Francisco, London, Paris, and Dubai Lebanese tech hubs.</p>
                  </div>

                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                        <Award className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                        Gold Verified
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-sky-900">Institutional Badges</div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">Audited Commercial Registry filings and Law 126 certifications.</p>
                  </div>
                </div>

                {/* Directory Navigation CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onNavigateToDirectory}
                    className="px-4 py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
                  >
                    <Layers className="w-4 h-4 text-emerald-300" />
                    <span>Open Public Yellow Pages Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {onNavigateToQuestionnaire && (
                    <button
                      onClick={onNavigateToQuestionnaire}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>Submit New Entity for Verification</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Featured Spotlight Preview Cards */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#F6FAF5] to-white rounded-2xl border-2 border-[#B0CFAD] p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#D7E7D6] pb-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                      Featured Verified AI Entities
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#2E5A2C] font-bold">
                    80+ Total Listings
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3 rounded-xl bg-white border border-[#D7E7D6] hover:border-[#2E5A2C] transition-all cursor-pointer space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                          C
                        </div>
                        <span className="font-black text-slate-900 text-xs">CedarsAI (AUB Spin-Out)</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                        Gold Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Sovereign Levantine Arabic LLM fine-tuning & local speech-to-text benchmark engine.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                      <span>📍 Beirut (BDD)</span>
                      <span>•</span>
                      <span>💰 Seed ($450k SAFE)</span>
                    </div>
                  </div>

                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3 rounded-xl bg-white border border-[#D7E7D6] hover:border-[#2E5A2C] transition-all cursor-pointer space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-teal-100 text-teal-900 font-bold text-xs flex items-center justify-center">
                          M
                        </div>
                        <span className="font-black text-slate-900 text-xs">MedLevant AI</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-mono font-bold">
                        Law 126 Offshore
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Autonomous clinical triage and Arabic medical NLP processing for hospitals across MENA.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                      <span>📍 Beirut / Paris</span>
                      <span>•</span>
                      <span>🏥 HealthTech AI</span>
                    </div>
                  </div>

                  <div
                    onClick={onNavigateToDirectory}
                    className="p-3 rounded-xl bg-white border border-[#D7E7D6] hover:border-[#2E5A2C] transition-all cursor-pointer space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center justify-center">
                          A
                        </div>
                        <span className="font-black text-slate-900 text-xs">AgriDrone Bekaa Lab</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold">
                        LAU Research
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Multispectral computer vision and crop yield AI optimization for water conservation.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                      <span>📍 Zahle / Bekaa</span>
                      <span>•</span>
                      <span>🌿 AgriTech Robotics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 3: SPECIALIZED MARKETPLACE SERVICES */}
        {/* ========================================================================= */}
        {currentSlide === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Sub-view Switcher: Fractional CAIOs vs Vetted AI Procurement RFPs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMarketplaceSubView("fractional")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    marketplaceSubView === "fractional"
                      ? "bg-indigo-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>1. On-Demand AI Fractional Executives</span>
                </button>

                <button
                  onClick={() => setMarketplaceSubView("rfp")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    marketplaceSubView === "rfp"
                      ? "bg-indigo-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>2. Vetted AI Service Procurement (RFPs)</span>
                </button>
              </div>

              {onNavigateToMarketplace && (
                <button
                  onClick={onNavigateToMarketplace}
                  className="text-xs font-bold text-indigo-900 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Provider Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sub-View A: On-Demand AI Fractional Executives */}
            {marketplaceSubView === "fractional" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900">
                      Connect with Vetted Diaspora AI Leadership (CAIO, MLOps, IP)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Early-stage Lebanese startups can contract top-tier overseas diaspora leaders on a fractional basis (5-15 hrs/month) for architecture design, MLOps scalability, and US/EU IP protection.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Fractional Profile 1 */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                            alt="Dr. Jad Makdissi"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-xs">Dr. Jad Makdissi</span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                                Fractional CAIO
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500">Ex-DeepMind Researcher • San Francisco Hub</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-black text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                          $120/hr • 10h/mo
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Specializes in LLM pre-training architecture, Arabic tokenizer design, and multi-GPU cluster provisioning on AWS/GCP.
                      </p>
                    </div>

                    {/* Fractional Profile 2 */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                            alt="Layla Haddad"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-xs">Layla Haddad, Esq.</span>
                              <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-mono font-bold">
                                Fractional General Counsel
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500">Beirut Bar & Paris Tech IP Specialist</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-black text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                          $95/hr • 8h/mo
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Advises on Law 126/2019 offshore holding structuring, international SAFE term sheets, and GDPR/MoET data sovereignty.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Inquire / Hire Fractional Executive Card */}
                <div className="lg:col-span-5 bg-gradient-to-b from-indigo-50/50 to-white rounded-2xl border-2 border-indigo-200 p-5 space-y-4 shadow-xs">
                  <div className="border-b border-indigo-100 pb-3">
                    <span className="text-xs font-mono font-bold text-indigo-800 uppercase">Book Leadership Advisory</span>
                    <h4 className="text-sm font-black text-slate-900">Request a Fractional Executive Match</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Matched directly through our diaspora talent network in London, SF, and Paris.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Executive Expertise Needed</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-indigo-500">
                        <option>Fractional Chief AI Officer (CAIO)</option>
                        <option>Fractional MLOps & Infrastructure Lead</option>
                        <option>Fractional Tech Legal & IP Counsel</option>
                        <option>Fractional Head of AI Product & Growth</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Target Monthly Commitment</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-indigo-500">
                        <option>5 Hours / Month (Advisory & Code Review)</option>
                        <option>10 Hours / Month (Architecture & Roadmap)</option>
                        <option>20 Hours / Month (Hands-On Implementation)</option>
                      </select>
                    </div>

                    {onNavigateToMarketplace && (
                      <button
                        onClick={onNavigateToMarketplace}
                        className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all mt-2"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Match with Fractional Executive</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-View B: Vetted AI Service Procurement (Enterprise RFPs) */}
            {marketplaceSubView === "rfp" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900">
                      Enterprise RFP Portal: Hire Verified 961 AI Startups
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Enables traditional Lebanese corporations (commercial banks, private hospitals, retail chains, logistics firms) to post RFPs and contract verified 961 AI Network startups with guaranteed delivery standards.
                    </p>
                  </div>

                  {/* Active RFPs Stream */}
                  <div className="space-y-2.5 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">
                          Automated Arabic OCR & KYC Document Parsing
                        </span>
                        <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          $35,000 USD
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Client: Major Commercial Bank in Beirut • Requirements: On-premise Docker deployment, 99.2% accuracy on handwritten Lebanese IDs.
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span>⏳ Bids Close in 6 Days</span>
                        <span>•</span>
                        <span>4 Verified Proposals Submitted</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">
                          Hospital ICU Bed Occupancy & Patient Triage AI
                        </span>
                        <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          $50,000 USD
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Client: Private University Hospital Center • Requirements: Real-time sensor telemetry, HL7/FHIR integration, Levantine speech notes.
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span>⏳ Bids Close in 12 Days</span>
                        <span>•</span>
                        <span>2 Verified Proposals Submitted</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Post Enterprise RFP Form */}
                <div className="lg:col-span-5 bg-gradient-to-b from-indigo-50/50 to-white rounded-2xl border-2 border-indigo-200 p-5 space-y-4 shadow-xs">
                  <div className="border-b border-indigo-100 pb-3">
                    <span className="text-xs font-mono font-bold text-indigo-800 uppercase">Procurement Request</span>
                    <h4 className="text-sm font-black text-slate-900">Post Enterprise AI RFP</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Broadcast to 80+ verified Lebanese AI agencies and research laboratories.
                    </p>
                  </div>

                  {rfpSubmittedToast ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs space-y-2 text-center animate-in fade-in">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                      <div className="font-bold">Enterprise RFP Broadcasted!</div>
                      <p className="text-[11px] text-emerald-800">
                        Our procurement committee will review and notify verified startups within 24 hours.
                      </p>
                      <button
                        onClick={() => setRfpSubmittedToast(false)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                      >
                        Submit Another RFP
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Target Sector</label>
                        <select
                          value={selectedRfpCategory}
                          onChange={(e) => setSelectedRfpCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                        >
                          <option>Banking & Fintech (KYC / Anti-Fraud)</option>
                          <option>Healthcare & Clinical Intelligence</option>
                          <option>Retail & E-Commerce Recommendation</option>
                          <option>Logistics, Shipping & Drone Fleet</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Allocated Implementation Budget</label>
                        <select
                          value={rfpBudget}
                          onChange={(e) => setRfpBudget(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                        >
                          <option>$10,000 - $25,000 USD (Pilot / POC)</option>
                          <option>$25,000 - $50,000 USD (Production Engine)</option>
                          <option>$50,000 - $100,000+ USD (Full Enterprise)</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setRfpSubmittedToast(true)}
                        className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all mt-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Publish Enterprise RFP</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 4: ECOSYSTEM CAPITAL & PITCH ACCELERATION */}
        {/* ========================================================================= */}
        {currentSlide === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Sub-view Switcher: Pitch Room Due Diligence vs Diaspora Angel Syndicates */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCapitalSubView("pitch_room")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    capitalSubView === "pitch_room"
                      ? "bg-amber-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>1. Automated AI Due Diligence ("Pitch Room")</span>
                </button>

                <button
                  onClick={() => setCapitalSubView("spv")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    capitalSubView === "spv"
                      ? "bg-amber-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>2. Diaspora Angel Syndicates (SPVs)</span>
                </button>
              </div>

              {onNavigateToMatchmaking && (
                <button
                  onClick={onNavigateToMatchmaking}
                  className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1"
                >
                  <span>Open Capital Matchmaking Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sub-View A: Automated AI Due Diligence ("Pitch Room") */}
            {capitalSubView === "pitch_room" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900">
                      Instant AI Code & Deck Audit for Seed Founders
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Upload your technical architecture diagrams, GitHub repository commits, and pitch deck. The 961 AI Pitch Room runs an automated technical feasibility scoring model, benchmarking against Silicon Valley and London Seed AI valuations.
                    </p>
                  </div>

                  {/* Diligence Score Cards Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Tech Feasibility</span>
                      <div className="text-xl font-black text-emerald-700 font-mono">
                        {simulatedPitchScore.techScore}/100
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">Top 5% Tier</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Moat Strength</span>
                      <div className="text-xl font-black text-indigo-700 font-mono">
                        {simulatedPitchScore.moatScore}/100
                      </div>
                      <span className="text-[10px] text-indigo-600 font-bold">High IP Defensibility</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Diaspora Synergy</span>
                      <div className="text-xl font-black text-amber-700 font-mono">
                        {simulatedPitchScore.diasporaSynergy}/100
                      </div>
                      <span className="text-[10px] text-amber-600 font-bold">Instant Syndicate Match</span>
                    </div>
                  </div>

                  {/* Benchmark Memo Callout */}
                  <div className="p-4 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900">Recommended Seed Valuation Range:</span>
                      <span className="text-[#2E5A2C] font-mono font-black">{simulatedPitchScore.valuationRange}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Generated based on comparable Levantine NLP & Vision startups closed with SF / London Lebanese angel syndicates over the last 12 months.
                    </p>
                  </div>
                </div>

                {/* Right Column: Diligence Upload Simulator */}
                <div className="lg:col-span-5 bg-gradient-to-b from-amber-50/50 to-white rounded-2xl border-2 border-amber-200 p-5 space-y-4 shadow-xs">
                  <div className="border-b border-amber-100 pb-3">
                    <span className="text-xs font-mono font-bold text-amber-800 uppercase">AI Diligence Engine</span>
                    <h4 className="text-sm font-black text-slate-900">Upload Code & Pitch Materials</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Private, zero-data-retention sandbox.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div 
                      onClick={onNavigateToPitchRoom || onNavigateToMatchmaking}
                      className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center space-y-2 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-400 transition-colors cursor-pointer"
                    >
                      <UploadCloud className="w-7 h-7 text-amber-700 mx-auto" />
                      <div className="font-bold text-slate-800 text-xs">Drop Pitch Deck PDF or Link GitHub Repo</div>
                      <div className="text-[10px] text-slate-400 font-mono">Supports .PDF, .PPTX, GitHub API OAuth • Click to Open Pitch Room</div>
                    </div>

                    {(onNavigateToPitchRoom || onNavigateToMatchmaking) && (
                      <button
                        onClick={onNavigateToPitchRoom || onNavigateToMatchmaking}
                        className="w-full py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Open Pitch Room AI Diligence Engine</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-View B: Diaspora Angel Syndicates (SPVs) */}
            {capitalSubView === "spv" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900">
                      Diaspora Co-Investment via Standardized SPVs ($1k–$5k Checks)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Standardized Special Purpose Vehicles (SPVs) allowing overseas Lebanese engineers, tech executives, and diaspora professionals to pool micro-investments directly into vetted local seed rounds under Delaware / ADGM / Law 126 legal frameworks.
                    </p>
                  </div>

                  {/* Active Diaspora Syndicates */}
                  <div className="space-y-2.5 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">
                          Silicon Valley Lebanese Tech Syndicate SPV #3
                        </span>
                        <span className="text-xs font-mono font-black text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          $175,000 / $200,000 Raised
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Lead: Nadia Khoury (Ex-Stripe) • Target: MedLevant AI & CedarsNLP Seed Rounds • Check Size: $2,500 min.
                      </p>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-600 h-full rounded-full" style={{ width: "87%" }}></div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">
                          London & Paris DeepTech Diaspora SPV #1
                        </span>
                        <span className="text-xs font-mono font-black text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          $120,000 / $150,000 Raised
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Lead: Marc Boulos (Venture Partner) • Target: Autonomous AgriDrone Bekaa • Check Size: $1,000 min.
                      </p>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-600 h-full rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: SPV Check Size & Co-Invest Calculator */}
                <div className="lg:col-span-5 bg-gradient-to-b from-amber-50/50 to-white rounded-2xl border-2 border-amber-200 p-5 space-y-4 shadow-xs">
                  <div className="border-b border-amber-100 pb-3">
                    <span className="text-xs font-mono font-bold text-amber-800 uppercase">Diaspora Angel Terminal</span>
                    <h4 className="text-sm font-black text-slate-900">Co-Invest in Lebanese AI</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Standardized YC SAFE + Single Cap Table Line.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="text-slate-700">Your Co-Investment Ticket:</span>
                        <span className="font-mono text-amber-900 text-sm font-black">
                          ${spvTicketAmount.toLocaleString()} USD
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="500"
                        value={spvTicketAmount}
                        onChange={(e) => setSpvTicketAmount(Number(e.target.value))}
                        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-900"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                        <span>$1,000 Min</span>
                        <span>$5,000 Pro</span>
                        <span>$10,000 Max</span>
                      </div>
                    </div>

                    {onNavigateToMatchmaking && (
                      <button
                        onClick={onNavigateToMatchmaking}
                        className="w-full py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all mt-2"
                      >
                        <Users className="w-4 h-4 text-amber-300" />
                        <span>Join Diaspora Angel SPV Allocation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 5: MENA & LEBANON VENTURE CAPITAL LANDSCAPE (2025–2026) */}
        {/* ========================================================================= */}
        {currentSlide === 4 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Sub-Nav Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMenaSelectedSector("FinTech")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    menaSelectedSector === "FinTech"
                      ? "bg-[#2E5A2C] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Top Sector Concentrations
                </button>
                <button
                  onClick={() => setMenaSelectedSector("Breakdown")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    menaSelectedSector === "Breakdown"
                      ? "bg-[#2E5A2C] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  MENA vs. Lebanon Matrix
                </button>
                <button
                  onClick={() => setMenaSelectedSector("Bifurcated")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    menaSelectedSector === "Bifurcated"
                      ? "bg-[#2E5A2C] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Bifurcated Models & Trends
                </button>
              </div>

              {onNavigateToInvestmentReports && (
                <button
                  onClick={() => onNavigateToInvestmentReports("res_mena_lebanon_vc_2026")}
                  className="text-xs font-bold text-[#2E5A2C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Executive Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View A: Sector Concentrations */}
            {menaSelectedSector === "FinTech" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
                {/* Left Column: Top Categories Grid */}
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900">
                      Top MENA Startup Investment Categories (2025–2026)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Capital deployment in the broader MENA region shows significant sector-level concentration. Total deployed venture capital reached record highs exceeding $3 Billion, propelled by KSA & UAE sovereign vehicles.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          <span className="text-xs font-black text-slate-900">FinTech (Payments, Open Banking, BNPL)</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Dominant asset class across KSA, UAE, and Egypt.</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-sm font-mono font-black text-[#2E5A2C]">~35% – 40%</div>
                        <span className="text-[10px] text-emerald-700 font-bold">Deal Share</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-black text-slate-900">Enterprise Software & AI (B2B SaaS & LLMs)</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Fastest-growing category with heavy Arabic NLP adoption.</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-sm font-mono font-black text-blue-700">~18% – 22%</div>
                        <span className="text-[10px] text-blue-700 font-bold">Deal Share</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                          <span className="text-xs font-black text-slate-900">E-Commerce, HealthTech & CleanTech</span>
                        </div>
                        <p className="text-[11px] text-slate-500">B2B marketplaces, telemedicine & sovereign energy microgrids.</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-sm font-mono font-black text-amber-800">~25% – 30%</div>
                        <span className="text-[10px] text-amber-800 font-bold">Combined</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Macro Intelligence Card */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#F6FAF5] to-white rounded-2xl border-2 border-[#B0CFAD] p-5 space-y-4 shadow-xs">
                  <div className="border-b border-[#D7E7D6] pb-3">
                    <span className="text-xs font-mono font-bold text-[#2E5A2C] uppercase">Executive Intelligence</span>
                    <h4 className="text-sm font-black text-slate-900">MENA $3B+ Capital Surge</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Source: MAGNiTT, ZoomInvestors & CapLink
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#D7E7D6] space-y-1">
                      <div className="text-slate-600 font-mono text-[11px]">GCC Capital Concentration:</div>
                      <div className="text-sm font-black text-slate-900">&gt;70% absorbed by KSA & UAE</div>
                      <div className="text-[10px] text-slate-500">Sovereign vehicles: PIF, Sanabil, Mubadala, ADQ</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#D7E7D6] space-y-1">
                      <div className="text-slate-600 font-mono text-[11px]">Lebanon Tech Arbitrage:</div>
                      <div className="text-sm font-black text-[#2E5A2C]">3.6x Engineering Cost Advantage</div>
                      <div className="text-[10px] text-slate-500">Beirut talent hub paired with Delaware/UAE TopCos</div>
                    </div>

                    {onNavigateToInvestmentReports && (
                      <button
                        onClick={() => onNavigateToInvestmentReports("res_mena_lebanon_vc_2026")}
                        className="w-full py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Read Full Executive Report</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* View B: MENA vs Lebanon Matrix */}
            {menaSelectedSector === "Breakdown" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="overflow-x-auto rounded-xl border-2 border-[#D7E7D6] bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#EBF3EA] text-[#2E5A2C] font-bold border-b border-[#B0CFAD]">
                      <tr>
                        <th className="py-2.5 px-4 font-mono">Dimension</th>
                        <th className="py-2.5 px-4">MENA (Overall)</th>
                        <th className="py-2.5 px-4">Lebanon Ecosystem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-[#F6FAF5]">
                        <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">Total Deployed Capital</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-[#2E5A2C]">&gt;$3.0 Billion</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">~$15M - $30M (Domestic Early-Stage)</td>
                      </tr>
                      <tr className="hover:bg-[#F6FAF5]">
                        <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">Primary Funding Conduits</td>
                        <td className="py-2.5 px-4 text-slate-700">Sovereign Wealth Funds (PIF, Sanabil), Mega-VCs</td>
                        <td className="py-2.5 px-4 text-slate-700">DFIs (USAID, EIB, IFC), Diaspora Angels (LebNet, LIFE)</td>
                      </tr>
                      <tr className="hover:bg-[#F6FAF5]">
                        <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">Average Seed Deal</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">$1.5M - $3.0M</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">$250K - $750K</td>
                      </tr>
                      <tr className="hover:bg-[#F6FAF5]">
                        <td className="py-2.5 px-4 font-bold text-slate-900 font-mono">Average Series A Deal</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">$7.0M - $15.0M</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">$2.0M - $5.0M (typically cross-border)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* View C: Bifurcated Model & Outbound Strategy */}
            {menaSelectedSector === "Bifurcated" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-150">
                <div className="p-4 rounded-xl bg-white border-2 border-[#B0CFAD] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#2E5A2C] uppercase">Domestic Early-Stage & Grants</span>
                  <h4 className="text-sm font-black text-slate-900">DFI Backing & Non-Dilutive Capital</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Catalytic grant programs and DFI facilities (USAID TIF, Berytech, IM Fndng) provide non-dilutive equity-free funding ($25K–$100K) to sustain early innovation and R&D pipelines onshore.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border-2 border-[#B0CFAD] space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-800 uppercase">Cross-Border & Diaspora VC</span>
                  <h4 className="text-sm font-black text-slate-900">Outbound Scale & GCC Expansion</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lebanese VC firms (B&Y, Cedar Mundi, MEVP, Phoenician) support founders incorporating in Delaware/ADGM while maintaining engineering teams in Beirut for maximum talent efficiency.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
