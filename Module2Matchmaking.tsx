import React, { useState, useRef, useEffect } from "react";
import { UserRole, UserAuthSession } from "../types";
import { 
  Network, 
  GitMerge, 
  BookOpen, 
  Smartphone, 
  Activity, 
  Coins, 
  ShieldCheck, 
  Layers,
  Sparkles,
  Newspaper,
  Laptop,
  Scale,
  Landmark,
  BarChart3,
  Home,
  Crown,
  Lock,
  LogOut,
  Clock,
  Info,
  Trophy,
  FileText,
  Brain,
  UserPlus,
  Lightbulb,
  Building2,
  ChevronDown,
  LayoutGrid,
  TrendingUp,
  Database,
  PlusCircle,
  HelpCircle,
  LucideIcon
} from "lucide-react";

interface NavbarProps {
  activeModule: number;
  setActiveModule: (mod: number) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  credits: number;
  currency: "USD" | "USDT" | "LBP";
  setCurrency: (c: "USD" | "USDT" | "LBP") => void;
  nodesCount: number;
  edgesCount: number;
  healthScore: number;
  onOpenCommandPalette?: () => void;
  onOpenTaxCalculator?: () => void;
  onNavigateToAdmin?: () => void;
  user?: UserAuthSession | null;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
}

interface NavItem {
  id: string;
  moduleId: number;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  badge?: string;
  badgeClass?: string;
}

