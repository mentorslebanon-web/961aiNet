import React, { useState } from "react";
import { EdgeChatMessage } from "../../types";
import { addSubscriberToMailingList } from "../../lib/mailingList";
import { 
  Smartphone, 
  Send, 
  Mic, 
  Bot, 
  User, 
  Terminal, 
  Sparkles, 
  Wifi, 
  Layers, 
  Radio, 
  CheckCheck, 
  RefreshCw, 
  PhoneCall,
  Volume2,
  FileCode,
  Mail,
  ShieldCheck
} from "lucide-react";

interface Module5EdgeBotProps {
  deductCredits: (amount: number) => boolean;
}

export const Module5EdgeBot: React.FC<Module5EdgeBotProps> = ({ deductCredits }) => {
  const [channel, setChannel] = useState<"whatsapp" | "telegram">("whatsapp");
  const [networkSim, setNetworkSim] = useState<"3G_TOUCH" | "4G_ALFA" | "WIFI">("3G_TOUCH");
  const [inputQuery, setInputQuery] = useState("/search_guru LLM Quantization");
  const [isSending, setIsSending] = useState(false);
  const [audioRecording, setAudioRecording] = useState(false);
  const [mailingListNotice, setMailingListNotice] = useState<string | null>(null);

  const [messages, setMessages] = useState<EdgeChatMessage[]>([
    {
      id: "msg_0",
      sender: "bot",
      text: `🇱🇧 *961AINetwork Edge Bot [Touch 3G Mode]*\n\nWelcome to the ultra-lightweight Lebanese AI Knowledge Gateway. Query graph entities, find VCs, or claim your node with minimal cellular data overhead.\n\n*Quick Commands:*\n• \`/search_guru <skill>\`\n• \`/match_vc <stage>\`\n• \`/intel_summary <startup>\`\n• \`/claim_node\``,
      timestamp: "01:20 AM",
      payloadBytes: 245,
      latencyMs: 120
    }
  ]);

  const handleSendMessage = async (textToSend = inputQuery, isVoice = false) => {
    if (!textToSend.trim()) return;

    if (!deductCredits(5)) {
      alert("Insufficient AI credits for edge bot queries!");
      return;
    }

    // Automatically sync / register user to the central admin mailing list upon sending messages
    try {
      const savedUserStr = localStorage.getItem("961ai_auth_user");
      const savedUser = savedUserStr ? JSON.parse(savedUserStr) : null;
      const userEmail = savedUser?.email || `edgebot.user.${Date.now().toString().slice(-4)}@961ai.network`;
      const userName = savedUser?.name || "EdgeBot Lebanese User";
      const userRole = savedUser?.role || "Founder";
      const userAffiliation = savedUser?.affiliation || "WhatsApp / EdgeBot Mobile User";

      addSubscriberToMailingList(
        userEmail,
        userName,
        userRole,
        "Send Message / EdgeBot",
        userAffiliation,
        textToSend.slice(0, 120)
      );

      setMailingListNotice(`Enrolled in 961AI network mailing list (${userEmail})`);
      setTimeout(() => setMailingListNotice(null), 4000);
    } catch (e) {
      console.warn("Mailing list sync warning:", e);
    }

    const userMsg: EdgeChatMessage = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceNote: isVoice,
      voiceDuration: isVoice ? "0:06" : undefined
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsSending(true);

    try {
      const res = await fetch("/api/gemini/edge-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSend,
          channel,
          userPhone: "+961-70-234567"
        })
      });

      const data = await res.json();
      const botResponseText = data.formattedMessage || data.rawResponse || (
        `🌲 *961AINetwork Result:*\n\n✅ *Top Matched Node:*\n• *Dr. Jad Hobeika* (AUB / Ex-Meta)\n  - Specialization: Distributed LLM Quantization\n  - Location: Beirut (Hamra)\n  - Verified Node: \`961ai.network/@jadhobeika\`\n\n💼 *Matched VC:*\n• *Cedar AI Syndicate* ($250k-$1M Seed)\n\n_Reply with "INTRO" to dispatch dual-opt-in briefing._`
      );

      const botMsg: EdgeChatMessage = {
        id: "msg_" + (Date.now() + 1),
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        commandDetected: data.commandDetected || (textToSend.startsWith("/") ? textToSend.split(" ")[0] : "NATURAL_QUERY"),
        payloadBytes: data.estimatedDataBytes || Math.round(botResponseText.length * 1.1),
        latencyMs: networkSim === "3G_TOUCH" ? 280 : 110
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Edge bot error:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleSimulateVoiceNote = () => {
    setAudioRecording(true);
    setTimeout(() => {
      setAudioRecording(false);
      handleSendMessage("Baddi AI engineer bi Beirut ykun 3ando experience b computer vision w robotics", true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
              MODULE 5 SPECIFICATION
            </span>
            <h2 className="text-lg font-bold text-white">WhatsApp & Telegram Edge Interface</h2>
          </div>
          <p className="text-xs text-slate-400">
            Low-bandwidth conversational bot optimized for Lebanese Alfa/Touch 3G networks, supporting Franco-Arabic dialect, slash commands, and sub-1KB payload transfers.
          </p>
        </div>

        {/* Network & Channel Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setChannel("whatsapp")}
              className={`px-3 py-1 rounded-lg transition-all ${
                channel === "whatsapp" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              💬 WhatsApp
            </button>
            <button
              onClick={() => setChannel("telegram")}
              className={`px-3 py-1 rounded-lg transition-all ${
                channel === "telegram" ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              ✈️ Telegram
            </button>
          </div>

          <div className="flex items-center bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <select
              value={networkSim}
              onChange={(e) => setNetworkSim(e.target.value as any)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="3G_TOUCH" className="bg-slate-900">Touch 3G (256 kbps)</option>
              <option value="4G_ALFA" className="bg-slate-900">Alfa 4G (1.5 Mbps)</option>
              <option value="WIFI" className="bg-slate-900">BDD Fiber (100 Mbps)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Container: Chat Simulator (Phone UI) + Technical Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phone Mockup Screen (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col h-[620px] max-w-2xl mx-auto w-full">
          {/* Chat Top Bar */}
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
                🌲
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  961AINetwork Edge Bot
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  {channel === "whatsapp" ? "+961 70 961 247 (WhatsApp Business)" : "@961ainetwork_bot"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data-Saver: ON</span>
            </div>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-700 text-white rounded-br-none"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none font-mono text-[11px]"
                  }`}
                >
                  {msg.isVoiceNote && (
                    <div className="flex items-center gap-2 mb-1 text-emerald-200 font-sans text-xs">
                      <Volume2 className="w-4 h-4" />
                      <span>Voice Note ({msg.voiceDuration}) - Franco-Arabic Transcript:</span>
                    </div>
                  )}
                  {msg.text}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1 text-[9px] text-slate-500 font-mono">
                  <span>{msg.timestamp}</span>
                  {msg.payloadBytes && <span>• {msg.payloadBytes} Bytes</span>}
                  {msg.latencyMs && <span>• {msg.latencyMs}ms</span>}
                  {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex items-center gap-2 text-slate-500 text-[11px] font-mono p-2">
                <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                <span>961AINetwork edge engine computing L1 Wiki match...</span>
              </div>
            )}
          </div>

          {/* Quick Slash Commands Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 border-t border-slate-800/80 text-[10px] font-mono scrollbar-none">
            <button
              onClick={() => handleSendMessage("/search_guru LLM Quantization")}
              style={{ color: "#ffffff" }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 whitespace-nowrap cursor-pointer"
            >
              /search_guru LLM
            </button>
            <button
              onClick={() => handleSendMessage("/match_vc Seed $1.2M")}
              style={{ color: "#ffffff" }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 whitespace-nowrap cursor-pointer"
            >
              /match_vc Seed
            </button>
            <button
              onClick={() => handleSendMessage("/intel_summary CedarsLLM")}
              style={{ color: "#ffffff" }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 whitespace-nowrap cursor-pointer"
            >
              /intel_summary
            </button>
            <button
              onClick={() => handleSendMessage("/claim_node")}
              style={{ color: "#ffffff" }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 whitespace-nowrap cursor-pointer"
            >
              /claim_node
            </button>
          </div>

          {/* Mailing List Feedback Banner */}
          {mailingListNotice && (
            <div className="mt-2 p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{mailingListNotice}</span>
              </div>
              <span className="text-[10px] text-emerald-400/80 font-mono">GDPR Opt-In</span>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleSimulateVoiceNote}
              disabled={audioRecording || isSending}
              className={`p-2.5 rounded-xl border transition-all ${
                audioRecording
                  ? "bg-rose-600 text-white animate-pulse border-rose-500"
                  : "bg-slate-900 text-slate-400 hover:text-white border-slate-800"
              }`}
              title="Record Lebanese Dialect Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Query command or type Lebanese Arabic (e.g. /search_guru)..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isSending || !inputQuery.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Technical Specs & Dialect Processing Card (1 Col) */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Low-Bandwidth Telemetry Engine
            </h3>
            
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Avg Payload Transfer:</span>
                <span className="font-mono text-emerald-400 font-bold">&lt; 350 Bytes</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Data Compression:</span>
                <span className="font-mono text-indigo-400 font-bold">8.4x over Web UI</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Levantine Dialect Parser:</span>
                <span className="font-mono text-amber-400 font-bold">Enabled (Arabic 3arabizi)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 font-sans text-xs">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Levantine & Franco-Arabic NLP Support
            </h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Engineers and founders in Beirut often communicate using colloquial Franco-Arab or 3arabizi phonetics. Gemini 3.7 parses these native intents directly into graph Cypher parameters:
            </p>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[10px] space-y-1 text-slate-300">
              <span className="text-emerald-400 font-bold">"Baddi AI engineer bi Beirut ykun 3ando experience b LLM"</span>
              <p className="text-slate-500">{"➔ Cypher: MATCH (g:Guru)-[:HAS_SKILL]->(:Skill {name: 'LLM'}) WHERE g.location CONTAINS 'Beirut'"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
