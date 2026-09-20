import React, { useState, useEffect, useMemo } from "react";
import { KnowledgeResource } from "../../types";
import { generateReportPdf } from "../../utils/generateReportPdf";
import { LebaneseAICapitalAllocationChart, AISubSectorData } from "./LebaneseAICapitalAllocationChart";
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  DollarSign, 
  ShieldCheck, 
  ExternalLink, 
  Printer, 
  MessageCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Layers, 
  Building2, 
  Globe, 
  Cpu, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Scale, 
  AlertTriangle,
  Download,
  Share2,
  Search,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Bookmark,
  Calendar,
  Eye,
  Hash,
  X,
  PieChart,
  Briefcase,
  CircleDot
} from "lucide-react";

import { UserAuthSession } from "../../types";

interface ModuleInvestmentReportsProps {
  resources?: KnowledgeResource[];
  selectedReportId?: string;
  onNavigateToHome: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToSandbox?: () => void;
  user?: UserAuthSession | null;
  onOpenAuth?: (mode?: "signin" | "signup", reason?: string) => void;
}

export type ReportCategory = 
  | "All" 
  | "Macro Trends" 
  | "Startup Economics" 
  | "VC Strategy" 
  | "Private Equity & Funds" 
  | "Offshore & Governance" 
  | "Defense & Reconstruction";

export interface ResearchDossier {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ReportCategory;
  secondaryCategories?: ReportCategory[];
  date: string;
  readTime: string;
  publisher: string;
  badge: string;
  tagline: string;
  excerpt: string;
  keyMetrics: Array<{
    label: string;
    value: string;
    description: string;
    tone?: "emerald" | "amber" | "rose" | "blue" | "default";
  }>;
  bulletHighlights: string[];
  tags: string[];
}

