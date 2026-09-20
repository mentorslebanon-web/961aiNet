import React from "react";
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  Compass,
  CheckCircle2,
  ArrowRight,
  Globe,
  Sparkles,
  Users,
  GraduationCap,
  TrendingUp,
  Landmark,
  FlaskConical,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  FileCheck2,
  Layers,
  HelpCircle
} from "lucide-react";

interface ModuleOmsarProjectsProps {
  onNavigateToHome?: () => void;
  onNavigateToMita?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToSandbox?: () => void;
}

export const ModuleOmsarProjects: React.FC<ModuleOmsarProjectsProps> = ({
  onNavigateToHome,
  onNavigateToMita,
  onNavigateToDirectory,
  onNavigateToSandbox
}) => {
  const phases = [
    {
      number: "01",
      phase: "Phase 1",
      title: "Stakeholder Aspirations for Public Sector Reform",
      desc: "Capturing the lived realities, institutional bottlenecks, and reform aspirations across civil society, public servants, and citizens to define target governance outcomes."
    },
    {
      number: "02",
      phase: "Phase 2",
      title: "Public Sector Architecture and Operating Model Design",
      desc: "Architecting a future-ready, interoperable organizational blueprint, delineating modern digital workflows, streamlined departmental hierarchies, and transparent data conduits."
    },
    {
      number: "03",
      phase: "Phase 3",
      title: "Administrative Reform Implementation Roadmap",
      desc: "Executing phased institutional rollouts, legislative alignment, capacity-building benchmarks, and measurable KPIs for continuous public-sector performance accountability."
    }
  ];

  const interventions = [
    {
      title: "Foster Citizen Cooperation",
      desc: "Cultivate positive citizen behavior and active cooperation toward accessible, dignified government services through empathetic, friction-free UX."
    },
    {
      title: "Mitigate Corruption Risks",
      desc: "Curb administrative malpractices, opaque discretion, and transactional friction through automated digital auditing and radical transparency."
    },
    {
      title: "Strengthen Legal Adherence",
      desc: "Reinforce public compliance and strict institutional fidelity to laws, circulars, and administrative standards across all ministries."
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
        <span className="text-slate-800 font-bold">Public Sector Modernization</span>
        <span>/</span>
        <span className="text-emerald-700 font-bold">OMSAR Projects (omsar.gov.lb)</span>
      </div>

      {/* Hero Header Section */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#0A1A24] to-slate-900 border-2 border-blue-500/30 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold border border-blue-500/40 tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
              <Landmark className="w-3.5 h-3.5 text-blue-400" />
              <span>Office of the Minister of State for Administrative Reform</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700 flex items-center gap-1.5">
              <span>Republic of Lebanon</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 font-bold">OMSAR 2026</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Reinventing Government 2030: <br className="hidden sm:inline" />
            <span className="text-blue-400">Digital Transformation, Behavioral Innovation &amp; Administrative Integrity</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            At a pivotal juncture for our nation, <strong className="text-white font-semibold">OMSAR</strong> is spearheading a comprehensive paradigm shift in public administration through forward-looking modernization, digital innovation, and institutional integrity.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://www.omsar.gov.lb/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-mono font-bold text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-slate-950" />
              <span>Visit Official OMSAR Portal (omsar.gov.lb)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {onNavigateToMita && (
              <button
                onClick={onNavigateToMita}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View MITA National AI Strategy</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Program 1: Reinventing Government 2030 */}
      <section className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-7 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider block">
                Flagship Governance Program
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Reinventing Government 2030
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-mono font-bold border border-blue-300">
            Transparency • Accountability • Trust
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          The <strong className="text-slate-950">“Reinventing Government 2030”</strong> program represents a transformational journey to reshape Lebanon’s public administration, enhance its effectiveness, and restore citizen trust. Designed to rebuild public confidence that has been deeply eroded over time, the program articulates a modern governance model rooted in transparency, efficiency, inclusiveness, and strict accountability.
        </p>

        {/* 3 Strategic Phases */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            Our Structured Roadmap Advances Through Three Strategic Phases:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phases.map((p) => (
              <div
                key={p.number}
                className="p-5 rounded-xl bg-[#F8FAFC] border border-blue-200 hover:border-blue-500 transition-all space-y-2.5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-mono font-bold text-xs">
                    {p.phase}
                  </span>
                  <span className="text-xl font-mono font-black text-blue-900/40">
                    {p.number}
                  </span>
                </div>
                <h3 className="font-black text-sm text-slate-900 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program 2: BIND-Leb (Behavioral Innovation and Digital Transformation Lab) */}
      <section className="rounded-2xl bg-gradient-to-br from-[#F4F9F4] via-white to-[#F0F7F0] border-2 border-[#B0CFAD] p-7 sm:p-9 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                Pioneering Innovation Sandbox
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Lebanon Behavioral Innovation and Digital Transformation Lab (BIND-Leb)
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold">
            Hosted by OMSAR
          </span>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Lebanon’s <strong className="text-slate-950">Behavioral Innovation and Digital Transformation Lab (BIND-Leb)</strong> is a pioneering government platform dedicated to helping public institutions design, deliver, and evaluate superior public services. By marrying behavioral insights, modern innovation methodologies, and advanced digital tools, BIND-Leb empowers institutions to deeply understand citizens' needs, optimize user experiences, and bolster public-sector innovation capacity.
          </p>

          <p className="p-4 rounded-xl bg-white border border-[#D7E7D6] text-slate-800 font-medium">
            Centered directly on citizens' service challenges, friction points, administrative barriers, and trust gaps, the Lab utilizes design thinking, creative engagement, and data-driven experimentation to prototype and test solutions before scaling them government-wide.
          </p>
        </div>

        {/* Why BIND-Leb & Interventions */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-950">
              Why a Behavioral Innovation and Digital Transformation Lab?
            </h3>
            <p className="text-xs text-slate-600">
              As Lebanon's public sector transitions toward transparent, accountable, and citizen-centric governance—anchored by digital public services, interoperable architectures, and evidence-based policymaking—the Lab offers a vital, modern sandbox. Here, we co-create directly with citizens, pilot targeted reforms, and refine structural solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {interventions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border-2 border-[#D7E7D6] hover:border-emerald-600 transition-all space-y-2 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="font-bold text-xs text-slate-900">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program 3: The Talents of Lebanon */}
      <section className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-7 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block">
                Human Capital &amp; Knowledge Bridging
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                The Talents of Lebanon: Shaping the Government of Today
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold border border-amber-300">
            Uniting Brightest Minds
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Uniting Lebanon’s brightest minds to turn knowledge into public-sector impact. True transformation requires bridging public sector challenges with national excellence. Our talent framework bridges the gap between government demands and citizen expertise:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Dimension 1: Government Priorities */}
          <div className="p-6 rounded-2xl bg-[#FBFDFB] border-2 border-[#D7E7D6] space-y-3.5 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold flex items-center justify-center text-xs">
                1
              </div>
              <h3 className="font-bold text-slate-950 text-base">
                Government Priorities
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>The public sector identifies workforce gaps, operational bottlenecks, and critical staffing priorities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Government entities actively seek to recruit, retain, and harness specialized talent to drive strategic execution.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>This dimension embodies a future-oriented, strategic, and bold vision for state administration.</span>
              </li>
            </ul>
          </div>

          {/* Dimension 2: Universities, Faculties & Graduates */}
          <div className="p-6 rounded-2xl bg-[#FBFDFB] border-2 border-[#D7E7D6] space-y-3.5 hover:border-amber-500 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-mono font-bold flex items-center justify-center text-xs">
                2
              </div>
              <h3 className="font-bold text-slate-950 text-base">
                Universities, Faculties &amp; Graduates
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Academic institutions and top-tier graduates represent the nation's premier supply of intellectual capital.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Universities, educational programs, think tanks, and NGOs collaborate to build a more educated, field-prepared country.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Through close academic partnerships, the active engagement and empowerment of Lebanon’s youth become a tangible reality.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Official Contact & Attribution Card */}
      <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border-2 border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block">
              Official Administration Channels
            </span>
            <h3 className="text-lg font-bold text-white">
              Contact OMSAR
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Office Of The Minister Of State For Administrative Reform 2026 ©
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Address</div>
              <div>STARCO, Block A, 5th floor, Beirut - Lebanon</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Email</div>
              <a href="mailto:info@omsar.gov.lb" className="hover:text-emerald-300 underline">
                info@omsar.gov.lb
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Telephone</div>
              <a href="tel:+9611371510" className="hover:text-amber-300">
                +961 1 371 510
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
          <div>
            <span>Official Portal: </span>
            <a
              href="https://www.omsar.gov.lb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              https://www.omsar.gov.lb/
            </a>
            <span className="mx-2">•</span>
            <span>Designed &amp; Developed By IDS</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToSandbox && (
              <button
                onClick={onNavigateToSandbox}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold transition-all cursor-pointer"
              >
                Regulatory Sandbox
              </button>
            )}
            {onNavigateToDirectory && (
              <button
                onClick={onNavigateToDirectory}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all cursor-pointer"
              >
                Yellow Pages Directory
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
