import { GraphNode, GraphEdge, WikiDocument, PostgresTableSchema, SeedingPartner, SubscriptionTier, MatchResult, ReferralRecord } from "../types";

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  // ==========================================
  // 1. STARTUPS & APPLIED AI SCALEUPS
  // ==========================================
  {
    id: "startup_cedars_llm",
    label: "CedarsLLM",
    type: "Startup",
    location: "Beirut & San Francisco",
    locationType: "onshore_lebanon",
    country: "Lebanon / USA",
    isDiaspora: false,
    title: "Arabic-First Enterprise LLMs & Quantization",
    bio: "Building specialized 7B-70B Arabic domain foundation models with sub-8-bit quantization for on-premise GCC banking and telecom deployments.",
    tags: ["LLM Training", "Arabic NLP", "Model Quantization", "Enterprise AI"],
    stage: "Seed ($1.2M target)",
    fundingTarget: "$1,200,000",
    valuation: "$8,500,000",
    mrr: "$38,500",
    githubActivity: 94,
    verified: true,
    wikiSlug: "cedars-llm",
    connectionsCount: 18,
    claimStatus: "claimed"
  },
  {
    id: "startup_phoenicia_vision",
    label: "Phoenicia Vision",
    type: "Startup",
    location: "Beirut (BDD)",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Edge Computer Vision for Autonomous Drones & AgroTech",
    bio: "Ultra-low power neural vision accelerators for automated crop health scanning across the Bekaa valley and MENA olive groves.",
    tags: ["Computer Vision", "Edge AI", "AgroTech", "Embedded Systems"],
    stage: "Pre-Seed ($400k target)",
    fundingTarget: "$400,000",
    valuation: "$3,200,000",
    mrr: "$14,200",
    githubActivity: 82,
    verified: true,
    wikiSlug: "phoenicia-vision",
    connectionsCount: 14,
    claimStatus: "claimed"
  },
  {
    id: "startup_beirut_neurotech",
    label: "Beirut NeuroTech",
    type: "Startup",
    location: "Hamra, Beirut",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Non-Invasive BCI & Real-Time Neuromorphic Signal Processing",
    bio: "Spun out of AUB Biomedical Engineering; decoding EEG spike trains with spiking neural networks (SNNs) on FPGA hardware.",
    tags: ["BCI", "Spiking Neural Networks", "FPGA", "Neuroscience"],
    stage: "Seed ($900k target)",
    fundingTarget: "$900,000",
    valuation: "$6,000,000",
    mrr: "$8,000",
    githubActivity: 88,
    verified: true,
    wikiSlug: "beirut-neurotech",
    connectionsCount: 11,
    claimStatus: "claimed"
  },
  {
    id: "startup_levant_robotics",
    label: "Levant Robotics",
    type: "Startup",
    location: "Byblos (LAU)",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Visual SLAM & Quadruped Inspection Bots",
    bio: "Autonomous robotics platform for subsea and infrastructure inspection, engineered by LAU Mechatronics alumni.",
    tags: ["Robotics", "Visual SLAM", "Sensor Fusion", "Control Systems"],
    stage: "Pre-Seed ($350k target)",
    fundingTarget: "$350,000",
    valuation: "$2,800,000",
    mrr: "$6,500",
    githubActivity: 79,
    verified: true,
    wikiSlug: "levant-robotics",
    connectionsCount: 10,
    claimStatus: "claimed"
  },
  {
    id: "startup_qadisha_medai",
    label: "Qadisha MedAI",
    type: "Startup",
    location: "Tripoli & Paris",
    locationType: "diaspora",
    country: "France / Lebanon",
    isDiaspora: true,
    title: "Multimodal Radiology LLMs for Low-Resource Hospitals",
    bio: "Generates instant diagnostic second-opinions on CT/MRI scans with 99.1% sensitivity, deployed across Lebanese and EU university hospitals.",
    tags: ["MedAI", "Multimodal Vision", "Healthcare", "Federated Learning"],
    stage: "Series A ($3.5M target)",
    fundingTarget: "$3,500,000",
    valuation: "$18,000,000",
    mrr: "$92,000",
    githubActivity: 96,
    verified: true,
    wikiSlug: "qadisha-medai",
    connectionsCount: 20,
    claimStatus: "claimed"
  },
  {
    id: "startup_synapse_analytics",
    label: "Synapse Analytics Lebanon",
    type: "Startup",
    location: "Beirut & Cairo",
    locationType: "onshore_lebanon",
    country: "Lebanon / Egypt",
    isDiaspora: false,
    title: "Enterprise AI Decisioning & Credit Scoring Platform",
    bio: "Pioneering explainable AI and credit risk modeling deployed at top banks and telecommunications operators across MENA.",
    tags: ["Fintech AI", "Explainable AI", "Enterprise ML", "Credit Scoring"],
    stage: "Series A ($2.5M target)",
    fundingTarget: "$2,500,000",
    valuation: "$15,000,000",
    mrr: "$75,000",
    githubActivity: 91,
    verified: true,
    wikiSlug: "synapse-analytics",
    connectionsCount: 19,
    claimStatus: "claimed"
  },
  {
    id: "startup_proximie_ai",
    label: "Proximie Augmented AI",
    type: "Startup",
    location: "Beirut & London",
    locationType: "diaspora",
    country: "UK / Lebanon",
    isDiaspora: true,
    title: "Surgical AI Telepresence & Real-Time Video Telemetry",
    bio: "Founded by Dr. Nadine Hachach-Haram; leverages low-latency AI video feeds and AR guidance in operating rooms worldwide.",
    tags: ["Surgical AI", "HealthTech", "Computer Vision", "AR Telemetry"],
    stage: "Series B ($35M raised)",
    fundingTarget: "$10,000,000",
    valuation: "$120,000,000",
    mrr: "$420,000",
    githubActivity: 89,
    verified: true,
    wikiSlug: "proximie-ai",
    connectionsCount: 32,
    claimStatus: "claimed"
  },
  {
    id: "startup_augment_energy",
    label: "CedarSmart Energy AI",
    type: "Startup",
    location: "Beirut (BDD)",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Smart Microgrid Load Balancing & Solar-Diesel AI Predictors",
    bio: "Automating private microgrid load-shedding and battery life optimization for off-grid businesses during utility grid outages.",
    tags: ["CleanTech", "Energy AI", "IoT Sensors", "Time Series ML"],
    stage: "Seed ($800k target)",
    fundingTarget: "$800,000",
    valuation: "$5,500,000",
    mrr: "$22,000",
    githubActivity: 85,
    verified: true,
    wikiSlug: "cedarsmart-energy-ai",
    connectionsCount: 15,
    claimStatus: "claimed"
  },
  {
    id: "startup_levant_voice_ai",
    label: "LevantVoice Arabic Speech",
    type: "Startup",
    location: "Tripoli & Dubai",
    locationType: "onshore_lebanon",
    country: "Lebanon / UAE",
    isDiaspora: false,
    title: "Real-Time Dialectal Arabic Voice Agent & Audio Generation",
    bio: "Ultra-fast (<180ms) sub-second latency Conversational AI in Levantine, Khaleeji, and Maghrebi dialects for telco contact centers.",
    tags: ["Voice AI", "ASR / TTS", "Arabic Audio", "Conversational AI"],
    stage: "Seed ($1.5M target)",
    fundingTarget: "$1,500,000",
    valuation: "$9,000,000",
    mrr: "$44,000",
    githubActivity: 93,
    verified: true,
    wikiSlug: "levant-voice-ai",
    connectionsCount: 17,
    claimStatus: "claimed"
  },

  // ==========================================
  // 1b. AI & SOFTWARE AGENCIES (LEBANESE & SERVING LEBANON)
  // ==========================================
  {
    id: "agency_code_brew_labs",
    label: "Code Brew Labs",
    type: "Startup",
    location: "Serves Lebanon",
    locationType: "diaspora",
    country: "UAE / Serves Lebanon",
    isDiaspora: true,
    title: "AI Development, Mobile Apps & Blockchain Marketplaces",
    bio: "Code Brew Labs is a versatile software development company offering services such as app development, blockchain solutions, and digital marketplaces. Reviews reveal mixed feedback, with approximately 70% highlighting strong technical expertise and responsiveness, while 30% report dissatisfaction due to project delays and unmet deliverables. Common themes include professional project management and effective communication.",
    tags: ["AI Development", "Mobile App Development", "Blockchain", "Digital Marketplaces", "Custom Software"],
    rating: 4.4,
    reviewCount: 62,
    minProjectSize: "$10,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "250 - 999",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 30 },
      { name: "Mobile App Development", percentage: 30 },
      { name: "Blockchain", percentage: 15 },
      { name: "Digital Marketplaces", percentage: 15 },
      { name: "Custom Web", percentage: 10 }
    ],
    highlights: ["Great project management", "Reviewed 3 times in past 6 months", "Experience in 11 industries", "Completed projects in 10 countries"],
    stage: "$10k+ Projects",
    verified: true,
    premierVerified: false,
    wikiSlug: "code-brew-labs",
    connectionsCount: 22,
    claimStatus: "claimed"
  },
  {
    id: "agency_simform",
    label: "Simform",
    type: "Startup",
    location: "Serves Lebanon",
    locationType: "diaspora",
    country: "USA / Serves Lebanon",
    isDiaspora: true,
    title: "Enterprise AI Development, Cloud Consulting & SI",
    bio: "Simform is a software development company specializing in custom software solutions, mobile app development, and system integrations. Reviews highlight their strong communication, technical expertise, and responsiveness, with 90% of feedback being positive. Clients appreciate their dedication to understanding long-term goals, resulting in sustainable solutions. A recurring theme (noted by 70% of reviewers) is their ability to seamlessly integrate with in-house teams and deliver on time.",
    tags: ["AI Development", "Cloud Consulting & SI", "CRM Consulting", "Custom Software", "Mobile Apps"],
    rating: 4.8,
    reviewCount: 86,
    minProjectSize: "$25,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "1,000 - 9,999",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 20 },
      { name: "Cloud Consulting & SI", percentage: 20 },
      { name: "CRM Consulting and SI", percentage: 10 },
      { name: "Custom Software", percentage: 30 },
      { name: "Mobile Apps", percentage: 20 }
    ],
    highlights: ["Great team", "Reviewed 3 times in past 6 months", "Experience in 15 industries", "Completed projects in 14 countries"],
    stage: "$25k+ Enterprise",
    verified: true,
    premierVerified: true,
    wikiSlug: "simform",
    connectionsCount: 35,
    claimStatus: "claimed"
  },
  {
    id: "agency_codeninja",
    label: "CodeNinja",
    type: "Startup",
    location: "Serves Lebanon",
    locationType: "diaspora",
    country: "Global / Serves Lebanon",
    isDiaspora: true,
    title: "50% AI Development, Custom SaaS & IT Staff Augmentation",
    bio: "CodeNinja is a versatile software development company offering services including AI integration, custom SaaS solutions, enterprise web development, and staff augmentation. Their client feedback is overwhelmingly positive, with approximately 95% of reviews praising their project management, responsiveness, and alignment with business needs. Clients appreciate their ability to deliver innovative, user-friendly solutions on time and within budget, making them a reliable development partner.",
    tags: ["AI Development", "Custom Software Development", "IT Staff Augmentation", "SaaS Solutions", "Enterprise Web"],
    rating: 5.0,
    reviewCount: 53,
    minProjectSize: "$25,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "250 - 999",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 50 },
      { name: "Custom Software Development", percentage: 20 },
      { name: "IT Staff Augmentation", percentage: 20 },
      { name: "Enterprise SaaS", percentage: 10 }
    ],
    highlights: ["Professional", "Reviewed 1 time in past 6 months", "4.9 out of 5.0 rating for cost", "Completed projects in 13 countries"],
    stage: "$25k+ Projects",
    verified: true,
    premierVerified: true,
    wikiSlug: "codeninja",
    connectionsCount: 29,
    claimStatus: "claimed"
  },
  {
    id: "agency_phaedra_solutions",
    label: "Phaedra Solutions",
    type: "Startup",
    location: "Serves Lebanon",
    locationType: "diaspora",
    country: "Global / Serves Lebanon",
    isDiaspora: true,
    title: "End-to-End AI Integrations, Web & Mobile Solutions",
    bio: "Phaedra Solutions, a software development firm, is highly regarded for delivering end-to-end web and mobile app solutions, UI/UX design, and AI integrations. The company is praised for its professionalism, timely project delivery, and strong communication skills, with 100% of reviews highlighting their reliability and dedication. Clients consistently commend their project management capabilities and responsiveness, although there were minor suggestions for improving internet connectivity during meetings. Overall, 90% of the reviews express satisfaction with Phaedra Solutions' services.",
    tags: ["AI Development", "Mobile App Development", "Web Development", "UI/UX Design", "Custom Software"],
    rating: 4.9,
    reviewCount: 28,
    minProjectSize: "$10,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "50 - 249",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 25 },
      { name: "Mobile App Development", percentage: 20 },
      { name: "Web Development", percentage: 20 },
      { name: "UI/UX Design", percentage: 20 },
      { name: "Cloud Backends", percentage: 15 }
    ],
    highlights: ["Team players", "Experience in 9 industries", "Very responsive", "Completed projects in 6 countries"],
    stage: "$10k+ Projects",
    verified: true,
    premierVerified: true,
    wikiSlug: "phaedra-solutions",
    connectionsCount: 21,
    claimStatus: "claimed"
  },
  {
    id: "agency_eurisko",
    label: "Eurisko",
    type: "Startup",
    location: "Adma w Dafnah, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Enterprise AI Solutions, Generative AI & AR/VR Development",
    bio: "Eurisko is a comprehensive technology development company specializing in mobile and web applications, CMS, CRM integration, and AI-driven solutions. The company is widely praised for its professionalism, agile project management, and timely delivery, with 100% of reviewers highlighting their innovative approach and high-quality results. Clients consistently appreciate Eurisko's alignment with company values and their commitment to delivering cost-effective solutions.",
    tags: ["AI Development", "Generative AI", "AR/VR Development", "Mobile Apps", "CMS / CRM"],
    rating: 4.7,
    reviewCount: 15,
    minProjectSize: "$50,000+",
    hourlyRate: "$50 - $99 / hr",
    teamSize: "50 - 249",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 20 },
      { name: "AR/VR Development", percentage: 15 },
      { name: "Generative AI", percentage: 15 },
      { name: "Mobile App Development", percentage: 25 },
      { name: "CMS & CRM Integration", percentage: 25 }
    ],
    highlights: ["Professional", "Experience in 6 industries", "4.4 out of 5.0 rating for cost", "Very responsive"],
    stage: "$50k+ Enterprise",
    verified: true,
    premierVerified: false,
    wikiSlug: "eurisko",
    connectionsCount: 27,
    claimStatus: "claimed"
  },
  {
    id: "agency_webspot",
    label: "Webspot",
    type: "Startup",
    location: "Adma w Dafnah, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "AI Consulting, AI Development & Generative AI Solutions",
    bio: "Webspot is a versatile digital solutions company specializing in developing e-commerce websites and AI solutions, as well as social media marketing strategies. Their reviews are overwhelmingly positive, with 100% of clients praising their professionalism, timely delivery, and exceptional customer service. Clients highlight their expertise in AI and digital marketing, noting no significant areas for improvement.",
    tags: ["AI Consulting", "AI Development", "Generative AI", "E-Commerce", "Digital Marketing"],
    rating: 4.6,
    reviewCount: 4,
    minProjectSize: "$5,000+",
    hourlyRate: "$50 - $99 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    featured: true,
    servicesBreakdown: [
      { name: "AI Consulting", percentage: 25 },
      { name: "AI Development", percentage: 25 },
      { name: "Generative AI", percentage: 15 },
      { name: "E-Commerce Development", percentage: 20 },
      { name: "Digital Strategy", percentage: 15 }
    ],
    highlights: ["Personable", "Experience in 2 industries", "4.0 out of 5.0 rating for cost", "Completed projects in 2 countries"],
    stage: "$5k+ Projects",
    verified: true,
    premierVerified: false,
    wikiSlug: "webspot",
    connectionsCount: 16,
    claimStatus: "claimed"
  },
  {
    id: "agency_tridhya_tech",
    label: "Tridhya Tech Limited",
    type: "Startup",
    location: "Serves Lebanon",
    locationType: "diaspora",
    country: "Global / Serves Lebanon",
    isDiaspora: true,
    title: "Web Development, Generative AI & Custom Software",
    bio: "Tridhya Tech Limited is a versatile technology company offering services in e-commerce development, mobile app development, UI/UX design, and custom software solutions. The company consistently receives positive feedback, with approximately 95% of reviewers highlighting their timely delivery, effective project management, and high-quality output. Clients frequently praise their communication skills, adaptability, and alignment with company values, making them a preferred partner for diverse tech-focused projects.",
    tags: ["Web Development", "Generative AI", "Mobile App Development", "Custom Software", "E-Commerce"],
    rating: 5.0,
    reviewCount: 104,
    minProjectSize: "$5,000+",
    hourlyRate: "< $25 / hr",
    teamSize: "50 - 249",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Web Development", percentage: 50 },
      { name: "Generative AI", percentage: 15 },
      { name: "Mobile App Development", percentage: 15 },
      { name: "Custom Software", percentage: 10 },
      { name: "UI/UX Design", percentage: 10 }
    ],
    highlights: ["Reviewed 7 times in past 6 months", "Experience in 12 industries", "5.0 out of 5.0 rating for cost", "Responsive"],
    stage: "$5k+ Projects",
    verified: true,
    premierVerified: true,
    wikiSlug: "tridhya-tech-limited",
    connectionsCount: 38,
    claimStatus: "claimed"
  },
  {
    id: "agency_hellotree",
    label: "Hellotree",
    type: "Startup",
    location: "Jounieh, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Web Development, Mobile App & UX/UI Design",
    bio: "Hellotree is a versatile digital solutions company specializing in web development, app development, and digital platform design. Across client reviews, 100% highlight Hellotree’s timely delivery, responsiveness, and proactive approach. Clients frequently commend their ability to understand business needs and provide innovative, tailored solutions, as reflected in improved user experiences and operational efficiencies in projects. Overall, Hellotree is praised for exceeding expectations and maintaining strong client satisfaction.",
    tags: ["Web Development", "Mobile App Development", "UX/UI Design", "Digital Platforms", "Clutch Certified"],
    rating: 5.0,
    reviewCount: 10,
    minProjectSize: "$5,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Web Development", percentage: 30 },
      { name: "Mobile App Development", percentage: 20 },
      { name: "UX/UI Design", percentage: 20 },
      { name: "Custom Software", percentage: 15 },
      { name: "E-Commerce", percentage: 15 }
    ],
    highlights: ["Unique expertise", "Reviewed 1 time in past 6 months", "4.9 out of 5.0 rating for cost", "Completed projects in 4 countries"],
    stage: "$5k+ Projects",
    verified: true,
    premierVerified: false,
    wikiSlug: "hellotree",
    connectionsCount: 18,
    claimStatus: "claimed"
  },
  {
    id: "agency_web_synergy",
    label: "Web Synergy",
    type: "Startup",
    location: "Tarablus, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Web Development, Technical SEO & AI Development",
    bio: "Web Synergy is a highly-regarded web development and digital transformation company specializing in custom e-commerce platforms and technical SEO strategies. Consistently praised for their seamless project management and strategic consultation, they boast a 100% positive feedback rate, with reviewers highlighting their ability to blend aesthetic design with elite technical performance. Approximately 60% of clients emphasize their impressive project delivery speed and responsive communication.",
    tags: ["Web Development", "Web Design", "AI Development", "Technical SEO", "E-Commerce"],
    rating: 5.0,
    reviewCount: 9,
    minProjectSize: "$1,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Web Development", percentage: 40 },
      { name: "Web Design", percentage: 15 },
      { name: "AI Development", percentage: 10 },
      { name: "E-Commerce", percentage: 20 },
      { name: "Technical SEO", percentage: 15 }
    ],
    highlights: ["Detail-oriented", "Reviewed 8 times in past 6 months", "Experience in 5 industries", "5.0 out of 5.0 rating for cost"],
    stage: "$1k+ Projects",
    verified: true,
    premierVerified: false,
    wikiSlug: "web-synergy",
    connectionsCount: 15,
    claimStatus: "claimed"
  },
  {
    id: "agency_wiz_consults",
    label: "Wiz Consults",
    type: "Startup",
    location: "Hazmieh, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "AI Development, Digital Strategy & Healthcare Tech",
    bio: "Wiz Consults is a versatile digital consulting firm providing services in SEO, web development, and digital marketing, with a particular focus on healthcare and technology sectors. They have received overwhelmingly positive feedback, with over 90% of clients expressing satisfaction with their technical expertise and ability to align their strategies with clients' unique needs. Clients frequently praised their professionalism, communication, and the tangible business results achieved through their tailored solutions.",
    tags: ["AI Development", "Digital Strategy", "Mobile App Development", "Healthcare Tech", "SEO"],
    rating: 5.0,
    reviewCount: 10,
    minProjectSize: "$1,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 20 },
      { name: "Digital Strategy", percentage: 20 },
      { name: "Mobile App Development", percentage: 20 },
      { name: "Web Development", percentage: 20 },
      { name: "SEO & Consulting", percentage: 20 }
    ],
    highlights: ["Collaborative", "Experience in 5 industries", "5.0 out of 5.0 rating for cost", "Completed projects in 3 countries"],
    stage: "$1k+ Projects",
    verified: true,
    premierVerified: false,
    wikiSlug: "wiz-consults",
    connectionsCount: 14,
    claimStatus: "claimed"
  },
  {
    id: "agency_tedmob",
    label: "TEDMOB",
    type: "Startup",
    location: "Beirut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Enterprise Custom Software & Mobile App Development",
    bio: "Launched in 2015, TEDMOB is a premier software development firm headquartered in Beirut. The firm provides Custom Software Development, Enterprise Mobile App Development, E-Commerce Development, and scalable Web platforms for top regional brands.",
    tags: ["Custom Software Development", "E-Commerce Development", "Mobile App Development", "Web Development", "Enterprise Apps"],
    rating: 4.8,
    minProjectSize: "$25,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "50 - 249",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Custom Software", percentage: 15 },
      { name: "E-Commerce Development", percentage: 15 },
      { name: "Mobile App Development", percentage: 15 },
      { name: "Web Development", percentage: 35 },
      { name: "AI & Modernization", percentage: 20 }
    ],
    stage: "$25k+ Projects",
    verified: true,
    wikiSlug: "tedmob",
    connectionsCount: 25,
    claimStatus: "claimed"
  },
  {
    id: "agency_weezli",
    label: "Weezli",
    type: "Startup",
    location: "Bayrut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "AI Consulting, Machine Learning & Business Intelligence",
    bio: "Weezli is a Bayrut, Lebanon-based AI company. Their services include Artificial Intelligence development, custom machine learning pipelines, AI Consulting, and strategic enterprise AI roadmapping.",
    tags: ["AI Consulting", "AI Development", "Business Consulting", "Machine Learning", "Workflow Automation"],
    rating: 4.7,
    minProjectSize: "Undisclosed",
    hourlyRate: "Undisclosed",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Consulting", percentage: 30 },
      { name: "AI Development", percentage: 30 },
      { name: "Business Consulting", percentage: 10 },
      { name: "Custom Software", percentage: 30 }
    ],
    stage: "Boutique AI Lab",
    verified: true,
    wikiSlug: "weezli",
    connectionsCount: 12,
    claimStatus: "claimed"
  },
  {
    id: "agency_ayc_intelligence",
    label: "AYC Intelligence",
    type: "Startup",
    location: "Beirut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "AI Development, Autonomous AI Agents & Generative AI",
    bio: "AYC Intelligence is a Beirut, Lebanon-based artificial intelligence development company. The team offers cutting-edge Artificial Intelligence architecture, autonomous AI Agents, and Generative AI systems.",
    tags: ["AI Development", "AI Agents", "Generative AI", "LLM Workflows", "Agentic Systems"],
    rating: 4.9,
    minProjectSize: "$1,000+",
    hourlyRate: "$100 - $149 / hr",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 50 },
      { name: "AI Agents", percentage: 25 },
      { name: "Generative AI", percentage: 10 },
      { name: "Custom ML", percentage: 15 }
    ],
    stage: "Specialized AI Studio",
    verified: true,
    wikiSlug: "ayc-intelligence",
    connectionsCount: 16,
    claimStatus: "claimed"
  },
  {
    id: "agency_htech",
    label: "HTech",
    type: "Startup",
    location: "Beirut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "AI Agents, Generative AI & Custom Enterprise Software",
    bio: "Artificial intelligence development company HTech is located in Beirut, Lebanon. Launched in 2023, they specialize in Artificial Intelligence, Generative AI, autonomous AI Agents, and custom software systems.",
    tags: ["AI Agents", "AI Development", "Custom Software Development", "Generative AI", "Cloud Systems"],
    rating: 4.8,
    minProjectSize: "Undisclosed",
    hourlyRate: "Undisclosed",
    teamSize: "50 - 249",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Agents", percentage: 17 },
      { name: "AI Development", percentage: 17 },
      { name: "Custom Software", percentage: 17 },
      { name: "Generative AI", percentage: 25 },
      { name: "Web Platforms", percentage: 24 }
    ],
    stage: "AI Scaleup",
    verified: true,
    wikiSlug: "htech-lebanon",
    connectionsCount: 19,
    claimStatus: "claimed"
  },
  {
    id: "agency_rak4analytics",
    label: "rak4analytics",
    type: "Startup",
    location: "Antelias, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "BI & Big Data Consulting, SI & AI Predictive Analytics",
    bio: "Rak4analytics is a big data analytics company launched in 2019 in Antelias, Lebanon. Their team focuses on BI & big data consulting & SI, Artificial Intelligence, and strategic enterprise data architectures.",
    tags: ["BI & Big Data", "AI Development", "Business Consulting", "Data Pipelines", "Predictive Analytics"],
    rating: 4.9,
    minProjectSize: "$5,000+",
    hourlyRate: "$50 - $99 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "BI & Big Data", percentage: 45 },
      { name: "AI Development", percentage: 35 },
      { name: "Business Consulting", percentage: 10 },
      { name: "Data Engineering", percentage: 10 }
    ],
    stage: "$5k+ Analytics",
    verified: true,
    wikiSlug: "rak4analytics",
    connectionsCount: 18,
    claimStatus: "claimed"
  },
  {
    id: "agency_navybits",
    label: "NavyBits",
    type: "Startup",
    location: "Tarablus, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "ERP Consulting, Enterprise App Modernization & AI",
    bio: "NavyBits is an ERP consulting and SI company based in Tarablus, Lebanon. The firm focuses on ERP consulting and SI, enterprise web development, legacy app modernization, and practical AI implementations.",
    tags: ["ERP Consulting", "AI Development", "Enterprise App Modernization", "Web Development", "Cloud ERP"],
    rating: 4.8,
    minProjectSize: "$10,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 20 },
      { name: "ERP Consulting and SI", percentage: 20 },
      { name: "Enterprise Modernization", percentage: 20 },
      { name: "Web Development", percentage: 25 },
      { name: "Custom DB", percentage: 15 }
    ],
    stage: "$10k+ ERP",
    verified: true,
    wikiSlug: "navybits",
    connectionsCount: 17,
    claimStatus: "claimed"
  },
  {
    id: "agency_netiks_international",
    label: "Netiks International",
    type: "Startup",
    location: "Bayrut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "CRM Consulting, Digital Banking & Custom Enterprise AI",
    bio: "Netiks International is a premier CRM consulting and SI company launched in 2000 in Beirut. The team offers enterprise CRM consulting, financial services software, custom development, and banking AI.",
    tags: ["CRM Consulting", "Custom Software", "AI Development", "FinTech", "Banking Tech"],
    rating: 4.8,
    minProjectSize: "$10,000+",
    hourlyRate: "$50 - $99 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "CRM Consulting & SI", percentage: 20 },
      { name: "Custom Software", percentage: 20 },
      { name: "AI Development", percentage: 10 },
      { name: "E-Banking", percentage: 30 },
      { name: "Mobile Portal", percentage: 20 }
    ],
    stage: "$10k+ Enterprise",
    verified: true,
    wikiSlug: "netiks-international",
    connectionsCount: 26,
    claimStatus: "claimed"
  },
  {
    id: "agency_lead_by_tech",
    label: "Lead By Tech",
    type: "Startup",
    location: "Bayrut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Custom Software, Web Platforms & Applied AI Solutions",
    bio: "Lead By Tech is a custom software development firm based in Bayrut, Lebanon. Their services include Custom Software Development, scalable Web Platforms, and bespoke AI workflows for startups and enterprises.",
    tags: ["Custom Software", "Web Development", "AI Development", "Cloud Architecture", "Product Engineering"],
    rating: 4.7,
    minProjectSize: "$5,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Custom Software", percentage: 30 },
      { name: "Web Development", percentage: 25 },
      { name: "AI Development", percentage: 20 },
      { name: "Mobile Apps", percentage: 15 },
      { name: "UI/UX", percentage: 10 }
    ],
    stage: "$5k+ Projects",
    verified: true,
    wikiSlug: "lead-by-tech",
    connectionsCount: 14,
    claimStatus: "claimed"
  },
  {
    id: "agency_augminter",
    label: "Augminter",
    type: "Startup",
    location: "Wata Nahr El Kalb, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "IT Strategy, Staff Augmentation & Custom AI Development",
    bio: "Augminter is an IT strategy consulting and engineering company based in Wata Nahr El Kalb, Lebanon. Their team offers IT strategy consulting, elite developer staff augmentation, and AI solutions.",
    tags: ["AI Development", "Custom Software", "IT Staff Augmentation", "IT Strategy", "Tech Sourcing"],
    rating: 4.7,
    minProjectSize: "Undisclosed",
    hourlyRate: "< $25 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 25 },
      { name: "Custom Software", percentage: 25 },
      { name: "IT Staff Augmentation", percentage: 25 },
      { name: "IT Strategy", percentage: 25 }
    ],
    stage: "Staff & AI Studio",
    verified: true,
    wikiSlug: "augminter",
    connectionsCount: 15,
    claimStatus: "claimed"
  },
  {
    id: "agency_online_dimensions",
    label: "Online Dimensions",
    type: "Startup",
    location: "Sin El Fil, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Mobile App Development, Web Platforms & AI Integrations",
    bio: "Online Dimensions is a mobile app and web development firm established in 2015 with operations in Sin El Fil, Lebanon. Their team provides native mobile apps, web solutions, and AI integrations.",
    tags: ["Mobile App Development", "Web Development", "AI Development", "UX/UI Design", "E-Commerce"],
    rating: 4.8,
    minProjectSize: "$1,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Mobile App Development", percentage: 30 },
      { name: "Web Development", percentage: 30 },
      { name: "AI Development", percentage: 20 },
      { name: "Cloud Backends", percentage: 20 }
    ],
    stage: "$1k+ Apps",
    verified: true,
    wikiSlug: "online-dimensions",
    connectionsCount: 13,
    claimStatus: "claimed"
  },
  {
    id: "agency_code_mind",
    label: "Code Mind",
    type: "Startup",
    location: "Beirut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "AI Consulting, Cloud Architecture & IT Managed Services",
    bio: "Code Mind is an IT strategy consulting and software company established in 2023 in Beirut, Lebanon. The team provides AI consulting, cloud consulting & system integration, and proactive IT managed services.",
    tags: ["AI Consulting", "Cloud Consulting & SI", "IT Managed Services", "DevOps", "Cybersecurity"],
    rating: 4.7,
    minProjectSize: "Undisclosed",
    hourlyRate: "Undisclosed",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Consulting", percentage: 20 },
      { name: "Cloud Consulting & SI", percentage: 20 },
      { name: "IT Managed Services", percentage: 20 },
      { name: "Software Dev", percentage: 40 }
    ],
    stage: "Cloud & AI Studio",
    verified: true,
    wikiSlug: "code-mind",
    connectionsCount: 12,
    claimStatus: "claimed"
  },
  {
    id: "agency_qwerty_sal",
    label: "Qwerty SAL",
    type: "Startup",
    location: "Dekwaneh, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Bespoke Web Platforms, Mobile Apps & AI Products",
    bio: "QWERTY is a bespoke software agency in Dekwaneh, Beirut, Lebanon, building web platforms, mobile applications, e-commerce stores, AI products, and custom software for clients worldwide.",
    tags: ["Custom Software Development", "AI Development", "Mobile App Development", "E-Commerce", "Web Platforms"],
    rating: 4.5,
    reviewCount: 1,
    minProjectSize: "$5,000+",
    hourlyRate: "$50 - $99 / hr",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Custom Software", percentage: 30 },
      { name: "AI Development", percentage: 20 },
      { name: "Mobile App Development", percentage: 20 },
      { name: "E-Commerce", percentage: 15 },
      { name: "Web Design", percentage: 15 }
    ],
    highlights: ["Bespoke Engineering", "Reviewed 1 project", "Global Delivery"],
    stage: "$5k+ Projects",
    verified: true,
    wikiSlug: "qwerty-sal",
    connectionsCount: 11,
    claimStatus: "claimed"
  },
  {
    id: "agency_bitwize",
    label: "Bitwize",
    type: "Startup",
    location: "Mansourieh, Lebanon & Dubai",
    locationType: "onshore_lebanon",
    country: "Lebanon / UAE",
    isDiaspora: false,
    title: "Enterprise Custom Software, Blockchain & AI Development",
    bio: "Bitwize is an established software engineering company based in Mansourieh, Lebanon and Dubai, United Arab Emirates. Their services include enterprise software development, blockchain ecosystems, and applied AI systems.",
    tags: ["AI Development", "Blockchain", "Application Management", "Custom Software", "FinTech"],
    rating: 4.7,
    minProjectSize: "$250,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "AI Development", percentage: 10 },
      { name: "Application Management", percentage: 10 },
      { name: "Blockchain", percentage: 10 },
      { name: "Custom Enterprise", percentage: 40 },
      { name: "Web/Cloud", percentage: 30 }
    ],
    stage: "$250k+ Enterprise",
    verified: true,
    wikiSlug: "bitwize",
    connectionsCount: 22,
    claimStatus: "claimed"
  },
  {
    id: "agency_pixel38",
    label: "Pixel38",
    type: "Startup",
    location: "Beirut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Website Development, Mobile Apps & AI Engineering",
    bio: "Pixel38 is a digital platform and website development firm in Beirut, Lebanon. Their team specializes in high-performance Web Development, Mobile App Development, and AI integrations for global brands.",
    tags: ["Web Development", "Mobile App Development", "AI Development", "E-Commerce", "Creative Tech"],
    rating: 4.8,
    minProjectSize: "$25,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Web Development", percentage: 30 },
      { name: "Mobile App Development", percentage: 20 },
      { name: "AI Development", percentage: 10 },
      { name: "UI/UX & Branding", percentage: 20 },
      { name: "Custom API", percentage: 20 }
    ],
    stage: "$25k+ Projects",
    verified: true,
    wikiSlug: "pixel38",
    connectionsCount: 20,
    claimStatus: "claimed"
  },
  {
    id: "agency_kloudr",
    label: "kloudr",
    type: "Startup",
    location: "Bayrut, Lebanon / Antibes / Wilmington",
    locationType: "diaspora",
    country: "Lebanon / France / USA",
    isDiaspora: true,
    title: "IT Managed Services, Cloud Architecture & AI Ops",
    bio: "Kloudr is an IT managed services and multi-cloud consulting company founded in 2018 with offices in Beirut, Lebanon, Wilmington, Delaware, and Antibes, France. They deliver 24/7 cloud management, DevOps, and cloud AI infrastructure.",
    tags: ["IT Managed Services", "Cloud Consulting & SI", "Unified Communications", "DevOps", "AI Infrastructure"],
    rating: 4.9,
    minProjectSize: "$10,000+",
    hourlyRate: "$50 - $99 / hr",
    teamSize: "10 - 49",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "IT Managed Services", percentage: 45 },
      { name: "Cloud Consulting & SI", percentage: 20 },
      { name: "Unified Communications", percentage: 15 },
      { name: "AI Cloud Ops", percentage: 20 }
    ],
    stage: "$10k+ Cloud",
    verified: true,
    wikiSlug: "kloudr",
    connectionsCount: 24,
    claimStatus: "claimed"
  },
  {
    id: "agency_eye_digital",
    label: "Eye Digital",
    type: "Startup",
    location: "Sarba, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Mobile App Development, Custom Software & Web Tech",
    bio: "Eye Digital is an app and software development firm based in Sarba, Lebanon. They specialize in Mobile App Development, Custom Software Engineering, and AI-enabled web portals for businesses.",
    tags: ["Mobile App Development", "Custom Software", "Web Development", "AI Integration", "Digital Design"],
    rating: 4.7,
    minProjectSize: "$1,000+",
    hourlyRate: "$25 - $49 / hr",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Mobile App Development", percentage: 25 },
      { name: "Custom Software", percentage: 20 },
      { name: "Web Development", percentage: 15 },
      { name: "AI Solutions", percentage: 20 },
      { name: "UI/UX", percentage: 20 }
    ],
    stage: "$1k+ Projects",
    verified: true,
    wikiSlug: "eye-digital",
    connectionsCount: 13,
    claimStatus: "claimed"
  },
  {
    id: "agency_origen",
    label: "ORIGEN",
    type: "Startup",
    location: "Bayrut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Custom Software Development, Mobile Apps & Web Platforms",
    bio: "Founded in 2022, ORIGEN is a modern software development firm based in Bayrut, Lebanon. The agile team delivers bespoke Custom Software Development, native Mobile App Development, and AI implementations.",
    tags: ["Custom Software Development", "Mobile App Development", "Web Development", "AI Features", "Product Engineering"],
    rating: 4.8,
    minProjectSize: "$5,000+",
    hourlyRate: "Undisclosed",
    teamSize: "2 - 9",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Custom Software", percentage: 25 },
      { name: "Mobile App Development", percentage: 20 },
      { name: "Web Development", percentage: 15 },
      { name: "AI Tools", percentage: 20 },
      { name: "Cloud", percentage: 20 }
    ],
    stage: "$5k+ Agile",
    verified: true,
    wikiSlug: "origen",
    connectionsCount: 12,
    claimStatus: "claimed"
  },
  {
    id: "agency_tarek_abou_rjeily",
    label: "Tarek Abou Rjeily — Software & AI",
    type: "Startup",
    location: "Beirut, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Specialized Software Engineering, CRM Systems & AI Development",
    bio: "Tarek Abou Rjeily — Software & AI Development is an expert consultancy in Beirut, Lebanon, providing Custom Software Development, CRM consulting and system integrations, and tailored AI solutions.",
    tags: ["Custom Software Development", "CRM Consulting and SI", "AI Development", "Full-Stack Web", "Automation"],
    rating: 4.9,
    minProjectSize: "$1,000+",
    hourlyRate: "$50 - $99 / hr",
    teamSize: "Freelancer / Principal",
    servesLebanon: true,
    servicesBreakdown: [
      { name: "Custom Software", percentage: 35 },
      { name: "CRM Consulting & SI", percentage: 25 },
      { name: "AI Development", percentage: 20 },
      { name: "Automation", percentage: 20 }
    ],
    stage: "$1k+ Consultancy",
    verified: true,
    wikiSlug: "tarek-abou-rjeily",
    connectionsCount: 15,
    claimStatus: "claimed"
  },

  // ==========================================
  // 2. GURUS & RESEARCH SCIENTISTS
  // ==========================================
  {
    id: "guru_jad_hobeika",
    label: "Dr. Jad Hobeika",
    type: "Guru",
    location: "Beirut (Hamra)",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Principal AI Scientist | Ex-Meta FAIR | AUB Adjunct",
    bio: "Pioneered FlashAttention-Arabic extensions and distributed model sharding across heterogeneous clusters. Mentoring 12 Lebanese AI research fellows.",
    tags: ["LLM Architectures", "Distributed Training", "PyTorch Core", "CUDA Kernels"],
    proficiency: 0.98,
    verified: true,
    wikiSlug: "jad-hobeika",
    connectionsCount: 26,
    claimStatus: "claimed"
  },
  {
    id: "guru_nour_khoury",
    label: "Nour Khoury",
    type: "Guru",
    location: "San Francisco, CA",
    locationType: "diaspora",
    country: "USA",
    isDiaspora: true,
    title: "Staff Research Engineer @ Anthropic | LebNet Member",
    bio: "AUB Computer Engineering alum in the Bay Area specializing in AI alignment, mechanistic interpretability, and red-teaming frontier models.",
    tags: ["Mechanistic Interpretability", "RLHF", "AI Safety", "Constitutional AI"],
    proficiency: 0.96,
    verified: true,
    wikiSlug: "nour-khoury",
    connectionsCount: 24,
    claimStatus: "claimed"
  },
  {
    id: "guru_sami_haddad",
    label: "Sami Haddad",
    type: "Guru",
    location: "Byblos, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Robotics Lead @ LAU Autonomous Systems Lab",
    bio: "Published in IEEE IROS on realtime LiDAR-inertial odometry on embedded Jetson Orin nodes. Building hardware prototypes in Byblos.",
    tags: ["ROS 2", "LiDAR Odometry", "C++20", "Embedded Linux"],
    proficiency: 0.92,
    verified: true,
    wikiSlug: "sami-haddad",
    connectionsCount: 16,
    claimStatus: "claimed"
  },
  {
    id: "guru_maya_zein",
    label: "Maya Zein",
    type: "Guru",
    location: "Paris, France",
    locationType: "diaspora",
    country: "France",
    isDiaspora: true,
    title: "Generative Video & Diffusion Architect @ Mistral AI",
    bio: "USJ alumni, INRIA PhD. Working on latent diffusion spatial-temporal transformers and 4K real-time neural rendering.",
    tags: ["Diffusion Models", "Neural Rendering", "Generative Video", "JAX/Flax"],
    proficiency: 0.95,
    verified: true,
    wikiSlug: "maya-zein",
    connectionsCount: 21,
    claimStatus: "claimed"
  },
  {
    id: "guru_charbel_assi",
    label: "Charbel Assi",
    type: "Guru",
    location: "Beirut (Mar Mikhael)",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Lead MLOps Engineer & GPU Cluster Architect",
    bio: "Architected resilient off-grid GPU clusters powered by hybrid solar + diesel telemetry at Beirut Digital District.",
    tags: ["Kubernetes (K8s)", "Triton Server", "MLOps", "GPU Optimization"],
    proficiency: 0.91,
    verified: true,
    wikiSlug: "charbel-assi",
    connectionsCount: 15,
    claimStatus: "claimed"
  },
  {
    id: "guru_fadi_chehadah",
    label: "Dr. Fadi Chehadah",
    type: "Guru",
    location: "Boston & Beirut",
    locationType: "diaspora",
    country: "USA / Lebanon",
    isDiaspora: true,
    title: "MIT Media Lab Fellow | Founder of NeuroLevant",
    bio: "AUB and MIT alumna developing low-cost multimodal neurological biomarker extraction algorithms for Parkinson and Alzheimer detection.",
    tags: ["NeuroTech", "Biomarkers", "Signal Processing", "Edge Health"],
    proficiency: 0.94,
    verified: true,
    wikiSlug: "fadi-chehadah",
    connectionsCount: 22,
    claimStatus: "claimed"
  },
  {
    id: "guru_rana_el_kaliouby",
    label: "Dr. Rana el Kaliouby",
    type: "Guru",
    location: "Boston, MA",
    locationType: "diaspora",
    country: "USA",
    isDiaspora: true,
    title: "Pioneer in Emotion AI | Co-Founder Affectiva | General Partner Blue Collective",
    bio: "Leading Arab-American AI pioneer, author of 'Girl Decoded', investor in early-stage DeepTech with deep roots in MENA ecosystem development.",
    tags: ["Emotion AI", "Affective Computing", "DeepTech Angel", "Ethical AI"],
    proficiency: 0.99,
    verified: true,
    wikiSlug: "rana-el-kaliouby",
    connectionsCount: 38,
    claimStatus: "claimed"
  },

  // ==========================================
  // 3. VENTURE CAPITAL & ANGEL SYNDICATES
  // ==========================================
  {
    id: "inv_cedar_ai_ventures",
    label: "Cedar AI Syndicate",
    type: "Investor",
    location: "Dubai & Beirut",
    locationType: "diaspora",
    country: "UAE / Lebanon",
    isDiaspora: true,
    title: "$25M Fund targeting Levantine DeepTech & AI",
    bio: "Backing high-conviction technical founders bridging Lebanese engineering talent with GCC enterprise deployment.",
    tags: ["Seed", "Pre-Seed", "Enterprise AI", "DeepTech"],
    ticketSize: "$250k - $1,000,000",
    stage: "Seed / Pre-Seed",
    verified: true,
    wikiSlug: "cedar-ai-ventures",
    connectionsCount: 34,
    claimStatus: "claimed"
  },
  {
    id: "inv_lebnet_angels",
    label: "LebNet Silicon Valley Angels",
    type: "Investor",
    location: "San Francisco & Palo Alto",
    locationType: "diaspora",
    country: "USA",
    isDiaspora: true,
    title: "150+ Diaspora Tech Executives & Operators",
    bio: "Network of Lebanese leaders at Google, Apple, Meta, Nvidia, and Stanford providing early catalytic checks ($50k-$250k) and US market access.",
    tags: ["Angel Syndicate", "Pre-Seed", "Diaspora Network", "US GTM"],
    ticketSize: "$50k - $250,000",
    stage: "Pre-Seed / Seed",
    verified: true,
    wikiSlug: "lebnet-angels",
    connectionsCount: 42,
    claimStatus: "claimed"
  },
  {
    id: "inv_phoenician_fund",
    label: "Phoenician Frontier Capital",
    type: "Investor",
    location: "Beirut & London",
    locationType: "diaspora",
    country: "UK / Lebanon",
    isDiaspora: true,
    title: "Early-Stage Cross-Border Venture Fund",
    bio: "Invests in software, fintech, and AI ventures operating between Beirut and London. Focuses on capital efficiency and global export.",
    tags: ["Early Stage", "Series A", "Fintech", "Applied AI"],
    ticketSize: "$500k - $2,000,000",
    stage: "Seed / Series A",
    verified: true,
    wikiSlug: "phoenician-fund",
    connectionsCount: 28,
    claimStatus: "claimed"
  },
  {
    id: "inv_middle_east_venture_partners",
    label: "MEVP (Middle East Venture Partners)",
    type: "Investor",
    location: "Beirut, Dubai & Riyadh",
    locationType: "onshore_lebanon",
    country: "Lebanon / UAE / KSA",
    isDiaspora: false,
    title: "Top Tier MENA VC Managing $300M+ AUM",
    bio: "One of the earliest and largest VC firms in the region with extensive early-stage & growth portfolios in tech and AI.",
    tags: ["Early Stage", "Series A", "Series B", "Fintech", "Enterprise AI"],
    ticketSize: "$1,000,000 - $5,000,000",
    stage: "Series A / Series B",
    verified: true,
    wikiSlug: "mevp-venture-partners",
    connectionsCount: 46,
    claimStatus: "claimed"
  },
  {
    id: "inv_cedar_mundi_ventures",
    label: "Cedar Mundi Ventures",
    type: "Investor",
    location: "Beirut & Madrid",
    locationType: "onshore_lebanon",
    country: "Lebanon / Spain",
    isDiaspora: false,
    title: "Venture Capital Arm of Mundi Ventures in Lebanon",
    bio: "Empowering Lebanese-founded tech scaleups expanding across Europe, LatAm, and GCC with institutional European co-investors.",
    tags: ["Cross-Border VC", "Seed", "Series A", "InsurTech", "DeepTech"],
    ticketSize: "$500k - $2,500,000",
    stage: "Seed / Series A",
    verified: true,
    wikiSlug: "cedar-mundi-ventures",
    connectionsCount: 31,
    claimStatus: "claimed"
  },
  {
    id: "inv_imar_venture_capital",
    label: "IM Capital (Innovate MENA)",
    type: "Investor",
    location: "Beirut (BDD)",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Early-Stage Matching Capital & Angel Network Enabler",
    bio: "Supporting early-stage Lebanese ventures with co-investment matching capital, Seeders Capital angel network, and mentoring.",
    tags: ["Matching Capital", "Angel Network", "Pre-Seed", "Co-Investment"],
    ticketSize: "$100k - $400,000",
    stage: "Pre-Seed / Seed",
    verified: true,
    wikiSlug: "im-capital-lebanon",
    connectionsCount: 36,
    claimStatus: "claimed"
  },
  {
    id: "inv_speed_lebanon",
    label: "Speed Accelerator Seed Fund",
    type: "Investor",
    location: "Beirut Digital District",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Seed Acceleration & First-Cheque Enabler in Lebanon",
    bio: "Seed stage tech accelerator that has funded 60+ Lebanese startups with catalytic capital, Silicon Valley immersion, and follow-on syndicates.",
    tags: ["Accelerator", "First Cheque", "Pre-Seed", "Founder Mentorship"],
    ticketSize: "$30k - $100,000",
    stage: "Pre-Seed",
    verified: true,
    wikiSlug: "speed-lebanon-seed-fund",
    connectionsCount: 39,
    claimStatus: "claimed"
  },

  // ==========================================
  // 4. HUBS, ACCELERATORS & UNIVERSITIES
  // ==========================================
  {
    id: "hub_aub",
    label: "American University of Beirut (AUB)",
    type: "Hub",
    location: "Beirut (Bliss St)",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "AUB Artificial Intelligence & Data Science Initiative",
    bio: "Premier research university in the Middle East with world-class faculty in electrical & computer engineering, natural language processing, and robotics.",
    tags: ["University", "Academic Research", "Talent Pool", "AI Labs"],
    verified: true,
    wikiSlug: "aub-ai-initiative",
    connectionsCount: 48
  },
  {
    id: "hub_berytech",
    label: "Berytech Innovation Park",
    type: "Hub",
    location: "Mar Roukoz & BDD, Beirut",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Leading Technology Incubator & Accelerator in Lebanon",
    bio: "Providing co-working, grants, lab equipment, and cross-border acceleration programs for Lebanese tech startups since 2002.",
    tags: ["Incubator", "Accelerator", "Grants", "Ecosystem"],
    verified: true,
    wikiSlug: "berytech",
    connectionsCount: 52
  },
  {
    id: "hub_bdd",
    label: "Beirut Digital District (BDD)",
    type: "Hub",
    location: "Bachoura, Beirut",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "Lebanon's Flagship Smart Tech & Innovation Cluster",
    bio: "Home to 1,500+ tech workers, leading startups, venture capital funds, and modern off-grid high-bandwidth infrastructure.",
    tags: ["Tech Hub", "Co-Working", "Ecosystem Epicenter", "Fibre Grid"],
    verified: true,
    wikiSlug: "beirut-digital-district",
    connectionsCount: 55
  },
  {
    id: "hub_lau",
    label: "Lebanese American University (LAU)",
    type: "Hub",
    location: "Byblos & Beirut",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "LAU School of Engineering & Autonomous Systems Lab",
    bio: "Cutting-edge mechatronics, embedded robotics, and data science research centers.",
    tags: ["University", "Robotics", "Embedded AI"],
    verified: true,
    wikiSlug: "lau-engineering",
    connectionsCount: 34
  },
  {
    id: "hub_lebnet",
    label: "LebNet Global Diaspora Network",
    type: "Hub",
    location: "Silicon Valley, Boston, NYC, Montreal, Dubai",
    locationType: "diaspora",
    country: "Global",
    isDiaspora: true,
    title: "North America's Largest Lebanese Tech Community",
    bio: "Connecting over 1,500 Lebanese diaspora tech professionals, founders, and investors worldwide.",
    tags: ["Diaspora", "Mentorship", "Angel Syndicates", "Global GTM"],
    verified: true,
    wikiSlug: "lebnet-global",
    connectionsCount: 58
  },
  {
    id: "hub_life_lebanon",
    label: "LIFE Lebanon (Worldwide)",
    type: "Hub",
    location: "London, Paris, Geneva, New York, Dubai",
    locationType: "diaspora",
    country: "Global",
    isDiaspora: true,
    title: "Global Network of Lebanese Finance & Tech Leaders",
    bio: "Over 1,000 senior diaspora executives empowering Lebanese youth through tech scholarships, mentorship, and economic support.",
    tags: ["Diaspora", "Scholarships", "Venture Mentorship", "Finance Bridge"],
    verified: true,
    wikiSlug: "life-lebanon-global",
    connectionsCount: 44
  },
  {
    id: "hub_usj",
    label: "Université Saint-Joseph (USJ / ESIB)",
    type: "Hub",
    location: "Mar Roukoz, Lebanon",
    locationType: "onshore_lebanon",
    country: "Lebanon",
    isDiaspora: false,
    title: "ESIB Engineering & Applied Computer Vision Labs",
    bio: "Top engineering school in Lebanon with renowned alumni in European AI labs, INRIA, and aerospace computing.",
    tags: ["University", "Engineering", "Algorithms", "Computer Vision"],
    verified: true,
    wikiSlug: "usj-esib-engineering",
    connectionsCount: 30
  },

  // ==========================================
  // 5. CORE DEEP TECH SKILLS
  // ==========================================
  {
    id: "skill_llm_quant",
    label: "LLM Quantization (AWQ/GPTQ)",
    type: "Skill",
    tags: ["Deep Tech", "Inference Speed"],
    proficiency: 0.95,
    verified: true
  },
  {
    id: "skill_arabic_nlp",
    label: "Arabic Dialectal NLP",
    type: "Skill",
    tags: ["NLP", "Multilingual"],
    proficiency: 0.98,
    verified: true
  },
  {
    id: "skill_cuda",
    label: "CUDA & Kernel Optimization",
    type: "Skill",
    tags: ["Hardware", "High Performance"],
    proficiency: 0.92,
    verified: true
  },
  {
    id: "skill_edge_cv",
    label: "Edge Computer Vision & TensorRT",
    type: "Skill",
    tags: ["Vision", "Embedded"],
    proficiency: 0.90,
    verified: true
  },
  {
    id: "skill_rlhf",
    label: "RLHF & Model Alignment",
    type: "Skill",
    tags: ["Safety", "Alignment"],
    proficiency: 0.94,
    verified: true
  }
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  // Startups to Skills
  { id: "e1", source: "startup_cedars_llm", target: "skill_llm_quant", relationship: "HAS_CORE_COMPETENCY", weight: 0.95, verified: true },
  { id: "e2", source: "startup_cedars_llm", target: "skill_arabic_nlp", relationship: "HAS_CORE_COMPETENCY", weight: 0.98, verified: true },
  { id: "e3", source: "startup_phoenicia_vision", target: "skill_edge_cv", relationship: "HAS_CORE_COMPETENCY", weight: 0.92, verified: true },
  { id: "e4", source: "startup_beirut_neurotech", target: "skill_cuda", relationship: "HAS_CORE_COMPETENCY", weight: 0.88, verified: true },

  // Gurus to Skills
  { id: "e5", source: "guru_jad_hobeika", target: "skill_llm_quant", relationship: "MASTERED", weight: 0.99, verified: true },
  { id: "e6", source: "guru_jad_hobeika", target: "skill_arabic_nlp", relationship: "MASTERED", weight: 0.96, verified: true },
  { id: "e7", source: "guru_nour_khoury", target: "skill_rlhf", relationship: "MASTERED", weight: 0.98, verified: true },
  { id: "e8", source: "guru_charbel_assi", target: "skill_cuda", relationship: "MASTERED", weight: 0.93, verified: true },

  // Gurus to Startups (Advising/Founding)
  { id: "e9", source: "guru_jad_hobeika", target: "startup_cedars_llm", relationship: "CHIEF_SCIENTIST_OF", weight: 0.95, verified: true },
  { id: "e10", source: "guru_nour_khoury", target: "startup_cedars_llm", relationship: "TECHNICAL_ADVISOR", weight: 0.85, verified: true },
  { id: "e11", source: "guru_sami_haddad", target: "startup_levant_robotics", relationship: "FOUNDED", weight: 1.0, verified: true },
  { id: "e12", source: "guru_charbel_assi", target: "startup_phoenicia_vision", relationship: "MLOPS_ADVISOR", weight: 0.80, verified: true },

  // Hubs & Universities Links
  { id: "e13", source: "startup_cedars_llm", target: "hub_aub", relationship: "ALUMNI_SPINOUT", weight: 0.90, verified: true },
  { id: "e14", source: "startup_phoenicia_vision", target: "hub_berytech", relationship: "INCUBATED_AT", weight: 1.0, verified: true },
  { id: "e15", source: "startup_levant_robotics", target: "hub_lau", relationship: "RESEARCH_SPINOUT", weight: 0.92, verified: true },
  { id: "e16", source: "guru_jad_hobeika", target: "hub_aub", relationship: "ADJUNCT_FACULTY", weight: 0.95, verified: true },
  { id: "e17", source: "guru_nour_khoury", target: "hub_lebnet", relationship: "EXECUTIVE_MEMBER", weight: 0.90, verified: true },
  { id: "e17b", source: "startup_augment_energy", target: "hub_bdd", relationship: "BASED_IN", weight: 0.95, verified: true },
  { id: "e17c", source: "startup_synapse_analytics", target: "hub_bdd", relationship: "OFFICE_BRANCH", weight: 0.88, verified: true },
  { id: "e17d", source: "guru_fadi_chehadah", target: "hub_aub", relationship: "ALUMNUS", weight: 0.95, verified: true },
  { id: "e17e", source: "guru_rana_el_kaliouby", target: "hub_lebnet", relationship: "GLOBAL_AMBASSADOR", weight: 0.98, verified: true },

  // Investors to Startups & Hubs
  { id: "e18", source: "inv_cedar_ai_ventures", target: "startup_cedars_llm", relationship: "LEAD_TERM_SHEET_OFFERED", weight: 0.92, verified: true },
  { id: "e19", source: "inv_lebnet_angels", target: "startup_cedars_llm", relationship: "SYNDICATE_CO_INVESTOR", weight: 0.88, verified: true },
  { id: "e20", source: "inv_lebnet_angels", target: "hub_lebnet", relationship: "SYNDICATE_ARM", weight: 1.0, verified: true },
  { id: "e21", source: "inv_phoenician_fund", target: "startup_qadisha_medai", relationship: "INVESTED_IN", weight: 0.85, verified: true },
  { id: "e22", source: "inv_cedar_ai_ventures", target: "hub_berytech", relationship: "ECOSYSTEM_PARTNER", weight: 0.90, verified: true },
  { id: "e23", source: "inv_middle_east_venture_partners", target: "startup_synapse_analytics", relationship: "CO_LEAD_SERIES_A", weight: 0.94, verified: true },
  { id: "e24", source: "inv_cedar_mundi_ventures", target: "startup_proximie_ai", relationship: "PORTFOLIO_COMPANY", weight: 0.91, verified: true },
  { id: "e25", source: "inv_imar_venture_capital", target: "startup_augment_energy", relationship: "SEED_MATCH_GRANT", weight: 0.89, verified: true },
  { id: "e26", source: "inv_speed_lebanon", target: "startup_levant_voice_ai", relationship: "ACCELERATED_BATCH_12", weight: 0.96, verified: true }
];

