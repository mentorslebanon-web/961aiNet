import React, { useState } from "react";
import { UserAuthSession } from "../../types";
import { addConfirmedSubscriber } from "../../lib/registeredUsers";
import { 
  Check, 
  Sparkles, 
  Crown, 
  Clock, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  Building2, 
  Globe, 
  Scale, 
  Layers, 
  Zap, 
  Lock,
  Wallet,
  Landmark,
  ArrowLeft,
  Smartphone,
  Phone,
  UserCheck,
  X
} from "lucide-react";

interface ModulePricingProps {
  user: UserAuthSession | null;
  onUpgradeSuccess: (updatedUser: UserAuthSession) => void;
  onOpenAuthModal: () => void;
  onNavigateToHome?: () => void;
  onNavigateToDirectory?: () => void;
}

export const ModulePricing: React.FC<ModulePricingProps> = ({
  user,
  onUpgradeSuccess,
  onOpenAuthModal,
  onNavigateToHome,
  onNavigateToDirectory
}) => {
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"omt" | "whish" | "crypto">("omt");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Sales Contact Notification Pop-up Modal
  const [salesContactPopupOpen, setSalesContactPopupOpen] = useState(false);
  const [salesContactMethod, setSalesContactMethod] = useState<"OMT" | "WHISH">("OMT");

  // Form Fields
  const [subscriberName, setSubscriberName] = useState(user?.name || "");
  const [subscriberEmail, setSubscriberEmail] = useState(user?.email || "");
  const [subscriberPhone, setSubscriberPhone] = useState(user?.whatsapp_phone || "+961 ");
  const [cryptoTxId, setCryptoTxId] = useState("");
  const [transferRef, setTransferRef] = useState("");

  const triggerSalesTeamPopup = (method: "OMT" | "WHISH") => {
    setSalesContactMethod(method);
    setSalesContactPopupOpen(true);
  };

  const handleSelectPaymentMethod = (method: "omt" | "whish" | "crypto") => {
    setPaymentMethod(method);
    if (method === "omt") {
      triggerSalesTeamPopup("OMT");
    } else if (method === "whish") {
      triggerSalesTeamPopup("WHISH");
    }
  };

  const handleCompleteUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const now = Date.now();
      let updatedUser: UserAuthSession;

      const chosenMethod = paymentMethod === "omt" ? "OMT" : paymentMethod === "whish" ? "WHISH" : "USDT (TRC20)";

      if (user) {
        updatedUser = {
          ...user,
          isPremium: true,
          plan: "premium_annual",
          premiumExpiresAt: now + 365 * 24 * 60 * 60 * 1000,
          credits: user.credits + 2500,
          whatsapp_phone: subscriberPhone || user.whatsapp_phone
        };
      } else {
        // Create new premium user
        updatedUser = {
          id: `usr_${Date.now()}`,
          email: subscriberEmail.trim() || "founder@cedar-ai.org",
          name: subscriberName.trim() || "Cedar AI Pro Member",
          role: "founder",
          affiliation: "Lebanese Tech Founder",
          createdAt: now,
          demoExpiresAt: now,
          isPremium: true,
          plan: "premium_annual",
          premiumExpiresAt: now + 365 * 24 * 60 * 60 * 1000,
          credits: 2500,
          whatsapp_phone: subscriberPhone || "+961 81 041 334"
        };
      }

      // Record in Confirmed Subscribers CRM database for Admin
      try {
        addConfirmedSubscriber({
          email: updatedUser.email,
          name: updatedUser.name,
          phone: subscriberPhone || "+961 81 041 334",
          affiliation: updatedUser.affiliation || "Lebanese AI Network Member",
          paymentMethod: chosenMethod,
          paymentRef: transferRef || `${chosenMethod}-${Date.now().toString().slice(-6)}`,
          amountPaid: "$100 USD"
        });
      } catch {
        // ignore
      }

      localStorage.setItem("961ai_auth_user", JSON.stringify(updatedUser));
      setIsProcessing(false);
      setCheckoutSuccess(true);
      onUpgradeSuccess(updatedUser);

      // Trigger pop-up message for OMT or WHISH
      if (paymentMethod === "omt" || paymentMethod === "whish") {
        setSalesContactMethod(paymentMethod === "omt" ? "OMT" : "WHISH");
        setSalesContactPopupOpen(true);
      }

      setTimeout(() => {
        setIsCheckoutOpen(false);
        setCheckoutSuccess(false);
      }, 2500);
    }, 1000);
  };

  const isUserPremium = user?.isPremium;
  const isDemoActive = user && !user.isPremium && user.demoExpiresAt > Date.now();
  const isDemoExpired = user && !user.isPremium && user.demoExpiresAt <= Date.now();

  return (
    <div id="pricing-module-container" className="space-y-8 max-w-6xl mx-auto pb-12 font-sans">
      {/* Top Header */}
      <div className="text-center space-y-3 pt-4">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono">
          {onNavigateToHome && (
            <button
              onClick={onNavigateToHome}
              className="text-[#2E5A2C] hover:underline flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Home</span>
            </button>
          )}
          <span className="text-slate-400">/</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]">
            Membership & Pricing
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Simple, Transparent Ecosystem Access
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Start with our free 6-hour demo, then upgrade to Annual Pro for unlimited year-round directory access, regulatory copilot, and direct syndicate introductions.
        </p>
      </div>

      {/* Pricing Cards Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
        {/* 1. Free 6-Hour Demo Access Card */}
        <div className="rounded-3xl bg-white border-2 border-[#D7E7D6] p-8 shadow-xs flex flex-col justify-between space-y-6 relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#F6FAF5] text-slate-700 border border-[#D7E7D6]">
                Ecosystem Trial
              </span>
              <div className="w-8 h-8 rounded-full bg-[#F6FAF5] border border-[#D7E7D6] flex items-center justify-center text-slate-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">6-Hour Demo Access</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Explore the complete 961AI directory, tech map, and knowledge resources with no credit card required.
              </p>
            </div>

            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">$0</span>
              <span className="text-xs font-mono text-slate-500 font-bold uppercase">/ 6 Hours from Signup</span>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 block">
                Included in 6-Hour Demo:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0" />
                  <span>Full Yellow Pages directory search & taxonomy filter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0" />
                  <span>Lebanon AI Tech Map & macro ecosystem telemetry</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0" />
                  <span>Curated news wire, research articles & market summaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0" />
                  <span>50 AI Credits for trial matching & ingestion</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4 shrink-0 text-slate-400" />
                  <span>Expires automatically 6 hours after signup</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            {isDemoActive ? (
              <div className="p-3 rounded-xl bg-[#EBF3EA] border border-[#B0CFAD] text-center">
                <span className="text-xs font-mono font-bold text-[#2E5A2C] block">
                  ⚡ Demo Currently Active
                </span>
                <span className="text-[11px] text-slate-600 font-medium">
                  Enjoy your 6-hour exploration window
                </span>
              </div>
            ) : isDemoExpired ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
                <span className="text-xs font-mono font-bold text-rose-700 block">
                  ⏳ 6-Hour Demo Expired
                </span>
                <span className="text-[11px] text-rose-600 font-medium">
                  Upgrade to Annual Pro to unlock
                </span>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="w-full py-3 px-4 rounded-xl bg-[#F6FAF5] hover:bg-[#EBF3EA] text-slate-800 font-bold text-xs border border-[#D7E7D6] transition-all flex items-center justify-center gap-2"
              >
                <span>Sign Up for Free Demo (6 Hours)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Annual Pro Membership Card (Featured) */}
        <div className="rounded-3xl bg-gradient-to-b from-white via-[#FAFCFA] to-[#EBF3EA] border-3 border-[#75AC73] p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Top Popular Badge */}
          <div className="absolute top-0 right-0 bg-[#4D7D4B] text-white text-[10px] font-mono font-black uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-xs">
            RECOMMENDED • UNLIMITED
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD] flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>Annual Pro Membership</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">Annual Pro Access</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                The definitive all-access membership for Lebanese founders, AI agencies, diaspora researchers, and regional investors.
              </p>
            </div>

            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">$100</span>
              <span className="text-xs font-mono text-slate-600 font-bold">/ Year ($8.33 / month)</span>
            </div>

            <hr className="border-[#D7E7D6]" />

            <div className="space-y-3">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#2E5A2C] block">
                Everything in Demo, Plus:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>365-Day Unlimited All-Access:</strong> Zero expiration locks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>Full Yellow Pages Directory:</strong> Direct contact emails & WhatsApp links</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>2,500 Monthly AI Credits:</strong> Ingestion, scoring & matchmaking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>0% Offshore S.A.L. & Legal Sandbox Copilot:</strong> Interactive tax engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>Concierge Syndicate Introductions:</strong> Warm investor & agency intro protocol</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>Verified Entity Badge & Custom Wiki Page Claim:</strong> Priority directory spotlight</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>VIP WhatsApp Edge Bot Token:</strong> Low-bandwidth 3G/4G Lebanese connection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D7D4B] shrink-0 font-bold" />
                  <span><strong>Founder Referral Rewards:</strong> Earn +1 Month Free for every startup founder you invite (Unlimited stacking)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            {isUserPremium ? (
              <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 text-center flex items-center justify-center gap-2">
                <Crown className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-mono font-bold text-amber-900">
                  You are an Active Annual Pro Member ($100/yr)
                </span>
              </div>
            ) : (
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Upgrade to Annual Pro ($100 / Year)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Security & Acceptance Banner */}
      <div className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-6 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">OMT Cash Settlement</h4>
              <p className="text-[11px] text-slate-600">Lebanon-wide agent or branch counter payment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Whish Money App</h4>
              <p className="text-[11px] text-slate-600">Direct transfer to +961 81 041 334</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">USDT & Crypto Accepted</h4>
              <p className="text-[11px] text-slate-600">TRC20 & ERC20 support for Lebanese founders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <HelpCircle className="w-5 h-5 text-[#4D7D4B]" />
          <h3 className="text-lg font-black text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">How does the 6-hour demo work?</h4>
            <p>
              When you sign up, your account is immediately provisioned with 6 hours of full platform access. You can search directory nodes, test the 0% Offshore S.A.L. tax calculator, and inspect graph wikis. Once the 6 hours expire, upgrading to Annual Pro unlocks full permanent access.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">What is included in the $100 / year subscription?</h4>
            <p>
              You receive full year-round access to the verified Lebanese AI directory, direct contact emails, 2,500 monthly AI credits, concierge warm introductions to VC syndicates, and VIP token access to the WhatsApp Edge bot.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">Can I pay using OMT or Whish Money in Lebanon?</h4>
            <p>
              Yes! We prioritize local Lebanese payment rails (OMT Cash Settlement & Whish Money App). When you select OMT or Whish, a member of our sales team will be in direct contact with you to confirm settlement and ensure immediate activation.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">Can I claim or update my company profile?</h4>
            <p>
              Annual Pro members can claim their entity profile, receive the Premier Verified badge, edit their Karpathy-style markdown wiki documentation, and list open AI roles.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">How does the 1-Month Free Founder Referral reward work?</h4>
            <p>
              Both Demo guests and Annual Pro members can share their referral link with Lebanese AI startup founders. For every verified startup founder who completes their questionnaire, you immediately receive <strong>1 Full Month Free (+30 days added to your subscription)</strong> and +250 AI Ingestion credits. Track referrals in your personal workspace under the <strong>Referrals</strong> tab.
            </p>
          </div>
        </div>
      </div>

      {/* Pop-up Message Modal for OMT or WHISH Selection */}
      {salesContactPopupOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#4D7D4B] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 text-center relative animate-in zoom-in-95">
            <button
              onClick={() => setSalesContactPopupOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                {salesContactMethod === "OMT" ? "OMT Payment Selected" : "Whish Payment Selected"}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                Thank you for your subscription, a member of our sales team will be in contact with you.
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Your annual subscription reservation has been registered with our Lebanese sales team. We will reach out to you directly to confirm settlement and ensure your VIP privileges are live.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Method:</span>
                <span className="font-bold text-slate-900">{salesContactMethod === "OMT" ? "OMT Cash Counter Settlement" : "Whish Money Transfer"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Official Account:</span>
                <span className="font-bold text-indigo-700">+961 81 041 334</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Beneficiary:</span>
                <span className="font-bold text-slate-900">961AI Network Sal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-emerald-700">$100 USD (365 Days)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setSalesContactPopupOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Understood, Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden font-sans max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>

            {checkoutSuccess ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-[#EBF3EA] border-2 border-[#75AC73] flex items-center justify-center text-[#4D7D4B] mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    {paymentMethod === "omt" || paymentMethod === "whish"
                      ? "Thank you for your subscription, a member of our sales team will be in contact with you."
                      : "Welcome to 961AI Annual Pro!"}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                    {paymentMethod === "omt" || paymentMethod === "whish"
                      ? "Your subscription request has been received. Our team will verify settlement via WhatsApp/phone and finalize your full access."
                      : "Your $100 / Year subscription is active. 6-hour demo lock lifted and 2,500 AI credits added."}
                  </p>
                </div>
                <div className="p-3 bg-[#FAFCFA] border border-[#D7E7D6] rounded-xl text-xs font-mono text-[#2E5A2C]">
                  Membership ID: PRO-961-{Date.now().toString().slice(-6)}
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-mono font-bold uppercase text-[#2E5A2C]">
                      Annual Pro Checkout
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Complete Your Upgrade ($100 / Year)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Billed annually. Credit cards deleted in favor of direct Lebanese local settlement.
                  </p>
                </div>

                {/* Direct local notice */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Notice:</strong> When you choose OMT or Whish payment, a member of our sales team will be in contact with you.
                  </p>
                </div>

                {/* Payment Method Selector - Credit Card DELETED */}
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => handleSelectPaymentMethod("omt")}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "omt"
                        ? "bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-2xs"
                        : "bg-white border-[#D7E7D6] text-slate-600 hover:bg-[#FAFCFA]"
                    }`}
                  >
                    <Landmark className="w-4 h-4 text-amber-700" />
                    <span className="text-[10px]">OMT Cash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPaymentMethod("whish")}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "whish"
                        ? "bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-2xs"
                        : "bg-white border-[#D7E7D6] text-slate-600 hover:bg-[#FAFCFA]"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px]">Whish Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPaymentMethod("crypto")}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "crypto"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-2xs"
                        : "bg-white border-[#D7E7D6] text-slate-600 hover:bg-[#FAFCFA]"
                    }`}
                  >
                    <Coins className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px]">USDT (TRC20)</span>
                  </button>
                </div>

                {/* Form based on selected method */}
                <form onSubmit={handleCompleteUpgrade} className="space-y-4">
                  {/* Subscriber Contact Details */}
                  <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[11px] font-mono font-bold text-slate-700 block">
                      Subscriber Contact Information
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] font-mono font-bold text-slate-600">Full Name</label>
                        <input
                          type="text"
                          required
                          value={subscriberName}
                          onChange={(e) => setSubscriberName(e.target.value)}
                          placeholder="Your Name / Startup"
                          className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#4D7D4B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono font-bold text-slate-600">Email Address</label>
                        <input
                          type="email"
                          required
                          value={subscriberEmail}
                          onChange={(e) => setSubscriberEmail(e.target.value)}
                          placeholder="founder@lebanon.ai"
                          className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#4D7D4B]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-600">WhatsApp / Phone for Sales Follow-up</label>
                      <input
                        type="text"
                        required
                        value={subscriberPhone}
                        onChange={(e) => setSubscriberPhone(e.target.value)}
                        placeholder="+961 81 041 334"
                        className="w-full bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#4D7D4B]"
                      />
                    </div>
                  </div>

                  {paymentMethod === "omt" && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-mono space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>OMT Beneficiary:</span>
                          <span>961AI Network Sal</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Lebanon Phone / ID:</span>
                          <span>+961 81 041 334</span>
                        </div>
                        <p className="text-[10px] text-amber-800 pt-1">
                          Deposit at any OMT counter across Lebanon. Keep receipt number handy for instant validation.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-bold text-slate-700">OMT Transaction MTCN / Receipt No. (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. OMT-BEY-772910 or leave blank for sales call"
                          value={transferRef}
                          onChange={(e) => setTransferRef(e.target.value)}
                          className="w-full bg-[#FAFCFA] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "whish" && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-mono space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>Whish Money App Account:</span>
                          <span>+961 81 041 334</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Account Name:</span>
                          <span>961AI Network Sal</span>
                        </div>
                        <p className="text-[10px] text-indigo-700 pt-1">
                          Open Whish App &gt; Send Money &gt; Enter +961 81 041 334 &gt; Transfer $100 USD.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-bold text-slate-700">Whish Transfer Ref No. (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. WHISH-961-88492"
                          value={transferRef}
                          onChange={(e) => setTransferRef(e.target.value)}
                          className="w-full bg-[#FAFCFA] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "crypto" && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>Amount:</span>
                          <span>100.00 USDT</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Network:</span>
                          <span>TRON (TRC20)</span>
                        </div>
                        <div className="text-[10px] break-all pt-1 bg-white p-2 rounded border border-emerald-300">
                          T961CedarAiNetworkDepositAddress70939779X
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono font-bold text-slate-700">Tx Hash / Proof of Transfer</label>
                        <input
                          type="text"
                          placeholder="e.g. 0x8a92b... or TRC20 TxID"
                          value={cryptoTxId}
                          onChange={(e) => setCryptoTxId(e.target.value)}
                          className="w-full bg-[#FAFCFA] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  )}

                  {/* Summary Box */}
                  <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#D7E7D6] text-xs font-mono flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Total Due Today:</span>
                      <span className="text-[11px] text-slate-500">Includes 365 Days Access + 2,500 Credits</span>
                    </div>
                    <span className="text-lg font-black text-[#2E5A2C]">$100 USD</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Processing & Registering Subscription...</span>
                    ) : (
                      <>
                        <Crown className="w-4 h-4 text-amber-300" />
                        <span>
                          {paymentMethod === "omt"
                            ? "Subscribe via OMT ($100/yr)"
                            : paymentMethod === "whish"
                            ? "Subscribe via Whish ($100/yr)"
                            : "Confirm USDT Subscription ($100/yr)"}
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    A member of our sales team will be in contact with you promptly.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
