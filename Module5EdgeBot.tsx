import React, { useState } from "react";
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Building2, 
  CheckCircle2, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  FileSpreadsheet,
  ArrowRight,
  Info,
  HelpCircle
} from "lucide-react";

export const OffshoreTaxCalculatorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [teamSize, setTeamSize] = useState<number>(6);
  const [avgDevSalaryUsd, setAvgDevSalaryUsd] = useState<number>(3200); // Monthly USD per dev
  const [exportRevenueAnnualUsd, setExportRevenueAnnualUsd] = useState<number>(450000);
  const [operationalOverheadUsd, setOperationalOverheadUsd] = useState<number>(25000); // Annual cloud/legal/office

  if (!isOpen) return null;

  // Calculations
  const annualPayroll = teamSize * avgDevSalaryUsd * 12;
  const totalAnnualExpenses = annualPayroll + operationalOverheadUsd;
  const taxableProfit = Math.max(0, exportRevenueAnnualUsd - totalAnnualExpenses);

  // 1. Lebanon Offshore S.A.L. (0% Corporate Tax on foreign client exports, Fixed 5,000,000 LBP stamp fee ~ $55/year)
  const lebanonOffshoreTax = 55; // Nominal annual flat stamp duty
  const lebanonPayrollTaxExemption = 0; // Circular 165 direct fresh USD payroll incentives
  const lebanonTotalTax = lebanonOffshoreTax;
  const lebanonNetRetained = exportRevenueAnnualUsd - totalAnnualExpenses - lebanonTotalTax;

  // 2. Delaware C-Corp / US Onshore (21% Federal + ~8% State + Franchise Tax)
  const delawareCorpTaxRate = 0.28;
  const delawareTotalTax = taxableProfit * delawareCorpTaxRate + 450; // Franchise tax
  const delawareNetRetained = exportRevenueAnnualUsd - totalAnnualExpenses - delawareTotalTax;

  // 3. UAE Free Zone (DIFC / ADGM / DMCC - 9% Corporate Tax above AED 375k + ~$12k annual license & visa overhead)
  const uaeTaxableUsdThreshold = 102000;
  const uaeTaxableAmount = Math.max(0, taxableProfit - uaeTaxableUsdThreshold);
  const uaeCorpTax = uaeTaxableAmount * 0.09;
  const uaeLicenseAndVisaFees = 12500; // Annual office/visa/license in DIFC/DMCC
  const uaeTotalTax = uaeCorpTax + uaeLicenseAndVisaFees;
  const uaeNetRetained = exportRevenueAnnualUsd - totalAnnualExpenses - uaeTotalTax;

  // Savings vs Delaware
  const savingsVsDelaware = Math.max(0, delawareTotalTax - lebanonTotalTax);
  const runwayExtensionMonths = annualPayroll > 0 ? ((savingsVsDelaware / (annualPayroll / 12)).toFixed(1)) : "0";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-mono">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#D7E7D6] bg-[#FAFCFA] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EA] border border-[#B0CFAD] flex items-center justify-center text-[#2E5A2C]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-[#000000] leading-tight">
                  Lebanon 0% Offshore S.A.L. & Runway Engine
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                  Decree-Law 46/1983
                </span>
              </div>
              <p className="text-xs text-slate-600 font-sans">
                Simulate your tax delta and runway extension comparing Beirut Offshore S.A.L. vs. Delaware C-Corp vs. UAE Freezones.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#000000]">
          {/* Top Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F6FAF5] border border-[#D7E7D6]">
            {/* Input 1: Team Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Team Size (AI Devs)</span>
                <span className="text-[#2E5A2C] font-black">{teamSize} engineers</span>
              </label>
              <input
                type="range"
                min={1}
                max={40}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#4D7D4B]"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 Dev</span>
                <span>40 Devs</span>
              </div>
            </div>

            {/* Input 2: Avg Monthly Salary */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Avg Monthly Salary</span>
                <span className="text-[#2E5A2C] font-black">${avgDevSalaryUsd.toLocaleString()}/mo</span>
              </label>
              <input
                type="range"
                min={1200}
                max={8500}
                step={100}
                value={avgDevSalaryUsd}
                onChange={(e) => setAvgDevSalaryUsd(Number(e.target.value))}
                className="w-full accent-[#4D7D4B]"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$1.2k (Junior)</span>
                <span>$8.5k (Principal)</span>
              </div>
            </div>

            {/* Input 3: Export Annual Revenue */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Annual Foreign Revenue</span>
                <span className="text-[#2E5A2C] font-black">${exportRevenueAnnualUsd.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={50000}
                max={3000000}
                step={25000}
                value={exportRevenueAnnualUsd}
                onChange={(e) => setExportRevenueAnnualUsd(Number(e.target.value))}
                className="w-full accent-[#4D7D4B]"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$50k</span>
                <span>$3.0M+</span>
              </div>
            </div>

            {/* Input 4: Overhead */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Annual Cloud/Legal</span>
                <span className="text-[#2E5A2C] font-black">${operationalOverheadUsd.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={5000}
                max={150000}
                step={5000}
                value={operationalOverheadUsd}
                onChange={(e) => setOperationalOverheadUsd(Number(e.target.value))}
                className="w-full accent-[#4D7D4B]"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$5k</span>
                <span>$150k</span>
              </div>
            </div>
          </div>

          {/* Key Metric Highlight Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#EBF3EA] border-2 border-[#B0CFAD] space-y-1">
              <div className="text-[11px] font-bold text-[#2E5A2C] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Annual Tax & Fee Savings</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#2E5A2C]">
                +${Math.round(savingsVsDelaware).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-700 font-sans">
                Retained capital vs. US Delaware structure.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-1">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4D7D4B]" />
                <span>Runway Extended</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#000000]">
                +{runwayExtensionMonths} Months
              </div>
              <div className="text-[11px] text-slate-700 font-sans">
                Extra developer burn financed purely by zero corporate tax.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border-2 border-[#D7E7D6] space-y-1">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-[#4D7D4B]" />
                <span>Effective Tax Rate</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#2E5A2C]">
                0.01%
              </div>
              <div className="text-[11px] text-slate-700 font-sans">
                Subject only to flat 5M LBP annual stamp duty.
              </div>
            </div>
          </div>

          {/* Detailed 3-Jurisdiction Comparative Ledger */}
          <div className="rounded-xl border border-[#D7E7D6] overflow-hidden">
            <div className="bg-[#F6FAF5] px-4 py-3 border-b border-[#D7E7D6] flex items-center justify-between">
              <span className="font-bold text-xs text-[#000000] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#4D7D4B]" />
                <span>Jurisdictional Breakdown (Annual USD Basis)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-sans">Simulated 2026 Fiscal Framework</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#D7E7D6] text-slate-700 font-bold text-[11px]">
                    <th className="p-3">Jurisdiction</th>
                    <th className="p-3">Gross Revenue</th>
                    <th className="p-3">Payroll & Burn</th>
                    <th className="p-3">Tax & Gov Fees</th>
                    <th className="p-3 text-right">Net Cash Retained</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBF3EA]">
                  {/* Lebanon Offshore S.A.L. */}
                  <tr className="bg-[#F6FAF5]/60 hover:bg-[#EBF3EA]/80 transition-colors font-bold">
                    <td className="p-3 flex items-center gap-2">
                      <span className="text-base">🇱🇧</span>
                      <div>
                        <div className="text-[#2E5A2C] font-black">Lebanon Offshore S.A.L.</div>
                        <div className="text-[10px] text-slate-500 font-normal">Decree-Law 46/1983 • 0% Export CIT</div>
                      </div>
                    </td>
                    <td className="p-3">${exportRevenueAnnualUsd.toLocaleString()}</td>
                    <td className="p-3">${totalAnnualExpenses.toLocaleString()}</td>
                    <td className="p-3 text-[#2E5A2C] font-black">${lebanonTotalTax.toLocaleString()}</td>
                    <td className="p-3 text-right text-base text-[#2E5A2C] font-black">
                      ${Math.round(lebanonNetRetained).toLocaleString()}
                    </td>
                  </tr>

                  {/* UAE Freezone (DIFC/ADGM) */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 flex items-center gap-2">
                      <span className="text-base">🇦🇪</span>
                      <div>
                        <div className="font-bold text-[#000000]">UAE Free Zone (DIFC/ADGM)</div>
                        <div className="text-[10px] text-slate-500">9% CIT above AED 375k + License Costs</div>
                      </div>
                    </td>
                    <td className="p-3">${exportRevenueAnnualUsd.toLocaleString()}</td>
                    <td className="p-3">${totalAnnualExpenses.toLocaleString()}</td>
                    <td className="p-3 text-rose-700 font-bold">${Math.round(uaeTotalTax).toLocaleString()}</td>
                    <td className="p-3 text-right font-bold text-[#000000]">
                      ${Math.round(uaeNetRetained).toLocaleString()}
                    </td>
                  </tr>

                  {/* Delaware C-Corp */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 flex items-center gap-2">
                      <span className="text-base">🇺🇸</span>
                      <div>
                        <div className="font-bold text-[#000000]">US Delaware C-Corp</div>
                        <div className="text-[10px] text-slate-500">21% Fed + State CIT + Franchise Tax</div>
                      </div>
                    </td>
                    <td className="p-3">${exportRevenueAnnualUsd.toLocaleString()}</td>
                    <td className="p-3">${totalAnnualExpenses.toLocaleString()}</td>
                    <td className="p-3 text-rose-700 font-bold">${Math.round(delawareTotalTax).toLocaleString()}</td>
                    <td className="p-3 text-right font-bold text-[#000000]">
                      ${Math.round(delawareNetRetained).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Footnotes */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 space-y-2 font-sans">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#4D7D4B]" />
              <span>Key Structuring Pillars for Lebanese DeepTech Startups:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Foreign Client Invoicing:</strong> All AI SaaS subscriptions, custom models, and advisory contracts billed to clients outside Lebanon are completely exempt from 17% corporate income tax.</li>
              <li><strong>Fresh Dollar Banking (BDL Circular 165):</strong> Local fresh dollar accounts are segregated from legacy balance sheets, enabling frictionless inbound SWIFT and outbound payroll.</li>
              <li><strong>Hybrid Delaware-Lebanon Sandwich:</strong> Standard institutional setup: Incorporate a Delaware C-Corp or Cayman HoldCo for US/GCC VC fundraising while operating 100% of R&D as a wholly owned Lebanese Offshore S.A.L. subsidiary under cost-plus model.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#D7E7D6] bg-[#FAFCFA] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 font-sans">
            Need a turnkey Offshore S.A.L. registration or standard cost-plus transfer pricing agreement?
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-white border border-[#D7E7D6] hover:bg-[#EBF3EA] text-[#000000] rounded-lg font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#4D7D4B]" />
              <span>Export PDF Pro-Forma</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#4D7D4B] hover:bg-[#3D633C] text-white rounded-lg font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
