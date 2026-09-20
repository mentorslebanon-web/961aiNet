import React, { useState, useEffect } from "react";
import { UserAuthSession } from "../types";
import { Clock, Crown, ArrowRight, AlertTriangle, X } from "lucide-react";

interface DemoExpiryBannerProps {
  user: UserAuthSession | null;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
}

export const DemoExpiryBanner: React.FC<DemoExpiryBannerProps> = ({
  user,
  onOpenPricing,
  onOpenAuth
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeLeftMs, setTimeLeftMs] = useState<number>(() => {
    if (!user) return 0;
    if (user.isPremium) return 999999999;
    return Math.max(0, user.demoExpiresAt - Date.now());
  });

  useEffect(() => {
    if (!user || user.isPremium) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, user.demoExpiresAt - Date.now());
      setTimeLeftMs(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  if (isDismissed) {
    return null;
  }

  // Guest / Non-logged in banner (Grey-Blue theme)
  if (!user) {
    return (
      <div className="bg-gradient-to-r from-slate-100 via-blue-50/40 to-slate-100 border-b border-slate-300 py-2 px-4 text-xs font-mono text-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-500 animate-ping" />
            <span className="font-bold text-slate-900">Lebanon AI Network Demo Access:</span>
            <span className="text-slate-600">Sign up to get 6 hours of full platform exploration for free.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all text-[11px] shadow-2xs"
            >
              Sign Up (6h Demo)
            </button>
            <button
              onClick={onOpenPricing}
              className="text-slate-700 hover:text-slate-900 hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              <Crown className="w-3 h-3 text-amber-600" />
              <span>Annual Pro ($100/yr)</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-all ml-1"
              aria-label="Close banner"
              title="Close banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format hours, minutes, seconds
  const totalSeconds = Math.floor(timeLeftMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const isExpired = !user.isPremium && timeLeftMs <= 0;

  if (user.isPremium) {
    return (
      <div className="bg-slate-100 border-b border-slate-300 py-1.5 px-4 text-xs font-mono text-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>961AI Annual Pro Member • {user.name} ({user.affiliation || "Verified Member"})</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-300">
              Active Subscription ($100/yr)
            </span>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all"
              aria-label="Close banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Expired Demo Alert (Grey-Blue Slate Theme with Close Button)
  if (isExpired) {
    return (
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 text-slate-100 py-2.5 px-4 text-xs font-mono shadow-md animate-in slide-in-from-top-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="tracking-wide text-white">6-Hour Demo Usage Has Expired:</strong>
              <span className="ml-1.5 text-slate-300">
                Your free 6-hour trial for {user.email || "demo.guest@961ai.network"} has ended. Upgrade to Annual Pro ($100 / Year) to maintain full access.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenPricing}
              className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-sm flex items-center gap-1.5 text-xs transition-all"
            >
              <Crown className="w-3.5 h-3.5 text-slate-900" />
              <span>Upgrade to Pro ($100/yr)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-all"
              aria-label="Close expired demo notification"
              title="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Demo Countdown (Grey-Blue Theme with Close Button)
  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-50/30 to-slate-100 border-b-2 border-slate-300 py-2 px-4 text-xs font-mono text-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-800">
          <Clock className="w-4 h-4 text-slate-600 animate-pulse" />
          <span className="font-bold">6-Hour Demo Access:</span>
          <span className="px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-900 font-black font-mono shadow-2xs">
            {hours.toString().padStart(2, "0")}h {minutes.toString().padStart(2, "0")}m {seconds.toString().padStart(2, "0")}s remaining
          </span>
          <span className="hidden md:inline text-slate-500">({user.name})</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPricing}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all text-[11px] shadow-2xs flex items-center gap-1.5"
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>Move to Annual Pro ($100 / Year)</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all"
            aria-label="Close banner"
            title="Close banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