export const INITIAL_WIKI_DOCUMENTS: WikiDocument[] = [
  {
    slug: "cedars-llm",
    title: "CedarsLLM: Arabic Enterprise Foundation Models",
    entityType: "Startup",
    lastUpdated: "2026-08-20",
    author: "Karpathy LLM Wiki Daemon",
    frontmatter: {
      aliases: ["CedarsAI", "Cedars Foundation Models"],
      location: "Beirut (Hamra) & San Francisco, CA",
      isDiaspora: false,
      verificationLevel: "Tier 1 (Verified)",
      connectedEntities: ["Dr. Jad Hobeika", "Nour Khoury", "American University of Beirut (AUB)", "Cedar AI Syndicate", "LebNet Silicon Valley Angels"]
    },
    summary: "High-performance Arabic LLMs fine-tuned on curated Levantine and Gulf dialectal corpora, leveraging 4-bit AWQ quantization for edge and sovereign on-prem banking servers.",
    markdownContent: `# CedarsLLM

**Entity Type**: AI Foundation Model Startup  
**Ecosystem Roots**: [[American University of Beirut (AUB)]] Spinout  
**Key Personnel**: [[Dr. Jad Hobeika]] (Chief Scientist), [[Nour Khoury]] (Advisory Board)  
**Affiliated Investors**: [[Cedar AI Syndicate]], [[LebNet Silicon Valley Angels]]  
**Core Stack**: [[LLM Quantization (AWQ/GPTQ)]], [[Arabic Dialectal NLP]], [[CUDA & Kernel Optimization]]

---

## 1. Executive Synopsis
CedarsLLM solves the sovereign data and dialectal comprehension bottleneck for Middle Eastern enterprises. While generic frontier models (OpenAI, Gemini) excel at Standard Modern Arabic (MSA), they degrade by up to 34% on spoken Gulf, Levantine, and Egyptian colloquial business queries.

CedarsLLM produces 8B and 32B parameter models that:
1. Match GPT-4 accuracy on Arabic financial reasoning benchmarks.
2. Execute at 115 tokens/second on single NVIDIA A10G/L4 GPUs via custom AWQ kernels.
3. Offer complete on-premise zero-data-leakage deployments for GCC central banks and telecom operators.

---

## 2. The Lebanese Talent & Diaspora Arbitrage
- **Engineering Core**: 8 senior AI researchers based in Beirut earning top-decile local comp (~$4,500/mo), achieving a **3.8x cost efficiency advantage** over equivalent Silicon Valley engineering teams ($280k/yr).
- **Diaspora Bridge**: Led by [[Nour Khoury]] in San Francisco and [[LebNet Silicon Valley Angels]] for enterprise pipeline closure in North America and Riyadh.

---

## 3. Knowledge Graph Linkages
- Incubated / Affiliated with: [[Berytech Innovation Park]]
- Research Collaboration: [[AUB Artificial Intelligence & Data Science Initiative]]
- Target Round: Seed ($1.2M at $8.5M cap)`,
    backlinks: ["jad-hobeika", "nour-khoury", "cedar-ai-ventures", "lebnet-angels", "aub-ai-initiative"],
    outlinks: ["jad-hobeika", "nour-khoury", "aub-ai-initiative", "cedar-ai-ventures", "lebnet-angels", "berytech"]
  },
  {
    slug: "jad-hobeika",
    title: "Dr. Jad Hobeika (AI Architect & Researcher)",
    entityType: "Guru",
    lastUpdated: "2026-08-22",
    author: "Graph Profiler Agent",
    frontmatter: {
      aliases: ["J. Hobeika", "Jad Hobeika PhD"],
      location: "Beirut, Lebanon",
      isDiaspora: false,
      verificationLevel: "Tier 1 (Verified)",
      connectedEntities: ["CedarsLLM", "American University of Beirut (AUB)", "PyTorch Core", "Meta AI"]
    },
    summary: "Top 1% LLM systems scientist in the MENA region. Specializes in heterogeneous GPU scheduling, sparse attention mechanisms, and Arabic tokenizers.",
    markdownContent: `# Dr. Jad Hobeika

**Role**: Chief Scientist @ [[CedarsLLM]] & Adjunct Professor @ [[American University of Beirut (AUB)]]  
**Location**: Beirut (Hamra), Lebanon  
**Top Competencies**: [[LLM Quantization (AWQ/GPTQ)]], [[Arabic Dialectal NLP]], [[CUDA & Kernel Optimization]]

---

## Background & Track Record
- **PhD in Computer Science**: EPFL / Stanford visiting fellow.
- **Former Research Scientist**: Meta FAIR (Distributed AI Systems).
- **Returned to Beirut in 2024**: Established the Levantine Neural Compute initiative to train 50+ local engineers in high-performance GPU programming.

---

## Connected Graph Nodes
- Startup Node: [[CedarsLLM]]
- Academic Node: [[American University of Beirut (AUB)]]
- Syndicate Backer: [[Cedar AI Syndicate]]`,
    backlinks: ["cedars-llm", "aub-ai-initiative", "cedar-ai-ventures"],
    outlinks: ["cedars-llm", "aub-ai-initiative", "cedar-ai-ventures"]
  },
  {
    slug: "mevp-venture-partners",
    title: "MEVP (Middle East Venture Partners)",
    entityType: "Investor",
    lastUpdated: "2026-08-23",
    author: "Ecosystem Ingestion Daemon",
    frontmatter: {
      aliases: ["MEVP", "Middle East Venture Partners"],
      location: "Beirut, Dubai & Riyadh",
      isDiaspora: false,
      verificationLevel: "Tier 1 (Verified)",
      connectedEntities: ["Synapse Analytics Lebanon", "Beirut Digital District (BDD)", "Berytech Innovation Park"]
    },
    summary: "Premier Middle East venture capital firm with over $300M in Assets Under Management, backing transformative fintech, enterprise SaaS, and AI leaders.",
    markdownContent: `# Middle East Venture Partners (MEVP)

**Entity Type**: Institutional Venture Capital Firm  
**Headquarters**: Beirut (BDD), Dubai, and Riyadh  
**Active Funds**: Middle East Venture Fund I, II, and III  
**AUM**: $300M+  
**Target Stages**: Series A ($1M - $3M) and Series B ($3M - $5M)

---

## Investment Focus in AI & Deep Tech
MEVP targets defensible technology platforms bridging technical innovation in the Levant with commercial expansion into the GCC sovereign markets (Saudi Arabia, UAE) and North America.

### Flagship Synergies:
- Portfolio Company: [[Synapse Analytics Lebanon]]
- Hub Nexus: [[Beirut Digital District (BDD)]]
- Collaboration: [[Berytech Innovation Park]]`,
    backlinks: ["synapse-analytics", "beirut-digital-district"],
    outlinks: ["synapse-analytics", "beirut-digital-district", "berytech"]
  },
  {
    slug: "beirut-digital-district",
    title: "Beirut Digital District (BDD)",
    entityType: "Hub",
    lastUpdated: "2026-08-24",
    author: "Karpathy Daemon",
    frontmatter: {
      aliases: ["BDD", "Beirut Digital District"],
      location: "Beirut, Lebanon",
      isDiaspora: false,
      verificationLevel: "Tier 1 (Verified)",
      connectedEntities: ["CedarSmart Energy AI", "Synapse Analytics Lebanon", "MEVP (Middle East Venture Partners)", "Speed Accelerator Seed Fund"]
    },
    summary: "Lebanon's premier technological and digital hub hosting over 120 startups, venture firms, and deep tech labs with resilient off-grid electrical and fiber networks.",
    markdownContent: `# Beirut Digital District (BDD)

**Category**: Technology Innovation Epicenter  
**Location**: Bachoura, Beirut, Lebanon  
**Capacity**: 1,500+ tech engineers, designers, and venture capitalists  

---

## Infrastructure Resilience
- **Uninterrupted Power**: 24/7 solar microgrid and backup diesel generation.
- **Redundant Connectivity**: Dual optical fiber internet paths connecting directly to IMEWE and BERYT submarine cables.
- **Community**: Hosts [[Speed Accelerator Seed Fund]], [[MEVP (Middle East Venture Partners)]], [[IM Capital (Innovate MENA)]], and [[CedarSmart Energy AI]].`,
    backlinks: ["cedarsmart-energy-ai", "synapse-analytics", "mevp-venture-partners", "speed-lebanon-seed-fund"],
    outlinks: ["cedarsmart-energy-ai", "synapse-analytics", "mevp-venture-partners", "speed-lebanon-seed-fund"]
  },
  {
    slug: "synapse-analytics",
    title: "Synapse Analytics: Financial Decisioning & Explainable AI",
    entityType: "Startup",
    lastUpdated: "2026-08-22",
    author: "Ecosystem Ingestion Daemon",
    frontmatter: {
      aliases: ["Synapse AI", "Synapse Analytics"],
      location: "Beirut & Cairo",
      isDiaspora: false,
      verificationLevel: "Tier 1 (Verified)",
      connectedEntities: ["MEVP (Middle East Venture Partners)", "Beirut Digital District (BDD)"]
    },
    summary: "Leading financial ML decision engine driving credit risk assessment, fraud prevention, and real-time behavioral credit scoring for banks.",
    markdownContent: `# Synapse Analytics

**Entity Type**: Applied Enterprise AI Startup  
**Sector**: Fintech & Enterprise Decision Intelligence  
**Stage**: Series A ($2.5M Target)  
**Location**: Beirut (BDD) & Cairo  

---

## Product & Technology Moat
Synapse builds patented explainable AI credit algorithms and automated compliance scoring that integrate directly with legacy core banking databases (Oracle, Temenos).`,
    backlinks: ["mevp-venture-partners", "beirut-digital-district"],
    outlinks: ["mevp-venture-partners", "beirut-digital-district"]
  }
];

