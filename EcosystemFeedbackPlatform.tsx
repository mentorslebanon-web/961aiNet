import React, { useState, useEffect, useMemo } from "react";
import {
  Brain,
  Sparkles,
  BookOpen,
  FileText,
  Upload,
  Plus,
  Search,
  Trash2,
  Edit3,
  Save,
  Copy,
  Check,
  Headphones,
  Send,
  Folder,
  Tag,
  Pin,
  Download,
  RotateCcw,
  Volume2,
  ShieldCheck,
  Layers,
  ArrowRight,
  ExternalLink,
  Cpu,
  Scale,
  TrendingUp,
  CheckSquare,
  Square,
  Play,
  Pause,
  Phone,
  UserPlus,
  ListTodo,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Bookmark,
  Compass
} from "lucide-react";
import { PlatformCoreModulesBar } from "../workspace/PlatformCoreModulesBar";
import {
  UserAuthSession,
  WorkspaceEntry,
  WorkspaceCategory,
  Z961Workspace
} from "../../types";
import {
  getZ961Workspace,
  addWorkspaceEntry,
  askZ961BrainCopilot,
  generateZ961AudioOverview,
  sendZ24sevenWhatsAppWebhook
} from "../../lib/z961SecondBrainService";
import { WhatsAppIntegrationModal } from "../secondBrain/WhatsAppIntegrationModal";
import { SystemArchitectureModal } from "../secondBrain/SystemArchitectureModal";

interface ModuleSecondBrainNotebookProps {
  user: UserAuthSession | null;
  onOpenPricing?: () => void;
  onNavigateToDirectory?: (searchQuery?: string) => void;
  onNavigateToSandbox?: () => void;
  onNavigateToPitchRoom?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToModule?: (moduleId: number) => void;
  onOpenAuth?: (mode?: "signin" | "signup", reason?: string) => void;
  deductCredits?: (amount: number) => boolean;
  credits?: number;
}

