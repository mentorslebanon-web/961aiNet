export type UserRole = "founder" | "investor" | "guru" | "superadmin";

export type NodeType = "Guru" | "Startup" | "Investor" | "Skill" | "Hub" | "Location" | "Project";

export type LocationType = "onshore_lebanon" | "diaspora";

export interface ServiceBreakdownItem {
  name: string;
  percentage: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  location?: string;
  locationType?: LocationType;
  country?: string;
  isDiaspora?: boolean;
  avatar?: string;
  title?: string;
  bio?: string;
  tags?: string[];
  stage?: string;
  ticketSize?: string;
  fundingTarget?: string;
  valuation?: string;
  mrr?: string;
  githubActivity?: number; // 0 - 100
  proficiency?: number; // 0 - 1.0 for skills
  verified?: boolean;
  premierVerified?: boolean;
  wikiSlug?: string;
  connectionsCount?: number;
  claimStatus?: "claimed" | "unclaimed" | "pending";
  diasporaHub?: string;
  linkedinUrl?: string;

  // Rich Agency / Provider stats
  rating?: number; // e.g. 4.8, 5.0
  reviewCount?: number; // e.g. 86
  minProjectSize?: string; // e.g. "$10,000+", "$25,000+"
  hourlyRate?: string; // e.g. "$25 - $49 / hr"
  teamSize?: string; // e.g. "50 - 249", "250 - 999", "Freelancer"
  servesLebanon?: boolean;
  servicesBreakdown?: ServiceBreakdownItem[];
  highlights?: string[];
  featured?: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string; // HAS_SKILL, INVESTED_IN, TARGETS_STAGE, ALUMNI_OF, LOCATED_IN, COLLABORATES_WITH, INCUBATED_AT
  weight: number; // 0.1 - 1.0
  verified?: boolean;
  properties?: Record<string, any>;
}

export interface WikiDocument {
  slug: string;
  title: string;
  entityType: NodeType;
  lastUpdated: string;
  author: string;
  frontmatter: {
    aliases: string[];
    location: string;
    isDiaspora: boolean;
    verificationLevel: "Tier 1 (Verified)" | "Tier 2 (Community)" | "Unclaimed";
    connectedEntities: string[];
  };
  summary: string;
  markdownContent: string;
  backlinks: string[];
  outlinks: string[];
}

export interface MatchWeightConfig {
  w1_domainSim: number;      // Domain & thesis similarity (default 0.35)
  w2_stageCheck: number;     // Stage & ticket fit (default 0.25)
  w3_skillOverlap: number;   // Deep tech & skill overlap (default 0.20)
  w4_diasporaSynergy: number;// Diaspora to Onshore bridge synergy (default 0.20)
}

export interface MatchBreakdown {
  domainSim: number;
  stageCheck: number;
  skillOverlap: number;
  diasporaSynergy: number;
}

export interface MatchResult {
  startupId: string;
  startupName: string;
  startupLogo: string;
  startupStage: string;
  startupLocation: string;
  investorId: string;
  investorName: string;
  investorLogo: string;
  investorTicket: string;
  investorLocation: string;
  totalScore: number; // 0.0 to 1.0
  breakdown: MatchBreakdown;
  rationale: string;
  synergyTags: string[];
}

export interface EnrichedGuruProfile {
  full_name: string;
  primary_role: string;
  location: {
    city: string;
    country: string;
    is_lebanese_diaspora: boolean;
  };
  technical_skills: Array<{
    name: string;
    category: "LLM" | "ComputerVision" | "Infrastructure" | "DataScience";
    confidence_score: number;
  }>;
  lebanon_affiliations: string[];
  open_to_roles: Array<"Advisor" | "Founder" | "Angel Investor" | "Full-Time">;
  github_stats?: {
    total_stars: number;
    top_languages: string[];
  };
}

export interface InvestmentMemo {
  headline: string;
  executiveSummary: string;
  thesisAlignment: string;
  diasporaSynergy: string;
  technicalRiskAndRetention: string;
  syndicateRecommendation: string;
  keyChecklist?: string[];
  convictionScore?: number;
}

export interface PostgresTableSchema {
  tableName: string;
  description: string;
  columns: {
    name: string;
    type: string;
    constraints?: string;
    description: string;
  }[];
  rlsPolicySql: string;
}

