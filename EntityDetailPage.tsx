import React, { useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from "recharts";
import {
  Cpu,
  BarChart3,
  Coins,
  ShieldCheck,
  Users,
  Building,
  Sparkles,
  TrendingUp,
  Info,
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";

interface PitchRoomRadarChartProps {
  subScores: {
    techFeasibility: number;
    ipDefensibility: number;
    marketOpportunity: number;
    diasporaSynergy: number;
    unitEconomics: number;
    legalSovereignty: number;
  };
  startupName: string;
  overallScore: number;
  sector?: string;
  targetRaise?: string;
  valuationPreMoney?: string;
}

export interface RadarDataPoint {
  dimension: string;
  shortLabel: string;
  score: number;
  benchmark: number;
  threshold: number;
  category: "tech" | "market" | "valuation" | "ip" | "diaspora" | "legal";
  description: string;
  iconName: string;
}

export const PitchRoomRadarChart: React.FC<PitchRoomRadarChartProps> = ({
  subScores,
  startupName,
  overallScore,
  sector = "AI DeepTech",
  targetRaise,
  valuationPreMoney
}) => {
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [showThreshold, setShowThreshold] = useState(true);
  const [selectedDimension, setSelectedDimension] = useState<string>("Tech Stack & MLOps");

  const radarData: RadarDataPoint[] = [
    {
      dimension: "Tech Stack & MLOps",
      shortLabel: "Tech Stack",
      score: subScores.techFeasibility,
      benchmark: 72,
      threshold: 85,
      category: "tech",
      description: "AST code quality, inference latency benchmarks, containerization, test coverage & model architecture.",
      iconName: "Cpu"
    },
    {
      dimension: "Market Size (TAM/SAM)",
      shortLabel: "Market Size",
      score: subScores.marketOpportunity,
      benchmark: 70,
      threshold: 80,
      category: "market",
      description: "MENA & GCC addressable market expansion, enterprise pilot velocity, and B2B pricing power.",
      iconName: "BarChart3"
    },
    {
      dimension: "Valuation & Economics",
      shortLabel: "Valuation",
      score: subScores.unitEconomics,
      benchmark: 66,
      threshold: 80,
      category: "valuation",
      description: "SAFE post-money cap realism, gross margin sustainability ($/1k tokens), and CAC payback.",
      iconName: "Coins"
    },
    {
      dimension: "Algorithmic IP Moat",
      shortLabel: "IP Moat",
      score: subScores.ipDefensibility,
      benchmark: 68,
      threshold: 82,
      category: "ip",
      description: "Proprietary weights, custom tokenizers, fine-tuning datasets, and defensibility vs frontier LLMs.",
      iconName: "ShieldCheck"
    },
    {
      dimension: "Diaspora Synergy",
      shortLabel: "Diaspora",
      score: subScores.diasporaSynergy,
      benchmark: 62,
      threshold: 75,
      category: "diaspora",
      description: "Co-investment affinity for US/UK/GCC Lebanese diaspora tech syndicates ($1k-$5k micro-checks).",
      iconName: "Users"
    },
    {
      dimension: "Sovereign Legal / Tax",
      shortLabel: "Law 126 Structuring",
      score: subScores.legalSovereignty,
      benchmark: 74,
      threshold: 85,
      category: "legal",
      description: "Law 126/2019 Offshore S.A.L. shielding 100% of foreign software contracts with 0% corporate tax.",
      iconName: "Building"
    }
  ];

  const activePoint =
    radarData.find((d) => d.dimension === selectedDimension) || radarData[0];

  const deltaVsBenchmark = activePoint.score - activePoint.benchmark;

  return (
    <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] p-5 sm:p-6 space-y-6 shadow-xs font-mono">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#2E5A2C] text-white uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>Multi-Dimensional Due Diligence</span>
            </span>
            <span className="text-[11px] font-bold text-slate-500 font-mono">
              Recharts Radar Matrix
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1">
            Readiness & Competitiveness Radar Analysis
          </h3>
          <p className="text-xs text-slate-600 font-sans mt-0.5">
            Benchmarking <strong className="text-slate-900">{startupName}</strong> across key institutional investment pillars against regional MENA averages and Tier-1 VC thresholds.
          </p>
        </div>

        {/* Layer Toggles */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto text-xs">
          <button
            onClick={() => setShowBenchmark((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              showBenchmark
                ? "bg-amber-50 text-amber-900 border-amber-300 shadow-2xs"
                : "bg-slate-50 text-slate-500 border-slate-200"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: showBenchmark ? "#F59E0B" : "#94A3B8" }}
            ></span>
            <span>MENA Seed Benchmark</span>
          </button>

          <button
            onClick={() => setShowThreshold((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              showThreshold
                ? "bg-indigo-50 text-indigo-900 border-indigo-300 shadow-2xs"
                : "bg-slate-50 text-slate-500 border-slate-200"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: showThreshold ? "#6366F1" : "#94A3B8" }}
            ></span>
            <span>Tier-1 VC Target (80+)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Dimension Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Chart Stage (7 Cols) */}
        <div className="lg:col-span-7 bg-[#F9FBF8] rounded-2xl border border-[#D7E7D6] p-3 sm:p-4 flex flex-col items-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-[11px] text-slate-500 font-mono px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
              <strong className="text-slate-900">{startupName} (Score: {overallScore}/100)</strong>
            </span>
            <span className="text-[10px] text-slate-400">Scale: 0 – 100</span>
          </div>

          <div className="w-full h-[320px] sm:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#D7E7D6" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="shortLabel"
                  tick={{ fill: "#1E293B", fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#64748B", fontSize: 9, fontFamily: "monospace" }}
                />

                {/* MENA Seed Benchmark */}
                {showBenchmark && (
                  <Radar
                    name="MENA Seed Benchmark"
                    dataKey="benchmark"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.15}
                    strokeDasharray="4 4"
                    strokeWidth={2}
                  />
                )}

                {/* Tier-1 VC Target */}
                {showThreshold && (
                  <Radar
                    name="Tier-1 VC Threshold"
                    dataKey="threshold"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.08}
                    strokeDasharray="2 2"
                    strokeWidth={1.5}
                  />
                )}

                {/* Evaluated Startup */}
                <Radar
                  name={startupName}
                  dataKey="score"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.4}
                  strokeWidth={2.5}
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as RadarDataPoint;
                      return (
                        <div className="bg-slate-950 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs font-mono space-y-1.5 min-w-[200px]">
                          <div className="font-bold text-emerald-400 border-b border-slate-800 pb-1 flex items-center justify-between">
                            <span>{data.dimension}</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950 text-emerald-300 rounded border border-emerald-700">
                              {data.score}/100
                            </span>
                          </div>
                          <div className="text-[11px] space-y-1">
                            <div className="flex justify-between text-slate-300">
                              <span>Startup Score:</span>
                              <strong className="text-emerald-400 font-bold">{data.score}</strong>
                            </div>
                            <div className="flex justify-between text-amber-300">
                              <span>MENA Benchmark:</span>
                              <strong>{data.benchmark}</strong>
                            </div>
                            <div className="flex justify-between text-indigo-300">
                              <span>VC Target:</span>
                              <strong>{data.threshold}</strong>
                            </div>
                            <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800 text-[10px]">
                              <span>Delta vs MENA:</span>
                              <span className={data.score >= data.benchmark ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                                {data.score >= data.benchmark ? `+${data.score - data.benchmark}` : `${data.score - data.benchmark}`} pts
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[10px] text-slate-500 font-sans text-center mt-1">
            Tip: Hover over data nodes or select dimension pills below to inspect telemetry.
          </div>
        </div>

        {/* Selected Dimension Deep Dive Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Dimension Selector Pills */}
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Inspect Specific Dimension:</span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {radarData.map((d) => {
                const isSelected = selectedDimension === d.dimension;
                return (
                  <button
                    key={d.dimension}
                    onClick={() => setSelectedDimension(d.dimension)}
                    className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#2E5A2C] text-white border-[#1E3B1D] shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold truncate text-[11px]">{d.shortLabel}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {d.score}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Dimension Details Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#F4F9F3] to-white border-2 border-[#B0CFAD] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#D7E7D6] pb-2">
              <div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
                  Pillar Telemetry
                </span>
                <h4 className="text-sm font-black text-slate-900">{activePoint.dimension}</h4>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-[#2E5A2C] font-mono">
                  {activePoint.score}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">/100 Max</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              {activePoint.description}
            </p>

            {/* Performance Indicators */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
              <div className="p-2 rounded-lg bg-white border border-slate-200 space-y-0.5">
                <span className="text-slate-400 text-[10px] block">MENA Benchmark</span>
                <div className="flex items-center justify-between">
                  <strong className="text-amber-700">{activePoint.benchmark}/100</strong>
                  <span
                    className={`text-[10px] font-bold ${
                      deltaVsBenchmark >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {deltaVsBenchmark >= 0 ? `+${deltaVsBenchmark}` : `${deltaVsBenchmark}`}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-200 space-y-0.5">
                <span className="text-slate-400 text-[10px] block">VC Target (Tier-1)</span>
                <div className="flex items-center justify-between">
                  <strong className="text-indigo-700">{activePoint.threshold}/100</strong>
                  <span
                    className={`text-[10px] font-bold ${
                      activePoint.score >= activePoint.threshold ? "text-emerald-600" : "text-slate-500"
                    }`}
                  >
                    {activePoint.score >= activePoint.threshold ? "Met" : "Gap"}
                  </span>
                </div>
              </div>
            </div>

            {/* Dimension Actionable Insight */}
            <div className="text-[11px] font-sans flex items-start gap-2 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                {activePoint.category === "tech" &&
                  "Strong technical execution. Maintain clean modular AST and containerized H100 inference scripts."}
                {activePoint.category === "market" &&
                  "MENA TAM expansion shows strong regional adoption potential across banking, telecom, and enterprise SaaS."}
                {activePoint.category === "valuation" &&
                  "SAFE cap aligns with early-stage MENA and diaspora angel co-investment syndication standards."}
                {activePoint.category === "ip" &&
                  "Proprietary weights and fine-tuning datasets create defensible moat against commodity AI wrappers."}
                {activePoint.category === "diaspora" &&
                  "High diaspora syndicate co-investment affinity. Readily structured for $1k-$5k micro-tickets."}
                {activePoint.category === "legal" &&
                  "Law 126/2019 offshore holding shields overseas revenue with 0% corporate tax, maximizing investor ROI."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Core Dimension Quick Cards (Tech Stack, Market Size, Valuation) */}
      <div className="pt-2 border-t border-[#D7E7D6]">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
          Key Dimension Highlights (Tech Stack • Market Size • Valuation)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Card 1: Tech Stack */}
          <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>1. Tech Stack & MLOps</span>
              </div>
              <span className="font-mono font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                {subScores.techFeasibility}/100
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Evaluates repository architecture, latency benchmarks, AST test coverage, and model inferencing throughput.
            </p>
            <div className="text-[10px] font-mono text-emerald-800 font-bold">
              {subScores.techFeasibility >= 85 ? "Institutional Grade Architecture" : "Solid Seed Architecture"}
            </div>
          </div>

          {/* Card 2: Market Size */}
          <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <BarChart3 className="w-4 h-4 text-indigo-700" />
                <span>2. Market Size (TAM/SAM)</span>
              </div>
              <span className="font-mono font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded text-xs">
                {subScores.marketOpportunity}/100
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Evaluates MENA & Gulf addressable customer base, enterprise willingness to pay, and B2B pricing expansion.
            </p>
            <div className="text-[10px] font-mono text-indigo-800 font-bold">
              {subScores.marketOpportunity >= 85 ? "High-Velocity MENA Expansion" : "Strong Regional TAM Potential"}
            </div>
          </div>

          {/* Card 3: Valuation */}
          <div className="p-3.5 rounded-xl bg-[#F6FAF5] border border-[#B0CFAD] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Coins className="w-4 h-4 text-rose-700" />
                <span>3. Valuation Realism</span>
              </div>
              <span className="font-mono font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded text-xs">
                {subScores.unitEconomics}/100
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Evaluates post-money SAFE cap alignment, gross margin sustainability ($/token), and financial milestones.
            </p>
            <div className="text-[10px] font-mono text-rose-800 font-bold">
              {valuationPreMoney ? `Pre-Money Ask: ${valuationPreMoney}` : "Realistically Calibrated SAFE Cap"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
