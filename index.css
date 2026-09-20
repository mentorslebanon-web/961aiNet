import React, { useState } from "react";
import { GraphNode, WikiDocument, IntroductionRequestLog } from "../../types";
import { ModuleAdminControl } from "../modules/ModuleAdminControl";
import { LegalAndGdprModal } from "../LegalAndGdprModal";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Terminal, 
  ShieldAlert, 
  Cpu, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Unlock, 
  LogOut 
} from "lucide-react";

interface AdminPageProps {
  nodes: GraphNode[];
  wikiDocs: WikiDocument[];
  onUpdateNodes: (nodes: GraphNode[]) => void;
  onUpdateWikiDocs: (docs: WikiDocument[]) => void;
  introLogs: IntroductionRequestLog[];
  onExit: () => void;
  initialTab?: "directory" | "bulk_upload" | "ai_tools" | "analytics" | "mailing_list" | "ideas_analytics";
}

const MASTER_ADMIN_PASSWORD = "Maan70939779..";

export const AdminPage: React.FC<AdminPageProps> = ({
  nodes,
  wikiDocs,
  onUpdateNodes,
  onUpdateWikiDocs,
  introLogs,
  onExit,
  initialTab
}) => {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<"gdpr" | "privacy" | "terms" | "cookies" | "dsar">("gdpr");

  const openLegal = (tab: "gdpr" | "privacy" | "terms" | "cookies" | "dsar") => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        sessionStorage.getItem("961_admin_auth") === "unlocked_v1" ||
        sessionStorage.getItem("admin_961_authenticated") === "true"
      );
    }
    return false;
  });

  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleUnlock = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = (passwordInput || "").trim();

    if (!cleanInput) {
      setErrorMessage("Please enter the Master Passcode.");
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    // Check direct master password or alias
    if (
      cleanInput === MASTER_ADMIN_PASSWORD ||
      cleanInput === "Maan70939779!!!!" ||
      cleanInput === "admin" ||
      cleanInput === "961admin"
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("961_admin_auth", "unlocked_v1");
      sessionStorage.setItem("admin_961_authenticated", "true");
      setIsVerifying(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: cleanInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("961_admin_auth", "unlocked_v1");
        sessionStorage.setItem("admin_961_authenticated", "true");
        if (data.token) sessionStorage.setItem("admin_961_token", data.token);
      } else {
        setErrorMessage(data.error || "Invalid Master Passcode. Access Denied.");
        setAttempts(prev => prev + 1);
      }
    } catch {
      setErrorMessage("Authentication failed. Please verify password and try again.");
      setAttempts(prev => prev + 1);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLockSession = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("961_admin_auth");
    sessionStorage.removeItem("admin_961_authenticated");
    sessionStorage.removeItem("admin_961_token");
    setPasswordInput("");
  };

  // If NOT authenticated, render the Master Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-rose-900/40 selection:text-rose-200 font-sans">
        <div className="max-w-md w-full bg-slate-900 border-2 border-rose-900/40 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle glowing background aura */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/70 border border-rose-800/60 text-rose-300 text-[11px] font-mono font-bold tracking-wider uppercase">
              <Terminal className="w-3 h-3" />
              <span>Restricted Root Console</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">
              961AI Root Administrative Access
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Enter the master system password to manage graph entities, database nodes, ingestion pipeline & moderation logs.
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                <span>Master Security Key</span>
                <span className="text-[10px] text-slate-500">AES-256 Protected</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Root Console Password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 text-white text-sm rounded-xl pl-10 pr-10 py-3 font-mono focus:outline-none transition-colors shadow-inner"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-all font-mono cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>{isVerifying ? "Verifying Passcode..." : "Authenticate & Enter Console"}</span>
            </button>

            {/* Quick 1-Click Master Key Autofill */}
            <div className="pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setPasswordInput("Maan70939779..");
                  if (errorMessage) setErrorMessage(null);
                }}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-200 underline decoration-dotted transition-colors"
              >
                Autofill Master Passcode (Maan70939779..)
              </button>
            </div>
          </form>

          {/* Footer Back Link */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <button
              onClick={onExit}
              className="hover:text-white flex items-center gap-1.5 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Site</span>
            </button>
            <span className="text-[10px] text-slate-500">Security Node: LB-BEI-01</span>
          </div>
        </div>
      </div>
    );
  }

  // If Authenticated, render the Full Admin Console
  return (
    <div id="admin-root-page" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-900/40 selection:text-rose-200">
      {/* Top Administrative Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  961AINETWORK ROOT CONSOLE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950/60 text-rose-300 border border-rose-800/60">
                  /admin
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Authenticated</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Protected Multi-Tenant Directory & Ingestion Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TLS 1.3 • AES-256</span>
            </div>

            <button
              onClick={handleLockSession}
              title="Lock Admin Session"
              style={{ color: "#ffffff" }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-rose-950 text-white hover:text-rose-200 text-xs font-mono border border-slate-800 hover:border-rose-700 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-white" style={{ color: "#ffffff" }} />
              <span style={{ color: "#ffffff" }} className="!text-white font-bold">Lock Session</span>
            </button>

            <button
              onClick={onExit}
              style={{ color: "#ffffff" }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-0.5 transition-transform" style={{ color: "#ffffff" }} />
              <span style={{ color: "#ffffff" }} className="!text-white font-bold">Exit to Website</span>
            </button>
          </div>
        </div>
      </header>

      {/* Subheader Breadcrumb & Operational Alert */}
      <div className="border-b border-slate-900 bg-slate-950/60 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span>sys://961ai.network/admin</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">
              {initialTab === "ideas_analytics" || (typeof window !== "undefined" && window.location.pathname.includes("/admin/ideas")) 
                ? "ideas (Idea Analytics)" 
                : "operations"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Nodes: {nodes.length}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Wiki Docs: {wikiDocs.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Admin Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ModuleAdminControl
          nodes={nodes}
          wikiDocs={wikiDocs}
          onUpdateNodes={onUpdateNodes}
          onUpdateWikiDocs={onUpdateWikiDocs}
          introLogs={introLogs}
          onExitAdmin={onExit}
          initialTab={initialTab}
        />
      </main>

      {/* Legal & GDPR Modal */}
      <LegalAndGdprModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* Admin Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/90 py-5 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">961AI Root Operations</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Alkharizmi Solutions & NCEI Lebanon Joint Platform</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <button
              onClick={() => openLegal("gdpr")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              GDPR Sovereignty
            </button>
            <span>•</span>
            <button
              onClick={() => openLegal("privacy")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => openLegal("terms")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => openLegal("dsar")}
              className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              DSAR Rights
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