export const INITIAL_MATCH_RESULTS: MatchResult[] = [
  {
    startupId: "startup_cedars_llm",
    startupName: "CedarsLLM",
    startupLogo: "🌲",
    startupStage: "Seed ($1.2M)",
    startupLocation: "Beirut & SF",
    investorId: "inv_cedar_ai_ventures",
    investorName: "Cedar AI Syndicate",
    investorLogo: "🏛️",
    investorTicket: "$250k - $1M",
    investorLocation: "Dubai & Beirut",
    totalScore: 0.942,
    breakdown: {
      domainSim: 0.96,
      stageCheck: 0.95,
      skillOverlap: 0.92,
      diasporaSynergy: 0.94
    },
    rationale: "Unmatched thesis fit: Investor has direct GCC enterprise LP network requiring sovereign Arabic LLMs, while startup holds top AUB research pedigree and 3.8x engineering cost arbitrage.",
    synergyTags: ["GCC Enterprise GTM", "Diaspora Bridge", "Arabic NLP Moat", "Seed Fit"]
  },
  {
    startupId: "startup_cedars_llm",
    startupName: "CedarsLLM",
    startupLogo: "🌲",
    startupStage: "Seed ($1.2M)",
    startupLocation: "Beirut & SF",
    investorId: "inv_lebnet_angels",
    investorName: "LebNet Silicon Valley Angels",
    investorLogo: "🌉",
    investorTicket: "$50k - $250k",
    investorLocation: "San Francisco, CA",
    totalScore: 0.915,
    breakdown: {
      domainSim: 0.90,
      stageCheck: 0.88,
      skillOverlap: 0.94,
      diasporaSynergy: 0.97
    },
    rationale: "Maximum diaspora leverage: Advisor Nour Khoury is active LebNet leader; unlocks immediate intros to Nvidia Inception and US sovereign cloud architects.",
    synergyTags: ["Silicon Valley Network", "US Cloud Access", "Nour Khoury Advisor Link"]
  },
  {
    startupId: "startup_synapse_analytics",
    startupName: "Synapse Analytics Lebanon",
    startupLogo: "⚡",
    startupStage: "Series A ($2.5M)",
    startupLocation: "Beirut & Cairo",
    investorId: "inv_middle_east_venture_partners",
    investorName: "MEVP (Middle East Venture Partners)",
    investorLogo: "🏦",
    investorTicket: "$1M - $5M",
    investorLocation: "Beirut, Dubai & Riyadh",
    totalScore: 0.955,
    breakdown: {
      domainSim: 0.97,
      stageCheck: 0.98,
      skillOverlap: 0.92,
      diasporaSynergy: 0.95
    },
    rationale: "Direct institutional synergy: MEVP portfolio banks in UAE and Saudi Arabia are active deployment targets for Synapse explainable credit AI engines.",
    synergyTags: ["Tier-1 MENA VC", "Enterprise Banking Pipeline", "Series A Match"]
  },
  {
    startupId: "startup_phoenicia_vision",
    startupName: "Phoenicia Vision",
    startupLogo: "🦅",
    startupStage: "Pre-Seed ($400k)",
    startupLocation: "Beirut (BDD)",
    investorId: "inv_phoenician_fund",
    investorName: "Phoenician Frontier Capital",
    investorLogo: "⚓",
    investorTicket: "$500k - $2M",
    investorLocation: "Beirut & London",
    totalScore: 0.845,
    breakdown: {
      domainSim: 0.88,
      stageCheck: 0.78,
      skillOverlap: 0.86,
      diasporaSynergy: 0.89
    },
    rationale: "Strong regional AgroTech thesis with potential UK/EU expansion; slight stage misalignment (Investor prefers Series A checks, but syndicate slot available).",
    synergyTags: ["AgroTech GTM", "UK Horizon Grant Fit", "Berytech Accelerated"]
  },
  {
    startupId: "startup_qadisha_medai",
    startupName: "Qadisha MedAI",
    startupLogo: "🩺",
    startupStage: "Series A ($3.5M)",
    startupLocation: "Tripoli & Paris",
    investorId: "inv_cedar_mundi_ventures",
    investorName: "Cedar Mundi Ventures",
    investorLogo: "🌍",
    investorTicket: "$500k - $2.5M",
    investorLocation: "Beirut & Madrid",
    totalScore: 0.938,
    breakdown: {
      domainSim: 0.95,
      stageCheck: 0.94,
      skillOverlap: 0.92,
      diasporaSynergy: 0.94
    },
    rationale: "Ideal European cross-border bridge: Cedar Mundi's European health network accelerates CE-mark validation and hospital deployments across France and Spain.",
    synergyTags: ["European Expansion", "Clinical MedAI Validation", "France-Spain Bridge"]
  },
  {
    startupId: "startup_augment_energy",
    startupName: "CedarSmart Energy AI",
    startupLogo: "☀️",
    startupStage: "Seed ($800k)",
    startupLocation: "Beirut (BDD)",
    investorId: "inv_imar_venture_capital",
    investorName: "IM Capital (Innovate MENA)",
    investorLogo: "🌱",
    investorTicket: "$100k - $400k",
    investorLocation: "Beirut (BDD)",
    totalScore: 0.912,
    breakdown: {
      domainSim: 0.92,
      stageCheck: 0.94,
      skillOverlap: 0.88,
      diasporaSynergy: 0.91
    },
    rationale: "Co-located at Beirut Digital District with direct matching capital grant eligibility for clean-tech and microgrid resilience.",
    synergyTags: ["BDD Resident", "IM Capital Matching Grant", "Energy Transition"]
  }
];

