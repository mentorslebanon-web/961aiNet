import React, { useState } from "react";
import { UserAuthSession, WorkspaceEntry } from "../../types";
import { sendZ24sevenWhatsAppWebhook } from "../../lib/z961SecondBrainService";
import {
  X,
  Send,
  Mic,
  FileText,
  UserPlus,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Brain,
  MessageSquare
} from "lucide-react";

interface WhatsAppIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAuthSession | null;
  onEntryAdded?: (entry: WorkspaceEntry) => void;
}

export const WhatsAppIntegrationModal: React.FC<WhatsAppIntegrationModalProps> = ({
  isOpen,
  onClose,
  user,
  onEntryAdded
}) => {
  const [activeTab, setActiveTab] = useState<"text" | "voice" | "contact" | "task">("text");
  const [messageText, setMessageText] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState(
    "Met with Sami Khoury from Cedar AI Syndicate at BDD. They are looking to lead $350k seed rounds in Lebanese AI SaaS companies with Delaware C-Corp parent entities. Follow up with our pitch deck by Tuesday."
  );
  const [isRecording, setIsRecording] = useState(false);
  const [contactName, setContactName] = useState("Sami Khoury");
  const [contactOrg, setContactOrg] = useState("Cedar AI Syndicate (Silicon Valley)");
  const [contactRole, setContactRole] = useState("Managing General Partner");
  const [contactEmail, setContactEmail] = useState("sami@cedar-ai.vc");
  const [contactPhone, setContactPhone] = useState("+1 415 961 8820");

  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{
    success: boolean;
    replyText: string;
    category: string;
    entryId: string;
  } | null>(null);

  if (!isOpen) return null;

  const userPhone = user?.whatsapp_phone || "+961 70 247 961";

  const handleSend = async () => {
    setIsSending(true);
    setFeedback(null);

    let payloadText = messageText;
    let contactData: any = undefined;

    if (activeTab === "voice") {
      payloadText = voiceTranscript;
    } else if (activeTab === "contact") {
      payloadText = `Contact Card: ${contactName} | ${contactRole} at ${contactOrg} | Email: ${contactEmail} | Phone: ${contactPhone}`;
      contactData = {
        name: contactName,
        role: contactRole,
        organization: contactOrg,
        email: contactEmail,
        phone: contactPhone,
        ticketSize: "$100,000 - $500,000",
        location: "San Francisco / Beirut"
      };
    } else if (activeTab === "task") {
      payloadText = `TODO: ${messageText || "Draft Delaware Flip documentation and BDL Circular 165 bank authorization"}`;
    }

    try {
      const res = await sendZ24sevenWhatsAppWebhook({
        fromPhone: userPhone,
        messageType: activeTab === "voice" ? "voice_note" : activeTab === "contact" ? "contact_card" : "text",
        text: payloadText,
        audioTranscript: activeTab === "voice" ? voiceTranscript : undefined,
        contactData,
        userEmail: user?.email
      });

      setFeedback({
        success: res.success,
        replyText: res.replyText,
        category: res.category,
        entryId: res.entryId
      });

      if (onEntryAdded) {
        const dummyEntry: WorkspaceEntry = {
          id: res.entryId,
          userId: user?.id || "guest",
          workspaceId: user?.z961_second_brain_id || "z961_ws_guest",
          category: res.category,
          sourceType: "whatsapp",
          title: activeTab === "contact" ? `Contact: ${contactName}` : activeTab === "voice" ? "Voice Memo via WhatsApp" : "WhatsApp Note",
          timestamp: new Date().toISOString(),
          contentPayload: {
            title: activeTab === "contact" ? `Contact: ${contactName}` : activeTab === "voice" ? "Voice Memo via WhatsApp" : "WhatsApp Note",
            text: payloadText,
            category: res.category,
            tags: ["WhatsApp", "z24seven", res.category.toUpperCase()],
            contactDetails: contactData
          }
        };
        onEntryAdded(dummyEntry);
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-100 font-sans relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">WhatsApp z24seven Capture Engine</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  +961 70 247 961
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Forward texts, voice notes, contacts, or tasks to our official WhatsApp bot to instantly append into your Second Brain.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Link Info */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Linked Sender Phone:</span>
            <strong className="text-emerald-400">{userPhone}</strong>
          </div>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Webhook</span>
          </span>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-medium">
          <button
            onClick={() => { setActiveTab("text"); setFeedback(null); }}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "text" ? "bg-black text-white font-bold border border-neutral-700 shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Text</span>
          </button>
          <button
            onClick={() => { setActiveTab("voice"); setFeedback(null); }}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "voice" ? "bg-black text-white font-bold border border-neutral-700 shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Note</span>
          </button>
          <button
            onClick={() => { setActiveTab("contact"); setFeedback(null); }}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "contact" ? "bg-black text-white font-bold border border-neutral-700 shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
          <button
            onClick={() => { setActiveTab("task"); setFeedback(null); }}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "task" ? "bg-black text-white font-bold border border-neutral-700 shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Task</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-3">
          {activeTab === "text" && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400">Incoming WhatsApp Message:</label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type or paste any meeting note, deal lead, or market observation..."
                rows={4}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono resize-none"
              />
            </div>
          )}

          {activeTab === "voice" && (
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Simulated Audio Recording (m4a / Opus)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Auto-transcribed</span>
              </div>
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-mono text-slate-400">Speech-to-Text Transcript:</label>
                <textarea
                  value={voiceTranscript}
                  onChange={(e) => setVoiceTranscript(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono resize-none focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="font-bold text-emerald-400 block mb-1">WhatsApp Shared Contact Card (vCard):</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Organization</label>
                  <input
                    type="text"
                    value={contactOrg}
                    onChange={(e) => setContactOrg(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Role</label>
                  <input
                    type="text"
                    value={contactRole}
                    onChange={(e) => setContactRole(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "task" && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400">Follow-up Task via WhatsApp:</label>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="e.g. Schedule call with Dr. Jad Hobeika on Friday at 3 PM"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          )}
        </div>

        {/* Feedback Receipt */}
        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono space-y-1 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp Webhook Received & Ingested!</span>
            </div>
            <p className="text-slate-300 text-[11px] whitespace-pre-wrap pl-6">
              {feedback.replyText}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-emerald-400" />
            <span>Workspace: <strong>{user?.z961_second_brain_id || "Active Vault"}</strong></span>
          </div>

          <button
            onClick={handleSend}
            disabled={isSending}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSending ? "Processing Webhook..." : "Send via WhatsApp"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
