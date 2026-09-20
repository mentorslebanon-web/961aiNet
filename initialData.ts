import React, { useState, useMemo } from "react";
import { 
  EcosystemIdea, 
  IdeaCategory, 
  IdeaStatus, 
  EcosystemContributor,
  IdeaNotification
} from "../../../types";
import { 
  Lightbulb, 
  Send, 
  ThumbsUp, 
  MessageSquare, 
  Filter, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Award, 
  User, 
  Paperclip, 
  ExternalLink, 
  Sparkles, 
  X, 
  SlidersHorizontal, 
  Mail, 
  Phone, 
  FileText, 
  Layers, 
  BarChart3, 
  HelpCircle, 
  Shield, 
  Bell, 
  Check, 
  Users,
  ChevronLeft,
  Calendar,
  Smartphone,
  CheckCheck,
  RotateCcw,
  Zap,
  Volume2,
  Play
} from "lucide-react";

interface EcosystemFeedbackPlatformProps {
  ideas: EcosystemIdea[];
  contributors: EcosystemContributor[];
  onUpvote: (id: string) => void;
  onSubmitIdea: (newIdea: Partial<EcosystemIdea>) => Promise<void>;
  onAddComment: (ideaId: string, authorName: string, authorRole: string, text: string) => Promise<void>;
  onUpdateStatus: (ideaId: string, status: IdeaStatus, adminNotes?: string) => Promise<void>;
  onPostOfficialUpdate: (ideaId: string, title: string, notes: string) => Promise<void>;
  onSendPrivateResponse: (ideaId: string, message: string, channel: "Email" | "SMS" | "Portal DM") => Promise<void>;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  automatedNotifications?: IdeaNotification[];
  onClearNotifications?: () => void;
}

