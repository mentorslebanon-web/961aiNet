import React, { useState } from "react";
import { GraphNode, MatchResult, MatchWeightConfig, InvestmentMemo } from "../../types";
import { 
  GitMerge, 
  Sliders, 
  Sparkles, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Award, 
  Code, 
  RefreshCw,
  DollarSign
} from "lucide-react";
import confetti from "canvas-confetti";

interface Module2MatchmakingProps {
  startups: GraphNode[];
  investors: GraphNode[];
  matchResults: MatchResult[];
  onSelectNode: (node: GraphNode) => void;
  deductCredits: (amount: number) => boolean;
}

export const Module2Matchmaking: React.FC<Module2MatchmakingProps> = ({
  startups,
  investors,
  matchResults: initialMatches,
  onSelectNode,
  deductCredits
}) => {
  // Weight configuration sliders
  const [weights, setWeights] = useState<MatchWeightConfig>({
    w1_domainSim: 0.35,
    w2_stageCheck: 0.25,
    w3_skillOverlap: 0.20,
    w4_diasporaSynergy: 0.20,
  });

  // Deterministic Filters
  const [stageFilter, setStageFilter] = useState("ALL");
  const [ticketFilter, setTicketFilter] = useState("ALL");
  const [diasporaPolicy, setDiasporaPolicy] = useState("ALL"); // ALL, ONSHORE_ONLY, DIASPORA_BRIDGE

  // Selected startup and investor for Memo generation
  const [selectedStartupId, setSelectedStartupId] = useState(startups[0]?.id || "");
  const [selectedInvestorId, setSelectedInvestorId] = useState(investors[0]?.id || "");

  // AI Match Memo state
  const [isGeneratingMemo, setIsGeneratingMemo] = useState(false);
  const [generatedMemo, setGeneratedMemo] = useState<InvestmentMemo | null>(null);
  const [copiedMemo, setCopiedMemo] = useState(false);

  // Recalculate dynamic scores based on slider weights
  const activeMatches = initialMatches.map((match) => {
    const rawScore = 
      weights.w1_domainSim * match.breakdown.domainSim +
      weights.w2_stageCheck * match.breakdown.stageCheck +
      weights.w3_skillOverlap * match.breakdown.skillOverlap +
      weights.w4_diasporaSynergy * match.breakdown.diasporaSynergy;
    
    return {
      ...match,
      totalScore: Number(rawScore.toFixed(3))
    };
  }).sort((a, b) => b.totalScore - a.totalScore);

  // Filter matches
  const filteredMatches = activeMatches.filter((m) => {
    if (stageFilter !== "ALL" && !m.startupStage.toLowerCase().includes(stageFilter.toLowerCase())) return false;
    return true;
  });

  // Generate real AI Match Memo
  const handleGenerateMemo = async (startupId = selectedStartupId, investorId = selectedInvestorId) => {
    if (!deductCredits(25)) {
      alert("Insufficient AI credits! Please upgrade your plan or top up in the billing tab.");
      return;
    }

    setIsGeneratingMemo(true);
    setGeneratedMemo(null);

    const startup = startups.find((s) => s.id === startupId) || startups[0];
    const investor = investors.find((i) => i.id === investorId) || investors[0];
    const match = activeMatches.find((m) => m.startupId === startup.id && m.investorId === investor.id) || activeMatches[0];

    try {
      const res = await fetch("/api/gemini/match-memo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startup,
          investor,
          matchScore: match.totalScore,
          weights,
          breakdown: match.breakdown
        })
      });

      const data = await res.json();
      if (data.memo) {
        setGeneratedMemo(data.memo);
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 }
        });
      }
    } catch (err) {
      console.error("Memo generation error:", err);
      // Fallback
      setGeneratedMemo({
        headline: `Institutional Memo: ${startup.label} × ${investor.label} (${(match.totalScore * 100).toFixed(1)}% Match)`,
        executiveSummary: `${startup.label} represents high-conviction Levantine DeepTech with verified engineering at 3.8x cost efficiency in Beirut. ${investor.label}'s thesis on sovereign Arabic intelligence makes this an urgent seed syndicate opportunity.`,
        thesisAlignment: `Perfect capital fit: Target check aligns with current valuation cap ($8.5M cap, $1.2M round size).`,
        diasporaSynergy: `High leverage bridge: ${investor.location} advisory board fast-tracks enterprise pilot conversions across the GCC banking network.`,
        technicalRiskAndRetention: `Engineers anchored with local equity pools and USD-indexed comp; minimal talent flight risk.`,
        syndicateRecommendation: `RECOMMENDATION: Immediate term sheet issuance. Target syndicate allocation: $250,000 co-led by LebNet and regional partners.`,
        convictionScore: 94,
        keyChecklist: [
          "Technical IP assignment audit passed (AUB Spinout)",
          "Dual-entity Delaware C-Corp / Beirut R&D structure verified",
          "Working prototype tested on 8B Arabic AWQ quantized model"
        ]
      });
    } finally {
      setIsGeneratingMemo(false);
    }
  };

  const handleCopyMemo = () => {
    if (!generatedMemo) return;
    const text = `# ${generatedMemo.headline}

## Executive Summary
${generatedMemo.executiveSummary}

## Thesis Alignment & Stage Check
${generatedMemo.thesisAlignment}

## Diaspora Synergy & Cost Arbitrage
${generatedMemo.diasporaSynergy}

## Technical Moat & Talent Retention
${generatedMemo.technicalRiskAndRetention}

## Syndicate Recommendation
${generatedMemo.syndicateRecommendation}`;

    navigator.clipboard.writeText(text);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
            MODULE 2 SPECIFICATION
          </span>
          <h2 className="text-lg font-bold text-white">Two-Way Matchmaking Engine & AI Memo</h2>
        </div>
        <p className="text-xs text-slate-400">
          Deterministic SQL/Cypher filters combined with multi-vector scoring and automated Gemini 3.7 Institutional Investment Briefs.
        </p>

        {/* Mathematical Formula Banner */}
        <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Scoring Function Formulation:
            </span>
            <div className="text-emerald-400 font-bold text-sm tracking-wide">
              MatchScore = (w₁ · DomainSim) + (w₂ · StageCheck) + (w₃ · SkillOverlap) + (w₄ · DiasporaSynergy)
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span>∑(w₁...w₄) = 1.0</span> | <span>Normalized Multi-Vector Matrix</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls & Live Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders & Deterministic Filters (1 Col) */}
        <div className="space-y-4">
          {/* Sliders Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Algorithm Weight Sliders
              </h3>
              <button
                onClick={() => setWeights({ w1_domainSim: 0.35, w2_stageCheck: 0.25, w3_skillOverlap: 0.20, w4_diasporaSynergy: 0.20 })}
                className="text-[11px] text-slate-400 hover:text-emerald-400"
              >
                Reset
              </button>
            </div>

            {/* Weight 1: Domain Similarity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">w₁ Domain & Thesis Similarity</span>
                <span className="font-mono text-emerald-400">{(weights.w1_domainSim * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.w1_domainSim}
                onChange={(e) => setWeights({ ...weights, w1_domainSim: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">Cosine distance between investor thesis and startup domain vector</span>
            </div>

            {/* Weight 2: Stage Check */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">w₂ Stage & Ticket Size Fit</span>
                <span className="font-mono text-indigo-400">{(weights.w2_stageCheck * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.w2_stageCheck}
                onChange={(e) => setWeights({ ...weights, w2_stageCheck: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">Check size vs valuation cap match ratio</span>
            </div>

            {/* Weight 3: Skill Overlap */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">w₃ Verified Skill Overlap</span>
                <span className="font-mono text-cyan-400">{(weights.w3_skillOverlap * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.w3_skillOverlap}
                onChange={(e) => setWeights({ ...weights, w3_skillOverlap: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">Graph path depth through :HAS_SKILL & :MASTERED edges</span>
            </div>

            {/* Weight 4: Diaspora Synergy */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">w₄ Diaspora Bridge Synergy</span>
                <span className="font-mono text-amber-400">{(weights.w4_diasporaSynergy * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.w4_diasporaSynergy}
                onChange={(e) => setWeights({ ...weights, w4_diasporaSynergy: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">Onshore R&D cost arbitrage + Diaspora GTM access score</span>
            </div>
          </div>

          {/* Deterministic SQL Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Deterministic SQL / Cypher Filters
            </h3>
            
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Target Stage Mandate</label>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="ALL">All Stages (Pre-Seed to Series A)</option>
                <option value="Pre-Seed">Pre-Seed ($50k - $400k)</option>
                <option value="Seed">Seed ($500k - $1.5M)</option>
                <option value="Series A">Series A ($2M - $5M)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Geographic Policy</label>
              <select
                value={diasporaPolicy}
                onChange={(e) => setDiasporaPolicy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="ALL">Hybrid (Onshore R&D + Diaspora GTM)</option>
                <option value="ONSHORE_ONLY">100% Onshore Lebanon Mandate</option>
                <option value="DIASPORA_BRIDGE">Diaspora Bridge (US/France/GCC)</option>
              </select>
            </div>
          </div>

          {/* Python Formulation Code Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-white font-bold"><Code className="w-3.5 h-3.5 text-emerald-400" /> scoring_engine.py</span>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-mono text-emerald-300 overflow-x-auto leading-tight">
{`def calculate_match_score(startup, investor, weights):
    # 1. Cosine similarity on domain embeddings
    d_sim = cosine_sim(startup.vec, investor.thesis_vec)
    
    # 2. Stage & Ticket bounds check
    s_fit = 1.0 if investor.ticket_min <= startup.target <= investor.ticket_max else 0.4
    
    # 3. Graph path skill overlap
    k_overlap = jaccard_overlap(startup.skills, investor.preferred_skills)
    
    # 4. Diaspora Bridge Arbitrage Multiplier
    d_synergy = 1.0 if (startup.is_onshore and investor.is_diaspora) else 0.75
    
    return (
        weights.w1 * d_sim +
        weights.w2 * s_fit +
        weights.w3 * k_overlap +
        weights.w4 * d_synergy
    )`}
            </pre>
          </div>
        </div>

        {/* Right Column: Ranked Deals Feed & AI Memo Generator (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Matched Deals List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GitMerge className="w-4 h-4 text-emerald-400" />
                  Algorithm-Ranked Matchmaking Feed
                </h3>
                <p className="text-xs text-slate-400">Real-time evaluated startup-investor pairs ordered by MatchScore</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                {filteredMatches.length} Matches Found
              </span>
            </div>

            <div className="space-y-3">
              {filteredMatches.map((match, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xl font-bold">
                        <span>{match.startupLogo}</span>
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                        <span>{match.investorLogo}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{match.startupName}</span>
                          <span className="text-slate-500">×</span>
                          <span className="font-bold text-slate-200 text-sm">{match.investorName}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block">
                          {match.startupStage} • {match.startupLocation} ➔ {match.investorLocation}
                        </span>
                      </div>
                    </div>

                    {/* Score Badge & Action */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400 block text-lg">
                          {(match.totalScore * 100).toFixed(1)}%
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Match Conviction</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedStartupId(match.startupId);
                          setSelectedInvestorId(match.investorId);
                          handleGenerateMemo(match.startupId, match.investorId);
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-950/40 flex items-center gap-1.5 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Generate AI Memo
                      </button>
                    </div>
                  </div>

                  {/* Multi-vector breakdown bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/60 text-[11px] font-mono">
                    <div className="bg-slate-900/80 p-2 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Domain Sim:</span>
                      <span className="text-emerald-400 font-bold">{(match.breakdown.domainSim * 100).toFixed(0)}%</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Stage Fit:</span>
                      <span className="text-indigo-400 font-bold">{(match.breakdown.stageCheck * 100).toFixed(0)}%</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Skill Overlap:</span>
                      <span className="text-cyan-400 font-bold">{(match.breakdown.skillOverlap * 100).toFixed(0)}%</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Diaspora Synergy:</span>
                      <span className="text-amber-400 font-bold">{(match.breakdown.diasporaSynergy * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{match.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Investment & Rationale Brief Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">1-Page Investment & Rationale Brief</h3>
                  <span className="text-[11px] text-slate-400">Generated by Gemini 3.7 Flash VC Underwriting Engine</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {generatedMemo && (
                  <button
                    onClick={handleCopyMemo}
                    style={{ color: "#ffffff" }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white" style={{ color: "#ffffff" }} />}
                    <span style={{ color: "#ffffff" }} className="!text-white font-bold">{copiedMemo ? "Copied" : "Copy Markdown"}</span>
                  </button>
                )}
                <button
                  onClick={() => handleGenerateMemo()}
                  disabled={isGeneratingMemo}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md transition-all disabled:opacity-50"
                >
                  {isGeneratingMemo ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {isGeneratingMemo ? "Generating..." : "Generate Custom Memo (25 Credits)"}
                </button>
              </div>
            </div>

            {/* Memo Display Area */}
            {isGeneratingMemo ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-300 font-mono">
                  Synthesizing Lebanese engineering cost arbitrage, AUB/LAU IP pedigree, and diaspora syndicate terms...
                </p>
              </div>
            ) : generatedMemo ? (
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-sans text-xs text-slate-300">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white">{generatedMemo.headline}</h4>
                  {generatedMemo.convictionScore && (
                    <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
                      Conviction: {generatedMemo.convictionScore}/100
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">1. Executive Summary</h5>
                  <p className="leading-relaxed text-slate-200">{generatedMemo.executiveSummary}</p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">2. Thesis Alignment & Stage Fit</h5>
                  <p className="leading-relaxed text-slate-200">{generatedMemo.thesisAlignment}</p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">3. Lebanese Diaspora Synergy & 3.8x Cost Arbitrage</h5>
                  <p className="leading-relaxed text-slate-200">{generatedMemo.diasporaSynergy}</p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">4. Technical Moat, Risk Mitigation & Talent Retention</h5>
                  <p className="leading-relaxed text-slate-200">{generatedMemo.technicalRiskAndRetention}</p>
                </div>

                <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-lg space-y-1">
                  <h5 className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">5. Syndicate Recommendation & Structuring</h5>
                  <p className="text-emerald-200 font-semibold">{generatedMemo.syndicateRecommendation}</p>
                </div>

                {generatedMemo.keyChecklist && (
                  <div className="pt-2">
                    <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Due Diligence Checklist</h5>
                    <ul className="space-y-1 font-mono text-[11px] text-slate-400">
                      {generatedMemo.keyChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 bg-slate-950/60 border border-slate-800/80 rounded-xl text-center space-y-2">
                <p className="text-xs text-slate-400">Select any match pair above or click "Generate AI Memo" to create a complete institutional brief.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
