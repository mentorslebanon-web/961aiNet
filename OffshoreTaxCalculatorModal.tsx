import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  DollarSign, 
  ExternalLink, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award,
  Filter,
  Send,
  UserCheck,
  ChevronRight,
  GraduationCap
} from "lucide-react";

export interface EcosystemJob {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  companySlug?: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Remote (Lebanon)" | "Advisory / Fellowship";
  category: "LLM & NLP" | "Computer Vision" | "MLOps & Infra" | "Full-Stack AI" | "AI Product & Growth";
  salaryRangeUsd: string;
  postedAt: string;
  experienceLevel: "Junior / Fresh Grad" | "Mid-Level (2-4 yrs)" | "Senior / Lead (5+ yrs)" | "Research Fellow";
  universityPartner?: string;
  description: string;
  requirements: string[];
  techStack: string[];
  applyEmailOrUrl: string;
}

export interface GrantDeadline {
  id: string;
  name: string;
  provider: string;
  grantSize: string;
  deadline: string;
  daysRemaining: number;
  stageEligibility: "Ideation / Student" | "Pre-Seed / Prototype" | "Early Growth / Seed" | "Academic R&D";
  focus: string;
  lebanonEligible: boolean;
  status: "Open" | "Closing Soon" | "Rolling";
  applyUrl: string;
}

export const INITIAL_ECOSYSTEM_JOBS: EcosystemJob[] = [
  {
    id: "job_1",
    title: "Arabic Foundation Model Research Engineer",
    companyName: "CedarsLLM Core Lab",
    location: "Beirut Onshore (Downtown R&D Lab) / Hybrid",
    type: "Full-Time",
    category: "LLM & NLP",
    salaryRangeUsd: "$4,500 - $7,000 / mo (Fresh USD)",
    postedAt: "2026-08-25",
    experienceLevel: "Senior / Lead (5+ yrs)",
    universityPartner: "AUB / LAU Computer Science Alumni Preferred",
    description: "Lead pre-training and DPO alignment pipelines for 14B & 70B Arabic dialect mixture-of-experts models on dedicated Lebanese GPU clusters.",
    requirements: [
      "Deep experience with PyTorch, Megatron-LM, FlashAttention-3",
      "Proven track record training Arabic NLP tokenizers & dialectal benchmark datasets",
      "M.Sc. or Ph.D. in Computer Science, Machine Learning, or related field"
    ],
    techStack: ["PyTorch", "vLLM", "CUDA", "Triton", "HuggingFace"],
    applyEmailOrUrl: "mailto:careers@cedarsllm.ai"
  },
  {
    id: "job_2",
    title: "Computer Vision & Edge Inference Specialist",
    companyName: "Phoenicia Vision Systems",
    location: "Tripoli Technopark / Remote",
    type: "Full-Time",
    category: "Computer Vision",
    salaryRangeUsd: "$3,200 - $5,000 / mo (Fresh USD)",
    postedAt: "2026-08-24",
    experienceLevel: "Mid-Level (2-4 yrs)",
    universityPartner: "Balamand / USJ Alumni Preferred",
    description: "Design low-power YOLOv11 and TensorRT edge perception algorithms for autonomous solar drone inspections across MENA arid environments.",
    requirements: [
      "2+ years deploying computer vision models to NVIDIA Jetson & Raspberry Pi edge units",
      "Strong proficiency in C++, Python, OpenCV, and TensorRT quantization",
      "Experience with synthetic data generation and active learning"
    ],
    techStack: ["TensorRT", "C++", "Python", "OpenCV", "Jetson Orin"],
    applyEmailOrUrl: "mailto:jobs@phoeniciavision.com"
  },
  {
    id: "job_3",
    title: "Full-Stack AI Application Architect",
    companyName: "MedLevant Diagnostics AI",
    location: "Beirut (Badaro Tech Cluster)",
    type: "Full-Time",
    category: "Full-Stack AI",
    salaryRangeUsd: "$3,500 - $5,500 / mo + Equity",
    postedAt: "2026-08-22",
    experienceLevel: "Mid-Level (2-4 yrs)",
    description: "Build clinical-grade diagnostic web platforms integrating radiology PACS feeds with HIPAA/GDPR compliant inference microservices.",
    requirements: [
      "Expertise in TypeScript, React, Next.js, FastAPI, and PostgreSQL with pgvector",
      "Understanding of medical DICOM formats and encrypted edge telemetry",
      "Passion for building life-saving healthcare infrastructure in the Levant"
    ],
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Docker"],
    applyEmailOrUrl: "mailto:talent@medlevant.ai"
  },
  {
    id: "job_4",
    title: "Junior MLOps & Autonomous Agent Engineer",
    companyName: "CedarMind Technologies",
    location: "Beirut Onshore / Remote Lebanon",
    type: "Full-Time",
    category: "MLOps & Infra",
    salaryRangeUsd: "$2,200 - $3,200 / mo (Fresh USD)",
    postedAt: "2026-08-20",
    experienceLevel: "Junior / Fresh Grad",
    universityPartner: "Open to 2025/2026 Lebanese University & AUB/LAU Graduates",
    description: "Maintain CI/CD continuous evaluation pipelines for autonomous procurement agents deployed across GCC enterprise supply chains.",
    requirements: [
      "Solid understanding of Kubernetes, Docker, LangGraph, and automated model testing",
      "Strong problem-solving fundamentals and clean Python coding practices",
      "Eager to learn high-throughput LLM routing and prompt caching architectures"
    ],
    techStack: ["Kubernetes", "Docker", "LangGraph", "FastAPI", "Redis"],
    applyEmailOrUrl: "mailto:apply@cedarmind.ai"
  }
];