export const ModuleSecondBrainNotebook: React.FC<ModuleSecondBrainNotebookProps> = ({
  user,
  onOpenPricing,
  onNavigateToDirectory,
  onNavigateToSandbox,
  onNavigateToPitchRoom,
  onNavigateToHome,
  onNavigateToReports,
  onNavigateToModule,
  onOpenAuth,
  deductCredits,
  credits = 1450
}) => {
  // Toggle Core Modules Bar
  const [showCoreModules, setShowCoreModules] = useState(false);

  // Active Workspace State
  const [workspace, setWorkspace] = useState<Z961Workspace | null>(null);
  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState<boolean>(true);

  // Filter & Search States
  const [selectedCategory, setSelectedCategory] = useState<WorkspaceCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEntryIds, setSelectedEntryIds] = useState<string[]>([]);
  const [activeViewingEntryId, setActiveViewingEntryId] = useState<string>("");

  // Center Canvas View: "chat" (AI Copilot) vs "document" (Markdown Viewer)
  const [activeCenterView, setActiveCenterView] = useState<"chat" | "document">("chat");

  // AI Copilot Chat State
  const [queryInput, setQueryInput] = useState<string>("");
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: "user" | "copilot";
    text: string;
    timestamp: string;
    citations?: string[];
    groundingConfidence?: number;
    sourcesUsed?: string[];
  }>>([
    {
      id: "msg_welcome",
      sender: "copilot",
      text: "Welcome to your Sovereign **z961 Second Brain Workspace**.\n\nI am your grounded intelligence copilot. I synthesize deal intelligence, legal frameworks (BDL Circular 165), CRM profiles, and research documents with zero hallucination. Every response cites your ingested sources directly.\n\nHow can I help you advance your venture today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      groundingConfidence: 100
    }
  ]);

  // Audio Deep Dive Studio State
  const [isGeneratingAudio, setIsGeneratingAudio] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number>(0);
  const [audioOverview, setAudioOverview] = useState<{
    title: string;
    duration: string;
    summary: string;
    dialogue: Array<{ speaker: string; text: string }>;
  } | null>(null);

  // New Source / Document Modal
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<WorkspaceCategory>("research");
  const [newText, setNewText] = useState<string>("");
  const [newTags, setNewTags] = useState<string>("Lebanese AI, Research");
  const [isSubmittingNewSource, setIsSubmittingNewSource] = useState<boolean>(false);

  // Inline Quick Task State
  const [newFollowupTask, setNewFollowupTask] = useState<string>("");
  const [newFollowupPriority, setNewFollowupPriority] = useState<"urgent" | "high" | "normal">("high");

  // Modals
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);

  // Load Workspace on mount and on user change
  useEffect(() => {
    let isMounted = true;
    setIsLoadingWorkspace(true);

    getZ961Workspace(user)
      .then((ws) => {
        if (isMounted) {
          setWorkspace(ws);
          // Default select all entries for grounded synthesis
          const allIds = ws.entries.map((e) => e.id);
          setSelectedEntryIds(allIds);
          if (ws.entries.length > 0 && !activeViewingEntryId) {
            setActiveViewingEntryId(ws.entries[0].id);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load workspace:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingWorkspace(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Filtered Entries for Left Panel
  const filteredEntries = useMemo(() => {
    if (!workspace) return [];
    return workspace.entries.filter((entry) => {
      const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.contentPayload.text.toLowerCase().includes(q) ||
        entry.contentPayload.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [workspace, selectedCategory, searchQuery]);

  // Currently active viewing entry in document reader
  const activeEntry = useMemo(() => {
    if (!workspace) return null;
    return workspace.entries.find((e) => e.id === activeViewingEntryId) || workspace.entries[0] || null;
  }, [workspace, activeViewingEntryId]);

  // Selected entries for Grounded RAG
  const selectedEntries = useMemo(() => {
    if (!workspace) return [];
    return workspace.entries.filter((e) => selectedEntryIds.includes(e.id));
  }, [workspace, selectedEntryIds]);

  // Tasks / Follow-ups for Right Panel
  const followUpEntries = useMemo(() => {
    if (!workspace) return [];
    return workspace.entries.filter((e) => e.category === "followup");
  }, [workspace]);

  // Audio Playback Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio && audioOverview && audioOverview.dialogue.length > 0) {
      timer = setTimeout(() => {
        setCurrentDialogueIndex((prev) => {
          if (prev + 1 < audioOverview.dialogue.length) {
            return prev + 1;
          } else {
            setIsPlayingAudio(false);
            return 0;
          }
        });
      }, 4200);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAudio, currentDialogueIndex, audioOverview]);

  // Toggle entry selection for AI context
  const toggleEntrySelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEntryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select / Deselect All
  const handleToggleSelectAll = () => {
    if (selectedEntryIds.length === filteredEntries.length) {
      setSelectedEntryIds([]);
    } else {
      setSelectedEntryIds(filteredEntries.map((e) => e.id));
    }
  };

  // Handle Query Submission to Grounded AI Copilot
  const handleSendQuery = async (queryText?: string) => {
    const q = (queryText || queryInput).trim();
    if (!q || isSynthesizing) return;

    if (!user) {
      onOpenAuth?.("signup", "Sign up free to execute zero-hallucination RAG queries against your Second Brain");
      return;
    }

    const userMsgId = `user_${Date.now()}`;
    const newMsg = {
      id: userMsgId,
      sender: "user" as const,
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setQueryInput("");
    setIsSynthesizing(true);
    setActiveCenterView("chat");

    try {
      const response = await askZ961BrainCopilot(user, q, selectedEntryIds);
      const copilotMsgId = `copilot_${Date.now()}`;

      setChatMessages((prev) => [
        ...prev,
        {
          id: copilotMsgId,
          sender: "copilot",
          text: response.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: response.citations,
          groundingConfidence: response.confidence,
          sourcesUsed: response.sourcesUsed
        }
      ]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `copilot_err_${Date.now()}`,
          sender: "copilot",
          text: "I encountered an error synthesizing response from your workspace sources. Please verify your selected documents and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundingConfidence: 0
        }
      ]);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Generate Google NotebookLM-Style Audio Deep Dive
  const handleGenerateAudio = async () => {
    if (!user) {
      onOpenAuth?.("signup", "Generate 2-host audio deep dives from your Second Brain");
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const audioRes = await generateZ961AudioOverview(user, selectedEntryIds);
      setAudioOverview(audioRes);
      setCurrentDialogueIndex(0);
      setIsPlayingAudio(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Add Source from Modal
  const handleAddSourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth?.("signup", "Add custom research and documents to your personal Second Brain");
      return;
    }

    if (!newTitle.trim() || !newText.trim()) return;

    setIsSubmittingNewSource(true);
    try {
      const tagsArray = newTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const entry = await addWorkspaceEntry(user, {
        category: newCategory,
        sourceType: "file_upload",
        title: newTitle.trim(),
        text: newText.trim(),
        tags: tagsArray.length > 0 ? tagsArray : ["Custom Entry"]
      });

      if (workspace) {
        setWorkspace({
          ...workspace,
          entries: [entry, ...workspace.entries]
        });
      }
      setSelectedEntryIds((prev) => [entry.id, ...prev]);
      setActiveViewingEntryId(entry.id);
      setIsAddSourceModalOpen(false);
      setNewTitle("");
      setNewText("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingNewSource(false);
    }
  };

  // Quick Add Follow-up Task in Panel C
  const handleAddQuickTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowupTask.trim()) return;
    if (!user) {
      onOpenAuth?.("signup", "Save actionable tasks and track follow-ups");
      return;
    }

    try {
      const entry = await addWorkspaceEntry(user, {
        category: "followup",
        sourceType: "web_clipper",
        title: newFollowupTask.trim().slice(0, 60),
        text: newFollowupTask.trim(),
        tags: ["ActionItem", "FollowUp", newFollowupPriority.toUpperCase()],
        followupDetails: {
          task: newFollowupTask.trim(),
          priority: newFollowupPriority,
          completed: false,
          dueDate: new Date(Date.now() + 7 * 86400 * 1000).toISOString().split("T")[0]
        }
      });

      if (workspace) {
        setWorkspace({
          ...workspace,
          entries: [entry, ...workspace.entries]
        });
      }
      setNewFollowupTask("");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Task Completion
  const handleToggleTask = (taskId: string) => {
    if (!workspace) return;
    const updatedEntries = workspace.entries.map((e) => {
      if (e.id === taskId && e.contentPayload.followupDetails) {
        return {
          ...e,
          contentPayload: {
            ...e.contentPayload,
            followupDetails: {
              ...e.contentPayload.followupDetails,
              completed: !e.contentPayload.followupDetails.completed
            }
          }
        };
      }
      return e;
    });

    setWorkspace({
      ...workspace,
      entries: updatedEntries
    });

    // Save locally
    const storageKey = user?.email
      ? `z961_brain_ws_${user.email.replace(/[^a-z0-9]/gi, "_")}`
      : "z961_brain_ws_guest";
    localStorage.setItem(storageKey, JSON.stringify({ ...workspace, entries: updatedEntries }));
  };

  const workspaceTitle = user
    ? `${user.name} | z961 Intelligence Engine`
    : "Guest Preview | z961 Intelligence Engine";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP CONTROL BAR */}
      {/* ========================================================================= */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 py-3 sticky top-0 z-30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight">
                {workspaceTitle}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                PROVISIONED
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span>{user?.affiliation || "Ecosystem Researcher"}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">
                {workspace?.entries.length || 0} Grounded Sources Ingested
              </span>
              <span>•</span>
              <span className="text-slate-500">Andrej Karpathy LLM Wiki Architecture</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Core Modules Toggle */}
          <button
            onClick={() => setShowCoreModules(!showCoreModules)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
              showCoreModules
                ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
            }`}
            title="Toggle Platform Core Modules & Quick Access"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Platform Modules</span>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-colors cursor-pointer"
            title="Ingest via WhatsApp (+961 70 247 961)"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Ingest</span>
            <span className="text-[10px] px-1 bg-emerald-500 text-slate-950 rounded font-bold">
              +961
            </span>
          </button>

          {/* Architecture Modal Button */}
          <button
            onClick={() => setIsArchModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Architecture & Tests</span>
          </button>

          {/* Add Source CTA */}
          <button
            onClick={() => {
              if (!user) {
                onOpenAuth?.("signup", "Upload custom intelligence and notes to your Second Brain");
              } else {
                setIsAddSourceModalOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Source</span>
          </button>
        </div>
      </header>

      {/* Expandable Platform Core Modules & Quick Access Panel */}
      {showCoreModules && (
        <div className="p-3 sm:p-4 bg-slate-950/90 border-b border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
          <PlatformCoreModulesBar
            user={user}
            onNavigateToModule={onNavigateToModule}
            onNavigateToDirectory={onNavigateToDirectory}
            onNavigateToQuestionnaire={() => onNavigateToModule?.(2)}
            onOpenPricing={onOpenPricing}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. THREE-PANEL EMBEDDED WORKSPACE CANVAS */}
      {/* ========================================================================= */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-65px)]">
        {/* ======================================================================= */}
        {/* PANEL A (LEFT): SOURCES & CRM DIRECTORY (Cols 1-3, 310px-350px) */}
        {/* ======================================================================= */}
        <section aria-label="Knowledge Sources" className="lg:col-span-3 border-r border-slate-800 bg-slate-900/50 flex flex-col h-full overflow-hidden">
          {/* Panel A Header & Search */}
          <div className="p-3.5 border-b border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 font-mono">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Knowledge Base & Sources</span>
              </div>
              <button
                onClick={handleToggleSelectAll}
                className="text-[10px] font-mono text-emerald-400 hover:underline cursor-pointer"
              >
                {selectedEntryIds.length === filteredEntries.length ? "Deselect All" : "Select All"}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sources, tags, Wikilinks..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono no-scrollbar">
              {(
                [
                  { id: "all", label: "All" },
                  { id: "research", label: "Research" },
                  { id: "contact", label: "CRM" },
                  { id: "note", label: "Notes" },
                  { id: "followup", label: "Tasks" }
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sources List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {isLoadingWorkspace ? (
              <div className="p-8 text-center text-xs text-slate-500 font-mono space-y-2">
                <Brain className="w-6 h-6 text-emerald-500 animate-pulse mx-auto" />
                <p>Mounting Sovereign Second Brain Vault...</p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl space-y-2">
                <FileText className="w-6 h-6 text-slate-600 mx-auto" />
                <p>No documents found matching current filter.</p>
                <button
                  onClick={() => setIsAddSourceModalOpen(true)}
                  className="text-emerald-400 hover:underline text-xs"
                >
                  + Add first document
                </button>
              </div>
            ) : (
              filteredEntries.map((entry) => {
                const isSelected = selectedEntryIds.includes(entry.id);
                const isViewing = activeViewingEntryId === entry.id;

                const categoryBadgeColor =
                  entry.category === "research"
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    : entry.category === "contact"
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    : entry.category === "followup"
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

                return (
                  <div
                    key={entry.id}
                    onClick={() => {
                      setActiveViewingEntryId(entry.id);
                      setActiveCenterView("document");
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      isViewing
                        ? "bg-slate-800/90 border-emerald-500/60 shadow-xs"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        {/* Checkbox for Grounded RAG selection */}
                        <button
                          type="button"
                          onClick={(e) => toggleEntrySelection(entry.id, e)}
                          className="mt-0.5 text-slate-400 hover:text-emerald-400 cursor-pointer"
                          title="Include in AI Copilot Grounding Context"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </button>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-xs font-bold text-slate-200 truncate hover:text-white">
                            {entry.title}
                          </h2>
                          <p className="text-[10px] text-slate-400 line-clamp-1">
                            {entry.contentPayload.text.slice(0, 80)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                      <span className={`px-1.5 py-0.2 rounded border uppercase font-bold text-[9px] ${categoryBadgeColor}`}>
                        {entry.category}
                      </span>
                      <span className="text-slate-500">
                        {entry.sourceType === "whatsapp"
                          ? "WhatsApp z24seven"
                          : entry.sourceType === "web_cta"
                          ? "Web CTA"
                          : "Vault Asset"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Panel A Footer Status */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>
              <strong>{selectedEntryIds.length}</strong> of {workspace?.entries.length || 0} active in AI context
            </span>
            <span className="text-emerald-400">Zero Hallucination</span>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* PANEL B (CENTER): DUAL-MODE CANVAS (CO-PILOT CHAT / MARKDOWN READER) (Cols 4-8) */}
        {/* ======================================================================= */}
        <section aria-label="Synthesis Canvas" className="lg:col-span-5 border-r border-slate-800 bg-slate-950 flex flex-col h-full overflow-hidden">
          {/* Panel B Header Tabs */}
          <div className="p-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCenterView("chat")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCenterView === "chat"
                    ? "bg-emerald-600 text-slate-950 shadow-xs"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Grounded AI Copilot</span>
              </button>
              <button
                onClick={() => setActiveCenterView("document")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCenterView === "document"
                    ? "bg-emerald-600 text-slate-950 shadow-xs"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Document / Dossier Reader</span>
              </button>
            </div>

            {activeCenterView === "document" && activeEntry && (
              <button
                onClick={() => {
                  setActiveCenterView("chat");
                  handleSendQuery(`Explain the key strategic takeaways and regulatory implications of [[${activeEntry.title}]]`);
                }}
                className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ask AI about this</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* VIEW 1: GROUNDED AI COPILOT CHAT */}
          {activeCenterView === "chat" && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col space-y-1.5 ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 px-1">
                      <span>{msg.sender === "user" ? user?.name || "You" : "z961 Copilot (Grounded RAG)"}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs max-w-[90%] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-emerald-600 text-slate-950 font-medium"
                          : "bg-slate-900 border border-slate-800 text-slate-200 font-sans shadow-md"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {/* Grounded Citations & Sources Pill Bar */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1.5 font-mono text-[10px]">
                          <div className="flex items-center justify-between text-emerald-400 font-bold">
                            <span className="flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Verified Citations ({msg.citations.length})</span>
                            </span>
                            <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded text-[9px]">
                              {msg.groundingConfidence || 95}% Grounded
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {msg.citations.map((cite, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  // Jump to source document if match found
                                  const match = workspace?.entries.find((e) =>
                                    cite.toLowerCase().includes(e.title.toLowerCase())
                                  );
                                  if (match) {
                                    setActiveViewingEntryId(match.id);
                                    setActiveCenterView("document");
                                  }
                                }}
                                className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-500 text-[10px] flex items-center gap-1 cursor-pointer"
                              >
                                <span>[{idx + 1}]</span>
                                <span>{cite}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isSynthesizing && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-emerald-400 max-w-[320px] animate-pulse">
                    <Brain className="w-4 h-4 animate-spin" />
                    <span>Executing grounded synthesis across {selectedEntryIds.length} sources...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-900/30 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono no-scrollbar">
                <span className="text-slate-500 shrink-0">Quick Queries:</span>
                {[
                  "BDL Circular 165 compliance",
                  "Cedar AI Syndicate ticket sizes",
                  "Delaware Flip legal steps",
                  "List all urgent tasks"
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuery(prompt)}
                    className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Query Input Bar */}
              <div className="p-3 border-t border-slate-800 bg-slate-900/80">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendQuery();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder={`Ask zero-hallucination copilot across ${selectedEntryIds.length} selected sources...`}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isSynthesizing || !queryInput.trim()}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 font-mono shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ask Copilot</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* VIEW 2: DOCUMENT / DOSSIER MARKDOWN READER */}
          {activeCenterView === "document" && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeEntry ? (
                <div className="space-y-4 max-w-3xl">
                  {/* Document Meta Header */}
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase font-bold">
                        {activeEntry.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Ingested: {new Date(activeEntry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {activeEntry.title}
                    </h2>

                    {/* Tags & Wikilinks */}
                    {activeEntry.contentPayload.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeEntry.contentPayload.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CRM Contact Details Card (if category === 'contact') */}
                  {activeEntry.category === "contact" && activeEntry.contentPayload.contactDetails && (
                    <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/40 space-y-2 text-xs font-mono">
                      <div className="text-purple-300 font-bold uppercase text-[11px]">
                        CRM Profile Record
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-300">
                        <div>Name: <strong className="text-white">{activeEntry.contentPayload.contactDetails.name}</strong></div>
                        <div>Role: <strong className="text-white">{activeEntry.contentPayload.contactDetails.role}</strong></div>
                        <div>Organization: <strong className="text-white">{activeEntry.contentPayload.contactDetails.organization}</strong></div>
                        <div>Email: <strong className="text-emerald-400">{activeEntry.contentPayload.contactDetails.email}</strong></div>
                        {activeEntry.contentPayload.contactDetails.ticketSize && (
                          <div>Ticket Size: <strong className="text-amber-400">{activeEntry.contentPayload.contactDetails.ticketSize}</strong></div>
                        )}
                        {activeEntry.contentPayload.contactDetails.location && (
                          <div>Location: <strong className="text-slate-300">{activeEntry.contentPayload.contactDetails.location}</strong></div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Markdown Content Body */}
                  <div className="prose prose-invert prose-xs max-w-none space-y-3 text-slate-300 text-xs leading-relaxed font-sans">
                    <div className="whitespace-pre-wrap">
                      {activeEntry.contentPayload.text}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">
                  Select a document from Panel A to view its markdown contents.
                </div>
              )}
            </div>
          )}
        </section>

        {/* ======================================================================= */}
        {/* PANEL C (RIGHT): STUDIO & ACTION MATRIX (Cols 9-12, 340px-380px) */}
        {/* ======================================================================= */}
        <section aria-label="Action Matrix" className="lg:col-span-4 bg-slate-900/40 flex flex-col h-full overflow-hidden">
          {/* SUBPANEL 1: GOOGLE NOTEBOOKLM AUDIO STUDIO */}
          <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-900/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-mono">
                    2-Host Audio Deep Dive
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    NotebookLM AI Architecture
                  </span>
                </div>
              </div>

              <button
                onClick={handleGenerateAudio}
                disabled={isGeneratingAudio}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{isGeneratingAudio ? "Synthesizing..." : "Generate Audio"}</span>
              </button>
            </div>

            {/* Audio Player Box */}
            {audioOverview ? (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono truncate">
                    {audioOverview.title}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400">
                    {audioOverview.duration}
                  </span>
                </div>

                {/* Simulated Audio Waveform Bar */}
                <div className="flex items-center gap-1 h-6 bg-slate-900/90 rounded-lg px-2 py-1">
                  {[40, 75, 55, 90, 30, 85, 60, 95, 50, 70, 45, 80, 65, 90, 35, 75].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlayingAudio
                          ? i % 2 === 0
                            ? "bg-indigo-400"
                            : "bg-emerald-400"
                          : "bg-slate-700"
                      }`}
                      style={{ height: isPlayingAudio ? `${(h * ((i + currentDialogueIndex) % 3 + 1)) / 3}%` : "30%" }}
                    />
                  ))}
                </div>

                {/* Current Dialogue Quote */}
                {audioOverview.dialogue[currentDialogueIndex] && (
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] font-sans">
                    <span className="font-bold text-indigo-300 block text-[10px] font-mono">
                      Host {audioOverview.dialogue[currentDialogueIndex].speaker}:
                    </span>
                    <p className="text-slate-200 italic line-clamp-2">
                      "{audioOverview.dialogue[currentDialogueIndex].text}"
                    </p>
                  </div>
                )}

                {/* Play / Pause Control */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs font-mono cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? "Pause Deep Dive" : "Play Deep Dive"}</span>
                  </button>
                  <span className="text-[10px] font-mono text-slate-500">
                    Clip {currentDialogueIndex + 1} of {audioOverview.dialogue.length}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center text-[11px] font-mono text-slate-500">
                Click "Generate Audio" to synthesize a 2-host conversational podcast analyzing your active sources.
              </div>
            )}
          </div>

          {/* SUBPANEL 2: ACTIONABLE FOLLOW-UP TASK MATRIX */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white font-mono">
                  Actionable Follow-up Matrix
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {followUpEntries.filter((f) => f.contentPayload.followupDetails?.completed).length}/
                {followUpEntries.length} Done
              </span>
            </div>

            {/* Inline Quick Add Task */}
            <form onSubmit={handleAddQuickTask} className="space-y-1.5">
              <input
                type="text"
                value={newFollowupTask}
                onChange={(e) => setNewFollowupTask(e.target.value)}
                placeholder="Add actionable follow-up task..."
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 font-mono"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-mono">
                  {(["urgent", "high", "normal"] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setNewFollowupPriority(p)}
                      className={`px-1.5 py-0.5 rounded uppercase font-bold cursor-pointer ${
                        newFollowupPriority === p
                          ? p === "urgent"
                            ? "bg-rose-500 text-white"
                            : p === "high"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-emerald-500 text-slate-950"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!newFollowupTask.trim()}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] font-mono cursor-pointer disabled:opacity-50"
                >
                  + Add Item
                </button>
              </div>
            </form>

            {/* Task Items List */}
            <div className="space-y-2 pt-1">
              {followUpEntries.length === 0 ? (
                <div className="p-4 text-center text-[11px] font-mono text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No follow-up tasks registered.
                </div>
              ) : (
                followUpEntries.map((task) => {
                  const details = task.contentPayload.followupDetails;
                  const isCompleted = details?.completed;

                  return (
                    <div
                      key={task.id}
                      className={`p-2.5 rounded-xl border transition-all text-xs font-mono space-y-1 ${
                        isCompleted
                          ? "bg-slate-950/40 border-slate-800/60 opacity-60"
                          : "bg-slate-950 border-slate-800"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleTask(task.id)}
                          className="mt-0.5 text-slate-400 hover:text-amber-400 cursor-pointer shrink-0"
                        >
                          {isCompleted ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-slate-200 ${isCompleted ? "line-through text-slate-500" : ""}`}>
                            {details?.task || task.title}
                          </p>
                          <div className="flex items-center gap-2 pt-1 text-[9px]">
                            <span
                              className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                                details?.priority === "urgent"
                                  ? "bg-rose-500/20 text-rose-400"
                                  : details?.priority === "high"
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {details?.priority || "Normal"}
                            </span>
                            {details?.dueDate && (
                              <span className="text-slate-500">Due: {details.dueDate}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 3. MODALS */}
      {/* ========================================================================= */}
      {/* Add Custom Source Modal */}
      {isAddSourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-100 font-sans">
            <h2 className="text-sm font-bold text-white font-mono">
              Ingest Document or Research Note
            </h2>

            <form onSubmit={handleAddSourceSubmit} className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cedar AI Syndicate Term Sheet Guidelines 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as WorkspaceCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="research">Research & Dossier</option>
                    <option value="contact">CRM Contact</option>
                    <option value="note">Scratchpad Note</option>
                    <option value="followup">Action Item / Task</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Markdown Content Body *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Paste or write the dossier, interview findings, or markdown notes..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 resize-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSourceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNewSource}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isSubmittingNewSource ? "Ingesting..." : "Save to Second Brain"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Modal */}
      <WhatsAppIntegrationModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        user={user}
        onEntryAdded={(entry) => {
          if (workspace) {
            setWorkspace({
              ...workspace,
              entries: [entry, ...workspace.entries]
            });
            setSelectedEntryIds((prev) => [entry.id, ...prev]);
            setActiveViewingEntryId(entry.id);
          }
        }}
      />

      {/* System Architecture & Tests Modal */}
      <SystemArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </div>
  );
};
