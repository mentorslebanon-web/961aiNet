import React, { useState, useEffect } from "react";
import { 
  UserRole, 
  GraphNode, 
  WikiDocument, 
  UserPersonalWorkspace, 
  IntroductionRequestLog, 
  StartupNewsArticle, 
  KnowledgeResource,
  UserAuthSession
} from "./types";
import { 
  INITIAL_GRAPH_NODES, 
  INITIAL_GRAPH_EDGES, 
  INITIAL_WIKI_DOCUMENTS, 
  INITIAL_MATCH_RESULTS, 
  POSTGRES_SCHEMAS, 
  SEEDING_PARTNERS, 
  SUBSCRIPTION_TIERS,
  INITIAL_STARTUP_NEWS,
  INITIAL_KNOWLEDGE_RESOURCES
} from "./data/initialData";
import { Navbar } from "./components/Navbar";
import { EntityDetailPage } from "./components/pages/EntityDetailPage";
import { AdminPage } from "./components/pages/AdminPage";
import { ModuleEcosystemDashboard } from "./components/modules/ModuleEcosystemDashboard";
import { ModuleHomePage } from "./components/modules/ModuleHomePage";
import { ModuleYellowPagesDirectory } from "./components/modules/ModuleYellowPagesDirectory";
import { ModuleLebanonSandbox } from "./components/modules/ModuleLebanonSandbox";
import { ModuleProviderMarketplace } from "./components/modules/ModuleProviderMarketplace";
import { Module961AiNews } from "./components/modules/Module961AiNews";
import { ModuleQuestionnaireWorkspace } from "./components/modules/ModuleQuestionnaireWorkspace";
import { Module3WikiIngestion } from "./components/modules/Module3WikiIngestion";
import { ModuleAdminControl } from "./components/modules/ModuleAdminControl";
import { Module2Matchmaking } from "./components/modules/Module2Matchmaking";
import { Module1Architecture } from "./components/modules/Module1Architecture";
import { Module5EdgeBot } from "./components/modules/Module5EdgeBot";
import { ModulePricing } from "./components/modules/ModulePricing";
import { ModuleAboutUs } from "./components/modules/ModuleAboutUs";
import { ModuleGamifiedCommunity } from "./components/modules/ModuleGamifiedCommunity";
import { ModulePitchRoom } from "./components/modules/ModulePitchRoom";
import { ModuleInvestmentReports } from "./components/modules/ModuleInvestmentReports";
import { ModuleSecondBrainNotebook } from "./components/modules/ModuleSecondBrainNotebook";
import { ModuleIdeasLab } from "./components/modules/ModuleIdeasLab";
import { ModuleMitaInitiatives } from "./components/modules/ModuleMitaInitiatives";
import { ModuleOmsarProjects } from "./components/modules/ModuleOmsarProjects";
import { ModuleCommunityNews } from "./components/modules/ModuleCommunityNews";
import { ModuleSubmitCommunityNews } from "./components/modules/ModuleSubmitCommunityNews";
import { ModuleResearchLibrary } from "./components/modules/ModuleResearchLibrary";
import { FloatingWorkspaceCapture } from "./components/secondBrain/FloatingWorkspaceCapture";
import { WhatsAppIntegrationModal } from "./components/secondBrain/WhatsAppIntegrationModal";
import { SystemArchitectureModal } from "./components/secondBrain/SystemArchitectureModal";
import { CommandPalette } from "./components/CommandPalette";
import { OffshoreTaxCalculatorModal } from "./components/OffshoreTaxCalculatorModal";
import { AuthModal } from "./components/AuthModal";
import { DemoExpiryBanner } from "./components/DemoExpiryBanner";
import { LegalAndGdprModal } from "./components/LegalAndGdprModal";
import { SocialMediaBanner } from "./components/SocialMediaBanner";
import { ShieldCheck, Building, Sparkles, UserPlus, Lock } from "lucide-react";
import { addSubscriberToMailingList } from "./lib/mailingList";

