import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Send,
  Sparkles,
  Plus,
  RefreshCw,
  FileText,
  BookOpen,
  Database,
  Users,
  Code2,
  Terminal,
  CheckCircle2,
  Filter,
  Search,
  Trophy,
  ExternalLink,
  ShieldCheck,
  Award,
  Flame,
  Zap,
  GitBranch,
  ArrowUpRight,
  Tag,
  Radio,
  Check,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import {
  CommunityContribution,
  ContributionComment,
  ContributionType,
  UserAuthSession
} from "../../types";

interface CommunityActivityFeedProps {
  user: UserAuthSession | null;
  onNavigateToWiki?: () => void;
  onNavigateToYellowPages?: () => void;
  onNavigateToMatchmaking?: () => void;
  onNavigateToSandbox?: () => void;
  onNavigateToNews?: () => void;
  onAwardUserXp?: (amount: number, reason: string) => void;
}

const INITIAL_CONTRIBUTIONS: CommunityContribution[] = [
  {
    id: "contrib-1",
    type: "wiki_edit",
    title: "Updated Law 126/2019 Offshore S.A.L. MoET Digital Stamp Filing Guide",
    description: "Added a step-by-step walkthrough for navigating the newly digitized Ministry of Economy & Trade (MoET) e-portal for foreign direct investment exemption filings and zero-tax holding entity validations.",
    authorName: "Layla Haddad",
    authorRole: "Tech Attorney & Offshore Specialist",
    authorLocation: "Paris / Beirut Bar",
    authorTier: "DeepTech Contributor",
    isDiaspora: true,
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    createdAt: "4m ago",
    timestamp: Date.now() - 4 * 60 * 1000,
    upvotes: 28,
    userUpvoted: false,
    xpEarned: 250,
    cedarCreditsEarned: 80,
    tags: ["#Law126", "#OffshoreSAL", "#MoET", "#LegalWiki"],
    actionModuleTarget: "wiki",
    actionLabel: "Read in Second Brain Wiki",
    metaDetails: {
      diffSnippet: "+ Added Section 4.3: Digital Stamp e-Receipt Submission Checklist\n+ Added MoET Circular #2026-08 compliance notes for AI holding cos."
    },
    comments: [
      {
        id: "c-101",
        authorId: "u-jad",
        authorName: "Dr. Jad Makdissi",
        authorRole: "NLP Research Lead @ AUB",
        authorTier: "Sovereign AI Architect",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        content: "Extremely helpful Layla! Our spin-out from AUB was waiting on this exact clarification for IP assignment to an offshore structure.",
        createdAt: "2m ago",
        timestamp: Date.now() - 2 * 60 * 1000,
        upvotes: 6
      }
    ]
  },
  {
    id: "contrib-2",
    type: "shared_resource",
    title: "Published Open-Source Dataset: Beirut-NLP 12,000 Levantine Audio Pairs",
    description: "Released on HuggingFace Hub: 50+ hours of verified Lebanese Arabic spoken audio paired with normalized Arabic text and phoneme alignments, annotated by AUB & LAU linguistics fellows.",
    authorName: "Dr. Jad Makdissi",
    authorRole: "NLP Research Lead @ AUB / CedarsAI",
    authorLocation: "Beirut, Lebanon",
    authorTier: "Sovereign AI Architect",
    isDiaspora: false,
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    createdAt: "18m ago",
    timestamp: Date.now() - 18 * 60 * 1000,
    upvotes: 54,
    userUpvoted: true,
    xpEarned: 500,
    cedarCreditsEarned: 180,
    tags: ["#ArabicNLP", "#HuggingFace", "#LevantineSpeech", "#OpenSource"],
    externalUrl: "https://huggingface.co/datasets/aub-nlp/levantine-speech-v1",
    actionModuleTarget: "sandbox",
    actionLabel: "Test in LLM Sandbox",
    metaDetails: {
      resourceSize: "1.4 GB • 12,480 Audio Clips • Apache-2.0 License"
    },
    comments: [
      {
        id: "c-102",
        authorId: "u-kareem",
        authorName: "Kareem Abboud",
        authorRole: "Edge ML Engineer @ Beirut Labs",
        authorTier: "Cedar Seedling",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        content: "Tested fine-tuning Whisper-small on this dataset—word error rate on Beirut slang dropped from 28% to 6.2%! Amazing work.",
        createdAt: "10m ago",
        timestamp: Date.now() - 10 * 60 * 1000,
        upvotes: 9
      },
      {
        id: "c-103",
        authorId: "u-nadia",
        authorName: "Nadia Khoury",
        authorRole: "Angel Syndicate Partner (Ex-Stripe)",
        authorTier: "Diaspora Catalyst",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        content: "This is precisely the sovereign moat global LLMs lack. Sharing this with our AI founders in the Bay Area diaspora syndicate.",
        createdAt: "5m ago",
        timestamp: Date.now() - 5 * 60 * 1000,
        upvotes: 4
      }
    ]
  },
  {
    id: "contrib-3",
    type: "successful_match",
    title: "Syndicate Match: San Francisco Diaspora Angel Syndicate ➔ MedLevant AI",
    description: "Successful matchmaking bridge completed! MedLevant AI (autonomous Arabic clinical triage) connected with 3 Silicon Valley Lebanese tech executives, closing a $175k seed syndicate allocation.",
    authorName: "Nadia Khoury",
    authorRole: "Diaspora Angel Syndicate Partner",
    authorLocation: "San Francisco, USA",
    authorTier: "Diaspora Catalyst",
    isDiaspora: true,
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    createdAt: "45m ago",
    timestamp: Date.now() - 45 * 60 * 1000,
    upvotes: 62,
    userUpvoted: false,
    xpEarned: 1000,
    cedarCreditsEarned: 350,
    tags: ["#DiasporaSyndicate", "#HealthTechAI", "#SeedRound", "#Matchmaking"],
    actionModuleTarget: "matchmaking",
    actionLabel: "View Matchmaking Portal",
    metaDetails: {
      dealAmount: "$175,000 USD SAFE Note • 3 Angel Allocations"
    },
    comments: [
      {
        id: "c-104",
        authorId: "u-tarek",
        authorName: "Tarek Salam",
        authorRole: "Founder & CTO @ MedLevant AI",
        authorTier: "DeepTech Contributor",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        content: "Huge thank you to Nadia and the 961 Network! The diligence was fast, and the intros were direct to partners who understand MENA health regulations.",
        createdAt: "30m ago",
        timestamp: Date.now() - 30 * 60 * 1000,
        upvotes: 14
      }
    ]
  },
  {
    id: "contrib-4",
    type: "open_source_code",
    title: "Merged PR #24: Offline-First SQLite Local Cache for Low-Bandwidth Edge Relays",
    description: "Contributed an ultra-compact SQLite query cache and Brotli stream compressor to keep the 961 AI Edge Bot functioning during generator cuts and high-latency mobile 3G/4G in rural Lebanon.",
    authorName: "Kareem Abboud",
    authorRole: "Edge ML Engineer @ Beirut Labs",
    authorLocation: "Tripoli / BDD, Lebanon",
    authorTier: "Cedar Seedling",
    isDiaspora: false,
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    createdAt: "1h ago",
    timestamp: Date.now() - 60 * 60 * 1000,
    upvotes: 39,
    userUpvoted: false,
    xpEarned: 800,
    cedarCreditsEarned: 250,
    tags: ["#EdgeAI", "#LowBandwidth", "#OpenSource", "#SQLite"],
    externalUrl: "https://github.com/961-ai-network/edge-relay/pull/24",
    actionModuleTarget: "sandbox",
    actionLabel: "View Code in Sandbox",
    metaDetails: {
      repoName: "961-ai-network/edge-relay • +482 lines / -64 lines"
    },
    comments: []
  },
  {
    id: "contrib-5",
    type: "bounty_completed",
    title: "Verified Commercial Registry Sijil Tijari for 4 Bekaa & Tripoli Startups",
    description: "Completed Quest #102 verification bounty: verified registration certificates, Ministry of Finance tax numbers, and Law 126 offshore resolutions for AgriDrone Bekaa, CedarsBio, PhoeniciaRobotics, and LevantNLP.",
    authorName: "Tarek Salam",
    authorRole: "Founder & CTO @ MedLevant AI",
    authorLocation: "Beirut / BDD",
    authorTier: "DeepTech Contributor",
    isDiaspora: false,
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    createdAt: "2h ago",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    upvotes: 31,
    userUpvoted: false,
    xpEarned: 500,
    cedarCreditsEarned: 150,
    tags: ["#BountyCompleted", "#YellowPagesVerification", "#DueDiligence"],
    actionModuleTarget: "directory",
    actionLabel: "View Verified Startups in Directory",
    metaDetails: {
      dealAmount: "4 Startups Awarded Gold Institutional Badge"
    },
    comments: [
      {
        id: "c-105",
        authorId: "u-layla",
        authorName: "Layla Haddad",
        authorRole: "Tech Attorney",
        authorTier: "DeepTech Contributor",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        content: "Audited all 4 filings—flawless legal paperwork and 100% compliant with Law 126/2019.",
        createdAt: "1h ago",
        timestamp: Date.now() - 60 * 60 * 1000,
        upvotes: 5
      }
    ]
  },
  {
    id: "contrib-6",
    type: "research_note",
    title: "Published Technical Note: 4-bit AWQ Quantization on Consumer GPUs for Lebanese Edge Servers",
    description: "Detailed benchmarks showing how Lebanese startups can run Mistral-7B and Llama-3 in Levantine dialect at 42 tokens/sec on sub-$400 RTX 3060 graphics cards under fluctuating generator voltage.",
    authorName: "Dr. Jad Makdissi",
    authorRole: "NLP Research Lead @ AUB",
    authorLocation: "Beirut, Lebanon",
    authorTier: "Sovereign AI Architect",
    isDiaspora: false,
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    createdAt: "3h ago",
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    upvotes: 46,
    userUpvoted: false,
    xpEarned: 600,
    cedarCreditsEarned: 200,
    tags: ["#Quantization", "#AWQ", "#EdgeHardware", "#AUBResearch"],
    actionModuleTarget: "wiki",
    actionLabel: "Read Research Note in Wiki",
    metaDetails: {
      paperTitle: "Hardware-Constrained Sovereign AI in Developing Grids (AUB Preprint)"
    },
    comments: []
  }
];

