import React, { useState } from "react";
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  Gift,
  Zap,
  Target,
  Users,
  Compass,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Globe,
  Database,
  Cpu,
  Terminal,
  ExternalLink,
  Search,
  Filter,
  Layers,
  Crown,
  HelpCircle,
  TrendingUp,
  Clock,
  Code2,
  FileCheck,
  Check,
  Copy,
  Info,
  Calendar,
  DollarSign,
  Radio,
  Activity,
  MessageSquare
} from "lucide-react";
import {
  CommunityQuest,
  CommunityBadge,
  EcosystemRedeemableService,
  LeaderboardContributor,
  UserAuthSession,
  QuestCategory
} from "../../types";
import { CommunityActivityFeed } from "./CommunityActivityFeed";

interface ModuleGamifiedCommunityProps {
  user: UserAuthSession | null;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  onNavigateToYellowPages: () => void;
  onNavigateToWiki: () => void;
  onNavigateToMatchmaking: () => void;
  onNavigateToSandbox: () => void;
  onNavigateToNews: () => void;
}

const INITIAL_QUESTS: CommunityQuest[] = [
  {
    id: "quest-101",
    title: "Annotate 50 Levantine Dialect Audio-Text Snippets",
    category: "Arabic Dialect & Datasets",
    description: "Contribute to Lebanon's open-source Levantine Arabic benchmark dataset. Listen to 10-second audio clips and verify or edit phonetic transcriptions and emotion tags.",
    xpReward: 350,
    cedarCreditsReward: 100,
    cashEquivalentUsd: 25,
    difficulty: "Beginner",
    status: "available",
    proofRequirement: "Submit your HuggingFace or 961 Dataset contributor handle with completed 50-item annotation batch.",
    estimatedTimeMin: 15,
    sponsorOrg: "AUB Natural Language Processing Lab",
    submissionCount: 42,
    maxSubmissions: 100,
    badgeRewardId: "badge-dialect",
    actionCta: "Start Annotation Batch"
  },
  {
    id: "quest-102",
    title: "Verify Sijil Tijari & Law 126 Compliance for 3 Startups",
    category: "Startup Verification & Diligence",
    description: "Review Commercial Registry documentation and Offshore S.A.L. articles of association for newly submitted startups to award Tier-1 Institutional Verified status.",
    xpReward: 500,
    cedarCreditsReward: 150,
    cashEquivalentUsd: 40,
    difficulty: "Intermediate",
    status: "available",
    proofRequirement: "Submit verified Commercial Registry filing registration numbers and date stamps.",
    estimatedTimeMin: 20,
    sponsorOrg: "Lebanon Tech Legal Hub & MoET",
    submissionCount: 18,
    maxSubmissions: 30,
    badgeRewardId: "badge-legal",
    actionCta: "Review Pending Filings"
  },
  {
    id: "quest-103",
    title: "Publish Peer Review on AUB/LAU DeepTech Preprint",
    category: "Research Peer Review",
    description: "Provide structured technical commentary, reproducibility checks, or dataset verification on a published Lebanese AI paper in computer vision, robotics, or LLM quantization.",
    xpReward: 600,
    cedarCreditsReward: 200,
    cashEquivalentUsd: 50,
    difficulty: "Advanced",
    status: "available",
    proofRequirement: "Submit link to your public review or arXiv/OpenReview discussion comment.",
    estimatedTimeMin: 30,
    sponsorOrg: "Lebanese AI Academic Syndicate",
    submissionCount: 9,
    maxSubmissions: 25,
    badgeRewardId: "badge-curator",
    actionCta: "Claim Preprint for Review"
  },
  {
    id: "quest-104",
    title: "Facilitate 1 Verified Diaspora Angel Introduction",
    category: "Diaspora Capital Bridge",
    description: "Connect an active Silicon Valley, London, Paris, or Dubai diaspora angel investor with an onshore Lebanese Seed/Pre-Seed founder through the Matchmaking syndicate.",
    xpReward: 1000,
    cedarCreditsReward: 350,
    cashEquivalentUsd: 100,
    difficulty: "Master",
    status: "available",
    proofRequirement: "Both founder and investor confirm introductory call completion via the 961 Matchmaking Portal.",
    estimatedTimeMin: 45,
    sponsorOrg: "Lebanese Tech Diaspora Syndicate",
    submissionCount: 27,
    maxSubmissions: 50,
    badgeRewardId: "badge-angel",
    actionCta: "Bridge an Angel Intro"
  },
  {
    id: "quest-105",
    title: "Contribute 1 PR to 961 Sovereign Open-Source Repo",
    category: "Open Source AI Code",
    description: "Submit a merged pull request to our low-bandwidth WhatsApp Edge relay, Karpathy Markdown compiler, or Neo4j Cypher optimization library on GitHub.",
    xpReward: 800,
    cedarCreditsReward: 250,
    cashEquivalentUsd: 75,
    difficulty: "Advanced",
    status: "available",
    proofRequirement: "Submit merged GitHub PR link.",
    estimatedTimeMin: 40,
    sponsorOrg: "961 AI Core Engineering Guild",
    submissionCount: 14,
    maxSubmissions: 30,
    badgeRewardId: "badge-coder",
    actionCta: "View GitHub Issues"
  },
  {
    id: "quest-106",
    title: "Refer 2 Lebanese AI Founders to the Directory",
    category: "Ecosystem Growth",
    description: "Invite 2 fellow Lebanese AI startup founders or research scaleups to complete their entity intake and create their verified Second Brain wiki document.",
    xpReward: 450,
    cedarCreditsReward: 150,
    cashEquivalentUsd: 35,
    difficulty: "Beginner",
    status: "available",
    proofRequirement: "Referred founders complete signup using your unique referral code or link.",
    estimatedTimeMin: 10,
    sponsorOrg: "961 Growth & Community",
    submissionCount: 65,
    maxSubmissions: 200,
    badgeRewardId: "badge-ambassador",
    actionCta: "Get Referral Link"
  }
];

