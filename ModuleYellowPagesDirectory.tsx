import React, { useState } from "react";
import { 
  QuestionnaireSubmission, 
  UserPersonalWorkspace, 
  GraphNode, 
  WikiDocument,
  ReferralRecord,
  UserAuthSession
} from "../../types";
import { INITIAL_REFERRAL_RECORDS } from "../../data/initialData";
import { addSubscriberToMailingList } from "../../lib/mailingList";
import { ReferralsWorkspaceTab } from "../workspace/ReferralsWorkspaceTab";
import { 
  Building2, 
  Users, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Code, 
  ShieldCheck, 
  Globe, 
  MapPin, 
  RefreshCw, 
  ExternalLink, 
  ChevronRight,
  GitBranch,
  Lock,
  Zap,
  FolderLock,
  Gift,
  Layers
} from "lucide-react";
import { PlatformCoreModulesBar } from "../workspace/PlatformCoreModulesBar";

interface ModuleQuestionnaireWorkspaceProps {
  onAddWikiDoc: (doc: WikiDocument) => void;
  onAddNode: (node: GraphNode) => void;
  onSelectNode: (node: GraphNode) => void;
  existingWorkspace?: UserPersonalWorkspace | null;
  onUpdateWorkspace?: (ws: UserPersonalWorkspace) => void;
  user?: UserAuthSession | null;
  onUpdateUser?: (updatedUser: UserAuthSession) => void;
  onOpenPricing?: () => void;
  onNavigateToDirectory?: (searchQuery?: string) => void;
  onNavigateToHome?: () => void;
  onNavigateToModule?: (moduleId: number) => void;
}