export const CommunityActivityFeed: React.FC<CommunityActivityFeedProps> = ({
  user,
  onNavigateToWiki,
  onNavigateToYellowPages,
  onNavigateToMatchmaking,
  onNavigateToSandbox,
  onNavigateToNews,
  onAwardUserXp
}) => {
  const [contributions, setContributions] = useState<CommunityContribution[]>(INITIAL_CONTRIBUTIONS);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "upvotes" | "comments">("latest");
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    "contrib-1": true,
    "contrib-2": true
  });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [isSubmittingComment, setIsSubmittingComment] = useState<Record<string, boolean>>({});
  
  // Create Contribution Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newType, setNewType] = useState<ContributionType>("wiki_edit");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newExternalUrl, setNewExternalUrl] = useState("");
  const [newTags, setNewTags] = useState("#Law126, #LebaneseAI");
  const [newActionTarget, setNewActionTarget] = useState<"wiki" | "directory" | "matchmaking" | "sandbox" | "news">("wiki");
  const [newMetaSnippet, setNewMetaSnippet] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLiveRelayActive, setIsLiveRelayActive] = useState(true);

  // Auto-clear Toast
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  // Upvote Handler
  const handleToggleUpvote = (contribId: string) => {
    setContributions((prev) =>
      prev.map((item) => {
        if (item.id === contribId) {
          const isCurrentlyUpvoted = !!item.userUpvoted;
          const newUpvotes = isCurrentlyUpvoted ? item.upvotes - 1 : item.upvotes + 1;
          
          if (!isCurrentlyUpvoted && onAwardUserXp) {
            onAwardUserXp(5, "Community Upvote Engagement");
          }

          return {
            ...item,
            upvotes: newUpvotes,
            userUpvoted: !isCurrentlyUpvoted
          };
        }
        return item;
      })
    );
  };

  // Upvote Comment Handler
  const handleToggleCommentUpvote = (contribId: string, commentId: string) => {
    setContributions((prev) =>
      prev.map((item) => {
        if (item.id === contribId) {
          const updatedComments = item.comments.map((c) => {
            if (c.id === commentId) {
              const isUpvoted = !!c.userUpvoted;
              return {
                ...c,
                upvotes: isUpvoted ? c.upvotes - 1 : c.upvotes + 1,
                userUpvoted: !isUpvoted
              };
            }
            return c;
          });
          return { ...item, comments: updatedComments };
        }
        return item;
      })
    );
  };

  // Toggle Comment Thread
  const toggleCommentThread = (contribId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [contribId]: !prev[contribId]
    }));
  };

  // Submit New Comment
  const handleAddComment = (contribId: string) => {
    const text = commentInputs[contribId]?.trim();
    if (!text) return;

    setIsSubmittingComment((prev) => ({ ...prev, [contribId]: true }));

    setTimeout(() => {
      const newComment: ContributionComment = {
        id: `c-${Date.now()}`,
        authorId: user?.id || "user-current",
        authorName: user?.name || "Ecosystem Contributor",
        authorRole: user?.role === "guest" ? "Community Contributor" : user?.affiliation || "AI Builder & Founder",
        authorTier: user?.cedarTier || "Cedar Seedling",
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        content: text,
        createdAt: "Just now",
        timestamp: Date.now(),
        upvotes: 1,
        userUpvoted: true
      };

      setContributions((prev) =>
        prev.map((item) => {
          if (item.id === contribId) {
            return {
              ...item,
              comments: [newComment, ...item.comments]
            };
          }
          return item;
        })
      );

      setCommentInputs((prev) => ({ ...prev, [contribId]: "" }));
      setIsSubmittingComment((prev) => ({ ...prev, [contribId]: false }));
      
      // Auto expand comments
      setExpandedComments((prev) => ({ ...prev, [contribId]: true }));

      if (onAwardUserXp) {
        onAwardUserXp(15, "Insightful Discussion Comment");
      }

      setToastMessage("💬 Comment posted! You earned +15 Cedar XP.");
    }, 400);
  };

  // Submit New Contribution
  const handleCreateContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const parsedTags = newTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    const newEntry: CommunityContribution = {
      id: `contrib-${Date.now()}`,
      type: newType,
      title: newTitle.trim(),
      description: newDescription.trim(),
      authorName: user?.name || "Ecosystem Contributor",
      authorRole: user?.affiliation || "DeepTech Founder & Contributor",
      authorLocation: "Beirut / Global Diaspora",
      authorTier: user?.cedarTier || "DeepTech Contributor",
      isDiaspora: false,
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      createdAt: "Just now",
      timestamp: Date.now(),
      upvotes: 1,
      userUpvoted: true,
      xpEarned: 250,
      cedarCreditsEarned: 75,
      tags: parsedTags.length > 0 ? parsedTags : ["#LebanonAI", "#CommunityContribution"],
      externalUrl: newExternalUrl.trim() || undefined,
      actionModuleTarget: newActionTarget,
      actionLabel:
        newActionTarget === "wiki"
          ? "Read in Second Brain Wiki"
          : newActionTarget === "directory"
          ? "View in Yellow Pages"
          : newActionTarget === "matchmaking"
          ? "Open Matchmaking Portal"
          : newActionTarget === "sandbox"
          ? "Test in Sandbox"
          : "Read in News Hub",
      metaDetails: newMetaSnippet.trim() ? { diffSnippet: newMetaSnippet.trim() } : undefined,
      comments: []
    };

    setContributions([newEntry, ...contributions]);
    setIsCreateModalOpen(false);
    setNewTitle("");
    setNewDescription("");
    setNewExternalUrl("");
    setNewMetaSnippet("");

    if (onAwardUserXp) {
      onAwardUserXp(75, "Published Community Contribution");
    }

    setToastMessage("🎉 Awesome! Your contribution was published to the live feed (+75 XP awarded).");
  };

  // Navigation Router Helper
  const handleRouteTarget = (target?: "wiki" | "directory" | "matchmaking" | "sandbox" | "news") => {
    if (!target) return;
    if (target === "wiki" && onNavigateToWiki) onNavigateToWiki();
    else if (target === "directory" && onNavigateToYellowPages) onNavigateToYellowPages();
    else if (target === "matchmaking" && onNavigateToMatchmaking) onNavigateToMatchmaking();
    else if (target === "sandbox" && onNavigateToSandbox) onNavigateToSandbox();
    else if (target === "news" && onNavigateToNews) onNavigateToNews();
  };

  // Helper Badge Color & Icon for Type
  const getTypeBadge = (type: ContributionType) => {
    switch (type) {
      case "wiki_edit":
        return {
          label: "Wiki & Knowledge Edit",
          icon: <BookOpen className="w-3.5 h-3.5 text-sky-600" />,
          bgColor: "bg-sky-50 text-sky-800 border-sky-200"
        };
      case "shared_resource":
        return {
          label: "Shared Dataset & Resource",
          icon: <Database className="w-3.5 h-3.5 text-emerald-600" />,
          bgColor: "bg-emerald-50 text-emerald-800 border-emerald-200"
        };
      case "successful_match":
        return {
          label: "Successful Deal / Angel Match",
          icon: <Users className="w-3.5 h-3.5 text-purple-600" />,
          bgColor: "bg-purple-50 text-purple-800 border-purple-200"
        };
      case "open_source_code":
        return {
          label: "Open Source AI Code / PR",
          icon: <Code2 className="w-3.5 h-3.5 text-indigo-600" />,
          bgColor: "bg-indigo-50 text-indigo-800 border-indigo-200"
        };
      case "bounty_completed":
        return {
          label: "Verified Quest Bounty",
          icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />,
          bgColor: "bg-amber-50 text-amber-800 border-amber-200"
        };
      case "research_note":
        return {
          label: "Research Preprint Note",
          icon: <FileText className="w-3.5 h-3.5 text-teal-600" />,
          bgColor: "bg-teal-50 text-teal-800 border-teal-200"
        };
      default:
        return {
          label: "Contribution",
          icon: <Sparkles className="w-3.5 h-3.5 text-slate-600" />,
          bgColor: "bg-slate-50 text-slate-800 border-slate-200"
        };
    }
  };

  // Filtered & Sorted Contributions
  const filteredContributions = contributions.filter((item) => {
    const matchesType = selectedTypeFilter === "all" || item.type === selectedTypeFilter;
    const query = searchFilter.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.authorName.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query));
    return matchesType && matchesSearch;
  });

  const sortedContributions = [...filteredContributions].sort((a, b) => {
    if (sortBy === "upvotes") return b.upvotes - a.upvotes;
    if (sortBy === "comments") return b.comments.length - a.comments.length;
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white border border-emerald-500/50 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Live Pulse Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-800/40 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                LIVE COMMUNITY TELEMETRY & FEED
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Relay: Beirut Digital District ➔ SF / Paris Syndicate
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Real-Time Community Contributions & Peer Activity
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track live updates across Lebanon's AI ecosystem: new second brain wiki articles, open-source Levantine datasets, verified Law 126/2019 legal filings, and closed angel investment syndicates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Share Contribution (+75 XP)</span>
            </button>
          </div>
        </div>

        {/* Live Activity Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-white/10 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-[11px] block">Total Contributions</span>
            <strong className="text-sm text-white font-bold">{contributions.length + 148} Logged</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-[11px] block">XP Distributed Today</span>
            <strong className="text-sm text-amber-300 font-bold">14,350 XP</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-[11px] block">Active Peer Upvotes</span>
            <strong className="text-sm text-emerald-300 font-bold">
              {contributions.reduce((acc, c) => acc + c.upvotes, 0) + 420} Upvotes
            </strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-[11px] block">Live Status</span>
            <strong className="text-sm text-teal-300 font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Instant Sync
            </strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search contributions by title, tags, AUB dataset, Law 126, or contributor..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder-slate-400"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="latest">Latest (Real-Time)</option>
              <option value="upvotes">Highest Upvoted</option>
              <option value="comments">Most Discussed</option>
            </select>
          </div>
        </div>

        {/* Category Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {[
            { id: "all", label: `All Items (${contributions.length})` },
            { id: "wiki_edit", label: "Wiki Edits" },
            { id: "shared_resource", label: "Shared Datasets & Resources" },
            { id: "successful_match", label: "Successful Matches" },
            { id: "bounty_completed", label: "Verified Bounties" },
            { id: "open_source_code", label: "Open Source AI Code" },
            { id: "research_note", label: "Preprint Notes" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTypeFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTypeFilter === tab.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {sortedContributions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No matching community contributions</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or filter criteria, or share the first contribution for this topic!
            </p>
            <button
              onClick={() => {
                setSelectedTypeFilter("all");
                setSearchFilter("");
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          sortedContributions.map((item) => {
            const typeInfo = getTypeBadge(item.type);
            const isCommentsExpanded = !!expandedComments[item.id];
            const currentCommentInput = commentInputs[item.id] || "";
            const isSubmittingThis = !!isSubmittingComment[item.id];

            return (
              <div
                key={item.id}
                className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-200 transition-all shadow-xs space-y-4"
              >
                {/* Header Author Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
                      alt={item.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-slate-900">
                          {item.authorName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold font-mono border border-slate-200">
                          {item.authorTier}
                        </span>
                        {item.isDiaspora && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold font-mono border border-indigo-200">
                            Diaspora Hub
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>{item.authorRole}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {item.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Type Badge & Reward Pill */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${typeInfo.bgColor}`}
                    >
                      {typeInfo.icon}
                      <span>{typeInfo.label}</span>
                    </span>
                    {item.xpEarned && (
                      <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        +{item.xpEarned} XP • +{item.cedarCreditsEarned} Credits
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="space-y-2.5">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Meta Snippet Box */}
                  {item.metaDetails && (
                    <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] border border-slate-800 space-y-1">
                      {item.metaDetails.diffSnippet && (
                        <pre className="whitespace-pre-wrap font-mono text-emerald-400 leading-tight overflow-x-auto">
                          {item.metaDetails.diffSnippet}
                        </pre>
                      )}
                      {item.metaDetails.resourceSize && (
                        <div className="text-teal-300 font-mono">
                          📁 {item.metaDetails.resourceSize}
                        </div>
                      )}
                      {item.metaDetails.dealAmount && (
                        <div className="text-amber-300 font-mono font-bold">
                          🤝 Syndicate Closed: {item.metaDetails.dealAmount}
                        </div>
                      )}
                      {item.metaDetails.repoName && (
                        <div className="text-indigo-300 font-mono">
                          📦 {item.metaDetails.repoName}
                        </div>
                      )}
                      {item.metaDetails.paperTitle && (
                        <div className="text-sky-300 font-mono">
                          📄 {item.metaDetails.paperTitle}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-mono cursor-pointer transition-all"
                        onClick={() => setSearchFilter(tag.replace("#", ""))}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  {/* Upvote & Comment Toggle Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleUpvote(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        item.userUpvoted
                          ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                          : "bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-slate-200"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{item.upvotes}</span>
                      <span className="hidden sm:inline font-normal">Upvotes</span>
                    </button>

                    <button
                      onClick={() => toggleCommentThread(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.comments.length}</span>
                      <span className="hidden sm:inline font-normal">Comments</span>
                      {isCommentsExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Module Navigation / External Link CTA */}
                  <div className="flex items-center gap-2">
                    {item.actionModuleTarget && (
                      <button
                        onClick={() => handleRouteTarget(item.actionModuleTarget)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <span>{item.actionLabel || "View in Module"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                      </button>
                    )}

                    {item.externalUrl && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <span>External Source</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Collapsible Discussion / Comments Drawer */}
                {isCommentsExpanded && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Community Discussion ({item.comments.length})</span>
                    </h4>

                    {/* Comments List */}
                    <div className="space-y-2.5">
                      {item.comments.length === 0 ? (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-400">
                          No comments yet. Start the conversation!
                        </div>
                      ) : (
                        item.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <img
                                  src={comment.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
                                  alt={comment.authorName}
                                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                                />
                                <span className="font-bold text-slate-900">
                                  {comment.authorName}
                                </span>
                                {comment.authorTier && (
                                  <span className="px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700 text-[10px] font-mono">
                                    {comment.authorTier}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                                <button
                                  onClick={() => handleToggleCommentUpvote(item.id, comment.id)}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 border transition-all ${
                                    comment.userUpvoted
                                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                  }`}
                                >
                                  <ThumbsUp className="w-2.5 h-2.5" />
                                  <span>{comment.upvotes}</span>
                                </button>
                              </div>
                            </div>
                            <p className="text-slate-700 text-xs leading-relaxed pl-8">
                              {comment.content}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Inline Comment Input Box */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={currentCommentInput}
                        onChange={(e) =>
                          setCommentInputs({ ...commentInputs, [item.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleAddComment(item.id);
                          }
                        }}
                        placeholder="Write a constructive peer response or insight (+15 XP)..."
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400"
                      />
                      <button
                        onClick={() => handleAddComment(item.id)}
                        disabled={!currentCommentInput.trim() || isSubmittingThis}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmittingThis ? "Posting..." : "Reply"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CREATE CONTRIBUTION MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Publish Community Contribution
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Share an open dataset, wiki edit, syndicate match, or code commit (+75 XP)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateContribution} className="space-y-4 text-xs">
              {/* Type Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Contribution Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ContributionType)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="wiki_edit">📖 Wiki & Knowledge Base Edit</option>
                  <option value="shared_resource">🗄️ Shared Dataset / Model / Benchmark</option>
                  <option value="successful_match">🤝 Successful Deal / Investor Match</option>
                  <option value="open_source_code">💻 Open Source Code / Pull Request</option>
                  <option value="bounty_completed">🛡️ Verified Bounty Diligence / Law 126</option>
                  <option value="research_note">📄 Research Preprint Commentary</option>
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Published Levantine Arabic Dialect Benchmark v2 on HuggingFace"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Summary & Key Takeaways</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your dataset, legal finding under Law 126/2019, angel deal match, or code optimization..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-400 resize-none"
                />
              </div>

              {/* Technical Code Snippet or Deal Detail */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">
                  Technical Details / Diff / Dataset Spec (Optional)
                </label>
                <input
                  type="text"
                  value={newMetaSnippet}
                  onChange={(e) => setNewMetaSnippet(e.target.value)}
                  placeholder="e.g. + Added Section 3.2 on Commercial Registry e-filing or 2,500 audio clips"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Link & Module Target */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">External URL / GitHub / HuggingFace</label>
                  <input
                    type="url"
                    value={newExternalUrl}
                    onChange={(e) => setNewExternalUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Connect to 961 Module</label>
                  <select
                    value={newActionTarget}
                    onChange={(e) => setNewActionTarget(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="wiki">Second Brain Wiki</option>
                    <option value="directory">Yellow Pages Directory</option>
                    <option value="matchmaking">Matchmaking Portal</option>
                    <option value="sandbox">Developer Sandbox</option>
                    <option value="news">News Hub</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="#Law126, #ArabicNLP, #AUB"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-400 font-mono text-[11px]"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold">Contributor Incentive:</span>
                </div>
                <span className="font-mono font-bold text-xs">+75 Cedar XP & +25 Cedar Credits</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish to Live Feed</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