const INITIAL_BADGES: CommunityBadge[] = [
  {
    id: "badge-dialect",
    title: "Levantine Dialect Pioneer",
    description: "Contributed 50+ validated Levantine Arabic phonetic and semantic annotations.",
    tier: "Gold",
    iconName: "Globe",
    unlocked: true,
    unlockedAt: "Aug 2026",
    perkDescription: "+10% XP multiplier on all dataset bounties"
  },
  {
    id: "badge-legal",
    title: "Offshore Legal Eagle",
    description: "Verified 3+ Lebanese Law 126/2019 Offshore S.A.L. company registrations.",
    tier: "Silver",
    iconName: "ShieldCheck",
    unlocked: false,
    perkDescription: "Access to private Tech Sandbox policy review board"
  },
  {
    id: "badge-angel",
    title: "Diaspora Bridge Catalyst",
    description: "Successfully facilitated verified angel investments between diaspora and Beirut.",
    tier: "Cedar Diamond",
    iconName: "Crown",
    unlocked: false,
    perkDescription: "VIP invitation to Annual Beirut DeepTech Investor Gala"
  },
  {
    id: "badge-curator",
    title: "Second Brain Curator",
    description: "Published 5+ peer reviews or comprehensive Obsidian-style wiki documents.",
    tier: "Gold",
    iconName: "Database",
    unlocked: true,
    unlockedAt: "Jul 2026",
    perkDescription: "Permanent highlight badge on public Yellow Pages profile"
  },
  {
    id: "badge-coder",
    title: "Sovereign Code Architect",
    description: "Authored merged core code in 961 AI open-source repositories.",
    tier: "Silver",
    iconName: "Terminal",
    unlocked: false,
    perkDescription: "Priority queuing for Cloud GPU compute clusters"
  },
  {
    id: "badge-ambassador",
    title: "Cedar Ecosystem Ambassador",
    description: "Onboarded 5+ verified founders into the 961 AI Network.",
    tier: "Gold",
    iconName: "Users",
    unlocked: true,
    unlockedAt: "Aug 2026",
    perkDescription: "Free Annual Pro Subscription Extension (+1 Full Year)"
  }
];

