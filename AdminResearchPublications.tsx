export interface CommunityNewsStory {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 
    | "Startup Launch" 
    | "Funding Round" 
    | "AI & DeepTech" 
    | "Research & Lab" 
    | "Partnership" 
    | "Grants & Awards" 
    | "Community & Talent";
  authorName: string;
  authorRole: string;
  authorEmail: string;
  authorPhone?: string;
  entityName: string;
  entityUrl?: string;
  publishedAt: string;
  timestamp: number;
  readTime: string;
  imageUrl?: string;
  tags: string[];
  status: "published" | "pending" | "featured" | "rejected";
  founderQuote?: string;
  externalSourceUrl?: string;
  viewsCount: number;
  likesCount: number;
  isOfficial?: boolean;
  isCommunitySubmitted?: boolean;
  certifiedAccurate?: boolean;
  certifiedNoPlagiarism?: boolean;
  certifiedTermsAccepted?: boolean;
  certifiedAt?: string;
}

const STORAGE_KEY = "961ai_community_news_stories";

export const INITIAL_COMMUNITY_NEWS: CommunityNewsStory[] = [
  {
    id: "news-comm-1",
    title: "CedarVision Edge AI Secures $500K Pre-Seed to Deploy Battery-Less AgTech Cameras Across Southern Lebanese Farms",
    slug: "cedarvision-edge-ai-secures-pre-seed-agtech",
    excerpt: "Spun out of the American University of Beirut AgTech lab, CedarVision leverages INT8 edge neural networks to detect olive fruit fly infestations in real-time without mobile data connectivity.",
    content: `CedarVision AI, an agritech hardware and edge-computing startup originating from research laboratories at the American University of Beirut (AUB), has finalized a $500,000 pre-seed funding round led by a consortium of diaspora Lebanese angels across Geneva and the San Francisco Bay Area.

The startup designs custom solar-scavenging optical cameras integrated with ultra-low-power microcontrollers. By running 8-bit quantized visual classification models directly on-device, CedarVision monitors microclimate metrics and detects the Olive Fruit Fly (Bactrocera oleae) before larval infestation ruins olive yields.

"Lebanese agricultural cooperatives lose up to 35% of their premium extra-virgin oil harvest annually due to unpredictable pest swarms," explained Charbel Azzi, Co-founder and Chief Technology Officer. "Cloud-reliant IoT architectures completely fail in high-elevation Lebanese rural valleys due to cellular blackouts. CedarVision computes directly at the branch level, delivering predictive alerts to farmers via mesh SMS gateways."

The company plans to deploy 350 sensory nodes across Hasbaya, Koura, and Mount Lebanon before expanding pilot programs into Greek and Spanish Mediterranean partner groves.`,
    category: "Funding Round",
    authorName: "Charbel Azzi",
    authorRole: "Co-Founder & CTO",
    authorEmail: "c.azzi@cedarvision.ai",
    authorPhone: "+961 71 884 921",
    entityName: "CedarVision AI (AUB AgTech Lab)",
    entityUrl: "https://cedarvision.ai",
    publishedAt: "September 14, 2026",
    timestamp: 1789456800000,
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1000&auto=format&fit=crop",
    tags: ["#AgTech", "#EdgeAI", "#PreSeed", "#AUB", "#Hardware"],
    status: "published",
    founderQuote: "We engineered our models to survive brownouts and connectivity loss. Innovation from Lebanon must be resilient by design.",
    externalSourceUrl: "https://cedarvision.ai/press/pre-seed-close",
    viewsCount: 1420,
    likesCount: 88,
    isOfficial: true,
    isCommunitySubmitted: true
  },
  {
    id: "news-comm-2",
    title: "MindLab Beirut & LAU Release 'Phoenicia-7B': Open-Weights Dialectical LLM Optimized for Levant Commercial Law",
    slug: "mindlab-beirut-lau-release-phoenicia-7b-legal-llm",
    excerpt: "Trained across 40,000 digitized Lebanese Official Gazette decrees and bilateral treaties, Phoenicia-7B benchmarks 28% higher accuracy in parsing Law 126/2019 offshore holding structures than generic foundation models.",
    content: `In an unprecedented joint collaboration between MindLab Beirut and the Lebanese American University (LAU) AI Research Hub, researchers have open-sourced 'Phoenicia-7B' under an MIT Apache-2.0 hybrid academic license.

Phoenicia-7B is an instruction-tuned generative transformer model pretrained exclusively on Levant corporate statutory jurisprudence, Lebanese Commercial Code articles, and bilateral double-taxation treaties across Cyprus, France, and the GCC.

Standard international models frequently hallucinate or confuse French Civil Law underpinnings with Anglo-Saxon Common Law precedents. Phoenicia-7B addresses this gap by directly embedding Lebanese Official Gazette decrees, BDL regulatory circulars, and the landmark Law 126/2019 offshore exemption statutes.

"Our benchmark evaluations show an 89.4% precision score when drafting articles of association for Lebanese S.A.L. offshore vehicles compared to 61% from standard commercial API models," stated Dr. Nour Haddad, Principal NLP Scientist at MindLab Beirut.

The model checkpoint is available for direct evaluation and fine-tuning via Hugging Face and 961AI's sovereign Second Brain Notebook workspaces.`,
    category: "AI & DeepTech",
    authorName: "Dr. Nour Haddad",
    authorRole: "Principal NLP Scientist",
    authorEmail: "n.haddad@mindlab.beirut.edu.lb",
    authorPhone: "+961 01 786 456",
    entityName: "MindLab Beirut & LAU AI Institute",
    entityUrl: "https://mindlab.ai.lb",
    publishedAt: "September 12, 2026",
    timestamp: 1789284000000,
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    tags: ["#LLM", "#OpenWeights", "#LegalTech", "#OffshoreLaw", "#LAU"],
    status: "published",
    founderQuote: "Sovereignty in AI starts with language and law. Phoenicia-7B gives every Lebanese attorney and startup founder institutional-grade legal copilot intelligence.",
    externalSourceUrl: "https://huggingface.co/mindlab-beirut/phoenicia-7b",
    viewsCount: 2150,
    likesCount: 142,
    isOfficial: true,
    isCommunitySubmitted: true
  },
  {
    id: "news-comm-3",
    title: "FinTech Startup 'LiraFlow' Integrates Whish Money & BDL Clearing Rails for Zero-Fee Remittance Routing",
    slug: "liraflow-integrates-whish-bdl-clearing-remittance",
    excerpt: "Connecting diaspora family members in Montreal, Paris, and Dubai directly to Lebanese mobile wallets with sub-minute settlement and local USD terminal cash-outs.",
    content: `Beirut-headquartered payment rails startup LiraFlow S.A.L. has announced the general availability of its diaspora-to-homeland liquidity bridge, partnering with licensed local electronic money operators including Whish Money and commercial banking escrow networks.

Historically, Lebanese expats remitting funds to parents and university students incurred punitive international wire charges of 7% to 12%, followed by arbitrary foreign exchange conversion markups at local teller branches.

LiraFlow's micro-clearing protocol utilizes cryptographically secured settlement vouchers that instantly fund recipients' Whish Money balances in crisp USD cash equivalents, redeemable at over 1,400 neighborhood agents across Tripoli, Saida, Zahle, and Greater Beirut.

"Remittances constitute more than 35% of Lebanon's real gross domestic product," noted Karim Mansour, CEO of LiraFlow. "Our mission is to eliminate transaction friction. If an expat in Montreal sends $200 for family medication, exactly $200 arrives in their parent's hands within 45 seconds."

Over $4.2M in volume was processed during the closed beta phase, achieving a 99.8% uptime rate during peak holiday transfer spikes.`,
    category: "Startup Launch",
    authorName: "Karim Mansour",
    authorRole: "CEO & Co-Founder",
    authorEmail: "karim@liraflow.com",
    authorPhone: "+961 70 247 961",
    entityName: "LiraFlow S.A.L.",
    entityUrl: "https://liraflow.com",
    publishedAt: "September 10, 2026",
    timestamp: 1789111200000,
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop",
    tags: ["#Fintech", "#Remittances", "#WhishMoney", "#Diaspora", "#Payments"],
    status: "published",
    founderQuote: "Cutting remittance fees from 10% to zero directly injects millions of dollars back into Lebanese household economies every single month.",
    externalSourceUrl: "https://liraflow.com/news/launch",
    viewsCount: 1890,
    likesCount: 116,
    isOfficial: true,
    isCommunitySubmitted: true
  },
  {
    id: "news-comm-4",
    title: "Berytech Cleantech Accelerator Awards $150,000 in Non-Dilutive Grants to 6 Distributed Solar AI Grids",
    slug: "berytech-awards-cleantech-grants-distributed-solar-ai",
    excerpt: "Engineered by teams across Tripoli and Chouf, autonomous load-balancing micro-inverters maintain 99.4% uninterrupted electricity for regional hospital oncology and cold-chain facilities.",
    content: `Berytech, in alliance with international renewable grant partners, has selected six pioneering Lebanese cleantech ventures to receive $150,000 in non-dilutive capital grants, industrial prototyping lab facilities, and certified UL testing clearances.

The cohort winners focus on decentralized distributed micro-grids that automatically negotiate battery storage discharge during national grid blackouts. Using localized reinforcement learning algorithms running on edge microcontrollers, the systems dynamically shed residential luxury loads while prioritizing life-support machinery, vaccine cold-storage, and communal water filtration pumps.

"The acute power infrastructure challenges of Lebanon have forced our hardware and electrical engineers to become the most resourceful grid innovators in the world," stated Maya Khoury, Ecosystem Program Director at Berytech. "These teams are not just solving a domestic survival issue; they are building export-ready technology for emerging markets across Sub-Saharan Africa and Central Asia."

The six selected ventures will present live operational field telemetry at the upcoming Beirut Cleantech Summit in October.`,
    category: "Grants & Awards",
    authorName: "Maya Khoury",
    authorRole: "Ecosystem Program Director",
    authorEmail: "m.khoury@berytech.org",
    authorPhone: "+961 04 533 040",
    entityName: "Berytech Cleantech Accelerator",
    entityUrl: "https://berytech.org",
    publishedAt: "September 8, 2026",
    timestamp: 1788938400000,
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
    tags: ["#Cleantech", "#MicroGrants", "#SolarAI", "#Berytech", "#Energy"],
    status: "published",
    founderQuote: "Lebanon's power deficit became our ultimate testbed. We have engineered the most battle-tested solar battery management systems on Earth.",
    externalSourceUrl: "https://berytech.org/programs/cleantech-grants-2026",
    viewsCount: 1670,
    likesCount: 94,
    isOfficial: true,
    isCommunitySubmitted: true
  },
  {
    id: "news-comm-5",
    title: "Dubai Angel Syndicate Allocates $1.2M Special Purpose Vehicle Exclusively for Lebanese AI Founders",
    slug: "dubai-angel-syndicate-allocates-spv-lebanese-ai-founders",
    excerpt: "Providing fast-tracked SAFE agreements, dual Delaware/Lebanese Law 126 offshore corporate mirror setups, and direct customer introductions to GCC enterprise buyers.",
    content: `A group of senior Lebanese diaspora executives based in Dubai Internet City and the Abu Dhabi Global Market (ADGM) has announced the establishment of the 'Cedar Angels SPV I', a dedicated $1,200,000 investment syndicate designed specifically for seed-stage Lebanese artificial intelligence and enterprise software startups.

The syndicate utilizes standardized post-money Simple Agreements for Future Equity (SAFE) notes, with ticket sizes ranging between $75,000 and $150,000 per startup. A core requirement of the syndicate is that portfolio companies maintain their primary engineering and research hubs in Lebanon while using offshore commercial entities for frictionless international invoicing and regional client billing.

"Lebanon possesses world-class algorithmic talent that costs 70% less than equivalent engineering teams in London or Silicon Valley," stated Ziad Ghanem, Managing Partner of the syndicate. "Our syndicate is not charity. It is a calculated, high-conviction commercial play on the intellectual horsepower of Lebanese youth. We provide the capital, the corporate legal architecture, and the executive meetings across UAE and Saudi government ministries."

Startups can apply directly through 961AI's Pitch Room and Diaspora Matchmaking engines.`,
    category: "Partnership",
    authorName: "Ziad Ghanem",
    authorRole: "Managing Partner",
    authorEmail: "ziad@cedar-angels.ae",
    authorPhone: "+971 4 391 0000",
    entityName: "LebNet Diaspora Angels & Cedar Capital SPV",
    entityUrl: "https://lebnet.us",
    publishedAt: "September 6, 2026",
    timestamp: 1788765600000,
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    tags: ["#DiasporaVC", "#Syndicate", "#OffshoreSAL", "#AngelInvesting", "#UAE"],
    status: "published",
    founderQuote: "We are bridging the gap between Beirut's brilliant technical minds and the vast enterprise procurement budgets of the Arabian Gulf.",
    externalSourceUrl: "https://cedar-angels.ae/announcements/spv-launch",
    viewsCount: 2310,
    likesCount: 175,
    isOfficial: true,
    isCommunitySubmitted: true
  },
  {
    id: "news-comm-6",
    title: "Beirut AI Hackathon Concludes: Top Honor Awarded to Synthetic CT Oncology Diagnostic Copilot",
    slug: "beirut-ai-hackathon-synthetic-ct-oncology-copilot",
    excerpt: "180 developers and medical residents competed over 48 hours in Mar Mikhael to train lightweight vision transformers that detect early-stage lung carcinomas on low-resolution CT scanners.",
    content: `The 2026 Beirut AI Community Hackathon wrapped up on Sunday evening with 42 teams presenting working clinical demonstrations before a panel of oncologists, bioethicists, and venture capital partners.

The championship prize was awarded to Team 'RadIA', comprising three LAU biomedical engineering graduates and two Saint George Hospital medical residents. Over the 48-hour sprint, the team developed a vision transformer model capable of segmenting pulmonary nodules from noisy, low-slice-count CT scans common in underfunded public regional hospitals.

"In rural healthcare clinics, doctors often work with ten-year-old imaging hardware that produces significant visual artifacting," explained Tala Salloum, lead developer at RadIA. "Our synthetic contrast model reconstructs micro-density boundaries with 94.2% sensitivity, providing the radiologist with second-opinion heatmaps in under 4 seconds."

The team received a $10,000 cash grant, 100,000 961AI compute credits, and free incubation support at Saint George University Hospital's Clinical Research Center.`,
    category: "Community & Talent",
    authorName: "Tala Salloum",
    authorRole: "Lead BioAI Developer",
    authorEmail: "tala.salloum@radia.health",
    authorPhone: "+961 76 991 320",
    entityName: "Beirut AI & RadIA Health Hub",
    entityUrl: "https://beirut.ai",
    publishedAt: "September 4, 2026",
    timestamp: 1788592800000,
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    tags: ["#BeirutAI", "#HealthTech", "#Hackathon", "#Oncology", "#ComputerVision"],
    status: "published",
    founderQuote: "When Lebanese doctors and software engineers collaborate under pressure, we build solutions that can save lives anywhere in the developing world.",
    externalSourceUrl: "https://beirut.ai/hackathon-2026-winners",
    viewsCount: 1980,
    likesCount: 139,
    isOfficial: true,
    isCommunitySubmitted: true
  }
];

