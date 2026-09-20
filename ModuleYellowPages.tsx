import React, { useState, useEffect } from "react";
import {
  Sparkles,
  UploadCloud,
  FileText,
  Code2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Award,
  Layers,
  BarChart3,
  Cpu,
  Coins,
  Building,
  RefreshCw,
  Copy,
  Check,
  Download,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sliders,
  DollarSign,
  Users,
  Search,
  Globe,
  Radio,
  Share2,
  Lock,
  Play,
  FileCode,
  FolderGit2,
  Sparkle
} from "lucide-react";
import {
  UserAuthSession,
  PitchRoomSubmission,
  PitchRoomAnalysisReport
} from "../../types";
import { PitchRoomRadarChart } from "./PitchRoomRadarChart";

interface ModulePitchRoomProps {
  user: UserAuthSession | null;
  onNavigateToMatchmaking?: () => void;
  onNavigateToSandbox?: () => void;
  onNavigateToYellowPages?: () => void;
  onNavigateToMarketplace?: () => void;
  onOpenPricing?: () => void;
  onOpenAuth?: (mode?: "signin" | "signup", reason?: string) => void;
  deductCredits?: (amount: number, reason: string) => boolean;
  credits?: number;
}

// Pre-loaded synthetic startup templates
const SYNTHETIC_SAMPLE_STARTUPS: Array<{
  submission: PitchRoomSubmission;
  report: PitchRoomAnalysisReport;
  repoFilesSample: Array<{ path: string; size: string; status: "clean" | "warning" | "optimized" }>;
}> = [
  {
    submission: {
      id: "pitch_cedars_ai",
      startupName: "CedarsLLM Technologies",
      founderName: "Dr. Tarek Khoury & Noor Zeinoun",
      founderEmail: "founders@cedarsllm.ai",
      tagline: "Sovereign Levantine Arabic Foundation Models & Ultra Low-Latency Dialect Tokenizers",
      stage: "Seed",
      targetRaise: "$850,000 USD",
      valuationPreMoney: "$3,200,000 USD",
      sector: "Levantine NLP",
      deckFileName: "CedarsLLM_Seed_Deck_v3.pdf",
      deckContentSummary:
        "CedarsLLM has trained a proprietary 8B parameter Levantine Arabic foundation model fine-tuned on 140M Lebanese/Syrian/Jordanian social & clinical dialogue tokens. 4 enterprise pilots signed in Beirut & Dubai. Seeking $850k under Law 126/2019 Offshore S.A.L. framework for GPU cluster provisioning and MENA enterprise sales expansion.",
      githubRepoUrl: "https://github.com/cedarsllm-ai/levantine-bpe-tokenizer-engine",
      repoArchitectureJson: JSON.stringify(
        {
          architecture: "Transformer Decoder (8B Dense / LoRA Fine-Tuned)",
          tokenizer: "Custom Byte-Pair Encoding (32,000 Levantine vocabulary)",
          serving_stack: "vLLM + TensorRT-LLM + FastAPI Dockerized on H100s",
          latency_benchmark_ms: 18.4,
          test_coverage_pct: 91.2,
          data_sovereignty: "100% On-Premise Lebanese Banking Certified"
        },
        null,
        2
      ),
      submittedAt: Date.now() - 86400000 * 2
    },
    repoFilesSample: [
      { path: "src/tokenizers/levantine_bpe.py", size: "14.2 KB", status: "optimized" },
      { path: "src/inference/vllm_engine_worker.py", size: "28.6 KB", status: "optimized" },
      { path: "benchmarks/latency_vs_arabic_gpt4.py", size: "8.1 KB", status: "clean" },
      { path: "docker/Dockerfile.cuda12_h100", size: "3.4 KB", status: "clean" },
      { path: "security/data_sovereignty_masking.py", size: "11.8 KB", status: "optimized" }
    ],
    report: {
      id: "report_cedars_ai",
      submissionId: "pitch_cedars_ai",
      overallScore: 92,
      tier: "Tier 1: Institutional Investment Ready",
      analyzedAt: "August 2026",
      summaryExecutiveMemo:
        "CedarsLLM represents a stellar sovereign AI opportunity in the Levant. Strong proprietary dialect tokenizer moat with 3.2x faster inference latency and 45% lower token cost compared to GPT-4o on Arabic dialect prompts. The Law 126/2019 offshore holding structure provides complete tax shielding for overseas software contracts. Code repository demonstrates exceptional MLOps maturity with 91.2% test coverage and containerized H100 inference pipelines.",
      subScores: {
        techFeasibility: 95,
        ipDefensibility: 92,
        marketOpportunity: 88,
        diasporaSynergy: 97,
        unitEconomics: 86,
        legalSovereignty: 94
      },
      strengths: [
        "Proprietary 32k Levantine dialect vocabulary eliminates Arabic token inflation penalty.",
        "Demonstrated 18.4ms per-token latency utilizing vLLM and TensorRT-LLM kernels.",
        "Law 126/2019 Offshore S.A.L. registration ensures 0% corporate tax on foreign software revenues.",
        "Strong diaspora founder pedigree (Ex-Stanford AI Lab & AUB DeepTech alumni)."
      ],
      risksAndGaps: [
        "Heavy reliance on cloud GPU availability; recommend reserving 1-year H100 compute instances.",
        "Customer concentration: 70% of current pilot MRR originates from 2 regional commercial banks."
      ],
      valuationBenchmark: {
        recommendedCap: "$3.5M - $4.2M Post-Money Cap",
        safeInstrument: "Y Combinator Standard Post-Money SAFE (with MFN clause)",
        comparablesMena: "MENA Seed AI valuations averaging $3.0M - $4.5M for pre-revenue/early pilot deeptech.",
        comparablesDiaspora: "Silicon Valley Lebanese Diaspora syndicates actively co-invest at $15k-$50k SPV tickets."
      },
      spvSyndicateReadiness: {
        eligibleForDiasporaSPV: true,
        recommendedMinCheck: "$2,500 USD",
        targetSyndicateLead: "Cedar Tech Diaspora Syndicate (San Francisco & London)",
        communityInterestScore: 96
      },
      actionRoadmap: [
        {
          priority: "High",
          category: "Code",
          task: "Implement automated fallback routing between on-premise local inference and cloud cluster.",
          impact: "Guarantees 99.99% uptime for Beirut banking client SLAs."
        },
        {
          priority: "Medium",
          category: "Deck",
          task: "Highlight unit economics showing $0.0012 cost per 1k Arabic dialect tokens vs $0.005 on OpenAI.",
          impact: "Directly proves 4x gross margin advantage to institutional VCs."
        },
        {
          priority: "High",
          category: "Legal",
          task: "Finalize Ministry of Economy software copyright certificate for tokenizer code.",
          impact: "Protects proprietary weights from unauthorized regional replication."
        }
      ]
    }
  },
  {
    submission: {
      id: "pitch_phoenicia_vision",
      startupName: "Phoenicia AgriVision",
      founderName: "Karim Boustany",
      founderEmail: "karim@phoenicia-vision.com",
      tagline: "Autonomous Solar-Powered Edge Computer Vision for Bekaa Valley Precision Irrigation",
      stage: "Pre-Seed",
      targetRaise: "$450,000 USD",
      valuationPreMoney: "$1,800,000 USD",
      sector: "AgriTech Vision",
      deckFileName: "Phoenicia_AgriVision_PreSeed.pdf",
      deckContentSummary:
        "Phoenicia AgriVision produces low-cost multispectral camera pods with on-device YOLOv8 inference powered by solar micro-panels. Deployed across 35 vineyards in Zahle and Bekaa, reducing water usage by 38% and detecting pest outbreaks 5 days early.",
      githubRepoUrl: "https://github.com/phoenicia-vision/edge-yolo-agri-drone",
      repoArchitectureJson: JSON.stringify(
        {
          architecture: "Edge YOLOv8 Nano quantized with TensorRT for Jetson Orin Nano",
          power_draw_watts: 4.8,
          camera_inputs: "RGB + Multispectral Near-Infrared (NIR)",
          offline_mesh_network: "LoRaWAN 868MHz protocol",
          test_coverage_pct: 82.5,
          field_tested_hours: 1200
        },
        null,
        2
      ),
      submittedAt: Date.now() - 86400000 * 5
    },
    repoFilesSample: [
      { path: "edge/models/quantized_yolo_tensorrt.cpp", size: "18.9 KB", status: "optimized" },
      { path: "firmware/lora_mesh_telemetry.c", size: "9.4 KB", status: "clean" },
      { path: "data/crop_disease_bekaa_dataset.json", size: "45.1 KB", status: "clean" },
      { path: "cloud/dashboard_fastapi_backend.py", size: "16.2 KB", status: "clean" }
    ],
    report: {
      id: "report_phoenicia_vision",
      submissionId: "pitch_phoenicia_vision",
      overallScore: 86,
      tier: "Tier 2: Strong Seed Contender",
      analyzedAt: "August 2026",
      summaryExecutiveMemo:
        "Phoenicia AgriVision displays high practical utility addressing critical water and power shortages in Lebanese agriculture. The hardware-software edge architecture operates completely offline using LoRaWAN mesh and solar micro-cells. Valuation ask is realistic ($1.8M pre-money). Strong candidate for USAID/EU agri-grants and diaspora angel co-investment syndicates.",
      subScores: {
        techFeasibility: 89,
        ipDefensibility: 84,
        marketOpportunity: 82,
        diasporaSynergy: 91,
        unitEconomics: 87,
        legalSovereignty: 83
      },
      strengths: [
        "Edge inferencing uses less than 5W power, solving Lebanese grid intermittency.",
        "Proprietary dataset of 50,000+ labeled Bekaa Valley crop pest and drought stress images.",
        "Proven 38% irrigation water savings validated across 35 active vineyard deployments."
      ],
      risksAndGaps: [
        "Hardware supply chain dependencies on imported Jetson chips; need buffer inventory.",
        "Hardware warranty and on-the-ground technician servicing capacity in rural Lebanon."
      ],
      valuationBenchmark: {
        recommendedCap: "$2.0M - $2.4M Post-Money Cap",
        safeInstrument: "Y Combinator SAFE + 15% Early Bird Discount for First $100k",
        comparablesMena: "MENA AgriTech seed rounds average $400k-$750k.",
        comparablesDiaspora: "Gulf and diaspora Lebanese investors in agriculture show high affinity for food security tech."
      },
      spvSyndicateReadiness: {
        eligibleForDiasporaSPV: true,
        recommendedMinCheck: "$1,000 USD",
        targetSyndicateLead: "Levant Sustainability & Agri-Tech Angel Syndicate",
        communityInterestScore: 89
      },
      actionRoadmap: [
        {
          priority: "High",
          category: "Go-To-Market",
          task: "Package subscription model into Hardware-as-a-Service ($49/month/hectare) to reduce upfront farmer resistance.",
          impact: "Accelerates adoption across smallholder farms in Zahle."
        },
        {
          priority: "Medium",
          category: "Code",
          task: "Port edge model to Raspberry Pi 5 Hailo-8 AI accelerator as low-cost Jetson alternative.",
          impact: "Reduces unit bill-of-materials from $280 to $140."
        }
      ]
    }
  },
  {
    submission: {
      id: "pitch_medlevant",
      startupName: "MedLevant AI",
      founderName: "Dr. Maya Salhab & Ziad Chehab",
      founderEmail: "maya@medlevant.ai",
      tagline: "Arabic Clinical Speech-to-Text & Automated Electronic Health Record Generation",
      stage: "Seed",
      targetRaise: "$1,200,000 USD",
      valuationPreMoney: "$4,500,000 USD",
      sector: "HealthTech AI",
      deckFileName: "MedLevant_Clinical_AI_SeriesSeed.pdf",
      deckContentSummary:
        "MedLevant AI listens to doctor-patient consultations in Arabic (Lebanese/Gulf dialects blended with medical English/French) and automatically synthesizes structured HL7/FHIR health records. Signed with 3 major Lebanese private hospitals.",
      githubRepoUrl: "https://github.com/medlevant-ai/clinical-speech-whisper-finetune",
      repoArchitectureJson: JSON.stringify(
        {
          model: "Whisper-Large-v3 fine-tuned on 800 hours of medical bilingual conversations",
          medical_entity_extractor: "Biomedical NER (ICD-10 / SNOMED-CT mapped)",
          ehr_integration: "FHIR / HL7 standard API connectors",
          hipaa_gdpr_compliance: "Encrypted at rest with zero-knowledge audio deletion",
          word_error_rate_pct: 4.2
        },
        null,
        2
      ),
      submittedAt: Date.now() - 86400000 * 1
    },
    repoFilesSample: [
      { path: "speech/whisper_medical_lora.py", size: "22.4 KB", status: "optimized" },
      { path: "nlp/icd10_multilingual_ner.py", size: "31.1 KB", status: "optimized" },
      { path: "fhir/bundle_generator.py", size: "14.8 KB", status: "clean" },
      { path: "security/zero_retention_sanitizer.py", size: "9.7 KB", status: "optimized" }
    ],
    report: {
      id: "report_medlevant",
      submissionId: "pitch_medlevant",
      overallScore: 94,
      tier: "Tier 1: Institutional Investment Ready",
      analyzedAt: "August 2026",
      summaryExecutiveMemo:
        "MedLevant solves a severe workflow bottleneck: Arab physicians spend 40% of their workday typing notes in fractured English/French/Arabic. Fine-tuned Whisper model exhibits a world-class 4.2% Word Error Rate on trilingual medical jargon. Scalable into the lucrative GCC healthcare market (UAE, KSA). Institutional-grade pitch and clean codebase.",
      subScores: {
        techFeasibility: 96,
        ipDefensibility: 94,
        marketOpportunity: 95,
        diasporaSynergy: 95,
        unitEconomics: 90,
        legalSovereignty: 90
      },
      strengths: [
        "4.2% Word Error Rate on complex trilingual (Arabic + French + English) medical conversations.",
        "Pre-integrated FHIR and HL7 export bridges directly into Epic, Cerner, and Lebanese hospital ERPs.",
        "Zero-audio-retention architecture passes strict international patient confidentiality standards."
      ],
      risksAndGaps: [
        "Hospital procurement cycles can be 6-9 months; requires healthy runway preservation.",
        "Requires local hosting nodes inside Saudi Arabia to comply with Saudi Health Information privacy laws."
      ],
      valuationBenchmark: {
        recommendedCap: "$4.5M - $5.5M Post-Money Cap",
        safeInstrument: "Y Combinator Standard Post-Money SAFE with Pro-Rata Rights",
        comparablesMena: "GCC HealthTech seed deals frequently secure $1M - $2M rounds at $6M-$9M valuations.",
        comparablesDiaspora: "Lebanese physician & tech diaspora in USA/UK are ideal angel syndicate backers."
      },
      spvSyndicateReadiness: {
        eligibleForDiasporaSPV: true,
        recommendedMinCheck: "$5,000 USD",
        targetSyndicateLead: "Diaspora Healthcare & DeepTech Syndicate (Boston & Paris)",
        communityInterestScore: 98
      },
      actionRoadmap: [
        {
          priority: "High",
          category: "Go-To-Market",
          task: "Partner with a certified Saudi cloud hosting provider (e.g. Oracle Jeddah) for KSA hospital expansions.",
          impact: "Unlocks $400k+ ARR enterprise pipeline in Riyadh."
        },
        {
          priority: "Medium",
          category: "Code",
          task: "Add local ambient microphone noise cancellation filters for noisy outpatient clinics.",
          impact: "Improves transcription accuracy from 95.8% to 98.5% in high-traffic ER rooms."
        }
      ]
    }
  }
];