export interface LintIssue {
  id: string;
  type: "ORPHAN_NODE" | "METRIC_DRIFT" | "DISCREPANCY" | "ALIAS_MERGE" | "STALE_DATA";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  entity: string;
  description: string;
  autoFixCypher: string;
  fixed?: boolean;
}

export interface LintReport {
  totalNodesScanned: number;
  healthScore: number;
  issues: LintIssue[];
  graphHygieneSummary: string;
  timestamp: string;
}

export interface SeedingPartner {
  id: string;
  name: string;
  category: "University" | "Incubator/Hub" | "Diaspora Network" | "VC Syndicate";
  city: string;
  country: string;
  logo: string;
  seedNodesCount: number;
  ambassadorLead: string;
  integrationStatus: "Active Partner" | "API Connected" | "Onboarding";
  keyAlumniGurus: string[];
}

export interface SubscriptionTier {
  id: string;
  name: string;
  tagline: string;
  priceUsdMonthly: number;
  priceUsdAnnual: number;
  creditsPerMonth: number;
  features: string[];
  popular?: boolean;
  buttonLabel: string;
  badge?: string;
}

export interface EdgeChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isVoiceNote?: boolean;
  voiceDuration?: string;
  commandDetected?: string;
  payloadBytes?: number;
  latencyMs?: number;
}

export interface QuestionnaireSubmission {
  id: string;
  userId: string;
  category: "Startup Founder" | "AI Guru/Expert" | "Investor" | "Stakeholder";
  timestamp: string;
  contactEmail: string;
  contactPhone?: string;
  entityName: string;
  location: string;
  isDiaspora: boolean;
  subService: string;
  techStack?: string[];
  rawTextPayload: string;
  uploadedFileName?: string;
  // Founder specific
  founderDetails?: {
    teamSize: number;
    fundingStage: "Pre-Seed" | "Seed" | "Series A" | "Bootstrapped";
    hiringNeeds: string[];
    pitchDeckUrl?: string;
    deckText?: string;
  };
  // Guru specific
  guruDetails?: {
    academicBackground: string;
    githubUrl?: string;
    linkedinUrl?: string;
    advisoryAvailability: boolean;
    expertiseTags: string[];
  };
  // Investor specific
  investorDetails?: {
    fundName: string;
    investmentThesis: string;
    ticketSizeUsd: string;
    geographicFocus: string;
    menaPortfolio: string[];
    preferredStages: string[];
  };
  // Stakeholder specific
  stakeholderDetails?: {
    stakeholderType: "University" | "Incubator" | "Media" | "Government/NGO";
    programsOffered: string[];
    keyAlumniPartners: string[];
  };
  status: "pending_ingest" | "compiled_l2" | "published_l3" | "soft_deleted";
}

export interface ReferralRecord {
  id: string;
  referrerUserId: string;
  referredFounderName: string;
  referredStartupName: string;
  referredEmail: string;
  founderCategory: "Startup Founder";
  techStack?: string;
  subService?: string;
  signupDate: string;
  status: "completed_rewarded" | "pending_verification" | "review";
  rewardGranted: string; // e.g. "+1 Month Free ($8.33 value)"
  rewardMonthValue: number; // 1
  creditsAwarded: number; // 250
  notes?: string;
}

export interface UserPersonalWorkspace {
  user: {
    id: string;
    name: string;
    email: string;
    role: "founder" | "guru" | "investor" | "stakeholder";
  };
  entityNode: GraphNode;
  wikiDoc: WikiDocument;
  rawVault: {
    sourcePath: string; // e.g. "1_sources/submissions/20260825_user_102.json"
    rawSubmission: QuestionnaireSubmission;
    lastIngestedAt: string;
    immutableHash: string;
  };
  aiMatches: Array<{
    id: string;
    targetNode: GraphNode;
    score: number;
    rationale: string;
    synergyPill: string;
    category: string;
  }>;
  referrals?: ReferralRecord[];
}

export interface IntroductionRequestLog {
  id: string;
  timestamp: string;
  requesterId: string;
  requesterName: string;
  requesterRole: string;
  targetId: string;
  targetName: string;
  targetRole: string;
  status: "Warm Intro Sent" | "Connected" | "In Review";
  creditsSpent: number;
  pitchNote?: string;
}

