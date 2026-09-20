import React from "react";
import { 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Coins, 
  Compass, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Globe,
  Sparkles,
  Server,
  KeyRound,
  GraduationCap,
  TrendingUp,
  Landmark,
  Share2
} from "lucide-react";

interface ModuleMitaInitiativesProps {
  onNavigateToHome?: () => void;
  onNavigateToOmsar?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToPricing?: () => void;
  onNavigateToSandbox?: () => void;
}

export const ModuleMitaInitiatives: React.FC<ModuleMitaInitiativesProps> = ({
  onNavigateToHome,
  onNavigateToOmsar,
  onNavigateToDirectory,
  onNavigateToPricing,
  onNavigateToSandbox
}) => {
  const pillars = [
    {
      number: "01",
      title: "Establishing the Governance Foundations",
      icon: ShieldCheck,
      color: "emerald",
      badge: "Legal & Ethics",
      description:
        "Every resilient digital ecosystem begins with trust and rule of law. The first pillar focuses on creating the legal frameworks, regulatory sandboxes, and ethical guidelines required for safe, responsible AI adoption. By formally establishing the Ministry of IT & AI, the state is enacting crucial cybersecurity, data protection, and AI legislation that enables cross-government coordination. A newly formed National AI Advisory Council ensures that public-private dialogue remains transparent, inclusive, and forward-looking."
    },
    {
      number: "02",
      title: "Building Future-Ready Digital Infrastructure",
      icon: Server,
      color: "blue",
      badge: "Sovereign Cloud & SuperApp",
      description:
        "A digital economy cannot run on analog foundations. The second pillar addresses the urgent need to modernize national infrastructure for high-speed connectivity and secure data exchange. Key initiatives include developing a unified government enterprise architecture, deploying next-generation national AI data centers, and establishing government cloud platforms.",
      highlights: [
        "Lebanon Super App: Unified, one-stop digital portal bringing essential government services together and streamlining bureaucratic workflows for citizens and businesses.",
        "National Digital ID: Secure, universal digital identity for trusted authentication across all digital public platforms.",
        "80,000 Archival Records Digitized: Modernized for the Ministry of the Displaced via a secure claims portal, establishing an AI-enabled document validation precedent."
      ]
    },
    {
      number: "03",
      title: "Empowering Lebanon’s Talent Ecosystem",
      icon: GraduationCap,
      color: "amber",
      badge: "Human Capital & Diaspora",
      description:
        "Lebanon’s greatest export has historically been its people. The third pillar seeks to reverse the brain drain by cultivating local expertise, modernizing nationwide STEM education, and activating the global diaspora network. From introducing foundational AI concepts in public schools to building vocational tech pathways, the strategy prepares the next generation for a tech-driven workforce. Civil servants are not left behind: specialized training programs are equipping public-sector staff with practical digital skills, cloud fundamentals, and early AI adoption techniques, while inter-ministerial workshops foster a culture of shared learning and digital readiness."
    },
    {
      number: "04",
      title: "Catalyzing Growth and Investments",
      icon: TrendingUp,
      color: "purple",
      badge: "$500M Target by 2027",
      description:
        "Innovation requires capital, and the fourth pillar is engineered to attract high-impact foreign investment and fuel a thriving domestic startup scene. Targeting up to $500 million in technology and AI investments by 2027, the ministry is launching the Lebanese Tech & AI Fund—a national fund-of-funds and co-investment platform designed to support high-growth local companies. Complementing this is the establishment of the Lebanon Angel Network, which activates high-net-worth individuals and diaspora investors through structured onboarding, curated pitch sessions, and targeted global branding."
    }
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        {onNavigateToHome && (
          <button 
            onClick={onNavigateToHome}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            961AI Hub
          </button>
        )}
        <span>/</span>
        <span className="text-slate-800 font-bold">National Initiatives</span>
        <span>/</span>
        <span className="text-emerald-700 font-bold">MITA Initiatives (mitai.gov.lb)</span>
      </div>

      {/* Hero Header Section */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B1E13] to-slate-900 border-2 border-emerald-500/30 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>National AI &amp; Tech Transformation</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700 flex items-center gap-1.5">
              <span>Republic of Lebanon</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400 font-bold">Vision 2030</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Building the Digital Republic: <br className="hidden sm:inline" />
            <span className="text-emerald-400">Inside Lebanon’s National AI and Technology Transformation Strategy</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            In a region defined by resilience and reinvention, Lebanon is quietly laying the groundwork for its next great leap. Far from the traditional corridors of old bureaucracy, a new vision is taking shape under the banner of a <strong className="text-white font-semibold">“startup ministry in a startup republic.”</strong>
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://www.mitai.gov.lb/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-slate-950" />
              <span>Visit Official MITA Webpage (mitai.gov.lb)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span>Official Government Portal:</span>
              <span className="text-emerald-300 font-mono">https://www.mitai.gov.lb/</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vision Card */}
        <div className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-7 shadow-xs space-y-4 hover:border-emerald-600 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block">Strategic Horizon</span>
                <h3 className="text-lg font-black text-slate-950">MITAI Vision for Lebanon</h3>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-mono font-bold">
              Citizen-First
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            The Ministry of State for Technology and Artificial Intelligence (MITAI) is building the <strong className="text-slate-900">Digital Republic</strong>, a modern, inclusive, and innovative nation powered by technology, trust, and talent. Our mission is to deliver citizen-first services, safeguard digital rights, and unlock Lebanon's role as a regional hub for AI and digital progress.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-emerald-800 font-semibold">
            <span className="px-2 py-1 rounded bg-[#F6FAF5] border border-[#D7E7D6]">✦ Trust &amp; Transparency</span>
            <span className="px-2 py-1 rounded bg-[#F6FAF5] border border-[#D7E7D6]">✦ Talent Acceleration</span>
            <span className="px-2 py-1 rounded bg-[#F6FAF5] border border-[#D7E7D6]">✦ Regional AI Hub</span>
          </div>
        </div>

        {/* Mission Card */}
        <div className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-7 shadow-xs space-y-4 hover:border-emerald-600 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block">Implementation Mandate</span>
                <h3 className="text-lg font-black text-slate-950">MITAI Mission for Lebanon</h3>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-mono font-bold">
              Goal 2030
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Lebanon aims to harness digital technology and AI to drive national development, empower citizens, optimize government services, foster sustainable economic growth, and improve quality of life. By harnessing frontier technologies, modernizing public administration, and unlocking the potential of a legendary global diaspora, Lebanon is positioning itself to leapfrog decades of economic stagnation and emerge as a <strong className="text-slate-900">regional leader in digital innovation by 2030</strong>.
          </p>

          <p className="text-xs text-slate-500 font-mono">
            The roadmap for this transformation rests on a balanced, four-pillar framework designed to harmonize governance, infrastructure, talent, and economic investment.
          </p>
        </div>
      </div>

      {/* The Four Pillars of Transformation */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#D7E7D6] pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-800 tracking-wider uppercase">Strategic Architecture</span>
            <h2 className="text-2xl font-black text-slate-950">The Four Pillars of Transformation</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Harmonizing Governance • Infrastructure • Talent • Capital
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-7 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-600 transition-all hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black font-mono text-emerald-700">
                        {pillar.number}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-[#F6FAF5] border border-[#D7E7D6] flex items-center justify-center text-emerald-800">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-mono font-semibold">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {pillar.description}
                  </p>

                  {pillar.highlights && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-slate-900 uppercase tracking-wide block">
                        Core Infrastructure Milestones:
                      </span>
                      <div className="space-y-1.5">
                        {pillar.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-[#FAFCFA] border border-[#EBF3EA] p-2.5 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sectoral Integration and Vision 2030 */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FAFCFA] via-white to-[#F6FAF5] border-2 border-[#B0CFAD] p-7 sm:p-9 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#2E5A2C] uppercase tracking-wider">
              Cross-Sector Implementation
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-sans">
              Sectoral Integration and Vision 2030
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-bold border border-emerald-300">
            Smart State Modernization
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3 bg-white border border-[#D7E7D6] p-5 rounded-xl shadow-2xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AI-Powered Tourism &amp; Cultural Heritage</span>
            </h4>
            <p>
              Beyond structural pillars, the strategy embeds intelligence directly into key economic sectors. AI-Powered Tourism is set to transform the visitor experience through personalized recommendations and smart digital tools, leveraging Lebanon’s rich cultural heritage.
            </p>
          </div>

          <div className="space-y-3 bg-white border border-[#D7E7D6] p-5 rounded-xl shadow-2xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Council of Ministers (CoM) Real-Time Dashboard</span>
            </h4>
            <p>
              Concurrently, public administration is being revolutionized through tools like the Council of Ministers (CoM) Dashboard, which provides real-time tracking, data visibility, and centralized repositories for government decisions.
            </p>
          </div>
        </div>

        <div className="p-5 bg-emerald-900 text-white rounded-xl space-y-2 border border-emerald-700">
          <p className="text-sm leading-relaxed text-emerald-100">
            Together, these synchronized initiatives represent more than just an upgrade to government software; they are a <strong className="text-white">fundamental redesign of how the state serves its people</strong>. By uniting policy, infrastructure, talent, and capital under a single forward-looking banner, Lebanon is actively turning the promise of Vision 2030 into a tangible reality—empowering its citizens, fostering relentless innovation, and securing its place as a digital leader in the Middle East.
          </p>
        </div>

        {/* Source citation attribution banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[#D7E7D6] text-xs font-mono">
          <div className="text-slate-600">
            <span className="font-bold text-slate-800">Official Source Reference: </span>
            <span>The Ministry of State for Technology and Artificial Intelligence (MITAI) — </span>
            <a
              href="https://www.mitai.gov.lb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 underline font-bold inline-flex items-center gap-1"
            >
              https://www.mitai.gov.lb/
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToSandbox && (
              <button
                onClick={onNavigateToSandbox}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold transition-all shadow-2xs cursor-pointer"
              >
                View Regulatory Sandbox (Law 126)
              </button>
            )}
            {onNavigateToDirectory && (
              <button
                onClick={onNavigateToDirectory}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-2xs cursor-pointer"
              >
                Yellow Pages Directory
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