export const ModulePitchRoom: React.FC<ModulePitchRoomProps> = ({
  user,
  onNavigateToMatchmaking,
  onNavigateToSandbox,
  onNavigateToYellowPages,
  onNavigateToMarketplace,
  onOpenPricing,
  onOpenAuth,
  deductCredits,
  credits = 1450
}) => {
  // Active view: "upload_or_select" | "analyzing" | "report"
  const [currentView, setCurrentView] = useState<"upload_or_select" | "analyzing" | "report">("upload_or_select");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [activeReportTab, setActiveReportTab] = useState<"radar" | "scorecard" | "diligence_memo" | "code_audit" | "syndicate_spv">("radar");

  // Custom upload state
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customStartupName, setCustomStartupName] = useState("");
  const [customTagline, setCustomTagline] = useState("");
  const [customSector, setCustomSector] = useState<PitchRoomSubmission["sector"]>("Levantine NLP");
  const [customStage, setCustomStage] = useState<PitchRoomSubmission["stage"]>("Seed");
  const [customTargetRaise, setCustomTargetRaise] = useState("$500,000 USD");
  const [customDeckSummary, setCustomDeckSummary] = useState("");
  const [customGithubUrl, setCustomGithubUrl] = useState("https://github.com/my-lebanese-ai-startup/core-engine");
  const [customUploadedFileName, setCustomUploadedFileName] = useState<string | null>(null);

  // Analysis simulation progress
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [currentReport, setCurrentReport] = useState<PitchRoomAnalysisReport>(SYNTHETIC_SAMPLE_STARTUPS[0].report);
  const [currentSubmission, setCurrentSubmission] = useState<PitchRoomSubmission>(SYNTHETIC_SAMPLE_STARTUPS[0].submission);
  const [copiedMemoToast, setCopiedMemoToast] = useState(false);

  // Handle template selection
  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    setIsCustomMode(false);
    setCurrentSubmission(SYNTHETIC_SAMPLE_STARTUPS[idx].submission);
    setCurrentReport(SYNTHETIC_SAMPLE_STARTUPS[idx].report);
  };

  // Start AI Diligence Analysis
  const handleStartAnalysis = () => {
    if (!user) {
      onOpenAuth?.("signup", "Run Automated AI Due Diligence & Code Moat Audit in Pitch Room");
      return;
    }
    if (deductCredits) {
      const success = deductCredits(25, "Pitch Room AI Diligence Audit");
      if (!success) {
        if (onOpenPricing) onOpenPricing();
        return;
      }
    }

    setCurrentView("analyzing");
    setAnalysisStep(0);
    setAnalysisLogs([]);

    const steps = [
      "Ingesting synthetic pitch deck presentation & financial metrics...",
      "Cloning & parsing GitHub repository structure (AST & dependencies)...",
      "Benchmarking GPU/MLOps inference latency against OpenAI / Anthropic...",
      "Evaluating sovereign Law 126/2019 offshore tax shielding & IP moat...",
      "Calculating Silicon Valley & MENA valuation benchmarks & SAFE caps...",
      "Structuring diaspora angel SPV syndicate allocation model...",
      "Synthesizing final Institutional Due Diligence Memo..."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnalysisStep(index + 1);
        setAnalysisLogs((prev) => [...prev, step]);
      }, (index + 1) * 700);
    });

    setTimeout(() => {
      if (isCustomMode) {
        // Generate tailored report for custom submission
        const customReportGenerated: PitchRoomAnalysisReport = {
          id: `report_custom_${Date.now()}`,
          submissionId: "custom_sub",
          overallScore: 89,
          tier: "Tier 1: Institutional Investment Ready",
          analyzedAt: "Live Scan (Just Now)",
          summaryExecutiveMemo: `${customStartupName || "Your Startup"} demonstrates strong technical foundations in ${customSector}. The pitch narrative effectively captures regional market demand, with an estimated 3.8x lower cost of engineering by leveraging Beirut technical talent. Recommend incorporating as a Law 126/2019 Offshore entity to ensure 0% tax on foreign revenue before formalizing SAFE notes.`,
          subScores: {
            techFeasibility: 91,
            ipDefensibility: 87,
            marketOpportunity: 89,
            diasporaSynergy: 94,
            unitEconomics: 85,
            legalSovereignty: 88
          },
          strengths: [
            `Strong domain positioning within the ${customSector} sector.`,
            `Clear cost advantage utilizing onshore Lebanese AI engineering talent.`,
            `High alignment with diaspora angel syndicate investment mandates.`
          ],
          risksAndGaps: [
            "Ensure code repository includes comprehensive test suites and automated CI/CD benchmarks.",
            "Clarify international currency remittance pathways to mitigate FX conversion friction."
          ],
          valuationBenchmark: {
            recommendedCap: `$2.8M - $3.8M Post-Money Cap`,
            safeInstrument: "Y Combinator Post-Money SAFE (Standard)",
            comparablesMena: `MENA seed rounds in ${customSector} typically range between $400k - $800k.`,
            comparablesDiaspora: "Lebanese diaspora angel syndicates in London, SF, and Dubai represent prime target leads."
          },
          spvSyndicateReadiness: {
            eligibleForDiasporaSPV: true,
            recommendedMinCheck: "$2,500 USD",
            targetSyndicateLead: "Cedar AI Diaspora Syndicate",
            communityInterestScore: 92
          },
          actionRoadmap: [
            {
              priority: "High",
              category: "Legal",
              task: "Structure offshore holding under Lebanese Law 126/2019 to secure 0% corporate tax.",
              impact: "Protects foreign investor returns from local withholding taxes."
            },
            {
              priority: "High",
              category: "Deck",
              task: "Add concrete slide detailing unit economics and customer acquisition payback period.",
              impact: "Addresses key institutional VC diligence requirements."
            },
            {
              priority: "Medium",
              category: "Code",
              task: "Integrate latency logging benchmarks in code repository.",
              impact: "Demonstrates production readiness to technical reviewers."
            }
          ]
        };

        const customSubmissionObj: PitchRoomSubmission = {
          id: `pitch_custom_${Date.now()}`,
          startupName: customStartupName || "Sovereign AI Venture",
          founderName: user?.name || "Lebanese AI Founder",
          founderEmail: user?.email || "founder@961ai.network",
          tagline: customTagline || "Autonomous DeepTech AI Platform",
          stage: customStage,
          targetRaise: customTargetRaise,
          valuationPreMoney: "$3,000,000 USD",
          sector: customSector,
          deckFileName: customUploadedFileName || "Pitch_Deck_Upload.pdf",
          deckContentSummary: customDeckSummary || "Synthetic pitch deck representation uploaded for AI audit.",
          githubRepoUrl: customGithubUrl,
          submittedAt: Date.now()
        };

        setCurrentSubmission(customSubmissionObj);
        setCurrentReport(customReportGenerated);
      } else {
        setCurrentReport(SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].report);
        setCurrentSubmission(SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission);
      }

      setCurrentView("report");
    }, 5400);
  };

  // Copy Due Diligence Memo to Clipboard
  const handleCopyMemo = () => {
    if (!user) {
      onOpenAuth?.("signup", "Copy and export structured investor diligence memo");
      return;
    }
    const memoText = `
=== 961 AI NETWORK PITCH ROOM: AI DUE DILIGENCE MEMO ===
Startup: ${currentSubmission.startupName}
Overall Readiness Score: ${currentReport.overallScore}/100 (${currentReport.tier})
Sector: ${currentSubmission.sector} | Stage: ${currentSubmission.stage}
Target Raise: ${currentSubmission.targetRaise}

EXECUTIVE SUMMARY:
${currentReport.summaryExecutiveMemo}

SUB-SCORES:
- Technical Feasibility: ${currentReport.subScores.techFeasibility}/100
- Algorithmic IP Moat: ${currentReport.subScores.ipDefensibility}/100
- Market Opportunity: ${currentReport.subScores.marketOpportunity}/100
- Diaspora Syndicate Synergy: ${currentReport.subScores.diasporaSynergy}/100
- Financial Unit Economics: ${currentReport.subScores.unitEconomics}/100
- Sovereign Legal Structuring: ${currentReport.subScores.legalSovereignty}/100

VALUATION BENCHMARK:
- Recommended Post-Money Cap: ${currentReport.valuationBenchmark.recommendedCap}
- Recommended Instrument: ${currentReport.valuationBenchmark.safeInstrument}

DIASPORA ANGEL SPV STATUS:
- SPV Eligible: ${currentReport.spvSyndicateReadiness.eligibleForDiasporaSPV ? "YES" : "NO"}
- Min Ticket Check: ${currentReport.spvSyndicateReadiness.recommendedMinCheck}
- Syndicate Lead: ${currentReport.spvSyndicateReadiness.targetSyndicateLead}

KEY STRENGTHS:
${currentReport.strengths.map((s) => `• ${s}`).join("\n")}

RED FLAGS & GAPS TO ADDRESS:
${currentReport.risksAndGaps.map((r) => `• ${r}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(memoText);
    setCopiedMemoToast(true);
    setTimeout(() => setCopiedMemoToast(false), 3000);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Top Banner Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-2 border-emerald-500/30 p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>ECOSYSTEM CAPITAL & PITCH ACCELERATION</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Instant AI Due Diligence
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
              Diaspora SPVs ($1k–$5k)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Automated AI Due Diligence & Pitch Room
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Upload synthetic representations of your pitch deck and GitHub code repository. Our sovereign AI evaluation engine parses tech feasibility, algorithmic IP moat, valuation benchmarks, and Law 126/2019 tax structuring to generate an institutional-grade Readiness Score and Diaspora Angel Syndicate Deal Memo.
          </p>

          {/* Quick Metrics Pillar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Audit Speed</div>
              <div className="text-sm font-black text-emerald-400 font-mono">~5.4 Seconds</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Audit Dimensions</div>
              <div className="text-sm font-black text-teal-300 font-mono">6 Core Pillars</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Valuation Comps</div>
              <div className="text-sm font-black text-amber-300 font-mono">MENA & Silicon Valley</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Syndicate Tickets</div>
              <div className="text-sm font-black text-indigo-300 font-mono">$1k – $5k SPVs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Preview Mode Banner */}
      {!user && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 p-4 sm:p-5 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Visitor Preview Mode</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    FREE SIGN-UP REQUIRED
                  </span>
                </div>
                <p className="text-slate-300 text-xs font-sans mt-0.5">
                  You are previewing pre-loaded startup profiles and audit rubrics. <strong>Sign up free</strong> with your name and email to run automated AI due diligence audits, export diligence memos, and join the 961AI Community Mailing List.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenAuth?.("signup", "Run Automated Pitch Room AI Due Diligence & Code Audits")}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-mono"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sign Up Free to Access</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 1: UPLOAD OR SELECT SYNTHETIC STARTUP PROFILE */}
      {currentView === "upload_or_select" && (
        <div className="space-y-6">
          {/* Sub-tab switcher: Pre-loaded verified startups vs Custom upload */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCustomMode(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  !isCustomMode
                    ? "bg-[#2E5A2C] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Building className="w-4 h-4" />
                <span>1. Select Pre-Loaded Synthetic AI Startup ({SYNTHETIC_SAMPLE_STARTUPS.length})</span>
              </button>

              <button
                onClick={() => setIsCustomMode(true)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isCustomMode
                    ? "bg-[#2E5A2C] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>2. Upload Custom Deck & Code Repository</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
              <span>Cost: <strong className="text-emerald-700 font-bold">25 Credits</strong></span>
              <span>•</span>
              <span>Your Balance: <strong className="text-slate-900 font-bold">{credits} Credits</strong></span>
            </div>
          </div>

          {/* MODE A: PRE-LOADED SYNTHETIC STARTUPS */}
          {!isCustomMode && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-slate-600 font-sans">
                Select one of the pre-loaded synthetic Lebanese AI startup representations below to preview the full pitch deck telemetry, code architecture, and automated scoring memo:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SYNTHETIC_SAMPLE_STARTUPS.map((item, idx) => {
                  const isSelected = selectedTemplateIndex === idx;
                  return (
                    <div
                      key={item.submission.id}
                      onClick={() => handleSelectTemplate(idx)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 relative ${
                        isSelected
                          ? "bg-[#F6FAF5] border-[#2E5A2C] shadow-md ring-2 ring-[#2E5A2C]/20"
                          : "bg-white border-slate-200 hover:border-emerald-300 shadow-2xs"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#2E5A2C] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                          {item.submission.sector}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                          {item.submission.stage}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">{item.submission.startupName}</h3>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-sans">
                          {item.submission.tagline}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80 text-xs space-y-1">
                        <div className="flex justify-between text-slate-600">
                          <span>Target Ask:</span>
                          <strong className="text-slate-900 font-mono">{item.submission.targetRaise}</strong>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Deck File:</span>
                          <span className="text-emerald-800 truncate max-w-[140px] font-mono text-[11px]">
                            {item.submission.deckFileName}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Benchmark Score:</span>
                          <strong className="text-emerald-700 font-mono">{item.report.overallScore}/100</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Profile Detail Preview Box */}
              <div className="rounded-2xl bg-white border-2 border-[#B0CFAD] p-6 space-y-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Selected Startup Submission</span>
                    <h3 className="text-xl font-black text-slate-900">
                      {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.startupName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-sans">
                      {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.tagline}
                    </p>
                  </div>

                  <button
                    onClick={handleStartAnalysis}
                    className="px-6 py-3 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
                    <span>Run Automated AI Due Diligence Audit</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Synthetic Pitch Deck Summary */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <span>Synthetic Pitch Deck Representation</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>File: {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.deckFileName}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          12 Slides Parsed
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-sans text-xs">
                        {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.deckContentSummary}
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                        <div className="p-2 rounded bg-white border border-slate-200">
                          <span className="text-slate-400 block text-[10px]">Target Valuation</span>
                          <strong className="text-slate-900">
                            {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.valuationPreMoney}
                          </strong>
                        </div>
                        <div className="p-2 rounded bg-white border border-slate-200">
                          <span className="text-slate-400 block text-[10px]">Founder Contact</span>
                          <strong className="text-slate-900 truncate block">
                            {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.founderEmail}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Synthetic Code Repo & Architecture */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">
                      <FolderGit2 className="w-4 h-4 text-indigo-700" />
                      <span>Synthetic Codebase Architecture (GitHub AST)</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs space-y-2 shadow-inner border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
                        <span className="truncate max-w-[200px]">
                          {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.githubRepoUrl}
                        </span>
                        <span className="text-emerald-400">● 5 Files Audited</span>
                      </div>

                      <div className="space-y-1 text-[11px] max-h-36 overflow-y-auto">
                        {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].repoFilesSample.map((file, fIdx) => (
                          <div key={fIdx} className="flex items-center justify-between text-slate-300">
                            <span className="truncate pr-2">{file.path}</span>
                            <span className="text-slate-500 font-mono text-[10px]">{file.size}</span>
                          </div>
                        ))}
                      </div>

                      <pre className="text-[10px] text-teal-300 bg-slate-900/90 p-2 rounded border border-slate-800 overflow-x-auto">
                        {SYNTHETIC_SAMPLE_STARTUPS[selectedTemplateIndex].submission.repoArchitectureJson}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE B: CUSTOM UPLOAD FORM */}
          {isCustomMode && (
            <div className="rounded-2xl bg-white border-2 border-[#B0CFAD] p-6 md:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
              <div className="border-b border-[#D7E7D6] pb-4">
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Custom Due Diligence Ingestion</span>
                <h3 className="text-lg font-black text-slate-900">
                  Upload Your Pitch Deck & Repository Coordinates
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-sans">
                  Provide your startup details or upload synthetic representations to generate your tailored Investor Readiness Score and Diaspora Syndicate Memo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Left Column: Startup & Deck Info */}
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Startup Venture Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. BeirutNLP, PhoeniciaVision..."
                      value={customStartupName}
                      onChange={(e) => setCustomStartupName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">One-Line Tagline & Value Prop *</label>
                    <input
                      type="text"
                      placeholder="e.g. Autonomous Levantine speech recognition for clinical hospital notes"
                      value={customTagline}
                      onChange={(e) => setCustomTagline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Primary AI Sector</label>
                      <select
                        value={customSector}
                        onChange={(e) => setCustomSector(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Levantine NLP">Levantine NLP</option>
                        <option value="AgriTech Vision">AgriTech Vision</option>
                        <option value="HealthTech AI">HealthTech AI</option>
                        <option value="Fintech & Treasury">Fintech & Treasury</option>
                        <option value="Robotics & Edge">Robotics & Edge</option>
                        <option value="Enterprise SaaS">Enterprise SaaS</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Current Funding Stage</label>
                      <select
                        value={customStage}
                        onChange={(e) => setCustomStage(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Pre-Seed">Pre-Seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Grant / Research">Grant / Research</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Raise Amount ($ USD)</label>
                    <input
                      type="text"
                      placeholder="e.g. $500,000 USD"
                      value={customTargetRaise}
                      onChange={(e) => setCustomTargetRaise(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Pitch Deck Upload Simulator Dropzone */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Upload Pitch Deck (PDF / Presentation)</label>
                    <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 transition-colors text-center space-y-2">
                      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="text-xs text-slate-600 font-sans">
                        Drag and drop your pitch deck file here, or{" "}
                        <button
                          type="button"
                          onClick={() => setCustomUploadedFileName("Deck_Upload_Synthetic_v1.pdf")}
                          className="text-emerald-700 font-bold underline"
                        >
                          browse sample file
                        </button>
                      </div>
                      {customUploadedFileName && (
                        <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 py-1 px-2 rounded inline-block">
                          ✓ File Attached: {customUploadedFileName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Code Repository & DeepTech Specs */}
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">GitHub / GitLab Repository URL</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="https://github.com/your-org/ai-engine"
                        value={customGithubUrl}
                        onChange={(e) => setCustomGithubUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-emerald-500 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Pitch Summary & Unit Economics (Text Representation)
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Briefly describe your market size (TAM), early traction/pilots in Lebanon or GCC, cost advantage, and use of funds..."
                      value={customDeckSummary}
                      onChange={(e) => setCustomDeckSummary(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:border-emerald-500 font-sans text-xs"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Confidentiality & Zero-Retention Security</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                      Code and deck representations are processed via ephemeral memory containers. No proprietary model weights or proprietary algorithms are stored or shared without explicit founder consent.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleStartAnalysis}
                      disabled={!customStartupName && !customDeckSummary}
                      className={`w-full py-3.5 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                        !customStartupName && !customDeckSummary
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
                      <span>Start Custom AI Due Diligence Audit (25 Credits)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: REAL-TIME AI ANALYSIS SCANNING ANIMATION */}
      {currentView === "analyzing" && (
        <div className="rounded-2xl bg-slate-950 border-2 border-emerald-500/40 p-8 text-white space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">Running AI Diligence Telemetry</h3>
            <p className="text-xs text-slate-400 font-sans">
              Scanning synthetic code tree, latency benchmarks, TAM validity, and Law 126 tax structuring...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-xl mx-auto space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-emerald-400">Diligence Pipeline Step {analysisStep} of 7</span>
              <span className="text-slate-400">{Math.round((analysisStep / 7) * 100)}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-300 transition-all duration-500"
                style={{ width: `${(analysisStep / 7) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Live Terminal Log Output */}
          <div className="max-w-2xl mx-auto bg-slate-900/90 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>961 AI Engine • Virtual Deal Room Scanner</span>
              </span>
              <span className="text-emerald-400 animate-pulse">● LIVE STREAM</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pt-1 text-[11px]">
              {analysisLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">[{idx + 1}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: COMPREHENSIVE AI DUE DILIGENCE REPORT & SCORECARD */}
      {currentView === "report" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-[#B0CFAD] shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xl border border-emerald-200">
                {currentReport.overallScore}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-900">{currentSubmission.startupName}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                    {currentReport.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Analyzed {currentReport.analyzedAt} • Sector: {currentSubmission.sector} • Ask: {currentSubmission.targetRaise}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyMemo}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 flex items-center gap-1.5"
              >
                {copiedMemoToast ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMemoToast ? "Memo Copied!" : "Copy Full Memo"}</span>
              </button>

              <button
                onClick={() => setCurrentView("upload_or_select")}
                className="px-3.5 py-2 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Audit Another Deck / Code</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs for Report Detail */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveReportTab("radar")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeReportTab === "radar"
                  ? "bg-[#2E5A2C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>1. Radar Analysis (Tech • Market • Valuation)</span>
            </button>

            <button
              onClick={() => setActiveReportTab("scorecard")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeReportTab === "scorecard"
                  ? "bg-[#2E5A2C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>2. Six-Pillar Scorecard & Actions</span>
            </button>

            <button
              onClick={() => setActiveReportTab("diligence_memo")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeReportTab === "diligence_memo"
                  ? "bg-[#2E5A2C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>3. Executive Diligence Memo & Valuation</span>
            </button>

            <button
              onClick={() => setActiveReportTab("syndicate_spv")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeReportTab === "syndicate_spv"
                  ? "bg-[#2E5A2C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>4. Diaspora Angel Syndicate SPV ($1k-$5k)</span>
            </button>
          </div>

          {/* TAB 0: RECHARTS RADAR ANALYSIS MATRIX */}
          {activeReportTab === "radar" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <PitchRoomRadarChart
                subScores={currentReport.subScores}
                startupName={currentSubmission.startupName}
                overallScore={currentReport.overallScore}
                sector={currentSubmission.sector}
                targetRaise={currentSubmission.targetRaise}
                valuationPreMoney={currentSubmission.valuationPreMoney}
              />
            </div>
          )}

          {/* TAB 1: SIX-PILLAR SCORECARD */}
          {activeReportTab === "scorecard" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
              {/* Left 7 Cols: Progress Bars & Breakdown */}
              <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-[#B0CFAD] p-6 space-y-5 shadow-xs">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Pillar-by-Pillar Telemetry</span>
                  <h3 className="text-base font-black text-slate-900">
                    Comprehensive Investor Diligence Breakdown
                  </h3>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  {/* Pillar 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-emerald-700" />
                        <span>1. Technical Feasibility & Architecture MLOps</span>
                      </span>
                      <span className="text-emerald-700">{currentReport.subScores.techFeasibility}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${currentReport.subScores.techFeasibility}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pillar 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-teal-700" />
                        <span>2. Algorithmic IP Moat & Model Defensibility</span>
                      </span>
                      <span className="text-teal-700">{currentReport.subScores.ipDefensibility}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: `${currentReport.subScores.ipDefensibility}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-indigo-700" />
                        <span>3. Regional Market Opportunity (TAM/SAM in MENA)</span>
                      </span>
                      <span className="text-indigo-700">{currentReport.subScores.marketOpportunity}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${currentReport.subScores.marketOpportunity}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pillar 4 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-amber-700" />
                        <span>4. Diaspora Syndicate Co-Investment Appeal</span>
                      </span>
                      <span className="text-amber-700">{currentReport.subScores.diasporaSynergy}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${currentReport.subScores.diasporaSynergy}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pillar 5 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-rose-700" />
                        <span>5. Financial Unit Economics & Valuation Realism</span>
                      </span>
                      <span className="text-rose-700">{currentReport.subScores.unitEconomics}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-rose-600 rounded-full"
                        style={{ width: `${currentReport.subScores.unitEconomics}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pillar 6 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-sky-700" />
                        <span>6. Sovereign Lebanese Legal & Law 126 Structuring</span>
                      </span>
                      <span className="text-sky-700">{currentReport.subScores.legalSovereignty}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-sky-600 rounded-full"
                        style={{ width: `${currentReport.subScores.legalSovereignty}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Roadmap Preview */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Priority Action Items Before Investor Pitch:</h4>
                  <div className="space-y-2">
                    {currentReport.actionRoadmap.map((act, aIdx) => (
                      <div key={aIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase shrink-0 ${
                            act.priority === "High"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {act.priority} • {act.category}
                        </span>
                        <div className="text-xs space-y-0.5">
                          <div className="font-bold text-slate-900">{act.task}</div>
                          <div className="text-[11px] text-slate-500 font-sans">{act.impact}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Valuation Benchmark & Deal Routing Box */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-gradient-to-b from-[#F6FAF5] to-white rounded-2xl border-2 border-[#B0CFAD] p-5 space-y-4 shadow-xs">
                  <div className="border-b border-[#D7E7D6] pb-3">
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Valuation Benchmark</span>
                    <h4 className="text-sm font-black text-slate-900">Recommended SAFE Valuation Cap</h4>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#D7E7D6] text-xs space-y-2 shadow-2xs">
                    <div className="text-[10px] text-slate-500 font-mono">Suggested Post-Money Cap:</div>
                    <div className="text-lg font-black text-[#2E5A2C] font-mono">
                      {currentReport.valuationBenchmark.recommendedCap}
                    </div>
                    <div className="text-[11px] text-slate-600 font-sans">
                      Instrument: <strong className="text-slate-900">{currentReport.valuationBenchmark.safeInstrument}</strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 font-sans space-y-2">
                    <p>
                      <strong>MENA Context:</strong> {currentReport.valuationBenchmark.comparablesMena}
                    </p>
                    <p>
                      <strong>Diaspora Syndicate:</strong> {currentReport.valuationBenchmark.comparablesDiaspora}
                    </p>
                  </div>

                  {/* Connect with VC Matchmaking button */}
                  {onNavigateToMatchmaking && (
                    <button
                      onClick={onNavigateToMatchmaking}
                      className="w-full py-3 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-black text-xs transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>Submit Deal Memo to VC Matchmaker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {onNavigateToSandbox && (
                    <button
                      onClick={onNavigateToSandbox}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200 flex items-center justify-center gap-2"
                    >
                      <Building className="w-4 h-4 text-slate-600" />
                      <span>Audit Law 126/2019 Offshore Structuring</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXECUTIVE DILIGENCE MEMO */}
          {activeReportTab === "diligence_memo" && (
            <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] p-6 md:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Institutional VC Memo</span>
                  <h3 className="text-lg font-black text-slate-900">
                    Automated Executive Diligence Brief
                  </h3>
                </div>

                <button
                  onClick={handleCopyMemo}
                  className="px-4 py-2 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white text-xs font-bold transition-all flex items-center gap-2 self-start md:self-auto"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedMemoToast ? "Copied to Clipboard!" : "Copy Full Text Memo"}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed space-y-4 font-sans">
                <p className="text-slate-800 font-medium">
                  {currentReport.summaryExecutiveMemo}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <div className="font-bold text-emerald-950 font-mono text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Key Strengths & Differentiators</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      {currentReport.strengths.map((st, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                    <div className="font-bold text-rose-950 font-mono text-xs flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-700" />
                      <span>Vulnerabilities & Red Flags</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      {currentReport.risksAndGaps.map((rg, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <span className="text-rose-700 font-bold">•</span>
                          <span>{rg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIASPORA ANGEL SYNDICATE SPV */}
          {activeReportTab === "syndicate_spv" && (
            <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] p-6 md:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-mono font-bold text-amber-700 uppercase">Diaspora Co-Investment Engine</span>
                <h3 className="text-lg font-black text-slate-900">
                  Standardized Special Purpose Vehicle (SPV) Syndication
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-sans">
                  Allows overseas Lebanese tech workers (in SF, London, Paris, Dubai) to pool micro-checks ($1,000–$5,000) into a single cap-table line item using standardized YC SAFEs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">SPV Eligibility</span>
                  <div className="text-emerald-700 font-black text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> APPROVED FOR SYNDICATE
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Min Check Size</span>
                  <div className="text-slate-900 font-black text-sm">
                    {currentReport.spvSyndicateReadiness.recommendedMinCheck}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Diaspora Interest Score</span>
                  <div className="text-indigo-700 font-black text-sm">
                    {currentReport.spvSyndicateReadiness.communityInterestScore}/100 (High)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-xs">Target Syndicate Lead:</div>
                  <div className="text-xs text-[#2E5A2C] font-black font-mono">
                    {currentReport.spvSyndicateReadiness.targetSyndicateLead}
                  </div>
                </div>

                {onNavigateToMatchmaking && (
                  <button
                    onClick={onNavigateToMatchmaking}
                    className="px-5 py-2.5 rounded-xl bg-[#2E5A2C] hover:bg-[#1E3B1D] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 whitespace-nowrap"
                  >
                    <Users className="w-4 h-4" />
                    <span>Open Diaspora Syndicate Match</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
