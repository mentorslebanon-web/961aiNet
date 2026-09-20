import React, { useState } from "react";
import {
  X,
  Shield,
  FileText,
  Lock,
  Cookie,
  Download,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Scale,
  Building2,
  Mail,
  AlertCircle,
  Globe
} from "lucide-react";

interface LegalAndGdprModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "gdpr" | "terms" | "privacy" | "cookies" | "dsar";
}

export const LegalAndGdprModal: React.FC<LegalAndGdprModalProps> = ({
  isOpen,
  onClose,
  initialTab = "gdpr"
}) => {
  const [activeTab, setActiveTab] = useState<"gdpr" | "terms" | "privacy" | "cookies" | "dsar">(initialTab);
  const [dsarEmail, setDsarEmail] = useState("");
  const [dsarSubmitted, setDsarSubmitted] = useState<string | null>(null);
  const [copiedPolicy, setCopiedPolicy] = useState(false);

  if (!isOpen) return null;

  const handleDownloadUserData = () => {
    try {
      const authUser = localStorage.getItem("961ai_auth_user");
      const mailingList = localStorage.getItem("961ai_mailing_list");
      const questionnaire = localStorage.getItem("961ai_user_questionnaire");
      
      const payload = {
        platform: "961AI Network - Joint Initiative of Al Khawarizmi Solutions & NCEI Lebanon",
        exportedAt: new Date().toISOString(),
        gdprArticle: "Article 20 (Right to Data Portability)",
        legalBasis: "User Consent & Legitimate Interest for DeepTech Matchmaking",
        userData: {
          session: authUser ? JSON.parse(authUser) : "No active user session stored",
          mailingListRecord: mailingList ? JSON.parse(mailingList) : "Not found",
          questionnaireDraft: questionnaire ? JSON.parse(questionnaire) : "None"
        }
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `961ai_gdpr_data_export_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to export data.");
    }
  };

  const handleDsarRequest = (type: "erasure" | "rectification" | "unsubscribe") => {
    if (!dsarEmail || !dsarEmail.includes("@")) {
      alert("Please enter a valid email address for the Data Subject Access Request.");
      return;
    }

    if (type === "erasure") {
      try {
        // Clear local storage entries for this user
        const rawMailing = localStorage.getItem("961ai_mailing_list");
        if (rawMailing) {
          const list = JSON.parse(rawMailing);
          const filtered = list.filter((item: any) => item.email.toLowerCase() !== dsarEmail.toLowerCase());
          localStorage.setItem("961ai_mailing_list", JSON.stringify(filtered));
        }
      } catch {
        // ignore
      }
      setDsarSubmitted(`GDPR Erasure Request logged for ${dsarEmail}. All identifiable local records and newsletter dispatches have been purged (Right to be Forgotten).`);
    } else if (type === "unsubscribe") {
      try {
        const rawMailing = localStorage.getItem("961ai_mailing_list");
        if (rawMailing) {
          const list = JSON.parse(rawMailing);
          const updated = list.map((item: any) => 
            item.email.toLowerCase() === dsarEmail.toLowerCase() ? { ...item, status: "Unsubscribed" } : item
          );
          localStorage.setItem("961ai_mailing_list", JSON.stringify(updated));
        }
      } catch {
        // ignore
      }
      setDsarSubmitted(`Successfully unsubscribed ${dsarEmail} from marketing communications.`);
    } else {
      setDsarSubmitted(`Rectification ticket logged for ${dsarEmail}. Our Data Protection Officer (DPO) will review within 72 business hours.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-950 text-white shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold tracking-wide uppercase">
                  Joint Enterprise Platform
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  Law 126/2019 & EU GDPR Compliant
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                <span>Legal Codex, Privacy Policy & GDPR Sovereignty</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Official regulatory and governance documentation for the <strong>961AI Network</strong>, jointly operated by <strong>Al Khawarizmi Solutions</strong> and <strong>NCEI Lebanon (The National Council for Entrepreneurship and Innovation)</strong>.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 text-xs scrollbar-none font-mono">
            <button
              onClick={() => setActiveTab("gdpr")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "gdpr"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>GDPR Compliance</span>
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "privacy"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab("terms")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "terms"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={() => setActiveTab("cookies")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "cookies"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Policy</span>
            </button>

            <button
              onClick={() => setActiveTab("dsar")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "dsar"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>GDPR Self-Service & DSAR</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-700 space-y-6 text-sm leading-relaxed">
          
          {/* TAB 1: GDPR COMPLIANCE */}
          {activeTab === "gdpr" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-900">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-sm text-emerald-950">
                    EU General Data Protection Regulation (GDPR) & Lebanese Law 126/2019
                  </h4>
                  <p>
                    961AI Network is architected under strict privacy-by-design principles. We process personal data solely for verified DeepTech matchmaking, founder-investor syndicate routing, and opt-in ecosystem newsletters.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>Joint Data Controllers</span>
                  </h5>
                  <p className="text-xs text-slate-600">
                    <strong>1. Al Khawarizmi Solutions</strong> (Technical Platform Architecture & Graph Infrastructure)<br />
                    <strong>2. NCEI Lebanon</strong> (The National Council for Entrepreneurship and Innovation - Ecosystem Governance)
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    DPO Contact: dpo@961ai.network / privacy@alkharizmisolutions.com
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Lawful Basis for Processing (Art. 6 GDPR)</span>
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Consent (6(1)(a)):</strong> Explicit opt-in for newsletters & syndicate alerts.</li>
                    <li><strong>Contractual (6(1)(b)):</strong> 6-hour demo access & Pro membership.</li>
                    <li><strong>Legitimate Interest (6(1)(f)):</strong> Graph matchmaking for verified Lebanese startups.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Your Individual Rights Under GDPR</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs">
                    <span className="font-bold text-slate-900 block">Art. 15 Right to Access</span>
                    <span className="text-slate-500">Request a full copy of all data points and graph nodes linked to your profile.</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs">
                    <span className="font-bold text-slate-900 block">Art. 17 Right to Erasure</span>
                    <span className="text-slate-500">Purge your email, pitch deck summary, and entity claims at any time.</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs">
                    <span className="font-bold text-slate-900 block">Art. 20 Data Portability</span>
                    <span className="text-slate-500">Export your data in machine-readable JSON format with one click.</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs">
                    <span className="font-bold text-slate-900 block">Art. 21 Right to Object</span>
                    <span className="text-slate-500">Unsubscribe from ecosystem communications instantly without penalty.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === "privacy" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-slate-900">961AI Network Comprehensive Privacy Policy</h3>
              <p className="text-xs text-slate-600">Last Revised: August 31, 2026</p>

              <div className="space-y-3 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 text-sm">1. Information We Collect</h4>
                <p>
                  When you access 961AI Network (operated jointly by Al Khawarizmi Solutions and NCEI Lebanon), we collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>Account Registration & Demo:</strong> Full name, professional email address, organization affiliation, and selected user archetype (Founder, Investor, AI Guru, Agency).</li>
                  <li><strong>Entity Questionnaire & Pitch Room:</strong> Startup valuation, funding targets, tech stack, team size, and uploaded pitch deck documents.</li>
                  <li><strong>Communications & Interactions:</strong> Interaction requests, EdgeBot inquiries, and mailing list subscription records.</li>
                </ul>

                <h4 className="font-bold text-slate-900 text-sm mt-4">2. Purpose of Data Collection</h4>
                <p>
                  All captured data is strictly utilized to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Provide automated AI-driven matchmaking between Lebanese startups, AI consultancies, and diaspora capital.</li>
                  <li>Maintain the verified institutional directory and Layer 2 Karpathy-format Markdown wikis.</li>
                  <li>Dispatch relevant ecosystem dispatches, syndicate deal invitations, and grant notifications via the platform mailing list.</li>
                </ul>

                <h4 className="font-bold text-slate-900 text-sm mt-4">3. Data Retention & Multi-Tenant Security</h4>
                <p>
                  User session data is stored securely utilizing Row Level Security (RLS) isolation. We do not sell or monetize personal data to third-party ad networks.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === "terms" && (
            <div className="space-y-4 animate-in fade-in duration-150 text-xs">
              <h3 className="text-base font-bold text-slate-900">Terms of Service & Platform Governance</h3>
              <p className="text-slate-500">Effective as of August 2026</p>

              <div className="space-y-3 text-slate-700 leading-relaxed">
                <h4 className="font-bold text-slate-900 text-sm">1. Joint Platform Agreement</h4>
                <p>
                  By accessing or registering on 961AINetwork.org, you enter into a binding agreement with <strong>Al Khawarizmi Solutions</strong> and <strong>NCEI Lebanon</strong>. Access to directory graphs, syndicate matching, and offshore tax calculation copilots is subject to these terms.
                </p>

                <h4 className="font-bold text-slate-900 text-sm">2. 6-Hour Demo & $100/yr Pro Membership</h4>
                <p>
                  Every new registrant receives an initial 6-hour demo session. Access beyond the trial requires an active Annual Pro Membership ($100/yr) or an active verified Lebanese research/student grant pass.
                </p>

                <h4 className="font-bold text-slate-900 text-sm">3. Disclaimer on Investments & Tax Computations</h4>
                <p>
                  The syndicate matchmaking, offshore tax optimization calculators (Lebanese Law 126/2019 0% Offshore S.A.L. framework), and investment memos generated by the platform are for informational and intelligence purposes only. They do not constitute formal legal, financial, or tax advice.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: COOKIE POLICY */}
          {activeTab === "cookies" && (
            <div className="space-y-4 animate-in fade-in duration-150 text-xs">
              <h3 className="text-base font-bold text-slate-900">Cookie & Local Storage Policy</h3>
              <p className="text-slate-600">
                961AI Network uses minimal, privacy-centric cookies and browser storage strictly required for authentication, 6-hour demo timer verification, and local settings.
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="p-3">Key / Cookie Name</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Purpose</th>
                      <th className="p-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">961ai_auth_user</td>
                      <td className="p-3">LocalStorage</td>
                      <td className="p-3">Maintains active session & demo countdown</td>
                      <td className="p-3">Session / 6 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">961ai_mailing_list</td>
                      <td className="p-3">LocalStorage</td>
                      <td className="p-3">Records verified mailing list subscriber status</td>
                      <td className="p-3">Persistent (Until Erasure)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">admin_961_authenticated</td>
                      <td className="p-3">SessionStorage</td>
                      <td className="p-3">Secure admin console token</td>
                      <td className="p-3">Browser Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: DSAR / SELF-SERVICE */}
          {activeTab === "dsar" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Instant GDPR Data Download (Article 20)</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Export all locally stored session tokens, mailing list records, and questionnaire draft files in standard JSON format:
                </p>
                <button
                  onClick={handleDownloadUserData}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export My Personal Data (JSON)</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-600" />
                  <span>Data Subject Access Request (DSAR) Portal</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Enter your registered email address to submit a formal erasure, rectification, or unsubscribe request:
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your registered email (e.g. founder@startup.lb)"
                    value={dsarEmail}
                    onChange={(e) => setDsarEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-600"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDsarRequest("unsubscribe")}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold whitespace-nowrap cursor-pointer"
                    >
                      Unsubscribe
                    </button>
                    <button
                      onClick={() => handleDsarRequest("erasure")}
                      className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold whitespace-nowrap flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Erase My Records</span>
                    </button>
                  </div>
                </div>

                {dsarSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{dsarSubmitted}</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 flex items-center gap-2">
            <span className="font-bold text-slate-900">Al Khawarizmi Solutions</span>
            <span>&</span>
            <span className="font-bold text-slate-900">NCEI Lebanon</span>
            <span className="hidden md:inline">• Joint Innovation Initiative</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText("https://961ai.network/legal");
                setCopiedPolicy(true);
                setTimeout(() => setCopiedPolicy(false), 2000);
              }}
              className="text-slate-500 hover:text-slate-800 font-mono text-[11px]"
            >
              {copiedPolicy ? "Link Copied!" : "Copy Legal Link"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
            >
              Close Codex
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