interface NavGroup {
  id: string;
  title: string;
  shortLabel: string;
  icon: LucideIcon;
  badge?: string;
  headerColorClass: string;
  items: NavItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeModule,
  setActiveModule,
  userRole,
  setUserRole,
  credits,
  currency,
  setCurrency,
  nodesCount,
  edgesCount,
  healthScore,
  onOpenCommandPalette,
  onOpenTaxCalculator,
  onNavigateToAdmin,
  user,
  onOpenAuthModal,
  onLogout
}) => {
  // Dropdown open states
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dropdown Menus Configuration
  const navGroups: NavGroup[] = [
    {
      id: "directory_ecosystem",
      title: "Directory & Ecosystem",
      shortLabel: "Directory",
      icon: Layers,
      badge: "58+",
      headerColorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
      items: [
        {
          id: "m1_yellow_pages",
          moduleId: 1,
          label: "Yellow Pages Directory",
          subtitle: "58+ Verified Lebanon & Diaspora AI Stakeholders Indexed",
          icon: Layers,
          badge: "Indexed",
          badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        },
        {
          id: "m11_dashboard",
          moduleId: 11,
          label: "Ecosystem Dashboard",
          subtitle: "Macro Deal Flow, Tech Stack Telemetry & Venture Analytics",
          icon: BarChart3,
          badge: "Live Telemetry",
          badgeClass: "bg-blue-100 text-blue-800 border border-blue-200",
        },
        {
          id: "m18_graph",
          moduleId: 18,
          label: "D3 Interactive Ecosystem Graph",
          subtitle: "Lebanon Onshore ↔ Diaspora Bridge ↔ Regional VCs Tech Map",
          icon: Network,
          badge: "Interactive",
          badgeClass: "bg-purple-100 text-purple-800 border border-purple-200",
        },
        {
          id: "m9_marketplace",
          moduleId: 9,
          label: "Provider Marketplace & Agencies",
          subtitle: "Verified Software Agencies, AI Engineers & Integrators",
          icon: Laptop,
          badge: "Verified",
          badgeClass: "bg-slate-100 text-slate-700 border border-slate-200",
        },
        {
          id: "m14_quests",
          moduleId: 14,
          label: "Quests, Bounties & Rewards",
          subtitle: "Gamified Ecosystem Bounties, XP & Service Subsidies",
          icon: Trophy,
          badge: "Earn XP",
          badgeClass: "bg-amber-100 text-amber-800 border border-amber-200",
        },
      ],
    },
    {
      id: "intelligence_copilot",
      title: "AI Intelligence & Copilot",
      shortLabel: "Intelligence",
      icon: Brain,
      badge: "AI",
      headerColorClass: "text-amber-800 bg-amber-50 border-amber-200",
      items: [
        {
          id: "m17_second_brain",
          moduleId: 17,
          label: "🧠 Second Brain (NotebookLLM)",
          subtitle: "Personal AI Copilot, Document Repository & Multi-Doc Synthesis",
          icon: Brain,
          badge: "AUTO-UNLOCKED",
          badgeClass: "bg-emerald-600 text-white font-bold",
        },
        {
          id: "m5_matchmaking",
          moduleId: 5,
          label: "Two-Way Matchmaking & AI Memo",
          subtitle: "Institutional Briefs, VC Deal Flow & AI Due Diligence Memos",
          icon: GitMerge,
          badge: "VC Scoring",
          badgeClass: "bg-amber-100 text-amber-800 border border-amber-200",
        },
        {
          id: "m15_pitch_room",
          moduleId: 15,
          label: "Diaspora Pitch Room Syndicate",
          subtitle: "Automated Pitch Deck & Code Audit, Readiness Score & SPVs",
          icon: Sparkles,
          badge: "SPVs",
          badgeClass: "bg-purple-100 text-purple-800 border border-purple-200",
        },
        {
          id: "m19_ideas",
          moduleId: 19,
          label: "IdeasLab & Got an Idea?",
          subtitle: "AI World Case Studies & Ecosystem Feedback Platform",
          icon: Lightbulb,
          badge: "New",
          badgeClass: "bg-rose-100 text-rose-700 border border-rose-200",
        },
        {
          id: "m7_edgebot",
          moduleId: 7,
          label: "WhatsApp & EdgeBot Console",
          subtitle: "Low-Bandwidth 3G/4G Mobile AI Bot & Direct SMS/WhatsApp Alerts",
          icon: Smartphone,
          badge: "Mobile 3G",
          badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        },
      ],
    },
    {
      id: "news_research",
      title: "News & Investment Research",
      shortLabel: "News & Wire",
      icon: Newspaper,
      badge: "Wire",
      headerColorClass: "text-rose-800 bg-rose-50 border-rose-200",
      items: [
        {
          id: "m24_research",
          moduleId: 24,
          label: "Intelligence Research & PDF Publications",
          subtitle: "Official z961AI Network Intelligence Service Reports & Direct PDFs",
          icon: FileText,
          badge: "PDFs",
          badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        },
        {
          id: "m22_agenda",
          moduleId: 22,
          label: "News from the Community (On (Y)Our Agenda)",
          subtitle: "Direct reporting on venture deals, AI models & university research",
          icon: Newspaper,
          badge: "Latest",
          badgeClass: "bg-rose-100 text-rose-700 border border-rose-200",
        },
        {
          id: "m23_submit_news",
          moduleId: 23,
          label: "Submit News Story for Free",
          subtitle: "100% Free ecosystem announcements, hiring & product launches",
          icon: PlusCircle,
          badge: "100% Free",
          badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        },
        {
          id: "m8_news_repo",
          moduleId: 8,
          label: "961AINews & Knowledge Repository",
          subtitle: "Curated Lebanon & MENA AI News, PDF Toolkits & Research Papers",
          icon: BookOpen,
          badge: "Archive",
          badgeClass: "bg-slate-100 text-slate-700 border border-slate-200",
        },
        {
          id: "m16_reports",
          moduleId: 16,
          label: "Investment Reports & Research",
          subtitle: "Lebanon PE/VC Landscape 2026 & Macro Economics Briefs",
          icon: FileText,
          badge: "PDF Reports",
          badgeClass: "bg-blue-100 text-blue-800 border border-blue-200",
        },
      ],
    },
    {
      id: "public_sector",
      title: "Public Sector Initiatives",
      shortLabel: "Public Sector",
      icon: Landmark,
      badge: "Gov",
      headerColorClass: "text-emerald-900 bg-emerald-50 border-emerald-300",
      items: [
        {
          id: "m20_mita",
          moduleId: 20,
          label: "MITA Initiatives (mitai.gov.lb)",
          subtitle: "National AI & Tech Transformation Strategy & Taskforces",
          icon: Landmark,
          badge: "National AI",
          badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        },
        {
          id: "m21_omsar",
          moduleId: 21,
          label: "OMSAR Projects (omsar.gov.lb)",
          subtitle: "Reinventing Government 2030, BIND-Leb Behavioral Lab & Open Data",
          icon: Building2,
          badge: "Gov 2030",
          badgeClass: "bg-blue-100 text-blue-800 border border-blue-200",
        },
        {
          id: "m10_legal",
          moduleId: 10,
          label: "Sovereign Legal Framework & Sandbox",
          subtitle: "Lebanon Regulatory Sandbox, AI Compliance & Sovereign Data Laws",
          icon: Scale,
          badge: "Compliance",
          badgeClass: "bg-slate-100 text-slate-700 border border-slate-200",
        },
      ],
    },
    {
      id: "tools_specs",
      title: "Tools & Specifications",
      shortLabel: "Platform Tools",
      icon: LayoutGrid,
      headerColorClass: "text-slate-800 bg-slate-50 border-slate-200",
      items: [
        {
          id: "m2_workspace",
          moduleId: 2,
          label: "Join / Submit Entity Workspace",
          subtitle: "Onboarding Questionnaire, Verified Badge & Referral Program",
          icon: Sparkles,
          badge: "Submit",
          badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        },
        {
          id: "m13_about",
          moduleId: 13,
          label: "About Us & Architecture Specs",
          subtitle: "Mission, Full Tech Specs & Services Matrix",
          icon: Info,
        },
        {
          id: "m3_karpathy",
          moduleId: 3,
          label: "Karpathy Wiki Ingestion Engine",
          subtitle: "L1/L2 Technical Ingestion & Enriched Guru Extractor",
          icon: BookOpen,
        },
        {
          id: "m6_postgres",
          moduleId: 6,
          label: "Postgres & Neo4j Architecture",
          subtitle: "Database Schemas, Graph Topology & Relational Models",
          icon: Database,
        },
      ],
    },
  ];

  const toggleDropdown = (groupId: string) => {
    setOpenDropdownId((prev) => (prev === groupId ? null : groupId));
  };

  const handleSelectItem = (modId: number) => {
    setActiveModule(modId);
    setOpenDropdownId(null);
  };

  return (
    <header className="relative z-40 bg-white border-b-2 border-[#D7E7D6] text-slate-900 shadow-xs font-mono">
      {/* Top Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between border-b border-[#EBF3EA] text-xs text-[#000000] gap-2 font-mono bg-[#FAFCFA]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="font-mono text-black font-bold tracking-wide">961AINETWORK ENGINE v2.5</span>
          </div>
          <span className="hidden md:inline text-slate-300">|</span>
          <div className="hidden md:flex items-center gap-3">
            <span>Graph Nodes: <strong className="text-slate-900 font-mono">{nodesCount}</strong></span>
            <span>Edges: <strong className="text-slate-900 font-mono">{edgesCount}</strong></span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-black" />
              Health: <strong className="text-black font-mono">{healthScore}%</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Global Search Cmd+K Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg bg-white hover:bg-[#EBF3EA] border border-[#D7E7D6] text-slate-700 hover:text-slate-900 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
            >
              <span className="text-[#4D7D4B]">🔍</span>
              <span>Search...</span>
              <kbd className="px-1.5 py-0.2 bg-slate-100 text-[10px] font-bold text-slate-500 rounded border border-slate-300">
                ⌘K
              </kbd>
            </button>
          )}

          {/* 0% Tax Calculator Quick Engine */}
          {onOpenTaxCalculator && (
            <button
              onClick={onOpenTaxCalculator}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EBF3EA] hover:bg-[#D7E7D6] text-[#2E5A2C] border border-[#B0CFAD] text-xs font-bold transition-colors cursor-pointer"
            >
              <span>🇱🇧</span>
              <span>0% Tax Engine</span>
            </button>
          )}

          {/* Credits Balance */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EBF3EA] border border-[#B0CFAD] text-[#4D7D4B] font-mono font-semibold text-[11px]">
            <Coins className="w-3 h-3 text-[#5A8D58]" />
            <span>{credits.toLocaleString()} Credits</span>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center bg-[#FAFCFA] border border-[#FDE68A] rounded-lg p-0.5 text-[11px]">
            {(["USD", "USDT", "LBP"] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-0.5 rounded transition-colors font-semibold cursor-pointer ${
                  currency === curr
                    ? "bg-black text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Persona / Role Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-[#FAFCFA] border border-[#FDE68A] rounded-lg px-2 py-0.5 text-xs text-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B45309]" />
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer font-medium text-[11px]"
            >
              <option value="founder" className="bg-white text-slate-900">Founder</option>
              <option value="investor" className="bg-white text-slate-900">VC / Investor</option>
              <option value="guru" className="bg-white text-slate-900">AI Guru</option>
              <option value="superadmin" className="bg-white text-slate-900">SuperAdmin</option>
            </select>
          </div>

          {/* Auth Button or User Profile */}
          {user ? (
            <div className="flex items-center gap-1.5 bg-[#FFFBEA] border border-[#FDE68A] rounded-lg px-2 py-0.5 text-xs text-[#B45309]">
              {user.isPremium ? (
                <Crown className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-[#B45309]" />
              )}
              <span className="font-bold max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="text-slate-400 hover:text-rose-600 ml-1 p-0.5 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuthModal}
                className="px-2.5 py-1 rounded-lg bg-black hover:bg-neutral-800 text-white text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                title="Sign up free to access platform and join community mailing list"
              >
                <UserPlus className="w-3.5 h-3.5 text-white" />
                <span className="text-white">Sign Up Free</span>
              </button>
            </div>
          )}

          {/* Password Protected Admin Button */}
          {onNavigateToAdmin && (
            <button
              onClick={onNavigateToAdmin}
              title="Protected Admin Root Console"
              style={{ color: "#ffffff" }}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-rose-500 text-[11px] font-mono font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3 text-rose-400" />
              <span style={{ color: "#ffffff" }} className="!text-white font-bold">Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveModule(0)}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          title="Return to Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFB800] via-[#F59E0B] to-[#D97706] flex items-center justify-center shadow-sm border border-[#FDE68A] group-hover:scale-105 transition-transform">
            <span className="text-xl font-bold">🌲</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-tight text-slate-900 text-base sm:text-lg">
                961<span className="text-[#2E5A2C]">AI</span>
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                NETWORK
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:block">
              Sovereign Knowledge & Intelligence
            </span>
          </div>
        </div>

        {/* Dropdown-Centric Top Navigation Bar */}
        <nav ref={dropdownRef} className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {/* Direct Home Button */}
          <button
            onClick={() => setActiveModule(0)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeModule === 0
                ? "bg-black text-white shadow-xs border border-black"
                : "bg-[#FAFCFA] text-slate-700 hover:bg-[#FFFBEA] hover:text-slate-950 border border-[#D7E7D6]"
            }`}
            title="Return to Home Dashboard"
          >
            <Home className={`w-3.5 h-3.5 ${activeModule === 0 ? "text-white" : "text-slate-600"}`} />
            <span>Home</span>
          </button>

          {/* Direct Research Button */}
          <button
            onClick={() => setActiveModule(24)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeModule === 24
                ? "bg-black text-white shadow-xs border border-black"
                : "bg-[#FAFCFA] text-slate-700 hover:bg-[#FFFBEA] hover:text-slate-950 border border-[#D7E7D6]"
            }`}
            title="Official Published Research Papers & Direct PDFs"
          >
            <FileText className={`w-3.5 h-3.5 ${activeModule === 24 ? "text-white" : "text-[#2E5A2C]"}`} />
            <span>Research</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
              PDFs
            </span>
          </button>

          {/* Grouped Dropdown Menus */}
          {navGroups.map((group) => {
            const GroupIcon = group.icon;
            const isGroupActive = group.items.some((item) => item.moduleId === activeModule);
            const isOpen = openDropdownId === group.id;

            return (
              <div key={group.id} className="relative shrink-0">
                <button
                  onClick={() => toggleDropdown(group.id)}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isGroupActive
                      ? "bg-black text-white shadow-xs border border-black font-bold"
                      : isOpen
                      ? "bg-slate-100 text-slate-900 border border-slate-300 font-bold"
                      : "bg-[#FAFCFA] text-slate-700 hover:bg-[#EBF3EA] hover:text-slate-950 border border-[#D7E7D6]"
                  }`}
                  title={`${group.title} Dropdown Menu`}
                >
                  <GroupIcon className={`w-3.5 h-3.5 ${isGroupActive ? "text-white" : "text-[#4D7D4B]"}`} />
                  <span className={isGroupActive ? "text-white" : ""}>
                    {group.shortLabel}
                  </span>
                  {group.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] font-bold uppercase rounded ${
                      isGroupActive 
                        ? "bg-neutral-800 text-white border border-neutral-700" 
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}>
                      {group.badge}
                    </span>
                  )}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isGroupActive ? "text-white" : "text-slate-400"}`} />
                </button>

                {/* Dropdown Content */}
                {isOpen && (
                  <div className="absolute left-0 mt-1.5 w-76 sm:w-88 rounded-xl bg-white border border-[#D7E7D6] shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 font-sans max-h-[80vh] overflow-y-auto">
                    <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-slate-700">{group.title}</span>
                      <span className="text-[9px] font-mono text-slate-500">{group.items.length} Options</span>
                    </div>

                    <div className="mt-1 space-y-0.5">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isItemActive = activeModule === item.moduleId;

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectItem(item.moduleId)}
                            className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer group ${
                              isItemActive
                                ? "bg-[#EBF3EA] text-[#1E3E1D] font-bold border border-[#B0CFAD]"
                                : "hover:bg-slate-50 text-slate-800 border border-transparent"
                            }`}
                          >
                            <div className={`p-1.5 rounded-md mt-0.5 shrink-0 ${
                              isItemActive
                                ? "bg-[#4D7D4B] text-white"
                                : "bg-slate-100 text-slate-600 group-hover:bg-[#EBF3EA] group-hover:text-[#2E5A2C]"
                            }`}>
                              <ItemIcon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-semibold group-hover:text-[#1E3E1D] truncate">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 font-bold uppercase ${item.badgeClass}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 group-hover:text-slate-700">
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Pricing Highlight Pill Button */}
          <button
            onClick={() => setActiveModule(12)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeModule === 12
                ? "bg-black text-white shadow-xs border border-black"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 shadow-2xs"
            }`}
            title="View Pro Subscription & Pricing Plans"
          >
            <Crown className={`w-3.5 h-3.5 ${activeModule === 12 ? "text-white" : "text-amber-600"}`} />
            <span>Pricing</span>
            <span className={`px-1.5 py-0.2 text-[9px] font-bold uppercase rounded ${activeModule === 12 ? "bg-amber-800 text-white" : "bg-amber-200 text-amber-900 border border-amber-400"}`}>
              $100/yr
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