export const INITIAL_GRANT_DEADLINES: GrantDeadline[] = [
  {
    id: "grant_1",
    name: "Berytech ACT Smart Innovation Grant",
    provider: "Berytech / Kingdom of the Netherlands",
    grantSize: "$25,000 - $60,000 Equity-Free",
    deadline: "2026-09-15",
    daysRemaining: 19,
    stageEligibility: "Pre-Seed / Prototype",
    focus: "AgriTech, CleanTech & Environmental AI Startups in Lebanon",
    lebanonEligible: true,
    status: "Closing Soon",
    applyUrl: "https://berytech.org"
  },
  {
    id: "grant_2",
    name: "USAID TIF Tech Export Matching Facility",
    provider: "USAID Trade & Investment Facilitation",
    grantSize: "$50,000 - $150,000 Co-Financing",
    deadline: "2026-10-01",
    daysRemaining: 35,
    stageEligibility: "Early Growth / Seed",
    focus: "Lebanese AI & Software Exporters Scaling to GCC & US Markets",
    lebanonEligible: true,
    status: "Open",
    applyUrl: "https://tif-lebanon.com"
  },
  {
    id: "grant_3",
    name: "EU Horizon Europe DeepTech Levant Sandbox",
    provider: "European Innovation Council",
    grantSize: "€100,000 - €250,000 Research Grant",
    deadline: "2026-10-30",
    daysRemaining: 64,
    stageEligibility: "Academic R&D",
    focus: "AUB, LAU, USJ, LU Joint AI Research Partnerships with European Labs",
    lebanonEligible: true,
    status: "Open",
    applyUrl: "https://eic.ec.europa.eu"
  },
  {
    id: "grant_4",
    name: "QSTP MENA AI Catalyst Fund",
    provider: "Qatar Science & Technology Park",
    grantSize: "$100,000 Non-Dilutive + Compute Credits",
    deadline: "2026-11-15",
    daysRemaining: 80,
    stageEligibility: "Early Growth / Seed",
    focus: "Arabic Language AI, Medical Diagnostics & Renewable Grid AI",
    lebanonEligible: true,
    status: "Open",
    applyUrl: "https://qstp.org.qa"
  }
];

