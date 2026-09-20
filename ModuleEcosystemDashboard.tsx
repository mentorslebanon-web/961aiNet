import React, { useState } from "react";
import { SeedingPartner, SubscriptionTier } from "../../types";
import { addConfirmedSubscriber } from "../../lib/registeredUsers";
import { 
  Flame, 
  Share2, 
  Coins, 
  Check, 
  Sparkles, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  MapPin, 
  Award, 
  DollarSign,
  QrCode,
  CheckCircle2,
  Building2,
  Users,
  Landmark,
  Smartphone
} from "lucide-react";
import confetti from "canvas-confetti";

interface Module4GTMProps {
  seedingPartners: SeedingPartner[];
  subscriptionTiers: SubscriptionTier[];
  currency: "USD" | "USDT" | "LBP";
  setCurrency: (c: "USD" | "USDT" | "LBP") => void;
  onTopUpCredits: (credits: number, planName: string) => void;
}

export const Module4GTM: React.FC<Module4GTMProps> = ({
  seedingPartners,
  subscriptionTiers,
  currency,
  setCurrency,
  onTopUpCredits
}) => {
  const [activeTab, setActiveTab] = useState<"seeding" | "claim_loop" | "monetization">("seeding");

  // Claim Your Node Generator State
  const [targetHandle, setTargetHandle] = useState("charbel_ai");
  const [targetName, setTargetName] = useState("Charbel Assi");
  const [targetSpecialty, setTargetSpecialty] = useState("GPU Cluster Architect & MLOps");
  const [copiedLink, setCopiedLink] = useState(false);
  const [claimedStatus, setClaimedStatus] = useState<"idle" | "claimed">("idle");

  // Payment Rails State
  const [paymentRail, setPaymentRail] = useState<"omt" | "whish" | "usdt">("omt");
  const [selectedTier, setSelectedTier] = useState<string>("startup");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  const handleClaimSimulation = () => {
    setClaimedStatus("claimed");
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleCopyVanityUrl = () => {
    navigator.clipboard.writeText(`https://961ai.network/@${targetHandle}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCheckout = (tier: SubscriptionTier) => {
    const amount = billingCycle === "monthly" ? tier.priceUsdMonthly : tier.priceUsdAnnual;
    const credits = tier.creditsPerMonth;
    onTopUpCredits(credits, tier.name);

    if (paymentRail === "omt" || paymentRail === "whish") {
      setCheckoutSuccess("Thank you for your subscription, a member of our sales team will be in contact with you.");
      try {
        addConfirmedSubscriber({
          email: "founder@lebanon.ai",
          name: "Ecosystem Founder",
          paymentMethod: paymentRail === "omt" ? "OMT" : "WHISH",
          amountPaid: formatPrice(amount)
        });
      } catch {
        // ignore
      }
    } else {
      setCheckoutSuccess(`Successfully subscribed to ${tier.name} via ${paymentRail.toUpperCase()}! ${credits.toLocaleString()} credits loaded.`);
    }

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCheckoutSuccess(null), 6000);
  };

  const formatPrice = (priceUsd: number) => {
    if (currency === "USD") return `$${priceUsd}`;
    if (currency === "USDT") return `${priceUsd} USDT`;
    // LBP conversion rate (e.g. 89,500 LBP/USD)
    const lbp = priceUsd * 89500;
    return `${(lbp / 1000000).toFixed(1)}M LBP`;
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
              MODULE 4 SPECIFICATION
            </span>
            <h2 className="text-lg font-bold text-white">Lebanon GTM Strategy & Viral Loops</h2>
          </div>
          <p className="text-xs text-slate-400">
            University &amp; diaspora seeding roadmaps, high-converting "Claim Your Node" viral growth loops, and localized multi-rail monetization (OMT + Whish + USDT).
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("seeding")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "seeding" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            University & Hub Seeding
          </button>
          <button
            onClick={() => setActiveTab("claim_loop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "claim_loop" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            "Claim Your Node" Loop
          </button>
          <button
            onClick={() => setActiveTab("monetization")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "monetization" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Monetization &amp; Pricing
          </button>
        </div>
      </div>

      {/* Tab 1: Seeding Strategy Blueprint */}
      {activeTab === "seeding" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Phase 1: Academic Hubs</span>
              <h4 className="text-sm font-bold text-white">AUB, LAU, USJ AI Labs</h4>
              <p className="text-xs text-slate-400">
                Partner directly with department chairs to automatically ingest Masters/PhD theses and seed top 50 student researchers.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Phase 2: Local Incubators</span>
              <h4 className="text-sm font-bold text-white">Berytech & Flat6Labs</h4>
              <p className="text-xs text-slate-400">
                Batch onboarding of accelerated startups to receive automatic two-way matchmaking with global diaspora angels.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Phase 3: Diaspora Catalysts</span>
              <h4 className="text-sm font-bold text-white">LebNet & LIFE Networks</h4>
              <p className="text-xs text-slate-400">
                1,500+ senior diaspora leaders in Silicon Valley, London, Paris, and Dubai providing capital and US enterprise pilots.
              </p>
            </div>
          </div>

          {/* Seeding Partners Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Active Ecosystem Seed Partners & Ingestion Anchors
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seedingPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{partner.logo}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{partner.name}</h4>
                        <span className="text-xs text-slate-400">{partner.category} • {partner.city}, {partner.country}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                      {partner.integrationStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400">Seeded Graph Nodes:</span>
                    <span className="font-mono text-emerald-400 font-bold">{partner.seedNodesCount} Active Nodes</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Key Alumni & Anchors:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.keyAlumniGurus.map((g, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono rounded">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: "Claim Your Node" Viral Growth Loop */}
      {activeTab === "claim_loop" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Loop Generator & Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-400" />
                "Claim Your Node" Invitation Engine
              </h3>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">
                Viral K-Factor: 1.42
              </span>
            </div>

            <p className="text-xs text-slate-400">
              When AI researchers or startups are discovered by our ingestion pipeline, a pre-compiled, high-reputation node is generated. Automated cold outreach invites them to verify and claim their node.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">Target Persona Name</label>
                <input
                  type="text"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">Vanity Node Handle</label>
                <div className="flex items-center">
                  <span className="bg-slate-950 border border-r-0 border-slate-800 text-slate-500 text-xs px-3 py-2 rounded-l-lg font-mono">
                    961ai.network/@
                  </span>
                  <input
                    type="text"
                    value={targetHandle}
                    onChange={(e) => setTargetHandle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-r-lg p-2 text-xs text-emerald-400 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">Verified Specialization</label>
                <input
                  type="text"
                  value={targetSpecialty}
                  onChange={(e) => setTargetSpecialty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Simulated Dynamic Outreach Message */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                Automated Dynamic Cold Email / WhatsApp Dispatch:
              </span>
              <p className="text-slate-300 leading-relaxed">
                "Hi {targetName}! 👋<br /><br />
                Our Lebanese AI Knowledge Graph tagged you as a <strong>Top 1% {targetSpecialty}</strong> with 4 incoming startup advisory links.<br /><br />
                Your pre-compiled verified node is ready at: <span className="text-emerald-400 underline">961ai.network/@{targetHandle}</span>.<br />
                Claim your node to unlock direct investor deal-flow and US/GCC advisory gigs."
              </p>
            </div>
          </div>

          {/* Vanity Badge & Claim Simulation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Vanity Node Embed Badge Preview
                </h3>
                <button
                  onClick={handleCopyVanityUrl}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? "Copied" : "Copy URL"}
                </button>
              </div>

              {/* Embed Badge Card */}
              <div className="mt-4 p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌲</span>
                    <span className="font-bold text-white text-xs">961AINetwork Verified Node</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                    TIER 1 GURU
                  </span>
                </div>

                <div className="pt-2">
                  <h4 className="text-base font-bold text-white">{targetName}</h4>
                  <p className="text-xs text-emerald-400 font-mono">{targetSpecialty}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">961ai.network/@{targetHandle}</p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>✓ 4 Startup Backlinks</span>
                  <span>•</span>
                  <span>✓ AUB/LAU IP Verified</span>
                  <span>•</span>
                  <span>✓ LebNet Mentor</span>
                </div>
              </div>
            </div>

            {/* Action Simulator */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              {claimedStatus === "claimed" ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center text-xs text-emerald-300 font-bold space-y-1">
                  <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400" />
                  <p>Node Claimed & Verified! +100 Viral Referral Credits Unlocked.</p>
                </div>
              ) : (
                <button
                  onClick={handleClaimSimulation}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Simulate User Claiming Node
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Localized Monetization & Multi-Rail Checkout */}
      {activeTab === "monetization" && (
        <div className="space-y-6">
          {/* Payment Rails & Billing Cycle Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Rails:</span>
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setPaymentRail("omt")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    paymentRail === "omt" ? "bg-amber-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  🏛️ OMT Cash Settlement
                </button>
                <button
                  onClick={() => setPaymentRail("whish")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    paymentRail === "whish" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  ⚡ Whish Money App
                </button>
                <button
                  onClick={() => setPaymentRail("usdt")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    paymentRail === "usdt" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  🪙 USDT Crypto (TRC20)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <span className={billingCycle === "monthly" ? "text-white" : "text-slate-500"}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="w-8 h-4 bg-slate-800 rounded-full relative p-0.5 transition-colors"
              >
                <span className={`block w-3 h-3 rounded-full bg-emerald-400 transition-transform ${billingCycle === "annual" ? "translate-x-4" : ""}`} />
              </button>
              <span className={billingCycle === "annual" ? "text-emerald-400 font-bold" : "text-slate-500"}>
                Annual (Save 20%)
              </span>
            </div>
          </div>

          {/* Success Banner */}
          {checkoutSuccess && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center text-xs text-emerald-300 font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {checkoutSuccess}
            </div>
          )}

          {/* 4 Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionTiers.map((tier) => {
              const price = billingCycle === "monthly" ? tier.priceUsdMonthly : Math.round(tier.priceUsdAnnual / 12);
              const isPopular = tier.popular;

              return (
                <div
                  key={tier.id}
                  className={`bg-slate-900 rounded-2xl p-5 flex flex-col justify-between relative transition-all ${
                    isPopular
                      ? "border-2 border-emerald-500 shadow-xl shadow-emerald-950/40"
                      : "border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase rounded-full shadow">
                      {tier.badge}
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white">{tier.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{tier.tagline}</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white font-mono">{formatPrice(price)}</span>
                        <span className="text-xs text-slate-400">/month</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                        Includes {tier.creditsPerMonth.toLocaleString()} AI Credits / mo
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                        Included Features:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleCheckout(tier)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
                        isPopular
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950/50"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                    >
                      {tier.buttonLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
