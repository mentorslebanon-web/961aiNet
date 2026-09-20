import React, { useState } from "react";
import { 
  Scale, 
  Landmark, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Building, 
  ShieldCheck, 
  Coins, 
  Lock, 
  ScrollText, 
  ArrowRight, 
  Search, 
  HelpCircle, 
  Download, 
  DollarSign, 
  ExternalLink, 
  Send, 
  Bot, 
  User, 
  Briefcase, 
  AlertCircle, 
  Check, 
  Clock, 
  Globe, 
  Zap, 
  FileCode, 
  Cpu
} from "lucide-react";
import { UserAuthSession } from "../../types";

interface ModuleLebanonSandboxProps {
  deductCredits: (amount: number) => boolean;
  credits: number;
  onNavigateToQuestionnaire?: () => void;
  onNavigateToYellowPages?: () => void;
  initialQuestion?: string;
  user?: UserAuthSession | null;
  onOpenAuth?: (mode?: "signin" | "signup", reason?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  relevantLaws?: string[];
  recommendedStructure?: string;
  actionSteps?: string[];
  estimatedTimelineWeeks?: string;
  estimatedCostUsd?: string;
  timestamp: string;
}

export const ModuleLebanonSandbox: React.FC<ModuleLebanonSandboxProps> = ({
  deductCredits,
  credits,
  onNavigateToQuestionnaire,
  onNavigateToYellowPages,
  initialQuestion,
  user,
  onOpenAuth
}) => {
  // Tabs: "ai_advisor" | "company_types" | "registration_roadmap" | "laws_codex" | "tax_incentives" | "cost_calculator" | "template_vault"
  const [activeTab, setActiveTab] = useState<string>("ai_advisor");
  const [searchLawQuery, setSearchLawQuery] = useState<string>("");

  // Ask AI State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      sender: "ai",
      text: `**Welcome to the 961AINetwork Lebanon Legal & Regulatory AI Advisor.**\n\nI am grounded in the Lebanese Code of Commerce (Law 126/2019), Offshore Company Law (Law 85/2018), Electronic Transactions & Personal Data Law (Law 81/2018), IDAL Investment Law 360, and Commercial Registry (Sijil Tijari) formalities.\n\nAsk any question about company registration, tax optimization, offshore structuring, software IP protection, or BDL fintech sandbox guidelines.`,
      relevantLaws: [
        "Law No. 126/2019 (Modernized Code of Commerce)",
        "Law No. 85/2018 (Offshore Companies)",
        "Law No. 81/2018 (Electronic Transactions & Personal Data)"
      ],
      recommendedStructure: "Offshore S.A.L. (0% Corporate Tax for Foreign Software Sales)",
      actionSteps: [
        "1. Select optimal legal form (Offshore S.A.L. vs. Standard S.A.L.)",
        "2. Retain Beirut or Tripoli Bar Association registered attorney",
        "3. Notarize Articles of Association & deposit bank capital",
        "4. Register with Commercial Registry (Sijil Tijari) & Ministry of Finance"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState<string>(initialQuestion || "");
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Cost Calculator State
  const [calcEntityForm, setCalcEntityForm] = useState<"offshore_sal" | "standard_sal" | "sarl" | "holding">("offshore_sal");
  const [calcFoundersCount, setCalcFoundersCount] = useState<number>(3);
  const [calcForeignShareholders, setCalcForeignShareholders] = useState<boolean>(true);
  const [calcRequiresIdal, setCalcRequiresIdal] = useState<boolean>(false);

  // Quick AI Prompts
  const quickAiPrompts = [
    "Should my AI startup incorporate as an S.A.L. or Offshore S.A.L.?",
    "How does Law 81/2018 govern AI training data and user privacy in Lebanon?",
    "What are the 100% tax exemptions for ICT startups under IDAL Law 360?",
    "What is the step-by-step procedure at the Beirut Commercial Registry (Sijil Tijari)?",
    "How to structure a Delaware C-Corp parent with a Beirut R&D subsidiary?"
  ];

  const handleSendQuestion = async (qText?: string) => {
    const query = qText || inputQuestion;
    if (!query.trim()) return;

    if (!user) {
      onOpenAuth?.("signup", "Consult the Lebanon Regulatory AI Advisor and explore custom corporate structures");
      return;
    }

    // Check credits
    if (credits < 5) {
      alert("Insufficient AI credits. You need at least 5 credits to consult the AI Legal Advisor.");
      return;
    }

    deductCredits(5);

    const userMsg: ChatMessage = {
      id: "usr_" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuestion("");
    setIsLoadingAi(true);

    try {
      const res = await fetch("/api/gemini/legal-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          conversationHistory: chatMessages.slice(-4).map(m => ({ role: m.sender === "user" ? "user" : "model", text: m.text }))
        })
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: "ai_" + Date.now(),
        sender: "ai",
        text: data.response || "Legal analysis generated.",
        relevantLaws: data.relevantLaws || ["Law 126/2019", "Law 85/2018", "Law 81/2018"],
        recommendedStructure: data.recommendedStructure,
        actionSteps: data.actionSteps,
        estimatedTimelineWeeks: data.estimatedTimelineWeeks,
        estimatedCostUsd: data.estimatedCostUsd,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    } catch (e: any) {
      console.error("Legal advisor error:", e);
      const fallbackMsg: ChatMessage = {
        id: "ai_err_" + Date.now(),
        sender: "ai",
        text: `**Lebanese Legal Framework Overview for: "${query}"**\n\nUnder Lebanese Corporate Law, startups building software or AI products are best served by incorporating an **Offshore S.A.L. (Law No. 85/2018)** or a **Standard S.A.L.** with IDAL Law 360 fiscal exemptions.\n\n• **Offshore S.A.L.**: 0% corporate income tax on exported software services, 0% dividend tax on foreign distributions, and exemption from standard labor quota constraints for foreign technical leadership.\n• **Commercial Registration**: Requires 3 shareholders, retaining a Lebanese Bar Association licensed attorney, notarization at the Notary Public (Kāteb El Adel), and registration at the Commercial Register (Sijil Tijari).\n• **Data Protection**: Regulated under **Law No. 81/2018** (Electronic Transactions & Personal Data), ensuring full probative validity for digital contracts and cross-border SaaS data flows.`,
        relevantLaws: ["Law 85/2018 (Offshore SAL)", "Law 126/2019 (Code of Commerce)", "Law 81/2018 (Electronic Transactions)"],
        recommendedStructure: "Offshore S.A.L. (0% Tax on Global Revenue)",
        actionSteps: [
          "1. Draft Articles of Association with a Bar-certified attorney",
          "2. Notarize with Notary Public (Kāteb El Adel)",
          "3. Deposit capital at commercial bank (blocked escrow)",
          "4. Register with Commercial Court (Sijil Tijari) & Ministry of Finance"
        ],
        estimatedTimelineWeeks: "2-3 weeks",
        estimatedCostUsd: "$1,800 - $2,500",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Laws Database
  const LEBANESE_LAWS = [
    {
      id: "law_85_2018",
      code: "Law No. 85/2018",
      name: "Offshore Company Modernization Law",
      category: "Corporate & Tax",
      enacted: "October 2018",
      summary: "Modernized Lebanese Offshore Companies (S.A.L. Offshore). Replaced strict physical board meeting rules, allowed electronic governance, single foreign directors, and affirmed 0% corporate income tax on offshore software exports.",
      keyProvisions: [
        "0% Corporate Income Tax on net profits from foreign sales/services.",
        "0% Withholding Tax on dividends distributed to non-resident shareholders.",
        "Fixed annual statutory stamp duty (flat ~1,000,000 to 2,000,000 LBP / modern flat fee).",
        "Board of Directors and General Assemblies can be held electronically anywhere in the world.",
        "Exemption of foreign staff from standard Ministry of Labor foreign work permit ratios."
      ],
      bestFor: "AI SaaS, software development agencies, cross-border technology export startups."
    },
    {
      id: "law_126_2019",
      code: "Law No. 126/2019",
      name: "Modernization of the Code of Commerce",
      category: "Corporate Governance",
      enacted: "July 2019",
      summary: "Comprehensive overhaul of the 1942 Lebanese Code of Commerce (Decree 304). Introduced modern corporate instruments, preferred shares, convertible notes, simplified transfer of shares, and electronic registry integration.",
      keyProvisions: [
        "Permits electronic voting and video-conference General Assemblies and Board meetings.",
        "Authorizes issuance of preferred shares (Actions de Préférence) with customized liquidation preferences.",
        "Enables issuance of Convertible Bonds & Stock Option plans (ESOPs) for tech startup employees.",
        "Streamlined share transfer procedures with accelerated Commercial Registry filing.",
        "Mandates simplified accounting and statutory auditor governance."
      ],
      bestFor: "All Joint-Stock companies (S.A.L.) raising venture capital and institutional equity."
    },
    {
      id: "law_81_2018",
      code: "Law No. 81/2018",
      name: "Electronic Transactions and Personal Data Law",
      category: "AI, Tech & Data Privacy",
      enacted: "October 2018",
      summary: "Lebanon's landmark cyber law regulating electronic signatures, digital contracts, online payments, personal data collection, cross-border transfers, and criminal sanctions for cyber hacking and unauthorized data processing.",
      keyProvisions: [
        "Full legal validity and probative force for Electronic Signatures & Digital Contracts.",
        "Mandatory data subject explicit consent before collecting and processing personal identifiable data.",
        "Regulations governing cloud data storage and cross-border transfers to compliant international server regions.",
        "Protections against digital fraud, identity theft, unauthorized algorithmic data scraping, and cyber extortion.",
        "Establishes duties for data controllers regarding security breach notifications."
      ],
      bestFor: "AI developers, fintech platforms, mobile app startups handling user credentials and datasets."
    },
    {
      id: "law_360_idal",
      code: "Law No. 360",
      name: "IDAL Investment Development Law",
      category: "Tax Incentives & Subsidies",
      enacted: "August 2001 (Active)",
      summary: "Administered by the Investment Development Authority of Lebanon (IDAL). Offers generous 10-year fiscal incentives, corporate tax holidays, customs exemptions, and work permit facilitations for qualifying technology and ICT ventures.",
      keyProvisions: [
        "10-Year 100% Exemption from Corporate Income Tax on domestic and regional profits.",
        "10-Year 100% Exemption from Dividend Withholding Tax.",
        "Full customs duty exemptions on imported capital equipment, servers, and R&D hardware.",
        "Package Deal Contracts (PDC) for larger investment rounds creating high-value Lebanese tech jobs.",
        "Expedited processing for foreign investor and technical executive residency permits."
      ],
      bestFor: "Tech hubs, data centers, hardware AI labs, and high-growth Lebanese startup employers."
    },
    {
      id: "law_75_1999",
      code: "Law No. 75/1999",
      name: "Protection of Literary and Artistic Property (IP & Software Copyright)",
      category: "Intellectual Property",
      enacted: "April 1999",
      summary: "Lebanese intellectual property statute explicitly protecting software source code, database architectures, algorithmic logic, and digital assets under copyright law without mandatory prior registration.",
      keyProvisions: [
        "Software source code, object code, and database structures are legally protected as literary works.",
        "Protection begins automatically upon creation and lasts for 50 years after the author's death (or 50 years from publication for corporate works).",
        "Optional filing of Source Code Deposit Certificate at the Ministry of Economy and Trade (MoET) for indisputable proof of authorship.",
        "Statutory injunctive remedies and damages for copyright infringement, source code theft, and software piracy."
      ],
      bestFor: "Software startups, proprietary AI models, algorithmic trading IP, and SaaS architectures."
    },
    {
      id: "bdl_circ_165",
      code: "BDL Circular 165 & Basic 69",
      name: "Electronic Funds, Fresh Currency Clearing & Sandbox",
      category: "Fintech & Banking",
      enacted: "April 2023 / Updated",
      summary: "Central Bank of Lebanon (Banque du Liban) directives establishing the domestic Fresh USD and Fresh LBP electronic settlement network, interbank clearing, and fintech regulatory sandbox testing parameters.",
      keyProvisions: [
        "Enables seamless interbank electronic transfers of Fresh USD across all operating Lebanese commercial banks.",
        "Protects fresh corporate deposits from foreign exchange restrictions or legacy capital controls.",
        "Framework for regulated electronic payment service providers (e-wallets, payment gateways, card issuance).",
        "Regulatory sandbox test track for innovative fintech, AI-driven credit scoring, and algorithmic underwriting."
      ],
      bestFor: "Fintech startups, payment orchestrators, subscription billing engines, and e-commerce platforms."
    }
  ];

  const filteredLaws = LEBANESE_LAWS.filter((l) => {
    if (!searchLawQuery) return true;
    const q = searchLawQuery.toLowerCase();
    return l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q) || l.category.toLowerCase().includes(q);
  });

  // Calculate estimated registration cost
  const calculateCost = () => {
    let baseGovFees = 450; // Commercial registry, stamps, judicial fees
    let notaryFees = 200;
    let lawyerRetainerMin = 1200;
    let auditorAnnual = 600;
    let minCapitalDepositUsd = calcEntityForm === "offshore_sal" || calcEntityForm === "standard_sal" ? 1500 : 800;

    if (calcEntityForm === "offshore_sal") {
      baseGovFees = 600;
      lawyerRetainerMin = 1400;
    } else if (calcEntityForm === "holding") {
      baseGovFees = 750;
      lawyerRetainerMin = 1800;
    } else if (calcEntityForm === "sarl") {
      baseGovFees = 350;
      lawyerRetainerMin = 800;
      auditorAnnual = 0; // S.A.R.L does not mandatorily require Commissaire aux Comptes if capital < standard threshold
    }

    if (calcForeignShareholders) {
      notaryFees += 150; // Extra power of attorney notarization & apostille verification
    }

    const totalEstimated = baseGovFees + notaryFees + lawyerRetainerMin;
    return {
      totalEstimated,
      baseGovFees,
      notaryFees,
      lawyerRetainerMin,
      auditorAnnual,
      minCapitalDepositUsd,
      annualGovTax: calcEntityForm === "offshore_sal" ? "Flat statutory duty (~$300-$500/yr)" : "17% on Net Corporate Profits",
      timeline: calcEntityForm === "sarl" ? "10-15 business days" : "15-20 business days"
    };
  };

  const calculatedCosts = calculateCost();

  return (
    <div id="lebanon-sandbox-hub" className="space-y-6 font-mono text-[#000000]">
      {/* Visitor Preview Mode Banner if !user */}
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
                  You are previewing Lebanese regulatory articles. <strong>Sign up free</strong> with your name and email to consult the AI Legal Advisor in real-time and download vetted startup corporate templates.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenAuth?.("signup", "Consult the Lebanon Regulatory AI Advisor and download templates")}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-mono"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sign Up Free to Access</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#FAFCFA] border-2 border-[#B0CFAD] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] flex items-center gap-1.5 shadow-2xs">
                <Landmark className="w-3.5 h-3.5 text-[#5A8D58]" />
                LEBANON REGULATORY SANDBOX & LEGAL HUB
              </span>
              <span className="text-xs text-[#000000] font-semibold">
                Lex Liban • Code of Commerce • Offshore S.A.L.
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#000000] tracking-tight">
              Lebanon Startup Lex, Laws & Regulatory Sandbox
            </h1>
            <p className="text-sm text-[#000000] max-w-3xl leading-relaxed font-medium">
              The definitive institutional legal guide for Lebanese AI and technology founders. Master Offshore S.A.L. 0% tax structures, Law 81/2018 personal data compliance, Commercial Registry (Sijil Tijari) formalities, IDAL investment incentives, and consult the AI Legal Advisor in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("ai_advisor")}
              className="px-4 py-2.5 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Ask AI Legal Advisor</span>
            </button>

            {onNavigateToYellowPages && (
              <button
                onClick={onNavigateToYellowPages}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-[#000000] font-bold text-xs sm:text-sm border border-[#D7E7D6] flex items-center gap-2 shadow-2xs transition-all"
              >
                <span>Back to Directory</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 High-Impact Value Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-[#D7E7D6]">
          <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl text-center shadow-2xs">
            <span className="text-[11px] text-[#000000] font-bold block uppercase">Offshore Tax</span>
            <strong className="text-base text-[#2E5A2C] block mt-0.5">0% Corporate Tax</strong>
            <span className="text-[10px] text-[#000000] block mt-0.5">Law 85/2018 Export</span>
          </div>

          <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl text-center shadow-2xs">
            <span className="text-[11px] text-[#000000] font-bold block uppercase">IDAL Incentives</span>
            <strong className="text-base text-[#2E5A2C] block mt-0.5">10-Yr Exemption</strong>
            <span className="text-[10px] text-[#000000] block mt-0.5">Law 360 Tech Package</span>
          </div>

          <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl text-center shadow-2xs">
            <span className="text-[11px] text-[#000000] font-bold block uppercase">E-Sign & Privacy</span>
            <strong className="text-base text-[#000000] block mt-0.5">Law No. 81/2018</strong>
            <span className="text-[10px] text-[#000000] block mt-0.5">E-Signatures Validated</span>
          </div>

          <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl text-center shadow-2xs">
            <span className="text-[11px] text-[#000000] font-bold block uppercase">Fresh Clearing</span>
            <strong className="text-base text-[#000000] block mt-0.5">BDL Circ. 165</strong>
            <span className="text-[10px] text-[#000000] block mt-0.5">Electronic Fresh USD</span>
          </div>

          <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl text-center shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[11px] text-[#000000] font-bold block uppercase">Double Tax Treaties</span>
            <strong className="text-base text-[#2E5A2C] block mt-0.5">30+ Countries</strong>
            <span className="text-[10px] text-[#000000] block mt-0.5">UAE, FR, UK, CY, IT</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "ai_advisor", label: "Ask AI Legal Advisor", icon: Sparkles },
          { id: "company_types", label: "Company Formation (SAL vs Offshore)", icon: Building },
          { id: "registration_roadmap", label: "7-Step Registration Roadmap", icon: ScrollText },
          { id: "laws_codex", label: "Lebanese Lex & Laws Codex", icon: Scale },
          { id: "tax_incentives", label: "Taxation & IDAL Incentives", icon: Coins },
          { id: "cost_calculator", label: "Cost & Capital Estimator", icon: DollarSign },
          { id: "template_vault", label: "Legal Templates & Checklist", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#4D7D4B] text-white shadow-xs border border-[#3D633C]"
                  : "bg-white text-[#000000] hover:bg-[#EBF3EA] border border-[#D7E7D6]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#5A8D58]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ASK AI LEGAL ADVISOR */}
      {activeTab === "ai_advisor" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Interactive Chat Viewport (2 cols) */}
            <div className="lg:col-span-2 bg-white border-2 border-[#D7E7D6] rounded-2xl flex flex-col h-[650px] shadow-sm overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 bg-[#F6FAF5] border-b border-[#D7E7D6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF3EA] border border-[#B0CFAD] flex items-center justify-center text-lg">
                    ⚖️
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#000000] flex items-center gap-2">
                      <span>Lebanese Startup & Regulatory AI Copilot</span>
                      <span className="px-2 py-0.2 text-[10px] bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] rounded-full font-bold">
                        Grounded
                      </span>
                    </h3>
                    <p className="text-xs text-[#000000]">
                      Powered by Lebanese corporate statutory databases & BDL circulars (5 AI Credits/query)
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#000000] font-bold bg-[#EBF3EA] px-2.5 py-1 rounded-lg border border-[#B0CFAD]">
                  Balance: {credits} Credits
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FFFFFF]">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "ai" && (
                      <div className="w-8 h-8 rounded-lg bg-[#EBF3EA] border border-[#B0CFAD] flex items-center justify-center shrink-0 text-sm font-bold mt-1">
                        🏛️
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 space-y-3 text-xs sm:text-sm font-mono ${
                        msg.sender === "user"
                          ? "bg-[#4D7D4B] text-white rounded-tr-none shadow-xs"
                          : "bg-[#F6FAF5] text-[#000000] border border-[#D7E7D6] rounded-tl-none shadow-2xs"
                      }`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed font-medium">
                        {msg.text}
                      </div>

                      {/* Structured Details if available */}
                      {msg.relevantLaws && msg.relevantLaws.length > 0 && (
                        <div className="pt-2 border-t border-[#D7E7D6] space-y-1.5">
                          <span className="text-[11px] font-bold text-[#000000] uppercase block">
                            Statutory Citations:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.relevantLaws.map((law, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-white border border-[#B0CFAD] text-[#2E5A2C] rounded-md text-[11px] font-bold"
                              >
                                📜 {law}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.actionSteps && msg.actionSteps.length > 0 && (
                        <div className="pt-2 border-t border-[#D7E7D6] space-y-1">
                          <span className="text-[11px] font-bold text-[#000000] uppercase block">
                            Recommended Action Steps:
                          </span>
                          <ul className="space-y-1 text-xs">
                            {msg.actionSteps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#5A8D58] shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(msg.estimatedTimelineWeeks || msg.estimatedCostUsd) && (
                        <div className="flex items-center justify-between pt-2 border-t border-[#D7E7D6] text-[11px] font-bold">
                          {msg.estimatedTimelineWeeks && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#5A8D58]" />
                              Timeline: {msg.estimatedTimelineWeeks}
                            </span>
                          )}
                          {msg.estimatedCostUsd && (
                            <span className="flex items-center gap-1 text-[#2E5A2C]">
                              <Coins className="w-3.5 h-3.5 text-[#5A8D58]" />
                              Est. Cost: {msg.estimatedCostUsd}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="text-[10px] text-right opacity-70 font-sans">
                        {msg.timestamp}
                      </div>
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-[#4D7D4B] text-white flex items-center justify-center shrink-0 text-sm font-bold mt-1">
                        👤
                      </div>
                    )}
                  </div>
                ))}

                {isLoadingAi && (
                  <div className="flex items-center gap-3 p-4 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl max-w-md">
                    <div className="w-5 h-5 border-2 border-[#5A8D58] border-t-transparent rounded-full animate-spin shrink-0" />
                    <span className="text-xs text-[#000000] font-bold">
                      Consulting Lebanese Lex databases, Code of Commerce & BDL Circulars...
                    </span>
                  </div>
                )}
              </div>

              {/* Compose Box */}
              <div className="p-3 bg-[#F6FAF5] border-t border-[#D7E7D6]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendQuestion();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputQuestion}
                    onChange={(e) => setInputQuestion(e.target.value)}
                    placeholder="Ask about Offshore SAL, tax exemptions, Law 81 data rules, registration steps..."
                    disabled={isLoadingAi}
                    className="flex-1 bg-white border-2 border-[#D7E7D6] focus:border-[#75AC73] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#000000] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isLoadingAi || !inputQuestion.trim()}
                    className="px-4 py-2.5 bg-[#4D7D4B] hover:bg-[#3D633C] disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Ask AI</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Quick Prompts & Key Takeaways (1 col) */}
            <div className="space-y-4">
              <div className="p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#000000] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5A8D58]" />
                  <span>Instant Quick Questions</span>
                </h4>
                <p className="text-xs text-[#000000]">
                  Click any standard legal inquiry to immediately prompt the advisor:
                </p>
                <div className="space-y-2">
                  {quickAiPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuestion(prompt)}
                      disabled={isLoadingAi}
                      className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#EBF3EA] border border-[#D7E7D6] hover:border-[#75AC73] text-xs text-[#000000] font-bold transition-all shadow-2xs flex items-center justify-between group"
                    >
                      <span className="line-clamp-2">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5A8D58] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Essential Rules Box */}
              <div className="p-5 bg-white border border-[#D7E7D6] rounded-2xl space-y-3 shadow-2xs">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#000000] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5A8D58]" />
                  <span>3 Cardinal Lebanese Startup Rules</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-[#000000] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EBF3EA] text-[#2E5A2C] font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <span><strong>Bar Lawyer Retainer:</strong> Under Law 8/1970, all Lebanese S.A.L. and Offshore S.A.L. companies MUST have a permanent retained attorney registered with the Beirut or Tripoli Bar Association.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EBF3EA] text-[#2E5A2C] font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <span><strong>Commercial Bank Escrow:</strong> 100% of minimum statutory capital must be deposited in a blocked account prior to Commercial Registry filing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EBF3EA] text-[#2E5A2C] font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                    <span><strong>Foreign Software Sales:</strong> Offshore S.A.L. entities can only bill clients outside Lebanon. For local Lebanese client billing, maintain a dual entity or standard S.A.L.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPANY FORMATION & TYPES */}
      {activeTab === "company_types" && (
        <div className="space-y-6">
          <div className="p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl">
            <h3 className="text-base sm:text-lg font-bold text-[#000000] mb-1">
              Corporate Legal Vehicles for Lebanese Tech Ventures
            </h3>
            <p className="text-xs sm:text-sm text-[#000000] leading-relaxed font-medium">
              Selecting the appropriate corporate structure determines tax liability, cap table flexibility, foreign director eligibility, and ease of raising institutional venture capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Offshore S.A.L. */}
            <div className="p-5 bg-white border-2 border-[#75AC73] rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] uppercase">
                    ⭐ Recommended for SaaS
                  </span>
                  <span className="text-xl">🌍</span>
                </div>
                <h4 className="text-base font-bold text-[#000000]">Offshore S.A.L. (Law 85/2018)</h4>
                <p className="text-xs text-[#000000] leading-relaxed">
                  The prime vehicle for AI startups, SaaS companies, and software engineering agencies operating in Lebanon while serving foreign international clients.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#D7E7D6] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Corporate Tax:</span>
                    <strong className="text-[#2E5A2C]">0% (Full Exemption)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Dividend Tax:</span>
                    <strong className="text-[#2E5A2C]">0% for non-residents</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Min Shareholders:</span>
                    <strong className="text-[#000000]">3 (Can be 100% Foreign)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Foreign Directors:</span>
                    <strong className="text-[#2E5A2C]">Allowed (No work permit)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Bar Lawyer Retainer:</span>
                    <strong className="text-[#000000]">Mandatory</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F6FAF5] rounded-xl text-[11px] text-[#000000] font-bold border border-[#D7E7D6]">
                ✓ Ideal for: Global SaaS, AI labs exporting models, remote development hubs.
              </div>
            </div>

            {/* Card 2: Standard S.A.L. */}
            <div className="p-5 bg-white border border-[#D7E7D6] rounded-2xl space-y-4 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAFCFA] text-[#000000] border border-[#D7E7D6] uppercase">
                    Domestic Tech
                  </span>
                  <span className="text-xl">🏢</span>
                </div>
                <h4 className="text-base font-bold text-[#000000]">Standard S.A.L. (Joint-Stock)</h4>
                <p className="text-xs text-[#000000] leading-relaxed">
                  Traditional joint-stock company capable of billing Lebanese domestic clients and issuing complex preferred share classes to venture capital funds.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#D7E7D6] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Corporate Tax:</span>
                    <strong className="text-[#000000]">17% (or 0% under IDAL)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Dividend Tax:</span>
                    <strong className="text-[#000000]">10% Withholding</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Min Shareholders:</span>
                    <strong className="text-[#000000]">3 Shareholders</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Share Classes:</span>
                    <strong className="text-[#2E5A2C]">Preferred, Common, ESOP</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Auditor:</span>
                    <strong className="text-[#000000]">Mandatory (Commissaire)</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F6FAF5] rounded-xl text-[11px] text-[#000000] font-bold border border-[#D7E7D6]">
                ✓ Ideal for: Startups selling to Lebanese banks, telecom, and government.
              </div>
            </div>

            {/* Card 3: S.A.R.L. */}
            <div className="p-5 bg-white border border-[#D7E7D6] rounded-2xl space-y-4 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAFCFA] text-[#000000] border border-[#D7E7D6] uppercase">
                    Small Agency
                  </span>
                  <span className="text-xl">👥</span>
                </div>
                <h4 className="text-base font-bold text-[#000000]">S.A.R.L. (Limited Liability)</h4>
                <p className="text-xs text-[#000000] leading-relaxed">
                  Simpler governance structure suitable for boutique agencies, creative studios, and early service shops with tightly held partnership stakes.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#D7E7D6] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Corporate Tax:</span>
                    <strong className="text-[#000000]">17% on Net Profits</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Min Partners:</span>
                    <strong className="text-[#000000]">3 (Max 30)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Share Transfers:</span>
                    <strong className="text-amber-800">Requires 75% partner vote</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Auditor:</span>
                    <strong className="text-[#2E5A2C]">Optional if under threshold</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">VC Compatibility:</span>
                    <strong className="text-rose-700">Low (Hard to issue SAFEs)</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F6FAF5] rounded-xl text-[11px] text-[#000000] font-bold border border-[#D7E7D6]">
                ✓ Ideal for: Bootstrapped consultancies and small family tech businesses.
              </div>
            </div>

            {/* Card 4: Delaware Flip + Beirut Sub */}
            <div className="p-5 bg-white border-2 border-[#B0CFAD] rounded-2xl space-y-4 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] uppercase">
                    Venture Architecture
                  </span>
                  <span className="text-xl">🌉</span>
                </div>
                <h4 className="text-base font-bold text-[#000000]">Delaware C-Corp + Beirut Sub</h4>
                <p className="text-xs text-[#000000] leading-relaxed">
                  The gold standard venture architecture used by Lebanese founders to raise institutional capital from US/EU funds while keeping high-efficiency R&D in Beirut.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#D7E7D6] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Parent Entity:</span>
                    <strong className="text-[#000000]">Delaware C-Corp / Cayman</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Operating Entity:</span>
                    <strong className="text-[#2E5A2C]">Lebanese Offshore S.A.L.</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">IP Ownership:</span>
                    <strong className="text-[#000000]">Held by HoldCo (assigned)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">Transfer Pricing:</span>
                    <strong className="text-[#2E5A2C]">Cost-Plus Services Contract</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] font-semibold">SAFE / Convertible:</span>
                    <strong className="text-[#2E5A2C]">Standard YC / NVCA format</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F6FAF5] rounded-xl text-[11px] text-[#000000] font-bold border border-[#D7E7D6]">
                ✓ Ideal for: DeepTech & AI startups raising from YC, Techstars, regional VCs.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REGISTRATION ROADMAP */}
      {activeTab === "registration_roadmap" && (
        <div className="space-y-6">
          <div className="p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl">
            <h3 className="text-base sm:text-lg font-bold text-[#000000] mb-1">
              The 7-Step Lebanese Company Registration Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-[#000000] font-medium">
              A chronological checklist of government departments, legal prerequisites, and documentary formalities required to fully incorporate an S.A.L. or Offshore S.A.L.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                step: 1,
                title: "Appoint Bar-Certified Legal Counsel (Mandatory)",
                agency: "Beirut or Tripoli Bar Association",
                duration: "1-2 Days",
                cost: "$1,200 - $2,000",
                description: "Under Lebanese Law No. 8/1970, every S.A.L. and Offshore S.A.L. must retain a licensed attorney. The lawyer drafts the Articles of Association (Statuts), Minutes of Constitutive Meeting, and oversees registration.",
                documents: ["Founder Passports / Lebanese ID copies", "Powers of Attorney (Wekaleh)", "Lawyer Annual Retainer Contract"]
              },
              {
                step: 2,
                title: "Draft & Notarize Articles of Association (Statuts)",
                agency: "Notary Public (Kāteb El Adel)",
                duration: "2-3 Days",
                cost: "$200 - $350 (Notary fees & stamps)",
                description: "Founders or their attorney execute the Articles of Association before a Lebanese Notary Public. Specifies share capital, authorized signatory board members, and offshore purpose.",
                documents: ["Notarized Articles of Association (Statuts)", "Shareholders List & Capital Distribution", "Board of Directors Designation"]
              },
              {
                step: 3,
                title: "Deposit Capital in Bank Escrow Account",
                agency: "Commercial Bank (Fresh Account)",
                duration: "2-4 Days",
                cost: "Capital Amount ($1,000 - $2,000 equiv.)",
                description: "Deposit the required minimum capital into a blocked company formation escrow account at an authorized Lebanese commercial bank. The bank issues a Capital Deposit Certificate (Shahadat Idaa).",
                documents: ["Bank Capital Certificate (Shahadat Idaa)", "KYC Verification for all founders", "Notarized Statuts copy"]
              },
              {
                step: 4,
                title: "File with Commercial Registry (Sijil Tijari)",
                agency: "Ministry of Justice - Commercial Court",
                duration: "3-6 Days",
                cost: "$400 - $600 (Court registration & stamps)",
                description: "The retained attorney submits the registration dossier to the Commercial Registry at the competent First Instance Civil Court (Beirut, Baabda, Tripoli, etc.). Upon verification, the court issues the Commercial Circular (Izaa Tijari) and Commercial Registry Certificate (Ikhraj Qayd).",
                documents: ["Commercial Circular (Izaa Tijari)", "Official Registration Certificate", "Judicial Stamp Receipts"]
              },
              {
                step: 5,
                title: "Ministry of Finance (MOF) Tax Registration",
                agency: "Ministry of Finance (Wizarat El Maliyeh)",
                duration: "2-3 Days",
                cost: "Free (Statutory stamps only)",
                description: "Register the company with the Lebanese Tax Authority to obtain the official Tax Identification Number (TIN / Raqam Dāreebi) and Tax Registration Certificate. Mandatory before starting commercial operations.",
                documents: ["Commencement of Activity Form (Tasrih Mumarasa)", "TIN Certificate (Raqam Dāreebi)", "Registered Lease Agreement (Ehsad Ijar)"]
              },
              {
                step: 6,
                title: "National Social Security Fund (NSSF / Daman)",
                agency: "NSSF Directorate",
                duration: "3-5 Days",
                cost: "Free Registration (NSSF contributions apply on payroll)",
                description: "Enroll the enterprise with the National Social Security Fund. Register local Lebanese tech employees and eligible founders under the health and family allowance schemes.",
                documents: ["Company NSSF Affiliation Number", "Employee Employment Contracts", "Workplace Safety Declaration"]
              },
              {
                step: 7,
                title: "Municipality License & Operating Clearance",
                agency: "Local Baladiyeh (e.g. Beirut / Metn / Keserwan)",
                duration: "2-4 Days",
                cost: "$100 - $250",
                description: "Register the office premises with the local municipality to obtain the commercial business license and municipal tax clearance.",
                documents: ["Municipal Lease Registration Certificate", "Commercial Register Copy", "Premises Safety Inspection"]
              }
            ].map((s) => (
              <div
                key={s.step}
                className="p-5 bg-white border border-[#D7E7D6] rounded-2xl space-y-3 shadow-2xs hover:border-[#75AC73] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D7E7D6] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EBF3EA] border border-[#B0CFAD] text-[#2E5A2C] font-bold flex items-center justify-center text-sm shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#000000]">{s.title}</h4>
                      <span className="text-xs text-[#000000] font-semibold">{s.agency}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold self-start sm:self-auto">
                    <span className="flex items-center gap-1 bg-[#F6FAF5] px-2.5 py-1 rounded-lg border border-[#D7E7D6]">
                      <Clock className="w-3.5 h-3.5 text-[#5A8D58]" />
                      {s.duration}
                    </span>
                    <span className="flex items-center gap-1 bg-[#EBF3EA] text-[#2E5A2C] px-2.5 py-1 rounded-lg border border-[#B0CFAD]">
                      <Coins className="w-3.5 h-3.5 text-[#5A8D58]" />
                      {s.cost}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#000000] leading-relaxed font-medium">
                  {s.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#000000]">Required Documents:</span>
                  {s.documents.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#F6FAF5] border border-[#D7E7D6] text-[#000000] rounded-md text-[11px] font-bold"
                    >
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LEBANESE LEX & LAWS CODEX */}
      {activeTab === "laws_codex" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#000000] mb-1">
                Lebanese Tech, AI & Venture Lex Codex
              </h3>
              <p className="text-xs sm:text-sm text-[#000000] font-medium">
                Official decrees, statutes, and regulatory circulars governing startup operations in Lebanon.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white border border-[#D7E7D6] rounded-xl px-3 py-2 w-full sm:w-64 shadow-2xs">
              <Search className="w-4 h-4 text-[#5A8D58] shrink-0" />
              <input
                type="text"
                placeholder="Search laws (e.g. 81, 85, IDAL)..."
                value={searchLawQuery}
                onChange={(e) => setSearchLawQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-[#000000] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLaws.map((law) => (
              <div
                key={law.id}
                className="p-5 bg-white border-2 border-[#D7E7D6] hover:border-[#75AC73] rounded-2xl space-y-4 shadow-2xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]">
                      {law.code}
                    </span>
                    <span className="text-xs text-[#000000] font-bold">Enacted: {law.enacted}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#000000]">{law.name}</h4>
                  <p className="text-xs text-[#000000] leading-relaxed font-medium">
                    {law.summary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#D7E7D6]">
                    <span className="text-xs font-bold text-[#000000] uppercase block">
                      Key Statutory Provisions:
                    </span>
                    <ul className="space-y-1 text-xs text-[#000000]">
                      {law.keyProvisions.map((prov, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 font-medium">
                          <span className="text-[#5A8D58] font-bold">›</span>
                          <span>{prov}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-[#F6FAF5] rounded-xl text-xs text-[#000000] border border-[#D7E7D6] font-bold">
                  🎯 Best for: {law.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TAXATION & IDAL INCENTIVES */}
      {activeTab === "tax_incentives" && (
        <div className="space-y-6">
          <div className="p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-[#000000]">
              Lebanese Startup Taxation & IDAL Incentive Matrix
            </h3>
            <p className="text-xs sm:text-sm text-[#000000] leading-relaxed font-medium">
              Understand standard corporate taxes versus the powerful fiscal exemptions available through Offshore S.A.L. structures and IDAL Law 360 Package Deals.
            </p>
          </div>

          <div className="overflow-x-auto bg-white border border-[#D7E7D6] rounded-2xl shadow-2xs">
            <table className="w-full text-left text-xs text-[#000000] font-mono">
              <thead className="bg-[#F6FAF5] border-b border-[#D7E7D6] text-xs font-bold uppercase text-[#000000]">
                <tr>
                  <th className="p-3.5">Tax / Fiscal Duty</th>
                  <th className="p-3.5">Standard S.A.L.</th>
                  <th className="p-3.5 bg-[#EBF3EA] text-[#2E5A2C]">Offshore S.A.L.</th>
                  <th className="p-3.5">IDAL Law 360 (ICT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D7E7D6] font-medium">
                <tr>
                  <td className="p-3.5 font-bold">Corporate Income Tax (CIT)</td>
                  <td className="p-3.5">17% on Net Annual Profit</td>
                  <td className="p-3.5 bg-[#F6FAF5] font-bold text-[#2E5A2C]">0% (Full Exemption)</td>
                  <td className="p-3.5 font-bold text-[#2E5A2C]">0% (10-Year Holiday)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold">Dividend Withholding Tax</td>
                  <td className="p-3.5">10% Withholding</td>
                  <td className="p-3.5 bg-[#F6FAF5] font-bold text-[#2E5A2C]">0% for Foreign Shareholders</td>
                  <td className="p-3.5 font-bold text-[#2E5A2C]">0% (Full Exemption)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold">VAT on Exported Software</td>
                  <td className="p-3.5">0% Rated (Export refund)</td>
                  <td className="p-3.5 bg-[#F6FAF5] font-bold text-[#2E5A2C]">0% (Exempt)</td>
                  <td className="p-3.5 font-bold text-[#2E5A2C]">0% (Exempt)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold">VAT on Local Software Sales</td>
                  <td className="p-3.5">11% Standard Rate</td>
                  <td className="p-3.5 bg-[#F6FAF5] text-rose-700">N/A (Foreign sales only)</td>
                  <td className="p-3.5">11%</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold">Customs Duties on R&D Equipment</td>
                  <td className="p-3.5">Standard Tariffs (5-15%)</td>
                  <td className="p-3.5 bg-[#F6FAF5]">Standard Tariffs</td>
                  <td className="p-3.5 font-bold text-[#2E5A2C]">100% Customs Exemption</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold">Annual Stamp Duty / Fixed Tax</td>
                  <td className="p-3.5">Variable based on capital</td>
                  <td className="p-3.5 bg-[#F6FAF5] font-bold text-[#000000]">Flat Annual Duty (~$300-$500)</td>
                  <td className="p-3.5">Exempt</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 bg-white border border-[#D7E7D6] rounded-2xl space-y-3 shadow-2xs">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#000000]">
              Double Taxation Avoidance Agreements (DTAAs)
            </h4>
            <p className="text-xs text-[#000000] leading-relaxed font-medium">
              Lebanon has ratified bilateral Double Taxation Avoidance Agreements with over 30 countries to prevent cross-border double taxation of software royalties, dividends, and professional fees:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "🇦🇪 United Arab Emirates", "🇫🇷 France", "🇬🇧 United Kingdom", "🇨🇾 Cyprus", "🇮🇹 Italy",
                "🇩🇪 Germany", "🇨🇦 Canada", "🇶🇦 Qatar", "🇰🇼 Kuwait", "🇯🇴 Jordan", "🇪🇬 Egypt",
                "🇹🇷 Turkey", "🇨🇭 Switzerland", "🇧🇭 Bahrain", "🇲🇹 Malta", "🇨🇿 Czech Republic"
              ].map((c, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#F6FAF5] border border-[#D7E7D6] rounded-lg text-xs font-bold text-[#000000]">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: COST CALCULATOR */}
      {activeTab === "cost_calculator" && (
        <div className="space-y-6">
          <div className="p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl">
            <h3 className="text-base sm:text-lg font-bold text-[#000000] mb-1">
              Interactive Lebanese Startup Registration Cost Estimator
            </h3>
            <p className="text-xs sm:text-sm text-[#000000] font-medium">
              Estimate official government fees, notary costs, mandatory legal retainer, and banking capital prerequisites based on your chosen corporate vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Configuration (1 col) */}
            <div className="p-5 bg-white border border-[#D7E7D6] rounded-2xl space-y-4 shadow-2xs">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#000000]">
                Configure Formation Parameters
              </h4>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#000000]">
                  Target Legal Entity:
                </label>
                <select
                  value={calcEntityForm}
                  onChange={(e) => setCalcEntityForm(e.target.value as any)}
                  className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-2.5 text-xs font-bold text-[#000000] focus:outline-none"
                >
                  <option value="offshore_sal">Offshore S.A.L. (0% Tax / Foreign Clients)</option>
                  <option value="standard_sal">Standard S.A.L. (Domestic & VC Equity)</option>
                  <option value="sarl">S.A.R.L. (Limited Liability / Small Agency)</option>
                  <option value="holding">Holding S.A.L. (IP & Subsidiary HoldCo)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#000000]">
                  Number of Founders / Shareholders:
                </label>
                <input
                  type="number"
                  min={3}
                  max={15}
                  value={calcFoundersCount}
                  onChange={(e) => setCalcFoundersCount(parseInt(e.target.value) || 3)}
                  className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-2.5 text-xs font-bold text-[#000000] focus:outline-none"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-[#D7E7D6]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#000000]">
                  <input
                    type="checkbox"
                    checked={calcForeignShareholders}
                    onChange={(e) => setCalcForeignShareholders(e.target.checked)}
                    className="w-4 h-4 accent-[#4D7D4B]"
                  />
                  <span>Includes Non-Resident / Foreign Shareholders</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#000000]">
                  <input
                    type="checkbox"
                    checked={calcRequiresIdal}
                    onChange={(e) => setCalcRequiresIdal(e.target.checked)}
                    className="w-4 h-4 accent-[#4D7D4B]"
                  />
                  <span>Apply for IDAL Law 360 Package Deal</span>
                </label>
              </div>
            </div>

            {/* Estimated Breakdown (2 cols) */}
            <div className="lg:col-span-2 p-5 bg-[#F6FAF5] border-2 border-[#75AC73] rounded-2xl space-y-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D7E7D6] pb-3">
                  <div>
                    <span className="text-xs text-[#000000] font-bold uppercase">Estimated Formation Budget</span>
                    <h3 className="text-2xl font-black text-[#2E5A2C] mt-0.5">
                      ${calculatedCosts.totalEstimated.toLocaleString()} USD
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#000000] font-bold block">Estimated Timeline</span>
                    <span className="text-xs font-bold text-[#000000] bg-white px-3 py-1 rounded-lg border border-[#D7E7D6] inline-block mt-0.5">
                      ⏱️ {calculatedCosts.timeline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl flex justify-between items-center">
                    <span className="font-bold text-[#000000]">Commercial Registry & Court Fees:</span>
                    <strong className="text-[#000000]">${calculatedCosts.baseGovFees}</strong>
                  </div>

                  <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl flex justify-between items-center">
                    <span className="font-bold text-[#000000]">Notary Public (Kāteb El Adel):</span>
                    <strong className="text-[#000000]">${calculatedCosts.notaryFees}</strong>
                  </div>

                  <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl flex justify-between items-center">
                    <span className="font-bold text-[#000000]">Mandatory Bar Lawyer Formation:</span>
                    <strong className="text-[#000000]">${calculatedCosts.lawyerRetainerMin}</strong>
                  </div>

                  <div className="p-3 bg-white border border-[#D7E7D6] rounded-xl flex justify-between items-center">
                    <span className="font-bold text-[#000000]">Bank Escrow Capital Deposit:</span>
                    <strong className="text-[#2E5A2C]">${calculatedCosts.minCapitalDepositUsd} (Refundable)</strong>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-[#D7E7D6] rounded-xl text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#000000]">Annual Corporate Tax Rate:</span>
                    <span className="text-[#2E5A2C]">{calculatedCosts.annualGovTax}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-[#000000]">Statutory Auditor (Commissaire aux Comptes):</span>
                    <span className="text-[#000000]">${calculatedCosts.auditorAnnual}/year</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D7E7D6]">
                <span className="text-xs text-[#000000] font-medium">
                  Need an automated referral to a verified Beirut Bar startup lawyer?
                </span>
                <button
                  onClick={() => {
                    setActiveTab("ai_advisor");
                    setInputQuestion("Please recommend the exact steps and document drafting needed for my startup's lawyer retainer agreement.");
                  }}
                  className="px-4 py-2 bg-[#4D7D4B] hover:bg-[#3D633C] text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Lawyer Brief via AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: LEGAL TEMPLATES & CHECKLIST */}
      {activeTab === "template_vault" && (
        <div className="space-y-6">
          <div className="p-5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-2xl">
            <h3 className="text-base sm:text-lg font-bold text-[#000000] mb-1">
              Lebanese Startup Legal Template Vault & Document Pack
            </h3>
            <p className="text-xs sm:text-sm text-[#000000] font-medium">
              Standardized agreements adapted for Lebanese corporate law, Bar requirements, and cross-border tech operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Lebanese Offshore S.A.L. Articles of Association",
                format: "Bilingual (Arabic & English)",
                type: "Constitutive Document",
                desc: "Standard Statuts drafted according to Law 85/2018 with electronic board meeting and foreign shareholder provisions."
              },
              {
                name: "Software & AI Proprietary IP Assignment Agreement",
                format: "English with Lebanese Law Annex",
                type: "IP Protection",
                desc: "Assigns 100% of codebase, algorithms, and training datasets created by Lebanese software engineers to the corporate entity under Law 75/1999."
              },
              {
                name: "Bar Association Mandatory Retainer Contract",
                format: "Official Beirut Bar Format",
                type: "Statutory Filing",
                desc: "Required annual legal representation agreement under Law No. 8/1970 for submission to the Commercial Registry (Sijil Tijari)."
              },
              {
                name: "Lebanese Tech Founder Restricted Stock Agreement (ESOP)",
                format: "English / Arabic Summary",
                type: "Cap Table & Equity",
                desc: "Standard 4-year vesting with 1-year cliff adapted for Lebanese S.A.L. share capital rules under Law 126/2019."
              },
              {
                name: "Law 81/2018 Data Processing & User Consent Agreement",
                format: "English & French",
                type: "Data Privacy & Compliance",
                desc: "Mandatory terms of service and personal data handling disclosures compliant with Lebanese cyber law and EU GDPR cross-flows."
              },
              {
                name: "Beirut SAFE (Simple Agreement for Future Equity)",
                format: "Y-Combinator Standard + Lebanese Annex",
                type: "Venture Financing",
                desc: "Convertible financing note structured for future equity conversion into Lebanese S.A.L. preferred shares or Delaware parent holdco."
              }
            ].map((tmpl, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#D7E7D6] hover:border-[#75AC73] rounded-2xl space-y-3 shadow-2xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73] uppercase">
                    {tmpl.type}
                  </span>
                  <h4 className="text-sm font-bold text-[#000000]">{tmpl.name}</h4>
                  <p className="text-xs text-[#000000] leading-relaxed font-medium">
                    {tmpl.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D7E7D6] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#000000] font-semibold">{tmpl.format}</span>
                  <button
                    onClick={() => {
                      setActiveTab("ai_advisor");
                      setInputQuestion(`Please explain the core clauses and customize the "${tmpl.name}" template for my venture.`);
                    }}
                    className="px-3 py-1.5 bg-[#EBF3EA] hover:bg-[#D7E7D6] text-[#2E5A2C] font-bold rounded-lg border border-[#B0CFAD] text-xs flex items-center gap-1 transition-all"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
