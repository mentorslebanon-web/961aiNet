import React, { useState, useMemo } from "react";
import { AICaseStudy } from "../../../types";
import { 
  BookOpen, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  Quote, 
  FileText, 
  Layers, 
  TrendingUp, 
  Compass, 
  Share2,
  X
} from "lucide-react";

interface AiWorldCaseStudiesProps {
  caseStudies: AICaseStudy[];
  onOpenSubmitIdeaModal?: () => void;
}

export const AiWorldCaseStudies: React.FC<AiWorldCaseStudiesProps> = ({
  caseStudies,
  onOpenSubmitIdeaModal
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedStudy, setSelectedStudy] = useState<AICaseStudy | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const domains = [
    "ALL",
    "Civic AI & Governance",
    "Sovereign LLMs & Compute",
    "Regulatory Sandboxes",
    "Health & Clinical AI"
  ];

  const filteredStudies = useMemo(() => {
    return caseStudies.filter((study) => {
      const matchesDomain = selectedDomain === "ALL" || study.domain === selectedDomain;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        study.title.toLowerCase().includes(q) ||
        study.institution.toLowerCase().includes(q) ||
        study.country.toLowerCase().includes(q) ||
        study.executiveSummary.toLowerCase().includes(q) ||
        study.relevanceToLebanon.toLowerCase().includes(q);
      return matchesDomain && matchesSearch;
    });
  }, [caseStudies, selectedDomain, searchQuery]);

  const handleCopyCitation = (study: AICaseStudy) => {
    const citation = `${study.institution} (${study.country}). "${study.title}." 961AINetwork & MIT-Style Comparative Dossier (2026).`;
    navigator.clipboard.writeText(citation);
    setCopiedId(study.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadWhitepaper = (study: AICaseStudy) => {
    setDownloadNotification(`Initiating download for: ${study.whitepaperName || study.title + '.pdf'}`);
    setTimeout(() => setDownloadNotification(null), 3500);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Download Alert Toast */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-mono flex items-center gap-3 animate-fade-in">
          <Download className="w-4 h-4 text-emerald-400 animate-bounce" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* Case Studies Header & MIT Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MIT-STYLE COMPARATIVE INTELLIGENCE DOSSIER</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            AI World Case Studies: Global Benchmarks for Lebanon
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Rigorous, empirical architectural blueprints from pioneer jurisdictions—Estonia, Taiwan, Singapore, UAE, the UK, and MIT City Science. Analyzing technological stacks, regulatory sandboxes, and tangible replication pathways for the Lebanese sovereign AI ecosystem.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Peer-Reviewed Frameworks</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Regulatory Sandbox Aligned</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Open-Source Hardware & Code</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search and Domain Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search benchmarks, institutions, technologies, or keywords..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-mono"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors font-mono ${
                selectedDomain === dom
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {dom === "ALL" ? "All Domains" : dom}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudies.map((study) => (
          <article
            key={study.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Bar with Flag and Domain */}
            <div>
              <div className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={study.country}>
                      {study.flag}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 font-mono tracking-wide">
                        {study.country}
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono line-clamp-1">
                        {study.institution}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {study.domain}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-mono leading-snug">
                  {study.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {study.executiveSummary}
                </p>
              </div>

              {/* Metrics Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-slate-50/70 border-b border-slate-100">
                {study.metricsAndImpact.map((metric, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200/70 text-center">
                    <p className="text-sm font-bold text-slate-900 font-mono">{metric.value}</p>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider line-clamp-1 mt-0.5">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack & Replicability */}
              <div className="p-6 space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-slate-900 font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Technological Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {study.technologicalStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Relevance to Lebanon Box */}
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-semibold text-emerald-950 font-mono text-[11px] uppercase tracking-wider">
                      Replication Vector for Lebanon
                    </span>
                    <span className="ml-auto font-mono text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Fit: {study.replicabilityScore}%
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900/90 leading-relaxed">
                    {study.relevanceToLebanon}
                  </p>
                </div>

                {/* Quote */}
                {study.keyQuote && (
                  <div className="relative pl-3 border-l-2 border-emerald-500 text-slate-600 italic text-[11px] leading-relaxed">
                    "{study.keyQuote}"
                    {study.quoteAuthor && (
                      <div className="text-[10px] text-slate-500 not-italic font-mono mt-0.5">
                        — {study.quoteAuthor}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <button
                onClick={() => setSelectedStudy(study)}
                className="font-medium text-emerald-700 hover:text-emerald-900 font-mono flex items-center gap-1.5 transition-colors"
              >
                <span>Read MIT Full Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCitation(study)}
                  title="Copy Academic Citation"
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedId === study.id && (
                    <span className="sr-only">Copied</span>
                  )}
                </button>

                <button
                  onClick={() => handleDownloadWhitepaper(study)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Whitepaper PDF</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-900 font-mono text-base">No Matching Case Studies Found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or selecting "All Domains" to explore benchmark dossiers.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDomain("ALL");
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-mono font-medium hover:bg-slate-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Idea Cross-Link Call to Action */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-md">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TURN INSPIRATION INTO ACTION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-mono">
            Have a project inspired by these global benchmarks?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Submit your idea to the 961AINetwork Ecosystem Feedback Platform. Get direct feedback, find mentors, or propose policy adaptations for the Lebanon Sandbox.
          </p>
        </div>

        {onOpenSubmitIdeaModal && (
          <button
            onClick={onOpenSubmitIdeaModal}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono transition-all shadow-md hover:shadow-emerald-500/20 whitespace-nowrap"
          >
            Submit Your Idea ⟶
          </button>
        )}
      </div>

      {/* Detailed Case Study Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedStudy.flag}</span>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    {selectedStudy.country} • {selectedStudy.domain}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-mono text-white">
                  {selectedStudy.title}
                </h3>
                <p className="text-xs font-mono text-slate-300">
                  {selectedStudy.institution}
                </p>
              </div>

              <button
                onClick={() => setSelectedStudy(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm max-h-[70vh] overflow-y-auto font-sans">
              {/* Executive Summary */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Executive Brief & Objective
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  {selectedStudy.executiveSummary}
                </p>
              </div>

              {/* Regulatory Framework */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Codified Regulatory & Legal Framework</span>
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {selectedStudy.regulatoryFramework}
                </p>
              </div>

              {/* Metrics */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Key Quantitative Impact Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedStudy.metricsAndImpact.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                      <div className="font-bold text-slate-900 font-mono text-sm">{m.value}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Roadmap for Lebanon */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Prescribed Implementation Roadmap for Lebanon & Levant</span>
                </h4>
                <ol className="space-y-2 pl-4 list-decimal text-slate-700 text-xs">
                  {selectedStudy.recommendedRoadmap.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Open Architectural Components
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.technologicalStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-xs border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => handleCopyCitation(selectedStudy)}
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-mono text-xs font-medium hover:bg-slate-100 transition-colors"
              >
                {copiedId === selectedStudy.id ? "Citation Copied!" : "Copy Citation"}
              </button>

              <button
                onClick={() => handleDownloadWhitepaper(selectedStudy)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-medium flex items-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download MIT Research PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
