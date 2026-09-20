import React, { useState, useEffect } from "react";
import { UserAuthSession, UserRole } from "../types";
import { addSubscriberToMailingList } from "../lib/mailingList";
import { addTrialUser, addMailingListRegistration } from "../lib/registeredUsers";
import { provisionZ961Workspace } from "../lib/z961SecondBrainService";
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Crown, 
  ArrowRight,
  Zap,
  Eye, 
  EyeOff, 
  Phone, 
  Brain,
  Compass,
  Check
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (session: UserAuthSession, isSignUp?: boolean) => void;
  initialMode?: "signin" | "signup";
  onNavigateToPricing?: () => void;
  accessReason?: string;
  onContinueBrowsing?: () => void;
}

interface StoredAccount {
  email: string;
  passwordHash: string; // Stored user password
  name: string;
  role: UserRole;
  affiliation: string;
  session: UserAuthSession;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = "signup",
  onNavigateToPricing,
  accessReason,
  onContinueBrowsing
}) => {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  
  // Update mode when initialMode changes or modal opens
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  
  // Sign Up & Sign In Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("founder");
  const [affiliation, setAffiliation] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("+961 70 247 961");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Helper to record guest browsing dismissal
  const handleDismiss = () => {
    try {
      sessionStorage.setItem("961ai_guest_browsing", "true");
    } catch {
      // ignore
    }
    if (onContinueBrowsing) {
      onContinueBrowsing();
    } else {
      onClose();
    }
  };

  // Helper to get registered accounts
  const getRegisteredAccounts = (): StoredAccount[] => {
    try {
      const data = localStorage.getItem("961ai_registered_users");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPass = password.trim();
    const cleanPhone = whatsappPhone.trim() || "+961 70 247 961";

    if (!cleanEmail || !cleanPass || !cleanName) {
      setErrorMsg("Please fill in your name, email, and a password.");
      return;
    }

    if (cleanPass.length < 4) {
      setErrorMsg("Password must be at least 4 characters long.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const now = Date.now();
    // 6-Hour Demo Usage timestamp
    const sixHoursMs = 6 * 60 * 60 * 1000;
    const demoExpiresAt = now + sixHoursMs;

    // Auto-provision personal z961 Second Brain Workspace
    let workspaceId = `z961_ws_${cleanEmail.replace(/[^a-z0-9]/gi, "_")}`;
    let starterCount = 6;
    try {
      const ws = await provisionZ961Workspace({
        id: `usr_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        role: role,
        affiliation: affiliation.trim() || "Independent Tech Leader",
        whatsappPhone: cleanPhone
      });
      workspaceId = ws.id;
      starterCount = ws.starterAssetsCount || 6;
    } catch (wsErr) {
      console.warn("Second brain auto-provisioning handled locally:", wsErr);
    }

    const newSession: UserAuthSession = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      name: cleanName,
      role: role,
      affiliation: affiliation.trim() || "Independent Tech Leader",
      createdAt: now,
      demoExpiresAt: demoExpiresAt,
      isPremium: false,
      plan: "demo",
      credits: 50,
      z961_second_brain_id: workspaceId,
      whatsapp_phone: cleanPhone,
      ingested_sources_count: starterCount
    };

    // Save account in registered users array
    const accounts = getRegisteredAccounts();
    const existingIndex = accounts.findIndex(a => a.email === cleanEmail);

    const newAccount: StoredAccount = {
      email: cleanEmail,
      passwordHash: cleanPass,
      name: cleanName,
      role: role,
      affiliation: affiliation.trim() || "Independent Tech Leader",
      session: newSession
    };

    if (existingIndex >= 0) {
      accounts[existingIndex] = newAccount;
    } else {
      accounts.push(newAccount);
    }

    localStorage.setItem("961ai_registered_users", JSON.stringify(accounts));
    localStorage.setItem("961ai_auth_user", JSON.stringify(newSession));

    // Register user in the Admin Mailing List & Subscriber Repository (GDPR Opt-In)
    try {
      addSubscriberToMailingList(
        cleanEmail,
        cleanName,
        role === "founder" ? "Founder" : role === "investor" ? "Investor" : role === "guru" ? "AI Guru" : "Superadmin",
        "Signup & Demo",
        affiliation.trim() || "Al Khawarizmi Solutions & NCEI Joint Platform",
        `Free Registered Account. Access intent: ${accessReason || "Complete Ecosystem Access"}`
      );

      // Register in Trial User CRM
      addTrialUser({
        email: cleanEmail,
        name: cleanName,
        role: role === "founder" ? "Founder" : role === "investor" ? "Investor" : role === "guru" ? "AI Guru" : "Superadmin",
        affiliation: affiliation.trim() || "Independent Tech Leader",
        whatsappPhone: cleanPhone,
        demoExpiresAt: demoExpiresAt,
        credits: 50,
        secondBrainId: workspaceId,
        notes: `Registered Free Demo Account. Access intent: ${accessReason || "Complete Ecosystem Access"}`
      });

      // Also register on mailing list if opt-in
      addMailingListRegistration(
        cleanEmail,
        cleanName,
        role === "founder" ? "Founder" : role === "investor" ? "Investor" : role === "guru" ? "AI Guru" : "Superadmin",
        affiliation.trim() || "Al Khawarizmi Solutions & NCEI Joint Platform",
        "Free Account Registration",
        `Opted in during account signup. Intent: ${accessReason || "Ecosystem Access"}`
      );
    } catch {
      // ignore
    }

    setSuccessMsg(`Welcome, ${cleanName}! Your free account is active and Second Brain is provisioned.`);
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess(newSession, true);
      onClose();
    }, 700);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    if (!cleanPass) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const accounts = getRegisteredAccounts();
    const matchedAccount = accounts.find(a => a.email === cleanEmail);

    let sessionToUse: UserAuthSession;

    if (matchedAccount) {
      // Check password
      if (matchedAccount.passwordHash && matchedAccount.passwordHash !== cleanPass) {
        setIsSubmitting(false);
        setErrorMsg("Incorrect password for this account. Please verify and try again.");
        return;
      }
      sessionToUse = matchedAccount.session;
    } else {
      // Check current session storage
      const saved = localStorage.getItem("961ai_auth_user");
      if (saved) {
        const parsed = JSON.parse(saved) as UserAuthSession;
        if (parsed.email.toLowerCase() === cleanEmail) {
          sessionToUse = parsed;
        } else {
          // Create new session for this user
          const now = Date.now();
          sessionToUse = {
            id: `usr_${Date.now()}`,
            email: cleanEmail,
            name: name.trim() || cleanEmail.split("@")[0],
            role: role,
            affiliation: affiliation.trim() || "Lebanese AI Network Member",
            createdAt: now,
            demoExpiresAt: now + 6 * 60 * 60 * 1000,
            isPremium: false,
            plan: "demo",
            credits: 50
          };
        }
      } else {
        const now = Date.now();
        sessionToUse = {
          id: `usr_${Date.now()}`,
          email: cleanEmail,
          name: name.trim() || cleanEmail.split("@")[0],
          role: role,
          affiliation: affiliation.trim() || "Lebanese AI Network Member",
          createdAt: now,
          demoExpiresAt: now + 6 * 60 * 60 * 1000,
          isPremium: false,
          plan: "demo",
          credits: 50
        };
      }

      // Register this account
      accounts.push({
        email: cleanEmail,
        passwordHash: cleanPass,
        name: sessionToUse.name,
        role: sessionToUse.role,
        affiliation: sessionToUse.affiliation,
        session: sessionToUse
      });
      localStorage.setItem("961ai_registered_users", JSON.stringify(accounts));
    }

    // Ensure workspace is provisioned or loaded
    try {
      const ws = await provisionZ961Workspace({
        id: sessionToUse.id,
        name: sessionToUse.name,
        email: sessionToUse.email,
        role: sessionToUse.role,
        affiliation: sessionToUse.affiliation,
        whatsappPhone: sessionToUse.whatsapp_phone || "+961 70 247 961"
      });
      sessionToUse.z961_second_brain_id = ws.id;
      sessionToUse.whatsapp_phone = ws.whatsappPhone || "+961 70 247 961";
      sessionToUse.ingested_sources_count = ws.ingestedSourcesCount || ws.starterAssetsCount || 6;
    } catch {
      if (!sessionToUse.z961_second_brain_id) {
        sessionToUse.z961_second_brain_id = `z961_ws_${sessionToUse.id}`;
      }
    }

    localStorage.setItem("961ai_auth_user", JSON.stringify(sessionToUse));
    setSuccessMsg(`Signed in successfully as ${sessionToUse.name}!`);

    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess(sessionToUse);
      onClose();
    }, 500);
  };

  // 1-Click Quick Demo Switchers
  const handleQuickLogin = (type: "demo_active" | "pro_annual" | "expired_demo") => {
    const now = Date.now();
    let session: UserAuthSession;

    if (type === "demo_active") {
      session = {
        id: "demo_usr_01",
        name: "Maan Barazy",
        email: "maan.barazy@961ai.network",
        role: "founder",
        affiliation: "CedarScale AI Lab",
        createdAt: now,
        demoExpiresAt: now + (5 * 3600 + 45 * 60) * 1000,
        isPremium: false,
        plan: "demo",
        credits: 50,
        z961_second_brain_id: "z961_ws_maan_barazy",
        whatsapp_phone: "+961 70 247 961",
        ingested_sources_count: 6
      };
    } else if (type === "pro_annual") {
      session = {
        id: "pro_usr_01",
        name: "Maya Haddad",
        email: "maya.haddad@cedarvc.com",
        role: "investor",
        affiliation: "Cedar Syndicate Partners",
        createdAt: now - 30 * 86400 * 1000,
        demoExpiresAt: now - 20 * 86400 * 1000,
        isPremium: true,
        premiumExpiresAt: now + 335 * 86400 * 1000,
        plan: "premium_annual",
        credits: 2500,
        z961_second_brain_id: "z961_ws_maya_haddad",
        whatsapp_phone: "+1 415 961 8820",
        ingested_sources_count: 14
      };
    } else {
      session = {
        id: "expired_usr_01",
        name: "Tarek Saliba",
        email: "tarek@diaspora-dev.org",
        role: "guru",
        affiliation: "Ex-AUB AI Fellow",
        createdAt: now - 7 * 3600 * 1000,
        demoExpiresAt: now - 1 * 3600 * 1000,
        isPremium: false,
        plan: "demo",
        credits: 0,
        z961_second_brain_id: "z961_ws_tarek_saliba",
        whatsapp_phone: "+33 6 42 96 10 24",
        ingested_sources_count: 6
      };
    }

    localStorage.setItem("961ai_auth_user", JSON.stringify(session));
    onAuthSuccess(session);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleDismiss();
        }
      }}
    >
      {/* Landscape Container: max-w-4xl, side-by-side on desktop */}
      <div 
        className="bg-white border-2 border-[#FDE68A] rounded-2xl max-w-4xl w-full shadow-2xl relative overflow-hidden font-sans flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile / Universal Top Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 z-20 text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer bg-white/80 backdrop-blur-xs shadow-xs"
          title="Close / Dismiss"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN (Landscape Hero & Perks & Fast Profiles) */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#1A1811] via-[#242116] to-[#2E2A1C] text-white p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#423C26] relative overflow-hidden shrink-0">
          {/* Subtle Cedar Watermark */}
          <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl select-none pointer-events-none">
            🌲
          </div>

          <div className="space-y-4 relative z-10">
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1.5">
                <span>🌲</span>
                <span>961AI Sovereign Ecosystem</span>
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                Lebanon AI Intelligence & Knowledge Engine
              </h2>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                Connect with 120+ verified entities, explore sovereign regulatory tools, and unlock your personal Second Brain.
              </p>
            </div>

            {/* Perks Bullet List */}
            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-start gap-2.5 text-amber-50">
                <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white block text-[11px]">z961 Second Brain Workspace</strong>
                  <span className="text-[11px] text-amber-100/80">NotebookLM-style grounded AI copilot & podcast audio studio.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-amber-50">
                <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white block text-[11px]">Verified Directory & Law 126 Sandbox</strong>
                  <span className="text-[11px] text-amber-100/80">0% Offshore S.A.L., BDL Circular 165, and VC terms.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-amber-50">
                <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white block text-[11px]">100% Free • Community Mailing List</strong>
                  <span className="text-[11px] text-amber-100/80">Co-developed by NCEI Lebanon & Alkharizmi Solutions.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fast 1-Click Preview Logins at Bottom of Left Column */}
          <div className="pt-4 mt-4 border-t border-amber-700/40 relative z-10 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-amber-200">
              <span className="uppercase tracking-wider font-bold">Fast 1-Click Demo Profiles:</span>
              {onNavigateToPricing && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToPricing();
                  }}
                  className="text-amber-300 hover:underline flex items-center gap-1 text-[10px]"
                >
                  <Crown className="w-2.5 h-2.5" />
                  <span>$100/yr Pro</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => handleQuickLogin("demo_active")}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-colors cursor-pointer text-white"
                title="Active 6-hour demo session"
              >
                <span className="font-bold block truncate text-[10px]">⚡ Maan</span>
                <span className="text-[9px] text-amber-200 font-mono">6-Hour Demo</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("pro_annual")}
                className="p-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/30 text-left transition-colors cursor-pointer text-amber-100"
                title="Pro annual subscriber session"
              >
                <span className="font-bold block truncate text-[10px]">👑 Maya</span>
                <span className="text-[9px] text-amber-200 font-mono">Investor</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("expired_demo")}
                className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-300/30 text-left transition-colors cursor-pointer text-rose-100"
                title="Simulate expired demo state"
              >
                <span className="font-bold block truncate text-[10px]">⏳ Tarek</span>
                <span className="text-[9px] text-rose-200 font-mono">Expired</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Form, Mode Switcher, and Browsing Option) */}
        <div className="md:w-7/12 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-3">
            {/* Top Bar: Tabs Switcher */}
            <div className="flex items-center justify-between gap-3 pr-8">
              <div className="inline-flex p-0.5 bg-[#FFFDF0] border border-[#FDE68A] rounded-xl text-xs font-bold font-mono">
                <button
                  type="button"
                  onClick={() => { setMode("signup"); setErrorMsg(null); setSuccessMsg(null); }}
                  className={`px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                    mode === "signup"
                      ? "bg-black text-white font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Free Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("signin"); setErrorMsg(null); setSuccessMsg(null); }}
                  className={`px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                    mode === "signin"
                      ? "bg-black text-white font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign In
                </button>
              </div>

              <span className="text-[10px] font-mono text-[#B45309] bg-[#FFFBEA] px-2 py-0.5 rounded-md border border-[#FDE68A] hidden sm:inline-block">
                100% Free Community
              </span>
            </div>

            {/* Access Reason Banner if triggered by a specific action */}
            {accessReason && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-950">
                <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-800 leading-snug">
                  Create a free account or sign in to unlock <strong>{accessReason}</strong>.
                </p>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={mode === "signup" ? handleSignUp : handleSignIn} className="space-y-2.5">
              {mode === "signup" ? (
                <>
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 font-mono">Full Name</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ziad Mansour"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 font-mono">Email Address</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="email"
                          required
                          placeholder="name@organization.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Password and Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700 font-mono">Password</label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                          <span>{showPassword ? "Hide" : "Show"}</span>
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 font-mono">Ecosystem Role</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none"
                      >
                        <option value="founder">Founder / Startup</option>
                        <option value="investor">VC / Angel Investor</option>
                        <option value="guru">AI Guru / Researcher</option>
                        <option value="superadmin">Agency / Partner</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Organization and WhatsApp Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 font-mono">Organization / Firm</label>
                      <input
                        type="text"
                        placeholder="e.g. Cedar Labs"
                        value={affiliation}
                        onChange={(e) => setAffiliation(e.target.value)}
                        className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700 font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp (Second Brain Sync)</span>
                        </label>
                      </div>
                      <input
                        type="tel"
                        placeholder="+961 70 247 961"
                        value={whatsappPhone}
                        onChange={(e) => setWhatsappPhone(e.target.value)}
                        className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Sign In Inputs */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 font-mono">Email Address</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="email"
                        required
                        placeholder="name@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700 font-mono">Password</label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                        <span>{showPassword ? "Hide" : "Show"}</span>
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F6FAF5] border border-[#D7E7D6] focus:border-[#4D7D4B] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {errorMsg && (
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-mono">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
              >
                {mode === "signup" ? (
                  <>
                    <Zap className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-bold">{isSubmitting ? "Creating Account..." : "Sign Up Free & Unlock Access"}</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-bold">{isSubmitting ? "Signing in..." : "Sign In to 961AI"}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Explicit 'Not for now, just browsing' & Legal Microcopy */}
          <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
            {/* Prominent Not For Now, Just Browsing Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-[#FDE68A] bg-slate-50 hover:bg-[#FFFBEA] text-slate-700 hover:text-[#B45309] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer group shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#B45309] transition-colors" />
              <span>Not for now, just browsing</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="text-[10px] text-center text-slate-500 font-sans leading-relaxed">
              By creating a free account, you join the{" "}
              <strong className="text-slate-700">961AI Community Mailing List</strong> (NCEI Lebanon & Alkharizmi Solutions). No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