export interface AdminBulkIngestFile {
  id: string;
  fileName: string;
  fileSizeKb: number;
  uploadedAt: string;
  fileType: "pdf" | "csv" | "txt" | "json";
  status: "queued" | "processing" | "compiled" | "failed";
  extractedCount?: number;
  previewText: string;
}

export interface StartupNewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "Funding" | "Product Launch" | "Research & Lab" | "Ecosystem & Grants" | "Diaspora Bridge";
  region?: "Lebanon" | "MENA" | "UAE" | "Saudi Arabia" | "Egypt" | "Diaspora" | "Global";
  sourceName: string;
  sourceUrl?: string;
  publishedAt: string;
  readTimeMin: number;
  imageUrl?: string;
  featured?: boolean;
  relatedEntitySlugs: string[]; // references graph nodes / wiki documents
  tags: string[];
  author: string;
  sentimentMood?: "Optimistic" | "Cautious" | "Growth-Phase";
  sentimentScore?: number;
  sentimentDriver?: string;
}

export type EcosystemMood = "Optimistic" | "Cautious" | "Growth-Phase";

export interface HeadlineSentiment {
  articleId: string;
  headlineTitle: string;
  mood: EcosystemMood;
  sentimentScore: number; // -1.0 to 1.0
  driverCategory: string;
  analysisRationale: string;
  confidence: number;
}

export interface EcosystemSentimentAnalysis {
  overallMood: EcosystemMood;
  confidenceScore: number;
  momentumIndex: number;
  trendLabel: string;
  distribution: {
    optimisticPct: number;
    growthPhasePct: number;
    cautiousPct: number;
  };
  macroSummary: string;
  keyDrivers: string[];
  headwindsAndRisks: string[];
  headlineSentiments: HeadlineSentiment[];
  analyzedAt: string;
  isAiGenerated: boolean;
}

export interface KnowledgeResource {
  id: string;
  title: string;
  category: "Playbook & Guide" | "Regulatory & Legal" | "Market Intelligence" | "Research & Whitepaper" | "Toolkit & Templates" | "MENA AI Map";
  format: "PDF" | "Interactive" | "Doc" | "CheatSheet" | "Dataset";
  summary: string;
  description: string;
  publishedAt: string;
  readTimeOrPages: string;
  fileSizeMb?: number;
  downloadCount: number;
  tags: string[];
  authorOrOrg: string;
  featured?: boolean;
  contentMarkdown?: string;
  externalLink?: string;
}

export interface UserAuthSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  affiliation?: string;
  createdAt: number; // timestamp in ms
  demoExpiresAt: number; // timestamp in ms (6 hours after signup)
  isPremium: boolean;
  premiumExpiresAt?: number;
  plan: "demo" | "premium_annual";
  credits: number;
  referralCode?: string;
  referralCount?: number;
  monthsEarnedFree?: number;
  xp?: number;
  cedarTier?: "Cedar Seedling" | "DeepTech Contributor" | "Diaspora Catalyst" | "Sovereign AI Architect";
  level?: number;
  // z961 Second Brain Workspace Fields
  z961_second_brain_id?: string;
  whatsapp_phone?: string;
  ingested_sources_count?: number;
}

export type QuestCategory =
  | "Arabic Dialect & Datasets"
  | "Startup Verification & Diligence"
  | "Research Peer Review"
  | "Diaspora Capital Bridge"
  | "Open Source AI Code"
  | "Ecosystem Growth";

export interface CommunityQuest {
  id: string;
  title: string;
  category: QuestCategory;
  description: string;
  xpReward: number;
  cedarCreditsReward: number;
  cashEquivalentUsd?: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Master";
  status: "available" | "in_progress" | "submitted" | "verified";
  proofRequirement: string;
  estimatedTimeMin: number;
  badgeRewardId?: string;
  sponsorOrg?: string;
  submissionCount: number;
  maxSubmissions?: number;
  deadline?: string;
  actionCta?: string;
}

export interface CommunityBadge {
  id: string;
  title: string;
  description: string;
  tier: "Bronze" | "Silver" | "Gold" | "Cedar Diamond";
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  perkDescription: string;
}

