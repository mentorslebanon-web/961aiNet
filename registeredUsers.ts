import { AICaseStudy, EcosystemIdea, EcosystemContributor } from "../types";

export const INITIAL_AI_CASE_STUDIES: AICaseStudy[] = [
  {
    id: "case-estonia-kratt",
    title: "Estonia e-Residency & Kratt AI Autonomous Public Services",
    institution: "GovTech Estonia / Ministry of Economic Affairs & Communications",
    country: "Estonia",
    flag: "🇪🇪",
    domain: "Civic AI & Governance",
    executiveSummary: "Estonia's nationwide Kratt AI strategy establishes an interoperable network of autonomous AI agents communicating across public and private sectors via the X-Road decentralized data exchange backbone. It enables citizen micro-services, predictive public benefits, and fully automated commercial entity registrations without human latency.",
    technologicalStack: ["X-Road Open Distributed Bus", "Rasa Core Conversational Stack", "PostgreSQL Distributed Ledgers", "Federated Identity PKI"],
    regulatoryFramework: "Estonian Kratid Legal Act (2020) granting algorithms limited legal agency in specific administrative workflows with algorithmic transparency audit requirements.",
    metricsAndImpact: [
      { label: "Public Services Automated", value: "120+ Workflows" },
      { label: "Annual Bureaucracy Hours Saved", value: "840,000 hrs" },
      { label: "Administrative Cost Reduction", value: "32% Operational Savings" },
      { label: "Citizen Digital Uptake", value: "99.2% Online Adoption" }
    ],
    replicabilityScore: 92,
    relevanceToLebanon: "Direct blueprint for bypassing traditional paper bureaucracy in Lebanon. By deploying micro-agent frameworks at the Commercial Register and Ministry of Finance, startups can register Offshore S.A.L. entities and file tax clearances autonomously without physical friction.",
    recommendedRoadmap: [
      "Deploy open-source X-Road equivalent data connectors for Lebanon's commercial chambers.",
      "Launch a sovereign bilingual (Arabic/English) Kratt agent for instant company registration.",
      "Codify algorithmic accountability in the Lebanon Regulatory Sandbox."
    ],
    keyQuote: "AI should not merely assist the state; it must remove the state as a friction point between human initiative and economic execution.",
    quoteAuthor: "Ott Velsberg, Chief Data Officer, Government of Estonia",
    whitepaperName: "Estonian_Kratt_AI_Strategy_MIT_GovTech_Review.pdf"
  },
  {
    id: "case-taiwan-g0v",
    title: "Taiwan g0v & vTaiwan: Pol.is Collective Deliberative AI",
    institution: "vTaiwan Public Deliberation Lab & g0v Civic Tech Community",
    country: "Taiwan",
    flag: "🇹🇼",
    domain: "Civic AI & Governance",
    executiveSummary: "vTaiwan pioneered the integration of unsupervised clustering algorithms (Pol.is) and computational social science to crowdsource and draft national technology regulations (such as ridesharing, digital signature validity, and platform worker rights) with bipartisan public consensus in under 3 months.",
    technologicalStack: ["Pol.is Principal Component Analysis (PCA)", "K-Means Matrix Clustering", "Real-Time Opinion Topology Visualization", "Civic Markdown Repositories"],
    regulatoryFramework: "Cabinet-level Public Digital Innovation Space (PDIS) open government protocol mandating ministerial responses within 30 days to consensus-approved civil society drafts.",
    metricsAndImpact: [
      { label: "National Laws Drafted & Passed", value: "26 Legislation Pieces" },
      { label: "Citizen Consensus Rate", value: "87% Alignment" },
      { label: "Average Deliberation Cycle", value: "6 Weeks per Bill" },
      { label: "Active Participants", value: "200,000+ Contributors" }
    ],
    replicabilityScore: 95,
    relevanceToLebanon: "Addresses Lebanon's deep sectarian and political deadlock. Allows ecosystem founders, diaspora VCs, and local syndicates to map consensus on technology policy (crypto regulation, cross-border remittances, 0% capital gains) and present unified policy drafts to parliament.",
    recommendedRoadmap: [
      "Incorporate Pol.is consensus polling directly into the 961AINetwork 'Got an Idea?' platform.",
      "Host monthly community deliberation rounds on AI regulatory sandbox guidelines.",
      "Publish joint policy memorandums co-signed by NCEI Lebanon and Alkharizmi Solutions."
    ],
    keyQuote: "Instead of dividing people into binary political camps, machine learning reveals hidden consensus bridges that human debates routinely overlook.",
    quoteAuthor: "Audrey Tang, Former Minister of Digital Affairs, Taiwan",
    whitepaperName: "MIT_MediaLab_Collective_Intelligence_Polis_Taiwan.pdf"
  },
  {
    id: "case-uae-falcon",
    title: "UAE Falcon 40B/180B & Sovereign Arabic Foundation Models",
    institution: "Technology Innovation Institute (TII) / Advanced Technology Research Council (ATRC)",
    country: "UAE",
    flag: "🇦🇪",
    domain: "Sovereign LLMs & Compute",
    executiveSummary: "The Technology Innovation Institute developed Falcon, the Middle East's first world-class open-source foundation model family. Built on dedicated sovereign GPU superclusters in Abu Dhabi, it shattered benchmark perceptions of regional capability and created an open ecosystem for localized Arabic enterprise fine-tuning.",
    technologicalStack: ["3.5T+ Token Multilingual Pretraining Corpus", "FlashAttention-2 & Rotary Embeddings", "Custom 4-Bit & 8-Bit Quantization", "Ray Distributed Compute Clusters"],
    regulatoryFramework: "UAE National Artificial Intelligence Strategy 2031 & Open Data License enabling commercial and research exploitation with ethical guardrails.",
    metricsAndImpact: [
      { label: "Global HuggingFace Leaderboard", value: "#1 Open Source at Launch" },
      { label: "Arabic Pretraining Tokens", value: "450B+ Tokens" },
      { label: "Regional Enterprise Adoptions", value: "1,400+ Implementations" },
      { label: "Compute Cluster Scale", value: "10,000+ H100 GPU Equivalent" }
    ],
    replicabilityScore: 84,
    relevanceToLebanon: "Demonstrates that regional players can lead in foundational AI without being captive to Silicon Valley API monopolies. Lebanese startups can fine-tune regional models for Levantine Arabic dialect synthesis, banking privacy, and local legal contracts.",
    recommendedRoadmap: [
      "Partner with regional compute providers to access subsidized GPU hours for Lebanese AI researchers.",
      "Release open-source Levantine dialect training datasets curated by Lebanese universities.",
      "Build sovereign on-premise inference appliances for Lebanese commercial banks."
    ],
    keyQuote: "Sovereign AI is not about isolation; it is about ensuring our cultural nuance, linguistic depth, and data rights remain in our hands.",
    quoteAuthor: "Dr. Ray O. Johnson, CEO, Technology Innovation Institute",
    whitepaperName: "Falcon_Arabic_Foundation_Models_TII_Architecture.pdf"
  },
  {
    id: "case-singapore-verify",
    title: "Singapore AI Verify: Algorithmic Testing & Regulatory Sandbox",
    institution: "Infocomm Media Development Authority (IMDA) & AI Verify Foundation",
    country: "Singapore",
    flag: "🇸🇬",
    domain: "Regulatory Sandboxes",
    executiveSummary: "Singapore became the first global financial hub to release an open-source testing framework and software toolkit (AI Verify) allowing businesses to conduct objective, technical tests of their AI systems against 11 internationally recognized AI governance principles (fairness, explainability, safety, data governance).",
    technologicalStack: ["Open-Source Test Suite (Docker & Python)", "SHAP & LIME Interpretability Metrics", "Differential Privacy Verifiers", "Algorithmic Bias Audit Engine"],
    regulatoryFramework: "Model AI Governance Framework (MAS & IMDA) offering safe-harbor protections for sandbox-certified innovations.",
    metricsAndImpact: [
      { label: "Global Corporate Pilot Partners", value: "100+ Multinational Firms" },
      { label: "Average Audit Turnaround", value: "48 Hours Automated Run" },
      { label: "Regulatory Compliance Cost Reduction", value: "65% Savings" },
      { label: "International Recognition", value: "Adopted by OECD & APEC" }
    ],
    replicabilityScore: 88,
    relevanceToLebanon: "Provides a plug-and-play compliance framework for the 961AINetwork Sovereign Legal Sandbox. By certifying Lebanese AI solutions with AI Verify badges, local startups gain immediate credibility with European and GCC enterprise buyers.",
    recommendedRoadmap: [
      "Integrate AI Verify test metrics into the 961AINetwork Pitch Room due diligence pipeline.",
      "Provide free AI testing certifications for Lebanese startups incubated under NCEI.",
      "Establish mutual recognition pacts with Dubai DIFC and Abu Dhabi ADGM."
    ],
    keyQuote: "Trust is the currency of the algorithmic era. If you cannot measure bias and safety quantitatively, you cannot regulate or insure it.",
    quoteAuthor: "Lew Chuen Hong, Chief Executive, IMDA Singapore",
    whitepaperName: "Singapore_AI_Verify_Governance_Framework_IMDA.pdf"
  },
  {
    id: "case-mit-cityscience",
    title: "MIT Media Lab City Science: Decentralized Resilient Microgrids & Edge AI",
    institution: "MIT Media Lab / City Science Research Consortium",
    country: "USA",
    flag: "🇺🇸",
    domain: "Civic AI & Governance",
    executiveSummary: "MIT City Science developed an algorithmic peer-to-peer microgrid coordination protocol that balances unstable municipal power grids using localized battery energy storage systems (BESS) and decentralized reinforcement learning agents operating entirely at the edge without cloud dependency.",
    technologicalStack: ["Multi-Agent Reinforcement Learning (MARL)", "Edge TensorRT Micro-Controllers", "Zero-Knowledge Power Ledgers", "LoRaWAN Mesh Telemetry"],
    regulatoryFramework: "Community Energy Freedom Framework allowing microgrid operators to dynamically trade excess solar and generator wattage without monopolistic utility tariffs.",
    metricsAndImpact: [
      { label: "Blackout Duration Reduction", value: "78% Less Outage Time" },
      { label: "Solar Energy Utilization", value: "+44% Captive Yield" },
      { label: "Diesel Generator Fuel Savings", value: "52% Reduction" },
      { label: "Decentralized Edge Nodes", value: "2,500+ Operational" }
    ],
    replicabilityScore: 98,
    relevanceToLebanon: "Critical for Lebanon's severe electricity infrastructure crisis. Deploying edge AI agents across private neighborhood generators and solar arrays in Beirut and Metn can stabilize power for tech hubs like BDD and reduce expensive diesel expenditure.",
    recommendedRoadmap: [
      "Pilot the MIT City Science edge grid algorithm in Beirut Digital District (BDD).",
      "Connect solar-equipped Lebanese tech offices into an automated virtual power plant (VPP).",
      "Offer carbon credit tokens for local startups powering servers with renewable energy."
    ],
    keyQuote: "Cities are living organisms. High-tech resilience means designing systems that thrive even when the central spine fails completely.",
    quoteAuthor: "Kent Larson, Director, City Science, MIT Media Lab",
    whitepaperName: "MIT_City_Science_Decentralized_Urban_AI_Microgrids.pdf"
  },
  {
    id: "case-uk-nhsailab",
    title: "UK NHS AI Lab: Clinical Algorithmic Validation & Fast-Track Pathway",
    institution: "NHS England & National Institute for Health and Care Excellence (NICE)",
    country: "United Kingdom",
    flag: "🇬🇧",
    domain: "Health & Clinical AI",
    executiveSummary: "The NHS AI Lab created the Evidence Standards Framework (ESF) for digital health technologies, pairing synthetic healthcare test beds with accelerated clinical procurement pathways to evaluate diagnostic deep learning tools safely without risking patient confidentiality.",
    technologicalStack: ["Federated Clinical Training Nodes", "Synthetic Patient Data Generation (CTGAN)", "DICOM Medical Image Analysis Pipelines", "HL7/FHIR Integration APIs"],
    regulatoryFramework: "MHRA Software and AI as a Medical Device (SaMD) regulatory roadmap with post-market continuous algorithmic performance monitoring.",
    metricsAndImpact: [
      { label: "Clinical AI Tools Evaluated", value: "350+ Medical Algorithms" },
      { label: "Patient Diagnosis Speedup", value: "4.2x Faster Stroke Scanning" },
      { label: "Venture Investment Attracted", value: "£250M+ Inward Seed Capital" },
      { label: "Clinical Safety Incident Rate", value: "<0.01% Adverse Flags" }
    ],
    replicabilityScore: 89,
    relevanceToLebanon: "Lebanon boasts world-class medical centers (AUBMC, Hôtel-Dieu de France, Saint George Hospital) and renowned clinical researchers. Creating an NHS-style validation sandbox allows Lebanese MedTech startups to validate radiology and pathology AI models regionally.",
    recommendedRoadmap: [
      "Form a joint clinical AI validation consortium between AUBMC, USJ, and 961AINetwork.",
      "Establish anonymized Lebanese diagnostic imaging datasets for oncology and rare diseases.",
      "Fast-track regulatory clearance for Lebanese-developed clinical triage software."
    ],
    keyQuote: "Clinical algorithms must be scrutinized with the same pharmacological rigor as new molecules, but with the rapid iteration agility of modern software.",
    quoteAuthor: "Dr. Indra Joshi, Former Director, NHS AI Lab",
    whitepaperName: "NHS_AI_Lab_Clinical_Validation_Standard_Framework.pdf"
  }
];

