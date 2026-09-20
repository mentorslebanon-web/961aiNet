import React, { useState } from "react";
import { KnowledgeResource } from "../../types";
import { generateReportPdf } from "../../utils/generateReportPdf";
import { 
  Printer, 
  MessageCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  Sparkles, 
  FileText, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  CheckCircle2, 
  Mail, 
  Send, 
  Share2,
  Scale,
  Globe,
  ShieldCheck,
  Layers,
  Filter,
  Download
} from "lucide-react";

interface InvestmentReportSectionProps {
  onNavigateToInvestmentReports?: (reportId?: string) => void;
  onNavigateToResources?: () => void;
  onOpenResourceModal?: (resource: KnowledgeResource) => void;
  investmentResource?: KnowledgeResource;
}

export const InvestmentReportSection: React.FC<InvestmentReportSectionProps> = ({
  onNavigateToInvestmentReports,
  onNavigateToResources,
  onOpenResourceModal,
  investmentResource
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const reports = [
    {
      id: "res_mena_lebanon_vc_2026",
      key: "mena_lebanon_vc",
      category: "Macro Trends",
      badge: "EXECUTIVE OVERVIEW • 2026 DISPATCH",
      tag: "MENA & Lebanon Venture Intelligence",
      title: "Executive Overview: MENA & Lebanon Venture Capital Landscape 2026",
      subtitle: "Capital Concentration, Top Investment Categories & Cross-Border Diaspora Models",
      excerpt: "The MENA venture ecosystem exceeded $3B in deployed capital driven by GCC sovereign vehicles and late-stage mega-rounds. Meanwhile, Lebanon's bifurcated model pairs domestic DFI/impact backing with cross-border VC strategies.",
      date: "August 2026",
      publisher: "MAGNiTT, ZoomInvestors, CapLink & 961AI Intelligence",
      bullets: [
        "MENA total venture capital deployed exceeded $3 Billion in 2025/2026, pulling ahead of other emerging venture markets.",
        "Over 70% of total MENA funding is absorbed by KSA and UAE, driven by sovereign wealth funds (PIF, Mubadala) and late-stage mega-rounds.",
        "Top MENA categories: FinTech (~35%-40%), Enterprise Software & AI (~18%-22%), and E-Commerce & Logistics (~12%-15%).",
        "Lebanon operates on a bifurcated model: Domestic Early-Stage & DFI/Impact (IM Fndng, Berytech, Globivest) vs Cross-Border VCs (B&Y, Cedar Mundi).",
        "Outbound Strategy: Founders incorporate offshore (Delaware, UAE, UK) while maintaining Beirut R&D hubs for 3.6x engineering cost arbitrage."
      ]
    },
    {
      id: "res_lebanon_pe_vc_2026",
      key: "pe_vc",
      category: "Private Equity & Funds",
      badge: "NEW REPORT • JAN 2026 EDITION",
      tag: "Private Equity & Venture Capital",
      title: "Lebanon Private Equity & Venture Capital Landscape 2026",
      subtitle: "Market Overview, Deal Flow & Fund Directory",
      excerpt: "Lebanon's private equity (PE) market is projected to reach US$586.67 million in total deal value, backed by roughly 14 active domestic PE funds and regional recovery interest. You can explore deeper metrics via the ZoomInvestors Directory.",
      date: "January 2026",
      publisher: "961AI Research Taskforce & ZoomInvestors",
      bullets: [
        "Lebanon hosts 14 active private equity funds headquartered in the country as of January 2026.",
        "These funds have collectively invested more than $37.7 billion across 644 rounds in over 120 companies.",
        "The average deal size in Lebanon's PE market stands at approximately US$12.16 million in 2025.",
        "Lebanon's PE market is projected to reach US$586.67 million in total deal value in 2025, growing at a 3.43% compound annual growth rate through 2026.",
        "Fund sizes range from the $50 million Lebanon Growth Capital Fund to Global Gate Capital's $6 billion-plus in assets under management (AUM)."
      ]
    },
    {
      id: "res_investment_report_2026",
      key: "war_economics",
      category: "Startup Economics",
      badge: "2026 SPECIAL BRIEF",
      tag: "Macroeconomics & Wartime Resilience",
      title: "2026 Special Report: Startup Economics & Venture Capital in Times of War",
      subtitle: "Macroeconomic Shocks, Geopolitical Volatility, and the Levantine Resilience Playbook",
      excerpt: "Explore the comprehensive research report on navigating runway preservation, sovereign defense tech reallocations, and decoupled diaspora venture capital stacks.",
      date: "August 2026",
      publisher: "961AI Research Taskforce & Levant Capital Intelligence",
      bullets: [
        "Global military spending reached an all-time record of $2.52 Trillion in 2026 (+5.2% YoY).",
        "Beirut tech ecosystem climbed 36 places to 341st globally with +46.3% YoY growth momentum.",
        "Startup operating cost inflation model indicates a +23.0% burn spike (-2.8 months runway compression).",
        "Recommended seed runway buffer of 18+ months backed by Virtual CFO (VCFO) scenario modeling."
      ]
    },
    {
      id: "res_vcfo_runway_defense_2026",
      key: "vcfo_playbook",
      category: "VC Strategy",
      badge: "TACTICAL GUIDE",
      tag: "VCFO & Burn Rate Modeling",
      title: "Virtual CFO & Runway Resilience: The 2026 Burn-Rate Defense Guide",
      subtitle: "Dynamic Financial Modeling & Fresh USD Payroll Guardrails",
      excerpt: "A tactical operating guide for founders on structuring dynamic 18-month runway forecasts, establishing +20% inflation buffers, and managing dual-currency payroll without runway compression.",
      date: "July 2026",
      publisher: "VCFO Network & 961AI Finance Desk",
      bullets: [
        "Implement rolling 13-week direct cash flow forecasting to identify liquidity bottlenecks.",
        "Segregate operating reserves into offshore yield accounts and domestic Fresh USD disbursement accounts.",
        "Retain top engineering talent at 3.6x cost advantage with dollarized compensation."
      ]
    },
    {
      id: "res_offshore_treasury_2026",
      key: "offshore_governance",
      category: "Offshore & Governance",
      badge: "LEGAL BLUEPRINT",
      tag: "Law No. 85 & Tax Optimization",
      title: "Decoupled Treasury Architectures: Offshore SAL & Delaware Flips",
      subtitle: "Corporate Structuring for Capital Preservation and Diligence",
      excerpt: "Step-by-step regulatory blueprints on executing a Delaware flip, establishing Lebanese Offshore SAL entities with 0% corporate income tax on foreign revenue, and securing clean investor onboarding.",
      date: "June 2026",
      publisher: "Beirut Legal Tech Group • MENA Advisory",
      bullets: [
        "0% corporate income tax on exported software revenues under Lebanese Law No. 85.",
        "100% exemption from stamp duties on foreign commercial contracts and cross-border equity.",
        "Delaware C-Corp TopCo allows Silicon Valley venture funds to deploy SAFEs seamlessly."
      ]
    }
  ];

  const activeReport = reports[currentSlide];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*${activeReport.title}*\n\n` +
      `${activeReport.excerpt}\n\n` +
      `Read the full research report on 961AI Network:\n` +
      `${window.location.origin}/#investment-reports?report=${activeReport.id}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#investment-reports?report=${activeReport.id}`);
      setCopied(true);
      showToast("Report link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadPdf = () => {
    try {
      showToast("Generating PDF...");
      setTimeout(() => {
        try {
          const dossier = {
            id: activeReport.id,
            slug: activeReport.key,
            title: activeReport.title,
            subtitle: activeReport.subtitle,
            category: activeReport.category as any,
            secondaryCategories: [],
            date: activeReport.date,
            readTime: "10 min read",
            publisher: activeReport.publisher,
            badge: activeReport.badge,
            tagline: activeReport.tag,
            excerpt: activeReport.excerpt,
            keyMetrics: [
              { label: "Category", value: activeReport.category, description: activeReport.tag, tone: "emerald" as const },
              { label: "Date", value: activeReport.date, description: "Official 961AI Release", tone: "blue" as const }
            ],
            bulletHighlights: activeReport.bullets,
            tags: [activeReport.category, activeReport.tag, "2026 Edition"]
          };
          generateReportPdf(dossier);
          showToast(`PDF downloaded: ${activeReport.key}_report_2026.pdf`);
        } catch (e) {
          console.error("PDF generation failed:", e);
          showToast("Failed to generate PDF");
        }
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReadMore = () => {
    if (onNavigateToInvestmentReports) {
      onNavigateToInvestmentReports(activeReport.id);
    } else if (onNavigateToResources) {
      onNavigateToResources();
    }
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    setNewsletterSubscribed(true);
    showToast("Subscribed! You will receive monthly PE & VC dispatches.");
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reports.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reports.length) % reports.length);
  };

  return (
    <section 
      id="investment-report-section" 
      className="rounded-2xl bg-white border-2 border-[#B0CFAD] p-5 sm:p-6 shadow-xs font-mono text-[#000000] relative overflow-hidden transition-all space-y-4"
    >
      {/* Toast notification */}
      {toastMessage && (
        <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-lg bg-black text-white text-xs font-bold shadow-lg animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Top Header: Badge & Report Switcher Tabs */}
      <div className="flex flex-col items-start justify-start gap-2.5 text-left">
        <div className="flex flex-wrap items-center justify-start gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#2E5A2C]" />
            <span>INVESTMENT REPORTS & RESEARCH</span>
          </span>

          <span className="text-[10px] font-bold text-[#2E5A2C] bg-[#F6FAF5] px-2 py-0.5 rounded-md border border-[#D7E7D6]">
            {activeReport.badge}
          </span>

          <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-[#B0CFAD]">
            Category: {activeReport.category}
          </span>
        </div>

        {/* Switcher Pills Left-Aligned */}
        <div className="flex flex-wrap items-center justify-start gap-1.5 bg-[#F6FAF5] p-1 rounded-xl border border-[#D7E7D6]">
          {reports.map((rep, idx) => {
            const isMena = rep.key === "mena_lebanon_vc";
            const isActive = currentSlide === idx;
            return (
              <button
                key={rep.id}
                onClick={() => setCurrentSlide(idx)}
                style={isActive || isMena ? { color: "#ffffff" } : undefined}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#2E5A2C] text-white !text-white shadow-2xs"
                    : isMena
                    ? "bg-[#2E5A2C] text-white !text-white shadow-2xs hover:bg-[#3D633C]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive || isMena ? "bg-white" : "bg-slate-300"}`} />
                <span style={isActive || isMena ? { color: "#ffffff" } : undefined} className={isActive || isMena ? "text-white !text-white font-bold" : ""}>
                  {rep.key === "mena_lebanon_vc" ? "MENA & Lebanon VC Overview" :
                   rep.key === "pe_vc" ? "PE & VC Landscape" :
                   rep.key === "war_economics" ? "Wartime Economics" :
                   rep.key === "vcfo_playbook" ? "VCFO & Burn Rate" : "Offshore SAL & Tax"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Left-Aligned Headline & Sub-headline / Excerpt */}
      <div className="text-left w-full space-y-2">
        <h2 
          onClick={handleReadMore}
          className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight hover:text-[#2E5A2C] transition-colors cursor-pointer leading-tight text-left"
        >
          {activeReport.title}
        </h2>

        {activeReport.subtitle && (
          <p className="text-xs sm:text-sm font-semibold text-[#2E5A2C] text-left">
            {activeReport.subtitle}
          </p>
        )}

        <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed text-left">
          {activeReport.excerpt}
        </p>
      </div>

      {/* Newsletter Subscription Form with WhatsApp Broadcast Button Alongside */}
      <div className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-3 sm:p-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left text label */}
        <div className="flex items-center gap-2.5 text-slate-800 text-xs font-semibold shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#EBF3EA] border border-[#B0CFAD] flex items-center justify-center text-[#2E5A2C] shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">Get Investment Intelligence Dispatches</div>
            <div className="text-[11px] text-slate-500 font-normal font-sans">Monthly dealflow, fund teardowns & valuation memos</div>
          </div>
        </div>

        {/* Subscription Form + WhatsApp Broadcast Button */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
          {/* Email input form */}
          <form onSubmit={handleSubscribeNewsletter} className="flex items-center gap-1.5 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#B0CFAD] bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#2E5A2C] w-full sm:w-56"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-bold shadow-2xs transition-all active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer"
            >
              {newsletterSubscribed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Joined</span>
                </>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>

          {/* WhatsApp Sharing Button Alongside Form */}
          <button
            onClick={handleShareWhatsApp}
            className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold shrink-0 w-full sm:w-auto"
            title="Broadcast report excerpt via WhatsApp to your professional network"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp Broadcast</span>
          </button>
        </div>
      </div>

      {/* Action Buttons as Bottom of Section */}
      <div className="border-t border-[#D7E7D6] pt-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Slide Navigator */}
        <div className="flex items-center gap-1 bg-[#F6FAF5] rounded-xl border border-[#D7E7D6] p-1">
          <button
            onClick={prevSlide}
            className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-[#2E5A2C] transition-colors cursor-pointer"
            title="Previous Report"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold px-2 text-slate-600 font-mono">
            {currentSlide + 1} / {reports.length}
          </span>
          <button
            onClick={nextSlide}
            className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-[#2E5A2C] transition-colors cursor-pointer"
            title="Next Report"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Side: Secondary Actions & Main Read More Button */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            className="p-2 rounded-xl bg-white hover:bg-[#F6FAF5] text-[#2E5A2C] border border-[#B0CFAD] shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="Download formatted PDF of this report"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-white hover:bg-[#F6FAF5] text-slate-700 border border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="Print / Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-white hover:bg-[#F6FAF5] text-slate-700 border border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="Copy Report Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          <button
            onClick={handleReadMore}
            style={{ color: "#ffffff" }}
            className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 !text-white text-xs font-black shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 !text-white text-white" style={{ color: "#ffffff" }} />
            <span style={{ color: "#ffffff" }} className="!text-white font-black">Explore All Research Dossiers</span>
            <ArrowRight className="w-3.5 h-3.5 !text-white text-white" style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>
    </section>
  );
};