const REDEEMABLE_SERVICES: EcosystemRedeemableService[] = [
  {
    id: "srv-gpu-100",
    title: "$200 Cloud GPU Compute Grant (A100 / H100)",
    category: "Compute & Infrastructure",
    providerName: "961 AI Sovereign Compute Cluster & Cloud Partners",
    description: "Dedicated GPU cloud compute credits for fine-tuning Arabic LLMs, training computer vision checkpoints, or running quantized model inference.",
    costXp: 1200,
    costCedarCredits: 400,
    usdValue: 200,
    deliveryFormat: "API Credit Key",
    stockAvailable: 8,
    eligibilityTier: "DeepTech Contributor"
  },
  {
    id: "srv-vc-clinic",
    title: "1-on-1 VC Pitch Deck & Diligence Clinic",
    category: "Capital & Advisory",
    providerName: "Silicon Valley & Paris Lebanese Diaspora Syndicate",
    description: "45-minute private pitch review, financial model teardown, and direct syndicate introduction with a seasoned Lebanese diaspora VC partner.",
    costXp: 1800,
    costCedarCredits: 600,
    usdValue: 350,
    deliveryFormat: "1-on-1 Session",
    stockAvailable: 4,
    eligibilityTier: "Diaspora Catalyst"
  },
  {
    id: "srv-legal-offshore",
    title: "Law 126/2019 Offshore S.A.L. Legal Consultation",
    category: "Legal & Compliance",
    providerName: "Beirut Bar Association Tech Guild & Partner Law Firms",
    description: "Full legal guidance on 0% tax corporate structuring, drafting articles of association, Commercial Registry (Sijil Tijari) filing, and Bar retainer rules.",
    costXp: 1500,
    costCedarCredits: 500,
    usdValue: 500,
    deliveryFormat: "Legal Voucher",
    stockAvailable: 5,
    eligibilityTier: "DeepTech Contributor"
  },
  {
    id: "srv-bdd-pass",
    title: "1-Week BDD / Berytech Coworking & Lab Flex Pass",
    category: "Ecosystem Perks",
    providerName: "Beirut Digital District & Berytech Innovation Hubs",
    description: "Flexible desk access, meeting rooms, high-speed uninterrupted fiber internet, and 24/7 solar backup power across Beirut innovation hubs.",
    costXp: 800,
    costCedarCredits: 250,
    usdValue: 75,
    deliveryFormat: "Instant Code",
    stockAvailable: 15,
    eligibilityTier: "Cedar Seedling"
  },
  {
    id: "srv-pro-year",
    title: "12-Month 961 AI Annual Pro Membership Waiver",
    category: "Platform Boosts",
    providerName: "961 AI Network Foundation",
    description: "Waives the standard $100/year subscription. Gives unlimited AI Second Brain ingestion, unrestricted VC matchmaking, and Tier-1 Verified badge.",
    costXp: 2000,
    costCedarCredits: 700,
    usdValue: 100,
    deliveryFormat: "Instant Code",
    stockAvailable: 12,
    eligibilityTier: "Diaspora Catalyst"
  },
  {
    id: "srv-spotlight",
    title: "Featured Yellow Pages Spotlight & Top Banner (1 Month)",
    category: "Platform Boosts",
    providerName: "961 AI Network Directory",
    description: "Positions your startup or agency at the very top of the Yellow Pages Directory with a glowing premier badge and featured newsletter mention.",
    costXp: 1100,
    costCedarCredits: 350,
    usdValue: 150,
    deliveryFormat: "Instant Code",
    stockAvailable: 6,
    eligibilityTier: "DeepTech Contributor"
  }
];

const LEADERBOARD_USERS: LeaderboardContributor[] = [
  {
    rank: 1,
    userId: "u-jad",
    name: "Dr. Jad Makdissi",
    role: "NLP Research Lead @ AUB / CedarsAI",
    location: "Beirut, Lebanon",
    isDiaspora: false,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tier: "Sovereign AI Architect",
    level: 14,
    xp: 4850,
    questsCompleted: 24,
    badgesCount: 6,
    streakDays: 42,
    topBadge: "Levantine Dialect Pioneer"
  },
  {
    rank: 2,
    userId: "u-nadia",
    name: "Nadia Khoury",
    role: "Angel Syndicate Partner (Ex-Stripe)",
    location: "San Francisco, USA",
    isDiaspora: true,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    tier: "Diaspora Catalyst",
    level: 11,
    xp: 3720,
    questsCompleted: 17,
    badgesCount: 5,
    streakDays: 28,
    topBadge: "Diaspora Bridge Catalyst"
  },
  {
    rank: 3,
    userId: "u-tarek",
    name: "Tarek Salam",
    role: "Founder & CTO @ MedLevant AI",
    location: "Beirut / BDD, Lebanon",
    isDiaspora: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    tier: "DeepTech Contributor",
    level: 9,
    xp: 2950,
    questsCompleted: 14,
    badgesCount: 4,
    streakDays: 19,
    topBadge: "Second Brain Curator"
  },
  {
    rank: 4,
    userId: "u-layla",
    name: "Layla Haddad",
    role: "Tech Attorney & Offshore Specialist",
    location: "Paris, France / Beirut",
    isDiaspora: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    tier: "DeepTech Contributor",
    level: 8,
    xp: 2400,
    questsCompleted: 11,
    badgesCount: 4,
    streakDays: 15,
    topBadge: "Offshore Legal Eagle"
  },
  {
    rank: 5,
    userId: "u-kareem",
    name: "Kareem Abboud",
    role: "Edge ML Engineer @ Beirut Labs",
    location: "Tripoli / Beirut, Lebanon",
    isDiaspora: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    tier: "Cedar Seedling",
    level: 6,
    xp: 1650,
    questsCompleted: 8,
    badgesCount: 3,
    streakDays: 11,
    topBadge: "Sovereign Code Architect"
  }
];