export const POSTGRES_SCHEMAS: PostgresTableSchema[] = [
  {
    tableName: "organizations",
    description: "Multi-tenant tenant root with Row-Level Security (RLS) policies",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY DEFAULT gen_random_uuid()", description: "Unique Tenant Identifier" },
      { name: "name", type: "VARCHAR(255)", constraints: "NOT NULL", description: "Org name (e.g. VC firm, startup lab, or talent agency)" },
      { name: "slug", type: "VARCHAR(100)", constraints: "UNIQUE NOT NULL", description: "Vanity subdomain or route slug" },
      { name: "tier", type: "VARCHAR(50)", constraints: "DEFAULT 'freemium'", description: "'freemium' | 'guru' | 'startup' | 'enterprise_vc'" },
      { name: "credit_balance", type: "INTEGER", constraints: "DEFAULT 50", description: "Available AI graph query & match tokens" },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: "DEFAULT NOW()", description: "Creation timestamp" }
    ],
    rlsPolicySql: `ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY org_isolation_policy ON organizations
  FOR ALL
  USING (id = current_setting('app.current_tenant_id')::UUID);`
  },
  {
    tableName: "users",
    description: "Multi-tenant users mapped to Graph Node personas and auth identities",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY", description: "User ID matching Auth provider" },
      { name: "org_id", type: "UUID", constraints: "REFERENCES organizations(id) ON DELETE CASCADE", description: "Tenant organization FK" },
      { name: "email", type: "VARCHAR(255)", constraints: "UNIQUE NOT NULL", description: "Work or personal email" },
      { name: "role", type: "VARCHAR(50)", constraints: "NOT NULL", description: "'founder' | 'investor' | 'guru' | 'admin'" },
      { name: "graph_node_id", type: "VARCHAR(100)", constraints: "NULL", description: "Claimed Neo4j Node ID (e.g. guru_jad_hobeika)" },
      { name: "is_diaspora", type: "BOOLEAN", constraints: "DEFAULT false", description: "True if residing outside Lebanon" }
    ],
    rlsPolicySql: `ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_tenant_policy ON users
  FOR ALL
  USING (org_id = current_setting('app.current_tenant_id')::UUID);`
  },
  {
    tableName: "credit_ledger",
    description: "Immutable ledger tracking AI extraction, match memo generations, and API requests",
    columns: [
      { name: "id", type: "BIGSERIAL", constraints: "PRIMARY KEY", description: "Ledger transaction index" },
      { name: "org_id", type: "UUID", constraints: "REFERENCES organizations(id)", description: "Tenant charged" },
      { name: "amount", type: "INTEGER", constraints: "NOT NULL", description: "Credits spent (-) or replenished (+)" },
      { name: "operation_type", type: "VARCHAR(100)", constraints: "NOT NULL", description: "'WIKI_INGEST' | 'MATCH_MEMO' | 'EDGE_QUERY' | 'GRAPH_LINT'" },
      { name: "idempotency_key", type: "VARCHAR(128)", constraints: "UNIQUE NOT NULL", description: "Prevents double-billing" },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: "DEFAULT NOW()", description: "Execution timestamp" }
    ],
    rlsPolicySql: `ALTER TABLE credit_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY ledger_org_policy ON credit_ledger
  FOR SELECT
  USING (org_id = current_setting('app.current_tenant_id')::UUID);`
  },
  {
    tableName: "raw_source_documents",
    description: "Tracks raw pitch decks, papers, and GitHub digests mapped to Graph Node IDs",
    columns: [
      { name: "id", type: "UUID", constraints: "PRIMARY KEY DEFAULT gen_random_uuid()", description: "Source document ID" },
      { name: "org_id", type: "UUID", constraints: "REFERENCES organizations(id)", description: "Tenant owner" },
      { name: "graph_node_id", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Associated Neo4j Entity Node" },
      { name: "source_type", type: "VARCHAR(50)", constraints: "NOT NULL", description: "'pitch_deck' | 'github_repo' | 'cv_resume' | 'arxiv_paper'" },
      { name: "file_url", type: "TEXT", constraints: "NOT NULL", description: "Encrypted S3/GCS storage URI" },
      { name: "sha256_hash", type: "VARCHAR(64)", constraints: "NOT NULL", description: "Content hash for change detection" },
      { name: "ingestion_status", type: "VARCHAR(50)", constraints: "DEFAULT 'PROCESSED'", description: "'PENDING' | 'PROCESSED' | 'LINT_FLAGGED'" }
    ],
    rlsPolicySql: `ALTER TABLE raw_source_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY source_doc_policy ON raw_source_documents
  FOR ALL
  USING (org_id = current_setting('app.current_tenant_id')::UUID);`
  }
];

