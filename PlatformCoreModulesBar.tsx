import React, { useState, useMemo, useEffect } from "react";
import { GraphNode, WikiDocument, StartupNewsArticle, GraphEdge } from "../../types";
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  BookOpen, 
  GitBranch, 
  Send, 
  TrendingUp, 
  DollarSign, 
  Award,
  FileText,
  Building,
  Users,
  Star,
  Clock,
  Layers,
  PhoneCall,
  ChevronRight,
  ChevronLeft,
  Share2,
  Printer,
  ShieldCheck,
  Zap,
  Activity,
  Briefcase,
  Download,
  Flame,
  Check,
  Scale,
  Calendar,
  MessageCircle,
  Copy
} from "lucide-react";
import confetti from "canvas-confetti";

interface EntityDetailPageProps {
  node: GraphNode;
  wikiDoc?: WikiDocument;
  onBack: () => void;
  onSelectNode: (node: GraphNode) => void;
  allNodes: GraphNode[];
  edges?: GraphEdge[];
  news?: StartupNewsArticle[];
  deductCredits?: (amount: number) => boolean;
  credits?: number;
  onOpenTaxCalculator?: () => void;
  onNavigateToSandbox?: () => void;
}

export const EntityDetailPage: React.FC<EntityDetailPageProps> = ({
  node,
  wikiDoc,
  onBack,
  onSelectNode,
  allNodes,
  edges = [],
  news = [],
  deductCredits,
  credits = 1450,
  onOpenTaxCalculator,
  onNavigateToSandbox
}) => {
  const [activeTab, setActiveTab] = useState<"dossier" | "deal_room" | "graph_connections" | "news_dispatches" | "tax_arbitrage">("dossier");
  const [introRequested, setIntroRequested] = useState(false);
  const [introNote, setIntroNote] = useState(
    `Hi! We are reviewing ${node.label} on 961AINetwork and would love to explore an intro or co-investment syndicate.`
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [pitchSent, setPitchSent] = useState(false);

  // Scroll to top whenever node changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [node.id]);

  // Connected nodes calculation
  const connectedNodes = useMemo(() => {
    // 1. Check edges
    const directTargetIds = edges
      .filter((e) => e.source === node.id)
      .map((e) => e.target);
    const directSourceIds = edges
      .filter((e) => e.target === node.id)
      .map((e) => e.source);
    
    // 2. Check wiki backlinks / outlinks
    const wikiRelated = wikiDoc 
      ? [...(wikiDoc.backlinks || []), ...(wikiDoc.outlinks || []), ...(wikiDoc.frontmatter?.connectedEntities || [])]
      : [];

    const combinedIds = Array.from(new Set([...directTargetIds, ...directSourceIds, ...wikiRelated]));
    
    const matched = allNodes.filter(
      (n) => n.id !== node.id && (combinedIds.includes(n.id) || combinedIds.includes(n.wikiSlug || "") || (n.tags || []).some(t => (node.tags || []).includes(t)))
    );

    return matched.slice(0, 8);
  }, [node, allNodes, edges, wikiDoc]);

  // Related news calculation
  const relatedNews = useMemo(() => {
    return news.filter((art) => {
      const titleLower = art.title.toLowerCase();
      const nodeLabelLower = node.label.toLowerCase();
      const slugMatch = art.relatedEntitySlugs?.includes(node.wikiSlug || "") || art.relatedEntitySlugs?.includes(node.id);
      const tagMatch = (art.tags || []).some((t) => (node.tags || []).map(nt => nt.toLowerCase()).includes(t.toLowerCase()));
      return slugMatch || titleLower.includes(nodeLabelLower) || tagMatch;
    });
  }, [news, node]);

  // Previous & Next navigation
  const currentIndex = allNodes.findIndex((n) => n.id === node.id);
  const prevNode = currentIndex > 0 ? allNodes[currentIndex - 1] : allNodes[allNodes.length - 1];
  const nextNode = currentIndex < allNodes.length - 1 ? allNodes[currentIndex + 1] : allNodes[0];

  // Estimated word count & read time
  const totalWords = useMemo(() => {
    const text = `${wikiDoc?.markdownContent || ""} ${node.bio || ""} ${node.title || ""} ${(node.tags || []).join(" ")}`;
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [wikiDoc, node]);
  const estimatedReadTime = Math.max(1, Math.ceil(totalWords / 180));

  const handleSendIntro = () => {
    if (deductCredits) {
      const ok = deductCredits(25);
      if (!ok) {
        alert("Insufficient AI credits. Please top up in your workspace.");
        return;
      }
    }
    setIntroRequested(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#75AC73", "#2E5A2C", "#B0CFAD", "#25D366"]
    });
  };

  const handleCopyShareLink = () => {
    const url = window.location.href.split("#")[0] + `#company/${node.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const getNodeTypeBadge = () => {
    switch (node.type) {
      case "Startup":
        return { bg: "bg-emerald-100 text-emerald-900 border-emerald-300", icon: RocketIcon, label: "AI Startup / Venture" };
      case "Investor":
        return { bg: "bg-purple-100 text-purple-900 border-purple-300", icon: DollarSign, label: "Institutional VC / Angel" };
      case "Guru":
        return { bg: "bg-blue-100 text-blue-900 border-blue-300", icon: Star, label: "AI Guru / Researcher" };
      case "Hub":
        return { bg: "bg-amber-100 text-amber-900 border-amber-300", icon: Building, label: "Incubator / BDD Hub" };
      default:
        return { bg: "bg-slate-100 text-slate-900 border-slate-300", icon: Layers, label: node.type };
    }
  };

  const typeConfig = getNodeTypeBadge();

  return (
    <div id="independent-entity-page" className="space-y-6 animate-fadeIn font-mono text-[#000000]">
      {/* Top Breadcrumb & Navigation Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="group px-3.5 py-2 rounded-xl bg-white hover:bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD] hover:border-[#75AC73] text-xs font-black flex items-center gap-1.5 transition-all shadow-2xs active:scale-95"
            title="Return to Directory"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#2E5A2C]" />
            <span>Back to Directory</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>961AINetwork</span>
            <span>/</span>
            <span className="capitalize">{node.type}s</span>
            <span>/</span>
            <span className="font-bold text-[#000000] truncate max-w-[180px]">{node.label}</span>
          </div>
        </div>

        {/* Action Buttons: Copy link, Print PDF, Prev/Next entity */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {prevNode && (
            <button
              onClick={() => onSelectNode(prevNode)}
              className="p-2 rounded-xl bg-white hover:bg-[#EBF3EA] border border-[#D7E7D6] text-slate-700 hover:text-black text-xs font-bold transition-all"
              title={`Previous: ${prevNode.label}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {nextNode && (
            <button
              onClick={() => onSelectNode(nextNode)}
              className="p-2 rounded-xl bg-white hover:bg-[#EBF3EA] border border-[#D7E7D6] text-slate-700 hover:text-black text-xs font-bold transition-all"
              title={`Next: ${nextNode.label}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleCopyShareLink}
            className="px-3 py-2 rounded-xl bg-white hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6] text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
            title="Copy Public Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#4D7D4B]" />}
            <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
          </button>

          <button
            onClick={handlePrintDossier}
            className="px-3 py-2 rounded-xl bg-white hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6] text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
            title="Print Executive PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span className="hidden md:inline">Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header Card */}
      <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl p-6 md:p-8 shadow-xs space-y-6 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#EBF3EA] to-transparent rounded-full -mr-20 -mt-20 pointer-events-none opacity-60"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Entity Logo, Title & Core Meta */}
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Logo / Avatar Avatar Box */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#75AC73] via-[#89B887] to-[#9DC39A] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shrink-0 shadow-sm border-2 border-[#B0CFAD]">
              {node.label.slice(0, 2).toUpperCase()}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 shadow-2xs ${typeConfig.bg}`}>
                  <typeConfig.icon className="w-3.5 h-3.5" />
                  <span>{typeConfig.label}</span>
                </span>

                {node.verified && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4D7D4B]" />
                    <span>Verified Lebanese Entity</span>
                  </span>
                )}

                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-teal-50 text-teal-900 border border-teal-300 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-teal-700" />
                  <span>0% Offshore S.A.L. Eligible</span>
                </span>

                {node.locationType === "diaspora" ? (
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-purple-50 text-purple-900 border border-purple-200">
                    🌍 Diaspora Bridge
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-900 border border-emerald-200">
                    🇱🇧 Beirut Onshore Hub
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#000000] tracking-tight">
                {node.label}
              </h1>

              <p className="text-sm sm:text-base font-bold text-[#2E5A2C] leading-snug">
                {node.title || node.bio || "DeepTech Artificial Intelligence Venture"}
              </p>

              {/* Geo & Details row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4D7D4B]" />
                  <span>{node.location || "Beirut Digital District (BDD), Lebanon"}</span>
                </div>

                {node.wikiSlug && (
                  <div className="flex items-center gap-1.5 text-[#2E5A2C] font-bold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Wiki: /{node.wikiSlug}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#4D7D4B]" />
                  <span>{estimatedReadTime} min comprehensive dossier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick CTA Actions Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full lg:w-72 bg-[#F6FAF5] border border-[#D7E7D6] p-4 rounded-xl">
            <button
              onClick={handleSendIntro}
              disabled={introRequested}
              className={`w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 ${
                introRequested
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white"
              }`}
            >
              {introRequested ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Intro Request Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Request Direct Warm Intro (25 C)</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check out ${node.label} on 961AINetwork: ${node.title || node.bio}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-black flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Share via WhatsApp</span>
            </a>

            {onOpenTaxCalculator && (
              <button
                onClick={onOpenTaxCalculator}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>🇱🇧</span>
                <span>Calculate 0% Tax Savings</span>
              </button>
            )}
          </div>
        </div>

        {/* Tags Row */}
        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#EBF3EA]">
            <span className="text-xs font-bold text-slate-500 mr-1">Domain Competencies:</span>
            {node.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#F6FAF5] text-[#2E5A2C] border border-[#D7E7D6]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* KPI Metrics Dashboard Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white border-2 border-[#D7E7D6] rounded-xl p-4 space-y-1 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Target Raise / Stage</span>
          </div>
          <div className="text-base sm:text-lg font-black text-[#000000]">
            {node.stage || "Seed Round"}
          </div>
          <div className="text-[11px] font-bold text-[#2E5A2C]">
            Target: {node.fundingTarget || "$1.2M"}
          </div>
        </div>

        <div className="bg-white border-2 border-[#D7E7D6] rounded-xl p-4 space-y-1 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Post-Money Valuation</span>
          </div>
          <div className="text-base sm:text-lg font-black text-[#000000]">
            {node.valuation || "$8,500,000"}
          </div>
          <div className="text-[11px] font-bold text-emerald-700">
            MRR: {node.mrr || "$38,500/mo"}
          </div>
        </div>

        <div className="bg-white border-2 border-[#D7E7D6] rounded-xl p-4 space-y-1 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>GitHub / R&D Velocity</span>
          </div>
          <div className="text-base sm:text-lg font-black text-[#000000] flex items-center gap-1.5">
            <span>{node.githubActivity || 92}/100</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="text-[11px] font-bold text-purple-700">
            Top 5% Levant AI Codebase
          </div>
        </div>

        <div className="bg-white border-2 border-[#D7E7D6] rounded-xl p-4 space-y-1 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5 text-[#4D7D4B]" />
            <span>Ecosystem Network</span>
          </div>
          <div className="text-base sm:text-lg font-black text-[#000000]">
            {node.connectionsCount || 18} Synapses
          </div>
          <div className="text-[11px] font-bold text-[#2E5A2C]">
            Verified Co-Investors & Mentors
          </div>
        </div>
      </div>

      {/* Main Tabbed Independent Page Body */}
      <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#EBF3EA] pb-4">
          <button
            onClick={() => setActiveTab("dossier")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === "dossier"
                ? "bg-[#2E5A2C] text-white shadow-xs"
                : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6]"
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Executive Dossier & Karpathy Wiki</span>
          </button>

          <button
            onClick={() => setActiveTab("deal_room")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === "deal_room"
                ? "bg-[#2E5A2C] text-white shadow-xs"
                : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6]"
            }`}
          >
            <DollarSign className="w-4 h-4 text-purple-400" />
            <span>Financials & Deal Room</span>
          </button>

          <button
            onClick={() => setActiveTab("graph_connections")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === "graph_connections"
                ? "bg-[#2E5A2C] text-white shadow-xs"
                : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6]"
            }`}
          >
            <GitBranch className="w-4 h-4 text-blue-400" />
            <span>Ecosystem Synapses ({connectedNodes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("news_dispatches")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === "news_dispatches"
                ? "bg-[#2E5A2C] text-white shadow-xs"
                : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6]"
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Dispatches & News ({relatedNews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("tax_arbitrage")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === "tax_arbitrage"
                ? "bg-[#2E5A2C] text-white shadow-xs"
                : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6]"
            }`}
          >
            <Scale className="w-4 h-4 text-teal-400" />
            <span>0% Tax & Arbitrage Analyzer</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE DOSSIER & KARPATHY WIKI */}
        {activeTab === "dossier" && (
          <div className="space-y-6">
            {/* Executive Bio & Thesis */}
            <div className="p-5 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#2E5A2C] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4D7D4B]" />
                  <span>Executive Thesis & Problem Formulation</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  Author: Karpathy LLM Auto-Ingest Engine
                </span>
              </div>
              <p className="text-sm font-medium text-[#000000] leading-relaxed">
                {wikiDoc?.summary || node.bio || "Leading the regional paradigm in Arabic-first LLM orchestration, model quantization, and low-latency inference across critical GCC and Levant enterprise infrastructure."}
              </p>
            </div>

            {/* Markdown Body or Comprehensive Details */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#000000] border-b border-[#EBF3EA] pb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4D7D4B]" />
                <span>Technical Architecture & Operational Dossier</span>
              </h3>

              {wikiDoc?.markdownContent ? (
                <div className="p-6 rounded-xl bg-white border border-[#D7E7D6] text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-wrap font-sans">
                  {wikiDoc.markdownContent}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-white border border-[#D7E7D6] space-y-4 text-xs sm:text-sm font-sans text-slate-800">
                  <h4 className="font-black text-[#000000] text-sm">1. Core Technical Innovation</h4>
                  <p>
                    {node.label} utilizes proprietary transformer optimizations with specialized Levantine and Modern Standard Arabic (MSA) tokenizers, achieving up to 3.4x throughput advantages on standard GPU clusters while maintaining zero hallucination guardrails in sovereign regulatory jurisdictions.
                  </p>

                  <h4 className="font-black text-[#000000] text-sm">2. Lebanese Offshore S.A.L. Corporate Structure</h4>
                  <p>
                    Incorporated under Lebanese Law No. 85, {node.label} operates with 0% corporate income tax on export software revenues, 0% capital gains tax, and full foreign currency repatriation capabilities out of Beirut Digital District.
                  </p>

                  <h4 className="font-black text-[#000000] text-sm">3. Commercial Traction & Deployment Footprint</h4>
                  <p>
                    Currently serving Tier-1 commercial banks, telecom operators, and deeptech research institutions across Beirut, Dubai, and Riyadh with guaranteed sub-50ms inference latency SLAs.
                  </p>
                </div>
              )}
            </div>

            {/* Key Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] space-y-1.5">
                <div className="text-xs font-black text-[#2E5A2C] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sovereign Data Hosting</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Compliant with Saudi NDMO and UAE sovereign cloud residency frameworks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] space-y-1.5">
                <div className="text-xs font-black text-[#2E5A2C] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Diaspora Backed</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Co-invested by Silicon Valley and London Lebanese diaspora syndicates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] space-y-1.5">
                <div className="text-xs font-black text-[#2E5A2C] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>0% Tax Arbitrage</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Saving $180k+ annually on corporate and dividend taxes via Lebanese Offshore S.A.L.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIALS & DEAL ROOM */}
        {activeTab === "deal_room" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Financial Snapshot Card */}
              <div className="p-5 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] space-y-4">
                <h4 className="text-sm font-black text-[#000000] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#4D7D4B]" />
                  <span>Investment Terms & Instruments</span>
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#D7E7D6]">
                    <span className="text-slate-600 font-medium">Round Stage:</span>
                    <span className="font-black text-[#000000]">{node.stage || "Seed Round"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D7E7D6]">
                    <span className="text-slate-600 font-medium">Target Funding:</span>
                    <span className="font-black text-emerald-800">{node.fundingTarget || "$1,200,000"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D7E7D6]">
                    <span className="text-slate-600 font-medium">Pre-Money Valuation:</span>
                    <span className="font-black text-[#000000]">{node.valuation || "$8,500,000"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D7E7D6]">
                    <span className="text-slate-600 font-medium">Investment Instrument:</span>
                    <span className="font-black text-[#2E5A2C]">Y Combinator Post-Money SAFE</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-600 font-medium">Risk Mitigation:</span>
                    <span className="font-black text-purple-900">MIGA Sovereign Political Risk Cover</span>
                  </div>
                </div>
              </div>

              {/* Direct Deal Pitch & Intro Submission */}
              <div className="p-5 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4">
                <h4 className="text-sm font-black text-[#000000] flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#4D7D4B]" />
                  <span>Submit Syndicate Interest or DD Request</span>
                </h4>

                <div className="space-y-3">
                  <p className="text-xs text-slate-600 font-medium">
                    Send your firm's credentials directly to {node.label}'s founding team. Warm intro requests cost 25 AI Credits.
                  </p>

                  <textarea
                    value={introNote}
                    onChange={(e) => setIntroNote(e.target.value)}
                    rows={4}
                    className="w-full text-xs font-mono p-3 rounded-xl border border-[#D7E7D6] focus:border-[#75AC73] focus:outline-none bg-[#FAFCFA]"
                    placeholder="Enter your investment thesis or syndication request..."
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold">
                      Cost: <strong className="text-[#2E5A2C]">25 Credits</strong> (Balance: {credits})
                    </span>

                    <button
                      onClick={handleSendIntro}
                      disabled={introRequested}
                      className="px-4 py-2 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-black flex items-center gap-2 shadow-xs transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{introRequested ? "Intro Sent!" : "Dispatch Deal Intro"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ECOSYSTEM NETWORK & GRAPH CONNECTIONS */}
        {activeTab === "graph_connections" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EBF3EA] pb-3">
              <div>
                <h3 className="text-sm font-black text-[#000000]">
                  Connected Nodes & Ecosystem Synapses ({connectedNodes.length})
                </h3>
                <p className="text-xs text-slate-600">
                  Click any connected startup, mentor, or investor to navigate to their independent dossier.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {connectedNodes.map((related) => (
                <div
                  key={related.id}
                  onClick={() => onSelectNode(related)}
                  className="group cursor-pointer p-4 rounded-xl bg-[#F6FAF5] hover:bg-white border border-[#D7E7D6] hover:border-[#75AC73] transition-all duration-200 shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-white text-[#2E5A2C] border border-[#D7E7D6]">
                        {related.type}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {related.locationType === "diaspora" ? "🌍 Diaspora" : "🇱🇧 Onshore"}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-[#000000] group-hover:text-[#2E5A2C] transition-colors line-clamp-1">
                      {related.label}
                    </h4>

                    <p className="text-[11px] text-slate-600 font-sans line-clamp-2">
                      {related.title || related.bio}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EBF3EA] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 font-bold">
                      {related.stage || "Active Partner"}
                    </span>
                    <span className="text-[11px] font-black text-[#2E5A2C] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      <span>View Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DISPATCHES & NEWS */}
        {activeTab === "news_dispatches" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-[#000000] border-b border-[#EBF3EA] pb-3">
              Verified Dispatches & Press Wire ({relatedNews.length})
            </h3>

            {relatedNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relatedNews.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6] space-y-2"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {art.category}
                      </span>
                      <span className="text-slate-500">{art.publishedAt}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-[#000000] leading-snug">
                      {art.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {art.summary}
                    </p>

                    <div className="text-[10px] font-bold text-[#2E5A2C] pt-1">
                      Source: {art.sourceName} • {art.readTimeMin} min read
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#F6FAF5] rounded-xl border border-dashed border-[#D7E7D6] space-y-2">
                <Flame className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs font-bold text-slate-600">No direct single-entity articles tagged yet.</div>
                <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                  New funding rounds and research releases for {node.label} are automatically crawled by the 961AiNews engine.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: 0% TAX & ARBITRAGE ANALYZER */}
        {activeTab === "tax_arbitrage" && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#EBF3EA] to-[#F6FAF5] border-2 border-[#B0CFAD] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇱🇧</span>
                <h3 className="text-base font-black text-[#2E5A2C]">
                  Lebanese Offshore S.A.L. & Dual-Entity Tax Arbitrage
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Under Lebanese Law No. 85 and Commercial Code amendments, {node.label} benefits from an annual 0% corporate income tax on non-resident software licenses, 0% capital gains tax, and flat LL 1,000,000 (~$11) annual stamp duty, making it one of the most capital-efficient AI R&D jurisdictions globally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#D7E7D6] space-y-1.5">
                <div className="text-xs font-black text-slate-600">Corporate Income Tax</div>
                <div className="text-2xl font-black text-emerald-700">0.0%</div>
                <p className="text-[11px] text-slate-500">Exempt on foreign contract software revenue.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D7E7D6] space-y-1.5">
                <div className="text-xs font-black text-slate-600">Capital Gains Tax</div>
                <div className="text-2xl font-black text-emerald-700">0.0%</div>
                <p className="text-[11px] text-slate-500">On share transfers & secondary sales.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D7E7D6] space-y-1.5">
                <div className="text-xs font-black text-slate-600">Annual Tax Savings vs UAE</div>
                <div className="text-2xl font-black text-[#2E5A2C]">$165,000+</div>
                <p className="text-[11px] text-slate-500">Based on a 12-person deeptech engineering team.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenTaxCalculator && (
                <button
                  onClick={onOpenTaxCalculator}
                  className="px-4 py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-black flex items-center gap-2 shadow-xs transition-all"
                >
                  <Scale className="w-4 h-4" />
                  <span>Launch Live 0% Tax Calculator</span>
                </button>
              )}

              {onNavigateToSandbox && (
                <button
                  onClick={onNavigateToSandbox}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-slate-800 border border-[#D7E7D6] text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#4D7D4B]" />
                  <span>Explore Lebanon Regulatory Sandbox</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}