export const ModuleGamifiedCommunity: React.FC<ModuleGamifiedCommunityProps> = ({
  user,
  onOpenPricing,
  onOpenAuth,
  onNavigateToYellowPages,
  onNavigateToWiki,
  onNavigateToMatchmaking,
  onNavigateToSandbox,
  onNavigateToNews
}) => {
  const [activeTab, setActiveTab] = useState<"quests" | "services" | "activity" | "flywheel" | "badges" | "leaderboard">("quests");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Gamification User State Simulation
  const [userXp, setUserXp] = useState(user?.xp || 1450);
  const [userCredits, setUserCredits] = useState(user?.credits || 420);
  const [userStreak, setUserStreak] = useState(14);
  const [completedQuests, setCompletedQuests] = useState<string[]>(["quest-101"]);
  const [claimedQuests, setClaimedQuests] = useState<string[]>([]);
  const [redeemedServiceVouchers, setRedeemedServiceVouchers] = useState<Record<string, string>>({});

  // Modal / Interaction State
  const [activeQuestModal, setActiveQuestModal] = useState<CommunityQuest | null>(null);
  const [submissionProofText, setSubmissionProofText] = useState("");
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState("");
  const [redeemingServiceModal, setRedeemingServiceModal] = useState<EcosystemRedeemableService | null>(null);
  const [redeemSuccessCode, setRedeemSuccessCode] = useState<string | null>(null);

  // Level & Tier Calculation
  const calculateLevel = (xp: number) => Math.floor(xp / 300) + 1;
  const currentLevel = calculateLevel(userXp);
  const nextLevelXp = currentLevel * 300;
  const currentLevelBaseXp = (currentLevel - 1) * 300;
  const progressInLevel = Math.min(100, Math.max(0, ((userXp - currentLevelBaseXp) / 300) * 100));

  const getTierFromXp = (xp: number): "Cedar Seedling" | "DeepTech Contributor" | "Diaspora Catalyst" | "Sovereign AI Architect" => {
    if (xp >= 5000) return "Sovereign AI Architect";
    if (xp >= 2500) return "Diaspora Catalyst";
    if (xp >= 1000) return "DeepTech Contributor";
    return "Cedar Seedling";
  };

  const currentTier = getTierFromXp(userXp);

  // Filtered Quests
  const filteredQuests = INITIAL_QUESTS.filter((q) => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  // Handle Quest Claim & Submission
  const handleClaimQuest = (quest: CommunityQuest) => {
    if (!claimedQuests.includes(quest.id)) {
      setClaimedQuests([...claimedQuests, quest.id]);
    }
    setActiveQuestModal(quest);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuestModal || !submissionProofText.trim()) return;

    setIsSubmittingProof(true);
    setTimeout(() => {
      setIsSubmittingProof(false);
      setUserXp((prev) => prev + activeQuestModal.xpReward);
      setUserCredits((prev) => prev + activeQuestModal.cedarCreditsReward);
      setCompletedQuests((prev) => [...prev, activeQuestModal.id]);
      setSubmissionSuccessMsg(
        `🎉 Verified! Awarded +${activeQuestModal.xpReward} XP and +${activeQuestModal.cedarCreditsReward} Cedar Credits!`
      );
      setTimeout(() => {
        setSubmissionSuccessMsg("");
        setActiveQuestModal(null);
        setSubmissionProofText("");
      }, 2200);
    }, 1200);
  };

  // Handle Service Redemption
  const handleRedeemService = (service: EcosystemRedeemableService) => {
    if (userXp < service.costXp || userCredits < service.costCedarCredits) {
      alert("Insufficient XP or Cedar Credits to redeem this service. Complete more community quests to unlock it!");
      return;
    }

    const voucherCode = `CEDAR-${service.category.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setUserCredits((prev) => prev - service.costCedarCredits);
    setRedeemedServiceVouchers((prev) => ({ ...prev, [service.id]: voucherCode }));
    setRedeemSuccessCode(voucherCode);
  };

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-900">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 md:p-10 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wide">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>GAMIFIED COMMUNITY WORKFLOW & ECOSYSTEM REWARDS</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Earn XP, Complete Bounties & Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-teal-300">Sovereign DeepTech Services</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Gamify your contributions to Lebanon's AI ecosystem. Annotate Levantine Arabic datasets, verify offshore startups under Law 126/2019, peer-review university preprints, or bridge diaspora capital to earn Cedar XP, unlock prestigious badges, and redeem real compute, legal, and mentorship grants.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab("activity")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>Real-Time Feed & Upvotes</span>
            </button>
            <button
              onClick={() => setActiveTab("quests")}
              className="px-4 py-2.5 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Browse Active Quests ({INITIAL_QUESTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>Redeemable Ecosystem Services</span>
            </button>
            <button
              onClick={() => setActiveTab("flywheel")}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-teal-300" />
              <span>Why Gamification Works</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Progress & XP Dashboard Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white">
              {currentLevel}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">
                  {user?.name || "Community Founder / Contributor"}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
                  {currentTier}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Level {currentLevel} • {userXp} Total XP • Lebanese AI Second Brain Citizen
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 font-mono text-center">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] text-amber-700 font-bold block uppercase flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-amber-600" /> Streak
              </span>
              <strong className="text-base text-amber-900 font-black">{userStreak} Days</strong>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 font-bold block uppercase flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600" /> Cedar Credits
              </span>
              <strong className="text-base text-emerald-900 font-black">{userCredits} pts</strong>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
              <span className="text-[10px] text-indigo-700 font-bold block uppercase flex items-center justify-center gap-1">
                <Award className="w-3 h-3 text-indigo-600" /> Quests Done
              </span>
              <strong className="text-base text-indigo-900 font-black">{completedQuests.length}</strong>
            </div>
          </div>
        </div>

        {/* Progress Bar to Next Level */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-600">
              Progress to <strong>Level {currentLevel + 1}</strong>
            </span>
            <span className="text-emerald-700 font-bold">
              {userXp} / {nextLevelXp} XP ({Math.round(progressInLevel)}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-500"
              style={{ width: `${progressInLevel}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Level {currentLevel} ({currentLevelBaseXp} XP)</span>
            <span>+{(nextLevelXp - userXp)} XP to Next Level Up</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "activity"
              ? "bg-emerald-800 text-white shadow-sm"
              : "bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
          }`}
        >
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>1. Live Feed & Contributions (Real-Time)</span>
        </button>

        <button
          onClick={() => setActiveTab("quests")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "quests"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Target className="w-4 h-4 text-amber-400" />
          <span>2. Community Quests & Bounties ({INITIAL_QUESTS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "services"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Gift className="w-4 h-4 text-emerald-400" />
          <span>3. Suggested Services Hub ({REDEEMABLE_SERVICES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("flywheel")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "flywheel"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-teal-400" />
          <span>4. Gamified Flywheel Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab("badges")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "badges"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Award className="w-4 h-4 text-indigo-400" />
          <span>5. Badges & Cedar Tiers ({INITIAL_BADGES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "leaderboard"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>6. Community Leaderboard</span>
        </button>
      </div>

      {/* TAB: REAL-TIME COMMUNITY CONTRIBUTIONS FEED */}
      {activeTab === "activity" && (
        <div className="animate-in fade-in duration-200">
          <CommunityActivityFeed
            user={user}
            onNavigateToWiki={onNavigateToWiki}
            onNavigateToYellowPages={onNavigateToYellowPages}
            onNavigateToMatchmaking={onNavigateToMatchmaking}
            onNavigateToSandbox={onNavigateToSandbox}
            onNavigateToNews={onNavigateToNews}
            onAwardUserXp={(amount, reason) => {
              setUserXp((prev) => prev + amount);
              setUserCredits((prev) => prev + Math.floor(amount / 3));
            }}
          />
        </div>
      )}

      {/* TAB 1: QUESTS & BOUNTIES BOARD */}
      {activeTab === "quests" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search bounties, Arabic datasets, legal reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Arabic Dialect & Datasets">Arabic Dialect & Datasets</option>
                <option value="Startup Verification & Diligence">Startup Verification & Diligence</option>
                <option value="Research Peer Review">Research Peer Review</option>
                <option value="Diaspora Capital Bridge">Diaspora Capital Bridge</option>
                <option value="Open Source AI Code">Open Source AI Code</option>
                <option value="Ecosystem Growth">Ecosystem Growth</option>
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 focus:outline-none"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Master">Master</option>
              </select>
            </div>
          </div>

          {/* Quests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredQuests.map((quest) => {
              const isCompleted = completedQuests.includes(quest.id);
              const isClaimed = claimedQuests.includes(quest.id);

              return (
                <div
                  key={quest.id}
                  className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-4 shadow-xs ${
                    isCompleted
                      ? "border-emerald-300 bg-emerald-50/20"
                      : "border-slate-200 hover:border-emerald-500/60 hover:shadow-md"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {quest.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          quest.difficulty === "Beginner"
                            ? "bg-emerald-100 text-emerald-800"
                            : quest.difficulty === "Intermediate"
                            ? "bg-teal-100 text-teal-800"
                            : quest.difficulty === "Advanced"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {quest.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {quest.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {quest.description}
                    </p>

                    {quest.sponsorOrg && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                        <Building2Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Sponsor: {quest.sponsorOrg}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    {/* Rewards Row */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                          +{quest.xpReward} XP
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          +{quest.cedarCreditsReward} Credits
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~{quest.estimatedTimeMin}m
                      </span>
                    </div>

                    {/* Action Button */}
                    {isCompleted ? (
                      <div className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Completed & Verified</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaimQuest(quest)}
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>{isClaimed ? "Submit Proof / Verification" : quest.actionCta || "Claim Bounty"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SUGGESTED SERVICES HUB (REDEMPTION) */}
      {activeTab === "services" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white border border-emerald-800/50 space-y-2">
            <span className="text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
              COMMUNITY SERVICE EXCHANGE
            </span>
            <h2 className="text-2xl font-black text-white">
              Redeem Your Cedar Credits & XP for Real DeepTech Services
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              We partnered with leading Lebanese venture firms, university labs, and legal guilds to convert community cognitive contributions into tangible startup subsidies, cloud compute, and mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REDEEMABLE_SERVICES.map((srv) => {
              const isRedeemed = !!redeemedServiceVouchers[srv.id];
              const canAfford = userXp >= srv.costXp && userCredits >= srv.costCedarCredits;

              return (
                <div
                  key={srv.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {srv.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ${srv.usdValue} Value
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600 space-y-1">
                      <div><strong>Provider:</strong> {srv.providerName}</div>
                      <div><strong>Format:</strong> {srv.deliveryFormat}</div>
                      <div><strong>Required Tier:</strong> {srv.eligibilityTier}</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Cost:</span>
                      <span className="font-bold text-slate-900">
                        {srv.costXp} XP + {srv.costCedarCredits} Credits
                      </span>
                    </div>

                    {isRedeemed ? (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span>Voucher Active:</span>
                          <span className="text-emerald-700">{redeemedServiceVouchers[srv.id]}</span>
                        </div>
                        <p className="text-[10px] text-emerald-800">
                          Present this voucher code to partner or use in platform checkout.
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRedeemService(srv)}
                        disabled={!canAfford}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          canAfford
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        }`}
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>{canAfford ? "Redeem Service Voucher" : "Insufficient XP / Credits"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: THE GAMIFIED FLYWHEEL ARCHITECTURE (SPECIAL EXPLANATION SECTION) */}
      {activeTab === "flywheel" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 space-y-3">
            <h3 className="text-lg font-black text-amber-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <span>The Economic Mechanics: Why a Gamified Community is the Secret Weapon for Lebanese AI</span>
            </h3>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              Traditional startup directories and tech aggregators die because databases become stale within 6 months. By aligning micro-incentives, XP progression, and tangible venture perks, 961 AI Network turns its community into self-healing, crowdsourced intelligence nodes.
            </p>
          </div>

          {/* 4 Loop Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-mono text-sm">
                  01
                </span>
                <h4 className="text-base font-bold text-slate-900">Perpetual Graph Hygiene & Verification</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Founders and legal specialists earn Cedar XP by auditing startup profiles, confirming Law 126/2019 Offshore S.A.L. registration numbers, and updating round closures. This guarantees institutional-grade accuracy for visiting venture funds.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
                🔄 <strong>Result:</strong> Zero stale data; real-time capitalization and hiring telemetry.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold font-mono text-sm">
                  02
                </span>
                <h4 className="text-base font-bold text-slate-900">Sovereign Levantine NLP Dataset Mining</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Global models lack dialectal nuance. Community audio and transcription micro-tasks crowdsource authentic Levantine Arabic phonetics, sentiment tags, and Franco-Arabic slang, creating the Middle East's highest-quality open benchmark.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
                🔄 <strong>Result:</strong> High-margin proprietary foundation models for MENA enterprise banking and telecom.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold font-mono text-sm">
                  03
                </span>
                <h4 className="text-base font-bold text-slate-900">Diaspora Angel Scout Network</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lebanese tech leaders at Google, Meta, OpenAI, and Stripe earn prestigious "Diaspora Bridge Catalyst" badges by facilitating syndicate rounds and hosting pitch clinics for Beirut scaleups.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
                🔄 <strong>Result:</strong> Rapid capitalization of seed-stage Lebanese startups in hard currency ($ USD).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-mono text-sm">
                  04
                </span>
                <h4 className="text-base font-bold text-slate-900">Cognitive Contribution to Real Service Subsidies</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike hollow gamification points, Cedar XP is directly redeemable for GPU compute clusters ($200 grants), BDD passes, and legal retainer subsidies, lowering capital barriers for early-stage builders.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
                🔄 <strong>Result:</strong> Direct economic velocity injected back into Lebanese founders.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BADGES & CEDAR TIERS */}
      {activeTab === "badges" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INITIAL_BADGES.map((b) => (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  b.unlocked
                    ? "bg-white border-emerald-300 shadow-xs"
                    : "bg-slate-50/70 border-slate-200 opacity-70"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        b.tier === "Cedar Diamond"
                          ? "bg-purple-100 text-purple-700"
                          : b.tier === "Gold"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        b.unlocked
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {b.unlocked ? `Unlocked (${b.unlockedAt})` : "Locked Badge"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-emerald-800">
                  <strong>Unlocked Perk:</strong> {b.perkDescription}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: LEADERBOARD */}
      {activeTab === "leaderboard" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Lebanese Sovereign AI Community Leaderboard</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Updated hourly based on verified quest completions, dataset submissions, and angel syndicate bridges.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Season 1: Cedar Genesis
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {LEADERBOARD_USERS.map((contributor) => (
                <div
                  key={contributor.userId}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-all text-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        contributor.rank === 1
                          ? "bg-amber-400 text-slate-950 shadow-xs"
                          : contributor.rank === 2
                          ? "bg-slate-300 text-slate-800"
                          : contributor.rank === 3
                          ? "bg-amber-700 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      #{contributor.rank}
                    </span>

                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 text-sm font-bold">{contributor.name}</strong>
                        {contributor.isDiaspora && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                            Diaspora
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-[11px]">{contributor.role} • {contributor.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 font-mono text-[11px] self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">TIER</span>
                      <span className="text-emerald-700 font-bold">{contributor.tier}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">TOTAL XP</span>
                      <strong className="text-slate-900 text-sm font-bold">{contributor.xp} XP</strong>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">STREAK</span>
                      <span className="text-amber-600 font-bold flex items-center gap-0.5 justify-end">
                        <Flame className="w-3 h-3" /> {contributor.streakDays}d
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quest Submission Modal */}
      {activeQuestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                  {activeQuestModal.category}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{activeQuestModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveQuestModal(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeQuestModal.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Reward:</span>
                <span className="font-bold text-emerald-700">+{activeQuestModal.xpReward} XP / +{activeQuestModal.cedarCreditsReward} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Requirement:</span>
                <span className="text-slate-800">{activeQuestModal.proofRequirement}</span>
              </div>
            </div>

            {submissionSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center animate-in fade-in">
                {submissionSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proof of Completion (URL, GitHub PR, Registration # or Notes):
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. https://github.com/... or Commercial Registry # 1204899 or dataset batch handle..."
                    value={submissionProofText}
                    onChange={(e) => setSubmissionProofText(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveQuestModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingProof || !submissionProofText.trim()}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                  >
                    {isSubmittingProof ? "Verifying Proof..." : "Submit Proof & Claim XP"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