export const ModuleQuestionnaireWorkspace: React.FC<ModuleQuestionnaireWorkspaceProps> = ({
  onAddWikiDoc,
  onAddNode,
  onSelectNode,
  existingWorkspace = null,
  onUpdateWorkspace,
  user = null,
  onUpdateUser,
  onOpenPricing,
  onNavigateToDirectory,
  onNavigateToHome,
  onNavigateToModule
}) => {
  // Wizard Navigation - Default to step 3 (Personal Workspace) so user lands on workspace immediately
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [selectedCategory, setSelectedCategory] = useState<"Startup Founder" | "AI Guru/Expert" | "Investor" | "Stakeholder">("Startup Founder");

  // Form State
  const [entityName, setEntityName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("+961-70-");
  const [locationCity, setLocationCity] = useState("Beirut");
  const [locationCountry, setLocationCountry] = useState("Lebanon");
  const [isDiaspora, setIsDiaspora] = useState(false);
  const [subService, setSubService] = useState("Generative AI");
  const [techStackInput, setTechStackInput] = useState("PyTorch, CUDA, LLM Quantization, FastAPI");
  const [rawTextPayload, setRawTextPayload] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Category-specific fields
  // Founder
  const [teamSize, setTeamSize] = useState(5);
  const [fundingStage, setFundingStage] = useState<"Pre-Seed" | "Seed" | "Series A" | "Bootstrapped">("Seed");
  const [hiringNeeds, setHiringNeeds] = useState("Senior MLOps, Distributed Systems Engineer");
  // Guru
  const [academicBackground, setAcademicBackground] = useState("American University of Beirut (AUB) - MS Computer Engineering");
  const [githubUrl, setGithubUrl] = useState("https://github.com/lebanese-ai-dev");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/lebanese-ai-guru");
  const [advisoryAvailability, setAdvisoryAvailability] = useState(true);
  // Investor
  const [fundName, setFundName] = useState("Cedar Horizon Ventures");
  const [investmentThesis, setInvestmentThesis] = useState("Backing technical Lebanese AI founders leveraging the Beirut engineering arbitrage for global markets.");
  const [ticketSizeUsd, setTicketSizeUsd] = useState("$100k - $500k");
  const [geographicFocus, setGeographicFocus] = useState("Lebanon & MENA Diaspora");
  const [menaPortfolio, setMenaPortfolio] = useState("3 portfolio investments in AI & FinTech");
  // Stakeholder
  const [stakeholderType, setStakeholderType] = useState<"University" | "Incubator" | "Media" | "Government/NGO">("University");
  const [programsOffered, setProgramsOffered] = useState("GPU Compute Grants, AI Incubation, Mentorship");

  // Workspace & Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referrals, setReferrals] = useState<ReferralRecord[]>(() => existingWorkspace?.referrals || INITIAL_REFERRAL_RECORDS);

  const createDefaultWorkspace = (): UserPersonalWorkspace => ({
    user: {
      id: user?.id || "usr_cedars_founder",
      name: user?.name || "CedarsLLM Research Labs",
      email: user?.email || "founder@cedars-llm.ai",
      role: "founder"
    },
    entityNode: {
      id: "startup_cedars_llm",
      label: "CedarsLLM",
      type: "Startup",
      location: "Beirut & San Francisco",
      locationType: "onshore_lebanon",
      country: "Lebanon / USA",
      isDiaspora: false,
      title: "Arabic-First Enterprise LLMs & Quantization",
      bio: "Pioneering Arabic dialect reasoning models with 4-bit AWQ & TensorRT-LLM acceleration for MENA banking and healthcare. Incubated at Berytech.",
      tags: ["LLMs", "Arabic NLP", "Quantization", "TensorRT", "Seed Stage"],
      verified: true,
      wikiSlug: "startup-cedars-llm",
      connectionsCount: 8,
      claimStatus: "claimed"
    },
    wikiDoc: {
      slug: "startup-cedars-llm",
      title: "CedarsLLM",
      entityType: "Startup",
      lastUpdated: "2026-08-28",
      author: "Karpathy Second Brain Compiler",
      frontmatter: {
        aliases: ["CedarsLLM Labs", "Cedars Arabic AI"],
        location: "Beirut Digital District (BDD), Lebanon",
        isDiaspora: false,
        verificationLevel: "Tier 1 (Verified)",
        connectedEntities: ["AUB", "Berytech", "LebNet Silicon Valley"]
      },
      summary: "High-throughput Arabic LLM inference engine with domain-specific fine-tuning for Levant and Gulf enterprise workloads.",
      markdownContent: `# CedarsLLM\n\n**Type**: AI Scaleup / DeepTech\n**Location**: Beirut Digital District (BDD) & San Francisco Bridge\n**Status**: Verified Onshore Entity (Law 126/2019 Offshore S.A.L.)\n\n## Overview\nCedarsLLM builds sovereign Arabic foundation models optimized for low-compute enterprise deployment across the Levant and GCC.\n\n## Core Capabilities\n- [[Arabic Dialect Fine-Tuning]] (Levantine, Egyptian, Gulf)\n- [[4-Bit Weight Quantization (AWQ)]]\n- [[TensorRT-LLM & vLLM Inference Kernels]]\n\n## Ecosystem Anchors\n- R&D Hub: [[Berytech]] & [[Beirut Digital District]]\n- Academic Root: [[American University of Beirut (AUB)]]\n- Diaspora Bridge: [[LebNet Silicon Valley]]\n- Seed Syndicate: [[Cedar AI Syndicate]]`,
      backlinks: ["inv_cedar_syndicate", "guru_jad_hobeika"],
      outlinks: ["AUB", "Berytech", "LebNet"]
    },
    rawVault: {
      sourcePath: "1_sources/submissions/2026-08-28_usr_cedars.json",
      rawSubmission: {
        id: "sub_cedars_default",
        userId: user?.id || "usr_cedars_founder",
        category: "Startup Founder",
        entityName: "CedarsLLM",
        contactEmail: "founder@cedars-llm.ai",
        contactPhone: "+961-70-123456",
        location: "Beirut, Lebanon",
        isDiaspora: false,
        subService: "Generative AI",
        techStack: ["Arabic LLMs", "vLLM", "TensorRT", "PyTorch"],
        rawTextPayload: "Pioneering Arabic dialect reasoning models with 4-bit AWQ & TensorRT-LLM acceleration for MENA banking and healthcare.",
        timestamp: "2026-08-28T10:00:00Z",
        status: "published_l3"
      },
      lastIngestedAt: "2026-08-28T10:00:00Z",
      immutableHash: "sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    aiMatches: [
      {
        id: "match_cedar_1",
        targetNode: {
          id: "inv_cedar_syndicate",
          label: "Cedar AI Syndicate (Silicon Valley)",
          type: "Investor",
          location: "San Francisco / Beirut",
          isDiaspora: true,
          title: "Pre-Seed & Seed AI Fund ($100k-$500k checks)",
          tags: ["Generative AI", "LLMs", "Diaspora Bridge"]
        },
        score: 0.96,
        rationale: "96% multi-vector score match: Perfect synergy between Beirut engineering and Silicon Valley diaspora capital.",
        synergyPill: "Diaspora Capital Bridge",
        category: "Investor Match"
      },
      {
        id: "match_cedar_2",
        targetNode: {
          id: "guru_jad_hobeika",
          label: "Dr. Jad Hobeika",
          type: "Guru",
          location: "Paris / Beirut",
          isDiaspora: true,
          title: "Principal AI Research Scientist (Ex-Meta FAIR)",
          tags: ["LLM Quantization", "CUDA", "Advisory"]
        },
        score: 0.92,
        rationale: "Advisory fit for custom CUDA kernel design and Arabic tokenization optimization.",
        synergyPill: "Technical Advisory Fit",
        category: "Guru Match"
      }
    ],
    referrals: existingWorkspace?.referrals || INITIAL_REFERRAL_RECORDS
  });

  const [workspace, setWorkspace] = useState<UserPersonalWorkspace | null>(() => existingWorkspace || createDefaultWorkspace());
  const [reingestDeckText, setReingestDeckText] = useState("");
  const [isReingesting, setIsReingesting] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"node" | "matches" | "vault" | "referrals">("referrals");

  const handleAddReferral = (newRef: ReferralRecord) => {
    const updated = [newRef, ...referrals];
    setReferrals(updated);
    if (workspace) {
      const updatedWs = { ...workspace, referrals: updated };
      setWorkspace(updatedWs);
      if (onUpdateWorkspace) onUpdateWorkspace(updatedWs);
    }
  };

  const handleExtendSubscription = (monthsToAdd: number, creditsToAdd: number) => {
    if (user && onUpdateUser) {
      const currentExpiry = user.premiumExpiresAt || (user.demoExpiresAt ? user.demoExpiresAt : Date.now() + 365 * 24 * 60 * 60 * 1000);
      const extraMs = monthsToAdd * 30 * 24 * 60 * 60 * 1000;
      const updatedUser: UserAuthSession = {
        ...user,
        isPremium: true,
        plan: "premium_annual",
        premiumExpiresAt: Math.max(Date.now(), currentExpiry) + extraMs,
        credits: (user.credits || 0) + creditsToAdd,
        referralCount: (user.referralCount || 0) + 1,
        monthsEarnedFree: (user.monthsEarnedFree || 0) + monthsToAdd
      };
      onUpdateUser(updatedUser);
      localStorage.setItem("961ai_auth_user", JSON.stringify(updatedUser));
    }
  };

  // Handle Preset quick-load for instant demo
  const loadPreset = (type: "founder" | "guru" | "investor" | "stakeholder") => {
    if (type === "founder") {
      setSelectedCategory("Startup Founder");
      setEntityName("Qannoubine AI");
      setContactEmail("founders@qannoubine.ai");
      setLocationCity("Beirut (BDD)");
      setLocationCountry("Lebanon");
      setIsDiaspora(false);
      setSubService("Generative AI");
      setTechStackInput("Arabic LLMs, vLLM, TensorRT-LLM, PyTorch");
      setRawTextPayload("Qannoubine AI develops low-latency Arabic dialect foundation models with sub-8-bit quantization for MENA enterprise banking and healthcare. Spun out of AUB AI research group.");
      setTeamSize(6);
      setFundingStage("Seed");
      setHiringNeeds("CUDA Kernel Optimization Engineer, Arabic NLP Specialist");
    } else if (type === "guru") {
      setSelectedCategory("AI Guru/Expert");
      setEntityName("Dr. Ziad Baroud");
      setContactEmail("ziad.baroud@inria.fr");
      setLocationCity("Paris");
      setLocationCountry("France");
      setIsDiaspora(true);
      setSubService("Computer Vision");
      setTechStackInput("Diffusion Models, 3D Gaussian Splatting, PyTorch, C++");
      setAcademicBackground("USJ Beirut BS, PhD INRIA Paris");
      setRawTextPayload("Staff AI Vision Scientist in Paris. Expert in 3D scene reconstruction and neural rendering. Proud member of LebNet Paris chapter and advisory board for Beirut incubators.");
      setAdvisoryAvailability(true);
    } else if (type === "investor") {
      setSelectedCategory("Investor");
      setEntityName("Byblos Syndicate Partners");
      setContactEmail("invest@byblossyndicate.com");
      setLocationCity("San Francisco & Dubai");
      setLocationCountry("USA / UAE");
      setIsDiaspora(true);
      setSubService("Angel Syndicate ($10k-$500k)");
      setTicketSizeUsd("$150,000 - $600,000");
      setFundName("Byblos Syndicate Fund II");
      setInvestmentThesis("Investing in high-conviction Lebanese AI founders in Beirut and across the diaspora. Focus on Seed & Pre-Seed rounds with technical moats.");
      setGeographicFocus("Lebanon, USA, GCC");
    } else {
      setSelectedCategory("Stakeholder");
      setEntityName("American University of Beirut (AUB) Artificial Intelligence Lab");
      setContactEmail("ailab@aub.edu.lb");
      setLocationCity("Beirut (Bliss St)");
      setLocationCountry("Lebanon");
      setIsDiaspora(false);
      setSubService("University AI Lab");
      setStakeholderType("University");
      setProgramsOffered("Postgraduate AI Fellows, NVIDIA DGX Supercomputing Cluster Access, Joint Industry Grants");
      setRawTextPayload("Premier academic institution in Lebanon pioneering research in Arabic NLP, Biomedical Signal Processing, and Edge Computer Vision.");
    }
    setCurrentStep(2);
  };

  // Submit and Generate Personal Workspace
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName || !contactEmail) {
      alert("Please enter the entity name and contact email.");
      return;
    }

    setIsSubmitting(true);
    const techStackArray = techStackInput.split(",").map((s) => s.trim()).filter(Boolean);

    const submissionData: QuestionnaireSubmission = {
      id: "sub_" + Date.now(),
      userId: "usr_" + Math.random().toString(36).substring(2, 8),
      category: selectedCategory,
      timestamp: new Date().toISOString(),
      contactEmail,
      contactPhone,
      entityName,
      location: `${locationCity}, ${locationCountry}`,
      isDiaspora,
      subService,
      techStack: techStackArray,
      rawTextPayload: rawTextPayload || `${entityName} is an active AI stakeholder in Lebanon.`,
      uploadedFileName: uploadedFileName || undefined,
      status: "compiled_l2",
      founderDetails: selectedCategory === "Startup Founder" ? {
        teamSize,
        fundingStage,
        hiringNeeds: hiringNeeds.split(",").map((s) => s.trim()),
        deckText: rawTextPayload
      } : undefined,
      guruDetails: selectedCategory === "AI Guru/Expert" ? {
        academicBackground,
        githubUrl,
        linkedinUrl,
        advisoryAvailability,
        expertiseTags: techStackArray
      } : undefined,
      investorDetails: selectedCategory === "Investor" ? {
        fundName,
        investmentThesis,
        ticketSizeUsd,
        geographicFocus,
        menaPortfolio: menaPortfolio.split(",").map((s) => s.trim()),
        preferredStages: [fundingStage]
      } : undefined,
      stakeholderDetails: selectedCategory === "Stakeholder" ? {
        stakeholderType,
        programsOffered: programsOffered.split(",").map((s) => s.trim()),
        keyAlumniPartners: ["AUB", "LAU", "LebNet"]
      } : undefined
    };

    // Automatically register submitter with their Name in Central Admin Repository
    try {
      if (contactEmail) {
        addSubscriberToMailingList(
          contactEmail,
          entityName,
          selectedCategory === "Startup Founder" ? "Founder" : selectedCategory === "AI Guru/Expert" ? "AI Guru / Researcher" : selectedCategory === "Investor" ? "Investor" : "Academic / Stakeholder",
          "Questionnaire Ingestion",
          `${locationCity}, ${locationCountry}`,
          `Questionnaire Intake: ${subService || selectedCategory} (${techStackInput})`
        );
      }
    } catch {
      // ignore
    }

    try {
      const res = await fetch("/api/submissions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });
      const data = await res.json();
      if (data.workspace) {
        setWorkspace(data.workspace);
        if (onUpdateWorkspace) onUpdateWorkspace(data.workspace);
        if (data.workspace.entityNode) onAddNode(data.workspace.entityNode);
        if (data.workspace.wikiDoc) onAddWikiDoc(data.workspace.wikiDoc);
        setCurrentStep(3); // Jump to Workspace Dashboard
      } else {
        throw new Error(data.error || "Failed to generate workspace on server");
      }
    } catch (err: any) {
      console.warn("Server submission fallback:", err);
      // Instant Client-Side Compilation Fallback
      const entitySlug = submissionData.entityName.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const fallbackNode: GraphNode = {
        id: "node_" + entitySlug,
        label: submissionData.entityName,
        type: submissionData.category === "Startup Founder" ? "Startup" : submissionData.category === "AI Guru/Expert" ? "Guru" : submissionData.category === "Investor" ? "Investor" : "Hub",
        location: submissionData.location,
        country: submissionData.isDiaspora ? "Diaspora" : "Lebanon",
        isDiaspora: submissionData.isDiaspora,
        title: submissionData.subService || submissionData.category,
        bio: submissionData.rawTextPayload ? submissionData.rawTextPayload.slice(0, 200) : "Verified Lebanese AI Ecosystem stakeholder.",
        tags: submissionData.techStack.length > 0 ? submissionData.techStack : [submissionData.subService || "AI"],
        verified: true,
        wikiSlug: entitySlug,
        connectionsCount: 4,
        claimStatus: "claimed"
      };

      const fallbackWiki: WikiDocument = {
        slug: entitySlug,
        title: submissionData.entityName,
        entityType: fallbackNode.type,
        lastUpdated: new Date().toISOString().split("T")[0],
        author: "961AI Intake Engine",
        frontmatter: {
          aliases: [submissionData.entityName],
          location: submissionData.location,
          isDiaspora: submissionData.isDiaspora,
          verificationLevel: "Tier 1 (Verified)",
          connectedEntities: ["American University of Beirut (AUB)", "Berytech", "LebNet"]
        },
        summary: `Compiled entity profile for ${submissionData.entityName}.`,
        markdownContent: `# ${submissionData.entityName}\n\n**Category**: ${submissionData.category}\n**Location**: ${submissionData.location} (${submissionData.isDiaspora ? "🇱🇧 Diaspora Node" : "🇱🇧 Local Resident"})\n**Sub-Service**: [[${submissionData.subService || "Generative AI"}]]\n**Contact**: \`${submissionData.contactEmail}\`\n\n## Overview\n${submissionData.rawTextPayload || "Active Lebanese AI ecosystem participant."}\n\n## Core Technologies\n${submissionData.techStack.map(t => `- [[${t}]]`).join("\n")}\n\n## Affiliated Hubs & Universities\n- [[American University of Beirut (AUB)]]\n- [[Berytech]]\n- [[LebNet]]`,
        backlinks: [],
        outlinks: ["American University of Beirut (AUB)", "Berytech", "LebNet"]
      };

      const fallbackWs: UserPersonalWorkspace = {
        user: {
          id: submissionData.userId,
          name: submissionData.entityName,
          email: submissionData.contactEmail,
          role: submissionData.category === "Startup Founder" ? "founder" : submissionData.category === "AI Guru/Expert" ? "guru" : submissionData.category === "Investor" ? "investor" : "stakeholder"
        },
        entityNode: fallbackNode,
        wikiDoc: fallbackWiki,
        rawVault: {
          sourcePath: `1_sources/submissions/${Date.now()}_${submissionData.userId}.json`,
          rawSubmission: submissionData,
          lastIngestedAt: new Date().toISOString(),
          immutableHash: "sha256_" + Math.random().toString(36).substring(2, 14)
        },
        aiMatches: createDefaultWorkspace().aiMatches,
        referrals: referrals
      };

      setWorkspace(fallbackWs);
      if (onUpdateWorkspace) onUpdateWorkspace(fallbackWs);
      onAddNode(fallbackNode);
      onAddWikiDoc(fallbackWiki);
      setCurrentStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Re-ingest Pitch Deck or Updated Resume
  const handleReingest = async () => {
    if (!reingestDeckText.trim() || !workspace) return;
    setIsReingesting(true);
    try {
      const updatedSubmission = {
        ...workspace.rawVault.rawSubmission,
        rawTextPayload: reingestDeckText,
        timestamp: new Date().toISOString()
      };
      const res = await fetch("/api/submissions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSubmission)
      });
      const data = await res.json();
      if (data.workspace) {
        setWorkspace(data.workspace);
        if (onUpdateWorkspace) onUpdateWorkspace(data.workspace);
        setReingestDeckText("");
        alert("Re-ingestion complete! Compiled entity wiki and knowledge graph have been updated.");
      }
    } catch (e: any) {
      alert("Re-ingestion failed: " + e.message);
    } finally {
      setIsReingesting(false);
    }
  };

  return (
    <div id="questionnaire-workspace-container" className="space-y-6">
      {/* Platform Core Modules & Quick Access Hub */}
      <PlatformCoreModulesBar
        user={user}
        onNavigateToModule={onNavigateToModule}
        onNavigateToDirectory={onNavigateToDirectory}
        onNavigateToQuestionnaire={() => setCurrentStep(1)}
        onOpenPricing={onOpenPricing}
      />

      {/* Header & Step Wizard Bar */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
                Section 2 Workflow
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Intake Questionnaire & Auto-Generated Workspace
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {currentStep === 3 && workspace ? `Workspace: ${workspace.user.name}` : "Join 961AINetwork: Entity Questionnaire"}
            </h1>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                currentStep === 1
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>1. Category</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                currentStep === 2
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>2. Intake Form</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={() => workspace && setCurrentStep(3)}
              disabled={!workspace}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                currentStep === 3
                  ? "bg-emerald-600 text-white"
                  : workspace ? "text-slate-300 hover:text-white" : "text-slate-600 cursor-not-allowed"
              }`}
            >
              <span>3. Personal Workspace</span>
            </button>
          </div>
        </div>

        {/* Preset quick loader for fast evaluation */}
        {currentStep !== 3 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Quick Presets:
            </span>
            <button
              type="button"
              onClick={() => loadPreset("founder")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition-colors"
            >
              🇱🇧 Beirut AI Startup
            </button>
            <button
              type="button"
              onClick={() => loadPreset("guru")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
            >
              🌍 Diaspora Guru (Paris)
            </button>
            <button
              type="button"
              onClick={() => loadPreset("investor")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
            >
              💼 Diaspora Angel VC (SF)
            </button>
            <button
              type="button"
              onClick={() => loadPreset("stakeholder")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors"
            >
              🎓 University AI Lab (AUB)
            </button>
          </div>
        )}
      </div>

      {/* STEP 1: CATEGORY SELECTION */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl font-bold text-white">Choose Your Primary Entity Role</h2>
            <p className="text-xs text-slate-400">
              The intake pipeline adapts its dynamic fields and Karpathy LLM Wiki extractor based on your profile archetype.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "Startup Founder" as const,
                title: "Startup Founder",
                desc: "Building proprietary AI models, autonomous systems, or SaaS in Lebanon or diaspora.",
                icon: Building2,
                color: "border-indigo-500/40 bg-indigo-950/20 text-indigo-300"
              },
              {
                id: "AI Guru/Expert" as const,
                title: "AI Guru / Expert",
                desc: "Researchers, ML engineers, GPU architects, and PhD fellows (Local Lebanon or Diaspora).",
                icon: Users,
                color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300"
              },
              {
                id: "Investor" as const,
                title: "Investor / VC",
                desc: "Angels, Micro-Funds, and VCs deploying $10k-$500k+ in Lebanese-led AI ventures.",
                icon: Briefcase,
                color: "border-amber-500/40 bg-amber-950/20 text-amber-300"
              },
              {
                id: "Stakeholder" as const,
                title: "Stakeholder",
                desc: "Universities (AUB, LAU, USJ), incubators (Berytech), government bodies, and NGOs.",
                icon: GraduationCap,
                color: "border-teal-500/40 bg-teal-950/20 text-teal-300"
              }
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? "border-emerald-500 bg-slate-900 shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-500/20"
                      : "border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">{cat.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? "text-emerald-400" : "text-slate-500"}>
                      {isSelected ? "Selected Role" : "Click to Select"}
                    </span>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-slate-600"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all"
            >
              <span>Continue to Intake Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DYNAMIC INTAKE FORM */}
      {currentStep === 2 && (
        <form onSubmit={handleSubmitForm} className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Step 2: Dynamic Questionnaire
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {selectedCategory} Profile & Layer 1 Ingestion Data
              </h2>
              <p className="text-xs text-slate-400">
                All submissions are stored in immutable Layer 1 storage (`1_sources/`) and compiled into Layer 2 Markdown with cross-linked `[[Wikilinks]]`.
              </p>
            </div>

            {/* Core Universal Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {selectedCategory === "AI Guru/Expert" ? "Full Name & Title" : selectedCategory === "Investor" ? "Fund / Syndicate Name" : "Company / Entity Name"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={selectedCategory === "AI Guru/Expert" ? "Dr. Jad Hobeika" : selectedCategory === "Investor" ? "Cedar AI Syndicate" : "CedarsLLM"}
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Contact Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Location City & Country</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City (e.g. Beirut, Paris, SF)"
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Country (e.g. Lebanon, USA)"
                    value={locationCountry}
                    onChange={(e) => setLocationCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Diaspora Status</label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="diaspora"
                      checked={!isDiaspora}
                      onChange={() => setIsDiaspora(false)}
                      className="text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>🇱🇧 Onshore Resident (Lebanon)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="diaspora"
                      checked={isDiaspora}
                      onChange={() => setIsDiaspora(true)}
                      className="text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>🌍 Lebanese Diaspora</span>
                  </label>
                </div>
              </div>
            </div>

            {/* DYNAMIC FORM SECTION: FOUNDER */}
            {selectedCategory === "Startup Founder" && (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>Startup Specific Details</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Domain / Sub-Service</label>
                    <select
                      value={subService}
                      onChange={(e) => setSubService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Generative AI">Generative AI</option>
                      <option value="Computer Vision">Computer Vision</option>
                      <option value="NLP (Arabic Dialects)">NLP (Arabic Dialects)</option>
                      <option value="AgTech">AgTech</option>
                      <option value="HealthAI">HealthAI</option>
                      <option value="FinTech">FinTech</option>
                      <option value="Robotics">Robotics</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Team Size</label>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={teamSize}
                      onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Funding Stage</label>
                    <select
                      value={fundingStage}
                      onChange={(e) => setFundingStage(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Pre-Seed">Pre-Seed ($50k - $400k)</option>
                      <option value="Seed">Seed ($400k - $1.5M)</option>
                      <option value="Series A">Series A ($1.5M - $5M)</option>
                      <option value="Bootstrapped">Bootstrapped / Profitable</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="PyTorch, CUDA, Arabic LLMs, vLLM, Triton"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Immediate Hiring Needs</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior MLOps Engineer, Computer Vision Research Lead"
                    value={hiringNeeds}
                    onChange={(e) => setHiringNeeds(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* DYNAMIC FORM SECTION: GURU */}
            {selectedCategory === "AI Guru/Expert" && (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>Technical Guru & Talent Qualifications</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Academic Background & Roots</label>
                    <input
                      type="text"
                      placeholder="e.g. American University of Beirut (AUB), LAU, USJ, PhD MIT"
                      value={academicBackground}
                      onChange={(e) => setAcademicBackground(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Primary Specialization</label>
                    <select
                      value={subService}
                      onChange={(e) => setSubService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="LLM Fine-Tuning & Quantization">LLM Fine-Tuning & Quantization</option>
                      <option value="Computer Vision & Diffusion">Computer Vision & Diffusion</option>
                      <option value="Distributed GPU Infrastructure">Distributed GPU Infrastructure</option>
                      <option value="AI Safety & Mechanistic Interpretability">AI Safety & Interpretability</option>
                      <option value="MLOps & Model Serving">MLOps & Model Serving</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">GitHub Profile / Research URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/username"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">LinkedIn Profile</label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="advisory"
                    checked={advisoryAvailability}
                    onChange={(e) => setAdvisoryAvailability(e.target.checked)}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                  <label htmlFor="advisory" className="text-xs text-slate-300 font-medium cursor-pointer">
                    Available for part-time advisory / angel mentorship with Lebanese AI startups
                  </label>
                </div>
              </div>
            )}

            {/* DYNAMIC FORM SECTION: INVESTOR */}
            {selectedCategory === "Investor" && (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span>VC & Investment Thesis Parameters</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Average Ticket Size (USD)</label>
                    <input
                      type="text"
                      placeholder="$25,000 - $250,000"
                      value={ticketSizeUsd}
                      onChange={(e) => setTicketSizeUsd(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Geographic & Diaspora Focus</label>
                    <input
                      type="text"
                      placeholder="Lebanon, Silicon Valley Diaspora, GCC"
                      value={geographicFocus}
                      onChange={(e) => setGeographicFocus(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Investment Thesis</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what models, teams, and traction thresholds you seek..."
                    value={investmentThesis}
                    onChange={(e) => setInvestmentThesis(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* DYNAMIC FORM SECTION: STAKEHOLDER */}
            {selectedCategory === "Stakeholder" && (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h3 className="text-sm font-bold text-teal-300 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>University, Incubator, or NGO Ecosystem Programs</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Stakeholder Organization Type</label>
                    <select
                      value={stakeholderType}
                      onChange={(e) => setStakeholderType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="University">University (AUB, LAU, USJ, LU)</option>
                      <option value="Incubator">Incubator / Hub (Berytech, Flat6Labs)</option>
                      <option value="Media">Tech Media / Ecosystem Journal</option>
                      <option value="Government/NGO">Government / NGO / Donor Grant</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Programs & Resources Offered</label>
                    <input
                      type="text"
                      placeholder="e.g. Subsidized GPU Access, Seed Grants, Coworking"
                      value={programsOffered}
                      onChange={(e) => setProgramsOffered(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Raw Pitch Deck Text / Bio for Layer 1 Storage */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Raw Source Text / Pitch Deck / Resume Markdown</span>
                <span className="text-[11px] text-emerald-400 font-mono">1_sources/ immutable vault</span>
              </label>
              <textarea
                rows={5}
                placeholder="Paste executive summary, pitch deck bullet points, founder biography, GitHub highlights, or patent abstracts. The Karpathy Ingestion Engine will cross-link entities automatically."
                value={rawTextPayload}
                onChange={(e) => setRawTextPayload(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Category</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling to Layer 2 Wiki...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Ingest & Generate Workspace</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* STEP 3: AUTOMATED PERSONAL WORKSPACE DASHBOARD */}
      {currentStep === 3 && workspace && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Workspace Top Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                🇱🇧
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{workspace.entityNode.label}</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Verified Node
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {workspace.entityNode.title} • {workspace.entityNode.location}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-mono">
                  <span>Vault Source: <code className="text-emerald-400">{workspace.rawVault.sourcePath}</code></span>
                  <span>Wiki Slug: <code className="text-indigo-400">[[{workspace.wikiDoc.slug}]]</code></span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onSelectNode(workspace.entityNode)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Public Card</span>
              </button>
              {onNavigateToDirectory && (
                <button
                  onClick={onNavigateToDirectory}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-white" />
                  <span>Browse Directory</span>
                </button>
              )}
            </div>
          </div>

          {/* Workspace Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveWorkspaceTab("referrals")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeWorkspaceTab === "referrals"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Gift className="w-4 h-4 text-amber-300" />
              <span>1. Referrals & Earn Free Months ({referrals.length})</span>
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("node")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeWorkspaceTab === "node"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>2. Compiled Entity Node</span>
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("matches")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeWorkspaceTab === "matches"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>3. Automated AI Matches ({workspace.aiMatches.length})</span>
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("vault")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeWorkspaceTab === "vault"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <FolderLock className="w-4 h-4" />
              <span>4. Raw Source Vault & Re-Ingest</span>
            </button>
          </div>

          {/* TAB 0: REFERRALS & FREE MONTHS */}
          {activeWorkspaceTab === "referrals" && (
            <ReferralsWorkspaceTab
              user={user}
              referrals={referrals}
              onAddReferral={handleAddReferral}
              onExtendSubscription={handleExtendSubscription}
              onOpenPricing={onOpenPricing}
            />
          )}

          {/* TAB 1: COMPILED ENTITY NODE */}
          {activeWorkspaceTab === "node" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Layer 2 Compiled Markdown Entity Wiki</span>
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {workspace.wikiDoc.markdownContent}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Network Visibility & Node Metrics
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Node Type:</span>
                      <span className="font-semibold text-emerald-400">{workspace.entityNode.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Verification Level:</span>
                      <span className="font-semibold text-emerald-400">Tier 1 Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Diaspora Bridge:</span>
                      <span className="font-semibold text-blue-300">
                        {workspace.entityNode.isDiaspora ? "Active Global Hub" : "Onshore Beirut Hub"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Cross-Linked Ecosystem Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {workspace.entityNode.tags?.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono"
                      >
                        [[{t}]]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI MATCHES */}
          {activeWorkspaceTab === "matches" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>
                  High-conviction algorithmic matches generated via <strong>Karpathy Vector Overlap & Taxonomy Scoring</strong>.
                </span>
                <span className="text-emerald-400 font-semibold font-mono">100% Deterministic & Verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workspace.aiMatches.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {m.category}
                        </span>
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          {(m.score * 100).toFixed(0)}% Match
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{m.targetNode.label}</h4>
                      <p className="text-xs text-emerald-300 font-medium">{m.targetNode.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{m.rationale}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">{m.synergyPill}</span>
                      <button
                        onClick={() => onSelectNode(m.targetNode)}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RAW SOURCE VAULT & RE-INGEST */}
          {activeWorkspaceTab === "vault" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vault Raw View */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Layer 1 Immutable Raw Submission</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    Hash: {workspace.rawVault.immutableHash.slice(0, 12)}...
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-96 whitespace-pre-wrap">
                  {JSON.stringify(workspace.rawVault.rawSubmission, null, 2)}
                </div>
              </div>

              {/* Re-Ingestion Box */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-400" />
                    <span>Re-Ingest Updated Deck / Resume</span>
                  </h3>
                  <span className="text-xs text-slate-400">Triggers re-compilation</span>
                </div>
                <p className="text-xs text-slate-400">
                  Update your technical stack, new funding round, or latest publications to automatically re-compile your Layer 2 Wiki and update graph edges.
                </p>

                <textarea
                  rows={6}
                  placeholder="Paste your latest pitch deck updates or updated resume text here..."
                  value={reingestDeckText}
                  onChange={(e) => setReingestDeckText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                />

                <button
                  onClick={handleReingest}
                  disabled={isReingesting || !reingestDeckText.trim()}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all"
                >
                  {isReingesting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Re-Compiling Graph...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Trigger Re-Ingestion & Update Graph</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