export default function App() {
  // Authentication & Free Community Access State
  // The user must sign up with name and email to access anything on the app (adds them to the mailing list).
  const [user, setUser] = useState<UserAuthSession | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("961ai_auth_user");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Check that it is a real registered user, not an auto-generated fake demo placeholder
          if (
            parsed &&
            parsed.email &&
            parsed.email !== "demo.guest@961ai.network" &&
            parsed.id !== "usr_initial_trial"
          ) {
            return parsed;
          }
        } catch (e) {
          console.error("Failed to parse user auth session", e);
        }
      }
    }
    return null;
  });

  // Prompt user immediately if they have not signed up yet
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    if (typeof window !== "undefined") {
      // Respect user's choice to browse as guest for the current session
      const guestBrowsing = sessionStorage.getItem("961ai_guest_browsing");
      if (guestBrowsing === "true") return false;

      const saved = localStorage.getItem("961ai_auth_user");
      if (!saved) return true;
      try {
        const parsed = JSON.parse(saved);
        if (!parsed || !parsed.email || parsed.email === "demo.guest@961ai.network") {
          return true;
        }
      } catch {
        return true;
      }
    }
    return false;
  });

  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signup");
  const [authAccessReason, setAuthAccessReason] = useState<string | undefined>(
    "Unlock 100% free access to all 961AI directory listings, Notebook LLM copilot, pitch room, and reports"
  );

  const openAuthModal = (mode: "signin" | "signup" = "signup", reason?: string) => {
    setAuthModalMode(mode);
    setAuthAccessReason(reason || "Unlock complete free access to the 961AI platform and join our community mailing list");
    setIsAuthModalOpen(true);
  };

  // Global Navigation State (0: Home, 1: Directory, 2: Questionnaire/ListEntity, 3: Ingestion, 4: Admin, 5: Matchmaker, 6: Arch, 7: Edge Bot, 8: News, 9: Marketplace, 10: Sandbox, 11: Dashboard, 12: Pricing, 13: About, 14: Quests, 15: Pitch Room, 16: Investment Reports, 17: Second Brain)
  const [activeModule, setActiveModule] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (
        p === "/second-brain" ||
        p === "/notebook" ||
        p === "/notebooklm" ||
        p.startsWith("/second-brain") ||
        p.startsWith("/notebook") ||
        h === "#second-brain" ||
        h === "#/second-brain" ||
        h === "#notebook" ||
        h === "#/notebook" ||
        h.startsWith("#second-brain")
      ) {
        return 17;
      }
      if (
        p === "/investment-reports" ||
        p === "/investment-report" ||
        p.startsWith("/investment-reports") ||
        p.startsWith("/investment-report") ||
        p === "/reports" ||
        h === "#investment-reports" ||
        h === "#/investment-reports" ||
        h === "#investment-report" ||
        h.startsWith("#investment-reports") ||
        h.startsWith("#investment-report")
      ) {
        return 16;
      }
      if (
        p === "/listentity" ||
        p === "/list-entity" ||
        p.startsWith("/listentity") ||
        p.startsWith("/list-entity") ||
        p === "/list" ||
        p === "/join" ||
        p === "/workspace" ||
        p === "/questionnaire" ||
        h === "#listentity" ||
        h === "#/listentity" ||
        h === "#list-entity" ||
        h === "#/list-entity" ||
        h === "#workspace" ||
        h === "#questionnaire"
      ) {
        return 2;
      }
      if (p === "/directory" || p.startsWith("/directory") || p === "/yellow-pages" || h === "#directory" || h === "#/directory") {
        return 1;
      }
      if (p === "/pricing" || p.startsWith("/pricing") || h === "#pricing" || h === "#/pricing") {
        return 12;
      }
      if (p === "/pitch-room" || p.startsWith("/pitch-room") || h === "#pitch-room" || h === "#/pitch-room") {
        return 15;
      }
      if (p === "/marketplace" || p.startsWith("/marketplace") || h === "#marketplace" || h === "#/marketplace") {
        return 9;
      }
      if (p === "/matchmaking" || p.startsWith("/matchmaking") || h === "#matchmaking" || h === "#/matchmaking") {
        return 5;
      }
      if (p === "/ideas" || p.startsWith("/ideas") || p === "/feedback" || p.startsWith("/feedback") || h === "#ideas" || h === "#/ideas" || h.startsWith("#ideas")) {
        return 19;
      }
      if (
        p === "/mita" || 
        p.startsWith("/mita") || 
        p === "/mita-initiatives" || 
        p.startsWith("/mita-initiatives") || 
        p === "/mitai" || 
        p.startsWith("/mitai") || 
        h === "#mita" || 
        h === "#/mita" || 
        h.startsWith("#mita")
      ) {
        return 20;
      }
      if (
        p === "/omsar" || 
        p.startsWith("/omsar") || 
        p === "/omsar-projects" || 
        p.startsWith("/omsar-projects") || 
        h === "#omsar" || 
        h === "#/omsar" || 
        h.startsWith("#omsar")
      ) {
        return 21;
      }
      if (
        p === "/on-your-agenda" ||
        p.startsWith("/on-your-agenda") ||
        p === "/on-our-agenda" ||
        p.startsWith("/on-our-agenda") ||
        p === "/agenda" ||
        p.startsWith("/agenda") ||
        p === "/community-news" ||
        p.startsWith("/community-news") ||
        h === "#on-your-agenda" ||
        h === "#/on-your-agenda" ||
        h === "#on-our-agenda" ||
        h === "#/on-our-agenda" ||
        h === "#agenda" ||
        h === "#community-news"
      ) {
        return 22;
      }
      if (
        p === "/submit-agenda" ||
        p.startsWith("/submit-agenda") ||
        p === "/submit-news" ||
        p.startsWith("/submit-news") ||
        p === "/list-news" ||
        p.startsWith("/list-news") ||
        h === "#submit-agenda" ||
        h === "#/submit-agenda" ||
        h === "#submit-news" ||
        h === "#list-news"
      ) {
        return 23;
      }
    }
    return 0; // Default to Home
  });

  const [selectedReportId, setSelectedReportId] = useState<string | undefined>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const reportParam = urlParams.get("report");
      if (reportParam) return reportParam;
      const hash = window.location.hash;
      if (hash.includes("report=")) {
        const hashQuery = hash.split("?")[1];
        if (hashQuery) {
          const hashParams = new URLSearchParams(hashQuery);
          return hashParams.get("report") || undefined;
        }
      }
    }
    return undefined;
  });

  const [userRole, setUserRole] = useState<UserRole>(user?.role || "founder");
  const [credits, setCredits] = useState<number>(user?.credits || 1450);
  const [currency, setCurrency] = useState<"USD" | "USDT" | "LBP">("USD");
  const [legalAdvisorQuery, setLegalAdvisorQuery] = useState<string>("");

  // Global Engine Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isTaxCalculatorOpen, setIsTaxCalculatorOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<"gdpr" | "privacy" | "terms" | "cookies" | "dsar">("gdpr");
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);

  const getModuleTitle = (mod: number): string => {
    switch (mod) {
      case 0: return "961AI Ecosystem Command Hub";
      case 1: return "Yellow Pages AI Directory (Law 126 Entities)";
      case 2: return "Fast-Track AI Ingestion Engine";
      case 5: return "Bespoke Matchmaking & VC Syndicate";
      case 7: return "WhatsApp EdgeBot Hub (+961 70 247 961)";
      case 9: return "AI Provider Marketplace & Development Agencies";
      case 10: return "Lebanon AI Regulatory Sandbox (BDL Circular 165)";
      case 12: return "961AI Community & Membership Tiers";
      case 13: return "About NCEI & Alkharizmi Solutions Consortium";
      case 14: return "Community Forum & BDD Hackathons";
      case 15: return "Diaspora Pitch Room & Deal Flow Syndicate";
      case 16: return "Lebanese AI Investment Reports (2026 Sovereign Index)";
      case 17: return "z961 Second Brain Workspace (NotebookLM Architecture)";
      case 19: return "IdeasLab: AI World Case Studies & Ecosystem Feedback Platform";
      case 20: return "MITA Initiatives: Building the Digital Republic (mitai.gov.lb)";
      case 21: return "OMSAR Projects: Reinventing Government 2030 (omsar.gov.lb)";
      case 22: return "On (Y)Our Agenda: Community News Wire & Strategic Agenda";
      case 23: return "Submit Story to On (Y)Our Agenda (Free Community Wire)";
      default: return "961AI Sovereign Intelligence Platform";
    }
  };

  const openLegalModal = (tab: "gdpr" | "privacy" | "terms" | "cookies" | "dsar") => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Graph, Wiki and News State
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_GRAPH_NODES);
  const [edges, setEdges] = useState(INITIAL_GRAPH_EDGES);
  const [wikiDocs, setWikiDocs] = useState<WikiDocument[]>(INITIAL_WIKI_DOCUMENTS);
  const [matchResults, setMatchResults] = useState(INITIAL_MATCH_RESULTS);
  const [news, setNews] = useState<StartupNewsArticle[]>(INITIAL_STARTUP_NEWS);
  const [resources, setResources] = useState<KnowledgeResource[]>(INITIAL_KNOWLEDGE_RESOURCES);

  // User Workspace & Intro Logs State
  const [userWorkspace, setUserWorkspace] = useState<UserPersonalWorkspace | null>(null);
  const [directorySearchQuery, setDirectorySearchQuery] = useState<string>("");
  const [introLogs, setIntroLogs] = useState<IntroductionRequestLog[]>([
    {
      id: "intro_init_1",
      timestamp: "2026-08-25T01:10:00Z",
      requesterId: "usr_cedars",
      requesterName: "CedarsLLM Founders",
      requesterRole: "founder",
      targetId: "inv_cedar_syndicate",
      targetName: "Cedar AI Syndicate (Silicon Valley)",
      targetRole: "Investor",
      status: "Warm Intro Sent",
      creditsSpent: 25,
      pitchNote: "Raising $1.2M Seed round for Arabic Foundation Models."
    },
    {
      id: "intro_init_2",
      timestamp: "2026-08-25T01:25:00Z",
      requesterId: "usr_phoenicia",
      requesterName: "Phoenicia Vision",
      requesterRole: "founder",
      targetId: "guru_jad_hobeika",
      targetName: "Dr. Jad Hobeika",
      targetRole: "Guru",
      status: "Connected",
      creditsSpent: 25,
      pitchNote: "Requesting technical advisory on edge model inference."
    }
  ]);

  // Modal State
  const [inspectedNode, setInspectedNode] = useState<GraphNode | null>(null);

  // Dedicated Route Navigation (support direct URL routing like /admin, /directory, /pricing, /)
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  });

  const isAdminRoute =
    currentPath === "/admin" ||
    currentPath.startsWith("/admin") ||
    (typeof window !== "undefined" &&
      (window.location.hash === "#admin" || 
       window.location.hash === "#/admin" || 
       window.location.hash.startsWith("#admin") ||
       window.location.hash.startsWith("#/admin")));

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      setCurrentPath(path);

      const isPathAdmin =
        path === "/admin" ||
        path.startsWith("/admin") ||
        hash === "#admin" ||
        hash === "#/admin" ||
        hash.startsWith("#admin") ||
        hash.startsWith("#/admin");

      const isPathDirectory =
        path === "/directory" ||
        path.startsWith("/directory") ||
        path === "/yellow-pages" ||
        hash === "#directory" ||
        hash === "#/directory";

      const isPathPricing =
        path === "/pricing" ||
        path.startsWith("/pricing") ||
        hash === "#pricing" ||
        hash === "#/pricing";

      const isPathPitchRoom =
        path === "/pitch-room" ||
        path.startsWith("/pitch-room") ||
        hash === "#pitch-room" ||
        hash === "#/pitch-room";

      const isPathSecondBrain =
        path === "/second-brain" ||
        path === "/notebook" ||
        path === "/notebooklm" ||
        path.startsWith("/second-brain") ||
        path.startsWith("/notebook") ||
        hash === "#second-brain" ||
        hash === "#/second-brain" ||
        hash === "#notebook" ||
        hash === "#/notebook" ||
        hash.startsWith("#second-brain");

      const isPathInvestmentReports =
        path === "/investment-reports" ||
        path === "/investment-report" ||
        path.startsWith("/investment-reports") ||
        path.startsWith("/investment-report") ||
        path === "/reports" ||
        hash === "#investment-reports" ||
        hash === "#/investment-reports" ||
        hash === "#investment-report" ||
        hash.startsWith("#investment-reports") ||
        hash.startsWith("#investment-report");

      const isPathListEntity =
        path === "/listentity" ||
        path === "/list-entity" ||
        path.startsWith("/listentity") ||
        path.startsWith("/list-entity") ||
        path === "/list" ||
        path === "/join" ||
        path === "/workspace" ||
        path === "/questionnaire" ||
        hash === "#listentity" ||
        hash === "#/listentity" ||
        hash === "#list-entity" ||
        hash === "#/list-entity" ||
        hash === "#workspace" ||
        hash === "#questionnaire";

      const isPathIdeas =
        path === "/ideas" ||
        path.startsWith("/ideas") ||
        path === "/feedback" ||
        path.startsWith("/feedback") ||
        hash === "#ideas" ||
        hash === "#/ideas" ||
        hash.startsWith("#ideas");

      const isPathMarketplace =
        path === "/marketplace" ||
        path.startsWith("/marketplace") ||
        hash === "#marketplace" ||
        hash === "#/marketplace";

      const isPathMatchmaking =
        path === "/matchmaking" ||
        path.startsWith("/matchmaking") ||
        hash === "#matchmaking" ||
        hash === "#/matchmaking";

      const isPathMita =
        path === "/mita" ||
        path.startsWith("/mita") ||
        hash === "#mita" ||
        hash === "#/mita" ||
        hash.startsWith("#mita");

      const isPathOmsar =
        path === "/omsar" ||
        path.startsWith("/omsar") ||
        hash === "#omsar" ||
        hash === "#/omsar" ||
        hash.startsWith("#omsar");

      const isPathEdgeBot =
        path === "/edgebot" ||
        path.startsWith("/edgebot") ||
        path === "/whatsapp-bot" ||
        hash === "#edgebot" ||
        hash === "#/edgebot" ||
        hash.startsWith("#edgebot");

      const isPathOnYourAgenda =
        path === "/on-your-agenda" ||
        path.startsWith("/on-your-agenda") ||
        path === "/on-our-agenda" ||
        path.startsWith("/on-our-agenda") ||
        path === "/agenda" ||
        path.startsWith("/agenda") ||
        path === "/community-news" ||
        path.startsWith("/community-news") ||
        hash === "#on-your-agenda" ||
        hash === "#/on-your-agenda" ||
        hash === "#on-our-agenda" ||
        hash === "#/on-our-agenda" ||
        hash === "#agenda" ||
        hash === "#community-news";

      const isPathSubmitAgenda =
        path === "/submit-agenda" ||
        path.startsWith("/submit-agenda") ||
        path === "/submit-news" ||
        path.startsWith("/submit-news") ||
        path === "/list-news" ||
        path.startsWith("/list-news") ||
        hash === "#submit-agenda" ||
        hash === "#/submit-agenda" ||
        hash === "#submit-news" ||
        hash === "#list-news";

      const isPathResearch =
        path === "/research" ||
        path.startsWith("/research") ||
        path === "/publications" ||
        path.startsWith("/publications") ||
        hash === "#research" ||
        hash === "#/research" ||
        hash.startsWith("#research");

      if (isPathAdmin) {
        setInspectedNode(null);
      } else if (isPathResearch) {
        setActiveModule(24);
        setInspectedNode(null);
      } else if (isPathOnYourAgenda) {
        setActiveModule(22);
        setInspectedNode(null);
      } else if (isPathSubmitAgenda) {
        setActiveModule(23);
        setInspectedNode(null);
      } else if (isPathMita) {
        setActiveModule(20);
        setInspectedNode(null);
      } else if (isPathOmsar) {
        setActiveModule(21);
        setInspectedNode(null);
      } else if (isPathIdeas) {
        setActiveModule(19);
        setInspectedNode(null);
      } else if (isPathSecondBrain) {
        setActiveModule(17);
        setInspectedNode(null);
      } else if (isPathMarketplace) {
        setActiveModule(9);
        setInspectedNode(null);
      } else if (isPathMatchmaking) {
        setActiveModule(5);
        setInspectedNode(null);
      } else if (isPathEdgeBot) {
        setActiveModule(7);
        setInspectedNode(null);
      } else if (isPathInvestmentReports) {
        const urlParams = new URLSearchParams(window.location.search);
        const reportParam = urlParams.get("report");
        if (reportParam) {
          setSelectedReportId(reportParam);
        } else if (hash.includes("report=")) {
          const hashQuery = hash.split("?")[1];
          if (hashQuery) {
            const hashParams = new URLSearchParams(hashQuery);
            const r = hashParams.get("report");
            if (r) setSelectedReportId(r);
          }
        }
        setActiveModule(16);
        setInspectedNode(null);
      } else if (isPathPitchRoom) {
        setActiveModule(15);
        setInspectedNode(null);
      } else if (isPathPricing) {
        setActiveModule(12);
        setInspectedNode(null);
      } else if (isPathListEntity) {
        setActiveModule(2);
        setInspectedNode(null);
      } else if (isPathDirectory) {
        setActiveModule(1);
        setInspectedNode(null);
      } else if (path === "/" || hash === "#home" || hash === "#/") {
        setActiveModule(0);
        setInspectedNode(null);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState(null, "", "/admin");
    setCurrentPath("/admin");
    setInspectedNode(null);
  };

  const navigateToHome = () => {
    window.history.pushState(null, "", "/");
    setCurrentPath("/");
    setActiveModule(0);
    setInspectedNode(null);
  };

  const navigateToInvestmentReports = (reportId?: string) => {
    if (reportId) {
      setSelectedReportId(reportId);
      window.history.pushState(null, "", `/investment-reports?report=${reportId}`);
      setCurrentPath(`/investment-reports?report=${reportId}`);
    } else {
      window.history.pushState(null, "", "/investment-reports");
      setCurrentPath("/investment-reports");
    }
    setActiveModule(16);
    setInspectedNode(null);
  };

  const navigateToResearch = () => {
    window.history.pushState(null, "", "/research");
    setCurrentPath("/research");
    setActiveModule(24);
    setInspectedNode(null);
  };

  const navigateToDirectory = () => {
    window.history.pushState(null, "", "/directory");
    setCurrentPath("/directory");
    setActiveModule(1);
    setInspectedNode(null);
  };

  const navigateToListEntity = () => {
    window.history.pushState(null, "", "/listentity");
    setCurrentPath("/listentity");
    setActiveModule(2);
    setInspectedNode(null);
  };

  const navigateToPricing = () => {
    window.history.pushState(null, "", "/pricing");
    setCurrentPath("/pricing");
    setActiveModule(12);
    setInspectedNode(null);
  };

  const navigateToPitchRoom = () => {
    window.history.pushState(null, "", "/pitch-room");
    setCurrentPath("/pitch-room");
    setActiveModule(15);
    setInspectedNode(null);
  };

  const navigateToSecondBrain = () => {
    window.history.pushState(null, "", "/second-brain");
    setCurrentPath("/second-brain");
    setActiveModule(17);
    setInspectedNode(null);
  };

  const navigateToIdeas = () => {
    window.history.pushState(null, "", "/ideas");
    setCurrentPath("/ideas");
    setActiveModule(19);
    setInspectedNode(null);
  };

  const navigateToMita = () => {
    window.history.pushState(null, "", "/mita");
    setCurrentPath("/mita");
    setActiveModule(20);
    setInspectedNode(null);
  };

  const navigateToOmsar = () => {
    window.history.pushState(null, "", "/omsar");
    setCurrentPath("/omsar");
    setActiveModule(21);
    setInspectedNode(null);
  };

  const navigateToMarketplace = () => {
    window.history.pushState(null, "", "/marketplace");
    setCurrentPath("/marketplace");
    setActiveModule(9);
    setInspectedNode(null);
  };

  const navigateToMatchmaking = () => {
    window.history.pushState(null, "", "/matchmaking");
    setCurrentPath("/matchmaking");
    setActiveModule(5);
    setInspectedNode(null);
  };

  const navigateToEdgeBot = () => {
    window.history.pushState(null, "", "/edgebot");
    setCurrentPath("/edgebot");
    setActiveModule(7);
    setInspectedNode(null);
  };

  const navigateToOnYourAgenda = () => {
    window.history.pushState(null, "", "/on-your-agenda");
    setCurrentPath("/on-your-agenda");
    setActiveModule(22);
    setInspectedNode(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSubmitAgenda = () => {
    window.history.pushState(null, "", "/submit-agenda");
    setCurrentPath("/submit-agenda");
    setActiveModule(23);
    setInspectedNode(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auth Handlers
  const handleAuthSuccess = (newSession: UserAuthSession, isSignUp?: boolean) => {
    setUser(newSession);
    setUserRole(newSession.role);
    setCredits(newSession.credits);
    try {
      addSubscriberToMailingList(
        newSession.email,
        newSession.name,
        newSession.role,
        "Signup & Demo",
        newSession.affiliation,
        "Direct user sign up for free platform access and mailing list enrollment"
      );
    } catch (e) {
      console.error("Mailing list sync error", e);
    }
    // As explicitly requested: every sign up person is directed to the Second Brain notebook LLM component
    if (isSignUp) {
      navigateToSecondBrain();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("961ai_auth_user");
    setUser(null);
  };

  const handleUpgradeSuccess = (updatedUser: UserAuthSession) => {
    setUser(updatedUser);
    setCredits(updatedUser.credits);
  };

  // Helpers
  const deductCredits = (amount: number): boolean => {
    if (credits < amount) return false;
    setCredits((prev) => prev - amount);
    if (user) {
      const updated = { ...user, credits: credits - amount };
      setUser(updated);
      localStorage.setItem("961ai_auth_user", JSON.stringify(updated));
    }
    return true;
  };

  const handleAddWikiDoc = (doc: WikiDocument) => {
    setWikiDocs((prev) => [doc, ...prev]);
  };

  const handleAddNode = (node: GraphNode) => {
    setNodes((prev) => [node, ...prev]);
  };

  const handleAddIntroLog = (log: IntroductionRequestLog) => {
    setIntroLogs((prev) => [log, ...prev]);
  };

  const currentWikiDoc = inspectedNode
    ? wikiDocs.find((w) => w.slug === inspectedNode.wikiSlug || w.title.toLowerCase().includes(inspectedNode.label.toLowerCase()))
    : undefined;

  const startups = nodes.filter((n) => n.type === "Startup");
  const investors = nodes.filter((n) => n.type === "Investor");

  // Dedicated Route: /admin renders the password-protected AdminPage
  if (isAdminRoute) {
    const isIdeasSubRoute =
      currentPath === "/admin/ideas" ||
      currentPath.startsWith("/admin/ideas") ||
      (typeof window !== "undefined" &&
        (window.location.pathname.includes("/admin/ideas") ||
         window.location.hash.includes("ideas")));

    return (
      <AdminPage
        nodes={nodes}
        wikiDocs={wikiDocs}
        onUpdateNodes={(updatedNodes) => setNodes(updatedNodes)}
        onUpdateWikiDocs={(updatedDocs) => setWikiDocs(updatedDocs)}
        introLogs={introLogs}
        onExit={navigateToHome}
        initialTab={isIdeasSubRoute ? "ideas_analytics" : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#FEF3C7] selection:text-[#78350F]">
      {/* Top Navbar with Module Switcher, User Auth, Pricing & Persona controls */}
      <Navbar
        activeModule={activeModule}
        setActiveModule={(mod) => {
          setInspectedNode(null);
          if (mod === 4) {
            navigateToAdmin();
          } else if (mod === 0) {
            navigateToHome();
          } else if (mod === 1) {
            navigateToDirectory();
          } else if (mod === 2) {
            navigateToListEntity();
          } else if (mod === 5) {
            navigateToMatchmaking();
          } else if (mod === 7) {
            navigateToEdgeBot();
          } else if (mod === 9) {
            navigateToMarketplace();
          } else if (mod === 12) {
            navigateToPricing();
          } else if (mod === 15) {
            navigateToPitchRoom();
          } else if (mod === 16) {
            navigateToInvestmentReports();
          } else if (mod === 17) {
            navigateToSecondBrain();
          } else if (mod === 19) {
            navigateToIdeas();
          } else if (mod === 20) {
            navigateToMita();
          } else if (mod === 21) {
            navigateToOmsar();
          } else {
            setActiveModule(mod);
          }
        }}
        userRole={userRole}
        setUserRole={(role) => {
          setUserRole(role);
          if (user) {
            const updated = { ...user, role };
            setUser(updated);
            localStorage.setItem("961ai_auth_user", JSON.stringify(updated));
          }
        }}
        credits={credits}
        currency={currency}
        setCurrency={setCurrency}
        nodesCount={nodes.length}
        edgesCount={edges.length}
        healthScore={94}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTaxCalculator={() => setIsTaxCalculatorOpen(true)}
        onNavigateToAdmin={navigateToAdmin}
        user={user}
        onOpenAuthModal={(mode?: "signin" | "signup") => {
          openAuthModal(mode || "signup", "Sign up free with your name and email to access 961AI and join the mailing list");
        }}
        onLogout={handleLogout}
      />

      {/* 6-Hour Demo Expiry & Countdown Banner */}
      <DemoExpiryBanner
        user={user}
        onOpenPricing={navigateToPricing}
        onOpenAuth={() => {
          openAuthModal("signup", "Sign up free with your name and email to unlock complete platform access");
        }}
      />

      {/* Free Platform Access Gate Banner if !user */}
      {!user && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white border-b-2 border-emerald-500/40 px-4 sm:px-6 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-emerald-300 mr-1.5 uppercase tracking-wide">Platform Access:</span>
                <span className="text-slate-200 font-sans">
                  By signing up free with your <strong>name & email</strong> you get limited access to access all directories, Notebook LLM copilot, due diligence pitch room, and reports (and join the 961AI Community Mailing List). A premium subscription Usd100 a year will give you full access and also a Yearly membership to Nceilebanon networking events and coaching ({" "}
                  <button
                    onClick={navigateToPricing}
                    className="underline text-emerald-300 hover:text-emerald-100 font-medium cursor-pointer transition-colors"
                  >
                    see our services
                  </button>
                  {" "})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={navigateToPricing}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-sm flex items-center gap-1 cursor-pointer font-mono"
              >
                <span>Premium $100/yr</span>
              </button>
              <button
                onClick={() => openAuthModal("signup", "Sign up free with your name and email to access all 961AI tools")}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up Free</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* If an entity is selected, render the dedicated INDEPENDENT PAGE */}
        {inspectedNode ? (
          <EntityDetailPage
            node={inspectedNode}
            wikiDoc={currentWikiDoc}
            onBack={() => setInspectedNode(null)}
            onSelectNode={(node) => setInspectedNode(node)}
            allNodes={nodes}
            edges={edges}
            news={news}
            deductCredits={deductCredits}
            credits={credits}
            onOpenTaxCalculator={() => setIsTaxCalculatorOpen(true)}
            onNavigateToSandbox={() => {
              setInspectedNode(null);
              setActiveModule(10);
            }}
          />
        ) : (
          <>
            {/* Module 0: Home Page */}
            {activeModule === 0 && (
              <ModuleHomePage
                nodes={nodes}
                edges={edges}
                onSelectNode={(node) => setInspectedNode(node)}
                deductCredits={deductCredits}
                credits={credits}
                onNavigateToQuestionnaire={navigateToListEntity}
                onOpenGraphView={() => setActiveModule(6)}
                onNavigateToMatchmaking={navigateToMatchmaking}
                onNavigateToDirectory={navigateToDirectory}
                news={news}
                resources={resources}
                onNavigateToNews={() => setActiveModule(8)}
                onNavigateToInvestmentReports={navigateToInvestmentReports}
                onNavigateToResearch={navigateToResearch}
                onNavigateToMarketplace={navigateToMarketplace}
                onNavigateToSandbox={() => setActiveModule(10)}
                onNavigateToDashboard={() => setActiveModule(11)}
                onNavigateToAbout={() => setActiveModule(13)}
                onNavigateToQuests={() => setActiveModule(14)}
                onNavigateToPitchRoom={navigateToPitchRoom}
                onNavigateToSecondBrain={navigateToSecondBrain}
                onNavigateToIdeas={navigateToIdeas}
                onNavigateToMita={navigateToMita}
                onNavigateToOmsar={navigateToOmsar}
                onNavigateToPricing={navigateToPricing}
                onNavigateToCommunityNews={navigateToOnYourAgenda}
                onNavigateToSubmitNews={navigateToSubmitAgenda}
                user={user}
                onOpenAuth={openAuthModal}
                onQuickAskLegalAi={(q) => {
                  setLegalAdvisorQuery(q);
                  setActiveModule(10);
                }}
              />
            )}

            {/* Module 24: Dedicated Research Library & Official PDF Publications */}
            {activeModule === 24 && (
              <ModuleResearchLibrary
                onNavigateToHome={navigateToHome}
                user={user}
                onOpenAuth={openAuthModal}
                onNavigateToAdmin={navigateToAdmin}
              />
            )}

            {/* Module 22: On (Y)Our Agenda - Community News Wire & Strategic Agenda */}
            {activeModule === 22 && (
              <ModuleCommunityNews
                onNavigateToHome={navigateToHome}
                onNavigateToSubmitNews={navigateToSubmitAgenda}
              />
            )}

            {/* Module 23: Submit to On (Y)Our Agenda (Free Community Submission) */}
            {activeModule === 23 && (
              <ModuleSubmitCommunityNews
                onNavigateToHome={navigateToHome}
                onNavigateToCommunityNews={navigateToOnYourAgenda}
                onNavigateToServices={navigateToPricing}
              />
            )}

            {/* Module 20: MITA Initiatives - Building the Digital Republic */}
            {activeModule === 20 && (
              <ModuleMitaInitiatives
                onNavigateToHome={navigateToHome}
                onNavigateToOmsar={navigateToOmsar}
                onNavigateToDirectory={navigateToDirectory}
                onNavigateToPricing={navigateToPricing}
                onNavigateToSandbox={() => setActiveModule(10)}
              />
            )}

            {/* Module 21: OMSAR Projects - Reinventing Government 2030 */}
            {activeModule === 21 && (
              <ModuleOmsarProjects
                onNavigateToHome={navigateToHome}
                onNavigateToMita={navigateToMita}
                onNavigateToDirectory={navigateToDirectory}
                onNavigateToSandbox={() => setActiveModule(10)}
              />
            )}

            {/* Module 19: IdeasLab & Got an Idea Feedback Platform */}
            {activeModule === 19 && (
              <ModuleIdeasLab />
            )}

            {/* Module 17: Sovereign Second Brain & Notebook LLM Copilot */}
            {activeModule === 17 && (
              <ModuleSecondBrainNotebook
                user={user}
                onOpenAuth={(mode) => {
                  setAuthModalMode(mode || "signup");
                  setIsAuthModalOpen(true);
                }}
                onNavigateToHome={navigateToHome}
                onNavigateToDirectory={(search) => {
                  if (search !== undefined) {
                    setDirectorySearchQuery(search);
                  }
                  navigateToDirectory();
                }}
                onNavigateToReports={() => navigateToInvestmentReports()}
                onNavigateToModule={(modId) => {
                  setActiveModule(modId);
                  setInspectedNode(null);
                }}
                onOpenPricing={navigateToPricing}
              />
            )}

            {/* Module 16: Investment Reports (Dedicated Research Page) */}
            {activeModule === 16 && (
              <ModuleInvestmentReports
                resources={resources}
                selectedReportId={selectedReportId}
                onNavigateToHome={navigateToHome}
                onNavigateToDirectory={navigateToDirectory}
                onNavigateToSandbox={() => setActiveModule(10)}
                user={user}
                onOpenAuth={openAuthModal}
              />
            )}

            {/* Module 15: Automated AI Due Diligence & Pitch Room */}
            {activeModule === 15 && (
              <ModulePitchRoom
                user={user}
                onOpenAuth={openAuthModal}
                onNavigateToMatchmaking={() => setActiveModule(5)}
                onNavigateToSandbox={() => setActiveModule(10)}
                onNavigateToYellowPages={navigateToDirectory}
                onNavigateToMarketplace={() => setActiveModule(9)}
                onOpenPricing={navigateToPricing}
                deductCredits={deductCredits}
                credits={credits}
              />
            )}

            {/* Module 1: Dedicated Yellow Pages Directory Page */}
            {activeModule === 1 && (
              <ModuleYellowPagesDirectory
                nodes={nodes}
                edges={edges}
                onSelectNode={(node) => setInspectedNode(node)}
                deductCredits={deductCredits}
                credits={credits}
                onNavigateToHome={navigateToHome}
                onNavigateToQuestionnaire={navigateToListEntity}
                onNavigateToMarketplace={() => setActiveModule(9)}
                onOpenGraphView={() => setActiveModule(6)}
                user={user}
                onOpenAuth={openAuthModal}
                initialSearchQuery={directorySearchQuery}
              />
            )}

            {/* Module 13: About Us, Specs & Strategic Ecosystem Thesis */}
            {activeModule === 13 && (
              <ModuleAboutUs
                nodesCount={nodes.length}
                edgesCount={edges.length}
                onNavigateToDirectory={navigateToDirectory}
                onNavigateToQuestionnaire={navigateToListEntity}
                onNavigateToPricing={navigateToPricing}
                onNavigateToSandbox={() => setActiveModule(10)}
                onNavigateToMatchmaking={() => setActiveModule(5)}
                onNavigateToWiki={() => setActiveModule(3)}
                onNavigateToArchitecture={() => setActiveModule(6)}
                onNavigateToMarketplace={() => setActiveModule(9)}
                onNavigateToEdgeBot={() => setActiveModule(7)}
                onNavigateToNews={() => setActiveModule(8)}
                onNavigateToQuests={() => setActiveModule(14)}
                onNavigateToPitchRoom={navigateToPitchRoom}
              />
            )}

            {/* Module 14: Gamified Community Engagement, Quests & Bounties */}
            {activeModule === 14 && (
              <ModuleGamifiedCommunity
                user={user}
                onOpenPricing={navigateToPricing}
                onOpenAuth={() => {
                  setAuthModalMode("signup");
                  setIsAuthModalOpen(true);
                }}
                onNavigateToYellowPages={navigateToDirectory}
                onNavigateToWiki={() => setActiveModule(3)}
                onNavigateToMatchmaking={() => setActiveModule(5)}
                onNavigateToSandbox={() => setActiveModule(10)}
                onNavigateToNews={() => setActiveModule(8)}
              />
            )}

            {/* Module 12: Dedicated Pricing Page ($100/yr Annual Pro vs 6-Hour Demo) */}
            {activeModule === 12 && (
              <ModulePricing
                user={user}
                onUpgradeSuccess={handleUpgradeSuccess}
                onOpenAuthModal={() => {
                  setAuthModalMode("signup");
                  setIsAuthModalOpen(true);
                }}
                onNavigateToHome={navigateToHome}
                onNavigateToDirectory={navigateToDirectory}
              />
            )}

            {/* Module 11: Lebanon & MENA AI Ecosystem Dashboard */}
            {activeModule === 11 && (
              <ModuleEcosystemDashboard
                nodes={nodes}
                edges={edges}
                news={news}
                onSelectNode={(node) => setInspectedNode(node)}
                onNavigateToNews={() => setActiveModule(8)}
                onNavigateToSandbox={() => setActiveModule(10)}
                onOpenTaxCalculator={() => setIsTaxCalculatorOpen(true)}
              />
            )}

            {/* Module 10: Lebanon Regulatory Sandbox & Startup Legal Hub */}
            {activeModule === 10 && (
              <ModuleLebanonSandbox
                deductCredits={deductCredits}
                credits={credits}
                onNavigateToQuestionnaire={navigateToListEntity}
                onNavigateToYellowPages={navigateToDirectory}
                initialQuestion={legalAdvisorQuery}
                user={user}
                onOpenAuth={openAuthModal}
              />
            )}

            {/* Module 9: Verified Software & AI Provider Marketplace */}
            {activeModule === 9 && (
              <ModuleProviderMarketplace
                nodes={nodes}
                onSelectNode={(node) => setInspectedNode(node)}
                deductCredits={deductCredits}
                credits={credits}
                introLogs={introLogs}
                onAddIntroLog={handleAddIntroLog}
                onNavigateToQuestionnaire={navigateToListEntity}
              />
            )}

            {/* Module 8: News & Knowledge Resources Hub */}
            {activeModule === 8 && (
              <Module961AiNews
                news={news}
                resources={resources}
                nodes={nodes}
                onSelectNode={(node) => setInspectedNode(node)}
                onNavigateToQuestionnaire={navigateToListEntity}
                onAddResource={(res) => setResources((prev) => [res, ...prev])}
              />
            )}

            {/* Module 2: Intake Questionnaire & Auto-Generated Workspace */}
            {activeModule === 2 && (
              <ModuleQuestionnaireWorkspace
                onAddWikiDoc={handleAddWikiDoc}
                onAddNode={handleAddNode}
                onSelectNode={(node) => setInspectedNode(node)}
                existingWorkspace={userWorkspace}
                onUpdateWorkspace={(ws) => setUserWorkspace(ws)}
                user={user}
                onUpdateUser={(updatedUser) => {
                  setUser(updatedUser);
                  setCredits(updatedUser.credits);
                }}
                onOpenPricing={navigateToPricing}
                onNavigateToDirectory={(search) => {
                  if (search !== undefined) {
                    setDirectorySearchQuery(search);
                  }
                  navigateToDirectory();
                }}
                onNavigateToHome={navigateToHome}
                onNavigateToModule={(modId) => {
                  setActiveModule(modId);
                  setInspectedNode(null);
                }}
              />
            )}

            {/* Module 3: Karpathy Ingestion Engine & Enriched Guru Extractor */}
            {activeModule === 3 && (
              <Module3WikiIngestion
                wikiDocs={wikiDocs}
                onAddWikiDoc={handleAddWikiDoc}
                onAddNode={handleAddNode}
                deductCredits={deductCredits}
              />
            )}

            {/* Module 4: Admin Control Panel (/admin) */}
            {activeModule === 4 && (
              <ModuleAdminControl
                nodes={nodes}
                wikiDocs={wikiDocs}
                onUpdateNodes={(updatedNodes) => setNodes(updatedNodes)}
                onUpdateWikiDocs={(updatedDocs) => setWikiDocs(updatedDocs)}
                introLogs={introLogs}
              />
            )}

            {/* Module 5: VC Matchmaking & Deal Memos */}
            {activeModule === 5 && (
              <Module2Matchmaking
                startups={startups}
                investors={investors}
                matchResults={matchResults}
                onSelectNode={(node) => setInspectedNode(node)}
                deductCredits={deductCredits}
              />
            )}

            {/* Module 6 & 18: Postgres RLS & Neo4j Schemas & D3 Graph */}
            {(activeModule === 6 || activeModule === 18) && (
              <Module1Architecture
                nodes={nodes}
                edges={edges}
                postgresSchemas={POSTGRES_SCHEMAS}
                onSelectNode={(node) => setInspectedNode(node)}
              />
            )}

            {/* Module 7: WhatsApp Low-Bandwidth Edge Bot */}
            {activeModule === 7 && (
              <Module5EdgeBot deductCredits={deductCredits} />
            )}
          </>
        )}
      </main>

      {/* Global Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        nodes={nodes}
        news={news}
        resources={resources}
        onSelectNode={(node) => {
          setInspectedNode(node);
          setIsCommandPaletteOpen(false);
        }}
        onNavigateToModule={(modId) => {
          if (modId === 4) {
            navigateToAdmin();
          } else if (modId === 0) {
            navigateToHome();
          } else if (modId === 1) {
            navigateToDirectory();
          } else if (modId === 12) {
            navigateToPricing();
          } else if (modId === 17) {
            navigateToSecondBrain();
          } else if (modId === 22) {
            navigateToOnYourAgenda();
          } else if (modId === 23) {
            navigateToSubmitAgenda();
          } else if (modId === 24) {
            navigateToResearch();
          } else {
            setActiveModule(modId);
          }
          setIsCommandPaletteOpen(false);
        }}
        onNavigateToAdmin={navigateToAdmin}
        onOpenTaxCalculator={() => {
          setIsCommandPaletteOpen(false);
          setIsTaxCalculatorOpen(true);
        }}
        onOpenLegalCodex={() => {
          setIsCommandPaletteOpen(false);
          setActiveModule(10);
        }}
      />

      {/* Sign In & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
        accessReason={authAccessReason}
        onNavigateToPricing={navigateToPricing}
        onContinueBrowsing={() => {
          setIsAuthModalOpen(false);
          try {
            sessionStorage.setItem("961ai_guest_browsing", "true");
          } catch {
            // ignore
          }
        }}
      />

      {/* 0% Offshore S.A.L. & Runway Engine Modal */}
      <OffshoreTaxCalculatorModal
        isOpen={isTaxCalculatorOpen}
        onClose={() => setIsTaxCalculatorOpen(false)}
      />

      {/* Legal & GDPR Compliance Modal */}
      <LegalAndGdprModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* Universal Floating Workspace Quick-Capture & Web Clipper */}
      <FloatingWorkspaceCapture
        user={user}
        activeModuleTitle={getModuleTitle(activeModule)}
        onOpenAuth={openAuthModal}
        onNavigateToWorkspace={navigateToSecondBrain}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenArchitectureModal={() => setIsArchModalOpen(true)}
      />

      {/* WhatsApp z24seven Simulator Modal */}
      <WhatsAppIntegrationModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        user={user}
      />

      {/* System Architecture & Test Suite Modal */}
      <SystemArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      {/* Footer - Alkharizmi Solutions & NCEI Lebanon Joint Platform */}
      <footer className="border-t border-[#D7E7D6] bg-gradient-to-b from-[#FAFCFA] to-[#EFF5EF] text-slate-700 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Join Our Social Media Network Footer Banner */}
          <SocialMediaBanner id="footer-social-media-banner" variant="footer" />

          {/* 4-Column Footer Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
            {/* Column 1: Joint Platform Partners */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#2E5A2C]" />
                <span>Platform Consortium</span>
              </h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Co-developed and operated by <strong>Alkharizmi Solutions</strong> and <strong>NCEI Lebanon</strong> (National Council for Entrepreneurship and Innovation) to foster deep tech innovation and foreign direct investment.
              </p>
              <div className="pt-1 space-y-1.5 font-mono text-[11px]">
                <div className="text-slate-800 font-bold">🏛️ Alkharizmi Solutions</div>
                <div className="text-slate-600">Applied AI & Cloud Sovereign Stacks</div>
                <div className="text-slate-800 font-bold mt-2">🇱🇧 NCEI Lebanon</div>
                <div className="text-slate-600">The National Council for Entrepreneurship and Innovation</div>
              </div>
            </div>

            {/* Column 2: Ecosystem Core Modules */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                Platform Directory & Hub
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={() => { setActiveModule(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Yellow Pages AI Directory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { navigateToMita(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left flex items-center gap-1 font-bold text-emerald-800"
                  >
                    <span>🏛️ MITA Initiatives (mitai.gov.lb)</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">OFFICIAL</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { navigateToOmsar(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left flex items-center gap-1 font-bold text-blue-800"
                  >
                    <span>🏛️ OMSAR Projects (omsar.gov.lb)</span>
                    <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">GOV 2030</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { navigateToIdeas(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left flex items-center gap-1 font-bold text-amber-700"
                  >
                    <span>💡 IdeasLab & "Got an Idea?"</span>
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">NEW</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { navigateToSecondBrain(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left flex items-center gap-1 font-bold text-[#2E5A2C]"
                  >
                    <span>🧠 Second Brain (NotebookLLM)</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">AUTO-UNLOCKED</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { navigateToOnYourAgenda(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-rose-700 transition-colors cursor-pointer text-left flex items-center gap-1 font-bold text-rose-800"
                  >
                    <span>📰 On (Y)Our Agenda</span>
                    <span className="text-[9px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono font-bold">WIRE</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { navigateToSubmitAgenda(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left flex items-center gap-1 font-medium text-slate-700"
                  >
                    <span>✍️ List Your News (Free)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveModule(9); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Provider Marketplace & Agencies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveModule(5); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Synergy & Matchmaking Engine
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveModule(15); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Diaspora Pitch Room Syndicate
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveModule(7); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    WhatsApp & EdgeBot Console
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsTaxCalculatorOpen(true)}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left text-[#2E5A2C] font-semibold"
                  >
                    0% Offshore S.A.L. Runway Engine
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Membership & Verification */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                Membership & Access
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={navigateToPricing}
                    className="hover:text-[#2E5A2C] font-bold text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Annual Membership ($100/yr)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveModule(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    List Entity / Fast-Track Ingestion
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveModule(13); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Consortium Governance & Mission
                  </button>
                </li>
                <li>
                  <button
                    onClick={navigateToAdmin}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left font-mono"
                  >
                    Admin Operations Console (/admin)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveModule(10); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Lebanon AI Sandbox (Law 126/2019)
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal Pages & GDPR Compliance */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E5A2C]" />
                <span>Legal & GDPR Sovereignty</span>
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={() => openLegalModal("gdpr")}
                    className="hover:text-[#2E5A2C] font-semibold transition-colors cursor-pointer flex items-center gap-1 text-left"
                  >
                    <span>GDPR Compliance & Data Rights</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono">EU/LB</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLegalModal("privacy")}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy & Data Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLegalModal("terms")}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Terms of Service & Syndicate Protocol
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLegalModal("cookies")}
                    className="hover:text-[#2E5A2C] transition-colors cursor-pointer text-left"
                  >
                    Cookie & Local Storage Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLegalModal("dsar")}
                    className="text-rose-700 hover:text-rose-900 font-semibold transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <span>DSAR Portal (Erase / Export My Data)</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Attribution & Copyright Bar */}
          <div className="pt-8 border-t border-[#D7E7D6] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-800">
                © {new Date().getFullYear()} 961AI Network.
              </span>
              <span>Alkharizmi Solutions & NCEI Lebanon Joint Platform.</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openLegalModal("gdpr")}
                className="hover:text-[#2E5A2C] transition-colors cursor-pointer"
              >
                GDPR Verified
              </button>
              <span>•</span>
              <button
                onClick={() => openLegalModal("privacy")}
                className="hover:text-[#2E5A2C] transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <span>•</span>
              <button
                onClick={() => openLegalModal("terms")}
                className="hover:text-[#2E5A2C] transition-colors cursor-pointer"
              >
                Terms
              </button>
              <span>•</span>
              <button
                onClick={navigateToAdmin}
                className="hover:text-slate-900 font-bold text-slate-600 transition-colors cursor-pointer"
              >
                Admin Root Console
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
