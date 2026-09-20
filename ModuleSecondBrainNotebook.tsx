import React, { useState, useMemo } from "react";
import { GraphNode, IntroductionRequestLog } from "../../types";
import {
  Laptop,
  Star,
  ShieldCheck,
  Award,
  Search,
  Filter,
  MapPin,
  Globe,
  DollarSign,
  Users,
  CheckCircle2,
  Send,
  ArrowUpDown,
  Sparkles,
  Layers,
  Code2,
  Blocks,
  Cpu,
  Smartphone,
  Cloud,
  Database,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  X,
  Plus,
  MinusCircle,
  FileText,
  Clock,
  Briefcase,
  TrendingUp,
  Building2,
  Wallet,
  Landmark,
  Compass,
  Check,
  Linkedin
} from "lucide-react";

interface ModuleProviderMarketplaceProps {
  nodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
  deductCredits: (amount: number) => boolean;
  credits: number;
  introLogs?: IntroductionRequestLog[];
  onAddIntroLog?: (log: IntroductionRequestLog) => void;
  onNavigateToQuestionnaire?: () => void;
}

type MarketplaceViewMode = "ALL" | "AGENCIES" | "INVESTORS";

export const ModuleProviderMarketplace: React.FC<ModuleProviderMarketplaceProps> = ({
  nodes,
  onSelectNode,
  deductCredits,
  credits,
  introLogs = [],
  onAddIntroLog,
  onNavigateToQuestionnaire
}) => {
  // Primary View Mode: Agencies vs Investors vs All
  const [viewMode, setViewMode] = useState<MarketplaceViewMode>("ALL");

  // Search and general filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceOrStage, setSelectedServiceOrStage] = useState<string>("ALL");
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>("ALL");
  const [selectedHourlyRate, setSelectedHourlyRate] = useState<string>("ALL");
  const [selectedMinBudget, setSelectedMinBudget] = useState<string>("ALL");
  const [selectedTicketSize, setSelectedTicketSize] = useState<string>("ALL");
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>("ALL");
  const [selectedVerification, setSelectedVerification] = useState<"ALL" | "premier" | "verified">("ALL");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name" | "connections" | "ticket">("rating");

  // Comparison Shortlist (up to 3 items)
  const [comparisonList, setComparisonList] = useState<GraphNode[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  // RFP / Pitch Modal State
  const [activeIntroTarget, setActiveIntroTarget] = useState<GraphNode | null>(null);
  const [introPitch, setIntroPitch] = useState("");
  const [introBudget, setIntroBudget] = useState("$5,000 - $25,000");
  const [introTimeline, setIntroTimeline] = useState("1 - 3 Months");
  const [fundingRoundAsk, setFundingRoundAsk] = useState("Seed ($500k - $1.2M)");
  const [introStatusMessage, setIntroStatusMessage] = useState<string | null>(null);

  // Dynamic LinkedIn Profile Link Resolver based on node data attributes
  const getLinkedInUrl = (entity: GraphNode): string => {
    if (entity.linkedinUrl) return entity.linkedinUrl;
    if ((entity as any).linkedin) return (entity as any).linkedin;

    // Verified known company / venture profiles
    const knownMappings: Record<string, string> = {
      agency_code_brew_labs: "https://www.linkedin.com/company/code-brew-labs",
      agency_simform: "https://www.linkedin.com/company/simform",
      agency_eurisko: "https://www.linkedin.com/company/eurisko-mobility",
      agency_tedmob: "https://www.linkedin.com/company/tedmob",
      agency_codeninja: "https://www.linkedin.com/company/codeninja-inc",
      agency_phaedra_solutions: "https://www.linkedin.com/company/phaedra-solutions",
      agency_webspot: "https://www.linkedin.com/company/webspot",
      agency_tridhya_tech: "https://www.linkedin.com/company/tridhya-tech",
      agency_hellotree: "https://www.linkedin.com/company/hellotree",
      agency_netiks_international: "https://www.linkedin.com/company/netiks-international-sal",
      agency_navybits: "https://www.linkedin.com/company/navybits",
      agency_kloudr: "https://www.linkedin.com/company/kloudr",
      agency_pixel38: "https://www.linkedin.com/company/pixel38",
      agency_bitwize: "https://www.linkedin.com/company/bitwize",
      agency_qwerty_sal: "https://www.linkedin.com/company/qwerty-sal",
      agency_lead_by_tech: "https://www.linkedin.com/company/leadbytech",
      agency_augminter: "https://www.linkedin.com/company/augminter",
      agency_online_dimensions: "https://www.linkedin.com/company/online-dimensions",
      agency_code_mind: "https://www.linkedin.com/company/codemind-sal",
      agency_eye_digital: "https://www.linkedin.com/company/eye-digital-mena",
      agency_origen: "https://www.linkedin.com/company/origen-agency",
      agency_tarek_abou_rjeily: "https://www.linkedin.com/in/tarekabourjeily",
      agency_weezli: "https://www.linkedin.com/company/weezli",
      agency_ayc_intelligence: "https://www.linkedin.com/company/ayc-intelligence",
      agency_htech: "https://www.linkedin.com/company/htech-solutions",
      agency_rak4analytics: "https://www.linkedin.com/company/rak4analytics",
      agency_web_synergy: "https://www.linkedin.com/company/web-synergy-sal",
      agency_wiz_consults: "https://www.linkedin.com/company/wiz-consults",
      inv_mevp: "https://www.linkedin.com/company/middle-east-venture-partners-mevp-",
      inv_cedar_mundi: "https://www.linkedin.com/company/cedar-mundi-ventures",
      inv_byvp: "https://www.linkedin.com/company/beirut-venture-partners",
      inv_phoenician: "https://www.linkedin.com/company/phoenician-funds",
      inv_berytech_fund: "https://www.linkedin.com/company/berytech",
      inv_diaspora_angels: "https://www.linkedin.com/company/lebanese-diaspora-angel-network",
      inv_impact_fund: "https://www.linkedin.com/company/impact-fund-lebanon",
      inv_levant_capital: "https://www.linkedin.com/company/levant-capital",
      inv_flat6labs_beirut: "https://www.linkedin.com/company/flat6labs"
    };

    if (knownMappings[entity.id]) {
      return knownMappings[entity.id];
    }

    const cleanSlug = (entity.wikiSlug || entity.label || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (entity.type === "Guru" || entity.id.startsWith("guru_")) {
      return `https://www.linkedin.com/in/${cleanSlug}`;
    }

    return `https://www.linkedin.com/company/${cleanSlug}`;
  };

  // Extract all software & AI agencies
  const allAgencies = useMemo(() => {
    return nodes.filter(
      (n) =>
        n.id.startsWith("agency_") ||
        n.rating !== undefined ||
        n.servicesBreakdown !== undefined ||
        n.minProjectSize !== undefined ||
        n.hourlyRate !== undefined ||
        (n.type === "Startup" &&
          n.tags &&
          (n.tags.includes("AI Development") ||
            n.tags.includes("Mobile App Development") ||
            n.tags.includes("Custom Software Development") ||
            n.tags.includes("Blockchain") ||
            n.tags.includes("Web Development") ||
            n.tags.includes("IT Staff Augmentation") ||
            n.tags.includes("Cloud Consulting & SI")))
    );
  }, [nodes]);

  // Extract all venture capital firms & angel syndicates
  const allInvestors = useMemo(() => {
    return nodes.filter(
      (n) =>
        n.type === "Investor" ||
        n.id.startsWith("inv_") ||
        n.ticketSize !== undefined ||
        (n.tags &&
          (n.tags.includes("Angel Syndicate") ||
            n.tags.includes("Early Stage") ||
            n.tags.includes("Cross-Border VC") ||
            n.tags.includes("Matching Capital") ||
            n.tags.includes("DeepTech Angel") ||
            n.tags.includes("Pre-Seed") ||
            n.tags.includes("Seed") ||
            n.tags.includes("Series A")))
    );
  }, [nodes]);

  // Combined pool based on active viewMode
  const baseEntities = useMemo(() => {
    if (viewMode === "AGENCIES") return allAgencies;
    if (viewMode === "INVESTORS") return allInvestors;
    // For "ALL": combine unique nodes
    const ids = new Set<string>();
    const combined: GraphNode[] = [];
    allAgencies.forEach((a) => {
      ids.add(a.id);
      combined.push(a);
    });
    allInvestors.forEach((inv) => {
      if (!ids.has(inv.id)) {
        ids.add(inv.id);
        combined.push(inv);
      }
    });
    return combined;
  }, [viewMode, allAgencies, allInvestors]);

  // Primary Service / Mandate domain pills
  const serviceTypesForAgencies = [
    { id: "ALL", label: "All Services", icon: Layers },
    { id: "AI Development", label: "AI Development", icon: Cpu },
    { id: "Mobile", label: "Mobile Apps", icon: Smartphone },
    { id: "Blockchain", label: "Blockchain", icon: Blocks },
    { id: "Generative AI", label: "Generative AI", icon: Sparkles },
    { id: "Cloud", label: "Cloud Consulting & SI", icon: Cloud },
    { id: "Custom Software", label: "Custom Software", icon: Code2 },
    { id: "CRM", label: "CRM / ERP Consulting", icon: Database },
    { id: "IT Staff", label: "IT Staff Augmentation", icon: Users }
  ];

  const mandateTypesForInvestors = [
    { id: "ALL", label: "All Mandates", icon: Landmark },
    { id: "Pre-Seed", label: "Pre-Seed ($30k - $250k)", icon: Sparkles },
    { id: "Seed", label: "Seed ($250k - $1M)", icon: TrendingUp },
    { id: "Series A", label: "Series A ($1M - $5M)", icon: Building2 },
    { id: "Angel Syndicate", label: "Diaspora Angels", icon: Users },
    { id: "DeepTech", label: "DeepTech & AI", icon: Cpu },
    { id: "Cross-Border", label: "Cross-Border VC", icon: Globe },
    { id: "Matching", label: "Matching Capital & Grants", icon: Wallet }
  ];

  const combinedTypes = [
    { id: "ALL", label: "All Specializations", icon: Layers },
    { id: "AI Development", label: "AI & ML Engineering", icon: Cpu },
    { id: "Seed", label: "Seed / Pre-Seed Capital", icon: TrendingUp },
    { id: "Mobile", label: "Mobile & Web Platforms", icon: Smartphone },
    { id: "Series A", label: "Series A / Institutional", icon: Building2 },
    { id: "Angel Syndicate", label: "Diaspora Angel Networks", icon: Users },
    { id: "Cloud", label: "Cloud & DevOps", icon: Cloud },
    { id: "DeepTech", label: "DeepTech & Hardware", icon: Blocks }
  ];

  const currentPills = useMemo(() => {
    if (viewMode === "AGENCIES") return serviceTypesForAgencies;
    if (viewMode === "INVESTORS") return mandateTypesForInvestors;
    return combinedTypes;
  }, [viewMode]);

  // Location filter options
  const locationOptions = [
    { id: "ALL", label: "All Locations" },
    { id: "onshore", label: "🇱🇧 Onshore Lebanon" },
    { id: "serves_lebanon", label: "🤝 Serves Lebanon / Regional" },
    { id: "diaspora", label: "🌍 Diaspora / Global" }
  ];

  const subRegions = [
    "ALL",
    "Beirut / Bayrut",
    "Mount Lebanon (Adma, Jounieh, Dekwaneh, Sarba, Mansourieh)",
    "North Lebanon (Tripoli / Tarablus)",
    "UAE / Dubai & Riyadh",
    "USA / Silicon Valley & Global",
    "Europe (London, Paris, Madrid)"
  ];

  const hourlyRateRanges = ["ALL", "< $25 / hr", "$25 - $49 / hr", "$50 - $99 / hr", "$100 - $149 / hr"];

  const minBudgetRanges = ["ALL", "$1,000+", "$5,000+", "$10,000+", "$25,000+", "$50,000+", "$250,000+"];

  const ticketSizeRanges = [
    "ALL",
    "< $100k (Angel / First Cheque)",
    "$100k - $500k (Pre-Seed / Seed)",
    "$500k - $2M (Seed / Series A)",
    "$1M - $5M+ (Growth / Institutional)"
  ];

  const stageFilterOptions = ["ALL", "Pre-Seed", "Seed", "Series A", "Series B"];

  // Filter & Sort
  const filteredEntities = useMemo(() => {
    return baseEntities
      .filter((entity) => {
        const isInvestor = entity.type === "Investor" || entity.id.startsWith("inv_") || entity.ticketSize !== undefined;

        // Service or Mandate Filter
        if (selectedServiceOrStage !== "ALL") {
          const sLower = selectedServiceOrStage.toLowerCase();
          const matchesTags = entity.tags?.some((t) => t.toLowerCase().includes(sLower));
          const matchesTitle = entity.title?.toLowerCase().includes(sLower);
          const matchesBio = entity.bio?.toLowerCase().includes(sLower);
          const matchesStage = entity.stage?.toLowerCase().includes(sLower);
          const matchesTicket = entity.ticketSize?.toLowerCase().includes(sLower);
          const matchesBreakdown = entity.servicesBreakdown?.some((s) => s.name.toLowerCase().includes(sLower));

          if (!matchesTags && !matchesTitle && !matchesBio && !matchesStage && !matchesTicket && !matchesBreakdown) {
            return false;
          }
        }

        // Location Filter
        if (selectedLocation === "onshore") {
          if (entity.isDiaspora || entity.location?.toLowerCase().includes("serves lebanon")) {
            return false;
          }
        } else if (selectedLocation === "serves_lebanon") {
          const isServes = entity.servesLebanon || entity.location?.toLowerCase().includes("serves lebanon");
          if (!isServes) return false;
        } else if (selectedLocation === "diaspora") {
          if (!entity.isDiaspora) return false;
        }

        // Sub-region filter
        if (selectedSubRegion !== "ALL") {
          const locStr = (entity.location || "").toLowerCase();
          if (selectedSubRegion.includes("Beirut") && !locStr.includes("beirut") && !locStr.includes("bayrut")) return false;
          if (
            selectedSubRegion.includes("Mount Lebanon") &&
            !locStr.includes("adma") &&
            !locStr.includes("jounieh") &&
            !locStr.includes("dekwaneh") &&
            !locStr.includes("sarba") &&
            !locStr.includes("hazmieh") &&
            !locStr.includes("antelias") &&
            !locStr.includes("mansourieh") &&
            !locStr.includes("wata")
          )
            return false;
          if (selectedSubRegion.includes("North Lebanon") && !locStr.includes("tarablus") && !locStr.includes("tripoli"))
            return false;
          if (
            selectedSubRegion.includes("UAE") &&
            !locStr.includes("uae") &&
            !locStr.includes("dubai") &&
            !locStr.includes("riyadh")
          )
            return false;
          if (
            selectedSubRegion.includes("USA") &&
            !locStr.includes("usa") &&
            !locStr.includes("san francisco") &&
            !locStr.includes("palo alto") &&
            !locStr.includes("boston") &&
            !locStr.includes("delaware") &&
            !locStr.includes("wilmington")
          )
            return false;
          if (
            selectedSubRegion.includes("Europe") &&
            !locStr.includes("london") &&
            !locStr.includes("paris") &&
            !locStr.includes("madrid") &&
            !locStr.includes("france") &&
            !locStr.includes("uk") &&
            !locStr.includes("spain")
          )
            return false;
        }

        // Agency-specific filters
        if (!isInvestor) {
          if (selectedHourlyRate !== "ALL") {
            if (!entity.hourlyRate || !entity.hourlyRate.toLowerCase().includes(selectedHourlyRate.toLowerCase())) {
              return false;
            }
          }
          if (selectedMinBudget !== "ALL") {
            if (!entity.minProjectSize || !entity.minProjectSize.toLowerCase().includes(selectedMinBudget.toLowerCase())) {
              return false;
            }
          }
        }

        // Investor-specific filters
        if (isInvestor) {
          if (selectedStageFilter !== "ALL") {
            const stLower = selectedStageFilter.toLowerCase();
            const matchesStage = entity.stage?.toLowerCase().includes(stLower);
            const matchesTags = entity.tags?.some((t) => t.toLowerCase().includes(stLower));
            if (!matchesStage && !matchesTags) return false;
          }

          if (selectedTicketSize !== "ALL") {
            const tStr = (entity.ticketSize || "").toLowerCase();
            if (selectedTicketSize.includes("< $100k") && !tStr.includes("30k") && !tStr.includes("50k")) return false;
            if (selectedTicketSize.includes("$100k - $500k") && !tStr.includes("100k") && !tStr.includes("250k") && !tStr.includes("400k")) return false;
            if (selectedTicketSize.includes("$500k - $2M") && !tStr.includes("500k") && !tStr.includes("1,000,000") && !tStr.includes("2,000,000") && !tStr.includes("2,500,000")) return false;
            if (selectedTicketSize.includes("$1M - $5M+") && !tStr.includes("1,000,000") && !tStr.includes("5,000,000") && !tStr.includes("10,000,000")) return false;
          }
        }

        // Verification Filter
        if (selectedVerification === "premier" && !entity.premierVerified) return false;
        if (selectedVerification === "verified" && !entity.verified) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesLabel = entity.label.toLowerCase().includes(q);
          const matchesTitle = entity.title ? entity.title.toLowerCase().includes(q) : false;
          const matchesBio = entity.bio ? entity.bio.toLowerCase().includes(q) : false;
          const matchesLoc = entity.location ? entity.location.toLowerCase().includes(q) : false;
          const matchesTags = entity.tags ? entity.tags.some((t) => t.toLowerCase().includes(q)) : false;
          const matchesHighlights = entity.highlights ? entity.highlights.some((h) => h.toLowerCase().includes(q)) : false;
          const matchesTicket = entity.ticketSize ? entity.ticketSize.toLowerCase().includes(q) : false;
          const matchesStage = entity.stage ? entity.stage.toLowerCase().includes(q) : false;

          if (
            !matchesLabel &&
            !matchesTitle &&
            !matchesBio &&
            !matchesLoc &&
            !matchesTags &&
            !matchesHighlights &&
            !matchesTicket &&
            !matchesStage
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return (b.rating || 0) - (a.rating || 0);
        } else if (sortBy === "reviews") {
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        } else if (sortBy === "connections") {
          return (b.connectionsCount || 0) - (a.connectionsCount || 0);
        } else {
          return a.label.localeCompare(b.label);
        }
      });
  }, [
    baseEntities,
    selectedServiceOrStage,
    selectedLocation,
    selectedSubRegion,
    selectedHourlyRate,
    selectedMinBudget,
    selectedTicketSize,
    selectedStageFilter,
    selectedVerification,
    searchQuery,
    sortBy
  ]);

  // Handle comparison toggle
  const toggleComparison = (entity: GraphNode) => {
    setComparisonList((prev) => {
      const exists = prev.some((p) => p.id === entity.id);
      if (exists) {
        return prev.filter((p) => p.id !== entity.id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), entity];
        }
        return [...prev, entity];
      }
    });
  };

  // Handle Intro / RFP submission
  const handleSubmitIntro = () => {
    if (!activeIntroTarget) return;

    const creditCost = 25;
    if (credits < creditCost) {
      alert("Insufficient AI credits. You need 25 credits to request an official RFP or Pitch Introduction.");
      return;
    }

    const deducted = deductCredits(creditCost);
    if (!deducted) {
      alert("Credit deduction failed.");
      return;
    }

    const isTargetInvestor = activeIntroTarget.type === "Investor" || activeIntroTarget.ticketSize !== undefined;

    if (onAddIntroLog) {
      onAddIntroLog({
        id: `intro_${Date.now()}`,
        timestamp: new Date().toISOString(),
        requesterId: "usr_active_founder",
        requesterName: "Founder / Technical Principal",
        requesterRole: "founder",
        targetId: activeIntroTarget.id,
        targetName: activeIntroTarget.label,
        targetRole: isTargetInvestor ? "Investor" : "Startup",
        status: "Warm Intro Sent",
        creditsSpent: creditCost,
        pitchNote: isTargetInvestor
          ? `[Investor Pitch - Round: ${fundingRoundAsk}] ${introPitch || "Direct founder intro and deck review request."}`
          : `[RFP Request - Budget: ${introBudget} | Timeline: ${introTimeline}] ${introPitch || "Direct inquiry regarding technical collaboration."}`
      });
    }

    setIntroStatusMessage(
      isTargetInvestor
        ? `Pitch and deck dossier dispatched to ${activeIntroTarget.label} partners. Response expected in < 24 hrs.`
        : `RFP and specifications dispatched to ${activeIntroTarget.label}. Response expected in < 24 hrs.`
    );

    setTimeout(() => {
      setActiveIntroTarget(null);
      setIntroStatusMessage(null);
      setIntroPitch("");
    }, 2200);
  };

  return (
    <div className="space-y-8 font-mono text-slate-900 selection:bg-[#D7E7D6] selection:text-[#4D7D4B]">
      {/* Top Banner / Marketplace Headline */}
      <div className="bg-gradient-to-br from-[#F6FAF5] via-white to-[#EBF3EA] rounded-2xl border border-[#B0CFAD] p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          {viewMode === "INVESTORS" ? (
            <Landmark className="w-48 h-48 text-[#5A8D58]" />
          ) : (
            <Laptop className="w-48 h-48 text-[#5A8D58]" />
          )}
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EBF3EA] text-[#4D7D4B] border border-[#B0CFAD] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#5A8D58]" />
              <span>
                {viewMode === "INVESTORS"
                  ? "Venture Capital & Angel Investor Directory"
                  : viewMode === "AGENCIES"
                  ? "Verified AI & Software Provider Marketplace"
                  : "Verified Ecosystem Directory: Providers & Capital"}
              </span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white text-slate-700 border border-[#D7E7D6]">
              {baseEntities.length} {viewMode === "INVESTORS" ? "Capital Funds" : viewMode === "AGENCIES" ? "Agencies" : "Entities"} Indexed
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {viewMode === "INVESTORS" ? (
                <>
                  Lebanese & Regional <span className="text-[#5A8D58]">Venture Capital & Investors</span>
                </>
              ) : viewMode === "AGENCIES" ? (
                <>
                  Lebanese & Regional <span className="text-[#5A8D58]">Software & AI Agencies</span>
                </>
              ) : (
                <>
                  Lebanese Tech Ecosystem: <span className="text-[#5A8D58]">Agencies & Venture Capital</span>
                </>
              )}
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed max-w-3xl">
              {viewMode === "INVESTORS"
                ? "Active institutional VC funds, Silicon Valley diaspora angel networks, and matching capital funds backing Lebanese DeepTech & AI founders."
                : viewMode === "AGENCIES"
                ? "Curated, peer-reviewed engineering shops, AI laboratories, and full-stack software providers based in Lebanon or dedicated to serving the Lebanese ecosystem."
                : "Explore verified technical software agencies, AI engineering labs, venture capital funds, and diaspora angel syndicates powering Lebanese tech."}
            </p>
          </div>

          {/* Quick Metrics Strip - Dynamically updates based on viewMode */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/90 p-3 rounded-xl border border-[#D7E7D6] shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">
                {viewMode === "INVESTORS" ? "VCs & Angels" : viewMode === "AGENCIES" ? "Verified Agencies" : "Total Entities"}
              </span>
              <span className="text-lg font-bold text-slate-900">{baseEntities.length} Verified</span>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-[#D7E7D6] shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">
                {viewMode === "INVESTORS" ? "Capital Pool" : "Avg Rating"}
              </span>
              <span className="text-lg font-bold text-amber-600 flex items-center gap-1">
                {viewMode === "INVESTORS" ? (
                  "$300M+ AUM"
                ) : (
                  <>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500 inline" /> 4.8 / 5.0
                  </>
                )}
              </span>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-[#D7E7D6] shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">
                {viewMode === "INVESTORS" ? "Avg Check Size" : "Hourly Rates"}
              </span>
              <span className="text-lg font-bold text-[#5A8D58]">
                {viewMode === "INVESTORS" ? "$50k - $5,000,000" : "$25 - $99/hr"}
              </span>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-[#D7E7D6] shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">
                {viewMode === "INVESTORS" ? "Warm Intro Speed" : "RFP Turnaround"}
              </span>
              <span className="text-lg font-bold text-slate-900">&lt; 24 Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRIMARY TOGGLE: SOFTWARE AGENCIES vs VENTURE CAPITAL FIRMS vs ALL DIRECTORY */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#D7E7D6] rounded-2xl p-2 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#5A8D58]" />
              <span>Directory Mode:</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto bg-[#F6FAF5] p-1.5 rounded-xl border border-[#D7E7D6]">
            {/* Toggle: All */}
            <button
              onClick={() => {
                setViewMode("ALL");
                setSelectedServiceOrStage("ALL");
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === "ALL"
                  ? "bg-[#75AC73] text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-white/70"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({allAgencies.length + allInvestors.length})</span>
            </button>

            {/* Toggle: Software Agencies */}
            <button
              onClick={() => {
                setViewMode("AGENCIES");
                setSelectedServiceOrStage("ALL");
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === "AGENCIES"
                  ? "bg-[#75AC73] text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-white/70"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Agencies ({allAgencies.length})</span>
            </button>

            {/* Toggle: Venture Capital & Investors */}
            <button
              onClick={() => {
                setViewMode("INVESTORS");
                setSelectedServiceOrStage("ALL");
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === "INVESTORS"
                  ? "bg-[#75AC73] text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-white/70"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>VC & Angels ({allInvestors.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service / Mandate Domain Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#5A8D58]" />
            <span>
              {viewMode === "INVESTORS"
                ? "Filter by Investment Stage & Mandate"
                : viewMode === "AGENCIES"
                ? "Filter by Core Engineering Domain"
                : "Filter by Specialization & Focus"}
            </span>
          </label>
          <span className="text-xs text-slate-500 font-normal">
            Showing {filteredEntities.length} of {baseEntities.length} matches
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {currentPills.map((pill) => {
            const Icon = pill.icon;
            const isSelected = selectedServiceOrStage === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedServiceOrStage(pill.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border ${
                  isSelected
                    ? "bg-[#75AC73] text-white border-[#5A8D58] shadow-xs"
                    : "bg-[#FAFCFA] text-slate-700 border-[#D7E7D6] hover:bg-[#EBF3EA] hover:text-slate-900"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#5A8D58]"}`} />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Filter Bar & Search */}
      <div className="bg-[#FAFCFA] border border-[#D7E7D6] rounded-2xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                viewMode === "INVESTORS"
                  ? "Search by VC fund name, ticket size, stage, or thesis..."
                  : viewMode === "AGENCIES"
                  ? "Search by agency name, AI stack, framework, or city..."
                  : "Search by agency, investor, framework, ticket size..."
              }
              className="w-full bg-white border border-[#D7E7D6] rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#75AC73] focus:ring-1 focus:ring-[#75AC73]"
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

          {/* Location Filter */}
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-white border border-[#D7E7D6] rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73] cursor-pointer"
            >
              {locationOptions.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-white border border-[#D7E7D6] rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73] cursor-pointer"
            >
              <option value="rating">Sort: Highest Rating ★</option>
              <option value="reviews">Sort: Most Reviews</option>
              <option value="connections">Sort: Most Ecosystem Links</option>
              <option value="name">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Secondary Filters Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-[#EBF3EA] text-xs">
          {/* Sub-Region */}
          <div>
            <label className="text-[10px] text-slate-500 uppercase block font-bold mb-1">Geographic Sub-Region</label>
            <select
              value={selectedSubRegion}
              onChange={(e) => setSelectedSubRegion(e.target.value)}
              className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
            >
              {subRegions.map((sr) => (
                <option key={sr} value={sr}>
                  {sr === "ALL" ? "All Sub-Regions" : sr}
                </option>
              ))}
            </select>
          </div>

          {/* Contextual Filter 1: Hourly Rate for Agencies OR Ticket Size for Investors */}
          {viewMode === "INVESTORS" ? (
            <div>
              <label className="text-[10px] text-slate-500 uppercase block font-bold mb-1">Ticket Size Bracket</label>
              <select
                value={selectedTicketSize}
                onChange={(e) => setSelectedTicketSize(e.target.value)}
                className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
              >
                {ticketSizeRanges.map((ts) => (
                  <option key={ts} value={ts}>
                    {ts === "ALL" ? "All Ticket Sizes" : ts}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-[10px] text-slate-500 uppercase block font-bold mb-1">Hourly Rate</label>
              <select
                value={selectedHourlyRate}
                onChange={(e) => setSelectedHourlyRate(e.target.value)}
                className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
              >
                {hourlyRateRanges.map((hr) => (
                  <option key={hr} value={hr}>
                    {hr === "ALL" ? "All Hourly Rates" : hr}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Contextual Filter 2: Min Budget for Agencies OR Stage for Investors */}
          {viewMode === "INVESTORS" ? (
            <div>
              <label className="text-[10px] text-slate-500 uppercase block font-bold mb-1">Target Stage</label>
              <select
                value={selectedStageFilter}
                onChange={(e) => setSelectedStageFilter(e.target.value)}
                className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
              >
                {stageFilterOptions.map((st) => (
                  <option key={st} value={st}>
                    {st === "ALL" ? "All Stages" : st}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-[10px] text-slate-500 uppercase block font-bold mb-1">Min Project Size</label>
              <select
                value={selectedMinBudget}
                onChange={(e) => setSelectedMinBudget(e.target.value)}
                className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
              >
                {minBudgetRanges.map((mb) => (
                  <option key={mb} value={mb}>
                    {mb === "ALL" ? "All Min Budgets" : mb}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Verification Tier */}
          <div>
            <label className="text-[10px] text-slate-500 uppercase block font-bold mb-1">Verification Tier</label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value as any)}
              className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
            >
              <option value="ALL">All Entities</option>
              <option value="premier">Premier Verified Only</option>
              <option value="verified">Verified Only</option>
            </select>
          </div>
        </div>

        {/* Clear Filters helper */}
        {(selectedServiceOrStage !== "ALL" ||
          selectedLocation !== "ALL" ||
          selectedSubRegion !== "ALL" ||
          selectedHourlyRate !== "ALL" ||
          selectedMinBudget !== "ALL" ||
          selectedTicketSize !== "ALL" ||
          selectedStageFilter !== "ALL" ||
          selectedVerification !== "ALL" ||
          searchQuery) && (
          <div className="flex items-center justify-between text-xs pt-1 text-slate-600">
            <span>Filters active</span>
            <button
              onClick={() => {
                setSelectedServiceOrStage("ALL");
                setSelectedLocation("ALL");
                setSelectedSubRegion("ALL");
                setSelectedHourlyRate("ALL");
                setSelectedMinBudget("ALL");
                setSelectedTicketSize("ALL");
                setSelectedStageFilter("ALL");
                setSelectedVerification("ALL");
                setSearchQuery("");
              }}
              className="text-[#5A8D58] hover:text-[#4D7D4B] font-bold underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Entity Cards Grid */}
      {filteredEntities.length === 0 ? (
        <div className="text-center py-16 bg-[#FAFCFA] rounded-2xl border border-dashed border-[#B0CFAD] space-y-3">
          {viewMode === "INVESTORS" ? (
            <Landmark className="w-12 h-12 text-[#9DC39A] mx-auto" />
          ) : (
            <Laptop className="w-12 h-12 text-[#9DC39A] mx-auto" />
          )}
          <h3 className="text-lg font-bold text-slate-900">No Matches Found</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Try adjusting your search criteria, stage preferences, or location filter.
          </p>
          <button
            onClick={() => {
              setSelectedServiceOrStage("ALL");
              setSelectedLocation("ALL");
              setSelectedSubRegion("ALL");
              setSelectedHourlyRate("ALL");
              setSelectedMinBudget("ALL");
              setSelectedTicketSize("ALL");
              setSelectedStageFilter("ALL");
              setSelectedVerification("ALL");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-[#75AC73] text-white text-xs font-bold shadow-xs hover:bg-[#5A8D58]"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEntities.map((entity) => {
            const isShortlisted = comparisonList.some((p) => p.id === entity.id);
            const isInvestor = entity.type === "Investor" || entity.id.startsWith("inv_") || entity.ticketSize !== undefined;

            return (
              <div
                key={entity.id}
                className={`bg-white rounded-2xl border ${
                  isInvestor ? "border-amber-200 hover:border-amber-400" : "border-[#D7E7D6] hover:border-[#75AC73]"
                } shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between space-y-4 relative group`}
              >
                {/* Top Row: Badges & Rating/Ticket */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Entity Type Badge */}
                      {isInvestor ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-amber-700" />
                          <span>VC & Angel Syndicate</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <Laptop className="w-3 h-3 text-emerald-600" />
                          <span>Agency / AI Lab</span>
                        </span>
                      )}

                      {/* Premier Verified Badge */}
                      {entity.premierVerified && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>Premier Verified</span>
                        </span>
                      )}

                      {!entity.premierVerified && entity.verified && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3EA] text-[#4D7D4B] border border-[#B0CFAD]">
                          <ShieldCheck className="w-3 h-3 text-[#5A8D58]" />
                          <span>Verified</span>
                        </span>
                      )}

                      {/* Location Reach Badge */}
                      {entity.servesLebanon || entity.location?.toLowerCase().includes("serves lebanon") ? (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span>🇱🇧 Serves Lebanon</span>
                        </span>
                      ) : entity.isDiaspora ? (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <Globe className="w-3 h-3" />
                          <span>Diaspora Reach</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          <span>🇱🇧 Onshore Node</span>
                        </span>
                      )}
                    </div>

                    {/* Rating Pill for Agencies OR Ticket Size Pill for Investors */}
                    {isInvestor ? (
                      entity.ticketSize && (
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-xl text-amber-900 font-bold text-xs shadow-2xs">
                          <Wallet className="w-3.5 h-3.5 text-amber-700" />
                          <span>{entity.ticketSize}</span>
                        </div>
                      )
                    ) : entity.rating !== undefined ? (
                      <div className="flex items-center gap-1 bg-[#F6FAF5] border border-[#B0CFAD] px-2.5 py-1 rounded-xl text-slate-900 font-bold text-xs shadow-2xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{entity.rating.toFixed(1)}</span>
                        {entity.reviewCount !== undefined && (
                          <span className="text-[10px] text-slate-500 font-normal">({entity.reviewCount})</span>
                        )}
                      </div>
                    ) : null}
                  </div>

                  {/* Header: Label & Title */}
                  <div>
                    <h3
                      onClick={() => onSelectNode(entity)}
                      className="text-base font-bold text-slate-900 group-hover:text-[#5A8D58] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{entity.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#5A8D58] transition-transform group-hover:translate-x-0.5" />
                    </h3>
                    {entity.title && (
                      <p className="text-xs font-medium text-slate-600 mt-0.5 line-clamp-1">
                        {entity.title}
                      </p>
                    )}
                  </div>

                  {/* Location & Links */}
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {entity.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#5A8D58]" />
                        <span>{entity.location}</span>
                      </span>
                    )}
                    {entity.connectionsCount !== undefined && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                        <span>{entity.connectionsCount} ecosystem links</span>
                      </span>
                    )}
                  </div>

                  {/* Key Metrics Bar - Specialized for Investor vs Agency */}
                  {isInvestor ? (
                    <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-amber-50/50 rounded-xl border border-amber-200 text-[11px]">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Ticket Range</span>
                        <span className="font-bold text-slate-800">{entity.ticketSize || "$100k - $500k"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Stage Focus</span>
                        <span className="font-bold text-slate-800">{entity.stage || "Seed / Pre-Seed"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Network Scope</span>
                        <span className="font-bold text-slate-800">{entity.isDiaspora ? "Global Diaspora" : "MENA Onshore"}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-[#F6FAF5] rounded-xl border border-[#D7E7D6] text-[11px]">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Min Project</span>
                        <span className="font-bold text-slate-800">{entity.minProjectSize || "$1,000+"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Hourly Rate</span>
                        <span className="font-bold text-slate-800">{entity.hourlyRate || "Undisclosed"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">Team Size</span>
                        <span className="font-bold text-slate-800">{entity.teamSize || "50 - 249"}</span>
                      </div>
                    </div>
                  )}

                  {/* Bio / Description */}
                  {entity.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {entity.bio}
                    </p>
                  )}

                  {/* Services Breakdown Progress (For Agencies) */}
                  {!isInvestor && entity.servicesBreakdown && entity.servicesBreakdown.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span className="font-bold text-slate-700">Services Breakdown</span>
                        <span>
                          {entity.servicesBreakdown[0]?.percentage}% {entity.servicesBreakdown[0]?.name}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {entity.servicesBreakdown.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#EBF3EA] text-[#345932] border border-[#B0CFAD] text-[10px] font-semibold"
                          >
                            {s.percentage}% {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verified Highlights / Badges */}
                  {entity.highlights && entity.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {entity.highlights.map((hl, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-medium"
                        >
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Karpathy [[Wikilinks]] Tags */}
                  {entity.tags && entity.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {entity.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-[#FAFCFA] text-slate-700 border border-[#D7E7D6] text-[10px] font-mono hover:border-[#61A061] hover:text-[#157D28] transition-colors"
                        >
                          [[{tag}]]
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action Controls */}
                <div className="pt-3 border-t border-[#EBF3EA] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => toggleComparison(entity)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1 ${
                        isShortlisted
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : "bg-white text-slate-700 border-[#D7E7D6] hover:bg-[#F6FAF5]"
                      }`}
                      title={isInvestor ? "Compare investor tickets & terms" : "Compare side-by-side with other providers"}
                    >
                      {isShortlisted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>Shortlisted</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-slate-500" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectNode(entity)}
                      className="px-2.5 py-1.5 rounded-xl bg-white border border-[#D7E7D6] hover:bg-[#F6FAF5] text-slate-700 text-xs font-medium transition-colors"
                    >
                      Dossier
                    </button>

                    {/* View LinkedIn Profile Button */}
                    <a
                      href={getLinkedInUrl(entity)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1.5 rounded-xl bg-white border border-[#D7E7D6] hover:border-[#0A66C2] hover:bg-[#F0F7FF] text-[#0A66C2] hover:text-[#004182] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs group/lnk"
                      title={`View ${entity.label}'s LinkedIn profile`}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] group-hover/lnk:scale-110 transition-transform" />
                      <span>View LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-[#0A66C2]/60 group-hover/lnk:text-[#0A66C2]" />
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveIntroTarget(entity)}
                    className={`px-3.5 py-1.5 rounded-xl text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all shrink-0 ${
                      isInvestor ? "bg-amber-700 hover:bg-amber-800" : "bg-[#75AC73] hover:bg-[#5A8D58]"
                    }`}
                  >
                    <Send className="w-3 h-3" />
                    <span>{isInvestor ? "Pitch & Request Intro" : "Request Intro / RFP"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Comparison Bar (when 1 or more entities shortlisted) */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md border border-[#75AC73] shadow-lg rounded-2xl px-5 py-3.5 flex items-center gap-4 max-w-xl w-[92%] font-mono text-xs">
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="font-bold text-[#5A8D58] shrink-0">Compare ({comparisonList.length}/3):</span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {comparisonList.map((cp) => (
                <span
                  key={cp.id}
                  className="px-2 py-1 rounded-lg bg-[#EBF3EA] text-[#4D7D4B] border border-[#B0CFAD] text-[11px] font-semibold whitespace-nowrap flex items-center gap-1"
                >
                  <span>{cp.label}</span>
                  <button onClick={() => toggleComparison(cp)} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#75AC73] hover:bg-[#5A8D58] text-white font-bold text-xs shadow-xs transition-colors"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setComparisonList([])}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              title="Clear shortlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#B0CFAD] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-xl font-mono">
            <div className="flex items-center justify-between border-b border-[#D7E7D6] pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#5A8D58]" />
                  <span>Side-by-Side Comparison Matrix</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Comparing verified metrics, check sizes, hourly rates, and track records.
                </p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-[#F6FAF5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonList.map((entity) => {
                const isInvestor = entity.type === "Investor" || entity.id.startsWith("inv_") || entity.ticketSize !== undefined;

                return (
                  <div key={entity.id} className="bg-[#FAFCFA] border border-[#D7E7D6] rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{entity.label}</h4>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {isInvestor ? "Venture Capital / Investor" : "Software / AI Agency"}
                        </span>
                      </div>
                      {entity.rating && (
                        <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {entity.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{entity.title}</p>

                    <div className="space-y-1 text-xs border-t border-b border-[#EBF3EA] py-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Location:</span>
                        <span className="font-semibold text-slate-800">{entity.location}</span>
                      </div>
                      {isInvestor ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Ticket Size:</span>
                            <span className="font-semibold text-amber-800">{entity.ticketSize || "$100k - $500k"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Target Stage:</span>
                            <span className="font-semibold text-slate-800">{entity.stage || "Pre-Seed / Seed"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Connections:</span>
                            <span className="font-semibold text-slate-800">{entity.connectionsCount || 20} links</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Hourly Rate:</span>
                            <span className="font-semibold text-slate-800">{entity.hourlyRate || "Undisclosed"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Min Project:</span>
                            <span className="font-semibold text-slate-800">{entity.minProjectSize || "$1k+"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Team Size:</span>
                            <span className="font-semibold text-slate-800">{entity.teamSize || "N/A"}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {!isInvestor && entity.servicesBreakdown && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Services</span>
                        <div className="flex flex-wrap gap-1">
                          {entity.servicesBreakdown.map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-[#EBF3EA] text-[#4D7D4B] rounded text-[10px]">
                              {s.percentage}% {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {isInvestor && entity.tags && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Thesis Focus</span>
                        <div className="flex flex-wrap gap-1">
                          {entity.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <a
                        href={getLinkedInUrl(entity)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2 rounded-lg bg-white border border-[#D7E7D6] hover:border-[#0A66C2] text-[#0A66C2] hover:bg-[#F0F7FF] font-semibold text-[11px] flex items-center justify-center gap-1 transition-all"
                        title={`View ${entity.label} on LinkedIn`}
                      >
                        <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                        <span>LinkedIn</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                      <button
                        onClick={() => {
                          setShowComparisonModal(false);
                          setActiveIntroTarget(entity);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-white font-bold text-xs ${
                          isInvestor ? "bg-amber-700 hover:bg-amber-800" : "bg-[#75AC73] hover:bg-[#5A8D58]"
                        }`}
                      >
                        {isInvestor ? "Pitch" : "Request RFP"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* RFP / Pitch Introduction Request Modal */}
      {activeIntroTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#B0CFAD] max-w-lg w-full p-6 space-y-5 shadow-xl font-mono">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#D7E7D6] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A8D58]">
                  {activeIntroTarget.type === "Investor" || activeIntroTarget.ticketSize !== undefined
                    ? "Direct Pitch & Warm Intro Dispatch"
                    : "Direct Introduction & RFP Dispatch"}
                </span>
                <h3 className="text-lg font-bold text-slate-900">Connect with {activeIntroTarget.label}</h3>
              </div>
              <button onClick={() => setActiveIntroTarget(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {introStatusMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{introStatusMessage}</span>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {activeIntroTarget.type === "Investor" || activeIntroTarget.ticketSize !== undefined
                      ? "Target Investor Profile"
                      : "Target Agency Profile"}
                  </label>
                  <div className="p-3 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl space-y-1">
                    <div className="flex justify-between font-semibold text-slate-900">
                      <span>{activeIntroTarget.label}</span>
                      <span className="text-[#5A8D58]">
                        {activeIntroTarget.ticketSize || activeIntroTarget.hourlyRate || "$25 - $49 / hr"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{activeIntroTarget.title}</p>
                  </div>
                </div>

                {activeIntroTarget.type === "Investor" || activeIntroTarget.ticketSize !== undefined ? (
                  /* Investor-Specific Pitch Inputs */
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Funding Round Target</label>
                        <select
                          value={fundingRoundAsk}
                          onChange={(e) => setFundingRoundAsk(e.target.value)}
                          className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
                        >
                          <option>Pre-Seed ($100k - $400k)</option>
                          <option>Seed ($500k - $1.2M)</option>
                          <option>Series A ($2.5M - $5M)</option>
                          <option>Bridge / Growth</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Target Check Size</label>
                        <input
                          type="text"
                          defaultValue={activeIntroTarget.ticketSize?.split("-")[0]?.trim() || "$250,000"}
                          placeholder="$250,000 ask"
                          className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Founder Elevator Pitch & Traction</label>
                      <textarea
                        rows={3}
                        value={introPitch}
                        onChange={(e) => setIntroPitch(e.target.value)}
                        placeholder="Highlight your current MRR, technical defensibility, target domain, and why this partner's thesis fits..."
                        className="w-full bg-white border border-[#D7E7D6] rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#75AC73]"
                      />
                    </div>
                  </div>
                ) : (
                  /* Agency-Specific RFP Inputs */
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Estimated Budget</label>
                        <select
                          value={introBudget}
                          onChange={(e) => setIntroBudget(e.target.value)}
                          className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
                        >
                          <option>$1,000 - $5,000</option>
                          <option>$5,000 - $25,000</option>
                          <option>$25,000 - $50,000</option>
                          <option>$50,000 - $100,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Target Timeline</label>
                        <select
                          value={introTimeline}
                          onChange={(e) => setIntroTimeline(e.target.value)}
                          className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#75AC73]"
                        >
                          <option>&lt; 1 Month (Urgent)</option>
                          <option>1 - 3 Months</option>
                          <option>3 - 6 Months</option>
                          <option>Ongoing / Retainer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Project Summary / Scope Note</label>
                      <textarea
                        rows={3}
                        value={introPitch}
                        onChange={(e) => setIntroPitch(e.target.value)}
                        placeholder="Briefly describe your project requirements, target AI stack, and expected deliverables..."
                        className="w-full bg-white border border-[#D7E7D6] rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#75AC73]"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#EBF3EA]">
                  <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
                    <span>Cost:</span>
                    <strong className="text-[#5A8D58]">25 AI Credits</strong>
                    <span>(Balance: {credits})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveIntroTarget(null)}
                      className="px-3 py-1.5 rounded-xl border border-[#D7E7D6] text-slate-700 hover:bg-[#F6FAF5] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitIntro}
                      className="px-4 py-1.5 rounded-xl bg-[#75AC73] hover:bg-[#5A8D58] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>
                        {activeIntroTarget.type === "Investor" || activeIntroTarget.ticketSize !== undefined
                          ? "Send Pitch Request"
                          : "Send RFP Request"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