export interface EcosystemRedeemableService {
  id: string;
  title: string;
  category: "Capital & Advisory" | "Compute & Infrastructure" | "Ecosystem Perks" | "Legal & Compliance" | "Platform Boosts";
  providerName: string;
  description: string;
  costXp: number;
  costCedarCredits: number;
  usdValue: number;
  deliveryFormat: "Instant Code" | "1-on-1 Session" | "API Credit Key" | "Legal Voucher";
  stockAvailable: number;
  eligibilityTier: "Cedar Seedling" | "DeepTech Contributor" | "Diaspora Catalyst" | "Sovereign AI Architect";
  badgeRequirement?: string;
}

export interface LeaderboardContributor {
  rank: number;
  userId: string;
  name: string;
  role: string;
  location: string;
  isDiaspora: boolean;
  avatar: string;
  tier: "Cedar Seedling" | "DeepTech Contributor" | "Diaspora Catalyst" | "Sovereign AI Architect";
  level: number;
  xp: number;
  questsCompleted: number;
  badgesCount: number;
  streakDays: number;
  topBadge: string;
}

export type ContributionType =
  | "wiki_edit"
  | "shared_resource"
  | "successful_match"
  | "bounty_completed"
  | "open_source_code"
  | "research_note";

export interface ContributionComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  authorTier?: "Cedar Seedling" | "DeepTech Contributor" | "Diaspora Catalyst" | "Sovereign AI Architect";
  content: string;
  createdAt: string; // e.g. "5m ago", "1h ago"
  timestamp: number;
  upvotes: number;
  userUpvoted?: boolean;
}

export interface CommunityContribution {
  id: string;
  type: ContributionType;
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  authorLocation?: string;
  authorTier: "Cedar Seedling" | "DeepTech Contributor" | "Diaspora Catalyst" | "Sovereign AI Architect";
  isDiaspora?: boolean;
  createdAt: string; // e.g. "2m ago"
  timestamp: number;
  upvotes: number;
  userUpvoted?: boolean;
  xpEarned?: number;
  cedarCreditsEarned?: number;
  tags: string[];
  externalUrl?: string;
  actionModuleTarget?: "wiki" | "directory" | "matchmaking" | "sandbox" | "news";
  actionLabel?: string;
  comments: ContributionComment[];
  metaDetails?: {
    diffSnippet?: string;
    resourceSize?: string;
    dealAmount?: string;
    paperTitle?: string;
    repoName?: string;
  };
}
export interface PitchRoomSubmission {
  id: string;
  startupName: string;
  founderName: string;
  founderEmail: string;
  tagline: string;
  stage: "Pre-Seed" | "Seed" | "Series A" | "Grant / Research";
  targetRaise: string;
  valuationPreMoney?: string;
  sector: "Levantine NLP" | "AgriTech Vision" | "HealthTech AI" | "Fintech & Treasury" | "Robotics & Edge" | "Enterprise SaaS";
  deckFileName?: string;
  deckContentSummary?: string;
  githubRepoUrl?: string;
  repoArchitectureJson?: string;
  submittedAt: number;
}

export interface PitchRoomAnalysisReport {
  id: string;
  submissionId: string;
  overallScore: number; // 0 - 100
  tier: "Tier 1: Institutional Investment Ready" | "Tier 2: Strong Seed Contender" | "Tier 3: Early Alpha / Needs Refinement" | "Tier 4: Exploratory";
  analyzedAt: string;
  summaryExecutiveMemo: string;
  subScores: {
    techFeasibility: number;
    ipDefensibility: number;
    marketOpportunity: number;
    diasporaSynergy: number;
    unitEconomics: number;
    legalSovereignty: number;
  };
  strengths: string[];
  risksAndGaps: string[];
  valuationBenchmark: {
    recommendedCap: string;
    safeInstrument: string;
    comparablesMena: string;
    comparablesDiaspora: string;
  };
  spvSyndicateReadiness: {
    eligibleForDiasporaSPV: boolean;
    recommendedMinCheck: string;
    targetSyndicateLead: string;
    communityInterestScore: number;
  };
  actionRoadmap: {
    priority: "High" | "Medium" | "Low";
    category: "Code" | "Deck" | "Legal" | "Go-To-Market";
    task: string;
    impact: string;
  }[];
}