export const INITIAL_ECOSYSTEM_IDEAS: EcosystemIdea[] = [
  {
    id: "idea-bdd-hydro-compute",
    title: "Lebanon Sovereign AI Compute Pool at BDD with Hydro-Power Redundancy",
    category: "Infrastructure",
    status: "In Progress",
    problemStatement: "Lebanese AI startups and university labs currently spend exorbitant cloud GPU fees (AWS/GCP) in scarce USD while suffering local power grid instability. High compute costs throttle pre-training and fine-tuning of localized models.",
    proposedSolution: "Establish a shared cluster of 64 NVIDIA H100/H200 equivalents located in Beirut Digital District, with a dedicated fiber-linked satellite hub in the Litani/Qaraoun hydroelectric plant corridor for 100% clean, subsidized baseload power. Offer subsidized credit pools for verified Lebanese AI builders.",
    expectedImpact: "Lowers training and inference overhead by 70% for 50+ local startups, unlocks on-premise banking data compliance, and saves an estimated $2.4M in annual capital flight abroad.",
    feedbackPreference: "Resource/Funding Guidance",
    submitterName: "Ziad Mansour",
    submitterEmail: "ziad@phoenicia-compute.ai",
    submitterOrg: "Phoenicia Compute Lab & BDD Member",
    submitterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    upvotes: 142,
    hasUpvoted: false,
    commentsCount: 8,
    createdAt: "2026-08-14T10:30:00Z",
    updatedAt: "2026-09-02T14:15:00Z",
    pinned: true,
    attachments: [
      { id: "att-1", name: "BDD_Hydro_Compute_Feasibility_Study.pdf", type: "pdf", size: "3.4 MB" },
      { id: "att-2", name: "Litani_Energy_Architecture_Diagram.png", type: "image", size: "1.8 MB" }
    ],
    officialUpdates: [
      {
        id: "upd-1",
        date: "2026-09-01T11:00:00Z",
        title: "Technical Feasibility Committee Approved",
        notes: "NCEI Lebanon and Alkharizmi Solutions have initiated technical scoping with EDL and private clean energy microgrid developers. Next step: formal diaspora syndicate co-investment proposal.",
        adminName: "Maan (Platform Lead)",
        statusBadge: "In Progress"
      }
    ],
    comments: [
      {
        id: "comm-1",
        authorName: "Dr. Karim Hajj",
        authorRole: "Professor of Computer Engineering, AUB",
        text: "This is crucial. Our postgraduate researchers in Beirut currently wait weeks for meager academic cloud credits. Having local bare-metal GPU clusters with reliable hydro uptime will retain our top PhD talent onshore.",
        createdAt: "2026-08-15T14:20:00Z"
      },
      {
        id: "comm-2",
        authorName: "Maya Semaan",
        authorRole: "Partner, Cedar Ridge Capital (Silicon Valley)",
        text: "Our diaspora syndicate is ready to participate in hardware debt-financing or SPV equity if sovereign legal protections (Offshore S.A.L. custody) are verified.",
        createdAt: "2026-08-18T09:45:00Z"
      }
    ]
  },
  {
    id: "idea-medtech-sandbox",
    title: "Fast-Track Regulatory Sandbox for Lebanese HealthTech AI & Diagnostic Algorithms",
    category: "Policy & Regulation",
    status: "Under Review",
    problemStatement: "Lebanese diagnostic algorithms created by local biomedical founders face multi-year bureaucratic roadblocks at the Ministry of Public Health with zero clear guidelines for SaMD (Software as a Medical Device), prompting founders to relocate abroad prematurely.",
    proposedSolution: "Adopt Singapore's IMDA AI Verify and UK NHS AI Lab evidence standards framework within the 961AINetwork Sovereign Regulatory Sandbox. Create a provisional 12-month clinical clearance license overseen by a joint committee of AUBMC, USJ, and Lebanese Medical Syndicate experts.",
    expectedImpact: "Accelerates commercial pilots in 14 regional hospitals, protects patients with transparent algorithmic safety benchmarks, and establishes Beirut as the MENA hub for clinical algorithmic validation.",
    feedbackPreference: "Direct Connect with Admin/Regulators",
    submitterName: "Dr. Nadine Khoury",
    submitterEmail: "nadine@medai-levant.org",
    submitterOrg: "Levant Medical AI Consortium",
    submitterAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    upvotes: 98,
    hasUpvoted: true,
    commentsCount: 5,
    createdAt: "2026-08-20T16:00:00Z",
    updatedAt: "2026-09-05T12:00:00Z",
    attachments: [
      { id: "att-3", name: "Medical_AI_Regulatory_Whitepaper_v2.pdf", type: "pdf", size: "2.1 MB" }
    ],
    officialUpdates: [
      {
        id: "upd-2",
        date: "2026-09-04T09:30:00Z",
        title: "Working Group Established with Syndicate of Doctors",
        notes: "A dedicated meeting has been scheduled for late September with university hospital research deans to formalize sandbox protocols.",
        adminName: "Maan (Platform Lead)",
        statusBadge: "Under Review"
      }
    ],
    comments: [
      {
        id: "comm-3",
        authorName: "Elie Tannous",
        authorRole: "Founder, CardioVision AI",
        text: "We spent 9 months trying to get an ethics board waiver for an ultrasound AI trial in Beirut. This standardized sandbox pathway would have saved our company over $80,000.",
        createdAt: "2026-08-22T11:10:00Z"
      }
    ]
  },
  {
    id: "idea-diaspora-female-grants",
    title: "Diaspora Matched-Grants Fund for Female AI Researchers & Deep Tech Founders",
    category: "Funding & Grants",
    status: "In Progress",
    problemStatement: "Despite women representing over 48% of STEM graduates in Lebanese universities, less than 9% of venture-backed AI founders in the Levant are female. Founders face severe early-stage capital starvation and lack of international venture network connectivity.",
    proposedSolution: "Launch a $500,000 evergreen matched-grant pool funded 1:1 by diaspora philanthropic angel syndicates (Paris, London, NYC, Montreal) and matched by regional CSR partners. Grants range from $15k to $35k non-dilutive capital, paired with 6 months of 1-on-1 executive mentorship from prominent diaspora women in tech.",
    expectedImpact: "Directly funds 20 female-led deep tech ventures over 2 years, increases female founder pipeline by 300%, and builds a direct bridge to Tier-1 international venture syndicates.",
    feedbackPreference: "Mentorship/Coaching",
    submitterName: "Rania Gemayel",
    submitterEmail: "rania@lebanonwomenai.network",
    submitterOrg: "Women in AI Lebanon & Diaspora Chapter",
    submitterAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    upvotes: 167,
    hasUpvoted: false,
    commentsCount: 12,
    createdAt: "2026-08-05T08:15:00Z",
    updatedAt: "2026-09-08T18:00:00Z",
    pinned: true,
    attachments: [
      { id: "att-4", name: "Female_AI_Founders_Grant_Charter.pdf", type: "pdf", size: "1.4 MB" },
      { id: "att-5", name: "Mentorship_Curriculum_SlideDeck.pdf", type: "deck", size: "4.2 MB" }
    ],
    officialUpdates: [
      {
        id: "upd-3",
        date: "2026-09-08T10:00:00Z",
        title: "First $150k Seed Commitment Secured",
        notes: "A diaspora syndicate in Montreal and Geneva committed the first $150,000 anchor commitment. Application portal opening date set for Q4 2026.",
        adminName: "Maan (Platform Lead)",
        statusBadge: "In Progress"
      }
    ],
    comments: [
      {
        id: "comm-4",
        authorName: "Sarah Haddad",
        authorRole: "Principal AI Scientist, DeepMind London",
        text: "Pleased to commit 4 hours per month for technical mentorship and grant evaluation. Let's make sure our young female engineers in Tripoli and Sidon have equal access to this.",
        createdAt: "2026-08-06T15:30:00Z"
      }
    ]
  },
  {
    id: "idea-beirut-deeptech-fellowship",
    title: "Beirut Deep Tech Fellowship & GPU Cluster Residency",
    category: "Talent",
    status: "Completed",
    problemStatement: "The brain drain of senior machine learning engineers and computer vision scientists from Lebanon to Europe and the Gulf has reached crisis levels due to lack of high-compensation research environments in Beirut.",
    proposedSolution: "Create a premier 6-month paid residency providing top Lebanese AI talents with $2,500/mo USD stipends, dedicated compute, and direct co-founding pathways with diaspora enterprise customers looking for offshore R&D excellence.",
    expectedImpact: "Halted talent loss for 18 master-level AI developers in cohort 1; spawned 4 venture-backed spinouts now generating foreign currency revenues back into the Lebanese economy.",
    feedbackPreference: "Public Ecosystem Discussion",
    submitterName: "Sami Barakat",
    submitterEmail: "sami@beirut-fellows.tech",
    submitterOrg: "NCEI Fellowships & BDD",
    submitterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    upvotes: 215,
    hasUpvoted: true,
    commentsCount: 14,
    createdAt: "2026-06-10T12:00:00Z",
    updatedAt: "2026-08-28T15:45:00Z",
    attachments: [
      { id: "att-6", name: "Cohort_1_Graduation_Report.pdf", type: "pdf", size: "2.8 MB" }
    ],
    officialUpdates: [
      {
        id: "upd-4",
        date: "2026-08-28T14:00:00Z",
        title: "Cohort 1 Successfully Graduated; Cohort 2 Funded",
        notes: "Cohort 1 produced 4 commercial MVPs with $420k in initial angel backing. Cohort 2 expansion to 30 fellows officially sponsored by international donor partners.",
        adminName: "Maan (Platform Lead)",
        statusBadge: "Completed"
      }
    ],
    comments: [
      {
        id: "comm-5",
        authorName: "Tarek Abboud",
        authorRole: "Cohort 1 Fellow / Co-Founder, SpeechLevant",
        text: "This fellowship kept me in Lebanon. Without this stipend and GPU access, I would have accepted a generic junior developer job in the UAE. Today my startup is live and hiring 3 more engineers in Beirut.",
        createdAt: "2026-08-29T10:15:00Z"
      }
    ]
  },
  {
    id: "idea-levant-nlp-dataset",
    title: "Open-Source Levantine Arabic NLP Benchmark & Multi-Dialect Dataset Initiative",
    category: "Infrastructure",
    status: "Under Review",
    problemStatement: "Most commercial LLMs (OpenAI, Anthropic, Gemini) collapse when dealing with conversational Lebanese street Arabic (Arabizi, Franco-Arabe, and native Levantine colloquial idioms), yielding poor sentiment accuracy and customer service bot failures.",
    proposedSolution: "A crowdsourced, academically verified open-source corpus of 500,000+ validated Levantine conversational turns with sentiment, intent, and named-entity annotations. Hosted openly on HuggingFace under an MIT license for the entire ecosystem.",
    expectedImpact: "Boosts Arabic customer AI agent accuracy from 58% to 92% across Lebanese and regional fintech and e-commerce apps; establishes global benchmark citation for Lebanese universities.",
    feedbackPreference: "Direct Connect with Admin/Regulators",
    submitterName: "Dr. Fouad Zakhia",
    submitterEmail: "fzakhia@nlp-levant.org",
    submitterOrg: "Lebanese Computational Linguistics Lab",
    submitterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    upvotes: 134,
    hasUpvoted: false,
    commentsCount: 6,
    createdAt: "2026-08-25T14:40:00Z",
    updatedAt: "2026-09-06T17:20:00Z",
    attachments: [
      { id: "att-7", name: "Levantine_NLP_Annotation_Guidelines.pdf", type: "pdf", size: "1.2 MB" }
    ],
    officialUpdates: [],
    comments: []
  },
  {
    id: "idea-crossborder-summit",
    title: "Lebanon-Gulf AI Cross-Border Summit & Investor Deal Showcase (Beirut & Riyadh)",
    category: "Community Events",
    status: "In Progress",
    problemStatement: "Lebanese AI startups operate in an isolated bubble without recurring, structured face-to-face access to Saudi and Emirati venture capital allocators and enterprise corporate development heads.",
    proposedSolution: "A bi-annual flagship summit split into Day 1 in Beirut (BDD) showcasing deep-tech demos and technical code audits, followed by Day 2 in Riyadh (KAFD) featuring institutional LP roundtables, sovereign wealth fund introductions, and fast-track dual-entity structuring.",
    expectedImpact: "Positions 30+ Lebanese startups directly in front of $500M+ in active regional venture dry powder; accelerates cross-border commercial contracts in Saudi Vision 2030 initiatives.",
    feedbackPreference: "Public Ecosystem Discussion",
    submitterName: "Karim Daoud",
    submitterEmail: "karim@levant-ventures.co",
    submitterOrg: "Levant Bridge Partners",
    submitterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    upvotes: 89,
    hasUpvoted: false,
    commentsCount: 4,
    createdAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-09-10T11:30:00Z",
    attachments: [
      { id: "att-8", name: "Summit_2026_Agenda_Draft.pdf", type: "pdf", size: "1.9 MB" }
    ],
    officialUpdates: [
      {
        id: "upd-5",
        date: "2026-09-09T16:00:00Z",
        title: "Venue Partnership in Beirut Signed",
        notes: "Beirut Digital District confirmed as host venue for Lebanon leg. Talks ongoing with Riyadh tech ecosystem partners for the Saudi counterpart day.",
        adminName: "Maan (Platform Lead)",
        statusBadge: "In Progress"
      }
    ],
    comments: []
  }
];

