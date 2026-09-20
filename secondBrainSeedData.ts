import React, { useState } from "react";
import { UserAuthSession, WorkspaceEntry, WorkspaceCategory } from "../../types";
import { addWorkspaceEntry } from "../../lib/z961SecondBrainService";
import {
  Brain,
  Plus,
  X,
  Sparkles,
  Phone,
  Bookmark,
  Check,
  CheckCircle2,
  FileText,
  UserPlus,
  ListTodo,
  ExternalLink,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface FloatingWorkspaceCaptureProps {
  user: UserAuthSession | null;
  activeModuleTitle?: string;
  onOpenAuth: (mode?: "signin" | "signup", reason?: string) => void;
  onNavigateToWorkspace: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenArchitectureModal: () => void;
  onEntryAdded?: (entry: WorkspaceEntry) => void;
}

export const FloatingWorkspaceCapture: React.FC<FloatingWorkspaceCaptureProps> = ({
  user,
  activeModuleTitle = "961AI Network Intelligence Platform",
  onOpenAuth,
  onNavigateToWorkspace,
  onOpenWhatsAppModal,
  onOpenArchitectureModal,
  onEntryAdded
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"page" | "note" | "contact" | "followup">("page");

  // Form states
  const [title, setTitle] = useState("");
  const [notesText, setNotesText] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactOrg, setContactOrg] = useState("");
  const [followupTask, setFollowupTask] = useState("");
  const [followupPriority, setFollowupPriority] = useState<"urgent" | "high" | "normal">("high");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);

  const workspaceName = user
    ? `${user.name} | z961 Intelligence Engine`
    : "Visitor Preview Mode";

  const sourcesCount = user?.ingested_sources_count || 6;

  const handleCaptureCurrentPage = async () => {
    if (!user) {
      onOpenAuth("signup", "Save page & market dossiers directly into your personal z961 Second Brain");
      return;
    }

    setIsSubmitting(true);
    setSuccessFeedback(null);

    const docTitle = title.trim() || `Network Intelligence: ${activeModuleTitle}`;
    const docText = notesText.trim() || `Captured market dossier and ecosystem records from ${activeModuleTitle} on ${new Date().toLocaleString()}. Contains verified Lebanese AI startup comps, regulatory clauses, and directory listings.`;

    try {
      const entry = await addWorkspaceEntry(user, {
        category: "research",
        sourceType: "web_cta",
        title: docTitle,
        text: docText,
        tags: ["WebCTA", "PageCapture", "MarketDossier"],
        researchDetails: {
          documentTitle: docTitle,
          categoryName: "Network Capture",
          authorOrEntity: "961AI Network Explorer"
        }
      });

      if (onEntryAdded) onEntryAdded(entry);
      setSuccessFeedback(`Captured to "${user.name}'s z961 Second Brain" under Research!`);
      setTimeout(() => {
        setSuccessFeedback(null);
        setIsOpen(false);
        setTitle("");
        setNotesText("");
      }, 1200);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveQuickNote = async () => {
    if (!user) {
      onOpenAuth("signup", "Access your personal Second Brain notepad");
      return;
    }

    if (!notesText.trim()) return;

    setIsSubmitting(true);
    try {
      const entry = await addWorkspaceEntry(user, {
        category: "note",
        sourceType: "web_clipper",
        title: title.trim() || `Quick Scratchpad Note (${new Date().toLocaleDateString()})`,
        text: notesText,
        tags: ["QuickNote", "MeetingSynthesis"]
      });

      if (onEntryAdded) onEntryAdded(entry);
      setSuccessFeedback("Note saved to Second Brain!");
      setTimeout(() => {
        setSuccessFeedback(null);
        setIsOpen(false);
        setTitle("");
        setNotesText("");
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveContact = async () => {
    if (!user) {
      onOpenAuth("signup", "Save verified ecosystem contacts into your CRM");
      return;
    }

    if (!contactName.trim()) return;

    setIsSubmitting(true);
    try {
      const entry = await addWorkspaceEntry(user, {
        category: "contact",
        sourceType: "web_clipper",
        title: `Contact: ${contactName}`,
        text: `${contactName} (${contactRole}) at ${contactOrg}. Email: ${contactEmail}. Captured via 961AI Quick Clipper.`,
        tags: ["CRM", "NetworkContact"],
        contactDetails: {
          name: contactName,
          role: contactRole,
          organization: contactOrg,
          email: contactEmail
        }
      });

      if (onEntryAdded) onEntryAdded(entry);
      setSuccessFeedback(`Contact "${contactName}" added to CRM!`);
      setTimeout(() => {
        setSuccessFeedback(null);
        setIsOpen(false);
        setContactName("");
        setContactRole("");
        setContactOrg("");
        setContactEmail("");
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveFollowup = async () => {
    if (!user) {
      onOpenAuth("signup", "Track actionable ecosystem follow-ups");
      return;
    }

    if (!followupTask.trim()) return;

    setIsSubmitting(true);
    try {
      const entry = await addWorkspaceEntry(user, {
        category: "followup",
        sourceType: "web_clipper",
        title: followupTask.slice(0, 60),
        text: followupTask,
        tags: ["ActionItem", "FollowUp", followupPriority.toUpperCase()],
        followupDetails: {
          task: followupTask,
          priority: followupPriority,
          completed: false,
          dueDate: new Date(Date.now() + 7 * 86400 * 1000).toISOString().split("T")[0]
        }
      });

      if (onEntryAdded) onEntryAdded(entry);
      setSuccessFeedback("Follow-up task created in your Second Brain!");
      setTimeout(() => {
        setSuccessFeedback(null);
        setIsOpen(false);
        setFollowupTask("");
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating CTA Trigger Bar (Fixed Bottom Right) */}
      <aside aria-label="Quick Actions" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Architecture Specs Pill */}
        <button
          onClick={onOpenArchitectureModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-700/80 text-xs font-mono shadow-lg transition-all backdrop-blur-md cursor-pointer"
          title="Inspect System Architecture & Run Integration Tests"
        >
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>Architecture & Tests</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* WhatsApp z24seven Trigger Pill */}
        <button
          onClick={onOpenWhatsAppModal}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white border border-neutral-700 text-xs font-mono shadow-lg transition-all backdrop-blur-md cursor-pointer"
          title="Trigger WhatsApp z24seven Ingestion (+961 70 247 961)"
        >
          <Phone className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline text-white font-semibold">WhatsApp Ingest</span>
          <span className="text-[10px] px-1 py-0.2 bg-white text-black rounded font-bold">
            +961
          </span>
        </button>

        {/* Main Floating "Save to z961 Second Brain" Button */}
        <button
          onClick={() => {
            if (!user) {
              onOpenAuth("signup", "Sign up free to access your sovereign z961 Second Brain and save intelligence records");
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40 font-mono"
        >
          <div className="w-5 h-5 rounded-lg bg-black/20 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <span className="font-bold">Save to z961 Brain</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-black/30 rounded-full text-emerald-200">
            {sourcesCount}
          </span>
        </button>
      </aside>

      {/* Global Quick-Capture / Web Clipper Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-100 font-sans relative">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white font-mono">
                    Universal Capture to z961 Second Brain
                  </h2>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Target: <strong className="text-emerald-400">{workspaceName}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Ingestion Mode Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
              <button
                onClick={() => { setActiveTab("page"); setSuccessFeedback(null); }}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "page" ? "bg-emerald-600 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Page</span>
              </button>
              <button
                onClick={() => { setActiveTab("note"); setSuccessFeedback(null); }}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "note" ? "bg-emerald-600 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Note</span>
              </button>
              <button
                onClick={() => { setActiveTab("contact"); setSuccessFeedback(null); }}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "contact" ? "bg-emerald-600 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Contact</span>
              </button>
              <button
                onClick={() => { setActiveTab("followup"); setSuccessFeedback(null); }}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === "followup" ? "bg-emerald-600 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                <ListTodo className="w-3.5 h-3.5" />
                <span>Task</span>
              </button>
            </div>

            {/* TAB 1: Capture Current Page */}
            {activeTab === "page" && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs font-mono">
                  <span className="text-slate-400">Current View Context:</span>
                  <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                    <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeModuleTitle}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Custom Title (Optional):</label>
                  <input
                    type="text"
                    placeholder={`e.g. Market Dossier: ${activeModuleTitle}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Personal Synthesis / Notes to attach:</label>
                  <textarea
                    rows={3}
                    placeholder="Add observations, deal terms, or tags..."
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono resize-none"
                  />
                </div>

                <button
                  onClick={handleCaptureCurrentPage}
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer font-mono"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Ingesting..." : "Save Page to Research Vault"}</span>
                </button>
              </div>
            )}

            {/* TAB 2: Quick Meeting Note */}
            {activeTab === "note" && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Note Title (e.g. Due Diligence Call with Cedar Angels)..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                />

                <textarea
                  rows={5}
                  placeholder="Write quick meeting notes, action items, or thesis..."
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono resize-none"
                />

                <button
                  onClick={handleSaveQuickNote}
                  disabled={isSubmitting || !notesText.trim()}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer font-mono disabled:opacity-50"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Saving..." : "Save Note to Second Brain"}</span>
                </button>
              </div>
            )}

            {/* TAB 3: Quick Contact */}
            {activeTab === "contact" && (
              <div className="space-y-2.5 font-mono text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Zein"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Cedar Syndicate"
                      value={contactOrg}
                      onChange={(e) => setContactOrg(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Partner"
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Email</label>
                    <input
                      type="email"
                      placeholder="e.g. maya@cedar.vc"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveContact}
                  disabled={isSubmitting || !contactName.trim()}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer font-mono disabled:opacity-50"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Saving Contact..." : "Save Contact to CRM"}</span>
                </button>
              </div>
            )}

            {/* TAB 4: Quick Follow-up */}
            {activeTab === "followup" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Action Item / Follow-up Task:</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Follow up on Law 126/2019 remote board resolution with notary public"
                    value={followupTask}
                    onChange={(e) => setFollowupTask(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">Priority:</span>
                  {(["urgent", "high", "normal"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setFollowupPriority(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs uppercase font-bold transition-colors cursor-pointer ${
                        followupPriority === p
                          ? p === "urgent"
                            ? "bg-rose-500 text-white"
                            : p === "high"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-emerald-500 text-slate-950"
                          : "bg-slate-950 text-slate-400 border border-slate-800"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleSaveFollowup}
                  disabled={isSubmitting || !followupTask.trim()}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer font-mono disabled:opacity-50"
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Adding..." : "Add Follow-up Item"}</span>
                </button>
              </div>
            )}

            {/* Success Feedback */}
            {successFeedback && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successFeedback}</span>
              </div>
            )}

            {/* Footer Quick Links */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenWhatsAppModal();
                }}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp (+961 70 247 961)</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToWorkspace();
                }}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
