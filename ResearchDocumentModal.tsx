import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Lightbulb,
  Paperclip,
  FileText,
  CheckCircle2,
  Send,
  UploadCloud,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  Check
} from "lucide-react";
import { IdeaCategory, IdeaStatus, EcosystemIdea } from "../../../types";

export interface SubmitIdeaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitIdea: (idea: Partial<EcosystemIdea>) => Promise<void> | void;
  categories?: IdeaCategory[];
  onTriggerStatusUpdate?: (ideaId: string, status: IdeaStatus, notes?: string) => Promise<void>;
}

export const DEFAULT_IDEA_CATEGORIES: IdeaCategory[] = [
  "Infrastructure",
  "Policy & Regulation",
  "Funding & Grants",
  "Talent",
  "Community Events"
];

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

export const SubmitIdeaDrawer: React.FC<SubmitIdeaDrawerProps> = ({
  isOpen,
  onClose,
  onSubmitIdea,
  categories = DEFAULT_IDEA_CATEGORIES,
  onTriggerStatusUpdate
}) => {
  // Form field state
  const [ideaTitle, setIdeaTitle] = useState("");
  const [category, setCategory] = useState<IdeaCategory>(categories[0] || "Infrastructure");
  const [problemStatement, setProblemStatement] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [fileAttachment, setFileAttachment] = useState<AttachedFile | null>(null);

  // Optional author metadata
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [submitterOrg, setSubmitterOrg] = useState("");

  // Submission lifecycle state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    title: string;
    category: IdeaCategory;
    submitterName: string;
    submitterEmail: string;
    status: IdeaStatus;
    createdAt: string;
    fileName?: string;
  } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle single file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr =
        file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
          : Math.max(1, Math.round(file.size / 1024)) + " KB";

      setFileAttachment({
        id: "att-" + Date.now(),
        name: file.name,
        size: sizeStr,
        type: file.type || "document"
      });
      setValidationError(null);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr =
        file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
          : Math.max(1, Math.round(file.size / 1024)) + " KB";

      setFileAttachment({
        id: "att-" + Date.now(),
        name: file.name,
        size: sizeStr,
        type: file.type || "document"
      });
      setValidationError(null);
    }
  };

  const handleRemoveAttachment = () => {
    setFileAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Clear form handler
  const resetFormFields = () => {
    setIdeaTitle("");
    setCategory(categories[0] || "Infrastructure");
    setProblemStatement("");
    setProposedSolution("");
    setFileAttachment(null);
    setSubmitterName("");
    setSubmitterEmail("");
    setSubmitterOrg("");
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validate required fields
    if (!ideaTitle.trim()) {
      setValidationError("Please enter an Idea Title.");
      return;
    }
    if (!category) {
      setValidationError("Please select a Category.");
      return;
    }
    if (!problemStatement.trim()) {
      setValidationError("Please provide a Problem Statement describing the ecosystem bottleneck.");
      return;
    }
    if (!proposedSolution.trim()) {
      setValidationError("Please provide a Proposed Solution detailing how this can be executed.");
      return;
    }

    try {
      setIsSubmitting(true);
      const generatedId = "idea-" + Date.now();
      const payloadTitle = ideaTitle.trim();
      const payloadCategory = category;
      const authorName = submitterName.trim() || "Community Member";
      const authorEmail = submitterEmail.trim() || "submitter@961ai.network";

      const newIdeaPayload: Partial<EcosystemIdea> = {
        id: generatedId,
        title: payloadTitle,
        category: payloadCategory,
        problemStatement: problemStatement.trim(),
        proposedSolution: proposedSolution.trim(),
        expectedImpact: "Unlocks measurable technical capability and economic impact for Lebanon's ecosystem.",
        feedbackPreference: "Public Ecosystem Discussion",
        submitterName: authorName,
        submitterEmail: authorEmail,
        submitterOrg: submitterOrg.trim() || "Lebanon AI Network",
        attachments: fileAttachment ? [fileAttachment] : [],
        status: "Submitted"
      };

      await onSubmitIdea(newIdeaPayload);

      // Save receipt for success state
      setSubmittedReceipt({
        id: generatedId,
        title: payloadTitle,
        category: payloadCategory,
        submitterName: authorName,
        submitterEmail: authorEmail,
        status: "Submitted",
        createdAt: new Date().toISOString(),
        fileName: fileAttachment?.name
      });

      // Clear the form fields as required
      resetFormFields();

      // Show success state
      setSubmitSuccess(true);
    } catch (err: any) {
      setValidationError("Failed to submit idea: " + (err?.message || "Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewSubmission = () => {
    resetFormFields();
    setSubmitSuccess(false);
    setSubmittedReceipt(null);
  };

  const handleDrawerClose = () => {
    onClose();
    // After drawer finishes closing, if in success state, reset for next open
    setTimeout(() => {
      if (submitSuccess) {
        setSubmitSuccess(false);
        setSubmittedReceipt(null);
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop with fade-in / fade-out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={handleDrawerClose}
            aria-hidden="true"
          />

          {/* Slide-over panel container */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="pointer-events-auto w-screen max-w-xl bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800 shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>IdeasLab Intake Pipeline</span>
                  </div>
                  <h2 className="text-xl font-bold font-mono text-white tracking-tight">
                    Submit Your Idea
                  </h2>
                  <p className="text-xs text-slate-300 font-sans leading-snug max-w-md">
                    Propose sovereign AI infrastructure, open models, diaspora funding, or regulatory frameworks.
                  </p>
                </div>

                <button
                  id="btn-close-idea-drawer"
                  onClick={handleDrawerClose}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors shrink-0 ml-3"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body: Form or Success State */}
              <div className="flex-1 overflow-y-auto">
                {submitSuccess && submittedReceipt ? (
                  /* ======================================================== */
                  /* SUCCESS STATE VIEW                                       */
                  /* ======================================================== */
                  <div className="p-6 sm:p-8 space-y-6 font-mono">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center space-y-3"
                    >
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                      </div>
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                          PROPOSAL REGISTERED
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          Idea Submitted Successfully!
                        </h3>
                        <p className="text-xs text-slate-600 max-w-md mx-auto font-sans leading-relaxed">
                          Your proposal has been logged into the 961 AI Network ecosystem repository and assigned an active pipeline tracking beacon.
                        </p>
                      </div>
                    </motion.div>

                    {/* Receipt Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                      <div className="border-b border-slate-200 pb-3 flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                            Idea Title
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                            {submittedReceipt.title}
                          </h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          {submittedReceipt.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">
                            Category
                          </span>
                          <span className="font-bold text-slate-800">
                            {submittedReceipt.category}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">
                            Submitted By
                          </span>
                          <span className="font-bold text-slate-800 truncate block">
                            {submittedReceipt.submitterName}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">
                            Tracking ID
                          </span>
                          <span className="font-mono text-slate-700 text-[11px]">
                            {submittedReceipt.id}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">
                            Timestamp
                          </span>
                          <span className="text-slate-700 text-[11px]">
                            {new Date(submittedReceipt.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>

                        {submittedReceipt.fileName && (
                          <div className="col-span-2 pt-2 border-t border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                              Attached Spec / Deck
                            </span>
                            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700">
                              <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="font-mono truncate">{submittedReceipt.fileName}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status simulation controls if trigger callback provided */}
                      {onTriggerStatusUpdate && (
                        <div className="pt-3 border-t border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                            <span>Admin Lifecycle Simulation:</span>
                            <span className="text-[10px] text-slate-500 font-normal">Test triggers</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(["Under Review", "Planned", "Completed"] as IdeaStatus[]).map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => {
                                  onTriggerStatusUpdate(submittedReceipt.id, st, "Lifecycle update");
                                  setSubmittedReceipt((prev) => (prev ? { ...prev, status: st } : null));
                                }}
                                className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-300 bg-white hover:bg-slate-100 font-bold transition-colors"
                              >
                                Advance to '{st}'
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        id="btn-submit-another-idea"
                        type="button"
                        onClick={handleStartNewSubmission}
                        className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold font-mono transition-colors flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Submit Another Idea</span>
                      </button>

                      <button
                        id="btn-done-close-drawer"
                        type="button"
                        onClick={handleDrawerClose}
                        className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-mono transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <span>Done / Close Drawer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ======================================================== */
                  /* INTAKE FORM VIEW                                         */
                  /* ======================================================== */
                  <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 font-mono text-xs">
                    {/* Informational banner */}
                    <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-[11px] font-sans text-emerald-950 leading-relaxed">
                        <span className="font-bold block text-emerald-900 font-mono text-xs">
                          Ecosystem Direct-Review
                        </span>
                        Submissions are triaged by working group leads across Lebanese universities, diaspora syndicates, and technical partners.
                      </div>
                    </div>

                    {validationError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-mono">
                        {validationError}
                      </div>
                    )}

                    {/* 1. Idea Title */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="drawer-idea-title"
                        className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider"
                      >
                        Idea Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="drawer-idea-title"
                        type="text"
                        required
                        value={ideaTitle}
                        onChange={(e) => {
                          setIdeaTitle(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        placeholder="e.g., Sovereign Arabic LLM Fine-Tuning Cluster"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none text-xs font-mono transition-all"
                      />
                    </div>

                    {/* 2. Category Dropdown */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="drawer-category"
                        className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider"
                      >
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="drawer-category"
                          required
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value as IdeaCategory);
                            if (validationError) setValidationError(null);
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none text-xs font-mono appearance-none transition-all cursor-pointer"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <Layers className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* 3. Problem Statement */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="drawer-problem-statement"
                        className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider"
                      >
                        Problem Statement <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="drawer-problem-statement"
                        required
                        rows={3}
                        value={problemStatement}
                        onChange={(e) => {
                          setProblemStatement(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        placeholder="What friction, missing compute, talent leakage, or regulatory barrier does this solve for Lebanon?"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none text-xs font-sans leading-relaxed transition-all"
                      />
                    </div>

                    {/* 4. Proposed Solution */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="drawer-proposed-solution"
                        className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider"
                      >
                        Proposed Solution <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="drawer-proposed-solution"
                        required
                        rows={4}
                        value={proposedSolution}
                        onChange={(e) => {
                          setProposedSolution(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        placeholder="How should the ecosystem execute this? Outline the technical architecture, operational model, or required stakeholders..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 outline-none text-xs font-sans leading-relaxed transition-all"
                      />
                    </div>

                    {/* 5. Optional File Attachment Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="drawer-file-upload"
                          className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider"
                        >
                          Attachment (Optional)
                        </label>
                        <span className="text-[10px] text-slate-500 font-normal">
                          PDF, DOCX, Deck up to 10MB
                        </span>
                      </div>

                      <input
                        ref={fileInputRef}
                        id="drawer-file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
                      />

                      {!fileAttachment ? (
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                            isDraggingOver
                              ? "border-emerald-500 bg-emerald-50/50"
                              : "border-slate-300 hover:border-emerald-500 hover:bg-slate-50"
                          }`}
                        >
                          <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                          <div className="text-xs text-emerald-700 font-bold">
                            Click or drag file to attach
                          </div>
                          <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                            Whitepapers, architecture diagrams, or pitch briefs
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-slate-50 border border-emerald-300 rounded-xl">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-slate-800 truncate block text-xs">
                                {fileAttachment.name}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {fileAttachment.size}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleRemoveAttachment}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200 transition-colors"
                            aria-label="Remove attachment"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Author Metadata (Optional) */}
                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Submitter Attribution (Optional)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="drawer-submitter-name"
                            className="block text-[10px] font-bold text-slate-600 mb-1"
                          >
                            Your Name / Alias
                          </label>
                          <input
                            id="drawer-submitter-name"
                            type="text"
                            value={submitterName}
                            onChange={(e) => setSubmitterName(e.target.value)}
                            placeholder="e.g. Maya Warde"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="drawer-submitter-email"
                            className="block text-[10px] font-bold text-slate-600 mb-1"
                          >
                            Email Address
                          </label>
                          <input
                            id="drawer-submitter-email"
                            type="email"
                            value={submitterEmail}
                            onChange={(e) => setSubmitterEmail(e.target.value)}
                            placeholder="maya@example.com"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white text-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sticky Footer with Submit Button */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-2">
                      <button
                        type="button"
                        onClick={handleDrawerClose}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold font-mono transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        id="btn-drawer-submit"
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-300 text-white font-bold font-mono text-xs transition-all shadow-xs flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