export const SEEDING_PARTNERS: SeedingPartner[] = [
  {
    id: "part_aub",
    name: "American University of Beirut (AUB)",
    category: "University",
    city: "Beirut",
    country: "Lebanon",
    logo: "🎓",
    seedNodesCount: 58,
    ambassadorLead: "Prof. Fadi Karameh (ECE)",
    integrationStatus: "Active Partner",
    keyAlumniGurus: ["Dr. Jad Hobeika", "Nour Khoury", "Dr. Wassim El-Hajj"]
  },
  {
    id: "part_lau",
    name: "Lebanese American University (LAU)",
    category: "University",
    city: "Byblos",
    country: "Lebanon",
    logo: "🏛️",
    seedNodesCount: 34,
    ambassadorLead: "Dr. Lina Abou-Chaar",
    integrationStatus: "Active Partner",
    keyAlumniGurus: ["Sami Haddad", "Dr. Danielle Azar"]
  },
  {
    id: "part_berytech",
    name: "Berytech Ecosystem",
    category: "Incubator/Hub",
    city: "Beirut",
    country: "Lebanon",
    logo: "⚡",
    seedNodesCount: 82,
    ambassadorLead: "Maroun Chammas & Acceleration Team",
    integrationStatus: "Active Partner",
    keyAlumniGurus: ["Charbel Assi", "Rayan Al-Khatib"]
  },
  {
    id: "part_lebnet",
    name: "LebNet Global Tech Network",
    category: "Diaspora Network",
    city: "San Francisco, Silicon Valley",
    country: "USA",
    logo: "🌐",
    seedNodesCount: 145,
    ambassadorLead: "George Akiki & Silicon Valley Council",
    integrationStatus: "API Connected",
    keyAlumniGurus: ["Nour Khoury", "Habib Haddad", "Ronaldo Mouchawar"]
  },
  {
    id: "part_life",
    name: "LIFE Lebanon (London & Paris)",
    category: "Diaspora Network",
    city: "London & Paris",
    country: "UK / France",
    logo: "💼",
    seedNodesCount: 92,
    ambassadorLead: "Tech & Venture Committee",
    integrationStatus: "Active Partner",
    keyAlumniGurus: ["Maya Zein", "Karim Bitar"]
  }
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: "freemium",
    name: "Diaspora Explorer",
    tagline: "For curious builders and researchers discovering Lebanese AI talent",
    priceUsdMonthly: 0,
    priceUsdAnnual: 0,
    creditsPerMonth: 25,
    features: [
      "Access to public Knowledge Graph (150+ Nodes)",
      "Standard L1 Wiki search & wikilink navigation",
      "Low-bandwidth WhatsApp bot (/search_guru)",
      "Basic ecosystem directory export"
    ],
    buttonLabel: "Start Free",
    badge: "Community"
  },
  {
    id: "guru",
    name: "AI Guru & Talent",
    tagline: "For researchers, engineers, and freelancers seeking high-yield gigs & grants",
    priceUsdMonthly: 19,
    priceUsdAnnual: 190,
    creditsPerMonth: 250,
    popular: true,
    features: [
      "Verified 'Tier 1' Graph Node with custom vanity badge",
      "Direct inbound deal-flow from US/GCC startups",
      "Diaspora Mentorship & Syndicate intros",
      "Automated GitHub & arXiv wiki sync",
      "Whish Money & USDT payment support"
    ],
    buttonLabel: "Claim Guru Node",
    badge: "Most Popular"
  },
  {
    id: "startup",
    name: "Startup Scale",
    tagline: "For Lebanese AI ventures fundraising and hiring elite local & diaspora talent",
    priceUsdMonthly: 99,
    priceUsdAnnual: 990,
    creditsPerMonth: 1200,
    features: [
      "Automated Pitch Deck Wiki Ingestion & Graph Mapping",
      "Two-Way Matchmaking with 45+ VCs & LebNet Angels",
      "Weekly Graph Linting & Tech Stack Health Audits",
      "3.8x Cost Efficiency Talent Sourcing from AUB/LAU",
      "Direct WhatsApp Edge Deal-Flow Alerts"
    ],
    buttonLabel: "Accelerate Startup",
    badge: "High Growth"
  },
  {
    id: "enterprise_vc",
    name: "Institutional VC & Syndicate",
    tagline: "For global funds, angels, and sovereign wealth deploying in Levant DeepTech",
    priceUsdMonthly: 499,
    priceUsdAnnual: 4990,
    creditsPerMonth: 6000,
    features: [
      "Unrestricted Neo4j Cypher API & Multi-Tenant RLS",
      "AI 1-Page Investment & Rationale Memos (Gemini 3.7)",
      "Real-time commit velocity & revenue discrepancy telemetry",
      "Custom Diaspora Bridge Structuring & Co-Investment Syndicates",
      "Dedicated Ecosystem Concierge & Warm Introductions"
    ],
    buttonLabel: "Deploy Capital",
    badge: "Institutional"
  }
];