export const INITIAL_ECOSYSTEM_CONTRIBUTORS: EcosystemContributor[] = [
  {
    id: "contrib-1",
    name: "Rania Gemayel",
    role: "President, Women in AI Lebanon",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    organization: "Women in AI / Diaspora Bridge",
    ideasSubmitted: 4,
    ideasImplemented: 2,
    communityUpvotes: 384,
    rank: 1,
    badge: "Ecosystem Champion"
  },
  {
    id: "contrib-2",
    name: "Ziad Mansour",
    role: "Hardware & Edge Computing Lead",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    organization: "Phoenicia Compute Lab",
    ideasSubmitted: 3,
    ideasImplemented: 1,
    communityUpvotes: 276,
    rank: 2,
    badge: "Infrastructure Pioneer"
  },
  {
    id: "contrib-3",
    name: "Sami Barakat",
    role: "Director of Talent Programs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    organization: "NCEI Lebanon",
    ideasSubmitted: 5,
    ideasImplemented: 3,
    communityUpvotes: 245,
    rank: 3,
    badge: "Policy Architect"
  },
  {
    id: "contrib-4",
    name: "Dr. Nadine Khoury",
    role: "Clinical Informatics Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    organization: "Levant Medical AI Consortium",
    ideasSubmitted: 2,
    ideasImplemented: 1,
    communityUpvotes: 182,
    rank: 4,
    badge: "Healthcare Innovator"
  },
  {
    id: "contrib-5",
    name: "Dr. Fouad Zakhia",
    role: "Computational Linguistics Chair",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    organization: "Lebanese Computational Linguistics",
    ideasSubmitted: 3,
    ideasImplemented: 0,
    communityUpvotes: 154,
    rank: 5,
    badge: "Language Sovereign"
  }
];
