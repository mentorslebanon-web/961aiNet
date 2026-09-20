import React, { useState, useRef, useEffect, useMemo } from "react";
import { GraphNode, WikiDocument } from "../types";
import { 
  X, 
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
  ChevronUp,
  Timer,
  CheckCircle
} from "lucide-react";
import confetti from "canvas-confetti";

interface EntityDetailModalProps {
  node: GraphNode | null;
  wikiDoc?: WikiDocument;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  allNodes: GraphNode[];
}

export const EntityDetailModal: React.FC<EntityDetailModalProps> = ({
  node,
  wikiDoc,
  onClose,
  onSelectNode,
  allNodes
}) => {
  const [activeTab, setActiveTab] = useState<"wiki" | "graph_links" | "deal_intro">("wiki");
  const [introRequested, setIntroRequested] = useState(false);
  const [introNote, setIntroNote] = useState("Hi! We are actively reviewing your node on 961AINetwork and would love to explore an intro or co-investment syndicate.");
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Word count & estimated read time calculation
  const totalWords = useMemo(() => {
    if (!node) return 0;
    const text = `${wikiDoc?.markdownContent || ""} ${node.bio || ""} ${node.title || ""} ${(node.tags || []).join(" ")} ${(node.highlights || []).join(" ")}`;
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [wikiDoc, node]);

  const estimatedReadTime = Math.max(1, Math.ceil(totalWords / 180));

  // Handle scroll progress
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) {
        setReadingProgress(100);
      } else {
        const progress = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
        setReadingProgress(progress);
      }
    }
  };

  // Reset scroll and recalculate on tab or node change
  useEffect(() => {
    setReadingProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      setTimeout(() => handleScroll(), 50);
    }
  }, [node?.id, activeTab]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToMarkdown = () => {
    const el = document.getElementById("wiki-markdown-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!node) return null;

  const handleSendIntro = () => {
    setIntroRequested(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-mono text-[#000000] relative">
        
        {/* Top Visual Reading Progress Bar across the entire modal edge */}
        <div className="w-full bg-[#EBF3EA] h-1.5 overflow-hidden z-20 shrink-0">
          <div 
            className="h-full bg-gradient-to-r from-[#4D7D4B] to-[#75AC73] transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-5 bg-[#F6FAF5] border-b border-[#D7E7D6] flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF3EA] border-2 border-[#B0CFAD] flex items-center justify-center text-3xl font-bold shadow-xs shrink-0">
              {node.type === "Startup" && "🚀"}
              {node.type === "Guru" && "🧠"}
              {node.type === "Investor" && "💼"}
              {node.type === "Hub" && "🏛️"}
              {node.type === "Skill" && "⚡"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#000000] tracking-tight">{node.label}</h2>
                <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  node.type === "Startup" ? "bg-[#EAF3EB] text-[#2D6A4F] border-[#A7D7B8]" :
                  node.type === "Guru" ? "bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]" :
                  node.type === "Investor" ? "bg-[#FEF9E7] text-[#7D5A00] border-[#F9E79F]" :
                  node.type === "Hub" ? "bg-[#EBF3EA] text-[#2E5A2C] border-[#B0CFAD]" :
                  "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]"
                }`}>
                  {node.type}
                </span>
                {node.verified && (
                  <span className="flex items-center gap-1 text-xs bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] px-2.5 py-0.5 rounded-full font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A8D58]" />
                    Verified Node
                  </span>
                )}
                {node.premierVerified && (
                  <span className="flex items-center gap-1 text-xs bg-[#FEF9E7] text-[#8C6D1F] border border-[#E3C565] px-2.5 py-0.5 rounded-full font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#E3C565] text-[#8C6D1F]" />
                    Premier Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#000000] mt-2 font-mono">
                {node.location && (
                  <span className="flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#5A8D58]" />
                    {node.location}
                  </span>
                )}
                {node.isDiaspora ? (
                  <span className="flex items-center gap-1 bg-[#EBF5FB] text-[#1B4F72] border border-[#AED6F1] px-2 py-0.5 rounded-md font-bold text-xs">
                    <Globe className="w-3.5 h-3.5 text-[#2980B9]" />
                    Diaspora Chapter / Global Reach
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-[#EAF3EB] text-[#2D6A4F] border border-[#A7D7B8] px-2 py-0.5 rounded-md font-bold text-xs">
                    <span>🇱🇧</span> Onshore Lebanon
                  </span>
                )}
                {node.connectionsCount !== undefined && (
                  <span className="flex items-center gap-1 text-[#000000] font-semibold">
                    <GitBranch className="w-3.5 h-3.5 text-[#5A8D58]" />
                    {node.connectionsCount} Graph Linkages
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#000000] hover:text-black p-2 rounded-xl hover:bg-[#EBF3EA] border border-[#D7E7D6] transition-colors shrink-0 ml-2"
            title="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Real-time Reading Meter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-2.5 bg-[#FAFCFA] border-b border-[#D7E7D6] text-xs font-bold font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("wiki")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "wiki"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-white text-[#000000] border border-[#D7E7D6] hover:bg-[#EBF3EA]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Karpathy L1 Wiki Document</span>
            </button>
            <button
              onClick={() => setActiveTab("graph_links")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "graph_links"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-white text-[#000000] border border-[#D7E7D6] hover:bg-[#EBF3EA]"
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Bidirectional Graph Links</span>
            </button>
            <button
              onClick={() => setActiveTab("deal_intro")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "deal_intro"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-white text-[#000000] border border-[#D7E7D6] hover:bg-[#EBF3EA]"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Intro</span>
            </button>
          </div>

          {/* Reading Tracker Widget (Sticky in Header) */}
          <div className="flex items-center gap-2 self-end sm:self-auto bg-white border border-[#B0CFAD] px-3 py-1 rounded-lg text-xs shadow-2xs">
            <div className="flex items-center gap-1.5">
              {readingProgress >= 100 ? (
                <CheckCircle className="w-3.5 h-3.5 text-[#2E5A2C]" />
              ) : (
                <Timer className="w-3.5 h-3.5 text-[#5A8D58]" />
              )}
              <span className="font-bold text-[#000000]">
                {readingProgress >= 100 ? "Complete" : `${readingProgress}% Read`}
              </span>
            </div>
            <span className="text-[#B0CFAD]">•</span>
            <span className="text-[#000000] font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#5A8D58]" />
              ~{estimatedReadTime} min read
            </span>
          </div>
        </div>

        {/* Scrollable Tab Content Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="p-5 sm:p-6 overflow-y-auto flex-1 text-[#000000] text-sm space-y-6 bg-[#FFFFFF] relative scroll-smooth"
        >
          {activeTab === "wiki" && (
            <div className="space-y-6">
              {/* Detailed Reading Status & Quick Actions Banner */}
              <div className="p-3.5 bg-[#F6FAF5] border border-[#B0CFAD] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EBF3EA] border border-[#75AC73] flex items-center justify-center text-[#2E5A2C] font-black shrink-0">
                    {readingProgress}%
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#000000]">Document Reading Progress</span>
                      {readingProgress === 100 && (
                        <span className="px-2 py-0.2 rounded bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] text-[10px] font-bold">
                          ✓ Fully Read
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#000000] font-medium">
                      {totalWords} words • ~{estimatedReadTime} min read time • Karpathy L1 Wiki format
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {wikiDoc && (
                    <button
                      onClick={scrollToMarkdown}
                      className="px-2.5 py-1 bg-white hover:bg-[#EBF3EA] border border-[#D7E7D6] text-[#000000] font-bold rounded-lg text-xs flex items-center gap-1 transition-all"
                    >
                      <FileText className="w-3 h-3 text-[#5A8D58]" />
                      <span>Jump to Markdown</span>
                    </button>
                  )}
                  {readingProgress > 25 && (
                    <button
                      onClick={scrollToTop}
                      className="px-2.5 py-1 bg-white hover:bg-[#EBF3EA] border border-[#D7E7D6] text-[#000000] font-bold rounded-lg text-xs flex items-center gap-1 transition-all"
                      title="Scroll to top of document"
                    >
                      <ChevronUp className="w-3.5 h-3.5 text-[#5A8D58]" />
                      <span>Top</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {node.rating !== undefined && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Rating & Feedback</span>
                    <span className="text-sm font-bold text-[#000000] flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#D97706]" />
                      ★ {node.rating.toFixed(1)} {node.reviewCount ? `(${node.reviewCount} reviews)` : ""}
                    </span>
                  </div>
                )}
                {node.minProjectSize && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Min Project Size</span>
                    <span className="text-sm font-bold text-[#2E5A2C]">{node.minProjectSize}</span>
                  </div>
                )}
                {node.hourlyRate && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Hourly Rate</span>
                    <span className="text-sm font-bold text-[#000000]">{node.hourlyRate}</span>
                  </div>
                )}
                {node.teamSize && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Team Size</span>
                    <span className="text-sm font-bold text-[#000000] flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#5A8D58]" />
                      {node.teamSize}
                    </span>
                  </div>
                )}
                {node.stage && !node.minProjectSize && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Target Stage</span>
                    <span className="text-sm font-bold text-[#2E5A2C]">{node.stage}</span>
                  </div>
                )}
                {node.fundingTarget && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Funding Goal</span>
                    <span className="text-sm font-bold text-[#000000]">{node.fundingTarget}</span>
                  </div>
                )}
                {node.ticketSize && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Cheque Size</span>
                    <span className="text-sm font-bold text-[#2E5A2C]">{node.ticketSize}</span>
                  </div>
                )}
                {node.mrr && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Verified MRR</span>
                    <span className="text-sm font-bold text-[#2E5A2C]">{node.mrr}</span>
                  </div>
                )}
                {node.githubActivity !== undefined && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">GitHub Velocity</span>
                    <span className="text-sm font-bold text-[#000000]">{node.githubActivity}/100</span>
                  </div>
                )}
                {node.proficiency !== undefined && (
                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl">
                    <span className="text-xs text-[#000000] font-bold block uppercase mb-1">Skill Mastery</span>
                    <span className="text-sm font-bold text-[#2E5A2C]">{(node.proficiency * 100).toFixed(0)}%</span>
                  </div>
                )}
              </div>

              {/* Services Breakdown (if agency or provider) */}
              {node.servicesBreakdown && node.servicesBreakdown.length > 0 && (
                <div className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-4 space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-[#000000] font-bold">Services Provided & Allocation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {node.servicesBreakdown.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#D7E7D6] text-xs">
                        <span className="text-[#000000] font-bold">{s.name}</span>
                        <span className="text-[#2E5A2C] font-bold bg-[#EBF3EA] px-2 py-0.5 rounded border border-[#B0CFAD]">{s.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights & Track Record */}
              {node.highlights && node.highlights.length > 0 && (
                <div className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-4 space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-[#000000] font-bold">Verified Highlights & Track Record</h3>
                  <div className="flex flex-wrap gap-2">
                    {node.highlights.map((hl, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white text-[#000000] border border-[#D7E7D6] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5A8D58]" />
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Executive Synopsis */}
              <div className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-4.5 space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-[#000000] font-bold">Executive Synopsis</h3>
                <p className="text-[#000000] font-medium leading-relaxed text-sm">
                  {node.bio || node.title}
                </p>
              </div>

              {/* Tags & Skill Vectors */}
              {node.tags && node.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-wider text-[#000000] font-bold">Verified Skill Vectors & Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {node.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white border border-[#D7E7D6] text-[#000000] text-xs rounded-lg font-mono font-bold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#5A8D58]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Markdown Content (Karpathy Wiki Render) */}
              {wikiDoc ? (
                <div id="wiki-markdown-section" className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-5 font-mono text-xs sm:text-sm text-[#000000] leading-relaxed whitespace-pre-wrap">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D7E7D6] text-xs text-[#000000] font-bold">
                    <span className="text-[#2E5A2C] font-bold flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#5A8D58]" />
                      L1 Cached Markdown: /{wikiDoc.slug}.md
                    </span>
                    <span className="text-[#000000]">Last Verified: {wikiDoc.lastUpdated}</span>
                  </div>
                  <div className="prose prose-sm max-w-none text-[#000000]">
                    {wikiDoc.markdownContent}
                  </div>
                </div>
              ) : (
                <div id="wiki-markdown-section" className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-5 font-mono text-xs sm:text-sm text-[#000000] space-y-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D7E7D6]">
                    <span className="text-[#2E5A2C] font-bold"># {node.label}</span>
                    <span className="text-xs text-[#000000] font-semibold">Indexed Node</span>
                  </div>
                  <p><strong>Type</strong>: {node.type}</p>
                  <p><strong>Location</strong>: {node.location || "Lebanon / Global"}</p>
                  <p><strong>Status</strong>: {node.verified ? "Verified Ecosystem Node" : "Community Indexed"}</p>
                  <p className="mt-4 font-bold text-sm">## Knowledge Graph Overview</p>
                  <p className="leading-relaxed font-medium">{node.bio || node.title || "Entity actively mapped in 961AINetwork knowledge graph."}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "graph_links" && (
            <div className="space-y-5">
              <div className="p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-[#000000] font-bold">
                  Bidirectional Wikilinks & Graph Relationships
                </h3>
                <p className="text-xs text-[#000000] leading-relaxed font-medium">
                  In Karpathy's LLM Wiki architecture, entities are interconnected through verified bidirectional hyperlinks (`[[Entity]]`) that allow instant graph traversal without heavy vector computations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {allNodes
                    .filter((n) => n.id !== node.id && (n.tags?.some(t => node.tags?.includes(t)) || n.location?.includes(node.location || "") || (n.type === "Investor" && node.type === "Startup") || (n.type === "Startup" && node.type === "Investor") || (n.type === "Hub")))
                    .slice(0, 8)
                    .map((related) => (
                      <div
                        key={related.id}
                        onClick={() => onSelectNode(related.id)}
                        className="p-3.5 bg-white hover:bg-[#EBF3EA] border border-[#D7E7D6] hover:border-[#75AC73] rounded-xl cursor-pointer transition-all flex items-center justify-between shadow-2xs group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {related.type === "Startup" ? "🚀" : related.type === "Guru" ? "🧠" : related.type === "Investor" ? "💼" : "🏛️"}
                          </span>
                          <div>
                            <span className="font-bold text-[#000000] text-xs sm:text-sm block group-hover:text-[#4D7D4B] transition-colors">
                              [[{related.label}]]
                            </span>
                            <span className="text-xs text-[#000000] font-semibold">{related.type} • {related.location}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#5A8D58] shrink-0" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "deal_intro" && (
            <div className="space-y-4 max-w-xl mx-auto py-3">
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#000000]">Direct Ecosystem Warm Intro</h3>
                <p className="text-xs text-[#000000] font-medium">
                  Request an automated, warm intro via our verified Lebanon & Diaspora Syndicate concierge.
                </p>
              </div>

              {introRequested ? (
                <div className="p-6 bg-[#EBF3EA] border-2 border-[#75AC73] rounded-2xl text-center space-y-3 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#75AC73] text-white flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-[#2E5A2C] text-base">Intro Dispatch Queued!</h4>
                  <p className="text-xs text-[#000000] leading-relaxed font-medium">
                    A dual-opt-in briefing has been dispatched to {node.label}'s verified contact with encrypted deal memo attachments.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase">
                      Custom Introduction Note
                    </label>
                    <textarea
                      value={introNote}
                      onChange={(e) => setIntroNote(e.target.value)}
                      rows={4}
                      className="w-full bg-white border-2 border-[#D7E7D6] focus:border-[#75AC73] rounded-xl p-3.5 text-xs sm:text-sm text-[#000000] focus:outline-none transition-colors font-mono font-medium"
                    />
                  </div>

                  <div className="p-3.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl flex items-center justify-between text-xs font-bold">
                    <span className="text-[#000000]">Escrowed Credit Cost:</span>
                    <span className="font-mono text-[#2E5A2C] text-sm">15 Credits</span>
                  </div>

                  <button
                    onClick={handleSendIntro}
                    className="w-full py-3.5 bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all font-mono"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Warm Introduction</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