export const INITIAL_STARTUP_NEWS: import("../types").StartupNewsArticle[] = [
  {
    id: "news_1",
    title: "CedarsLLM Closes $1.2M Seed Round Led by Cedar AI Syndicate for Sovereign Arabic Foundation Models",
    slug: "cedarsllm-closes-1-2m-seed-round",
    category: "Funding",
    summary: "Beirut-headquartered CedarsLLM secures $1.2M in Seed funding to scale its 4-bit quantized Arabic bilingual LLMs tailored for sovereign enterprise deployments in Lebanon and the GCC.",
    content: `Beirut-based generative AI startup **CedarsLLM** has officially closed a **$1.2M Seed funding round** led by **Cedar AI Syndicate (Silicon Valley & Dubai)**, with participation from **LebNet Angels** and local angel syndicates.

Founded by AUB alumni and former Paris AI researchers, CedarsLLM specializes in ultra-efficient 4-bit and 8-bit quantized large language models optimized for Arabic dialects and Modern Standard Arabic (MSA). The company achieves top-tier Levantine dialect understanding at a fraction of the compute cost required by proprietary Western frontier models.

> "Our mission is to prove that world-class sovereign AI infrastructure can be engineered in Beirut while serving tier-one enterprise clients across Dubai, Riyadh, and London," stated the founding team.

The new capital will accelerate the team's GPU cluster expansion at Beirut Digital District and support commercial rollout across GCC telecommunications and financial institutions.`,
    sourceName: "961AI Dispatch / TechCrunch MENA",
    publishedAt: "2026-08-24 14:30",
    readTimeMin: 3,
    featured: true,
    relatedEntitySlugs: ["cedars-llm", "cedar-ai-ventures", "lebnet-angels", "aub-ai-initiative"],
    tags: ["Funding", "LLMs", "Seed Round", "Arabic AI", "Cedar Syndicate"],
    author: "Karpathy Newsroom & Karim Haddad"
  },
  {
    id: "news_2",
    title: "MEVP & Berytech Launch $10M Levant DeepTech FastTrack for Onshore AI Engineering Teams",
    slug: "mevp-berytech-launch-10m-deeptech-fasttrack",
    category: "Ecosystem & Grants",
    summary: "Middle East Venture Partners and Berytech announce a combined $10M catalytic investment program offering $250k - $1M checks and compute subsidies for Lebanese AI startups.",
    content: `In a landmark collaborative initiative, **Middle East Venture Partners (MEVP)** and **Berytech Innovation Park** have unveiled the **$10M Levant DeepTech FastTrack**.

The program is engineered to address the critical bridge between university lab spinouts from **AUB, LAU, and USJ/ESIB** and institutional Series A venture funding. Qualified startups developing proprietary intellectual property in Computer Vision, Edge AI, CleanTech, and Voice Synthesis will receive:

- Equity checks ranging from **$250,000 to $1,000,000**.
- **$100,000 in subsidised cloud compute credits** through ecosystem partners.
- Resilient office hubs with redundant power and fiber at **Beirut Digital District** and Berytech Mar Roukoz.
- Direct warm introductions to LebNet and LIFE global diaspora syndicate mentors.

Applications for Batch 1 are now open through the 961AINetwork verified portal.`,
    sourceName: "Ecosystem Wire Lebanon",
    publishedAt: "2026-08-23 09:15",
    readTimeMin: 4,
    featured: true,
    relatedEntitySlugs: ["mevp-venture-partners", "berytech", "beirut-digital-district", "aub-ai-initiative"],
    tags: ["DeepTech", "Venture Capital", "FastTrack", "Berytech", "MEVP"],
    author: "Sarra Mansour"
  },
  {
    id: "news_3",
    title: "Synapse Analytics Scales GCC Expansion with Tier-1 Banking Deployments in Riyadh & Dubai",
    slug: "synapse-analytics-gcc-banking-expansion",
    category: "Product Launch",
    summary: "Beirut and Cairo-born fintech AI startup Synapse Analytics deploys explainable AI risk scoring across 14 commercial banks in the UAE and Saudi Arabia.",
    content: `Applied AI decisioning startup **Synapse Analytics** has announced the live integration of its explainable AI credit risk engine across 14 major commercial banks throughout Saudi Arabia, the UAE, and Egypt.

Engineered with proprietary explainable credit modeling algorithms that comply with SAMA (Saudi Central Bank) and UAE central bank regulatory requirements, Synapse automates SME credit underwriting in seconds while reducing non-performing loan ratios by up to 34%.

With an active Series A round in progress, Synapse continues to expand its core algorithmic research team in Beirut, taking advantage of Lebanon's deep reservoir of applied mathematicians and machine learning engineers.`,
    sourceName: "Wamda / 961AINews",
    publishedAt: "2026-08-22 16:45",
    readTimeMin: 3,
    featured: true,
    relatedEntitySlugs: ["synapse-analytics", "mevp-venture-partners", "beirut-digital-district"],
    tags: ["Fintech AI", "Enterprise", "Credit Scoring", "Banking", "Expansion"],
    author: "Rami El-Zein"
  },
  {
    id: "news_4",
    title: "Proximie Surpasses 25,000 AI-Assisted Surgical Telemetry Procedures Worldwide",
    slug: "proximie-surpasses-25000-ai-surgeries",
    category: "Diaspora Bridge",
    summary: "Founded by Dr. Nadine Hachach-Haram, healthtech powerhouse Proximie marks major milestone in real-time computer vision and telepresence inside operating rooms.",
    content: `Global healthtech innovator **Proximie Augmented AI**, founded by Lebanese-British surgeon **Dr. Nadine Hachach-Haram**, has surpassed **25,000 successful surgical procedures** across more than 500 partner hospitals in 100+ countries.

The platform integrates ultra-low-latency real-time video feeds with augmented reality overlays and computer vision analytics to enable senior surgical experts in London or Boston to collaborate hands-on with operating surgeons in Beirut, Amman, or sub-Saharan Africa.

Proximie recently expanded its data science and software engineering center in Beirut, reinforcing its commitment to training Lebanese engineers in medical-grade computer vision pipelines.`,
    sourceName: "HealthTech Global & 961AI",
    publishedAt: "2026-08-21 11:20",
    readTimeMin: 4,
    featured: true,
    relatedEntitySlugs: ["proximie-ai", "cedar-mundi-ventures", "life-lebanon-global"],
    tags: ["MedTech", "Surgical AI", "Diaspora", "Computer Vision", "Series B"],
    author: "Dr. Maya Zein"
  },
  {
    id: "news_5",
    title: "AUB AI Lab & ESIB Unveil Sub-Second Levantine Arabic Voice Agent with 94.8% Accuracy",
    slug: "aub-esib-levantine-arabic-voice-agent",
    category: "Research & Lab",
    summary: "Joint research initiative produces open-weights Levantine Arabic conversational model operating with under 180ms inference latency on consumer edge hardware.",
    content: `Researchers at the **American University of Beirut (AUB) Artificial Intelligence Initiative** in collaboration with **USJ / ESIB Engineering** have published a benchmark-shattering paper introducing *ArzVoice-Levant*.

Trained on over 12,000 hours of dialectal Lebanese, Syrian, Jordanian, and Palestinian speech datasets collected across rural and urban centers, the model achieves a **94.8% Word Error Rate (WER) accuracy** on code-switched Arabic-French-English speech.

The model is released with Apache-2.0 open weights for regional researchers, with startup spinout **LevantVoice Arabic Speech** already preparing commercial telephony APIs for call centers and emergency dispatch systems.`,
    sourceName: "arXiv & AUB AI Initiative",
    publishedAt: "2026-08-20 08:00",
    readTimeMin: 5,
    featured: false,
    relatedEntitySlugs: ["aub-ai-initiative", "usj-esib-engineering", "jad-hobeika", "levant-voice-ai"],
    tags: ["Research", "Arabic Speech", "AUB", "ESIB", "Open Source"],
    author: "Research Correspondent"
  },
  {
    id: "news_6",
    title: "Beirut Digital District Completes 2.4MW Smart Solar & Battery Microgrid for AI Hubs",
    slug: "bdd-completes-smart-solar-microgrid",
    category: "Ecosystem & Grants",
    summary: "New microgrid guarantees 100% clean, continuous power for 120+ tech ventures and AI developers at BDD despite national electricity grid fluctuations.",
    content: `**Beirut Digital District (BDD)** has officially commissioned its expanded **2.4 Megawatt rooftop solar photovoltaic array and integrated lithium-iron-phosphate (LFP) battery storage system**.

The setup incorporates AI-driven predictive load balancing from resident startup **CedarSmart Energy AI**, automatically optimizing diesel generator cycling and maximizing green battery usage during peak sunlight hours.

The continuous green power supply ensures uninterrupted training of deep learning models and continuous server hosting for the 1,500+ technologists residing in the Bachoura innovation district.`,
    sourceName: "L'Orient Today Tech",
    publishedAt: "2026-08-19 13:10",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["beirut-digital-district", "cedarsmart-energy-ai", "berytech"],
    tags: ["CleanTech", "BDD", "Solar Microgrid", "Infrastructure", "Beirut"],
    author: "Ziad Barakat"
  },
  {
    id: "news_7",
    title: "LebNet Silicon Valley Angels Announce $500k Matching Syndicate for Seed Stage Founders",
    slug: "lebnet-angels-500k-matching-pledge",
    category: "Diaspora Bridge",
    summary: "US-based diaspora network pledges matching angel funding and executive mentorship for Lebanese AI ventures raising pre-seed and seed rounds.",
    content: `**LebNet Global Tech Network**, headquartered in Silicon Valley with active chapters across Boston, New York, and Seattle, has launched a **$500,000 Matching Syndicate** for early-stage Lebanese founders.

Under the terms of the program, any Lebanese-founded AI startup that secures lead term sheets through the **961AINetwork** platform will be eligible for up to $100,000 in non-dilutive matching grants and fast-tracked angel co-investment.

In addition to capital, participating founders gain one-on-one quarterly advisory sessions with veteran tech executives from Google, Apple, Meta, and NVIDIA.`,
    sourceName: "LebNet Press Room",
    publishedAt: "2026-08-18 10:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["lebnet-angels", "lebnet-global", "nour-khoury", "cedar-ai-ventures"],
    tags: ["Diaspora", "Silicon Valley", "Angel Syndicate", "LebNet", "Grants"],
    author: "George Akiki"
  },
  {
    id: "news_8",
    title: "Speed Accelerator Batch 12 Demo Day Spotlights 8 AI Startups in AgTech, Speech, and NeuroTech",
    slug: "speed-accelerator-batch-12-demo-day",
    category: "Product Launch",
    summary: "Lebanon's pioneering accelerator graduates fresh cohort of deep tech founders presenting to 80+ regional and international venture capital investors.",
    content: `**Speed Accelerator** celebrated the graduation of its **Batch 12 cohort** in a packed hybrid demo day hosted at Beirut Digital District.

Eight innovative startups pitched to an audience of over 80 angel investors, institutional VCs, and diaspora fund managers. Standout teams included:
- **PhoeniciaVision**: Edge drone computer vision for automated olive orchard disease classification.
- **Beirut NeuroTech**: Non-invasive EEG neural headband for focus and cognitive tracking.
- **Levant Robotics**: Autonomous delivery rovers designed for uneven Mediterranean urban terrains.

Six of the eight startups reported receiving term sheet discussions within 48 hours of pitching.`,
    sourceName: "Speed Lebanon & Executive Magazine",
    publishedAt: "2026-08-17 17:30",
    readTimeMin: 4,
    featured: false,
    relatedEntitySlugs: ["speed-lebanon-seed-fund", "phoenicia-vision", "beirut-neurotech", "levant-robotics"],
    tags: ["Demo Day", "Speed Lebanon", "Cohort", "AgTech", "NeuroTech"],
    author: "Nadine Bitar"
  },
  {
    id: "news_9",
    title: "Phoenicia Vision Secures $650k Pre-Seed to Deploy Edge AI AgTech Sensors in Bekaa & Chouf",
    slug: "phoenicia-vision-secures-650k-pre-seed",
    category: "Funding",
    summary: "AgTech startup Phoenicia Vision closes pre-seed led by Cedar AI Syndicate to scale thermal multispectral drone diagnostics for Lebanese vineyards and olive groves.",
    content: `Bekaa-based precision agriculture intelligence startup **Phoenicia Vision** has closed a **$650,000 Pre-Seed funding round** led by **Cedar AI Syndicate** with matching grant support from the EU-Lebanon GreenTech Initiative.
    
The startup combines on-device TensorRT computer vision with solar-powered multispectral sensor towers to detect drought stress, fungal blight, and pest infestations up to 14 days before visible symptoms emerge.`,
    sourceName: "AgTech MENA & 961AI",
    publishedAt: "2026-07-28 12:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["phoenicia-vision", "cedar-ai-ventures", "berytech"],
    tags: ["Funding", "AgTech", "Pre-Seed", "Edge AI", "Bekaa Valley"],
    author: "Karim Haddad"
  },
  {
    id: "news_10",
    title: "LAU Engineering Debuts Solar-Powered Off-Grid Edge AI Micro-Servers for Mountain Telemetry",
    slug: "lau-solar-edge-ai-micro-servers",
    category: "Research & Lab",
    summary: "Byblos researchers unveil ultra-resilient RISC-V compute nodes tailored for low-bandwidth environmental and wildfire detection across Mount Lebanon.",
    content: `The **LAU Autonomous Systems & Embedded AI Lab** in Byblos has successfully completed field trials of its new *Jabal-Edge* micro-servers.
    
Powered entirely by supercapacitors and small solar cells, each unit runs quantized YOLOv9 object detection models locally to provide real-time thermal anomaly alerts for forest fire early warning systems.`,
    sourceName: "LAU News & IEEE Lebanon",
    publishedAt: "2026-07-14 09:30",
    readTimeMin: 4,
    featured: false,
    relatedEntitySlugs: ["lau-engineering", "aub-ai-initiative"],
    tags: ["Research", "Edge AI", "Wildfire AI", "LAU Byblos", "RISC-V"],
    author: "Dr. Walid Karam"
  },
  {
    id: "news_11",
    title: "LevantVoice Ships Real-Time Dialect API for Telephony Integration in 6 Arab Countries",
    slug: "levantvoice-ships-realtime-dialect-api",
    category: "Product Launch",
    summary: "Lebanese voice AI startup LevantVoice releases low-latency WebRTC endpoints enabling natural conversational voicebots in Levantine, Gulf, and Egyptian dialects.",
    content: `Beirut-born voice synthesis startup **LevantVoice** has publicly launched its enterprise conversational AI API, supporting real-time streaming audio inference at under 160ms latency.
    
The platform has already onboarded regional logistics, food delivery, and banking customers looking to replace rigid legacy IVR systems with human-grade dialectal voice agents.`,
    sourceName: "Wamda & 961AI",
    publishedAt: "2026-06-22 15:15",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["levant-voice-ai", "jad-hobeika", "beirut-digital-district"],
    tags: ["Product Launch", "Voice AI", "Arabic Dialect", "Telephony", "API"],
    author: "Sarra Mansour"
  },
  {
    id: "news_12",
    title: "LIFE Lebanon London Gala Pledges $2M in DeepTech Scholarships & Early Venture Backing",
    slug: "life-lebanon-london-gala-pledge-2m",
    category: "Diaspora Bridge",
    summary: "Global Lebanese diaspora finance and tech leaders gather in London to establish an ongoing innovation fund supporting AUB, USJ, and LAU master's researchers in machine learning.",
    content: `At the annual **LIFE Lebanon Worldwide Gala** in London, diaspora business leaders announced a dedicated **$2.0 Million DeepTech & AI Fellowship Fund**.
    
The fund provides full tuition, research stipends, and GPU cloud grants for 40 postgraduate researchers in Lebanon while guaranteeing international mentorship and Silicon Valley/London venture fast-tracks.`,
    sourceName: "LIFE Lebanon Dispatch",
    publishedAt: "2026-06-05 20:00",
    readTimeMin: 4,
    featured: false,
    relatedEntitySlugs: ["life-lebanon-global", "lebnet-global", "aub-ai-initiative", "usj-esib-engineering"],
    tags: ["Diaspora", "London", "Scholarships", "LIFE Lebanon", "Ecosystem"],
    author: "Maya Choueiri"
  },
  {
    id: "news_13",
    title: "Cedar Mundi Ventures Closes $40M Fund II Dedicated to Levant-to-Global Tech Scaleups",
    slug: "cedar-mundi-closes-40m-fund-ii",
    category: "Funding",
    summary: "Cedar Mundi Ventures announces final close of its second institutional fund, targeting B2B SaaS, HealthAI, and Fintech scaling from Beirut into Europe and the Gulf.",
    content: `Venture capital firm **Cedar Mundi Ventures** has finalized the closing of its **$40M Fund II**.
    
With institutional backing from international development banks and diaspora family offices, Fund II plans to lead Series A and Series B rounds with check sizes ranging from $1.5M to $4M.`,
    sourceName: "VentureWire & Executive",
    publishedAt: "2026-05-19 11:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["cedar-mundi-ventures", "proximie-ai", "mevp-venture-partners"],
    tags: ["Funding", "Series A", "Venture Capital", "Fund II", "Cedar Mundi"],
    author: "Rami El-Zein"
  },
  {
    id: "news_14",
    title: "Berytech & EU Unveil GreenTech Clean AI Accelerator with €1.5M in Equity-Free Grants",
    slug: "berytech-eu-greentech-accelerator-grants",
    category: "Ecosystem & Grants",
    summary: "New European Union funded program offers up to €75,000 per startup for AI-driven energy optimization, water recycling, and smart grid automation in Lebanon.",
    content: `**Berytech** in collaboration with the European Union has launched the **ACT Smart CleanTech & AI Accelerator**.
    
15 selected startups will receive non-dilutive equity-free grant financing, prototype fabrication access at Berytech FabLab, and international exhibition sponsorships at VivaTech Paris.`,
    sourceName: "Berytech Newsroom",
    publishedAt: "2026-05-02 14:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["berytech", "beirut-digital-district", "cedarsmart-energy-ai"],
    tags: ["Ecosystem & Grants", "European Union", "GreenTech", "Grants", "Berytech"],
    author: "Ziad Barakat"
  },
  {
    id: "news_15",
    title: "USJ / ESIB Computer Vision Lab Licenses Medical Retinopathy Detection IP to Swiss MedTech Firm",
    slug: "usj-esib-licenses-medical-retinopathy-ip",
    category: "Research & Lab",
    summary: "Beirut engineering university completes commercial patent licensing agreement for automated diabetic retinopathy screening algorithm trained on diverse regional datasets.",
    content: `**Université Saint-Joseph (USJ / ESIB Engineering)** in Mar Roukoz has inked a multi-year global licensing and royalty agreement with a leading Swiss medical diagnostics enterprise.
    
The AI model enables handheld ophthalmic cameras to evaluate fundus photographs in real-time without requiring cloud connectivity, making it ideal for rural clinic deployments across developing nations.`,
    sourceName: "L'Orient Le Jour Tech",
    publishedAt: "2026-04-18 10:45",
    readTimeMin: 4,
    featured: false,
    relatedEntitySlugs: ["usj-esib-engineering", "aub-ai-initiative", "proximie-ai"],
    tags: ["Research", "Computer Vision", "MedTech", "IP Licensing", "ESIB"],
    author: "Dr. Maya Zein"
  },
  {
    id: "news_16",
    title: "LebNet Silicon Valley CEO Summit Connects 45 Lebanese Founders with US Tier-1 VCs",
    slug: "lebnet-sv-ceo-summit-connects-founders",
    category: "Diaspora Bridge",
    summary: "Annual San Francisco delegation yields 18 institutional partner meetings and strategic pilot agreements with US cloud infrastructure providers.",
    content: `The 2026 **LebNet Silicon Valley CEO Summit** concluded in Menlo Park, bringing together 45 prominent Lebanese founders and diaspora leaders for three days of venture masterclasses and partner roundtables.
    
Keynote speakers emphasized the growing global demand for decentralized Levantine engineering talent and announced specialized cloud compute sponsorships from tier-1 Silicon Valley tech giants.`,
    sourceName: "LebNet Dispatch",
    publishedAt: "2026-03-25 18:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["lebnet-global", "lebnet-angels", "nour-khoury"],
    tags: ["Diaspora", "Silicon Valley", "CEO Summit", "Mentorship", "LebNet"],
    author: "George Akiki"
  },
  {
    id: "news_17",
    title: "Beirut NeuroTech Completes Phase-1 Clinical Trials for Closed-Loop Sleep & Focus EEG Headset",
    slug: "beirut-neurotech-completes-phase1-trials",
    category: "Product Launch",
    summary: "Hardware AI venture validates non-invasive neuro-stimulation algorithms showing 42% improvement in deep sleep duration and cognitive recovery scores.",
    content: `Beirut-based neurotechnology startup **Beirut NeuroTech** has published results from its Phase-1 clinical trials conducted with the AUB Medical Center Sleep Research Unit.
    
The company's lightweight dry-electrode headband utilizes real-time Bayesian signal filters to adapt transcranial pink noise stimulation to individual brainwave patterns.`,
    sourceName: "NeuroTech Reports & 961AI",
    publishedAt: "2026-02-12 11:30",
    readTimeMin: 4,
    featured: false,
    relatedEntitySlugs: ["beirut-neurotech", "aub-ai-initiative", "speed-lebanon-seed-fund"],
    tags: ["Product Launch", "NeuroTech", "EEG", "Clinical Trial", "Hardware"],
    author: "Nadine Bitar"
  },
  {
    id: "news_18",
    title: "Cedar AI Syndicate Launches $5M Follow-On Facility for Series A Readiness in Levant",
    slug: "cedar-ai-syndicate-5m-followon-facility",
    category: "Funding",
    summary: "Syndicate led by diaspora tech founders sets up dedicated bridge capital pool to support Lebanese startups preparing for Series A institutional rounds.",
    content: `**Cedar AI Syndicate** has announced the formal deployment of its **$5M Series A Bridge Facility**.
    
The facility is structured to provide high-velocity bridge notes ($200k - $500k) to fast-growing Lebanese B2B software and AI startups with proven unit economics, ensuring uninterrupted scaling between seed and international Series A syndicates.`,
    sourceName: "961AI Capital Wire",
    publishedAt: "2026-01-20 09:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["cedar-ai-ventures", "cedars-llm", "phoenicia-vision"],
    tags: ["Funding", "Syndicate", "Series A Bridge", "Venture", "Diaspora Capital"],
    author: "Karim Haddad"
  },
  {
    id: "news_19",
    title: "AUB ECE Department Announces Open-Source Arabic Embedding Model Benchmark Suite",
    slug: "aub-ece-open-source-arabic-embedding-suite",
    category: "Research & Lab",
    summary: "Comprehensive evaluation leaderboard tests Arabic semantic embeddings across legal, medical, and dialectal Levantine conversational tasks.",
    content: `The Electrical & Computer Engineering Department at **AUB** has open-sourced the *LevantEmbed-Bench* suite on HuggingFace.
    
The project provides standardized evaluation harnesses for information retrieval and RAG (Retrieval-Augmented Generation) systems operating in Arabic dialects, overcoming severe limitations in existing multilingual benchmarks.`,
    sourceName: "HuggingFace & AUB AI",
    publishedAt: "2025-11-15 14:20",
    readTimeMin: 4,
    featured: false,
    relatedEntitySlugs: ["aub-ai-initiative", "cedars-llm", "jad-hobeika"],
    tags: ["Research", "Arabic NLP", "Embeddings", "HuggingFace", "AUB"],
    author: "Research Correspondent"
  },
  {
    id: "news_20",
    title: "BDD AI Hackathon 2025 Awards $50k in Pre-Seed Grants to 4 Student DeepTech Spinouts",
    slug: "bdd-ai-hackathon-2025-awards",
    category: "Ecosystem & Grants",
    summary: "Over 200 developers and university students gather at Beirut Digital District for 48-hour intensive building on sovereign LLMs and autonomous agents.",
    content: `The annual **BDD AI Hackathon 2025** concluded with four student spinout teams taking home $50,000 in equity-free development grants and 6 months of free co-working space and gigabit fiber connectivity at Beirut Digital District.
    
Winning projects included an automated smart contract vulnerability scanner for Arabic fintech systems and a distributed solar battery fleet coordination agent.`,
    sourceName: "BDD Press & Executive",
    publishedAt: "2025-09-30 16:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["beirut-digital-district", "berytech", "aub-ai-initiative"],
    tags: ["Ecosystem & Grants", "Hackathon", "BDD", "Pre-Seed", "Youth"],
    author: "Ziad Barakat",
    region: "Lebanon"
  },
  {
    id: "news_21",
    title: "Abu Dhabi & Beirut AI Alliance Deploys Falcon 3 Levantine Dialect Adapter for Public Sector",
    slug: "abu-dhabi-beirut-falcon-3-adapter",
    category: "Product Launch",
    region: "UAE",
    summary: "Technology Innovation Institute (TII) partners with Lebanese researchers to release open-weights Levantine Arabic LoRA adapters achieving state-of-the-art benchmark scores.",
    content: `The **Technology Innovation Institute (TII)** in Abu Dhabi, in collaboration with diaspora AI researchers from Beirut's top engineering universities, has released the **Falcon-3 Levantine Dialect Adapter**.
    
    The lightweight LoRA adapter enables local municipalities, hospitals, and customer service centers across Lebanon, UAE, and Jordan to run hyper-accurate Arabic dialect comprehension on cost-effective edge workstations without sending proprietary citizen records to foreign cloud servers.`,
    sourceName: "Wamda / MENA AI Wire",
    publishedAt: "2026-08-26 11:00",
    readTimeMin: 4,
    featured: true,
    relatedEntitySlugs: ["aub-ai-initiative", "cedars-llm", "jad-hobeika"],
    tags: ["Falcon 3", "Abu Dhabi", "Open Source", "Arabic NLP", "Levantine"],
    author: "MENA Bureau"
  },
  {
    id: "news_22",
    title: "Saudi SCAI & Humain Fund Allocate $15M for Levant-GCC Cross-Border DeepTech Syndicates",
    slug: "scai-humain-15m-crossborder-deeptech",
    category: "Funding",
    region: "Saudi Arabia",
    summary: "Saudi sovereign AI investment arm establishes co-investment vehicle to back high-growth Lebanese and Levant AI startups expanding into Riyadh and NEOM.",
    content: `Saudi Arabia's **SCAI (Saudi Company for Artificial Intelligence)** in partnership with regional venture syndicate **Humain Capital** has allocated a dedicated **$15 Million Cross-Border AI Scale Fund**.
    
    The initiative targets Series Seed and Series A startups originating from Beirut and Amman that have demonstrated breakthrough IP in Arabic voice agents, enterprise vision systems, and automated logistics. Participating founders receive commercial landing support in Riyadh, fast-tracked regulatory approvals, and corporate enterprise contracts.`,
    sourceName: "Saudi Gazette / TechCrunch MENA",
    publishedAt: "2026-08-25 16:30",
    readTimeMin: 4,
    featured: true,
    relatedEntitySlugs: ["mevp-venture-partners", "cedar-mundi-ventures", "synapse-analytics"],
    tags: ["Saudi Arabia", "SCAI", "Venture Capital", "Riyadh", "Cross-Border"],
    author: "Rami El-Zein"
  },
  {
    id: "news_23",
    title: "Cairo & Beirut Computer Vision Consortium Automates Red Sea & Mediterranean Maritime Security",
    slug: "cairo-beirut-maritime-cv-consortium",
    category: "Research & Lab",
    region: "Egypt",
    summary: "Deep tech spinouts from Cairo University and USJ Beirut deploy multispectral satellite and coastal camera neural nets to detect illicit maritime activity.",
    content: `A joint engineering consortium between Lebanese computer vision startup **PhoeniciaVision** and Cairo-based **NileAI Systems** has successfully piloted a real-time maritime anomaly detection platform spanning Mediterranean and Red Sea commercial shipping corridors.
    
    The edge-compute architecture operates continuously in low-bandwidth marine conditions, tracking vessel AIS spoofing and environmental oil spills with 98.4% automated precision.`,
    sourceName: "MENA Defense & Tech Dispatch",
    publishedAt: "2026-08-24 18:00",
    readTimeMin: 3,
    featured: false,
    relatedEntitySlugs: ["phoenicia-vision", "usj-esib-engineering"],
    tags: ["Computer Vision", "Maritime AI", "Egypt", "Lebanon", "Consortium"],
    author: "Sarra Mansour"
  },
  {
    id: "news_24",
    title: "Wamda & 961AI Publish 'MENA AI Ecosystem 2026 Report': Levant Emerges as Primary Regional R&D Hub",
    slug: "wamda-961ai-mena-ai-report-2026",
    category: "Ecosystem & Grants",
    region: "MENA",
    summary: "Comprehensive market report shows over 38% of MENA deep learning engineering teams maintain primary algorithmic development hubs in Beirut and the Levant.",
    content: `The newly released **MENA AI Ecosystem & Investment Report 2026**, co-authored by **Wamda Research** and the **961AINetwork Intelligence Desk**, highlights a dramatic surge in decentralized R&D centers across Beirut, Tripoli, and Byblos.
    
    Key findings reveal:
    - Over **$180M in total venture capital** was deployed into Lebanese and diaspora-led AI startups over the preceding 24 months.
    - Engineering cost-efficiency in Beirut delivers **3.4x higher output per dollar** compared to Western European and US software hubs.
    - Over 65% of regional Arabic language models rely on training pipelines engineered by Lebanese and regional academic alumni.`,
    sourceName: "Wamda Research & 961AI",
    publishedAt: "2026-08-23 10:00",
    readTimeMin: 5,
    featured: true,
    relatedEntitySlugs: ["beirut-digital-district", "berytech", "mevp-venture-partners", "lebnet-global"],
    tags: ["Market Report", "MENA AI", "Wamda", "Research", "Venture Trends"],
    author: "Editorial Board"
  }
];

