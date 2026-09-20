import { WorkspaceEntry } from "../types";

export function generateStarterWorkspaceEntries(userId: string, workspaceId: string): WorkspaceEntry[] {
  const now = new Date().toISOString();

  return [
    // --------------------------------------------------------------------------
    // 1. REGIONAL ECONOMIC BLUEPRINTS
    // --------------------------------------------------------------------------
    {
      id: `seed_blueprint_1_${workspaceId}`,
      userId,
      workspaceId,
      category: "research",
      sourceType: "seed",
      title: "Lebanon AI Sovereign Blueprint 2026-2030: HPC, Power Grids & Free Zones",
      timestamp: now,
      isPinned: true,
      isGroundedActive: true,
      contentPayload: {
        title: "Lebanon AI Sovereign Blueprint 2026-2030: HPC, Power Grids & Free Zones",
        category: "research",
        tags: ["Sovereignty", "HPC", "Grid Infrastructure", "Free Zone"],
        summary: "Comprehensive multi-phase roadmap for national AI compute clusters, solar-diesel hybrid microgrids in BDD, and sovereign Arabic LLM infrastructure.",
        text: `### Executive Summary & Geopolitical Thesis
Lebanon's competitive advantage in artificial intelligence stems from an elite engineering talent pool (AUB, LAU, USJ, LU producing >2,400 STEM graduates annually), 3.8x capital efficiency versus Silicon Valley, and a globally distributed diaspora network spanning San Francisco, London, Paris, and Dubai.

### Pillar 1: Distributed Sovereign Compute
- **Phase 1 (2026)**: Deploy 128x NVIDIA H100 SXM5 / B200 nodes distributed across Beirut Digital District (BDD), Tripoli Special Economic Zone, and Berytech Innovation Parks.
- **Power Redundancy**: Dedicated 2.4MW solar-diesel microgrid with lithium iron phosphate (LiFePO4) battery buffer, guaranteeing 99.98% power uptime independent of Electricité du Liban (EDL).
- **Submarine Cable Access**: Direct low-latency interconnects via IMEWE and BERYT cable landing stations in Tripoli and Beirut, offering sub-35ms ping to Marseille and Frankfurt.

### Pillar 2: Arabic Foundation Model Specialization
- Development of "Phoenicia-1", an 8B and 70B open-weights bilingual Arabic-English LLM fine-tuned for Levantine and Gulf commercial/legal lexicons.
- Zero-cost inference endpoints for Lebanese accredited universities, research hospitals (AUBMC), and fintech sandbox participants.

### Pillar 3: Fiscal Free-Zones & Capital Inflow
- Fast-track 0% Corporate Income Tax under Offshore S.A.L. (Law 85/2018) and IDAL Law 360.
- Safe-harbor regulatory sandbox for cryptographic stablecoins (USDC/USDT) and BDL Circular 165 fresh USD clearing rails.`,
        researchDetails: {
          documentTitle: "Lebanon AI Sovereign Blueprint 2026-2030: HPC, Power Grids & Free Zones",
          categoryName: "Regional Economic Blueprints",
          authorOrEntity: "961AI Sovereign Taskforce & Al Khawarizmi Solutions",
          statutoryCitations: ["Law 85/2018 (Offshore Companies)", "IDAL Law 360/2001", "BDL Circular 165"],
          pageOrWordCount: "1,840 words / 6 pages"
        }
      }
    },
    {
      id: `seed_blueprint_2_${workspaceId}`,
      userId,
      workspaceId,
      category: "research",
      sourceType: "seed",
      title: "BDL Circular 165 & Fresh USD Fintech Regulatory Sandbox",
      timestamp: now,
      isPinned: true,
      isGroundedActive: true,
      contentPayload: {
        title: "BDL Circular 165 & Fresh USD Fintech Regulatory Sandbox",
        category: "research",
        tags: ["Fintech", "BDL 165", "Fresh USD", "Payment Rails"],
        summary: "Statutory breakdown of BDL Circular 165 authorizing commercial banks to clear electronic and check transactions in fresh US Dollars and Euros with zero legacy haircuts.",
        text: `### Overview & Legal Framework
Basic Circular No. 165 issued by Banque du Liban (BDL) establishes an independent electronic clearing system for "Fresh Funds" in US Dollars and Euros. 

### Key Provisions for AI & Tech Ventures
1. **Fresh Clearing Independence**: Payments made via check or bank transfer in fresh foreign currencies are cleared through BDL's new clearinghouse, fully segregated from pre-October 2019 legacy balances.
2. **Electronic Payment Processors**: AI SaaS companies can accept local and cross-border bank payments without currency conversion penalties.
3. **Card Processing & Merchant Gateways**: Enables Lebanese payment gateways (e.g. Purpl, Whish, Areeba, NetCommerce) to settle SaaS subscriptions and software licensing fees in unrestricted fresh USD.
4. **Cross-Border Investor Repatriation**: Dividends declared by Offshore S.A.L. entities can be transferred abroad to foreign shareholders via Circular 165 correspondent accounts with zero withholding friction.`,
        researchDetails: {
          documentTitle: "BDL Circular 165 & Fresh USD Fintech Regulatory Sandbox",
          categoryName: "Regulatory & Statutory Blueprints",
          authorOrEntity: "Banque du Liban & Ministry of Finance Legal Review",
          statutoryCitations: ["BDL Basic Circular No. 165", "Code of Money and Credit (Decree 13513)"],
          pageOrWordCount: "920 words / 3 pages"
        }
      }
    },
    {
      id: `seed_blueprint_3_${workspaceId}`,
      userId,
      workspaceId,
      category: "research",
      sourceType: "seed",
      title: "IDAL Investment Law 360: 10-Year 100% Tax Exemption Protocol",
      timestamp: now,
      isPinned: false,
      isGroundedActive: true,
      contentPayload: {
        title: "IDAL Investment Law 360: 10-Year 100% Tax Exemption Protocol",
        category: "research",
        tags: ["IDAL", "Law 360", "Tax Exemption", "Customs Relief"],
        summary: "Statutory guide to securing Package Deal Contracts (PDC) and Investment Project by Zone (IPZ) for 10-year 100% income and dividend tax relief.",
        text: `### Statutory Benefits under Law No. 360/2001
The Investment Development Authority of Lebanon (IDAL) grants maximum fiscal incentives to high-tech, media, and artificial intelligence ventures.

### Core Exemptions
- **100% Corporate Income Tax Exemption** for up to 10 consecutive years.
- **100% Exemption on Project Dividend Taxes** distributed to local and foreign shareholders.
- **Full Exemption on Customs Duties** for imported servers, GPU clusters, high-frequency switches, and laboratory equipment.
- **50% Reduction on Work & Residency Permit Fees** for international engineering specialists, with fast-track one-stop-shop processing.
- **Subsidized Industrial/Tech Land Leases** in government-designated technology zones.`,
        researchDetails: {
          documentTitle: "IDAL Investment Law 360: 10-Year 100% Tax Exemption Protocol",
          categoryName: "Tax & Fiscal Incentives",
          authorOrEntity: "IDAL (Investment Development Authority of Lebanon)",
          statutoryCitations: ["Law No. 360/2001", "Decree No. 7343/2002"],
          pageOrWordCount: "1,150 words / 4 pages"
        }
      }
    },

    // --------------------------------------------------------------------------
    // 2. ECOSYSTEM DIRECTORIES & NETWORK CONTACTS
    // --------------------------------------------------------------------------
    {
      id: `seed_contact_1_${workspaceId}`,
      userId,
      workspaceId,
      category: "contact",
      sourceType: "seed",
      title: "Dr. Jad Hobeika | Principal AI Research Scientist",
      timestamp: now,
      isPinned: true,
      isGroundedActive: true,
      contentPayload: {
        title: "Dr. Jad Hobeika",
        category: "contact",
        tags: ["Guru", "LLMs", "Ex-Meta FAIR", "Advisory", "Paris/Beirut"],
        summary: "Ex-Meta FAIR researcher specialized in LLM 4-bit/8-bit quantization and distributed CUDA kernels. Open for advisory and co-founder roles.",
        text: "Dr. Jad Hobeika is an alumnus of AUB (Computer Engineering) and PhD from ENS Paris. Spent 4 years at Meta FAIR working on LLaMA architecture optimization. Active mentor in 961AI network. Key skills: PyTorch, CUDA, vLLM, TensorRT-LLM, Quantization. Location: Paris / Beirut.",
        contactDetails: {
          name: "Dr. Jad Hobeika",
          role: "Principal AI Research Scientist",
          organization: "Ex-Meta FAIR / 961AI Guru Guild",
          email: "j.hobeika@961ai.network",
          phone: "+33 6 42 96 10 24",
          location: "Paris, France / Beirut, Lebanon",
          isDiaspora: true,
          ticketSize: "Advisory: 0.5% - 1.5% Equity",
          skillsOrThesis: ["LLM Quantization", "Distributed Systems", "CUDA Kernels", "Arabic Fine-Tuning"],
          linkedin: "https://linkedin.com/in/jad-hobeika-ai",
          notes: "Available for technical architecture due diligence and deep tech pitch advisory."
        }
      }
    },
    {
      id: `seed_contact_2_${workspaceId}`,
      userId,
      workspaceId,
      category: "contact",
      sourceType: "seed",
      title: "Cedar AI Syndicate (Silicon Valley) | Lead Angel Partner",
      timestamp: now,
      isPinned: true,
      isGroundedActive: true,
      contentPayload: {
        title: "Cedar AI Syndicate (Silicon Valley)",
        category: "contact",
        tags: ["Investor", "Seed Fund", "Diaspora Bridge", "$100k-$500k checks"],
        summary: "Silicon Valley-based Lebanese angel syndicate investing $100k-$500k in Seed/Pre-Seed startups leveraging Beirut engineering and global GTM.",
        text: "The Cedar AI Syndicate connects high-net-worth Lebanese diaspora tech executives (Google, Apple, Meta, OpenAI alumni) with ambitious Lebanese AI ventures. Minimum check: $100k; average round lead: $350k via Delaware or Abu Dhabi Global Market (ADGM) SPV. Target valuation cap: $4M - $9M.",
        contactDetails: {
          name: "Cedar AI Syndicate (Sami Khoury & Maya Zein)",
          role: "Managing General Partners",
          organization: "Cedar AI Capital LLC",
          email: "syndicate@cedar-ai.vc",
          phone: "+1 415 961 8820",
          location: "San Francisco, CA, USA",
          isDiaspora: true,
          ticketSize: "$100,000 - $500,000",
          skillsOrThesis: ["Applied AI", "Enterprise SaaS", "Sovereign Arabic Infrastructure", "Diaspora Arbitrage"],
          linkedin: "https://linkedin.com/company/cedar-ai-syndicate",
          notes: "Lead investor in 14 Lebanese deep tech startups. Prefers Delaware C-Corp parent with Beirut R&D branch."
        }
      }
    },
    {
      id: `seed_contact_3_${workspaceId}`,
      userId,
      workspaceId,
      category: "contact",
      sourceType: "seed",
      title: "Beirut Digital District (BDD) AI Lab | Ingestion & Hub Contact",
      timestamp: now,
      isPinned: false,
      isGroundedActive: true,
      contentPayload: {
        title: "Beirut Digital District (BDD) AI Lab",
        category: "contact",
        tags: ["Hub", "Incubator", "GPU Cluster", "Beirut Bachoura"],
        summary: "The primary technology hub in Beirut offering solar-backed power, high-speed fiber, and subsidized GPU workstation clusters.",
        text: "Beirut Digital District (BDD) hosts over 120 tech firms and startups. The BDD AI Lab provides co-working spaces, subsidized meeting suites, and direct liaison with Banque du Liban and IDAL. Contact: info@beirutdigitaldistrict.com.",
        contactDetails: {
          name: "BDD Ecosystem Desk (Ziad Abou Merhi)",
          role: "Ecosystem Acceleration Lead",
          organization: "Beirut Digital District (BDD 1280)",
          email: "ecosystem@beirutdigitaldistrict.com",
          phone: "+961 1 660 961",
          location: "Beirut (Bachoura), Lebanon",
          isDiaspora: false,
          ticketSize: "Co-working & Acceleration Grants",
          skillsOrThesis: ["Incubation", "Power Redundancy", "Community Quests", "Commercial Registry Support"],
          notes: "Host of 961AI monthly hackathons and diaspora investor demo days."
        }
      }
    },

    // --------------------------------------------------------------------------
    // 3. MASTER PROMPT LIBRARIES & MEETING NOTES
    // --------------------------------------------------------------------------
    {
      id: `seed_note_1_${workspaceId}`,
      userId,
      workspaceId,
      category: "note",
      sourceType: "seed",
      title: "Master Prompt Library: Karpathy LLM Grounding & Extraction Protocol",
      timestamp: now,
      isPinned: true,
      isGroundedActive: true,
      contentPayload: {
        title: "Master Prompt Library: Karpathy LLM Grounding & Extraction Protocol",
        category: "note",
        tags: ["Master Prompts", "Karpathy Wiki", "Grounding", "Extraction"],
        summary: "Pre-compiled system prompts for Andrej Karpathy-style knowledge base compilation, entity graph linking, and zero-hallucination verification.",
        text: `## Prompt 1: High-Density Entity Graph Extraction
\`\`\`markdown
You are the Principal Knowledge Ingestion Agent for 961AINetwork, following Andrej Karpathy's LLM Wiki pattern.
Given raw text (pitch deck, CV, paper, legal article):
1. Extract clean Markdown with [[Bidirectional Wikilinks]] for universities, skills, hubs, and diaspora chapters.
2. Structure output into: # Entity -> ## Core Capabilities -> ## Lebanese Links -> ## Metrics.
3. Eliminate all promotional fluff; preserve raw numbers, cap tables, and verifiable technical specs.
\`\`\`

## Prompt 2: Zero-Hallucination Grounded Chat
\`\`\`markdown
You are the Grounded z961 Intelligence Engine. Answer the user prompt STRICTLY and SOLELY using the cited sources in the user's Second Brain workspace.
- Cite specific document titles and page/section numbers: [Source: Blueprint 2026].
- If an answer cannot be deduced with 100% certainty from the provided sources, explicitly state: "NOT FOUND IN CURRENT VAULT SOURCES".
- Never invent valuations, cap tables, or statutory clauses.
\`\`\`

## Prompt 3: VC Deal Memo & Conviction Score
\`\`\`markdown
Analyze the pitch deck and financial metrics for a Lebanese AI venture.
Evaluate:
1. Technical Moat & Talent Retention (AUB/LAU engineering defensibility).
2. Cost Arbitrage: R&D cost in Beirut vs SF/London (Target >3.5x).
3. Corporate Structure Feasibility (Offshore S.A.L. vs Delaware Flip).
4. Assign Conviction Score (0-100) and draft 1-page Institutional Investment Memo.
\`\`\``
      }
    },
    {
      id: `seed_note_2_${workspaceId}`,
      userId,
      workspaceId,
      category: "note",
      sourceType: "seed",
      title: "Meeting Notes: Diaspora Investor Syndicate Alignment & Cap Table Architecture",
      timestamp: now,
      isPinned: false,
      isGroundedActive: true,
      contentPayload: {
        title: "Meeting Notes: Diaspora Investor Syndicate Alignment & Cap Table Architecture",
        category: "note",
        tags: ["Meeting Notes", "Cap Table", "SAFE Notes", "Diaspora Syndicate"],
        summary: "Key findings from Cedar Angels & LebNet round-table on using Post-Money SAFEs with MFN clauses for Lebanese AI founders.",
        text: `### Session Takeaways:
- **Instrument of Choice**: Y Combinator Post-Money SAFE with Valuation Cap (standard discount: 20%).
- **Dual Entity Flip**: Incorporate parent entity in Delaware (C-Corp) or Abu Dhabi Global Market (ADGM) to satisfy US/GCC institutional LPs.
- **Operating Subsidiary**: Retain Lebanese Offshore S.A.L. (0% corporate tax) for software R&D contracts. Inter-company transfer pricing agreement signed with parent company.
- **Key Metric**: $500k raised from Diaspora Angels funds 18 months of runway for 7 full-time senior engineers in Beirut + 1 GTM lead in Silicon Valley.`
      }
    },

    // --------------------------------------------------------------------------
    // 4. ACTIONABLE FOLLOW-UPS & STARTUP COHORT GUIDES
    // --------------------------------------------------------------------------
    {
      id: `seed_followup_1_${workspaceId}`,
      userId,
      workspaceId,
      category: "followup",
      sourceType: "seed",
      title: "CedarTech 2026 Seed Cohort Playbook & GTM Roadmap",
      timestamp: now,
      isPinned: true,
      isGroundedActive: true,
      contentPayload: {
        title: "CedarTech 2026 Seed Cohort Playbook & GTM Roadmap",
        category: "followup",
        tags: ["Playbook", "CedarTech", "Action Checklist", "GTM"],
        summary: "Step-by-step milestone roadmap for seed-stage Lebanese AI founders preparing for institutional diaspora syndicates.",
        text: `### Milestone Checklist for Seed Cohort Founders:
1. [ ] **Corporate Registration**: Execute Articles of Association for Offshore S.A.L. with Beirut Bar Association licensed counsel.
2. [ ] **BDL 165 Account**: Open fresh USD commercial clearing account with designated partner bank.
3. [ ] **IP Assignment**: Execute intellectual property assignment agreement transferring all founder code, git repos, and weights to the corporate entity.
4. [ ] **Benchmark Pitch Deck**: Upload pitch deck to 961AI Pitch Room for automated institutional due diligence audit.
5. [ ] **IDAL Law 360 Application**: File preliminary intent letter for 10-year 100% corporate tax exemption.
6. [ ] **Diaspora Angel Warm Intro**: Request warm introduction to Cedar AI Syndicate via 961AI network token.`,
        followupDetails: {
          task: "Complete 961AI Pitch Room Due Diligence Audit & Upload Pitch Deck",
          dueDate: "2026-10-15",
          priority: "urgent",
          completed: false,
          assignee: "Founder",
          reminderSent: false
        }
      }
    },
    {
      id: `seed_followup_2_${workspaceId}`,
      userId,
      workspaceId,
      category: "followup",
      sourceType: "seed",
      title: "Statutory Law 126/2019 Digital Corporate Compliance Checklist",
      timestamp: now,
      isPinned: false,
      isGroundedActive: true,
      contentPayload: {
        title: "Statutory Law 126/2019 Digital Corporate Compliance Checklist",
        category: "followup",
        tags: ["Law 126/2019", "Corporate Governance", "Compliance", "Board Meetings"],
        summary: "Mandatory corporate governance requirements under the Modernized Lebanese Code of Commerce.",
        text: "Law 126/2019 permits Lebanese joint-stock companies (S.A.L.) and Offshore S.A.L. entities to conduct official board meetings and general assemblies remotely via videoconferencing and digital signatures.",
        followupDetails: {
          task: "Draft Digital Board Resolution approving 2026 AI R&D Budget & Transfer Pricing Agreement",
          dueDate: "2026-11-01",
          priority: "high",
          completed: false,
          assignee: "Legal Advisor & Corporate Secretary",
          reminderSent: false
        }
      }
    }
  ];
}
