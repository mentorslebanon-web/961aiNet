import React, { useState } from "react";
import { ReferralRecord, UserAuthSession } from "../../types";
import { 
  Gift, 
  Users, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Crown, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink, 
  ShieldCheck, 
  PlusCircle, 
  Send, 
  QrCode, 
  Award, 
  TrendingUp,
  Info,
  HelpCircle,
  Building2,
  Zap,
  Mail,
  Linkedin,
  Twitter
} from "lucide-react";

interface ReferralsWorkspaceTabProps {
  user: UserAuthSession | null;
  referrals: ReferralRecord[];
  onAddReferral: (referral: ReferralRecord) => void;
  onExtendSubscription: (months: number, credits: number) => void;
  onOpenPricing?: () => void;
}

export const ReferralsWorkspaceTab: React.FC<ReferralsWorkspaceTabProps> = ({
  user,
  referrals,
  onAddReferral,
  onExtendSubscription,
  onOpenPricing
}) => {
  // Generate a clean referral code based on user's identity
  const userRefCode = user?.referralCode || (user ? `CEDAR-${user.name.split(" ")[0].toUpperCase()}-${user.id.slice(-4).toUpperCase()}` : "CEDAR-FOUNDER-961");
  const referralUrl = `https://961ai.network/signup?ref=${userRefCode}`;

  // Copy state
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed_rewarded" | "pending_verification">("all");

  // Interactive Simulation / Manual Register form state
  const [simFounderName, setSimFounderName] = useState("");
  const [simStartupName, setSimStartupName] = useState("");
  const [simEmail, setSimEmail] = useState("");
  const [simSubService, setSimSubService] = useState("Generative AI & LLMs");
  const [simTechStack, setSimTechStack] = useState("PyTorch, CUDA, vLLM");
  const [simNotes, setSimNotes] = useState("Verified through BDD / AUB Founder Network");
  const [isSubmittingSim, setIsSubmittingSim] = useState(false);
  const [rewardToast, setRewardToast] = useState<{ show: boolean; name: string; startup: string } | null>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userRefCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Compute live statistics
  const completedReferrals = referrals.filter((r) => r.status === "completed_rewarded");
  const totalMonthsEarned = completedReferrals.reduce((sum, r) => sum + (r.rewardMonthValue || 1), 0);
  const totalCreditsAwarded = completedReferrals.reduce((sum, r) => sum + (r.creditsAwarded || 250), 0);
  const dollarSavings = (totalMonthsEarned * 8.33).toFixed(2); // $100 / 12 months = $8.33 / month

  // Subscription expiry date calculation
  const baseExpiry = user?.premiumExpiresAt || (user?.demoExpiresAt ? user.demoExpiresAt : Date.now() + 365 * 24 * 60 * 60 * 1000);
  const formattedExpiryDate = new Date(baseExpiry).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const handleSimulateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simFounderName.trim() || !simStartupName.trim() || !simEmail.trim()) {
      return;
    }

    setIsSubmittingSim(true);

    setTimeout(() => {
      const newReferral: ReferralRecord = {
        id: "ref_" + Date.now().toString(36),
        referrerUserId: user?.id || "usr_current",
        referredFounderName: simFounderName.trim(),
        referredStartupName: simStartupName.trim(),
        referredEmail: simEmail.trim(),
        founderCategory: "Startup Founder",
        techStack: simTechStack.trim(),
        subService: simSubService,
        signupDate: new Date().toISOString().split("T")[0],
        status: "completed_rewarded",
        rewardGranted: "+1 Month Free ($8.33 value)",
        rewardMonthValue: 1,
        creditsAwarded: 250,
        notes: simNotes.trim()
      };

      onAddReferral(newReferral);
      onExtendSubscription(1, 250);

      setRewardToast({
        show: true,
        name: simFounderName.trim(),
        startup: simStartupName.trim()
      });

      // Reset form
      setSimFounderName("");
      setSimStartupName("");
      setSimEmail("");
      setIsSubmittingSim(false);

      setTimeout(() => {
        setRewardToast(null);
      }, 5000);
    }, 600);
  };

  const filteredReferrals = referrals.filter((r) => {
    const matchesSearch =
      r.referredFounderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referredStartupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referredEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.subService && r.subService.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const isUserPremium = user?.isPremium || user?.plan === "premium_annual";

  // Pre-filled social sharing links
  const whatsappShareText = encodeURIComponent(
    `Hey! I'm inviting you to join the 961AI Network (Lebanese AI Founders & Diaspora VC Knowledge Graph). Sign up your startup with my invite link to get verified and access VC deal flow: ${referralUrl}`
  );
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`;
  const twitterShareText = encodeURIComponent(
    `Scaling a Lebanese or MENA AI Startup? Join the @961AINetwork knowledge graph & connect with Silicon Valley diaspora capital: ${referralUrl} #LebaneseTech #DeepTech #AI`
  );
  const emailShareSubject = encodeURIComponent("Invitation to join 961AI Lebanese DeepTech Network");
  const emailShareBody = encodeURIComponent(
    `Hi,\n\nI wanted to invite you to join 961AI Network, the intelligence and matchmaking graph for Lebanese AI founders, startups, and diaspora investors.\n\nSign up with my referral link to get verified and unlock matchmaking deal memos:\n${referralUrl}\n\nBest,\n${user?.name || "961AI Member"}`
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification for New Reward */}
      {rewardToast && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500 text-white shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl shrink-0">
              🎉
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                <span>+1 Free Month Premium Credited!</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/30 text-emerald-200 font-mono">+$8.33 Value</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Founder <strong>{rewardToast.name}</strong> ({rewardToast.startup}) successfully registered. Your subscription has been extended by 30 days & +250 AI Credits added!
              </p>
            </div>
          </div>
          <button
            onClick={() => setRewardToast(null)}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Value Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Gift className="w-3.5 h-3.5 text-emerald-400" />
                <span>Founder Referral Program</span>
              </span>

              {isUserPremium ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>Annual Pro Member</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span>Demo Member (Free Unlock Active)</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Get <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-wavy">1 Month Free</span> for Every Startup Founder You Invite
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Help expand the 961 Lebanese AI ecosystem. When an onshore or diaspora AI startup founder signs up and completes their entity profile using your link, your subscription is automatically extended by <strong>30 days (+1 Free Month)</strong> with <strong>+250 bonus AI Ingestion credits</strong>. No limit on stacked rewards.
            </p>
          </div>

          {/* Quick Metrics Badge Group */}
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 shrink-0">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-white font-mono">{totalMonthsEarned} Months</div>
                <div className="text-[11px] text-slate-400">Free Premium Earned</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-white font-mono">${dollarSavings}</div>
                <div className="text-[11px] text-slate-400">Subscription Value Saved</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-white font-mono">+{totalCreditsAwarded}</div>
                <div className="text-[11px] text-slate-400">AI Credits Rewarded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Current Status Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Active Expiration:</span>
            <strong className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {formattedExpiryDate}
            </strong>
            {totalMonthsEarned > 0 && (
              <span className="text-emerald-400 font-semibold">
                (Includes +{totalMonthsEarned} bonus {totalMonthsEarned === 1 ? "month" : "months"} from {completedReferrals.length} founder referrals)
              </span>
            )}
          </div>

          {onOpenPricing && (
            <button
              onClick={onOpenPricing}
              className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              <span>View Annual Pro Benefits ($100/yr)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* How It Works - Transparency & Verification Guide */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>How the Founder Referral Program Works</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  1 Month Free / Founder
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Transparent rules and step-by-step reward mechanics for our Lebanese AI community.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 self-start sm:self-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Auto-Credited</span>
          </span>
        </div>

        {/* 3 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-mono text-[11px]">
                1
              </span>
              <span>Share Your Invite Link</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Copy your personal founder referral link or QR code and share it with Lebanese AI founders, researchers, or scaleup teams (onshore or diaspora).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center font-mono text-[11px]">
                2
              </span>
              <span>Founder Registers Entity</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When the referred founder signs up and completes their AI entity profile or claims their directory node, their submission is verified.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-mono text-[11px]">
                3
              </span>
              <span>Get 1 Full Month Free</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your subscription is automatically extended by <strong>+30 Days (+1 Free Month, $8.33 value)</strong> and <strong>+250 AI credits</strong> are added immediately. Stack unlimited months!
            </p>
          </div>
        </div>

        {/* Explicit Transparency Note for Premium Members */}
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-200">
          <div className="flex items-start sm:items-center gap-2.5">
            <Crown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <span className="leading-relaxed">
              <strong className="text-white">Premium Member Guarantee:</strong> For every qualified founder signup, Annual Pro and active members receive <strong>1 full complimentary month</strong> added directly onto their renewal date. Refer 12 founders to enjoy a <strong>100% free annual subscription</strong>.
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400/90 whitespace-nowrap bg-emerald-900/40 px-2 py-1 rounded border border-emerald-700/40 self-end sm:self-center">
            No Cap on Stacked Months
          </span>
        </div>
      </div>

      {/* Share Tools & Referral Code Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Your Unique Link & Direct Sharing */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Your Personal Founder Referral Link</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Active & Valid
            </span>
          </div>

          {/* Referral Link Copy Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Referral URL</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-emerald-300 font-mono select-all truncate">
                {referralUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition-all shrink-0"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Referral Code Quick Copy & QR Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Referral Code</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">{userRefCode}</div>
              </div>
              <button
                onClick={handleCopyCode}
                style={{ color: "#ffffff" }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" style={{ color: "#ffffff" }} />}
                <span style={{ color: "#ffffff" }} className="!text-white font-bold">{copiedCode ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">In-Person Networking</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Beirut Digital District QR</div>
              </div>
              <button
                onClick={() => setShowQrModal(true)}
                style={{ color: "#ffffff" }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span style={{ color: "#ffffff" }} className="!text-white font-bold">Show QR</span>
              </button>
            </div>
          </div>

          {/* Quick Social Share Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300">Quick Share to Founder Communities</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href={`https://wa.me/?text=${whatsappShareText}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/50 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-700/50 text-blue-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${twitterShareText}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-700/50 text-sky-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Twitter className="w-4 h-4 text-sky-400" />
                <span>X (Twitter)</span>
              </a>

              <a
                href={`mailto:?subject=${emailShareSubject}&body=${emailShareBody}`}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Email Invite</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Program Rules & FAQ */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Referral Program Rules</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>1. Startup Founder Archetype Only</span>
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The +1 month reward triggers specifically when the referred user registers as a <strong>Startup Founder</strong> building applied AI or DeepTech.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>2. Unlimited Reward Stacking</span>
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Refer 12 startup founders and receive <strong>1 Full Year Free</strong> of 961AI Pro Membership ($100 saved).
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-indigo-400" />
                  <span>3. Instant Token Credits</span>
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Each completed founder intake grants you +250 AI Ingestion Credits and gives the referred founder +100 bonus trial credits.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Lebanese Bar & Offshore compliant reward mechanism.</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation / Test Engine */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold">
                Live Referral Verification
              </span>
              <h3 className="text-lg font-bold text-white">
                Register a Startup Founder Referral (+1 Month Free)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Invite or test registering a new Lebanese startup founder to immediately earn your free month and update your subscription.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Auto-Validates Layer 2 Ingestion
          </span>
        </div>

        <form onSubmit={handleSimulateReferral} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Founder Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Maya Trad"
                value={simFounderName}
                onChange={(e) => setSimFounderName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Startup / Venture Name *</label>
              <input
                type="text"
                placeholder="e.g. Byblos Neural Vision"
                value={simStartupName}
                onChange={(e) => setSimStartupName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Founder Email *</label>
              <input
                type="email"
                placeholder="maya@byblosvision.ai"
                value={simEmail}
                onChange={(e) => setSimEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Domain / Sub-Service</label>
              <select
                value={simSubService}
                onChange={(e) => setSimSubService(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                <option value="Computer Vision & Diffusion">Computer Vision & Diffusion</option>
                <option value="AgTech & Autonomous Drones">AgTech & Autonomous Drones</option>
                <option value="FinTech & Algorithmic Trading">FinTech & Algorithmic Trading</option>
                <option value="NeuroTech & Hardware">NeuroTech & Hardware</option>
                <option value="HealthAI & Diagnostics">HealthAI & Diagnostics</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tech Stack & Frameworks</label>
              <input
                type="text"
                placeholder="PyTorch, CUDA, vLLM, TensorRT"
                value={simTechStack}
                onChange={(e) => setSimTechStack(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Category (Required for Reward)</label>
              <div className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl p-2.5 text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Startup Founder (Qualified for 1 Month)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant reward dispatch: +1 Month added immediately to user session.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmittingSim}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmittingSim ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Founder Signup...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit Founder & Claim +1 Free Month</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Referred Founders Ledger Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Referred Startup Founders History ({referrals.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Transparent ledger of all founders who registered through your network referral code.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search founders, startups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-48"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="completed_rewarded">Completed (+1 Mo)</option>
              <option value="pending_verification">Pending</option>
            </select>
          </div>
        </div>

        {filteredReferrals.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs font-semibold text-slate-400">No startup founder referrals found matching your query.</p>
            <p className="text-[11px] text-slate-500">Share your referral link with Lebanese tech founders to earn your first free month!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Startup & Founder</th>
                  <th className="py-3 px-4">Domain & Stack</th>
                  <th className="py-3 px-4">Signup Date</th>
                  <th className="py-3 px-4">Reward Granted</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredReferrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{ref.referredFounderName}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                          Founder
                        </span>
                      </div>
                      <div className="text-emerald-400 font-semibold text-[11px] mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-emerald-400" />
                        <span>{ref.referredStartupName}</span>
                      </div>
                      <div className="text-slate-500 font-mono text-[10px]">{ref.referredEmail}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-200">{ref.subService || "AI / DeepTech"}</div>
                      {ref.techStack && (
                        <div className="text-slate-400 font-mono text-[10px] mt-0.5 truncate max-w-xs">
                          {ref.techStack}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {ref.signupDate}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-emerald-400 flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{ref.rewardGranted}</span>
                      </div>
                      <div className="text-indigo-300 text-[10px] font-mono mt-0.5">
                        +{ref.creditsAwarded} AI Credits
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {ref.status === "completed_rewarded" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>1 Month Credited</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-[10px]">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QR Code Modal for In-Person Networking */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Founder Referral QR</span>
              </h4>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Generated Visual QR Code Mock */}
            <div className="bg-white p-6 rounded-2xl mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-lg border border-slate-200 space-y-2">
              <div className="text-4xl">📱</div>
              <div className="text-[10px] font-mono text-slate-800 font-bold text-center break-all">
                {userRefCode}
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                961AI Founder Scan
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Have Lebanese founders scan this code at Beirut Digital District, AUB, or diaspora events to instantly register with your referral.
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
            >
              Close QR Scanner
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function Coins(props: { className?: string }) {
  return (
    <svg 
      className={props.className || "w-4 h-4"} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <circle cx="8" cy="8" r="6" strokeWidth="2" />
      <path d="M18 10a6 6 0 0 1-6 6" strokeWidth="2" />
      <path d="M12 18a6 6 0 0 0 6-6" strokeWidth="2" />
    </svg>
  );
}