export const INITIAL_KNOWLEDGE_RESOURCES: import("../types").KnowledgeResource[] = [
  {
    id: "res_lebanon_pe_vc_2026",
    title: "Lebanon Private Equity & Venture Capital Landscape 2026: Market Overview, Deal Flow & Fund Directory",
    category: "Market Intelligence",
    format: "PDF",
    summary: "Comprehensive market report on Lebanon's $586.67M private equity deal value, 14 active headquartered PE funds, $37.7B+ historical deployment, and prominent fund directory.",
    description: "Features deep metrics on 14 active domestic PE firms, 5-year stage deployment across Seed ($178M), Early ($4.59B), and Late Stage ($3.37B), AUM scale from $50M LGCF to $6B+ Global Gate Capital, and detailed fund comparisons across EuroMena, BY Venture Partners, Seenko, and multilateral DFI allocations.",
    publishedAt: "2026-08-31",
    readTimeOrPages: "28 Pages • 2026 PE/VC Edition",
    fileSizeMb: 3.9,
    downloadCount: 2980,
    tags: ["Private Equity", "Venture Capital", "Lebanon Ecosystem", "Deal Flow", "AUM Rankings", "ZoomInvestors", "DFI Reconstruction", "Berytech"],
    authorOrOrg: "961AI Research Taskforce & ZoomInvestors Intelligence",
    featured: true,
    contentMarkdown: `# Lebanon Private Equity & Venture Capital Landscape 2026
## Market Overview, Deal Flow & Fund Directory

### Key Facts About Lebanon's Private Equity Landscape
As of early 2026, Lebanon serves as the primary operational hub for **14 active, locally headquartered private equity firms**. In aggregate, these institutions have committed over **$37.7 billion across 644 investment rounds**, backing more than **120 target companies**.

- **Total PE Deal Value**: Projected at **~US$586.67 million in 2025**, expanding at a **3.43% compound annual growth rate (CAGR)** through 2026.
- **Average Deal Size**: Approximately **US$12.16 million** per private equity transaction in 2025.
- **Vehicle Sizes**: Display wide variance, spanning from specialized middle-market vehicles like the **$50 million Lebanon Growth Capital Fund** up to multi-asset powerhouses such as **Global Gate Capital**, which manages in excess of **$6 billion in assets under management (AUM)**.
- **Five-Year Deployment Window**:
  - **Seed-stage**: 40 rounds totaling **$178 million**
  - **Early-stage**: 67 rounds totaling **$4.59 billion**
  - **Late-stage**: 35 rounds totaling **$3.37 billion**
- **Cross-Border Infrastructure**: While primary administrative headquarters remain centered in Beirut, active fund managers maintain international satellite offices in **London, Geneva, Dubai, Malta, and New York** to effectively source and interface with international limited partners (LPs).

---

### Private Equity in Lebanon: Market Overview
Private equity in Lebanon functions as a compact yet influential regional hub. The 14 headquartered fund managers oversee cross-border investment mandates covering the broader Middle East and North Africa (MENA) region alongside sub-Saharan Africa. The **$586.67 million projected transaction value for 2025** indicates a measured, post-crisis stabilization rather than runaway structural expansion, against a background marked by severe post-2019 currency depreciation and sustained hyperinflation exceeding 150% annually.

The core defining trait of the Lebanese PE scene is its heavy reliance on **offshore legal structures, foreign diaspora commitments, and development finance institution (DFI) support** over domestic institutional liquidity. Following the 2019 financial crisis, the domestic commercial banking system effectively ceased its role as a credit and capital conduit. Compounded by an inactive public equity market—comprising just nine listed entities, six of which are banking institutions—GPs must structure liquidity events almost exclusively through **trade sales or secondary transactions**.

Growth capital forms the cornerstone strategy. Because over 90% of the local economy consists of family-owned SMEs, standard leveraged buyouts (LBOs) face significant structural constraints. Consequently, post-conflict reconstruction and economic resilience have evolved into prominent investment theses since 2024, evidenced by **major DFIs directing more than $80 million into local industrial manufacturing, micro-lending networks, and energy projects during 2025**.

Cross-border investors increasingly view Beirut-based GPs as regional gateways into the Levant and MENA markets, reflecting intentional strategic pivoting by managers rather than isolated conviction in domestic Lebanese exposure.

---

### Firm Comparison at a Glance
The following snapshot outlines the ten most prominent documented PE managers based in Lebanon. AUM figures are provided strictly where third-party verified, while undisclosed values highlight the market's standard limited public disclosure practices.

| Firm | AUM | Strategy | Sector Strength | Known For | HQ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Global Gate Capital** | **$6B+** | Multi-strategy (PE, real assets, private debt) | Logistics, real estate, financial services | Largest manager by AUM in the market | Beirut |
| **The EuroMena Funds** | Undisclosed | Growth equity, buyout | Financial services, healthcare | Executed dual exits during 2024 crisis conditions | Beirut |
| **Lebanon Growth Capital Fund** | **$50M** | Growth equity, buyout | SMEs, generalist | Multilateral DFI-backed SME platform | Beirut |
| **Seenko Investments** | Undisclosed | Multi-asset | Equity, debt, real estate, VC | Multi-asset strategy managed under one roof | Beirut |
| **BY Venture Partners** | Undisclosed | Venture capital | AI, marketplaces, platforms | Cross-border MENA/US/Europe early-stage VC | Beirut / MENA |
| **Capital B** | Undisclosed | Buyout, growth equity | Mid-market PE, real estate | Lebanese and European real estate transactions | Lebanon |
| **Emerging Investment Partners** | Undisclosed | Acquisition, growth | Enterprise infrastructure, software | Enterprise technology buyout/growth mandate | Lebanon |
| **Saradar Capital Holding** | Undisclosed | Growth equity | Financial services, logistics | Long-standing domestic investment holding company | Lebanon |
| **Hariri Capital Group** | Undisclosed | Growth equity | Diversified | Politically linked capital deployment platform | Lebanon |
| **WGroup** | Undisclosed | Private equity | Digital out-of-home, digital marketing | Targeted focus on digital media assets | Lebanon |

*Verifiable asset metrics exist for only two managers. Global Gate Capital's $6 billion-plus footprint vastly surpasses all other locally headquartered peers.*

---

### Top Picks by Investment Strategy
- **Largest Overall AUM**: **Global Gate Capital** manages in excess of $6 billion across private equity, real estate, private debt (senior, unitranche, mezzanine), equities, and insurance, establishing a scale unmatched in the country.
- **Growth Equity Leader**: **The EuroMena Funds** holds an extensive track record in regional expansion, counting 15 to 16 documented portfolio holdings across MENA and Africa. Its successful double exit in 2024 amid local conflict and economic contraction underscores high operational adaptability.
- **Top Venture Capital Specialist**: **BY Venture Partners** concentrates on early-stage tech deals across MENA, the US, and Europe, targeting platforms, marketplaces, and AI-driven platforms as the country's most globally integrated VC.
- **SME Capital Provider**: **Lebanon Growth Capital Fund** provides growth and buyout capital specifically tailored to local SMEs, bolstered by a EUR 5 million commitment from an international development finance bank.
- **Multi-Asset Specialist**: **Seenko Investments** consolidates debt, equity, real estate, and venture capital under a unified structure, providing family offices with broad multi-asset exposure through a single interface.
- **Enterprise Tech Focus**: **Emerging Investment Partners** selectively targets B2B enterprise applications and infrastructure investments, filling a niche largely unserved by generalist local firms.
- **Mid-Market & Real Estate**: **Capital B** targets mid-sized buyout transactions alongside European and Lebanese real estate acquisitions, delivering geographical risk mitigation.

---

### Venture Capital (VC) Scope & Ecosystem Integration
The broader ecosystem includes roughly **27 active VC funds** operating or originating from Lebanon (such as **Berytech Fund**, **iSME**, **MEVP**, **Cedar Mundi**, and regional players), focusing heavily on enterprise software, SaaS, and early-stage tech.
- **Top Revenue Leaders**: Local alternative asset and investment firms like Safety Net Investment, Berytech Fund, and Cedrus Investment Group lead local deployment tracking.
- **Global Outposts**: Major institutional managers with Lebanese roots manage multi-billion-dollar portfolios spanning international real estate and logistics, maintaining regional hubs in Beirut alongside global financial centers.
- **Macro Environment**: Activity remains niche and reliant on targeted corporate acquisitions or cross-border syndications as the local market navigates structural economic adjustments.`
  },
  {
    id: "res_investment_report_2026",
    title: "2026 Special Report: Startup Economics & Venture Capital in Times of War",
    category: "Market Intelligence",
    format: "PDF",
    summary: "Macroeconomic Shocks, Geopolitical Volatility, and the Levantine Resilience Playbook. The updated, comprehensive report features an expanded introduction and a dedicated section on the Lebanese Startup & VC Ecosystem.",
    description: "In-depth macroeconomic analysis of defense spending hitting $2.52T, supply chain shocks, startup cost inflation models (+23%), emerging high-growth sectors (Dual-Use AI, Cybersecurity, Microgrids), Beirut's 46.3% growth momentum (ranked 341st globally), decoupled offshore financial stacks, diaspora VC mobilization (LIFE, MEVP, Cedar Mundi), and the Virtual CFO (VCFO) survival playbook.",
    publishedAt: "2026-08-31",
    readTimeOrPages: "32 Pages • 2026 Special Edition",
    fileSizeMb: 4.8,
    downloadCount: 3450,
    tags: ["Investment Report", "VC in Wartime", "Lebanon Ecosystem", "Macroeconomics", "Diaspora VC", "VCFO Playbook", "Startup Economics"],
    authorOrOrg: "961AI Research Taskforce & Levant Capital Intelligence",
    featured: true,
    contentMarkdown: `# 2026 Special Report: Startup Economics & Venture Capital in Times of War
## Macroeconomic Shocks, Geopolitical Volatility, and the Levantine Resilience Playbook

*The updated, comprehensive report features an expanded introduction and a dedicated section on the Lebanese Startup & VC Ecosystem.*

---

### 1. Introduction: Why Founders Must Understand Wartime Economics
War is rarely understood purely through a balance-sheet lens, yet its macroeconomic consequences ripple instantly through global trade, venture capital liquidity, and corporate supply chains. Every major conflict triggers systemic realignments: peacetime fiscal budgets pivot to national defense, energy markets absorb risk premiums, and private capital migrates away from speculatively valued consumer models toward strategic, defensible technologies.

For startup founders, operating during geopolitical turmoil introduces severe operational volatility:
- **Runway Erosion**: Imported inflation, fuel surcharges, and currency depreciation compress cash reserves faster than static financial models predict.
- **Capital Scarcity**: Investor sentiment shifts from growth-at-all-costs to strict capital efficiency, default-alive metrics, and sovereign security priorities.
- **Structural Innovation**: Paradoxically, wartime disruptions accelerate adoption curves for enterprise technology, logistics optimization, cybersecurity, and localized manufacturing.

Startups that proactively adapt their financial architecture can convert macroeconomic uncertainty into long-term strategic advantage.

---

### 2. Global Military Spending & Macro Trends (2015–2026)
Global defense budgets have reached historic highs, topping **$2.52 trillion in 2026**. National defense spending in active conflict zones routinely escalates from peacetime baselines of 2–3% of GDP to over 15–20%.

#### Global Military Spending Trajectory (2015–2026)
| Year | Global Military Spending (USD Trillion) | YoY Growth Rate | Primary Macro Driver |
| :--- | :--- | :--- | :--- |
| **2015** | $1.78 T | 1.5% | Post-Crimea re-armament initial phase |
| **2018** | $1.92 T | 3.0% | US-China trade & tech decoupling |
| **2020** | $1.98 T | 2.6% | Pandemic operational resilience |
| **2022** | $2.24 T | 3.7% | Outbreak of Russia-Ukraine War |
| **2023** | $2.44 T | 6.8% | Expanded NATO commitments & Middle East friction |
| **2026 (Est.)** | **$2.52 T** | **5.2%** | **Red Sea security, Levant instability, & US-Iran escalations** |

---

### 3. Financial Market Indicators & Supply Chain Shocks
Geopolitical events trigger immediate corrections across asset classes:

| Financial Indicator | Pre-Escalation Baseline | Wartime Peak / Movement | Impact on Startup Operations |
| :--- | :--- | :--- | :--- |
| **Brent Crude Oil** | ~$87.50 / bbl | **$90.39+ / bbl** (+2.6% jump) | Spikes shipping rates, power tariffs, and data center hosting costs. |
| **Spot Gold** | ~$2,510 / oz | **$2,492 / oz** (High Volatility) | Volatility impacts cash management and treasury strategy. |
| **Global Equities** | Regional baselines | **-0.8% to -1.6%** correction | Suppresses public valuations and delays IPO exit windows. |
| **Emerging Market FX** | Baseline FX | **3% to 12%** depreciation | Reduces local ARR while SaaS tool subscriptions remain in USD. |

---

### 4. Deep-Dive: The Lebanese Startup & VC Ecosystem (2026 Focus)
Lebanon presents a unique case study in founder resilience. Despite facing severe macroeconomic headwinds and renewed regional conflict, the ecosystem has adapted through structural decentralization, diaspora capital networks, and cross-border expansion strategies.

\`\`\`
                     +---------------------------------------+
                     |    2026 Lebanese Ecosystem Resilience  |
                     +---------------------------------------+
                                         |
     +-----------------------------------+-----------------------------------+
     |                                   |                                   |
     v                                   v                                   v
+------------------------+  +------------------------+  +------------------------+
|   Offshore Capital     |  |   Workforce Security   |  |   Regional Scale Out   |
+------------------------+  +------------------------+  +------------------------+
| • Delaware / Cayman HQ |  | • Dual-currency payroll|  | • GCC expansion targets|
| • Fresh USD accounts   |  | • Remote cloud stacks  |  | • UAE / KSA revenue    |
| • Diaspora VCs (LIFE)  |  | • Employer of Record   |  | • Cross-border M&A     |
+------------------------+  +------------------------+  +------------------------+
\`\`\`

#### Key Dynamics Shaping Lebanon’s Ecosystem:
1. **Global Ranking & Beirut Momentum**: Beirut climbed **36 places to 341st globally** in the 2026 Global Startup Ecosystem Index, recording a **46.3% annual growth rate**—one of the fastest-rising startup hubs in the Middle East (*StartupBlink*).
2. **Decoupled Financial Stacks**: Following the collapse of the domestic banking sector, Lebanese tech startups operate using offshore holding entities (Delaware, UAE, Cayman) paired with digital banking platforms to manage runway in Fresh USD or USDT without domestic currency exposure (*ZoomInvestors*).
3. **Diaspora VC Mobilization**: Networks such as **LIFE (Lebanese International Finance Executives)**, alongside regional venture firms (**Middle East Venture Partners [MEVP]**, **BY Venture Partners**, **Cedar Mundi**, **Phoenician VC**), actively bridge early-stage Lebanese founders with global venture capital and international markets (*Incubator List*).
4. **Payroll & Talent Preservation**: Founders retain top software engineering talent in Beirut via Employer of Record (EoR) structures and USD-pegged compensation, creating a cost-effective operational hub that services GCC enterprise clients.

---

### 5. Startup Cost Impact Model (2026 Scenario)
A startup running on a $1.0M annual budget experiences real cost inflation during regional instability:

| Cost Category | Pre-Conflict Baseline | 2026 Post-Escalation | % Increase | Core Macro Driver |
| :--- | :--- | :--- | :--- | :--- |
| **Energy & Generator Tariffs** | $120,000 | $160,000 | **+33.3%** | Diesel price spikes & power grid gaps |
| **Logistics & War Risk Freight** | $200,000 | $300,000 | **+50.0%** | Maritime insurance & routing adjustments |
| **Raw Materials & Hardware** | $250,000 | $325,000 | **+30.0%** | Regional supply chain delays |
| **Payroll (USD Baseline)** | $350,000 | $350,000 | **0.0%** | Core engineering retention |
| **Cloud & Cybersecurity** | $80,000 | $95,000 | **+18.8%** | Security compliance & network defense |
| **TOTAL OPERATING COST** | **$1,000,000** | **$1,230,000** | **+23.0%** | **Runway reduced by ~2.8 months** |

---

### 6. Emerging High-Growth Sectors
Wartime shifts prioritize defensive, automated, and scalable technological infrastructure:
- **Cybersecurity & Data Defense**: Enterprise demand for threat detection and data protection is driving the global market toward $500B by 2030 (~14% CAGR).
- **Energy Technology & Storage**: Smart microgrids and solar-plus-storage solutions gain priority amid grid vulnerabilities.
- **Supply Chain & Predictive Logistics**: Route optimization software enables logistics platforms to navigate port closures and border delays.
- **Dual-Use & Arabic AI**: Enterprise automation, Levantine/Arabic NLP, and operational AI software continue to attract sovereign and private capital across the MENA region.

---

### 7. The Founder Playbook & Virtual CFO (VCFO) Strategy
To maintain financial stability, founders must replace static projections with dynamic financial management.

#### Recommended Runway Targets:
- **Seed Stage**: Maintain **18+ months** of runway.
- **Series A**: Target **18–24 months** of runway.
- **Growth Stage**: Target **24+ months** with clear paths to default-alive profitability.

#### Virtual CFO (VCFO) Value Proposition:
| Metric | Full-Time Executive CFO | Virtual CFO (VCFO) Service |
| :--- | :--- | :--- |
| **Annual Cost** | $180,000 – $350,000+ | **$24,000 – $120,000** |
| **Core Delivery** | Internal operations & admin | Scenario modeling, cash runway preservation, VC reporting |
| **Scalability** | Fixed corporate overhead | Flexible commitment tuned to fundraising cycles |

---

### Conclusion
Wartime economic volatility creates significant operational friction, but it also accelerates structural technology adoption. By insulating treasury management, diversifying operational supply chains, and leveraging strategic VCFO frameworks, founders can protect their cash runway and position their companies for long-term growth.`
  },
  {
    id: "res_1",
    title: "Lebanon AI Startup Legal Codex & Offshore S.A.L. Master Guide (2026 Edition)",
    category: "Regulatory & Legal",
    format: "PDF",
    summary: "The definitive founder playbook for 0% corporate export tax structuring, Law 81/2018 data protection compliance, BDL Circular 165 foreign currency banking, and Ministry of Finance tax clearance.",
    description: "Detailed legal breakdown covering incorporation at the Commercial Registry (Sijil Tijari), Bar Association mandatory legal retainer rules, Whish Money and USDT contractor payroll protocols, and diaspora co-investment structuring.",
    publishedAt: "2026-08-20",
    readTimeOrPages: "28 Pages • Executive Dossier",
    fileSizeMb: 3.4,
    downloadCount: 1420,
    tags: ["Offshore SAL", "Law 81/2018", "0% Tax", "BDL Circular 165", "Founders Guide"],
    authorOrOrg: "961AI Legal Taskforce & Beirut Bar Practitioners",
    featured: true,
    contentMarkdown: `# Lebanon AI Startup Legal Codex (2026 Edition)
## Complete Legal & Regulatory Guide for High-Tech Ventures in Lebanon

### Executive Summary
Lebanon provides an unprecedented legal and tax advantage for software, generative AI, and deep tech ventures that export services to international markets while maintaining onshore engineering teams. Under **Law No. 85 of October 10, 2018**, Lebanese **Offshore S.A.L.** corporations enjoy a **0% Corporate Income Tax Rate** on software development, algorithmic consulting, and foreign client IP licensing.

---

### Key Legal Pillars
1. **0% Corporate Income Tax (Offshore S.A.L.)**: Exemption from standard corporate tax on profits generated outside Lebanon.
2. **0% Dividend Withholding Tax**: Foreign and local shareholders receive dividend distributions free of statutory tax deductions.
3. **Flat Annual Duty**: Replaced standard progressive brackets with a predictable statutory flat fee of 1,000,000 LBP adjusted per tax year.
4. **Law No. 81/2018 on Electronic Transactions and Personal Data**: Full legal validity of cryptographic e-signatures, smart contracts, and cloud storage compliance.
5. **Fresh USD & BDL Circular 165**: Protection of unencumbered international wire transfers and 'Fresh Account' clearings.

---

### 7-Step Commercial Registry Formalities
- Step 1: Draft Articles of Association with a Lebanese Bar Association Attorney.
- Step 2: Deposit statutory minimum capital (LBP 30,000,000) in a certified escrow account.
- Step 3: Registration with the Commercial Registry (Sijil Tijari) in Baabda / Beirut.
- Step 4: Obtain Tax Identification Number (TIN / Raqm Mali) from Ministry of Finance.
- Step 5: Open Fresh USD & Euro Corporate Bank Accounts.
- Step 6: Register core engineering team with NSSF (Daman).
- Step 7: Establish standard NDA, IP Assignment, and contractor master service agreements.`
  },
  {
    id: "res_2",
    title: "MENA AI Market Map & Regional DeepTech Landscape 2026",
    category: "MENA AI Map",
    format: "Interactive",
    summary: "Comprehensive market segmentation of 350+ AI startups, compute clusters, sovereign LLMs, university labs, and active VC syndicates across Lebanon, UAE, Saudi Arabia, and Egypt.",
    description: "Detailed industry map categorizing AI infrastructure, Arabic foundation models, autonomous edge agents, healthtech computer vision, and fintech risk engines scaling across the MENA region.",
    publishedAt: "2026-08-15",
    readTimeOrPages: "Interactive Matrix & 45-Page PDF",
    fileSizeMb: 5.8,
    downloadCount: 2310,
    tags: ["Market Map", "MENA AI", "Venture Capital", "GCC", "Lebanon AI"],
    authorOrOrg: "961AI Research & Wamda Intelligence",
    featured: true,
    contentMarkdown: `# MENA AI Market Map & Regional DeepTech Landscape 2026

## 1. Regional R&D and Capital Dynamics
The MENA Artificial Intelligence ecosystem has evolved into a multi-hub collaborative network:
- **Beirut & Mount Lebanon**: Primary algorithmic research, dialectal NLP training, edge computer vision, and engineering cost efficiency.
- **Abu Dhabi & Dubai**: Sovereign foundation models (Falcon series, Jais), enterprise scale, and institutional deployment capital.
- **Riyadh & NEOM**: Mega-scale infrastructure, sovereign AI funds (SCAI, Humain), and large enterprise procurement.
- **Cairo**: Data annotation scale, fintech underwriting, and high-volume consumer application deployments.

## 2. Sectoral Market Share
- Arabic Large Language Models: 32%
- Computer Vision & Medical Diagnostics: 24%
- FinTech & Automated Risk Scoring: 18%
- AgTech & Clean Energy Microgrids: 14%
- Voice & Conversational Telephony: 12%`
  },
  {
    id: "res_3",
    title: "Diaspora Angel & Institutional VC Term Sheet Template (Levant SAFE 2026)",
    category: "Toolkit & Templates",
    format: "Doc",
    summary: "Standardized, battle-tested SAFE (Simple Agreement for Future Equity) and Convertible Note agreement templates adapted for Lebanese founders raising from US, UK, and GCC angel syndicates.",
    description: "Includes dual-jurisdiction choice-of-law clauses (Delaware, DIFC, and Lebanese Offshore), valuation cap mechanisms, MFN rights, and founder-friendly protective provisions.",
    publishedAt: "2026-08-10",
    readTimeOrPages: "14 Pages • Legal Template",
    fileSizeMb: 1.2,
    downloadCount: 1890,
    tags: ["SAFE Template", "Term Sheet", "Fundraising", "LebNet", "Angel Syndicate"],
    authorOrOrg: "LebNet Legal Committee & Cedar Syndicate",
    featured: true,
    contentMarkdown: `# Levant Standard SAFE (Simple Agreement for Future Equity)
## 2026 Open-Source Founder-Investor Standard Agreement

### Overview
This template provides a standardized investment instrument modeled on the Y Combinator post-money SAFE, customized with optional dual-entity holding structures (Delaware C-Corp / Cayman TopCo + Lebanese Offshore S.A.L. Operating Subsidiary).

### Key Terms Included:
1. **Valuation Cap**: Pre-agreed maximum company valuation for equity conversion during qualified priced financing.
2. **Discount Rate**: Standard 15% to 20% discount on Series A price-per-share.
3. **Pro-Rata Rights**: Option for angel syndicates to maintain ownership percentage in follow-on institutional rounds.
4. **Information Rights**: Quarterly KPI and financial reporting standards for verified diaspora backers.`
  },
  {
    id: "res_4",
    title: "Arabic NLP & Dialectal Levantine Benchmarking Whitepaper",
    category: "Research & Whitepaper",
    format: "PDF",
    summary: "Rigorous academic study evaluating tokenization efficiency, BLEU/ROUGE accuracy, and latency benchmarks across 12 open-source and proprietary Arabic large language models.",
    description: "Published jointly by AUB AI Initiative and USJ/ESIB researchers. Evaluates code-switched Levantine Arabic performance and edge quantization on consumer GPU hardware.",
    publishedAt: "2026-07-28",
    readTimeOrPages: "36 Pages • arXiv Research",
    fileSizeMb: 4.1,
    downloadCount: 980,
    tags: ["Arabic NLP", "Research Paper", "AUB", "ESIB", "Levantine Dialect"],
    authorOrOrg: "AUB AI Initiative & ESIB Engineering Lab",
    featured: false,
    contentMarkdown: `# Arabic NLP & Levantine Dialect Benchmarking Whitepaper
## Evaluating Sub-Second Dialect Comprehension in Code-Switched Environments

### Abstract
Colloquial Arabic dialects—particularly Levantine (Lebanese, Syrian, Jordanian, Palestinian)—present unique linguistic challenges due to pervasive code-switching with English and French and lack of formal standardization.

### Benchmark Highlights:
- **CedarsLLM-4bit**: Achieved 94.2% semantic accuracy on dialectal intent classification with 140ms edge inference.
- **Falcon-3 LoRA**: Outperformed baseline zero-shot models by 28.4% on conversational customer service datasets.
- **ArzVoice ASR**: Reduced Word Error Rate to 5.2% on multi-speaker Lebanese podcasts.`
  },
  {
    id: "res_5",
    title: "Lebanon AI Engineering Compensation & Talent Cost-Efficiency Index 2026",
    category: "Market Intelligence",
    format: "CheatSheet",
    summary: "Comprehensive market benchmark of machine learning engineer, data scientist, and full-stack AI salaries in Beirut vs. Dubai, Riyadh, London, and Silicon Valley.",
    description: "Features transparent salary ranges, equity vesting norms, remote work perks, Whish/crypto payment protocols, and a 3.8x ROI comparative calculator for international tech scaleups hiring in Lebanon.",
    publishedAt: "2026-07-15",
    readTimeOrPages: "12 Pages • Compensation Matrix",
    fileSizeMb: 1.8,
    downloadCount: 1650,
    tags: ["Salaries", "Hiring", "Cost Efficiency", "AI Engineers", "Remote Work"],
    authorOrOrg: "961AI Talent Desk & Berytech Jobs",
    featured: false,
    contentMarkdown: `# Lebanon AI Engineering Compensation Index 2026

## Salary Bands (Fresh USD / Net Monthly)
- **Junior ML Engineer (0-2 Yrs)**: $1,200 - $2,200 / month
- **Mid-Level AI / NLP Engineer (2-5 Yrs)**: $2,500 - $4,200 / month
- **Senior Deep Learning Architect (5+ Yrs)**: $4,500 - $7,500 / month
- **Head of AI / VP of Engineering**: $7,500 - $12,000+ / month

## Regional Cost Comparison (Total Annual Cost per Senior ML Engineer):
- Silicon Valley / San Francisco: $280,000 - $420,000
- London / Cambridge: $140,000 - $210,000
- Dubai / Abu Dhabi: $120,000 - $180,000
- Beirut / Lebanon: $54,000 - $90,000 (3.8x Cost Advantage with High Retention)`
  },
  {
    id: "res_6",
    title: "Clean Microgrid & High-Density GPU Cluster Deployment Guide for Beirut AI Labs",
    category: "Playbook & Guide",
    format: "PDF",
    summary: "Engineering blueprint for operating 24/7 continuous high-performance compute clusters in Lebanon using hybrid solar PV arrays, LiFePO4 batteries, and automated generator failover.",
    description: "Includes electrical schematic diagrams, cooling configurations, power factor management, and dual-ISP redundant fiber failover setups validated across Beirut Digital District installations.",
    publishedAt: "2026-06-30",
    readTimeOrPages: "22 Pages • Technical Blueprint",
    fileSizeMb: 3.9,
    downloadCount: 840,
    tags: ["Solar Power", "GPU Clusters", "Infrastructure", "BDD", "CleanTech"],
    authorOrOrg: "CedarSmart Energy AI & BDD Facilities Engineering",
    featured: false,
    contentMarkdown: `# Clean Microgrid & High-Density GPU Cluster Deployment Guide

## Power Architecture for High-Uptime AI Compute in Lebanon
To overcome national grid fluctuations, resilient AI labs deploy a tri-tier power management architecture:
1. **Tier 1 - Rooftop Solar PV**: Supplies 60-80% of daylight kilowatt requirements with peak clipping algorithms.
2. **Tier 2 - LiFePO4 Battery Bank (48V / High-Voltage ESS)**: Absorbs rapid load spikes from deep learning model training epochs.
3. **Tier 3 - Synchronized Diesel Backup with AI Load Shedding**: Automatically fires only when battery state-of-charge drops below 25% during prolonged cloud cover.

## Connectivity Redundancy
Dual-homed BGP fiber routing with Ogero dedicated leased lines and microwave wireless backup ensures 99.98% network uptime.`
  }
];