export function getCommunityNews(): CommunityNewsStory[] {
  if (typeof window === "undefined") return INITIAL_COMMUNITY_NEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMMUNITY_NEWS));
      return INITIAL_COMMUNITY_NEWS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMMUNITY_NEWS));
      return INITIAL_COMMUNITY_NEWS;
    }
    return parsed;
  } catch (err) {
    console.warn("Failed to read community news from localStorage:", err);
    return INITIAL_COMMUNITY_NEWS;
  }
}

export function saveCommunityNews(stories: CommunityNewsStory[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    window.dispatchEvent(new Event("961ai_community_news_updated"));
  } catch (err) {
    console.warn("Failed to write community news to localStorage:", err);
  }
}

export function addCommunityNewsStory(
  data: Omit<CommunityNewsItemInput, "id">
): CommunityNewsStory {
  const current = getCommunityNews();
  const id = `news-comm-${Date.now()}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || `story-${id}`;

  const words = (data.content || "").split(/\s+/).length;
  const readMinutes = Math.max(1, Math.ceil(words / 180));
  const readTime = `${readMinutes} min read`;

  const newStory: CommunityNewsStory = {
    id,
    title: data.title.trim(),
    slug,
    excerpt: data.excerpt.trim() || data.content.slice(0, 180) + "...",
    content: data.content.trim(),
    category: data.category || "Startup Launch",
    authorName: data.authorName.trim(),
    authorRole: data.authorRole?.trim() || "Community Member",
    authorEmail: data.authorEmail.trim(),
    authorPhone: data.authorPhone?.trim() || "+961",
    entityName: data.entityName.trim(),
    entityUrl: data.entityUrl?.trim() || "",
    publishedAt: dateStr,
    timestamp: Date.now(),
    readTime,
    imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    tags: Array.isArray(data.tags) ? data.tags : ["#Lebanon", "#Startup", "#Tech"],
    status: data.status || "pending", // Default to pending review for manual admin publishing
    founderQuote: data.founderQuote?.trim(),
    externalSourceUrl: data.externalSourceUrl?.trim(),
    viewsCount: 1,
    likesCount: 0,
    isOfficial: false,
    isCommunitySubmitted: true,
    certifiedAccurate: data.certifiedAccurate ?? true,
    certifiedNoPlagiarism: data.certifiedNoPlagiarism ?? true,
    certifiedTermsAccepted: data.certifiedTermsAccepted ?? true,
    certifiedAt: data.certifiedAt || new Date().toISOString()
  };

  const updated = [newStory, ...current];
  saveCommunityNews(updated);
  return newStory;
}

export interface CommunityNewsItemInput {
  title: string;
  excerpt: string;
  content: string;
  category: CommunityNewsStory["category"];
  authorName: string;
  authorRole?: string;
  authorEmail: string;
  authorPhone?: string;
  entityName: string;
  entityUrl?: string;
  imageUrl?: string;
  tags?: string[];
  founderQuote?: string;
  externalSourceUrl?: string;
  status?: CommunityNewsStory["status"];
  certifiedAccurate?: boolean;
  certifiedNoPlagiarism?: boolean;
  certifiedTermsAccepted?: boolean;
  certifiedAt?: string;
}

export function updateCommunityNewsStory(
  id: string,
  updates: Partial<CommunityNewsStory>
): CommunityNewsStory | null {
  const current = getCommunityNews();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const updated = { ...current[idx], ...updates };
  current[idx] = updated;
  saveCommunityNews(current);
  return updated;
}

export function updateCommunityNewsStatus(
  id: string,
  newStatus: CommunityNewsStory["status"]
): boolean {
  const current = getCommunityNews();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  current[idx].status = newStatus;
  saveCommunityNews(current);
  return true;
}

export function deleteCommunityNewsStory(id: string): boolean {
  const current = getCommunityNews();
  const filtered = current.filter((s) => s.id !== id);
  if (filtered.length === current.length) return false;
  saveCommunityNews(filtered);
  return true;
}

export function likeCommunityNewsStory(id: string): number {
  const current = getCommunityNews();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return 0;
  current[idx].likesCount = (current[idx].likesCount || 0) + 1;
  saveCommunityNews(current);
  return current[idx].likesCount;
}

export function incrementCommunityNewsViews(id: string): void {
  const current = getCommunityNews();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return;
  current[idx].viewsCount = (current[idx].viewsCount || 0) + 1;
  saveCommunityNews(current);
}

export function exportCommunityNewsCsv(): string {
  const stories = getCommunityNews();
  const headers = [
    "ID",
    "Title",
    "Category",
    "Entity Name",
    "Author Name",
    "Author Email",
    "Author Phone",
    "Status",
    "Certified Accurate",
    "Certified No Plagiarism",
    "Terms Accepted",
    "Published At",
    "Views",
    "Likes",
    "Tags"
  ];
  const rows = stories.map((s) => [
    `"${s.id}"`,
    `"${s.title.replace(/"/g, '""')}"`,
    `"${s.category}"`,
    `"${s.entityName.replace(/"/g, '""')}"`,
    `"${s.authorName.replace(/"/g, '""')}"`,
    `"${s.authorEmail}"`,
    `"${s.authorPhone || ""}"`,
    `"${s.status}"`,
    `"${s.certifiedAccurate ? 'YES' : 'NO'}"`,
    `"${s.certifiedNoPlagiarism ? 'YES' : 'NO'}"`,
    `"${s.certifiedTermsAccepted ? 'YES' : 'NO'}"`,
    `"${s.publishedAt}"`,
    s.viewsCount || 0,
    s.likesCount || 0,
    `"${(s.tags || []).join(", ")}"`
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