export const ModuleInvestmentReports: React.FC<ModuleInvestmentReportsProps> = ({
  resources = [],
  selectedReportId = "res_lebanon_pe_vc_2026",
  onNavigateToHome,
  onNavigateToDirectory,
  onNavigateToSandbox,
  user,
  onOpenAuth
}) => {
  // Category Filtering State
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Active Reading Report Selection
  const [activeReportKey, setActiveReportKey] = useState<string>(() => {
    if (selectedReportId === "res_mena_lebanon_vc_2026" || selectedReportId === "mena_lebanon_vc") {
      return "mena_lebanon_vc";
    }
    if (selectedReportId === "res_investment_report_2026" || selectedReportId === "war-economics-2026" || selectedReportId === "war_economics") {
      return "war_economics";
    }
    if (selectedReportId === "vcfo_playbook" || selectedReportId === "offshore_governance" || selectedReportId === "diaspora_syndicates" || selectedReportId === "dfi_reconstruction") {
      return selectedReportId;
    }
    return "mena_lebanon_vc";
  });

  const [viewMode, setViewMode] = useState<"reader" | "catalog" | "treemap">("reader");
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showEmbeddedTreemap, setShowEmbeddedTreemap] = useState<boolean>(true);

  // Dossiers Dataset
  const dossiers: ResearchDossier[] = [
    {
      id: "res_mena_lebanon_vc_2026",
      slug: "mena_lebanon_vc",
      title: "Executive Overview: MENA & Lebanon Venture Capital Landscape 2026",
      subtitle: "Capital Concentration, Top Investment Categories, Regional Comparisons, and the Bifurcated Diaspora Model.",
      category: "Macro Trends",
      secondaryCategories: ["VC Strategy", "Startup Economics", "Private Equity & Funds"],
      date: "August 2026",
      readTime: "14 min read",
      publisher: "MAGNiTT, ZoomInvestors, CapLink & 961AI Intelligence",
      badge: "Executive Macro Intelligence",
      tagline: "MENA $3B+ Deployed • FinTech ~35-40% • Enterprise AI ~18-22% • Bifurcated Lebanon Model",
      excerpt: "The MENA venture ecosystem demonstrated strong capital concentration in 2025 and 2026, pulling ahead of other emerging venture markets with over $3B deployed. In contrast, Lebanon operates on a bifurcated model balancing domestic early-stage DFI/impact backing with cross-border venture capital.",
      keyMetrics: [
        { label: "Total MENA VC Deployed", value: "$3.0+ Billion", description: "Record highs driven by KSA & UAE sovereign vehicles", tone: "emerald" },
        { label: "Top Asset Class (FinTech)", value: "~35% – 40%", description: "Payments, Open Banking, BNPL & Neobanks", tone: "emerald" },
        { label: "Enterprise Software & AI", value: "~18% – 22%", description: "Fastest-growing category with heavy LLM adoption", tone: "blue" },
        { label: "GCC Capital Dominance", value: ">70% Concentration", description: "Saudi Arabia & UAE late-stage mega-rounds", tone: "amber" }
      ],
      bulletHighlights: [
        "MENA total venture capital deployed exceeded $3 Billion in 2025 and 2026, pulling ahead of other emerging markets despite global funding retreat.",
        "Sovereign wealth vehicles (PIF, Sanabil, Mubadala, ADQ) and regional late-stage mega-rounds accounted for >70% of total capital in KSA & UAE.",
        "Top investment categories: FinTech (35-40%), Enterprise Software & AI (18-22%), E-Commerce & Logistics (12-15%), HealthTech (8-10%), and CleanTech (5-8%).",
        "Lebanon's startup environment operates on a bifurcated model: Domestic innovation relies on DFIs, USAID, and diaspora capital; Lebanese VCs target international cross-border tech deals.",
        "Top Lebanese VC firms (B&Y, Cedar Mundi, Middle East Venture Partners, Phoenician, IM Fndng, Berytech) deploy active strategies spanning Levant to global hubs."
      ],
      tags: ["#MENAVenture2026", "#$3BDeployment", "#FinTech38%", "#EnterpriseAI", "#LebanonBifurcated", "#DFIFunding", "#MAGNiTTData"]
    },
    {
      id: "res_lebanon_pe_vc_2026",
      slug: "pe_vc",
      title: "Lebanon Private Equity & Venture Capital Landscape 2026: Market Overview, Deal Flow & Fund Directory",
      subtitle: "Comprehensive analysis of 14 domestic PE funds, $586.67M deal volume, $37.7B historical deployment & DFI allocations.",
      category: "Private Equity & Funds",
      secondaryCategories: ["VC Strategy", "Macro Trends"],
      date: "January 2026",
      readTime: "12 min read",
      publisher: "ZoomInvestors Directory • 961AI Intelligence",
      badge: "Institutional Dossier",
      tagline: "14 Headquartered PE Funds • $586.67M 2025 Deal Value • $37.7B Historical Deployments",
      excerpt: "An empirical examination of Lebanon's private equity asset class, detailing domestic headquartered fund managers, historical seed-to-late stage deployments, offshore legal TopCo frameworks, and post-crisis liquidity mechanics via trade sales.",
      keyMetrics: [
        { label: "Headquartered PE Funds", value: "14 Active Funds", description: "Headquartered in Lebanon as of January 2026", tone: "emerald" },
        { label: "Historical Deployment", value: "$37.7+ Billion", description: "Across 644 rounds backing 120+ portfolio companies", tone: "default" },
        { label: "2025-26 Deal Flow Volume", value: "$586.67 Million", description: "Growing at 3.43% CAGR through 2026", tone: "emerald" },
        { label: "Average Deal Size", value: "$12.16 Million", description: "Across domestic & regional transactions in 2025", tone: "default" }
      ],
      bulletHighlights: [
        "14 Active PE Funds headquartered in Lebanon oversee cross-border MENA and Sub-Saharan African investment mandates.",
        "Over $37.7 Billion historically deployed across 644 rounds spanning seed, growth equity, and late-stage buyouts.",
        "Fund sizes span widely: from the $50M multilateral DFI-backed Lebanon Growth Capital Fund to Global Gate Capital's $6B+ AUM footprint.",
        "5-Year Stage Allocation: 40 Seed rounds ($178M), 67 Early-Stage rounds ($4.59B), and 35 Late-Stage rounds ($3.37B).",
        "Over 90% of deals utilize offshore TopCo holding entities (Delaware, DIFC, Cayman) with Beirut operational subsidiaries."
      ],
      tags: ["#PEFundDirectory", "#AUM$6B+", "#DealFlow$586M", "#GrowthCapital", "#DFIReconstruction", "#DelawareFlip"]
    },
    {
      id: "res_investment_report_2026",
      slug: "war_economics",
      title: "2026 Special Report: Startup Economics & Venture Capital in Times of War",
      subtitle: "Macroeconomic Shocks, Geopolitical Volatility, and the Levantine Resilience Playbook.",
      category: "Startup Economics",
      secondaryCategories: ["Macro Trends", "Defense & Reconstruction", "VC Strategy"],
      date: "August 2026",
      readTime: "15 min read",
      publisher: "Ecosystem Research Taskforce",
      badge: "Wartime Economics Briefing",
      tagline: "Global Defense $2.52T • Beirut +46.3% YoY • 23% Inflation Model",
      excerpt: "How macroeconomic shocks, global defense budget surges to $2.52T, and hyperinflation impact startup cash runway, operating cost structures, and diaspora-backed decoupled balance sheets across the Levant.",
      keyMetrics: [
        { label: "Global Defense Spending", value: "$2.52 Trillion", description: "Historic all-time high in 2026 (5.2% YoY)", tone: "emerald" },
        { label: "Beirut Ecosystem Momentum", value: "+46.3% YoY", description: "Climbed 36 spots to 341st in StartupBlink Index", tone: "amber" },
        { label: "Operating Cost Inflation", value: "+23.0% Burn Spike", description: "Reduces typical $1.0M runway budget by ~2.8 months", tone: "rose" },
        { label: "Recommended Seed Runway", value: "18+ Months Buffer", description: "Backed by VCFO dynamic scenario modeling", tone: "emerald" }
      ],
      bulletHighlights: [
        "Global military expenditure surges to $2.52 Trillion in 2026, realigning venture capital toward defense tech, cybersecurity, and deep logistics.",
        "Beirut startup ecosystem demonstrates operational resilience: +46.3% YoY momentum ranking 341st globally.",
        "Operating Cost Inflation Model: +23% weighted burn rate increase driven by energy (+33.3%), war-risk logistics (+50%), and hardware tariffs (+30%).",
        "Virtual CFO (VCFO) mandate: Seed startups must maintain 18+ months runway buffer; Growth-stage companies must reach Default-Alive cash flows.",
        "Decoupled financial stacks: Delaware/UAE holding TopCos paired with Fresh USD accounts protect payroll from sovereign banking freezes."
      ],
      tags: ["#WartimeEconomics", "#CostInflationModel", "#Runway18Mo", "#Defense$2.5T", "#BeirutGrowth46%", "#VCFOPlaybook"]
    },
    {
      id: "res_vcfo_runway_defense_2026",
      slug: "vcfo_playbook",
      title: "Virtual CFO & Runway Resilience: The 2026 Levantine Burn-Rate Defense Guide",
      subtitle: "Dynamic Financial Modeling, Stress Testing, and Cash-Preservation Playbooks for Founders.",
      category: "VC Strategy",
      secondaryCategories: ["Startup Economics", "Offshore & Governance"],
      date: "July 2026",
      readTime: "9 min read",
      publisher: "VCFO Network & 961AI Finance Desk",
      badge: "Financial Governance",
      tagline: "Stress-Testing Protocols • Scenario Modeling • Fresh USD Payroll Guardrails",
      excerpt: "A tactical operating guide for seed and Series A founders on structuring dynamic monthly cash flow forecasts, establishing +20% inflation buffers, and managing dual-currency payroll without runway compression.",
      keyMetrics: [
        { label: "Recommended Cash Buffer", value: "+20% Reserve", description: "Over and above peacetime financial plans", tone: "emerald" },
        { label: "Breakeven Threshold", value: "14-16 Months", description: "Maximum payback period for customer acquisition", tone: "default" },
        { label: "Engineering Arbitrage", value: "3.6x Cost Efficiency", description: "Beirut R&D center vs. Western engineering payroll", tone: "emerald" },
        { label: "Forecasting Cadence", value: "Bi-Weekly Cycles", description: "Continuous rolling dynamic treasury updates", tone: "blue" }
      ],
      bulletHighlights: [
        "Implement rolling 13-week direct cash flow forecasting to identify liquidity bottlenecks before capital impairment.",
        "Segregate operating reserves into offshore yield accounts and domestic Fresh USD disbursement accounts.",
        "Index local engineering compensation to dollarized benchmarks to eliminate brain drain while preserving cost arbitrage.",
        "Model 3 wartime stress scenarios: Mild (10% inflation), Severe (25% inflation), and Black Swan (disrupted transit corridors)."
      ],
      tags: ["#VCFOPlaybook", "#BurnRate", "#Runway18Mo", "#TreasuryModeling", "#UnitEconomics"]
    },
    {
      id: "res_offshore_treasury_2026",
      slug: "offshore_governance",
      title: "Decoupled Treasury Architectures: Offshore SAL, Delaware Flip & Cross-Border Fresh USD Flows",
      subtitle: "Legal and Corporate Structuring for Capital Preservation and Global Investor Diligence.",
      category: "Offshore & Governance",
      secondaryCategories: ["Macro Trends", "VC Strategy"],
      date: "June 2026",
      readTime: "11 min read",
      publisher: "Beirut Legal Tech Group • MENA Advisory",
      badge: "Legal Architecture",
      tagline: "Law No. 85 Compliance • Delaware TopCo • Zero-Tax Offshore Frameworks",
      excerpt: "Step-by-step regulatory blueprints on executing a Delaware or Cayman flip, establishing Lebanese Offshore SAL entities with zero local corporate tax on foreign revenues, and securing clean institutional investor onboarding.",
      keyMetrics: [
        { label: "Corporate Tax on Foreign ARR", value: "0% Offshore SAL", description: "Under Lebanese Law No. 85 / Legislative Decree 46", tone: "emerald" },
        { label: "Stamp Duty Exemption", value: "100% Exempt", description: "On foreign commercial contracts & cross-border equity", tone: "emerald" },
        { label: "Institutional Readiness", value: "98% VC Diligence Pass", description: "Standardized Delaware C-Corp SAFEs & Series Seed", tone: "blue" },
        { label: "Average Flip Time", value: "14 - 21 Days", description: "End-to-end multi-jurisdictional incorporation", tone: "default" }
      ],
      bulletHighlights: [
        "Offshore SAL entities provide complete tax shielding for SaaS, Arabic AI software, and remote engineering exports.",
        "Delaware C-Corp TopCos allow Silicon Valley and European venture funds to deploy SAFEs and preferred equity without jurisdictional friction.",
        "Intercompany IP licensing agreements ensure compliant transfer pricing between Delaware parent and Beirut R&D entities.",
        "Bypasses domestic banking controls via verified cross-border digital banking corridors (Wio, Mercury, Brex)."
      ],
      tags: ["#OffshoreSAL", "#DelawareFlip", "#TaxOptimization", "#LawNo85", "#CrossBorderBanking"]
    },
    {
      id: "res_diaspora_venture_syndicates_2026",
      slug: "diaspora_syndicates",
      title: "MENA & Diaspora Venture Syndicates: Mobilizing $15B+ Expat Capital into Beirut Tech",
      subtitle: "Bridging Silicon Valley, London, and Gulf Angel Networks with Lebanese Foundational Builders.",
      category: "VC Strategy",
      secondaryCategories: ["Macro Trends", "Private Equity & Funds"],
      date: "May 2026",
      readTime: "10 min read",
      publisher: "Diaspora Capital Taskforce & LebNet",
      badge: "Syndicate Blueprint",
      tagline: "LebNet • LIFE • $15B+ Expat Remittance Flow Synergy",
      excerpt: "How institutional diaspora angel syndicates and SPVs channel Fresh USD equity into high-potential Levantine startups, accelerating Series A rounds and foreign commercial customer introductions across North America and the GCC.",
      keyMetrics: [
        { label: "Annual Remittance Baseline", value: "$6.5+ Billion", description: "Annual financial inflow into Lebanon from diaspora", tone: "default" },
        { label: "Venture Syndicate Target", value: "$120 Million", description: "Targeted tech equity deployment pool by 2027", tone: "emerald" },
        { label: "Angel Network Reach", value: "4,500+ Members", description: "Across Silicon Valley, London, Paris, and Dubai", tone: "blue" },
        { label: "Follow-on Co-Investment", value: "3.2x Multiple", description: "Regional VC follow-on on diaspora-led seed rounds", tone: "emerald" }
      ],
      bulletHighlights: [
        "Diaspora angel syndicates utilize AngelList Roll Up Vehicles (RUVs) and Cayman SPVs to pool ticket sizes from $5k to $50k.",
        "Strategic focus areas: Levantine NLP, Arabic LLMs, Enterprise Cybersecurity, AgriTech, and Distributed Cloud Infrastructure.",
        "Mentorship & Customer Access: Diaspora tech executives provide direct commercial pilots with Fortune 500 enterprises.",
        "Co-investment arrangements established with regional MENA venture funds to fast-track Series A milestone funding."
      ],
      tags: ["#DiasporaSyndicates", "#AngelNetworks", "#LebNet", "#CrossBorderCapital", "#FreshUSD"]
    },
    {
      id: "res_dfi_reconstruction_2026",
      slug: "dfi_reconstruction",
      title: "Reconstruction & Multilateral DFI Capital: EIB, IFC & EBRD Deployment Frameworks",
      subtitle: "Catalytic Grants, Subsidized Credit Lines, and Multilateral Equity in Post-Crisis Recovery.",
      category: "Defense & Reconstruction",
      secondaryCategories: ["Private Equity & Funds", "Macro Trends"],
      date: "April 2026",
      readTime: "13 min read",
      publisher: "Multilateral Research Group",
      badge: "Development Finance",
      tagline: "EIB • IFC • EBRD • $80M+ Industrial Resilience Grants",
      excerpt: "Analysis of development finance institution (DFI) interventions, impact funding pools, and multilateral debt facilities revitalizing Lebanon's industrial, clean energy, and tech enterprise infrastructure.",
      keyMetrics: [
        { label: "2025-26 DFI Allocations", value: "$80+ Million", description: "Committed to local industrial, SME, and clean tech sectors", tone: "emerald" },
        { label: "SME Equity Matching", value: "1:1 Ratio", description: "Matching private venture tickets with non-dilutive grants", tone: "blue" },
        { label: "Clean Energy Subsidies", value: "$25 Million", description: "Targeting off-grid solar and microgrid independence", tone: "emerald" },
        { label: "Eligible Enterprise Base", value: "350+ SMEs", description: "Qualified under ESG and governance criteria", tone: "default" }
      ],
      bulletHighlights: [
        "Multilateral institutions prioritize non-dilutive matching grants for tech startups that drive clean energy or job creation.",
        "European Investment Bank (EIB) and IFC direct risk-sharing facilities through Lebanese SME funds like Lebanon Growth Capital Fund.",
        "Emphasis on operational decentralization: supporting regional data nodes, solar-powered tech hubs, and agritech hardware.",
        "Stringent governance and AML/KYC requirements create a high-trust compliance stamp for participating startups."
      ],
      tags: ["#DFIReconstruction", "#EIBGrants", "#IFCImpact", "#SMEFinancing", "#CleanTech"]
    }
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ReportCategory, number> = {
      "All": dossiers.length,
      "Macro Trends": 0,
      "Startup Economics": 0,
      "VC Strategy": 0,
      "Private Equity & Funds": 0,
      "Offshore & Governance": 0,
      "Defense & Reconstruction": 0
    };

    dossiers.forEach((d) => {
      if (counts[d.category] !== undefined) {
        counts[d.category]++;
      }
      d.secondaryCategories.forEach((sec) => {
        if (counts[sec] !== undefined) {
          counts[sec]++;
        }
      });
    });

    return counts;
  }, [dossiers]);

  // Filtered Dossiers
  const filteredDossiers = useMemo(() => {
    return dossiers.filter((d) => {
      // Category Match
      const matchesCategory = 
        selectedCategory === "All" || 
        d.category === selectedCategory || 
        d.secondaryCategories.includes(selectedCategory);

      // Search Query Match
      const matchesSearch = 
        !searchQuery.trim() ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        d.bulletHighlights.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag Match
      const matchesTag = !selectedTag || d.tags.includes(selectedTag);

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [dossiers, selectedCategory, searchQuery, selectedTag]);

  // Active Dossier
  const activeDossier = useMemo(() => {
    return dossiers.find(d => d.slug === activeReportKey) || dossiers[0];
  }, [dossiers, activeReportKey]);

  // Sync if prop changes
  useEffect(() => {
    if (selectedReportId) {
      const match = dossiers.find(d => d.id === selectedReportId || d.slug === selectedReportId);
      if (match) {
        setActiveReportKey(match.slug);
      }
    }
  }, [selectedReportId]);

  const handleSelectReport = (slug: string) => {
    setActiveReportKey(slug);
    setViewMode("reader");
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const handleSelectCategory = (cat: ReportCategory) => {
    setSelectedCategory(cat);
    setSelectedTag(null);
    
    // Auto-select the first matching dossier in the newly selected category if active report is not matching
    const matching = dossiers.filter((d) => 
      cat === "All" || d.category === cat || (d.secondaryCategories && d.secondaryCategories.includes(cat))
    );
    if (matching.length > 0 && !matching.some(d => d.slug === activeReportKey)) {
      setActiveReportKey(matching[0].slug);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#investment-reports?report=${activeDossier.slug}&category=${encodeURIComponent(selectedCategory)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setToastMessage("Report link copied to clipboard");
    setTimeout(() => {
      setCopied(false);
      setToastMessage(null);
    }, 3000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*${activeDossier.title}*\n\n` +
      `_${activeDossier.subtitle}_\n\n` +
      `📊 *Key Highlights:*\n` +
      activeDossier.bulletHighlights.slice(0, 3).map(b => `• ${b}`).join("\n") +
      `\n\nRead the full report on 961AI Network:\n` +
      `${window.location.origin}/#investment-reports?report=${activeDossier.slug}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleDownloadPdf = (dossierToDownload: ResearchDossier = activeDossier) => {
    if (!user) {
      onOpenAuth?.("signup", "Download Complete Lebanon AI Investment Intelligence & Diligence Reports");
      return;
    }
    try {
      setIsGeneratingPdf(true);
      setToastMessage(`Generating PDF for ${dossierToDownload.slug}...`);
      
      // Small timeout to allow state update before synchronous pdf rendering
      setTimeout(() => {
        try {
          generateReportPdf(dossierToDownload);
          setToastMessage(`PDF downloaded: ${dossierToDownload.slug}_report_2026.pdf`);
        } catch (err) {
          console.error("Error generating PDF:", err);
          setToastMessage("Failed to generate PDF. Please try again.");
        } finally {
          setIsGeneratingPdf(false);
          setTimeout(() => {
            setToastMessage(null);
          }, 4000);
        }
      }, 100);
    } catch (error) {
      console.error("Error initiating PDF generation:", error);
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    dossiers.forEach(d => d.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet);
  }, [dossiers]);

  // Primary Core Tabs requested by user
  const primaryTabs: Array<{ id: ReportCategory; label: string; icon: React.FC<{ className?: string }>; description: string }> = [
    {
      id: "All",
      label: "All Reports",
      icon: BookOpen,
      description: "Complete library of institutional intelligence dossiers covering venture capital, private equity, and wartime economic resilience."
    },
    {
      id: "Macro Trends",
      label: "Macro Trends",
      icon: TrendingUp,
      description: "Tracking $3B+ regional VC deployment, sovereign wealth vehicles (PIF, Mubadala), and Levant cross-border capital flows."
    },
    {
      id: "Startup Economics",
      label: "Startup Economics",
      icon: DollarSign,
      description: "Wartime burn-rate modeling, +23% operating cost inflation, 18+ month runway buffers, and cash preservation."
    },
    {
      id: "VC Strategy",
      label: "VC Strategy",
      icon: Briefcase,
      description: "Institutional playbooks: diaspora syndicate mobilization ($15B+ remittances), virtual CFO treasury defense, and fund directories."
    }
  ];

  const secondaryCategories: ReportCategory[] = [
    "Private Equity & Funds",
    "Offshore & Governance",
    "Defense & Reconstruction"
  ];

  return (
    <div className="space-y-8 font-mono text-[#000000] max-w-6xl mx-auto pb-20 animate-in fade-in duration-200">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-mono shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Return Nav */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E7D6] pb-4">
        <button
          onClick={onNavigateToHome}
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F6FAF5] text-slate-800 border border-[#D7E7D6] hover:border-[#75AC73] text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#2E5A2C]" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]">
            INVESTMENT RESEARCH HUB
          </span>
          <span className="text-xs text-slate-600 font-mono hidden sm:inline-block">
            6 Data-Backed Research Dossiers
          </span>
        </div>
      </div>

      {/* Visitor Preview Mode Banner if !user */}
      {!user && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 p-4 sm:p-5 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Visitor Preview Mode</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    FREE SIGN-UP REQUIRED
                  </span>
                </div>
                <p className="text-slate-300 text-xs font-sans mt-0.5">
                  You are previewing executive dossier summaries. <strong>Sign up free</strong> with your name and email to download complete investor research PDFs and join our 961AI Community Mailing List.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenAuth?.("signup", "Download Comprehensive Lebanon AI Investment Intelligence Reports")}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-mono"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sign Up Free to Access</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Page Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#FAFCFA] via-white to-[#F2F7F1] border-2 border-[#B0CFAD] space-y-5 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EBF3EA] border border-[#75AC73] text-[#2E5A2C]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Institutional Intelligence • 2026 Special Editions
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
              Investment Reports & Research Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed font-medium">
              Data-backed research dossiers on private equity deal flow, venture capital deployment, wartime inflation modeling, decoupled treasury architectures, and diaspora syndicate bridges.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleDownloadPdf(activeDossier)}
              disabled={isGeneratingPdf}
              className="px-3.5 py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold disabled:opacity-50"
              title="Download formatted PDF of this report"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? "Generating PDF..." : "Download PDF"}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Share via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Share</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-white hover:bg-[#F6FAF5] text-[#2E5A2C] border border-[#B0CFAD] shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl bg-white hover:bg-[#F6FAF5] text-slate-800 border border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search Bar & Categorized Filter Controls */}
        <div className="pt-4 border-t border-[#D7E7D6] space-y-3.5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reports, PE funds, inflation models, AUM, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#B0CFAD] bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#2E5A2C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex flex-wrap items-center gap-1 bg-[#F6FAF5] p-1 rounded-xl border border-[#D7E7D6] shrink-0 w-full sm:w-auto justify-center">
              <button
                onClick={() => setViewMode("reader")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "reader"
                    ? "bg-[#2E5A2C] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Deep Reader</span>
              </button>

              <button
                onClick={() => setViewMode("catalog")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "catalog"
                    ? "bg-[#2E5A2C] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Catalog View ({filteredDossiers.length})</span>
              </button>

              <button
                onClick={() => setViewMode("treemap")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "treemap"
                    ? "bg-[#2E5A2C] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>D3 Sector Treemap & Bubbles</span>
              </button>
            </div>
          </div>

          {/* Categorized Filter Tabs (Macro Trends, Startup Economics, VC Strategy) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wide">
                <Filter className="w-3.5 h-3.5 text-[#2E5A2C]" />
                <span>RESEARCH DOMAINS & THEMATIC TABS:</span>
              </div>
              {(selectedCategory !== "All" || searchQuery || selectedTag) && (
                <button
                  onClick={() => {
                    handleSelectCategory("All");
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="text-xs font-bold text-[#2E5A2C] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset to All</span>
                </button>
              )}
            </div>

            {/* Primary Thematic Tabs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {primaryTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = selectedCategory === tab.id;
                const count = categoryCounts[tab.id];

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectCategory(tab.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? "bg-[#2E5A2C] text-white border-[#2E5A2C] shadow-sm ring-2 ring-[#2E5A2C]/20"
                        : "bg-white hover:bg-[#F6FAF5] text-slate-800 border-[#D7E7D6] hover:border-[#75AC73]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 w-full">
                      <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20 text-white" : "bg-[#EBF3EA] text-[#2E5A2C]"}`}>
                        <TabIcon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                      }`}>
                        {count} {count === 1 ? "report" : "reports"}
                      </span>
                    </div>

                    <div className="font-black text-xs tracking-tight leading-tight">
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Secondary/Specialized Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-[#2E5A2C]" />
                <span>Specialized Tracks:</span>
              </span>
              {secondaryCategories.map((secCat) => {
                const isSelected = selectedCategory === secCat;
                const count = categoryCounts[secCat];

                return (
                  <button
                    key={secCat}
                    onClick={() => handleSelectCategory(secCat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#2E5A2C] text-white border-[#2E5A2C] shadow-2xs"
                        : "bg-white hover:bg-[#F6FAF5] text-slate-700 border-[#D7E7D6]"
                    }`}
                  >
                    <span>{secCat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Contextual Category Intelligence Callout Banner */}
            {(() => {
              const activeTabMeta = primaryTabs.find(t => t.id === selectedCategory);
              if (activeTabMeta) {
                return (
                  <div className="p-3 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] text-xs font-sans text-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2E5A2C] shrink-0" />
                      <span className="font-semibold text-slate-900">{activeTabMeta.label}:</span>
                      <span className="line-clamp-1">{activeTabMeta.description}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#2E5A2C] font-bold shrink-0 hidden md:inline">
                      {filteredDossiers.length} Active Dossiers
                    </span>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* Quick Tag Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <Hash className="w-3 h-3 text-[#2E5A2C]" />
              <span>Tags:</span>
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-[#2E5A2C] text-white border-[#2E5A2C]"
                    : "bg-white hover:bg-[#F6FAF5] text-slate-600 border-[#D7E7D6]"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-800 ml-1 cursor-pointer flex items-center gap-0.5"
              >
                <X className="w-3 h-3" /> Clear Tag
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CATALOG GRID VIEW (When Catalog Mode is active or when browsing all) */}
      {/* ========================================================================= */}
      {viewMode === "catalog" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-700">
              Showing {filteredDossiers.length} Research Dossiers ({selectedCategory}):
            </div>
            {(selectedCategory !== "All" || searchQuery || selectedTag) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="text-xs font-bold text-[#2E5A2C] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDossiers.map((dossier) => {
              const isSelected = activeReportKey === dossier.slug;
              return (
                <div
                  key={dossier.id}
                  className={`p-5 rounded-2xl bg-white border-2 transition-all flex flex-col justify-between space-y-4 cursor-pointer hover:border-[#75AC73] shadow-xs ${
                    isSelected ? "border-[#2E5A2C] ring-2 ring-[#2E5A2C]/20" : "border-[#D7E7D6]"
                  }`}
                  onClick={() => handleSelectReport(dossier.slug)}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]">
                        {dossier.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {dossier.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 leading-snug hover:text-[#2E5A2C] transition-colors">
                      {dossier.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-sans line-clamp-3 leading-relaxed">
                      {dossier.excerpt}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#D7E7D6]">
                    {/* Key metric badge */}
                    <div className="p-2.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] flex items-center justify-between">
                      <div className="text-[11px] font-bold text-slate-600 font-mono">
                        {dossier.keyMetrics[0].label}
                      </div>
                      <div className="text-xs font-black text-[#2E5A2C] font-mono">
                        {dossier.keyMetrics[0].value}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center justify-between pt-1 gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {dossier.date}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPdf(dossier);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F6FAF5] text-[#2E5A2C] border border-[#B0CFAD] text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                          title="Download PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">PDF</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectReport(dossier.slug);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                        >
                          <span>Open Report</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDossiers.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-white border-2 border-dashed border-[#D7E7D6] space-y-3">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="text-sm font-bold text-slate-900">No research reports matched your search criteria.</div>
              <p className="text-xs text-slate-600 font-sans">
                Try searching for different keywords or reset your category filter to "All".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#2E5A2C] text-white text-xs font-bold"
              >
                Show All Reports
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* D3 TREEMAP & BUBBLE CHART VIEW (Dedicated Mode) */}
      {/* ========================================================================= */}
      {viewMode === "treemap" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <LebaneseAICapitalAllocationChart 
            onSelectSector={(sector) => {
              // Contextual intelligence when clicking a sector
              console.log("Selected sector:", sector.name);
            }}
          />

          {/* Quick return to Deep Reader */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white border-2 border-[#D7E7D6]">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <BookOpen className="w-4 h-4 text-[#2E5A2C]" />
              <span>Want to read full PDF and text dossiers corresponding to these sectors?</span>
            </div>
            <button
              onClick={() => setViewMode("reader")}
              className="px-4 py-2 rounded-lg bg-[#2E5A2C] text-white text-xs font-bold hover:bg-[#1E3B1D] cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <span>Return to Deep Reader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DEEP READER VIEW: ACTIVE RESEARCH REPORT */}
      {/* ========================================================================= */}
      {viewMode === "reader" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Quick Dossier Switcher Strip */}
          <div className="p-3.5 rounded-2xl bg-white border-2 border-[#B0CFAD] space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#2E5A2C]" />
                <span>SELECT RESEARCH DOSSIER TO READ:</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {filteredDossiers.length} Available in "{selectedCategory}"
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredDossiers.map((dossier) => {
                const isSelected = activeReportKey === dossier.slug;
                return (
                  <button
                    key={dossier.id}
                    onClick={() => handleSelectReport(dossier.slug)}
                    className={`p-3 rounded-xl text-left transition-all border flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#EBF3EA] border-[#2E5A2C] shadow-2xs ring-1 ring-[#2E5A2C]"
                        : "bg-white hover:bg-[#F6FAF5] border-[#D7E7D6] text-slate-700"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-[#2E5A2C] text-white" : "bg-slate-100 text-slate-600"}`}>
                      {dossier.slug === "mena_lebanon_vc" && <TrendingUp className="w-4 h-4" />}
                      {dossier.slug === "pe_vc" && <Building2 className="w-4 h-4" />}
                      {dossier.slug === "war_economics" && <Flame className="w-4 h-4" />}
                      {dossier.slug === "vcfo_playbook" && <DollarSign className="w-4 h-4" />}
                      {dossier.slug === "offshore_governance" && <Scale className="w-4 h-4" />}
                      {dossier.slug === "diaspora_syndicates" && <Globe className="w-4 h-4" />}
                      {dossier.slug === "dfi_reconstruction" && <ShieldCheck className="w-4 h-4" />}
                    </div>
                    <div className="space-y-0.5 overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-white text-slate-700 border border-[#D7E7D6]">
                          {dossier.category}
                        </span>
                      </div>
                      <div className="text-xs font-black text-slate-900 truncate leading-snug">
                        {dossier.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredDossiers.length === 0 && (
              <div className="p-6 text-center rounded-xl bg-[#F6FAF5] border border-dashed border-[#D7E7D6] space-y-2">
                <div className="text-xs font-bold text-slate-800">No dossiers match the current filter.</div>
                <button
                  onClick={() => handleSelectCategory("All")}
                  className="px-3 py-1.5 rounded-lg bg-[#2E5A2C] text-white text-xs font-bold"
                >
                  Show All Reports
                </button>
              </div>
            )}
          </div>

          {/* Dossier Container */}
          <div className="rounded-2xl bg-white border-2 border-[#B0CFAD] p-6 md:p-8 space-y-6 shadow-xs">
            {/* Header Area */}
            <div className="border-b border-[#D7E7D6] pb-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]">
                    {activeDossier.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#F6FAF5] text-slate-800 border border-[#D7E7D6]">
                    Category: {activeDossier.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {activeDossier.date} • {activeDossier.readTime}
                  </span>
                </div>

                {/* Direct Download Button in Header */}
                <button
                  onClick={() => handleDownloadPdf(activeDossier)}
                  disabled={isGeneratingPdf}
                  className="px-3 py-1.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Download formatted PDF of this report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isGeneratingPdf ? "Generating..." : "Download PDF Export"}</span>
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                {activeDossier.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium leading-relaxed">
                {activeDossier.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {activeDossier.tags.map(t => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F6FAF5] text-slate-600 border border-[#D7E7D6]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Facts & Metric Cards Grid */}
            <div className="space-y-3">
              <div className="text-xs font-black uppercase text-slate-900 tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                <span>Key Facts & High-Level Market Telemetry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {activeDossier.keyMetrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-1">
                    <div className="text-[11px] font-bold text-slate-600 uppercase">
                      {m.label}
                    </div>
                    <div className={`text-xl font-black ${
                      m.tone === "emerald" ? "text-[#2E5A2C]" :
                      m.tone === "amber" ? "text-amber-800" :
                      m.tone === "rose" ? "text-rose-800" :
                      m.tone === "blue" ? "text-blue-800" : "text-slate-900"
                    }`}>
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-600 font-sans">
                      {m.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bullet Highlights Container */}
            <div className="p-5 rounded-xl bg-[#FAFCFA] border-2 border-[#D7E7D6] space-y-3 font-sans">
              <div className="text-xs font-bold text-[#2E5A2C] uppercase font-mono flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2E5A2C]" />
                <span>Executive Summary Bullet Points:</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {activeDossier.bulletHighlights.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E5A2C] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========================================================================= */}
            {/* SPECIFIC REPORT BODY SECTIONS */}
            {/* ========================================================================= */}

            {/* REPORT 0 BODY: MENA & LEBANON VC LANDSCAPE 2026 */}
            {activeDossier.slug === "mena_lebanon_vc" && (
              <div className="space-y-6 animate-in fade-in duration-150 font-sans">
                {/* Executive Overview Section */}
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>Executive Overview: MENA & Lebanon Venture Ecosystem 2025–2026</span>
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <p>
                      The MENA venture ecosystem demonstrated <strong>strong capital concentration in 2025 and 2026</strong>, pulling ahead of other emerging venture markets. While global venture funding retreated, total venture capital deployed in MENA reached record highs, <strong>exceeding $3 Billion</strong>. Growth was primarily driven by sovereign wealth vehicles, late-stage mega-rounds, and regional funds in Saudi Arabia (KSA) and the United Arab Emirates (UAE).
                    </p>
                    <p>
                      In contrast, Lebanon's startup environment operates on a <strong>bifurcated model</strong>: domestic early-stage innovation relies heavily on <strong>DFI (Development Finance Institution) backing, impact funds, and diaspora capital</strong>, while Lebanese VC firms target cross-border, international tech deals to manage local currency and sovereign risk.
                    </p>
                  </div>
                </div>

                {/* Top MENA Startup Investment Categories */}
                <div className="p-6 rounded-xl bg-[#FAFCFA] border-2 border-[#D7E7D6] space-y-4">
                  <div className="border-b border-[#D7E7D6] pb-3">
                    <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                      <span>Top MENA Startup Investment Categories</span>
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Capital deployment in the broader MENA region shows significant sector-level concentration. FinTech retains its position as the top asset class, followed closely by rapid expansion in Enterprise Software and Artificial Intelligence.
                    </p>
                  </div>

                  {/* Category Breakdown Table */}
                  <div className="overflow-x-auto rounded-xl border-2 border-[#D7E7D6] bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#EBF3EA] text-[#2E5A2C] font-bold border-b border-[#B0CFAD]">
                        <tr>
                          <th className="py-3 px-4">Sector / Category</th>
                          <th className="py-3 px-4 font-mono">Est. Deal Share (%)</th>
                          <th className="py-3 px-4 font-mono">2025-2026 Trend</th>
                          <th className="py-3 px-4">Key Investment Drivers</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            <span>FinTech</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#2E5A2C]">~35% - 40%</td>
                          <td className="py-3 px-4 font-mono text-emerald-700 font-bold">▲ Dominant Asset Class</td>
                          <td className="py-3 px-4 text-slate-700">Digital payments, open banking, B2B credit facilities, buy-now-pay-later (BNPL), and neobanking across GCC markets.</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            <span>Enterprise Software & AI</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-700">~18% - 22%</td>
                          <td className="py-3 px-4 font-mono text-blue-700 font-bold">▲ Fastest Growing</td>
                          <td className="py-3 px-4 text-slate-700">B2B SaaS, Arabic NLP/LLM foundational models, robotic process automation (RPA), sovereign data infrastructure.</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                            <span>E-Commerce & Retail Tech</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-amber-700">~12% - 15%</td>
                          <td className="py-3 px-4 font-mono text-slate-600">► Maturing / M&A Phase</td>
                          <td className="py-3 px-4 text-slate-700">Quick-commerce consolidation, B2B wholesale marketplaces, last-mile logistics optimization.</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                            <span>HealthTech & BioTech</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-indigo-700">~8% - 10%</td>
                          <td className="py-3 px-4 font-mono text-emerald-700 font-bold">▲ High Demand</td>
                          <td className="py-3 px-4 text-slate-700">Telemedicine platforms, AI-driven diagnostics, pharmacy supply-chain digitization, clinical trials data.</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                            <span>CleanTech & AgriTech</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-teal-700">~5% - 8%</td>
                          <td className="py-3 px-4 font-mono text-teal-700 font-bold">▲ Sovereign Priority</td>
                          <td className="py-3 px-4 text-slate-700">Solar microgrid tech, water desalination innovation, precision hydroponics, carbon management.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Interactive D3.js Lebanese AI Capital Allocation Visualizer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2E5A2C] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>DYNAMIC D3.JS CAPITAL TELEMETRY & TREEMAP:</span>
                    </span>
                    <button
                      onClick={() => setShowEmbeddedTreemap(!showEmbeddedTreemap)}
                      className="text-xs font-bold text-[#2E5A2C] hover:underline cursor-pointer"
                    >
                      {showEmbeddedTreemap ? "Collapse Visualizer" : "Expand D3 Treemap"}
                    </button>
                  </div>

                  {showEmbeddedTreemap && (
                    <LebaneseAICapitalAllocationChart />
                  )}
                </div>

                {/* Regional Venture Capital Breakdown: MENA vs. Lebanon */}
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>Regional Venture Capital Breakdown: MENA vs. Lebanon</span>
                  </h3>

                  <div className="overflow-x-auto rounded-xl border-2 border-[#D7E7D6]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#EBF3EA] text-[#2E5A2C] font-bold border-b border-[#B0CFAD]">
                        <tr>
                          <th className="py-3 px-4">Metric / Dimension</th>
                          <th className="py-3 px-4">MENA (Overall)</th>
                          <th className="py-3 px-4">Lebanon Ecosystem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Total Capital Deployed (2025-2026)</td>
                          <td className="py-3 px-4 font-mono font-bold text-[#2E5A2C]">&gt;$3.0 Billion</td>
                          <td className="py-3 px-4 font-mono text-slate-800">~$15M - $30M (Domestic Early-Stage)</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Key Geographic Hubs</td>
                          <td className="py-3 px-4 text-slate-700">Saudi Arabia (KSA), UAE, Egypt</td>
                          <td className="py-3 px-4 text-slate-700">Beirut (with offshore UAE / Delaware entities)</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Primary Funding Sources</td>
                          <td className="py-3 px-4 text-slate-700">Sovereign Wealth Funds (PIF, Sanabil, Mubadala), Institutional VCs, Corporate VCs</td>
                          <td className="py-3 px-4 text-slate-700">DFIs (USAID, EIB, IFC), Impact Accelerators, Diaspora Angel Networks (LebNet, LIFE)</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Average Seed Deal Size</td>
                          <td className="py-3 px-4 font-mono text-slate-800">$1.5M - $3.0M</td>
                          <td className="py-3 px-4 font-mono text-slate-800">$250K - $750K</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Average Series A Deal Size</td>
                          <td className="py-3 px-4 font-mono text-slate-800">$7.0M - $15.0M</td>
                          <td className="py-3 px-4 font-mono text-slate-800">$2.0M - $5.0M (typically cross-border)</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Exit Landscape</td>
                          <td className="py-3 px-4 text-slate-700">Regional M&A, Tadawul IPOs, Secondary sales</td>
                          <td className="py-3 px-4 text-slate-700">International acqui-hires, Strategic trade sales, GCC expansion M&A</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Lebanon Startup Investment Landscape: Domestic vs. Cross-Border */}
                <div className="p-6 rounded-xl bg-[#FAFCFA] border-2 border-[#D7E7D6] space-y-4">
                  <div className="border-b border-[#D7E7D6] pb-3">
                    <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                      <span>Lebanon Startup Investment Landscape: Domestic vs. Cross-Border Models</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Domestic Pillar */}
                    <div className="p-4 rounded-xl bg-white border-2 border-[#B0CFAD] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-[#2E5A2C]">Pillar 1: Domestic Strategy</span>
                        <span className="text-[10px] font-mono bg-[#EBF3EA] text-[#2E5A2C] px-2 py-0.5 rounded border border-[#75AC73]">Early-Stage & Grants</span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900">Domestic Early-Stage & Impact Innovation</h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Local incubation and acceleration remain resilient through non-dilutive grant funding and DFI support. Programs sponsored by international agencies provide catalytic equity-free grants ($25K–$100K) to keep technical teams building inside Lebanon.
                      </p>
                      <div className="pt-2 text-xs font-mono text-slate-600 space-y-1">
                        <div>• <strong>Primary Catalysts:</strong> Berytech, IM Fndng, Flat6Labs Beirut, USAID TIF</div>
                        <div>• <strong>Focus Areas:</strong> AgriTech, CleanTech, HealthTech, Local EdTech</div>
                      </div>
                    </div>

                    {/* Cross-Border Pillar */}
                    <div className="p-4 rounded-xl bg-white border-2 border-[#B0CFAD] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-amber-800">Pillar 2: Outbound Strategy</span>
                        <span className="text-[10px] font-mono bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">Scale-Ups & GCC</span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900">Cross-Border & Diaspora VC Allocations</h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Lebanese-founded startups targeting scale incorporate in jurisdictions like Delaware (USA), ADGM/DIFC (UAE), or the UK. They retain their primary engineering and AI research talent in Lebanon to capitalize on high technical skill at competitive unit economics (3.6x cost advantage).
                      </p>
                      <div className="pt-2 text-xs font-mono text-slate-600 space-y-1">
                        <div>• <strong>Primary VCs:</strong> B&Y Ventures, Cedar Mundi, MEVP, Phoenician VC</div>
                        <div>• <strong>Focus Areas:</strong> Enterprise SaaS, Arabic AI LLMs, Global DeepTech</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Market Trends & Data Sources */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Trends */}
                  <div className="p-5 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-3">
                    <h4 className="text-xs font-black uppercase font-mono text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#2E5A2C]" />
                      <span>Key Market Trends (2025–2026)</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A2C] shrink-0 mt-0.5" />
                        <span><strong>KSA & UAE Capital Concentration:</strong> Over 70% of total MENA funding is absorbed by Saudi Arabia and the UAE, driven by national transformation programs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A2C] shrink-0 mt-0.5" />
                        <span><strong>Rise of Sovereign & Semi-Gov Funds:</strong> Jada, Sanabil, Mubadala, and ADQ continue to act as anchor LPs in regional venture funds.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A2C] shrink-0 mt-0.5" />
                        <span><strong>Talent Hub Arbitrage:</strong> Lebanon, Egypt, and Jordan maintain strong positions as engineering backbones for GCC-headquartered startups.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A2C] shrink-0 mt-0.5" />
                        <span><strong>Diaspora Co-Investment SPVs:</strong> Networks like LebNet, LIFE, and TechWadi are formalizing syndicates to channel micro-checks directly into Levantine seed rounds.</span>
                      </li>
                    </ul>
                  </div>

                  {/* References & Data Sources */}
                  <div className="p-5 rounded-xl bg-[#F6FAF5] border-2 border-[#B0CFAD] space-y-3">
                    <h4 className="text-xs font-black uppercase font-mono text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#2E5A2C]" />
                      <span>References & Data Sources</span>
                    </h4>
                    <div className="space-y-2 text-xs text-slate-700 font-mono">
                      <div className="p-2 rounded-lg bg-white border border-[#D7E7D6]">
                        <span className="font-bold text-slate-900">MAGNiTT:</span> 2025/2026 Emerging Venture Markets Report & MENA VC Dispatches
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#D7E7D6]">
                        <span className="font-bold text-slate-900">ZoomInvestors:</span> Lebanon Private Equity & Venture Capital Landscape Directory (Jan 2026)
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#D7E7D6]">
                        <span className="font-bold text-slate-900">CapLink:</span> MENA Private Capital & Cross-Border Sovereign Analysis
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#D7E7D6]">
                        <span className="font-bold text-slate-900">USAID / DFI Disclosures:</span> Catalytic Enterprise Development Reports (2025–2026)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REPORT 1 BODY: PE & VC LANDSCAPE 2026 */}
            {activeDossier.slug === "pe_vc" && (
              <div className="space-y-6">
                {/* Section: Market Overview & Deep Dynamics */}
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4 font-sans">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>Private Equity in Lebanon: Market Overview & Structural Thesis</span>
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <p>
                      Private equity in Lebanon functions as a compact yet influential regional hub. The 14 headquartered fund managers oversee cross-border investment mandates covering the broader Middle East and North Africa (MENA) region alongside sub-Saharan Africa. The <strong>$586.67 million projected transaction value for 2025</strong> indicates a measured, post-crisis stabilization rather than runaway structural expansion, against a background marked by severe post-2019 currency depreciation and sustained hyperinflation exceeding 150% annually.
                    </p>

                    <p>
                      The core defining trait of the Lebanese PE scene is its heavy reliance on <strong>offshore legal structures, foreign diaspora commitments, and development finance institution (DFI) support</strong> over domestic institutional liquidity. Following the 2019 financial crisis, the domestic commercial banking system effectively ceased its role as a credit and capital conduit. Compounded by an inactive public equity market—comprising just nine listed entities, six of which are banking institutions—GPs must structure liquidity events almost exclusively through <strong>trade sales or secondary transactions</strong>.
                    </p>

                    <p>
                      Growth capital forms the cornerstone strategy. Because over 90% of the local economy consists of family-owned SMEs, standard leveraged buyouts (LBOs) face significant structural constraints. Consequently, post-conflict reconstruction and economic resilience have evolved into prominent investment theses since 2024, evidenced by <strong>major DFIs directing more than $80 million into local industrial manufacturing, micro-lending networks, and energy projects during 2025</strong>.
                    </p>
                  </div>

                  {/* 5-Year Stage Breakdown Grid */}
                  <div className="pt-2">
                    <div className="text-xs font-bold text-slate-900 font-mono uppercase mb-2">
                      5-Year Capital Deployment by Stage:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] text-center space-y-1">
                        <div className="text-[11px] font-bold text-slate-600 font-mono uppercase">Seed Stage</div>
                        <div className="text-lg font-black text-[#2E5A2C]">$178 Million</div>
                        <div className="text-xs text-slate-600 font-mono">40 Funding Rounds</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] text-center space-y-1">
                        <div className="text-[11px] font-bold text-slate-600 font-mono uppercase">Early Stage</div>
                        <div className="text-lg font-black text-[#2E5A2C]">$4.59 Billion</div>
                        <div className="text-xs text-slate-600 font-mono">67 Funding Rounds</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] text-center space-y-1">
                        <div className="text-[11px] font-bold text-slate-600 font-mono uppercase">Late Stage</div>
                        <div className="text-lg font-black text-[#2E5A2C]">$3.37 Billion</div>
                        <div className="text-xs text-slate-600 font-mono">35 Funding Rounds</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Firm Comparison Table */}
                <div className="p-6 rounded-xl bg-[#FAFCFA] border-2 border-[#D7E7D6] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D7E7D6] pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                        <span>Firm Comparison at a Glance (Top 10 Prominent Managers)</span>
                      </h3>
                      <p className="text-xs text-slate-600 font-sans mt-0.5">
                        Source: ZoomInvestors Directory & Verified Fund Disclosures
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border-2 border-[#D7E7D6] bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#EBF3EA] text-[#2E5A2C] font-bold border-b border-[#B0CFAD]">
                        <tr>
                          <th className="py-3 px-4">Firm</th>
                          <th className="py-3 px-4">AUM</th>
                          <th className="py-3 px-4">Strategy</th>
                          <th className="py-3 px-4">Sector Strength</th>
                          <th className="py-3 px-4">Known For</th>
                          <th className="py-3 px-4">HQ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-sans">
                        <tr className="hover:bg-[#F6FAF5] bg-emerald-50/40">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">Global Gate Capital</td>
                          <td className="py-3 px-4 font-mono font-black text-emerald-800">$6B+</td>
                          <td className="py-3 px-4">Multi-strategy (PE, real assets, private debt)</td>
                          <td className="py-3 px-4 text-slate-700">Logistics, real estate, financial services</td>
                          <td className="py-3 px-4 font-medium text-slate-900">Largest manager by AUM in the market</td>
                          <td className="py-3 px-4 font-mono font-bold">Beirut</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">The EuroMena Funds</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Growth equity, buyout</td>
                          <td className="py-3 px-4 text-slate-700">Financial services, healthcare</td>
                          <td className="py-3 px-4 text-slate-700">Executed dual exits during 2024 crisis conditions</td>
                          <td className="py-3 px-4 font-mono font-bold">Beirut</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">Lebanon Growth Capital Fund</td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">$50M</td>
                          <td className="py-3 px-4">Growth equity, buyout</td>
                          <td className="py-3 px-4 text-slate-700">SMEs, generalist</td>
                          <td className="py-3 px-4 text-slate-700">Multilateral DFI-backed SME platform</td>
                          <td className="py-3 px-4 font-mono font-bold">Beirut</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">Seenko Investments</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Multi-asset</td>
                          <td className="py-3 px-4 text-slate-700">Equity, debt, real estate, VC</td>
                          <td className="py-3 px-4 text-slate-700">Multi-asset strategy managed under one roof</td>
                          <td className="py-3 px-4 font-mono font-bold">Beirut</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">BY Venture Partners</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Venture capital</td>
                          <td className="py-3 px-4 text-slate-700">AI, marketplaces, platforms</td>
                          <td className="py-3 px-4 text-slate-700">Cross-border MENA/US/Europe early-stage VC</td>
                          <td className="py-3 px-4 font-mono font-bold">Beirut / MENA</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">Capital B</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Buyout, growth equity</td>
                          <td className="py-3 px-4 text-slate-700">Mid-market PE, real estate</td>
                          <td className="py-3 px-4 text-slate-700">Lebanese and European real estate transactions</td>
                          <td className="py-3 px-4 font-mono font-bold">Lebanon</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">Emerging Investment Partners</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Acquisition, growth</td>
                          <td className="py-3 px-4 text-slate-700">Enterprise infrastructure, software</td>
                          <td className="py-3 px-4 text-slate-700">Enterprise technology buyout/growth mandate</td>
                          <td className="py-3 px-4 font-mono font-bold">Lebanon</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">Saradar Capital Holding</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Growth equity</td>
                          <td className="py-3 px-4 text-slate-700">Financial services, logistics</td>
                          <td className="py-3 px-4 text-slate-700">Long-standing domestic investment holding company</td>
                          <td className="py-3 px-4 font-mono font-bold">Lebanon</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">Hariri Capital Group</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Growth equity</td>
                          <td className="py-3 px-4 text-slate-700">Diversified</td>
                          <td className="py-3 px-4 text-slate-700">Capital deployment platform</td>
                          <td className="py-3 px-4 font-mono font-bold">Lebanon</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-black text-slate-900 font-mono">WGroup</td>
                          <td className="py-3 px-4 font-mono text-slate-500">Undisclosed</td>
                          <td className="py-3 px-4">Private equity</td>
                          <td className="py-3 px-4 text-slate-700">Digital out-of-home, digital marketing</td>
                          <td className="py-3 px-4 text-slate-700">Targeted focus on digital media assets</td>
                          <td className="py-3 px-4 font-mono font-bold">Lebanon</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* REPORT 2 BODY: WARTIME ECONOMICS */}
            {activeDossier.slug === "war_economics" && (
              <div className="space-y-6">
                {/* Section 1: Macro Disruption */}
                <div className="p-6 rounded-xl bg-[#FAFCFA] border-2 border-[#D7E7D6] space-y-4 font-sans">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>1. Macroeconomic Shocks and Global Capital Realignment</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    War triggers systemic macroeconomic realignments: peacetime fiscal budgets pivot to national defense, energy markets absorb risk premiums, and venture capital liquidity migrates away from consumer speculation toward critical, sovereign technologies.
                  </p>

                  {/* Architecture ASCII Diagram */}
                  <div className="rounded-xl bg-slate-950 text-emerald-400 p-4 font-mono text-[11px] sm:text-xs overflow-x-auto shadow-inner border border-slate-800 leading-tight">
                    <pre className="whitespace-pre">
{`                     +---------------------------------------+
                     |    2026 Levantine Ecosystem Resilience|
                     +---------------------------------------+
                                         |
     +-----------------------------------+-----------------------------------+
     |                                   |                                   |
     v                                   v                                   v
+------------------------+  +------------------------+  +------------------------+
|   Offshore Capital     |  |   Workforce Security   |  |   Regional Scale Out   |
+------------------------+  +------------------------+  +------------------------+
| • Delaware / Cayman HQ |  | • Dual-currency payroll|  | • GCC expansion targets|
| • Fresh USD accounts   |  | • Remote cloud stacks  |  | • UAE / KSA revenue    |
| • Diaspora VCs (LIFE)  |  | • Employer of Record   |  | • Cross-border M&A     |
+------------------------+  +------------------------+  +------------------------+`}
                    </pre>
                  </div>
                </div>

                {/* Section 2: Cost Inflation Table */}
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4 font-sans">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                    <span>2. Startup Cost Inflation Model (2026 Wartime Scenario)</span>
                  </h3>

                  <div className="overflow-x-auto rounded-xl border-2 border-[#D7E7D6] bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#EBF3EA] text-[#2E5A2C] font-bold border-b border-[#B0CFAD]">
                        <tr>
                          <th className="py-3 px-4">Cost Category</th>
                          <th className="py-3 px-4">Pre-Conflict Baseline</th>
                          <th className="py-3 px-4">2026 Post-Escalation</th>
                          <th className="py-3 px-4">% Increase</th>
                          <th className="py-3 px-4">Core Macro Driver</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-sans">
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Energy & Generator Tariffs</td>
                          <td className="py-3 px-4 font-mono">$120,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-rose-700">$160,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-rose-700">+33.3%</td>
                          <td className="py-3 px-4 text-slate-600">Diesel price spikes & power grid gaps</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Logistics & War Risk Freight</td>
                          <td className="py-3 px-4 font-mono">$200,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-rose-700">$300,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-rose-700">+50.0%</td>
                          <td className="py-3 px-4 text-slate-600">Maritime insurance & routing adjustments</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Raw Materials & Hardware</td>
                          <td className="py-3 px-4 font-mono">$250,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-rose-700">$325,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-rose-700">+30.0%</td>
                          <td className="py-3 px-4 text-slate-600">Regional supply chain delays</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Payroll (USD Baseline)</td>
                          <td className="py-3 px-4 font-mono">$350,000</td>
                          <td className="py-3 px-4 font-mono">$350,000</td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-600">0.0%</td>
                          <td className="py-3 px-4 text-slate-600">Core engineering retention</td>
                        </tr>
                        <tr className="hover:bg-[#F6FAF5]">
                          <td className="py-3 px-4 font-bold text-slate-900 font-mono">Cloud & Cybersecurity</td>
                          <td className="py-3 px-4 font-mono">$80,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-amber-700">$95,000</td>
                          <td className="py-3 px-4 font-mono font-bold text-amber-700">+18.8%</td>
                          <td className="py-3 px-4 text-slate-600">Security compliance & network defense</td>
                        </tr>
                        <tr className="bg-slate-900 text-white font-mono font-black">
                          <td className="py-3 px-4">TOTAL OPERATING COST</td>
                          <td className="py-3 px-4">$1,000,000</td>
                          <td className="py-3 px-4 text-rose-400">$1,230,000</td>
                          <td className="py-3 px-4 text-rose-400">+23.0%</td>
                          <td className="py-3 px-4 text-amber-300 font-sans text-xs">Runway reduced by ~2.8 months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* REPORT 3 BODY: VCFO RUNWAY DEFENSE */}
            {activeDossier.slug === "vcfo_playbook" && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4 font-sans">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>1. The 18-24 Month Runway Rule for Seed & Series A</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    In volatile macro environments, capital fundraising cycles extend by 4 to 6 months. Founders must recalibrate their financial planning away from 12-month burn horizons toward minimum 18-month buffers.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-[#EBF3EA] border border-[#75AC73] space-y-1 text-center">
                      <div className="text-xs font-bold text-[#2E5A2C] font-mono uppercase">Phase 1: Zero-Base Audit</div>
                      <div className="text-sm font-black text-slate-900">Eliminate Phantom SaaS</div>
                      <p className="text-[11px] text-slate-600">Cut redundant cloud tools, unused licenses & unmetered APIs.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#EBF3EA] border border-[#75AC73] space-y-1 text-center">
                      <div className="text-xs font-bold text-[#2E5A2C] font-mono uppercase">Phase 2: Buffer Structuring</div>
                      <div className="text-sm font-black text-slate-900">+20% Inflation Surcharge</div>
                      <p className="text-[11px] text-slate-600">Apply safety multiplier on all hardware, energy, and cloud costs.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#EBF3EA] border border-[#75AC73] space-y-1 text-center">
                      <div className="text-xs font-bold text-[#2E5A2C] font-mono uppercase">Phase 3: Revenue Indexing</div>
                      <div className="text-sm font-black text-slate-900">Dollarized GCC Invoicing</div>
                      <p className="text-[11px] text-slate-600">Invoice regional enterprise clients in USD or AED exclusively.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REPORT 4 BODY: OFFSHORE GOVERNANCE & TAX */}
            {activeDossier.slug === "offshore_governance" && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4 font-sans">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>1. Offshore SAL Tax Advantages (Law No. 85)</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <p>
                      Under Lebanese Law No. 85 and Legislative Decree 46, an <strong>Offshore Société Anonyme Libanaise (SAL)</strong> enjoys total corporate income tax exemption on all profits generated from overseas clients, software exports, and cross-border consulting.
                    </p>
                    <div className="p-4 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-2">
                      <div className="font-bold text-slate-900 font-mono text-xs">Core Legal Privileges:</div>
                      <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                        <li>Fixed annual lump-sum tax of only 1,000,000 LBP (~$11 USD).</li>
                        <li>Exemption from standard Lebanese corporate income tax (17%).</li>
                        <li>Exemption from distribution tax (10%) on dividends paid out of foreign revenues.</li>
                        <li>Exemption from stamp duty on all contracts concluded abroad or with foreign entities.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REPORT 5 BODY: DIASPORA VENTURE SYNDICATES */}
            {activeDossier.slug === "diaspora_syndicates" && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4 font-sans">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>1. The $15B+ Expat Capital Deployment Bridge</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    Lebanon's diaspora of over 14 million individuals worldwide represents one of the highest per-capita concentrations of executive leadership across Silicon Valley, Wall Street, London's City, and Gulf sovereign entities. Syndicates channel high-conviction micro-tickets through SPVs directly into verified startup rounds.
                  </p>
                </div>
              </div>
            )}

            {/* REPORT 6 BODY: DFI RECONSTRUCTION CAPITAL */}
            {activeDossier.slug === "dfi_reconstruction" && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-4 font-sans">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-mono flex items-center gap-2 border-b border-[#D7E7D6] pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
                    <span>1. Multilateral Development Bank Facilities</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    European Investment Bank (EIB), International Finance Corporation (IFC), and European Bank for Reconstruction and Development (EBRD) maintain dedicated crisis-resilience credit lines and industrial recovery funds totaling over $80 Million.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Sharing & Full Actions Toolbar */}
            <div className="pt-5 border-t border-[#D7E7D6] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-mono">
                Citation: {activeDossier.publisher} • {activeDossier.date}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleDownloadPdf(activeDossier)}
                  disabled={isGeneratingPdf}
                  className="px-3.5 py-2 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Download formatted PDF of this report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isGeneratingPdf ? "Generating PDF..." : "Download PDF Dossier"}</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Broadcast on WhatsApp</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-[#F6FAF5] text-[#2E5A2C] border border-[#B0CFAD] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-[#F6FAF5] text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Nav & Citation Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAFCFA] border-2 border-[#D7E7D6] text-xs">
        <div className="text-slate-600 font-mono flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A2C]"></span>
          <span>961AI Institutional Research Desk • All Reports Updated August 2026</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNavigateToHome}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F6FAF5] text-slate-800 border border-[#D7E7D6] font-bold shadow-2xs transition-all cursor-pointer"
          >
            Return to Homepage
          </button>

          {onNavigateToSandbox && (
            <button
              onClick={onNavigateToSandbox}
              className="px-4 py-2 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-black shadow-2xs transition-all cursor-pointer"
            >
              Explore Legal Sandbox & Offshore SAL
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