export const INITIAL_REFERRAL_RECORDS: ReferralRecord[] = [
  {
    id: "ref_cedar_01",
    referrerUserId: "usr_initial_trial",
    referredFounderName: "Dr. Karim Hobeika",
    referredStartupName: "Qannoubine LLM Labs",
    referredEmail: "karim@qannoubine.ai",
    founderCategory: "Startup Founder",
    techStack: "Arabic LLMs, TensorRT-LLM, PyTorch",
    subService: "Generative AI & Banking Models",
    signupDate: "2026-08-20",
    status: "completed_rewarded",
    rewardGranted: "+1 Month Free ($8.33 value)",
    rewardMonthValue: 1,
    creditsAwarded: 250,
    notes: "Verified Onshore Founder in Beirut Digital District (BDD). 1 month bonus credited."
  },
  {
    id: "ref_cedar_02",
    referrerUserId: "usr_initial_trial",
    referredFounderName: "Nour Al-Haddad",
    referredStartupName: "Levantine AgroVision",
    referredEmail: "nour@agrovision-mena.com",
    founderCategory: "Startup Founder",
    techStack: "Edge Vision, Embedded PyTorch, YOLOv10",
    subService: "AgTech & Autonomous Drones",
    signupDate: "2026-08-24",
    status: "completed_rewarded",
    rewardGranted: "+1 Month Free ($8.33 value)",
    rewardMonthValue: 1,
    creditsAwarded: 250,
    notes: "AUB Agri-Tech Spinout. Layer 2 Wiki compiled & 1 month bonus credited."
  },
  {
    id: "ref_cedar_03",
    referrerUserId: "usr_initial_trial",
    referredFounderName: "Elie Sarkis",
    referredStartupName: "Berytus Neuromorphic",
    referredEmail: "elie@berytus-neural.io",
    founderCategory: "Startup Founder",
    techStack: "Spiking Neural Networks, FPGA, C++",
    subService: "NeuroTech & Edge Computing",
    signupDate: "2026-08-27",
    status: "completed_rewarded",
    rewardGranted: "+1 Month Free ($8.33 value)",
    rewardMonthValue: 1,
    creditsAwarded: 250,
    notes: "Paris Diaspora Founder building Beirut R&D lab. 1 month bonus credited."
  }
];


