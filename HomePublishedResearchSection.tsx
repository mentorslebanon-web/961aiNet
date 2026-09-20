import React from "react";
import { MessageCircle, Share2, ArrowUpRight, Globe, Newspaper } from "lucide-react";

export interface SocialMediaBannerProps {
  id?: string;
  className?: string;
  variant?: "default" | "compact" | "footer";
}

export const SOCIAL_LINKS = [
  {
    id: "whatsapp-961ai",
    name: "WhatsApp Group: the961aiNetwork",
    shortLabel: "WhatsApp: the961aiNetwork",
    subtitle: "Real-time AI alerts, founder deal flow & syndicate updates",
    url: "https://chat.whatsapp.com/JDHRJSfPuTWLxru7kNNoOC",
    iconColor: "text-emerald-500",
    bgHover: "hover:border-emerald-500/60 hover:bg-emerald-500/10",
    badge: "Official Chat",
    platform: "WhatsApp",
  },
  {
    id: "whatsapp-alkhawarizmi",
    name: "WhatsApp Group: AlKhawarizmiCommunity",
    shortLabel: "WhatsApp: AlKhawarizmiCommunity",
    subtitle: "Applied AI developers, researchers & prompt engineers",
    url: "https://chat.whatsapp.com/KdqHl2Rj60pGUgvAV2TM20",
    iconColor: "text-emerald-400",
    bgHover: "hover:border-emerald-400/60 hover:bg-emerald-400/10",
    badge: "Developers",
    platform: "WhatsApp",
  },
  {
    id: "linkedin-group",
    name: "LinkedIn: Al Khawarizmi Community / the 961ai Network",
    shortLabel: "LinkedIn Community",
    subtitle: "Diaspora investors, executive syndicate & career bridges",
    url: "https://www.linkedin.com/groups/10064575/",
    iconColor: "text-sky-400",
    bgHover: "hover:border-sky-400/60 hover:bg-sky-400/10",
    badge: "Executive Network",
    platform: "LinkedIn",
  },
  {
    id: "substack-newsletter",
    name: "Substack: z961ainetwork",
    shortLabel: "Substack Newsletter",
    subtitle: "Weekly sovereign AI briefings, regulatory analysis & deal digests",
    url: "https://z961ainetwork.substack.com/",
    iconColor: "text-amber-400",
    bgHover: "hover:border-amber-400/60 hover:bg-amber-400/10",
    badge: "Newsletter",
    platform: "Substack",
  },
  {
    id: "twitter-x",
    name: "X (Twitter): @the961ainetwork",
    shortLabel: "X (Twitter) @the961ainetwork",
    subtitle: "Fast-breaking AI ecosystem updates & community threads",
    url: "https://x.com/the961ainetwork",
    iconColor: "text-slate-200",
    bgHover: "hover:border-slate-300 hover:bg-slate-700/40",
    badge: "@the961ainetwork",
    platform: "X",
  },
  {
    id: "facebook-group",
    name: "Facebook: 961AI & AlKhawarizmi Group",
    shortLabel: "Facebook Group",
    subtitle: "Lebanese innovation ecosystem discussions & meetups",
    url: "https://www.facebook.com/groups/1114245954347125",
    iconColor: "text-blue-400",
    bgHover: "hover:border-blue-400/60 hover:bg-blue-400/10",
    badge: "Community",
    platform: "Facebook",
  },
];

// Helper to render branded SVG icons cleanly
export const SocialPlatformIcon: React.FC<{ platform: string; className?: string }> = ({ platform, className = "w-5 h-5" }) => {
  switch (platform) {
    case "WhatsApp":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "Substack":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      );
    case "X":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return <Globe className={className} />;
  }
};

export const SocialMediaBanner: React.FC<SocialMediaBannerProps> = ({
  id = "social-media-network-banner",
  className = "",
  variant = "default",
}) => {
  if (variant === "footer") {
    return (
      <div id={id} className={`rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#122815] border-2 border-emerald-500/40 p-6 text-white shadow-md ${className}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider">
                COMMUNITY DIRECT CONNECT
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                Join Our Social Media Network
              </span>
            </div>
            <h3 className="text-lg font-black text-white tracking-tight">
              Connect with 961AI & AlKhawarizmi Community Channels
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time sovereign AI updates, WhatsApp founder circles, deep-tech research papers, and diaspora co-investment syndicates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full lg:w-auto">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white text-xs font-semibold transition-all ${item.bgHover} group`}
              >
                <div className={`${item.iconColor} shrink-0 transition-transform group-hover:scale-110`}>
                  <SocialPlatformIcon platform={item.platform} className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-mono">{item.shortLabel}</div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default banner layout (for placement right before Joint National Initiative section)
  return (
    <section
      id={id}
      className={`rounded-2xl bg-gradient-to-br from-slate-950 via-[#0B1510] to-[#122818] border-2 border-emerald-500/60 p-6 sm:p-7 text-white shadow-lg shadow-emerald-950/20 relative overflow-hidden font-sans ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider">
                COMMUNITY DIRECT ACCESS
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                Alkharizmi Solutions & NCEI Lebanon Joint Network
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Join Our Social Media Network
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Stay in the loop with live updates, WhatsApp founder circles, deep-tech research, and diaspora investor briefings.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Verified Channels</span>
          </div>
        </div>

        {/* 6 Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              id={`social-link-${link.id}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400 text-white transition-all transform active:scale-98 group flex items-start gap-3.5 ${link.bgHover}`}
            >
              <div className={`p-2.5 rounded-xl bg-slate-800 border border-slate-700/80 ${link.iconColor} shrink-0 group-hover:scale-105 transition-transform shadow-xs`}>
                <SocialPlatformIcon platform={link.platform} className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {link.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug truncate">
                  {link.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                  {link.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