export interface MailingListSubscriber {
  id: string;
  email: string;
  name: string;
  role?: string;
  affiliation?: string;
  source: "Signup & Demo" | "Send Message / EdgeBot" | "Questionnaire Ingestion" | "Pitch Room Syndicate" | "Marketplace Lead" | "Newsletter Footer" | "Quick Lead Capture" | "Direct Admin Ingestion" | "Daily Ecosystem Digest";
  subscribedAt: string;
  status: "Active" | "Verified" | "Unsubscribed";
  gdprConsent: boolean;
  notes?: string;
  lastMessagePayload?: string;
  preferredTopics?: string[];
  digestFrequency?: "Daily" | "Weekly";
}

export interface DailyDigestSubscription {
  id: string;
  name: string;
  email: string;
  role: string;
  organization?: string;
  preferredTopics: string[];
  digestFrequency: "Daily" | "Weekly";
  subscribedAt: string;
  timestamp: number;
  status: "Active" | "Paused" | "Unsubscribed";
  gdprConsent: boolean;
}

export interface LegalGdprConsentState {
  hasAcceptedTerms: boolean;
  hasAcceptedGdpr: boolean;
  marketingConsent: boolean;
  telemetryConsent: boolean;
  timestamp: number;
  ipRegion?: string;
}

// Second Brain Notebook LLM Types
export interface SecondBrainDocument {
  id: string;
  title: string;
  category: "Legal & Regulatory" | "Pitch Deck & Financials" | "Research & HPC" | "Diaspora Capital" | "Engineering Spec" | "Custom";
  notebookId: string;
  sourceType: "pdf" | "markdown" | "text" | "url" | "whitepaper";
  content: string;
  summary?: string;
  dateAdded: string;
  wordCount: number;
  tags: string[];
  isPinned?: boolean;
  authorOrSource?: string;
}

export interface SecondBrainNote {
  id: string;
  title: string;
  notebookId: string;
  content: string;
  updatedAt: string;
  tags: string[];
  linkedDocIds?: string[];
  isPinned?: boolean;
}

export interface SecondBrainNotebook {
  id: string;
  name: string;
  description: string;
  iconName?: string;
  colorTheme?: string;
  createdAt: string;
}

export interface SecondBrainSynthesisSession {
  id: string;
  timestamp: string;
  query: string;
  mode: "qa" | "briefing" | "podcast" | "compliance" | "investor_memo";
  responseMarkdown: string;
  citedDocIds: string[];
  citedDocTitles?: string[];
  podcastDialogue?: Array<{ speaker: string; text: string }>;
  keyTakeaways?: string[];
}

// ============================================================================
// z961 NETWORK MULTI-CHANNEL SECOND BRAIN ARCHITECTURE TYPES
// ============================================================================

export type WorkspaceCategory = "research" | "contact" | "note" | "followup";

export type WorkspaceSourceType = "web_cta" | "whatsapp" | "file_upload" | "seed" | "web_clipper";

export interface WorkspaceContactDetails {
  name: string;
  role?: string;
  organization?: string;
  email?: string;
  phone?: string;
  location?: string;
  isDiaspora?: boolean;
  ticketSize?: string;
  skillsOrThesis?: string[];
  linkedin?: string;
  notes?: string;
}

export interface WorkspaceFollowupDetails {
  task: string;
  dueDate?: string;
  priority: "urgent" | "high" | "normal";
  completed: boolean;
  assignee?: string;
  reminderSent?: boolean;
}

export interface WorkspaceResearchDetails {
  documentTitle: string;
  categoryName?: string;
  sourceUrl?: string;
  authorOrEntity?: string;
  statutoryCitations?: string[];
  pageOrWordCount?: string;
}

export interface WorkspaceContentPayload {
  title: string;
  summary?: string;
  text: string;
  category: WorkspaceCategory;
  tags?: string[];
  contactDetails?: WorkspaceContactDetails;
  followupDetails?: WorkspaceFollowupDetails;
  researchDetails?: WorkspaceResearchDetails;
  metadata?: Record<string, any>;
}

