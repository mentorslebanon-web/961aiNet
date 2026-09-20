import React, { useState } from "react";
import { GraphNode, WikiDocument, LintReport, LintIssue, EnrichedGuruProfile } from "../../types";
import { 
  BookOpen, 
  UploadCloud, 
  Sparkles, 
  GitMerge, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  RefreshCw, 
  Terminal, 
  Wrench, 
  ArrowRight,
  ShieldCheck,
  Layers,
  Database,
  Play,
  UserCheck,
  Cpu,
  GraduationCap,
  Globe2,
  Github,
  Star,
  Code2,
  Briefcase,
  Copy,
  PlusCircle
} from "lucide-react";
import confetti from "canvas-confetti";

interface Module3WikiIngestionProps {
  wikiDocs: WikiDocument[];
  onAddWikiDoc: (doc: WikiDocument) => void;
  onAddNode: (node: GraphNode) => void;
  deductCredits: (amount: number) => boolean;
}

export const Module3WikiIngestion: React.FC<Module3WikiIngestionProps> = ({
  wikiDocs,
  onAddWikiDoc,
  onAddNode,
  deductCredits
}) => {
  const [activeTab, setActiveTab] = useState<"guru_extract" | "ingest" | "disambiguate" | "lint">("guru_extract");

  // Guru Profile Extractor State
  const [guruRawText, setGuruRawText] = useState<string>(
`Dr. Jad Hobeika
Senior AI Research Scientist & Distributed LLM Architect
Location: Paris, France (formerly Beirut, Lebanon)

Bio:
Alumni of American University of Beirut (AUB, BS Computer Engineering '16) and PhD from École Polytechnique Paris.
Previously led GPU infrastructure and LLM post-training at Meta FAIR Paris. Core contributor to vLLM and TensorRT-LLM kernels with 1,420+ GitHub stars.
Active mentor at LebNet Paris and technical advisor to 3 Berytech-incubated AI startups in Beirut.

Technical Stack & Specializations:
- 4-bit and FP8 LLM Quantization, FlashAttention-3 CUDA kernels, PyTorch Distributed, DeepSpeed.
- Large-scale Multi-modal Diffusion Transformers and Vision-Language models.
- Production MLOps with Kubernetes GPU scheduling and Slurm clusters.

Affiliations: American University of Beirut (AUB), LebNet Paris, Berytech Accelerator.
Availability: Open to Advisory, Co-Founder equity roles, and Angel syndicates.`
  );

  const [isExtractingGuru, setIsExtractingGuru] = useState(false);
  const [extractedGuru, setExtractedGuru] = useState<EnrichedGuruProfile | null>({
    full_name: "Dr. Jad Hobeika",
    primary_role: "Senior AI Research Scientist & Distributed LLM Architect",
    location: {
      city: "Paris",
      country: "France",
      is_lebanese_diaspora: true
    },
    technical_skills: [
      {
        name: "LLM Quantization & FlashAttention CUDA",
        category: "LLM",
        confidence_score: 0.98
      },
      {
        name: "Distributed GPU Clusters (Slurm/vLLM)",
        category: "Infrastructure",
        confidence_score: 0.95
      },
      {
        name: "Vision-Language & Diffusion Models",
        category: "ComputerVision",
        confidence_score: 0.91
      },
      {
        name: "PyTorch Distributed & DeepSpeed",
        category: "DataScience",
        confidence_score: 0.94
      }
    ],
    lebanon_affiliations: ["AUB", "LebNet", "Berytech"],
    open_to_roles: ["Advisor", "Founder", "Angel Investor", "Full-Time"],
    github_stats: {
      total_stars: 1420,
      top_languages: ["Python", "C++", "CUDA", "TypeScript"]
    }
  });

  const [copiedJson, setCopiedJson] = useState(false);

  // Ingestion State
  const [sourceType, setSourceType] = useState<string>("pitch_deck");
  const [entityName, setEntityName] = useState<string>("Byblos Quantum AI");
  const [rawTextInput, setRawTextInput] = useState<string>(
    `STARTUP PITCH DECK EXTRACT: Byblos Quantum AI
Founders: Dr. Tariq Nader (PhD LAU / MIT Postdoc) & Maya Chahine (Ex-Google Brain, Paris)
Location: Byblos, Lebanon & Paris, France (Hybrid Diaspora)
Core Mission: Hybrid Quantum-Classical optimization algorithms for GCC logistics and container routing at Port of Beirut.
Tech Stack: Qiskit, PyTorch Distributed, CUDA Quantum kernels, TensorRT.
Traction: $22k MRR from pilot trials with CMA CGM Levant; 6 Lebanese researchers on payroll.
Funding Target: Raising $850k Seed round at $5.5M valuation cap.
Affiliations: Lebanese American University (LAU) Quantum Lab, Berytech Accelerator, LebNet Paris chapter.`
  );
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestedResult, setIngestedResult] = useState<any | null>(null);

  // Disambiguation State
  const [entityCandidates, setEntityCandidates] = useState([
    {
      id: "aub_ai_center",
      rawAlias: "AUB AI Center",
      canonicalTarget: "American University of Beirut (AUB)",
      confidence: 0.98,
      sourceContext: "Alumni mentions in 14 founder pitch decks",
      merged: false
    },
    {
      id: "lebnet_sf",
      rawAlias: "LebNet Silicon Valley Chapter",
      canonicalTarget: "LebNet Global Diaspora Network",
      confidence: 0.95,
      sourceContext: "Investor syndicate profile metadata",
      merged: false
    },
    {
      id: "bdd_labs",
      rawAlias: "Beirut Digital District Tech Hub",
      canonicalTarget: "Berytech Innovation Park / BDD",
      confidence: 0.92,
      sourceContext: "Office location vectors for 8 Beirut startups",
      merged: false
    }
  ]);

  // Linting State
  const [isLinting, setIsLinting] = useState(false);
  const [lintReport, setLintReport] = useState<LintReport | null>({
    totalNodesScanned: 48,
    healthScore: 92,
    issues: [
      {
        id: "issue_1",
        type: "ORPHAN_NODE",
        severity: "MEDIUM",
        entity: "Skill: PyTorch 1.12 (Legacy)",
        description: "Node has 0 incoming active startup links; deprecated framework version.",
        autoFixCypher: "MATCH (s:Skill {name: 'PyTorch 1.12'}) DETACH DELETE s;",
        fixed: false
      },
      {
        id: "issue_2",
        type: "DISCREPANCY",
        severity: "HIGH",
        entity: "Startup: PhoeniciaAI",
        description: "Pitch deck claims $40k MRR but GitHub commit frequency shows zero active repo commits in last 90 days.",
        autoFixCypher: "MATCH (s:Startup {name: 'PhoeniciaAI'}) SET s.verificationStatus = 'AUDIT_PENDING';",
        fixed: false
      },
      {
        id: "issue_3",
        type: "ALIAS_MERGE",
        severity: "LOW",
        entity: "Hub: AUB AI Lab vs American University of Beirut",
        description: "Two nodes share 98% semantic overlap and alumni edge vectors.",
        autoFixCypher: "MATCH (a:Hub {id: 'aub_ai_lab'}), (b:Hub {id: 'aub_main'}) CALL apoc.refactor.mergeNodes([a,b]) YIELD node RETURN node;",
        fixed: false
      }
    ],
    graphHygieneSummary: "Weekly graph audit completed. 3 items flagged for data integrity.",
    timestamp: "2026-08-25T01:20:00Z"
  });

  // Guru Preset Profiles
  const guruPresets = [
    {
      label: "Dr. Jad Hobeika (Paris / AUB / LLMs)",
      text: `Dr. Jad Hobeika
Senior AI Research Scientist & Distributed LLM Architect
Location: Paris, France (formerly Beirut, Lebanon)

Bio:
Alumni of American University of Beirut (AUB, BS Computer Engineering '16) and PhD from École Polytechnique Paris.
Previously led GPU infrastructure and LLM post-training at Meta FAIR Paris. Core contributor to vLLM and TensorRT-LLM kernels with 1,420+ GitHub stars.
Active mentor at LebNet Paris and technical advisor to 3 Berytech-incubated AI startups in Beirut.

Technical Stack & Specializations:
- 4-bit and FP8 LLM Quantization, FlashAttention-3 CUDA kernels, PyTorch Distributed, DeepSpeed.
- Large-scale Multi-modal Diffusion Transformers and Vision-Language models.
- Production MLOps with Kubernetes GPU scheduling and Slurm clusters.

Affiliations: American University of Beirut (AUB), LebNet Paris, Berytech Accelerator.
Availability: Open to Advisory, Co-Founder equity roles, and Angel syndicates.`
    },
    {
      label: "Nour El-Khoury (Beirut / LAU / Medical CV)",
      text: `Nour El-Khoury
Head of Computer Vision & Biomedical AI
Location: Beirut, Lebanon

Background:
Graduate of Lebanese American University (LAU '19, MS in AI & Bioinformatics). Incubated at Berytech and Speed@BDD.
Published 4 CVPR/MICCAI papers on 3D CT scan segmentation and low-power edge diffusion for ultrasound devices in MENA hospitals.
GitHub: 630 stars across biomedical PyTorch repos.
Affiliations: Lebanese American University (LAU), Berytech Innovation Park, LIFE Lebanon.
Open to roles: Founder, Full-Time CTO, Advisor.`
    },
    {
      label: "Charbel Assi (San Francisco / LebNet / GPU Infra)",
      text: `Charbel Assi
Principal Distributed Systems & CUDA Systems Engineer
Location: San Francisco, CA, United States

Bio:
USJ (Saint Joseph University Beirut) Engineering graduate, based in Silicon Valley for 7 years.
Ex-NVIDIA GPU Kernel team member. Built automated PyTorch distributed pipeline for 4,096 H100 clusters.
Active LebNet Silicon Valley tech mentor and seed angel in 4 Lebanese diaspora AI projects.
Top Skills: CUDA kernel optimization, Triton, NCCL interconnects, High-Performance Computing.
Affiliations: Saint Joseph University (USJ), LebNet, Lebanese International Finance Executives (LIFE).
Open to roles: Angel Investor, Advisor, Founder.`
    }
  ];

  // Extract Enriched Guru Profile
  const handleExtractGuru = async () => {
    if (!deductCredits(10)) {
      alert("Insufficient AI credits! Please top up in billing.");
      return;
    }

    setIsExtractingGuru(true);
    try {
      const res = await fetch("/api/gemini/extract-guru-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: guruRawText })
      });

      const data = await res.json();
      if (data.profile) {
        setExtractedGuru(data.profile);
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error("Guru extraction error:", err);
    } finally {
      setIsExtractingGuru(false);
    }
  };

  // Inject Extracted Guru into Graph
  const handleInjectGuruToGraph = () => {
    if (!extractedGuru) return;

    const guruNode: GraphNode = {
      id: "guru_" + Date.now(),
      label: extractedGuru.full_name,
      type: "Guru",
      location: `${extractedGuru.location.city}, ${extractedGuru.location.country}`,
      isDiaspora: extractedGuru.location.is_lebanese_diaspora,
      title: extractedGuru.primary_role,
      bio: `Enriched Lebanese AI Profile: Affiliated with ${extractedGuru.lebanon_affiliations.join(", ")}. Skills in ${extractedGuru.technical_skills.map(s => s.name).join(", ")}.`,
      tags: extractedGuru.technical_skills.map(s => s.name),
      verified: true,
      connectionsCount: extractedGuru.lebanon_affiliations.length + extractedGuru.technical_skills.length,
      diasporaHub: extractedGuru.location.is_lebanese_diaspora ? `${extractedGuru.location.city} Chapter` : undefined
    };

    onAddNode(guruNode);

    // Create Wiki Doc
    const wikiDoc: WikiDocument = {
      slug: extractedGuru.full_name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      title: extractedGuru.full_name,
      entityType: "Guru",
      lastUpdated: new Date().toISOString().split("T")[0],
      author: "Ecosystem Metric Extractor",
      frontmatter: {
        aliases: [extractedGuru.full_name],
        location: `${extractedGuru.location.city}, ${extractedGuru.location.country}`,
        isDiaspora: extractedGuru.location.is_lebanese_diaspora,
        verificationLevel: "Tier 1 (Verified)",
        connectedEntities: [...extractedGuru.lebanon_affiliations, ...extractedGuru.technical_skills.map(s => s.name)]
      },
      summary: `${extractedGuru.primary_role} based in ${extractedGuru.location.city}. ${extractedGuru.location.is_lebanese_diaspora ? "Diaspora Anchor" : "Lebanon Resident"}.`,
      markdownContent: `# ${extractedGuru.full_name}\n\n**Role**: ${extractedGuru.primary_role}\n**Location**: ${extractedGuru.location.city}, ${extractedGuru.location.country} (${extractedGuru.location.is_lebanese_diaspora ? "🇱🇧 Lebanese Diaspora" : "🇱🇧 Lebanon Resident"})\n\n## Lebanese Ecosystem Affiliations\n${extractedGuru.lebanon_affiliations.map(a => `- [[${a}]]`).join("\n")}\n\n## Technical Skills & Confidence\n${extractedGuru.technical_skills.map(s => `- **${s.name}** (${s.category}) — Confidence: ${(s.confidence_score * 100).toFixed(0)}%`).join("\n")}\n\n## Open To Roles\n${extractedGuru.open_to_roles.join(", ")}\n\n## GitHub Metrics\n- Stars: ${extractedGuru.github_stats?.total_stars || 0}\n- Top Languages: ${extractedGuru.github_stats?.top_languages.join(", ") || "N/A"}`,
      backlinks: [],
      outlinks: extractedGuru.lebanon_affiliations
    };

    onAddWikiDoc(wikiDoc);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 }
    });
    alert(`Successfully injected "${extractedGuru.full_name}" into the Neo4j Graph and compiled Karpathy Markdown Wiki!`);
  };

  const copyProfileJson = () => {
    if (!extractedGuru) return;
    navigator.clipboard.writeText(JSON.stringify(extractedGuru, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Trigger Live Ingest
  const handleIngest = async () => {
    if (!deductCredits(20)) {
      alert("Insufficient AI credits! Please top up in billing.");
      return;
    }

    setIsIngesting(true);
    setIngestedResult(null);

    try {
      const res = await fetch("/api/gemini/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: rawTextInput,
          sourceType,
          entityName
        })
      });

      const data = await res.json();
      setIngestedResult(data);

      if (data.wikiMarkdown) {
        const newWiki: WikiDocument = {
          slug: entityName.toLowerCase().replace(/\s+/g, "-"),
          title: entityName,
          entityType: "Startup",
          lastUpdated: new Date().toISOString().split("T")[0],
          author: "Karpathy LLM Wiki Ingestion Agent",
          frontmatter: {
            aliases: [entityName],
            location: "Beirut & Diaspora",
            isDiaspora: false,
            verificationLevel: "Tier 1 (Verified)",
            connectedEntities: (data.extractedNodes || []).map((n: any) => n.label)
          },
          summary: `Auto-compiled Karpathy Wiki page for ${entityName} from ${sourceType}.`,
          markdownContent: data.wikiMarkdown,
          backlinks: [],
          outlinks: (data.extractedNodes || []).map((n: any) => n.id)
        };
        onAddWikiDoc(newWiki);

        // Add node
        const newNode: GraphNode = {
          id: "node_" + Date.now(),
          label: entityName,
          type: "Startup",
          location: "Byblos & Paris",
          isDiaspora: false,
          title: "Quantum-Classical Optimization",
          bio: rawTextInput.slice(0, 160) + "...",
          tags: ["Quantum AI", "CUDA Quantum", "GCC Logistics"],
          stage: "Seed ($850k target)",
          fundingTarget: "$850,000",
          verified: true,
          wikiSlug: newWiki.slug,
          connectionsCount: (data.extractedEdges || []).length || 4
        };
        onAddNode(newNode);

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error("Ingest error:", err);
    } finally {
      setIsIngesting(false);
    }
  };

  // Merge Disambiguation candidate
  const handleMergeCandidate = (id: string) => {
    setEntityCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, merged: true } : c))
    );
    confetti({ particleCount: 25, spread: 40 });
  };

  // Run Graph Linting
  const handleRunLint = async () => {
    if (!deductCredits(15)) {
      alert("Insufficient AI credits!");
      return;
    }

    setIsLinting(true);
    try {
      const res = await fetch("/api/gemini/graph-lint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customRule: "AUDIT_METRICS_AND_ORPHANS" })
      });
      const data = await res.json();
      if (data.report) {
        setLintReport({
          ...data.report,
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Lint error:", err);
    } finally {
      setIsLinting(false);
    }
  };

  const handleFixIssue = (issueId: string) => {
    if (!lintReport) return;
    setLintReport({
      ...lintReport,
      healthScore: Math.min(100, lintReport.healthScore + 3),
      issues: lintReport.issues.map((i) =>
        i.id === issueId ? { ...i, fixed: true } : i
      )
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
              MODULE 3 SPECIFICATION
            </span>
            <h2 className="text-lg font-bold text-white">Karpathy LLM Wiki Ingestion & Ecosystem Extractor</h2>
          </div>
          <p className="text-xs text-slate-400">
            Automated second-brain pipeline extracting structured `EnrichedGuruProfile` metrics, compiling Markdown [[Wikilinks]], resolving entity aliases, and running graph `/lint` audits.
          </p>
        </div>

        <div className="flex flex-wrap items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab("guru_extract")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "guru_extract" ? "bg-emerald-600 text-white shadow-sm font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Guru Extractor (`EnrichedGuruProfile`)
          </button>
          <button
            onClick={() => setActiveTab("ingest")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "ingest" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Wiki Ingest Sandbox
          </button>
          <button
            onClick={() => setActiveTab("disambiguate")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "disambiguate" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            Entity Disambiguation
          </button>
          <button
            onClick={() => setActiveTab("lint")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "lint" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Weekly /lint Console
          </button>
        </div>
      </div>

      {/* Tab 0: Guru Profile Extractor (EnrichedGuruProfile) */}
      {activeTab === "guru_extract" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Raw Input */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Raw Profile / CV Text Buffer
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  EnrichedGuruProfile Schema
                </span>
              </div>

              {/* Presets */}
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Load Ecosystem Profile Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {guruPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGuruRawText(preset.text)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                  Raw Text (Biography, GitHub Bio, Resume, or Speaker Intro)
                </label>
                <textarea
                  rows={13}
                  value={guruRawText}
                  onChange={(e) => setGuruRawText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
                  placeholder="Paste unstructured raw profile text here..."
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleExtractGuru}
                  disabled={isExtractingGuru}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isExtractingGuru ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Parsing Lebanese AI Metrics with Gemini 3.7...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Extract Structured Ecosystem Metrics (10 Credits)
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Col: Structured Extracted Result */}
            <div className="lg:col-span-7 space-y-4">
              {extractedGuru ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
                  {/* Top Bar with Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{extractedGuru.full_name}</h3>
                        {extractedGuru.location.is_lebanese_diaspora ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <Globe2 className="w-3 h-3" />
                            🇱🇧 Lebanese Diaspora
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            🇱🇧 Resident (Lebanon)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{extractedGuru.primary_role}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyProfileJson}
                        style={{ color: "#ffffff" }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-white" style={{ color: "#ffffff" }} />
                        <span style={{ color: "#ffffff" }} className="!text-white font-bold">{copiedJson ? "Copied JSON!" : "Copy JSON"}</span>
                      </button>
                      <button
                        onClick={handleInjectGuruToGraph}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Inject Node & [[Wiki]]
                      </button>
                    </div>
                  </div>

                  {/* Location & Diaspora Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                        Current Hub
                      </span>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
                        {extractedGuru.location.city}, {extractedGuru.location.country}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                        Diaspora Bridge Flag
                      </span>
                      <div className="text-xs font-bold text-slate-200">
                        {extractedGuru.location.is_lebanese_diaspora ? (
                          <span className="text-amber-400">Yes (Alumni / Expat Node)</span>
                        ) : (
                          <span className="text-emerald-400">No (Local Beirut Talent)</span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                        GitHub Open-Source
                      </span>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {extractedGuru.github_stats?.total_stars || 0} stars
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({extractedGuru.github_stats?.top_languages.slice(0, 2).join(", ")})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Classified Technical Skills with Confidence Scores */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        Classified Technical Skills & Confidence Vector
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {extractedGuru.technical_skills.length} skills analyzed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {extractedGuru.technical_skills.map((skill, i) => (
                        <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">{skill.name}</span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                              skill.category === "LLM" 
                                ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                                : skill.category === "ComputerVision"
                                ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                : skill.category === "Infrastructure"
                                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                            }`}>
                              {skill.category}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-slate-500">Confidence Score</span>
                              <span className="text-emerald-400 font-bold">{(skill.confidence_score * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                                style={{ width: `${Math.min(100, Math.max(0, skill.confidence_score * 100))}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lebanon Affiliations & Open To Roles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-indigo-400" />
                        Lebanon Affiliations & Hub Roots
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {extractedGuru.lebanon_affiliations.map((aff, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium">
                            [[{aff}]]
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-emerald-400" />
                        Open To Ecosystem Roles
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {extractedGuru.open_to_roles.map((role, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                            ✓ {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live JSON Preview */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5 text-slate-500" />
                        EnrichedGuruProfile JSON Object Output
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">TypeScript Compliant</span>
                    </div>
                    <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48">
                      {JSON.stringify(extractedGuru, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
                  <UserCheck className="w-8 h-8 text-slate-600" />
                  <p className="text-xs">Paste a profile text on the left and click "Extract Structured Ecosystem Metrics" to view the structured output.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Tab 1: Ingest Sandbox */}
      {activeTab === "ingest" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                Raw Source Ingestion Buffer
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Gemini 3.7 Ingestion Daemon</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">Entity Name / Handle</label>
                <input
                  type="text"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">Source Ingestion Type</label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="pitch_deck">Pitch Deck (PDF Text)</option>
                  <option value="github_repo">GitHub Repo Summary & Commits</option>
                  <option value="cv_resume">Founder / Guru CV</option>
                  <option value="arxiv_paper">arXiv Research Paper</option>
                </select>
              </div>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-500">Quick Presets:</span>
              <button
                onClick={() => {
                  setEntityName("Byblos Quantum AI");
                  setSourceType("pitch_deck");
                  setRawTextInput(`STARTUP PITCH DECK EXTRACT: Byblos Quantum AI\nFounders: Dr. Tariq Nader (PhD LAU / MIT Postdoc) & Maya Chahine (Ex-Google Brain, Paris)\nLocation: Byblos, Lebanon & Paris, France (Hybrid Diaspora)\nCore Mission: Hybrid Quantum-Classical optimization algorithms for GCC logistics and container routing at Port of Beirut.\nTech Stack: Qiskit, PyTorch Distributed, CUDA Quantum kernels, TensorRT.\nTraction: $22k MRR from pilot trials with CMA CGM Levant; 6 Lebanese researchers on payroll.\nFunding Target: Raising $850k Seed round at $5.5M valuation cap.\nAffiliations: Lebanese American University (LAU) Quantum Lab, Berytech Accelerator, LebNet Paris chapter.`);
                }}
                className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded border border-slate-800"
              >
                Byblos Quantum Deck
              </button>
              <button
                onClick={() => {
                  setEntityName("Dr. Sarah Matar");
                  setSourceType("cv_resume");
                  setRawTextInput(`CURRICULUM VITAE: Dr. Sarah Matar\nCurrent: Senior Research Scientist @ DeepMind London | USJ Graduate\nSpecialization: Diffusion Transformers (DiT), Synthetic Biology Protein Folding, JAX\nAwards: Lebanese CNRS Young Researcher Award 2024\nProjects: Mentoring 8 LAU/AUB Masters students in generative biology; Angel syndicate member @ LebNet London.`);
                }}
                className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded border border-slate-800"
              >
                Dr. Sarah CV (Diaspora)
              </button>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Raw Unstructured Text</label>
              <textarea
                value={rawTextInput}
                onChange={(e) => setRawTextInput(e.target.value)}
                rows={8}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <button
              onClick={handleIngest}
              disabled={isIngesting}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isIngesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isIngesting ? "Extracting & Compiling Wiki..." : "Compile into L1 Wiki & Neo4j Nodes (20 Credits)"}
            </button>
          </div>

          {/* Compiled Output Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Compiled Karpathy Markdown Wiki & Graph Nodes
              </h3>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">
                [[Wikilinks]] Generated
              </span>
            </div>

            {isIngesting ? (
              <div className="py-24 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-400 font-mono">
                  Executing Andrej Karpathy LLM Wiki pattern: Entity resolution, skill vector linking, frontmatter extraction...
                </p>
              </div>
            ) : ingestedResult ? (
              <div className="space-y-4">
                {/* Extracted Nodes Pill preview */}
                {ingestedResult.extractedNodes && (
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                      New Graph Entities & Verified Edges:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {ingestedResult.extractedNodes.map((n: any, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 rounded-lg flex items-center gap-1"
                        >
                          <span className="text-emerald-500">[{n.type}]</span> {n.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compiled Markdown View */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-h-[360px] overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {ingestedResult.wikiMarkdown}
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Successfully compiled to L1 Wiki cache and injected <strong>{ingestedResult.extractedNodes?.length || 3} nodes</strong> into Neo4j cluster.
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center space-y-2 text-slate-500 text-xs">
                <BookOpen className="w-8 h-8 mx-auto text-slate-600" />
                <p>Click "Compile into L1 Wiki" to trigger the Karpathy LLM Ingestion Agent.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Entity Disambiguation Engine */}
      {activeTab === "disambiguate" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-indigo-400" />
                Entity Disambiguation & Alias Resolution Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Detects naming variations across pitch decks and merges duplicate graph entities using Neo4j <code className="text-emerald-400 font-mono">apoc.refactor.mergeNodes</code>.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
              3 Resolution Candidates
            </span>
          </div>

          <div className="space-y-3">
            {entityCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  candidate.merged
                    ? "bg-emerald-950/20 border-emerald-500/30 opacity-75"
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      "{candidate.rawAlias}"
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      [[{candidate.canonicalTarget}]]
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{candidate.sourceContext}</p>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Cosine Confidence: {(candidate.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                {candidate.merged ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Merged into Graph
                  </span>
                ) : (
                  <button
                    onClick={() => handleMergeCandidate(candidate.id)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <GitMerge className="w-3.5 h-3.5" />
                    Approve & Merge Alias
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Weekly Graph Linting Routine (/lint) */}
      {activeTab === "lint" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Automated Weekly Graph Linting (`/lint`)</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Periodic daemon checking for orphan nodes, metric hallucinations, and stale tech stacks across Lebanese AI profiles.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {lintReport && (
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400 block text-lg">
                    {lintReport.healthScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Hygiene Score</span>
                </div>
              )}
              <button
                onClick={handleRunLint}
                disabled={isLinting}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isLinting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                {isLinting ? "Scanning Graph..." : "Run Weekly Audit (15 Credits)"}
              </button>
            </div>
          </div>

          {/* Issues Feed */}
          {lintReport && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Flagged Hygiene Discrepancies ({lintReport.issues.filter(i => !i.fixed).length} Pending)
              </span>

              <div className="space-y-3">
                {lintReport.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-xl border space-y-2 transition-all ${
                      issue.fixed
                        ? "bg-slate-950/40 border-slate-800 opacity-60"
                        : issue.severity === "HIGH"
                        ? "bg-rose-950/20 border-rose-500/40"
                        : "bg-amber-950/20 border-amber-500/40"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${
                          issue.severity === "HIGH" ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        }`}>
                          {issue.severity}
                        </span>
                        <span className="font-bold text-white text-xs">{issue.entity}</span>
                        <span className="text-slate-500 text-xs">({issue.type})</span>
                      </div>

                      {issue.fixed ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Remediated via Cypher
                        </span>
                      ) : (
                        <button
                          onClick={() => handleFixIssue(issue.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <Wrench className="w-3 h-3" />
                          Auto-Fix via Cypher
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-slate-300">{issue.description}</p>

                    <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-500 font-mono block">Remediation Script:</span>
                      <code className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                        {issue.autoFixCypher}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