export const EcosystemFeedbackPlatform: React.FC<EcosystemFeedbackPlatformProps> = ({
  ideas,
  contributors,
  onUpvote,
  onSubmitIdea,
  onAddComment,
  onUpdateStatus,
  onPostOfficialUpdate,
  onSendPrivateResponse,
  isSubmitModalOpen,
  setIsSubmitModalOpen,
  automatedNotifications = [],
  onClearNotifications
}) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"explore" | "pipeline" | "analytics" | "my_submissions">("explore");
  
  // Notification Drawer & Trigger Toast
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [automatedTriggerToast, setAutomatedTriggerToast] = useState<{
    ideaTitle: string;
    status: IdeaStatus;
    recipient: string;
    time: string;
    channel: string;
  } | null>(null);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);

  // User submitted idea IDs (tracked in "My Submissions")
  const [userSubmittedIdeaIds, setUserSubmittedIdeaIds] = useState<string[]>(["idea-1"]);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    title: string;
    category: IdeaCategory;
    submitterName: string;
    submitterEmail: string;
    submitterPhone: string;
    status: IdeaStatus;
    createdAt: string;
  } | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"upvotes" | "newest" | "comments">("upvotes");

  // Carousel State
  const [currentStep, setCurrentStep] = useState(0);

  // Selected Idea for Detail Modal
  const [selectedIdea, setSelectedIdea] = useState<EcosystemIdea | null>(null);

  // Inline Quick Comment Section State (for Explore Idea cards)
  const [expandedCommentIdeaId, setExpandedCommentIdeaId] = useState<string | null>(null);
  const [inlineCommentAuthor, setInlineCommentAuthor] = useState("Community Member");
  const [inlineCommentRole, setInlineCommentRole] = useState("AI Ecosystem Participant");
  const [inlineCommentText, setInlineCommentText] = useState("");
  const [isSubmittingInlineComment, setIsSubmittingInlineComment] = useState(false);

  // Comment Form State
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("Community Member");
  const [commentRole, setCommentRole] = useState("AI Ecosystem Participant");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Admin Actions State
  const [adminActiveIdea, setAdminActiveIdea] = useState<EcosystemIdea | null>(null);
  const [adminActionType, setAdminActionType] = useState<"status" | "update" | "private" | null>(null);
  const [newStatus, setNewStatus] = useState<IdeaStatus>("Under Review");
  const [adminNotes, setAdminNotes] = useState("");
  const [officialUpdateTitle, setOfficialUpdateTitle] = useState("");
  const [officialUpdateNotes, setOfficialUpdateNotes] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
  const [privateChannel, setPrivateChannel] = useState<"Email" | "SMS" | "Portal DM">("Email");
  const [adminSuccessToast, setAdminSuccessToast] = useState<string | null>(null);

  // Submission Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<IdeaCategory>("Infrastructure");
  const [formProblem, setFormProblem] = useState("");
  const [formSolution, setFormSolution] = useState("");
  const [formImpact, setFormImpact] = useState("");
  const [formFeedbackPref, setFormFeedbackPref] = useState<
    "Mentorship/Coaching" | "Direct Connect with Admin/Regulators" | "Public Ecosystem Discussion" | "Resource/Funding Guidance"
  >("Public Ecosystem Discussion");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("+961 71 892 341");
  const [formOrg, setFormOrg] = useState("");
  const [formFiles, setFormFiles] = useState<{ id: string; name: string; type: string; size: string }[]>([]);
  const [isSubmittingIdea, setIsSubmittingIdea] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Carousel Steps
  const feedbackSteps = [
    {
      step: 1,
      title: "1. Community Submission",
      tagline: "Frictionless & Structured Intake",
      desc: "Submit your deep tech or policy proposal with clear problem statements, proposed solutions, and requested feedback preferences.",
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />
    },
    {
      step: 2,
      title: "2. Peer & Diaspora Review",
      tagline: "Open Validation & Upvoting",
      desc: "Community members, university researchers, and diaspora syndicates discuss, upvote, and pressure-test your idea in public.",
      icon: <Users className="w-5 h-5 text-indigo-500" />
    },
    {
      step: 3,
      title: "3. Triage & Matchmaking",
      tagline: "Admin Review & Sandbox Pipeline",
      desc: "The 961AINetwork core team triages submissions, connects you to institutional partners, and aligns with the regulatory sandbox.",
      icon: <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
    },
    {
      step: 4,
      title: "4. Sovereign Implementation",
      tagline: "Funded Deployments & Policy Adoption",
      desc: "Track milestones in real-time with automated notifications as ideas advance from 'In Progress' to 'Completed' ecosystem pilots.",
      icon: <CheckCircle2 className="w-5 h-5 text-blue-500" />
    }
  ];

  // Categories list
  const categories: IdeaCategory[] = [
    "Policy & Regulation",
    "Funding & Grants",
    "Talent",
    "Infrastructure",
    "Community Events"
  ];

  const statuses: IdeaStatus[] = [
    "Submitted",
    "Under Review",
    "Planned",
    "In Progress",
    "Completed",
    "Archived"
  ];

  // Unread automated notification count
  const unreadNotificationCount = useMemo(() => {
    return automatedNotifications.filter(n => !readNotificationIds.includes(n.id)).length;
  }, [automatedNotifications, readNotificationIds]);

  // Handle Trigger Status Update with Automated Notification Dispatch
  const handleTriggerStatusUpdate = async (ideaId: string, targetStatus: IdeaStatus, notes?: string) => {
    const targetIdea = ideas.find(i => i.id === ideaId);
    await onUpdateStatus(ideaId, targetStatus, notes);

    // If targetStatus triggers an automated notification ('Under Review', 'Planned', 'Completed')
    if (["Under Review", "Planned", "Completed"].includes(targetStatus)) {
      setAutomatedTriggerToast({
        ideaTitle: targetIdea?.title || submittedReceipt?.title || "Ecosystem Proposal",
        status: targetStatus,
        recipient: targetIdea?.submitterEmail || submittedReceipt?.submitterEmail || "submitter@ecosystem.lb",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: "Email + SMS"
      });
      setTimeout(() => setAutomatedTriggerToast(null), 5000);
    }

    if (submittedReceipt && submittedReceipt.id === ideaId) {
      setSubmittedReceipt(prev => prev ? { ...prev, status: targetStatus } : null);
    }
  };

  // Filtered Ideas
  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesCategory = categoryFilter === "ALL" || idea.category === categoryFilter;
      const matchesStatus = statusFilter === "ALL" || idea.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        idea.title.toLowerCase().includes(q) ||
        idea.problemStatement.toLowerCase().includes(q) ||
        idea.proposedSolution.toLowerCase().includes(q) ||
        idea.submitterName.toLowerCase().includes(q) ||
        idea.category.toLowerCase().includes(q);
      return matchesCategory && matchesStatus && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "upvotes") return b.upvotes - a.upvotes;
      if (sortBy === "comments") return b.commentsCount - a.commentsCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [ideas, categoryFilter, statusFilter, searchQuery, sortBy]);

  // Handle Submit New Idea
  const handleCreateIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formProblem || !formSolution || !formImpact || !formName || !formEmail) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      setIsSubmittingIdea(true);
      const newId = "idea-" + Date.now();
      await onSubmitIdea({
        id: newId,
        title: formTitle,
        category: formCategory,
        problemStatement: formProblem,
        proposedSolution: formSolution,
        expectedImpact: formImpact,
        feedbackPreference: formFeedbackPref,
        submitterName: formName,
        submitterEmail: formEmail,
        submitterOrg: formOrg || "Community Member",
        attachments: formFiles,
        status: "Submitted"
      });
      
      setUserSubmittedIdeaIds(prev => [newId, ...prev]);
      setSubmittedReceipt({
        id: newId,
        title: formTitle,
        category: formCategory,
        submitterName: formName,
        submitterEmail: formEmail,
        submitterPhone: formPhone || "+961 71 892 341",
        status: "Submitted",
        createdAt: new Date().toISOString()
      });
      setSubmitSuccess(true);
    } catch (err: any) {
      alert("Failed to submit idea: " + (err.message || "Unknown error"));
    } finally {
      setIsSubmittingIdea(false);
    }
  };

  // Mock File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const newAttachment = {
        id: "att-" + Date.now(),
        name: f.name,
        type: f.name.endsWith(".pdf") ? "pdf" : "doc",
        size: (f.size / (1024 * 1024)).toFixed(1) + " MB"
      };
      setFormFiles([...formFiles, newAttachment]);
    }
  };

  // Handle Add Comment in Modal
  const handleAddCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedIdea) return;
    try {
      setIsSubmittingComment(true);
      await onAddComment(selectedIdea.id, commentAuthor, commentRole, commentText);
      setCommentText("");
    } catch (err) {
      alert("Failed to add comment.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Handle Add Inline Comment on Card
  const handleAddInlineCommentSubmit = async (ideaId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineCommentText.trim()) return;
    try {
      setIsSubmittingInlineComment(true);
      await onAddComment(ideaId, inlineCommentAuthor, inlineCommentRole, inlineCommentText);
      setInlineCommentText("");
    } catch (err) {
      alert("Failed to add comment.");
    } finally {
      setIsSubmittingInlineComment(false);
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: IdeaStatus) => {
    switch (status) {
      case "Submitted":
        return "bg-amber-50 text-amber-800 border-amber-200/80";
      case "Under Review":
        return "bg-amber-100/90 text-amber-950 border-amber-400 font-bold ring-2 ring-amber-400/30";
      case "Planned":
        return "bg-purple-100 text-purple-950 border-purple-400 font-bold ring-2 ring-purple-400/30";
      case "In Progress":
        return "bg-blue-100 text-blue-900 border-blue-300 font-medium";
      case "Completed":
        return "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold ring-2 ring-emerald-400/30";
      case "Archived":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: IdeaStatus) => {
    switch (status) {
      case "Submitted":
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
      case "Under Review":
        return (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
          </span>
        );
      case "Planned":
        return <Calendar className="w-3.5 h-3.5 text-purple-600" />;
      case "In Progress":
        return <Sparkles className="w-3.5 h-3.5 text-blue-600" />;
      case "Completed":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case "Archived":
        return <Clock className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Admin Action Notification Toast */}
      {adminSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-mono flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{adminSuccessToast}</span>
        </div>
      )}

      {/* Automated Trigger Notification Toast */}
      {automatedTriggerToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-950 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/80 text-xs font-mono max-w-md animate-fade-in ring-4 ring-emerald-500/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Automated Notification Triggered
                </span>
                <span className="text-[10px] text-slate-400">{automatedTriggerToast.time}</span>
              </div>
              <p className="font-bold text-slate-100 text-sm leading-snug">
                {automatedTriggerToast.ideaTitle}
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[11px] text-slate-400">Status Advanced to:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(automatedTriggerToast.status)}`}>
                  {automatedTriggerToast.status}
                </span>
              </div>
              <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Dispatched to {automatedTriggerToast.recipient}</span>
                <span className="text-emerald-400 font-bold">Via {automatedTriggerToast.channel} ✓</span>
              </div>
            </div>
            <button
              onClick={() => setAutomatedTriggerToast(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero & Value Proposition Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNITY CO-CREATION ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white leading-tight">
              Got an Idea? <br className="hidden sm:inline" />
              <span className="text-emerald-400">Shape the Lebanese AI Ecosystem.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Have a suggestion for compute infrastructure, policy reform, research grants, or diaspora talent pipelines? Submit your concept directly to ecosystem peers, regulators, and venture syndicates.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="btn-hero-submit-your-idea"
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Your Idea</span>
              </button>

              <button
                onClick={() => setActiveTab("my_submissions")}
                className="relative px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-sm font-mono font-medium transition-all border border-amber-500/30 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>My Submissions & Alerts</span>
                {unreadNotificationCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("pipeline")}
                className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-sm font-mono font-medium transition-all border border-slate-700 flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Admin Pipeline</span>
              </button>

              <button
                onClick={() => {
                  window.history.pushState(null, "", "/admin/ideas");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="px-5 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-white text-sm font-mono font-medium transition-all border border-rose-800/60 flex items-center gap-2 shadow-sm"
              >
                <BarChart3 className="w-4 h-4 text-rose-400" />
                <span>Admin Analytics (/admin/ideas)</span>
              </button>
            </div>
          </div>

          {/* Gamified Contributor Leaderboard Preview Widget */}
          <div className="w-full lg:w-80 bg-slate-800/80 backdrop-blur-xs rounded-2xl border border-slate-700/80 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>TOP CO-CREATORS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">All-Time</span>
            </div>

            <div className="space-y-2.5">
              {contributors.slice(0, 3).map((c, i) => (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-[10px] font-mono font-bold flex items-center justify-center">
                      #{i + 1}
                    </span>
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-600"
                    />
                    <div>
                      <p className="font-semibold text-white font-mono text-xs line-clamp-1">{c.name}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{c.badge}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-400 font-bold text-xs">
                      {c.upvotesReceived}
                    </span>
                    <span className="text-[10px] text-slate-400 block">votes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Interactive Carousel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-900 uppercase tracking-wider">
              The 961AINetwork Feedback Loop
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Step {currentStep + 1} of 4: Transparent community governance from concept to deployment.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 3))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slide */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {feedbackSteps.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => setCurrentStep(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                currentStep === idx
                  ? "bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-emerald-500/50"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${currentStep === idx ? "bg-slate-800" : "bg-white shadow-2xs"}`}>
                  {s.icon}
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  currentStep === idx ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-200 text-slate-600"
                }`}>
                  0{s.step}
                </span>
              </div>
              <h4 className="font-bold text-xs font-mono line-clamp-1">{s.title}</h4>
              <p className={`text-[11px] font-mono mt-0.5 line-clamp-1 ${currentStep === idx ? "text-emerald-300" : "text-slate-500"}`}>
                {s.tagline}
              </p>
              <p className={`text-[11px] mt-2 leading-relaxed line-clamp-2 ${currentStep === idx ? "text-slate-300" : "text-slate-600"}`}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-slate-200 pb-2 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-colors flex items-center gap-2 ${
              activeTab === "explore"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Explore Ideas ({ideas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("my_submissions")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-colors flex items-center gap-2 ${
              activeTab === "my_submissions"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <User className="w-4 h-4 text-amber-500" />
            <span>My Submissions & Alerts</span>
            {unreadNotificationCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-colors flex items-center gap-2 ${
              activeTab === "pipeline"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Admin Kanban</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-colors flex items-center gap-2 ${
              activeTab === "analytics"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <span>Impact Analytics</span>
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Automated Notification Drawer Trigger */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-mono text-xs font-semibold transition-colors cursor-pointer"
            title="Automated Trigger Dispatch Log"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Triggered Alerts</span>
            {unreadNotificationCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <button
            id="btn-nav-submit-your-idea"
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 font-mono text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Your Idea</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: EXPLORE IDEAS GALLERY */}
      {/* ======================================================== */}
      {activeTab === "explore" && (
        <div className="space-y-6">
          {/* Search, Filter & Sort Controls */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ideas, problem statements, solutions, submitters..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-mono"
              />
            </div>

            {/* Filter Pills & Sort */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {/* Category Dropdown */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="ALL">All Statuses</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="upvotes">Most Upvoted</option>
                <option value="newest">Newest First</option>
                <option value="comments">Most Discussed</option>
              </select>
            </div>
          </div>

          {/* Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-3">
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {idea.category}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border flex items-center gap-1.5 ${getStatusBadge(idea.status)}`}>
                      {getStatusIcon(idea.status)}
                      <span>{idea.status}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setSelectedIdea(idea)}
                    className="font-bold text-slate-900 font-mono text-base hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2"
                  >
                    {idea.title}
                  </h3>

                  {/* Problem & Solution Teaser */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {idea.problemStatement}
                  </p>

                  {/* Feedback Preference Badge */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-md">
                      <HelpCircle className="w-3 h-3 text-emerald-600" />
                      <span className="line-clamp-1">{idea.feedbackPreference}</span>
                    </span>
                  </div>
                </div>

                {/* Submitter Info & Actions Footer */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  {/* Submitter */}
                  <div className="flex items-center gap-2">
                    <img
                      src={idea.submitterAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"}
                      alt={idea.submitterName}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <div className="leading-tight">
                      <span className="font-semibold text-slate-800 font-mono text-[11px] block line-clamp-1">
                        {idea.submitterName}
                      </span>
                      <span className="text-[10px] text-slate-400 block line-clamp-1 font-mono">
                        {idea.submitterOrg || "Community"}
                      </span>
                    </div>
                  </div>

                  {/* Upvote & Comments */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpvote(idea.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                        idea.hasUpvoted
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${idea.hasUpvoted ? "fill-slate-950" : ""}`} />
                      <span>{idea.upvotes}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCommentIdeaId(expandedCommentIdeaId === idea.id ? null : idea.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        expandedCommentIdeaId === idea.id
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                      title={expandedCommentIdeaId === idea.id ? "Hide Feedback Section" : "Open Feedback Section"}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{idea.commentsCount}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Expandable Comment & Discussion Section */}
                {expandedCommentIdeaId === idea.id && (
                  <div className="border-t border-slate-200 bg-slate-50/80 p-4 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Community & Expert Feedback ({idea.comments?.length || 0})</span>
                      </span>
                      <button
                        onClick={() => setSelectedIdea(idea)}
                        className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                      >
                        Full view & details
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Quick Inline Comment Input Form */}
                    <form
                      onSubmit={(e) => handleAddInlineCommentSubmit(idea.id, e)}
                      className="space-y-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={inlineCommentAuthor}
                          onChange={(e) => setInlineCommentAuthor(e.target.value)}
                          placeholder="Your Name (e.g. Expert / Researcher)"
                          className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                        />
                        <input
                          type="text"
                          value={inlineCommentRole}
                          onChange={(e) => setInlineCommentRole(e.target.value)}
                          placeholder="Your Role / Affiliation"
                          className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          value={inlineCommentText}
                          onChange={(e) => setInlineCommentText(e.target.value)}
                          placeholder="Share feedback, advice, or collaboration interest..."
                          className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingInlineComment}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-3 h-3" />
                          <span>Post</span>
                        </button>
                      </div>
                    </form>

                    {/* Recent Comments List */}
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {idea.comments && idea.comments.length > 0 ? (
                        idea.comments.map((c) => (
                          <div key={c.id} className="p-2.5 bg-white border border-slate-200/80 rounded-lg text-xs space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                {c.authorName}
                                {c.isOfficial && (
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                                    Official
                                  </span>
                                )}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {new Date(c.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            {c.authorRole && (
                              <div className="text-[10px] text-slate-500 font-mono">
                                {c.authorRole}
                              </div>
                            )}
                            <p className="text-xs text-slate-700 leading-relaxed pt-0.5">
                              {c.text}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3 text-slate-400 font-mono text-xs bg-white rounded-lg border border-dashed border-slate-200">
                          No comments yet. Be the first to provide expert feedback!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredIdeas.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <Lightbulb className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-900 font-mono text-base">No Ideas Match Your Filter</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Be the first to submit a proposal under this category or reset your search parameters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("ALL");
                  setStatusFilter("ALL");
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-mono font-medium hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: ADMIN KANBAN & PIPELINE */}
      {/* ======================================================== */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                <Shield className="w-4 h-4" />
                <span>ECOSYSTEM WORKFLOW & TRIAGE CONSOLE</span>
              </div>
              <h3 className="text-lg font-bold font-mono text-white mt-1">
                Kanban Status Pipeline & Direct Review
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Review proposals, update milestone statuses, post official public updates, or dispatch private communications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                Total Submissions: {ideas.length}
              </span>
            </div>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4">
            {(["Submitted", "Under Review", "Planned", "In Progress", "Completed"] as IdeaStatus[]).map((colStatus) => {
              const columnIdeas = ideas.filter((i) => i.status === colStatus);
              const hasTrigger = ["Under Review", "Planned", "Completed"].includes(colStatus);

              return (
                <div key={colStatus} className="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200 flex flex-col min-h-[500px]">
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                        {colStatus}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        {columnIdeas.length}
                      </span>
                    </div>

                    {hasTrigger ? (
                      <span className="flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-bold" title="Automated Trigger Armed">
                        <Bell className="w-2.5 h-2.5 text-emerald-600" />
                        <span className="hidden xl:inline">Trigger</span>
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    )}
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 flex-1">
                    {columnIdeas.map((idea) => (
                      <div
                        key={idea.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                            {idea.category}
                          </span>
                          {hasTrigger && (
                            <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80 flex items-center gap-1" title="Notification dispatched upon entering this status">
                              <Zap className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Notified</span>
                            </span>
                          )}
                        </div>

                        <h4 
                          onClick={() => setSelectedIdea(idea)}
                          className="font-bold text-xs font-mono text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2"
                        >
                          {idea.title}
                        </h4>

                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {idea.problemStatement}
                        </p>

                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-mono text-[10px] line-clamp-1">
                            {idea.submitterName}
                          </span>

                          {/* Fast Action Menu */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setAdminActiveIdea(idea);
                                setNewStatus(idea.status);
                                setAdminActionType("status");
                              }}
                              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[10px]"
                              title="Advance Status"
                            >
                              Move
                            </button>

                            <button
                              onClick={() => {
                                setAdminActiveIdea(idea);
                                setAdminActionType("update");
                              }}
                              className="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono text-[10px]"
                              title="Post Official Update"
                            >
                              Update
                            </button>

                            <button
                              onClick={() => {
                                setAdminActiveIdea(idea);
                                setAdminActionType("private");
                              }}
                              className="px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-800 font-mono text-[10px]"
                              title="Message Submitter"
                            >
                              DM
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {columnIdeas.length === 0 && (
                      <div className="h-32 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-center p-4">
                        <span className="text-xs font-mono text-slate-400">No ideas in {colStatus}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submission Management Grid Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h4 className="font-bold text-xs font-mono text-slate-900 uppercase tracking-wider">
                Submission Management Grid ({ideas.length} Total)
              </h4>
              <span className="text-xs font-mono text-slate-500">Live Feedback Intake Queue</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Idea Title & Category</th>
                    <th className="p-3.5">Submitter Profile</th>
                    <th className="p-3.5">Requested Feedback</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5">Engagement</th>
                    <th className="p-3.5 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ideas.map((idea) => (
                    <tr key={idea.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 max-w-xs">
                        <span 
                          onClick={() => setSelectedIdea(idea)}
                          className="font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer block line-clamp-1"
                        >
                          {idea.title}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {idea.category} • {new Date(idea.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{idea.submitterName}</div>
                        <div className="text-[10px] text-slate-400">{idea.submitterEmail}</div>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                          {idea.feedbackPreference}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border inline-flex items-center gap-1 ${getStatusBadge(idea.status)}`}>
                          {getStatusIcon(idea.status)}
                          <span>{idea.status}</span>
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap text-slate-600 text-[11px]">
                        ▲ {idea.upvotes} • 💬 {idea.commentsCount}
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setAdminActiveIdea(idea);
                              setAdminActionType("status");
                              setNewStatus(idea.status);
                            }}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] transition-colors"
                          >
                            Status
                          </button>
                          <button
                            onClick={() => {
                              setAdminActiveIdea(idea);
                              setAdminActionType("update");
                            }}
                            className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[10px] transition-colors"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setAdminActiveIdea(idea);
                              setAdminActionType("private");
                            }}
                            className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 text-[10px] transition-colors"
                          >
                            DM
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: IMPACT ANALYTICS */}
      {/* ======================================================== */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Total Proposals</p>
              <p className="text-3xl font-bold font-mono text-slate-900 mt-1">{ideas.length}</p>
              <p className="text-[10px] text-emerald-600 font-mono mt-1">+4 new this month</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">In Progress / Funded</p>
              <p className="text-3xl font-bold font-mono text-indigo-600 mt-1">
                {ideas.filter(i => i.status === "In Progress" || i.status === "Completed").length}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Active implementations</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Avg Response Time</p>
              <p className="text-3xl font-bold font-mono text-slate-900 mt-1">3.4 d</p>
              <p className="text-[10px] text-emerald-600 font-mono mt-1">Within 4-day SLA</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Upvote Engagement</p>
              <p className="text-3xl font-bold font-mono text-emerald-600 mt-1">
                {ideas.reduce((acc, i) => acc + i.upvotes, 0)}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Ecosystem endorsements</p>
            </div>
          </div>

          {/* Category Distribution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-bold text-xs font-mono text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Submissions by Domain Category</span>
              </h4>

              <div className="space-y-3">
                {categories.map((cat) => {
                  const count = ideas.filter(i => i.category === cat).length;
                  const pct = Math.round((count / Math.max(1, ideas.length)) * 100);

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-700">{cat}</span>
                        <span className="text-slate-500 font-bold">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-bold text-xs font-mono text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Pipeline Stage Distribution</span>
              </h4>

              <div className="space-y-3">
                {statuses.map((stat) => {
                  const count = ideas.filter(i => i.status === stat).length;
                  const pct = Math.round((count / Math.max(1, ideas.length)) * 100);

                  return (
                    <div key={stat} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-700">{stat}</span>
                        <span className="text-slate-500 font-bold">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: MY SUBMISSIONS & AUTOMATED NOTIFICATIONS */}
      {/* ======================================================== */}
      {activeTab === "my_submissions" && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>AUTOMATED NOTIFICATION TRIGGER MECHANISM</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-white">
                  My Submissions & Live Status Tracking
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                  Proposals submitted through the intake flow are continuously tracked here. When an administrator advances your idea to <strong className="text-amber-300 font-mono">'Under Review'</strong>, <strong className="text-indigo-300 font-mono">'Planned'</strong>, or <strong className="text-emerald-300 font-mono">'Completed'</strong>, our automated trigger mechanism instantaneously updates your UI badge and dispatches notifications via Email and SMS.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsNotificationDrawerOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-xs font-bold transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Triggered Log ({automatedNotifications.length})</span>
                </button>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit New Idea</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 font-mono text-xs">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase">Tracked Submissions</span>
                <span className="text-lg font-bold text-white mt-0.5 block">
                  {ideas.filter(i => userSubmittedIdeaIds.includes(i.id) || i.submitterEmail === formEmail).length || ideas.length}
                </span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase">Trigger Rules Armed</span>
                <span className="text-lg font-bold text-amber-400 mt-0.5 block">
                  3 Stages
                </span>
                <span className="text-[9px] text-slate-400">Review / Planned / Done</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase">Dispatched Alerts</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                  {automatedNotifications.length}
                </span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block uppercase">Unread Badge Count</span>
                <span className="text-lg font-bold text-rose-400 mt-0.5 block">
                  {unreadNotificationCount}
                </span>
              </div>
            </div>
          </div>

          {/* Submissions List */}
          {(() => {
            const userProposals = ideas.filter(i => userSubmittedIdeaIds.includes(i.id) || i.submitterEmail === formEmail);
            const displayProposals = userProposals.length > 0 ? userProposals : ideas.slice(0, 3);
            const isShowingDemo = userProposals.length === 0;

            return (
              <div className="space-y-4">
                {isShowingDemo && (
                  <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 font-mono">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Live Pipeline Preview:</span>
                      <span className="text-amber-800">
                        Displaying active community proposals tracked in your session. You can use the <strong>Status Trigger Simulator</strong> on any proposal below to test how the automated notification trigger mechanism fires and updates the UI badge!
                      </span>
                    </div>
                  </div>
                )}

                {displayProposals.map((idea) => {
                  const ideaNotifs = automatedNotifications.filter(n => n.ideaId === idea.id);

                  return (
                    <div
                      key={idea.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 space-y-5"
                    >
                      {/* Card Header & Dynamic UI Status Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg">
                            {idea.category}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600 font-medium">
                            {idea.submitterName} ({idea.submitterOrg})
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-400 text-[11px]">
                            {new Date(idea.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* DYNAMIC UI STATUS BADGE */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
                            Live UI Badge:
                          </span>
                          <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 shadow-xs transition-all duration-300 ${getStatusBadge(idea.status)}`}>
                            {getStatusIcon(idea.status)}
                            <span>{idea.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Idea Content */}
                      <div className="space-y-2">
                        <h4 
                          onClick={() => setSelectedIdea(idea)}
                          className="text-base font-bold font-mono text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer"
                        >
                          {idea.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Problem:</strong> {idea.problemStatement}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Proposed Solution:</strong> {idea.proposedSolution}
                        </p>
                      </div>

                      {/* 4-Stage Lifecycle Stepper with Automated Trigger Flags */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3 font-mono">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Milestone Lifecycle & Trigger Beacon</span>
                          </span>
                          <span className="text-[11px] text-slate-500 font-normal">
                            Current Stage: <strong className="text-slate-900 font-bold">{idea.status}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {[
                            { label: "Submitted" as IdeaStatus, desc: "Community Intake", isTrigger: false, colColor: "slate" },
                            { label: "Under Review" as IdeaStatus, desc: "Admin Triage", isTrigger: true, colColor: "amber" },
                            { label: "Planned" as IdeaStatus, desc: "Resource Scheduling", isTrigger: true, colColor: "indigo" },
                            { label: "Completed" as IdeaStatus, desc: "Ecosystem Deployed", isTrigger: true, colColor: "emerald" }
                          ].map((stage, idx) => {
                            const isCurrent = idea.status === stage.label;
                            const stageIndexMap: Record<string, number> = {
                              "Submitted": 0,
                              "Under Review": 1,
                              "Planned": 2,
                              "In Progress": 2,
                              "Completed": 3,
                              "Archived": -1
                            };
                            const currentIdx = stageIndexMap[idea.status] ?? 0;
                            const isPassed = currentIdx > idx;

                            return (
                              <div
                                key={stage.label}
                                className={`p-2.5 rounded-xl border text-xs transition-all ${
                                  isCurrent
                                    ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/40"
                                    : isPassed
                                    ? "bg-white text-slate-800 border-slate-300"
                                    : "bg-slate-100/60 text-slate-500 border-slate-200"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-bold">
                                    0{idx + 1}
                                  </span>
                                  {stage.isTrigger && (
                                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold flex items-center gap-1 ${
                                      isCurrent
                                        ? "bg-amber-400 text-slate-950"
                                        : "bg-amber-100 text-amber-800"
                                    }`} title="Automated notification trigger fires on entering this status">
                                      <Bell className="w-2.5 h-2.5" />
                                      <span>Trigger</span>
                                    </span>
                                  )}
                                </div>
                                <div className="font-bold text-[11px] truncate">
                                  {stage.label}
                                </div>
                                <div className={`text-[10px] truncate ${isCurrent ? "text-slate-300" : "text-slate-500"}`}>
                                  {stage.desc}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Automated Notification History for this Idea */}
                      <div className="space-y-2 font-mono">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>Automated Trigger Dispatches ({ideaNotifs.length})</span>
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Channel: Email ({idea.submitterEmail}) + SMS
                          </span>
                        </div>

                        {ideaNotifs.length > 0 ? (
                          <div className="space-y-1.5">
                            {ideaNotifs.map((notif) => (
                              <div
                                key={notif.id}
                                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                  <span className="font-bold text-slate-800">
                                    Status Advanced to: <span className="text-emerald-700 font-bold">{notif.status}</span>
                                  </span>
                                  <span className="text-[10px] text-slate-500">
                                    (Triggered on {new Date(notif.timestamp).toLocaleTimeString()})
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-[10px]">
                                  <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                                    Dispatched to: {notif.recipientEmail}
                                  </span>
                                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    <span>DELIVERED</span>
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-xs text-slate-500 text-center">
                            No automated triggers logged yet for this proposal. Advance to 'Under Review', 'Planned', or 'Completed' below to test!
                          </div>
                        )}
                      </div>

                      {/* Admin Trigger Simulator Toolbar */}
                      <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Simulate Admin Action (Test Automated Trigger & Live UI Badge Update):</span>
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Instantaneously fires notification trigger and updates badge
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            onClick={() => handleTriggerStatusUpdate(idea.id, "Under Review", "Automated review trigger test")}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Bell className="w-3 h-3 text-amber-400" />
                            <span>Advance to 'Under Review'</span>
                          </button>

                          <button
                            onClick={() => handleTriggerStatusUpdate(idea.id, "Planned", "Automated planned trigger test")}
                            className="px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Calendar className="w-3 h-3 text-indigo-400" />
                            <span>Advance to 'Planned'</span>
                          </button>

                          <button
                            onClick={() => handleTriggerStatusUpdate(idea.id, "Completed", "Automated completed trigger test")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Advance to 'Completed'</span>
                          </button>

                          <button
                            onClick={() => handleTriggerStatusUpdate(idea.id, "Submitted", "Resetting status")}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all cursor-pointer"
                          >
                            Reset to 'Submitted'
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}
      {/* Legacy centered modal superseded by slide-over SubmitIdeaDrawer */}
      {false && isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                  <Lightbulb className="w-4 h-4" />
                  <span>"GOT AN IDEA?" ECOSYSTEM PROPOSAL INTAKE</span>
                </div>
                <h3 className="text-xl font-bold font-mono text-white mt-1">
                  Submit Your Ecosystem Idea
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Propose initiatives, compute infrastructure, or policy frameworks.
                </p>
              </div>

              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess && submittedReceipt ? (
              <div className="p-6 sm:p-8 space-y-6 font-mono max-h-[80vh] overflow-y-auto">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Proposal Successfully Submitted!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your initiative is registered in the 961AINetwork pipeline and assigned a live tracking beacon.
                  </p>
                </div>

                {/* Proposal Receipt Card with DYNAMIC UI STATUS BADGE */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                        Registered Submission
                      </span>
                      <h5 className="text-sm font-bold text-slate-900 mt-0.5">
                        {submittedReceipt.title}
                      </h5>
                    </div>

                    {/* LIVE DYNAMIC UI STATUS BADGE */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 uppercase">Live UI Badge:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-xs transition-all duration-300 ${getStatusBadge(submittedReceipt.status)}`}>
                        {getStatusIcon(submittedReceipt.status)}
                        <span>{submittedReceipt.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Submitter & Delivery Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block uppercase">Category</span>
                      <span className="font-bold text-slate-800">{submittedReceipt.category}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block uppercase">Email Notification</span>
                      <span className="font-bold text-slate-800 truncate block">{submittedReceipt.submitterEmail}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 block uppercase">SMS Notification</span>
                      <span className="font-bold text-slate-800">{submittedReceipt.submitterPhone}</span>
                    </div>
                  </div>

                  {/* Automated Trigger Mechanism Armed Notice */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950">
                    <Bell className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold block">Automated Notification Trigger Mechanism Armed:</span>
                      <p className="text-emerald-800 text-[11px] leading-relaxed">
                        Whenever an administrator updates this proposal's status to <strong>'Under Review'</strong>, <strong>'Planned'</strong>, or <strong>'Completed'</strong>, our system will automatically fire an Email and SMS alert, and update the UI status badge in real time.
                      </p>
                    </div>
                  </div>

                  {/* INTERACTIVE TRIGGER SIMULATOR ON SUBMITTED PROPOSAL */}
                  <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-xs text-white flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Test Trigger Mechanism & Watch Live Badge Update:</span>
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Click below to simulate an admin status change
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleTriggerStatusUpdate(submittedReceipt.id, "Under Review", "Simulated triage review")}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Bell className="w-3 h-3 text-amber-400" />
                        <span>Advance to 'Under Review'</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTriggerStatusUpdate(submittedReceipt.id, "Planned", "Simulated scheduling")}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3 text-indigo-400" />
                        <span>Advance to 'Planned'</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTriggerStatusUpdate(submittedReceipt.id, "Completed", "Simulated completion")}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Advance to 'Completed'</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTriggerStatusUpdate(submittedReceipt.id, "Submitted", "Resetting")}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all cursor-pointer"
                      >
                        Reset to 'Submitted'
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitModalOpen(false);
                      setActiveTab("my_submissions");
                    }}
                    className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>View in My Submissions & Alerts</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSubmittedReceipt(null);
                      setFormTitle("");
                      setFormProblem("");
                      setFormSolution("");
                      setFormImpact("");
                      setFormFiles([]);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold font-mono transition-colors"
                  >
                    Submit Another Idea
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold font-mono transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateIdea} className="p-6 space-y-5 text-xs font-mono max-h-[75vh] overflow-y-auto">
                {/* Automated Notification Trigger Banner in Intake Flow */}
                <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950 font-mono">
                  <Bell className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Automated Notification Trigger Active:</span>
                    <span className="text-emerald-800 text-[11px] leading-relaxed">
                      Whenever an admin advances your idea to <strong>'Under Review'</strong>, <strong>'Planned'</strong>, or <strong>'Completed'</strong>, our system will automatically dispatch an alert via Email and SMS, and instantaneously update your UI status badge.
                    </span>
                  </div>
                </div>

                {/* Identity info */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Maya Warde"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="maya@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      SMS Phone Alerts
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+961 71 892 341"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Affiliation
                    </label>
                    <input
                      type="text"
                      value={formOrg}
                      onChange={(e) => setFormOrg(e.target.value)}
                      placeholder="AUB / BDD Startup"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Idea Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Clear, descriptive title of your proposal"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as IdeaCategory)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Problem Statement */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Problem Statement (What bottleneck does this solve?) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formProblem}
                    onChange={(e) => setFormProblem(e.target.value)}
                    placeholder="Describe the friction or opportunity in the Lebanese AI landscape..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none leading-relaxed"
                  />
                </div>

                {/* Proposed Solution */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Proposed Solution (How should the ecosystem execute this?) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formSolution}
                    onChange={(e) => setFormSolution(e.target.value)}
                    placeholder="Detail the technical, infrastructural, or regulatory roadmap..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none leading-relaxed"
                  />
                </div>

                {/* Expected Impact */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expected Ecosystem Impact & Quantifiable Milestones *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formImpact}
                    onChange={(e) => setFormImpact(e.target.value)}
                    placeholder="e.g. Lowers GPU cost by 50%, unblocks 20 clinical pilots, unlocks $500k in grants..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none leading-relaxed"
                  />
                </div>

                {/* Feedback Preference Questionnaire */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Feedback Preference Questionnaire: What response are you seeking? *
                  </label>
                  <p className="text-[10px] text-slate-500">
                    Helps the triage team pair you with the right mentors, funding channels, or regulators.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      "Mentorship/Coaching",
                      "Direct Connect with Admin/Regulators",
                      "Public Ecosystem Discussion",
                      "Resource/Funding Guidance"
                    ].map((pref) => (
                      <label
                        key={pref}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          formFeedbackPref === pref
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="feedbackPref"
                          checked={formFeedbackPref === pref}
                          onChange={() => setFormFeedbackPref(pref as any)}
                          className="accent-emerald-600"
                        />
                        <span>{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* File Attachments Uploader */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Supporting Attachments (PDFs, Decks, Architecture Specs)
                  </label>
                  <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                    <input
                      type="file"
                      id="idea-file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="idea-file-upload" className="cursor-pointer">
                      <Paperclip className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs text-emerald-600 font-bold">Click to upload document</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">PDF, DOCX, PNG up to 10MB</span>
                    </label>
                  </div>

                  {formFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                          <span className="flex items-center gap-1.5 text-slate-700">
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{file.name} ({file.size})</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormFiles(formFiles.filter(f => f.id !== file.id))}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingIdea}
                    className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs flex items-center gap-2"
                  >
                    {isSubmittingIdea ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit to Ecosystem</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: IDEA DETAIL & COMMUNITY DISCUSSION */}
      {/* ======================================================== */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {selectedIdea.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border flex items-center gap-1 ${getStatusBadge(selectedIdea.status)}`}>
                    {getStatusIcon(selectedIdea.status)}
                    <span>{selectedIdea.status}</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold font-mono text-white mt-1">
                  {selectedIdea.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono mt-1">
                  <span>Submitted by {selectedIdea.submitterName} ({selectedIdea.submitterOrg})</span>
                  <span>•</span>
                  <span>{new Date(selectedIdea.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedIdea(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-sans max-h-[70vh] overflow-y-auto">
              {/* Problem */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Identified Ecosystem Problem
                </h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  {selectedIdea.problemStatement}
                </p>
              </div>

              {/* Proposed Solution */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Proposed Solution & Roadmap
                </h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  {selectedIdea.proposedSolution}
                </p>
              </div>

              {/* Expected Impact */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider text-slate-500">
                  Expected Impact & Measurable Outcomes
                </h4>
                <p className="text-slate-700 leading-relaxed bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/80">
                  {selectedIdea.expectedImpact}
                </p>
              </div>

              {/* Questionnaire Preference */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-600">Requested Support:</span>
                <span className="font-bold text-slate-900">{selectedIdea.feedbackPreference}</span>
              </div>

              {/* Attachments if any */}
              {selectedIdea.attachments && selectedIdea.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider text-slate-500">
                    Proposal Attachments ({selectedIdea.attachments.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIdea.attachments.map((att) => (
                      <div key={att.id} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-medium text-slate-700">{att.name}</span>
                        <span className="text-slate-400 text-[10px]">({att.size})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Updates Timeline */}
              {selectedIdea.officialUpdates && selectedIdea.officialUpdates.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Ecosystem Status Updates</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedIdea.officialUpdates.map((upd) => (
                      <div key={upd.id} className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-emerald-950">{upd.title}</span>
                          <span className="text-[10px] text-emerald-700">{new Date(upd.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-emerald-900/90 leading-relaxed">{upd.notes}</p>
                        <div className="text-[10px] text-emerald-700 font-mono">
                          By: {upd.adminName}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Community Discussion Comments Thread */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Community Discussion ({selectedIdea.comments?.length || 0})</span>
                </h4>

                {/* Comment Form */}
                <form onSubmit={handleAddCommentSubmit} className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      required
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="Your Name"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 outline-none"
                    />
                    <input
                      type="text"
                      value={commentRole}
                      onChange={(e) => setCommentRole(e.target.value)}
                      placeholder="Your Role / Affiliation"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 outline-none flex-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share feedback, advice, or collaboration interest..."
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingComment}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-mono font-medium transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {selectedIdea.comments && selectedIdea.comments.length > 0 ? (
                    selectedIdea.comments.map((c) => (
                      <div key={c.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-slate-900 flex items-center gap-2">
                            {c.authorName}
                            {c.isOfficial && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold border border-emerald-200">
                                Official Partner / Admin
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {c.authorRole && (
                          <span className="text-[10px] text-slate-500 font-mono block">
                            {c.authorRole}
                          </span>
                        )}
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">{c.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-slate-400 font-mono text-xs">
                      No comments yet. Start the conversation!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => onUpvote(selectedIdea.id)}
                className={`px-4 py-2 rounded-lg border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  selectedIdea.hasUpvoted
                    ? "bg-emerald-500 text-slate-950 border-emerald-400"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${selectedIdea.hasUpvoted ? "fill-slate-950" : ""}`} />
                <span>{selectedIdea.upvotes} Upvotes</span>
              </button>

              <button
                onClick={() => setSelectedIdea(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-mono text-xs rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADMIN ACTION MODAL (STATUS / UPDATE / PRIVATE) */}
      {/* ======================================================== */}
      {adminActiveIdea && adminActionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h4 className="font-bold text-sm font-mono flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>
                  {adminActionType === "status" && "Advance Status Pipeline"}
                  {adminActionType === "update" && "Post Official Public Update"}
                  {adminActionType === "private" && "Send Submitter Message"}
                </span>
              </h4>
              <button onClick={() => setAdminActionType(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 font-mono text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 text-[10px] block">Target Proposal:</span>
                <span className="font-bold text-slate-900 text-xs block line-clamp-1">
                  {adminActiveIdea.title}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Submitter: {adminActiveIdea.submitterName} ({adminActiveIdea.submitterEmail})
                </span>
              </div>

              {/* ACTION: CHANGE STATUS */}
              {adminActionType === "status" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Target Pipeline Stage
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as IdeaStatus)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Administrative Notes (Internal or notified)
                    </label>
                    <textarea
                      rows={2}
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="e.g. Scoped with BDD engineering team; progressing to sandbox testing..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
                    />
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-start gap-2">
                    <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Automated dispatch: Changing status will automatically trigger an Email & SMS notification to {adminActiveIdea.submitterEmail}.
                    </span>
                  </div>

                  <button
                    onClick={async () => {
                      await handleTriggerStatusUpdate(adminActiveIdea.id, newStatus, adminNotes);
                      setAdminSuccessToast(`Status updated to '${newStatus}'. Automated notification dispatched.`);
                      setTimeout(() => setAdminSuccessToast(null), 3500);
                      setAdminActionType(null);
                    }}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer"
                  >
                    Confirm & Dispatch Notification
                  </button>
                </div>
              )}

              {/* ACTION: POST OFFICIAL UPDATE */}
              {adminActionType === "update" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Update Title
                    </label>
                    <input
                      type="text"
                      value={officialUpdateTitle}
                      onChange={(e) => setOfficialUpdateTitle(e.target.value)}
                      placeholder="e.g. Sandbox Regulatory Working Group Convened"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Public Update Notes
                    </label>
                    <textarea
                      rows={3}
                      value={officialUpdateNotes}
                      onChange={(e) => setOfficialUpdateNotes(e.target.value)}
                      placeholder="Describe what milestone was achieved and next steps..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      if (!officialUpdateTitle || !officialUpdateNotes) return;
                      await onPostOfficialUpdate(adminActiveIdea.id, officialUpdateTitle, officialUpdateNotes);
                      setAdminSuccessToast(`Official update published to public timeline.`);
                      setTimeout(() => setAdminSuccessToast(null), 3500);
                      setAdminActionType(null);
                      setOfficialUpdateTitle("");
                      setOfficialUpdateNotes("");
                    }}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                  >
                    Publish Official Update
                  </button>
                </div>
              )}

              {/* ACTION: SEND PRIVATE RESPONSE */}
              {adminActionType === "private" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Dispatch Channel
                    </label>
                    <select
                      value={privateChannel}
                      onChange={(e) => setPrivateChannel(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
                    >
                      <option value="Email">Email ({adminActiveIdea.submitterEmail})</option>
                      <option value="SMS">SMS / WhatsApp</option>
                      <option value="Portal DM">Direct Portal Message</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Direct Message Content
                    </label>
                    <textarea
                      rows={4}
                      value={privateMessage}
                      onChange={(e) => setPrivateMessage(e.target.value)}
                      placeholder="Write your private guidance, advisor match, or next meeting details..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      if (!privateMessage) return;
                      await onSendPrivateResponse(adminActiveIdea.id, privateMessage, privateChannel);
                      setAdminSuccessToast(`Private message dispatched via ${privateChannel}.`);
                      setTimeout(() => setAdminSuccessToast(null), 3500);
                      setAdminActionType(null);
                      setPrivateMessage("");
                    }}
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
                  >
                    Dispatch Private Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DRAWER / MODAL: AUTOMATED NOTIFICATIONS DISPATCH LOG */}
      {/* ======================================================== */}
      {isNotificationDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div 
            className="bg-white w-full max-w-lg h-full shadow-2xl border-l border-slate-200 flex flex-col font-mono animate-slide-in-right overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <Bell className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">
                    Automated Notifications
                  </h3>
                  {unreadNotificationCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                      {unreadNotificationCount} New
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Triggered on status changes to 'Under Review', 'Planned', or 'Completed'.
                </p>
              </div>

              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Header Actions */}
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="text-[11px]">
                Total Logged Alerts: <strong>{automatedNotifications.length}</strong>
              </span>

              <div className="flex items-center gap-2">
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={() => {
                      setReadNotificationIds(automatedNotifications.map(n => n.id));
                    }}
                    className="text-[11px] text-emerald-600 hover:text-emerald-700 font-bold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}

                {onClearNotifications && automatedNotifications.length > 0 && (
                  <button
                    onClick={() => onClearNotifications()}
                    className="text-[11px] text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {automatedNotifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Bell className="w-8 h-8 text-slate-300" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h4 className="font-bold text-sm text-slate-800">No Alerts Triggered Yet</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Whenever an administrator advances an idea's status to <strong>'Under Review'</strong>, <strong>'Planned'</strong>, or <strong>'Completed'</strong>, an automated alert will be logged here.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsNotificationDrawerOpen(false);
                      setActiveTab("my_submissions");
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Test in My Submissions & Alerts
                  </button>
                </div>
              ) : (
                automatedNotifications.map((notif) => {
                  const isRead = readNotificationIds.includes(notif.id);
                  const matchingIdea = ideas.find(i => i.id === notif.ideaId);

                  return (
                    <div
                      key={notif.id}
                      onClick={() => {
                        if (!isRead) {
                          setReadNotificationIds(prev => [...prev, notif.id]);
                        }
                        if (matchingIdea) {
                          setSelectedIdea(matchingIdea);
                          setIsNotificationDrawerOpen(false);
                        }
                      }}
                      className={`p-4 rounded-xl border text-xs transition-all cursor-pointer space-y-2.5 ${
                        isRead
                          ? "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                          : "bg-emerald-50/40 border-emerald-300/80 shadow-xs ring-1 ring-emerald-500/20"
                      }`}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isRead ? "bg-slate-300" : "bg-emerald-500 animate-ping"}`}></span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(notif.status)}`}>
                            {getStatusIcon(notif.status)}
                            <span className="ml-1">{notif.status}</span>
                          </span>
                        </div>

                        <span className="text-[10px] text-slate-400">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Idea Title */}
                      <div className="space-y-0.5">
                        <h5 className="font-bold text-slate-900 text-xs line-clamp-2 hover:text-emerald-600 transition-colors">
                          {notif.ideaTitle}
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          {notif.message}
                        </p>
                      </div>

                      {/* Trigger Metadata */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                        <span className="truncate max-w-[200px]">
                          To: <strong className="text-slate-700">{notif.recipientEmail}</strong>
                        </span>
                        <span className="text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>DISPATCHED</span>
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Automated Trigger Specification</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Rules armed for: <span className="font-bold text-slate-700">'Under Review'</span> (triage), <span className="font-bold text-slate-700">'Planned'</span> (schedule), & <span className="font-bold text-slate-700">'Completed'</span> (delivery). Dispatches are logged in the event pipeline and live UI badges are synced in real-time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