export interface WorkspaceEntry {
  id: string;
  userId: string;
  workspaceId: string;
  category: WorkspaceCategory;
  sourceType: WorkspaceSourceType;
  title: string;
  contentPayload: WorkspaceContentPayload;
  timestamp: string;
  isPinned?: boolean;
  isGroundedActive?: boolean;
}

export interface Z961ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  citedEntryIds?: string[];
  citedTitles?: string[];
  confidence?: number;
  mode?: "grounded_qa" | "executive_brief" | "podcast_script" | "regulatory_audit" | "vc_memo";
}

export interface Z961AudioOverview {
  id: string;
  title: string;
  duration: string;
  generatedAt: string;
  dialogue: Array<{ speaker: "Jad" | "Maya"; text: string; timeOffset?: string }>;
  audioMime: string;
  status: "ready" | "generating";
}

export interface Z961Workspace {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  starterAssetsCount: number;
  ingestedSourcesCount: number;
  whatsappPhone?: string;
  entries: WorkspaceEntry[];
  chatHistory: Z961ChatMessage[];
  audioOverviews: Z961AudioOverview[];
}

// ==========================================
// IDEAS LAB & ECOSYSTEM FEEDBACK PLATFORM
// ==========================================

export type IdeaCategory = 
  | "Policy & Regulation"
  | "Funding & Grants"
  | "Talent"
  | "Infrastructure"
  | "Community Events";

export type IdeaStatus = 
  | "Submitted"
  | "Under Review"
  | "Planned"
  | "In Progress"
  | "Completed"
  | "Archived";

export interface IdeaNotification {
  id: string;
  timestamp: string;
  recipient: string;
  type: string;
  triggerEvent: string;
  ideaId?: string;
  ideaTitle: string;
  newStatus?: IdeaStatus;
  status: string;
  contentSnippet: string;
  read?: boolean;
}

export type FeedbackPreference = 
  | "Mentorship/Coaching"
  | "Direct Connect with Admin/Regulators"
  | "Public Ecosystem Discussion"
  | "Resource/Funding Guidance";

export interface IdeaComment {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  text: string;
  createdAt: string;
  isOfficial?: boolean;
}

export interface IdeaAttachment {
  id: string;
  name: string;
  type: "pdf" | "image" | "deck" | "document";
  size: string;
  url?: string;
}

export interface OfficialUpdate {
  id: string;
  date: string;
  title: string;
  notes: string;
  adminName: string;
  statusBadge: IdeaStatus;
}

export interface PrivateAdminResponse {
  id: string;
  date: string;
  message: string;
  responder: string;
  channel: "Email" | "SMS" | "Portal DM";
  dispatchedAt: string;
}

export interface EcosystemIdea {
  id: string;
  title: string;
  category: IdeaCategory;
  status: IdeaStatus;
  problemStatement: string;
  proposedSolution: string;
  expectedImpact: string;
  feedbackPreference: FeedbackPreference;
  submitterName: string;
  submitterEmail: string;
  submitterOrg?: string;
  submitterAvatar?: string;
  upvotes: number;
  hasUpvoted?: boolean;
  commentsCount: number;
  comments: IdeaComment[];
  officialUpdates: OfficialUpdate[];
  attachments: IdeaAttachment[];
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  privateResponses?: PrivateAdminResponse[];
  pinned?: boolean;
}

export interface AICaseStudy {
  id: string;
  title: string;
  institution: string;
  country: string;
  flag: string;
  domain: "Civic AI & Governance" | "Sovereign LLMs & Compute" | "Regulatory Sandboxes" | "Health & Clinical AI" | "Diaspora & Capital Bridges";
  executiveSummary: string;
  technologicalStack: string[];
  regulatoryFramework: string;
  metricsAndImpact: Array<{ label: string; value: string }>;
  replicabilityScore: number; // 0 - 100%
  relevanceToLebanon: string;
  recommendedRoadmap: string[];
  keyQuote?: string;
  quoteAuthor?: string;
  whitepaperName?: string;
}

export interface EcosystemContributor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  organization: string;
  ideasSubmitted: number;
  ideasImplemented: number;
  communityUpvotes: number;
  rank: number;
  badge: string;
}

