import React, { useState, useEffect } from "react";
import { AICaseStudy, EcosystemIdea, EcosystemContributor, IdeaStatus, IdeaNotification } from "../../types";
import { 
  INITIAL_AI_CASE_STUDIES, 
  INITIAL_ECOSYSTEM_IDEAS, 
  INITIAL_ECOSYSTEM_CONTRIBUTORS 
} from "../../data/ideasLabData";
import { AiWorldCaseStudies } from "./ideasLab/AiWorldCaseStudies";
import { EcosystemFeedbackPlatform } from "./ideasLab/EcosystemFeedbackPlatform";
import { SubmitIdeaDrawer } from "./ideasLab/SubmitIdeaDrawer";
import { 
  BookOpen, 
  Lightbulb, 
  Sparkles, 
  Plus, 
  Layers, 
  Globe2, 
  ArrowUpRight 
} from "lucide-react";

export const ModuleIdeasLab: React.FC = () => {
  // Active Main Section (A: Case Studies vs B: Feedback Platform)
  const [activeSection, setActiveSection] = useState<"case-studies" | "feedback">("feedback");
  
  // Data State
  const [ideas, setIdeas] = useState<EcosystemIdea[]>(INITIAL_ECOSYSTEM_IDEAS);
  const [caseStudies] = useState<AICaseStudy[]>(INITIAL_AI_CASE_STUDIES);
  const [contributors] = useState<EcosystemContributor[]>(INITIAL_ECOSYSTEM_CONTRIBUTORS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Automated notification triggers log
  const [automatedNotifications, setAutomatedNotifications] = useState<IdeaNotification[]>([
    {
      id: "notif-init-1",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      recipient: "ziad@phoenicia-compute.ai",
      type: "Email + SMS",
      triggerEvent: "Status changed to 'Under Review'",
      ideaId: "idea-1",
      ideaTitle: "Lebanon Sovereign AI Compute Pool at BDD",
      newStatus: "Under Review",
      status: "Delivered",
      contentSnippet: "Your proposal is now under triage by the Sovereign Compute working group.",
      read: false
    }
  ]);

  // Fetch initial ideas and notifications from backend API (graceful fallback)
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("/api/ideas");
        if (res.ok) {
          const data = await res.json();
          if (data.ideas && Array.isArray(data.ideas) && data.ideas.length > 0) {
            setIdeas(data.ideas);
          }
        }
      } catch (err) {
        console.warn("Using local ideas state fallback:", err);
      }
    };

    const fetchNotifs = async () => {
      try {
        const res = await fetch("/api/ideas/notifications");
        if (res.ok) {
          const data = await res.json();
          if (data.notifications && Array.isArray(data.notifications) && data.notifications.length > 0) {
            setAutomatedNotifications(data.notifications);
          }
        }
      } catch (err) {
        console.warn("Using local notifications state fallback:", err);
      }
    };

    fetchIdeas();
    fetchNotifs();
  }, []);

  // Handle Upvote
  const handleUpvote = async (id: string) => {
    // Optimistic update
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === id) {
          const nextUpvoted = !idea.hasUpvoted;
          return {
            ...idea,
            hasUpvoted: nextUpvoted,
            upvotes: Math.max(0, idea.upvotes + (nextUpvoted ? 1 : -1))
          };
        }
        return idea;
      })
    );

    try {
      await fetch(`/api/ideas/${id}/upvote`, { method: "POST" });
    } catch (e) {
      console.warn("Backend upvote sync failed, retained optimistic update:", e);
    }
  };

  // Handle Submit Idea
  const handleSubmitIdea = async (newIdeaPayload: Partial<EcosystemIdea>) => {
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIdeaPayload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.idea) {
          setIdeas((prev) => [data.idea, ...prev]);
          return;
        }
      }
      
      // Fallback local insertion
      const localIdea: EcosystemIdea = {
        id: "idea-" + Date.now(),
        title: newIdeaPayload.title || "Untitled Proposal",
        category: newIdeaPayload.category || "Infrastructure",
        status: "Submitted",
        problemStatement: newIdeaPayload.problemStatement || "",
        proposedSolution: newIdeaPayload.proposedSolution || "",
        expectedImpact: newIdeaPayload.expectedImpact || "",
        feedbackPreference: newIdeaPayload.feedbackPreference || "Public Ecosystem Discussion",
        submitterName: newIdeaPayload.submitterName || "Community Member",
        submitterEmail: newIdeaPayload.submitterEmail || "anonymous@961ai.network",
        submitterOrg: newIdeaPayload.submitterOrg || "Lebanon AI Network",
        submitterAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
        upvotes: 1,
        hasUpvoted: true,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attachments: newIdeaPayload.attachments || [],
        officialUpdates: [],
        comments: []
      };
      setIdeas((prev) => [localIdea, ...prev]);
    } catch (err) {
      console.warn("Using local fallback insertion:", err);
    }
  };

  // Handle Add Comment
  const handleAddComment = async (
    ideaId: string,
    authorName: string,
    authorRole: string,
    text: string
  ) => {
    const newComment = {
      id: "comm-" + Date.now(),
      authorName,
      authorRole,
      text,
      createdAt: new Date().toISOString()
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const comments = idea.comments ? [...idea.comments, newComment] : [newComment];
          return {
            ...idea,
            comments,
            commentsCount: comments.length
          };
        }
        return idea;
      })
    );

    try {
      await fetch(`/api/ideas/${ideaId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName, authorRole, text })
      });
    } catch (e) {
      console.warn("Backend comment sync fallback:", e);
    }
  };

  // Handle Update Status
  const handleUpdateStatus = async (
    ideaId: string,
    status: IdeaStatus,
    adminNotes?: string
  ) => {
    const targetIdea = ideas.find(i => i.id === ideaId);
    const prevStatus = targetIdea?.status || "Submitted";

    // Optimistically update idea status
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            status,
            adminNotes,
            updatedAt: new Date().toISOString()
          };
        }
        return idea;
      })
    );

    // Automated notification trigger for 'Under Review', 'Planned', 'Completed' (and other status transitions)
    const newNotif: IdeaNotification = {
      id: "notif-" + Date.now(),
      timestamp: new Date().toISOString(),
      recipient: targetIdea?.submitterEmail || "submitter@961ai.network",
      type: "Email + SMS",
      triggerEvent: `Status changed from '${prevStatus}' to '${status}'`,
      ideaId,
      ideaTitle: targetIdea?.title || "Ecosystem Proposal",
      newStatus: status,
      status: "Delivered",
      contentSnippet: adminNotes || `Your submitted idea '${targetIdea?.title}' advanced to status '${status}'. Automated notification dispatched to ${targetIdea?.submitterEmail || "submitter"}.`,
      read: false
    };

    setAutomatedNotifications((prev) => [newNotif, ...prev]);

    try {
      const res = await fetch(`/api/ideas/${ideaId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.notification) {
          setAutomatedNotifications(prev => [data.notification, ...prev.filter(n => n.id !== newNotif.id)]);
        }
      }
    } catch (e) {
      console.warn("Backend status sync fallback:", e);
    }
  };

  // Handle Post Official Update
  const handlePostOfficialUpdate = async (
    ideaId: string,
    title: string,
    notes: string
  ) => {
    const newUpdate = {
      id: "upd-" + Date.now(),
      date: new Date().toISOString(),
      title,
      notes,
      adminName: "Maan (Platform Lead)",
      statusBadge: "In Progress"
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const officialUpdates = idea.officialUpdates
            ? [newUpdate, ...idea.officialUpdates]
            : [newUpdate];
          return {
            ...idea,
            officialUpdates,
            updatedAt: new Date().toISOString()
          };
        }
        return idea;
      })
    );

    try {
      await fetch(`/api/ideas/${ideaId}/official-update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, notes })
      });
    } catch (e) {
      console.warn("Backend official update fallback:", e);
    }
  };

  // Handle Send Private Response
  const handleSendPrivateResponse = async (
    ideaId: string,
    message: string,
    channel: "Email" | "SMS" | "Portal DM"
  ) => {
    try {
      await fetch(`/api/ideas/${ideaId}/private-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, channel })
      });
    } catch (e) {
      console.warn("Backend private response fallback:", e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Header & Section Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MODULE 19 • IDEAS & BENCHMARKS LAB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 mt-1">
            IdeasLab: Global Benchmarks & Ecosystem Voice
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-mono mt-0.5">
            Two integrated environments: MIT-style global case studies and the Lebanese feedback platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {/* Section Switcher Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 font-mono text-xs">
            <button
              onClick={() => setActiveSection("feedback")}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                activeSection === "feedback"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Lightbulb className={`w-4 h-4 ${activeSection === "feedback" ? "text-amber-500" : ""}`} />
              <span>"Got an Idea?" Feedback Platform</span>
            </button>

            <button
              onClick={() => setActiveSection("case-studies")}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                activeSection === "case-studies"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeSection === "case-studies" ? "text-emerald-600" : ""}`} />
              <span>AI World Case Studies (MIT-Style)</span>
            </button>
          </div>

          <button
            id="btn-ideaslab-submit-idea"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Your Idea</span>
          </button>
        </div>
      </div>

      {/* Render Active Section */}
      {activeSection === "feedback" ? (
        <EcosystemFeedbackPlatform
          ideas={ideas}
          contributors={contributors}
          onUpvote={handleUpvote}
          onSubmitIdea={handleSubmitIdea}
          onAddComment={handleAddComment}
          onUpdateStatus={handleUpdateStatus}
          onPostOfficialUpdate={handlePostOfficialUpdate}
          onSendPrivateResponse={handleSendPrivateResponse}
          isSubmitModalOpen={isSubmitModalOpen}
          setIsSubmitModalOpen={setIsSubmitModalOpen}
          automatedNotifications={automatedNotifications}
          onClearNotifications={() => setAutomatedNotifications([])}
        />
      ) : (
        <AiWorldCaseStudies
          caseStudies={caseStudies}
          onOpenSubmitIdeaModal={() => {
            setIsSubmitModalOpen(true);
          }}
        />
      )}

      {/* Slide-over Drawer Component for IdeasLab */}
      <SubmitIdeaDrawer
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitIdea={handleSubmitIdea}
        onTriggerStatusUpdate={handleUpdateStatus}
      />
    </div>
  );
};