export const EcosystemTalentAndGrantsTab: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<"jobs" | "grants">("jobs");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedExp, setSelectedExp] = useState<string>("all");
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);

  const filteredJobs = INITIAL_ECOSYSTEM_JOBS.filter((job) => {
    const matchCat = selectedCategory === "all" || job.category === selectedCategory;
    const matchExp = selectedExp === "all" || job.experienceLevel === selectedExp;
    return matchCat && matchExp;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-mono">
      {/* View Switcher Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-[#D7E7D6]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubView("jobs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSubView === "jobs"
                ? "bg-[#4D7D4B] text-white shadow-xs"
                : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Lebanese AI Talent & Job Board ({INITIAL_ECOSYSTEM_JOBS.length})</span>
          </button>

          <button
            onClick={() => setActiveSubView("grants")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSubView === "grants"
                ? "bg-[#4D7D4B] text-white shadow-xs"
                : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Open Non-Dilutive Grants Tracker ({INITIAL_GRANT_DEADLINES.length})</span>
          </button>
        </div>

        <div className="text-xs text-[#2E5A2C] font-bold flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#4D7D4B] animate-pulse"></span>
          <span>Fresh USD Salaries • Verified Institutional Grants</span>
        </div>
      </div>

      {/* JOBS VIEW */}
      {activeSubView === "jobs" && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#F6FAF5] rounded-xl border border-[#D7E7D6] text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#4D7D4B]" />
                <span>Filter Role:</span>
              </span>
              {["all", "LLM & NLP", "Computer Vision", "MLOps & Infra", "Full-Stack AI"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                    selectedCategory === c
                      ? "bg-[#4D7D4B] text-white shadow-2xs"
                      : "bg-white text-slate-700 hover:bg-[#EBF3EA] border border-[#D7E7D6]"
                  }`}
                >
                  {c === "all" ? "All Engineering" : c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-600 font-medium">Experience:</span>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="bg-white border border-[#D7E7D6] rounded-lg px-2.5 py-1 text-[11px] font-bold text-slate-800"
              >
                <option value="all">All Experience Levels</option>
                <option value="Junior / Fresh Grad">Junior / Fresh Grad</option>
                <option value="Mid-Level (2-4 yrs)">Mid-Level (2-4 yrs)</option>
                <option value="Senior / Lead (5+ yrs)">Senior / Lead (5+ yrs)</option>
              </select>
            </div>
          </div>

          {/* Jobs List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-white border-2 border-[#D7E7D6] hover:border-[#75AC73] shadow-xs flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                          {job.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-[#000000] mt-1.5 leading-snug">
                        {job.title}
                      </h3>
                      <div className="text-xs font-bold text-[#2E5A2C] flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{job.companyName}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-black text-[#2E5A2C] bg-[#EBF3EA] px-2.5 py-1 rounded-lg border border-[#B0CFAD]">
                        {job.salaryRangeUsd}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#000000] font-medium leading-relaxed font-sans">
                    {job.description}
                  </p>

                  {job.universityPartner && (
                    <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 bg-[#F6FAF5] p-2 rounded-lg border border-[#D7E7D6]">
                      <GraduationCap className="w-3.5 h-3.5 text-[#4D7D4B] shrink-0" />
                      <span>{job.universityPartner}</span>
                    </div>
                  )}

                  {/* Requirements List */}
                  <div className="space-y-1 text-xs text-slate-700 font-sans">
                    {job.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#4D7D4B] font-bold">✓</span>
                        <span className="text-[11px] leading-tight">{req}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#EBF3EA] flex items-center justify-between gap-3 text-xs">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Posted {job.postedAt}</span>
                  </span>

                  <a
                    href={job.applyEmailOrUrl}
                    onClick={() => setAppliedJobId(job.id)}
                    className="px-4 py-1.5 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Direct Apply</span>
                    <Send className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GRANTS TRACKER VIEW */}
      {activeSubView === "grants" && (
        <div className="space-y-4">
          <div className="p-4 bg-[#EBF3EA] border border-[#B0CFAD] rounded-xl text-xs text-[#2E5A2C] font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <strong className="font-mono font-black text-sm">Non-Dilutive Lebanese & MENA Grants Ledger</strong>
              <p>Direct equity-free grants, compute vouchers, and matching export facilities open for Lebanese entities.</p>
            </div>
            <span className="px-3 py-1 bg-white text-[#2E5A2C] border border-[#75AC73] rounded-lg font-bold text-xs font-mono shrink-0">
              100% Equity-Free
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INITIAL_GRANT_DEADLINES.map((grant) => (
              <div
                key={grant.id}
                className="p-5 rounded-2xl bg-white border-2 border-[#D7E7D6] hover:border-[#75AC73] shadow-xs flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                        {grant.stageEligibility}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-[#000000] leading-snug">
                        {grant.name}
                      </h3>
                      <div className="text-xs font-bold text-slate-700">
                        Provider: {grant.provider}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-black text-[#2E5A2C] bg-[#EBF3EA] px-2.5 py-1 rounded-lg border border-[#B0CFAD]">
                        {grant.grantSize}
                      </div>
                      <div className="text-[10px] text-rose-700 font-bold mt-1">
                        {grant.daysRemaining} days left
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#000000] font-medium leading-relaxed font-sans">
                    <strong>Focus:</strong> {grant.focus}
                  </p>

                  <div className="p-2.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl flex items-center justify-between text-xs text-slate-700">
                    <span>Deadline Date: <strong className="text-slate-900">{grant.deadline}</strong></span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                      Lebanon Entity Eligible
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EBF3EA] flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Official Portal Verified
                  </span>
                  <a
                    href={grant.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-[#4D7D4B] hover:bg-[#3D633C] text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>View RFP & Guidelines</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
