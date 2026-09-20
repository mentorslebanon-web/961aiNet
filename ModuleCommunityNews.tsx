import { MailingListSubscriber, DailyDigestSubscription } from "../types";

const MAILING_LIST_STORAGE_KEY = "961ai_mailing_list";
export const DAILY_DIGEST_STORAGE_KEY = "961ai_daily_digest_subscribers";

const INITIAL_SUBSCRIBERS: MailingListSubscriber[] = [
  {
    id: "sub_seed_1",
    email: "tariq.nader@polytechnique.fr",
    name: "Dr. Tariq Nader",
    role: "AI Guru / Researcher",
    affiliation: "École Polytechnique / PhoeniciaAI",
    source: "Questionnaire Ingestion",
    subscribedAt: "2026-08-20 10:14",
    status: "Verified",
    gdprConsent: true,
    notes: "Lead on Arabic LLM compression & AWQ quantization."
  },
  {
    id: "sub_seed_2",
    email: "nour.haddad@cedarshealth.ai",
    name: "Nour Haddad",
    role: "Founder",
    affiliation: "CedarsHealth AI",
    source: "Pitch Room Syndicate",
    subscribedAt: "2026-08-22 14:30",
    status: "Active",
    gdprConsent: true,
    notes: "Applied for $1.5M Seed Diaspora Angel Syndicate."
  },
  {
    id: "sub_seed_3",
    email: "kareem.chahine@beirutangels.vc",
    name: "Kareem Chahine",
    role: "Investor",
    affiliation: "Beirut Diaspora Capital",
    source: "Signup & Demo",
    subscribedAt: "2026-08-24 09:05",
    status: "Active",
    gdprConsent: true,
    notes: "Active angel deploying $50k-$250k tickets."
  },
  {
    id: "sub_seed_4",
    email: "maya.khoury@hellotree.dev",
    name: "Maya Khoury",
    role: "Agency Lead",
    affiliation: "Hellotree Digital",
    source: "Marketplace Lead",
    subscribedAt: "2026-08-26 16:45",
    status: "Verified",
    gdprConsent: true,
    notes: "Listed on Lebanese Software & AI Agency Marketplace."
  },
  {
    id: "sub_seed_5",
    email: "samir.matar@aub.edu.lb",
    name: "Prof. Samir Matar",
    role: "Stakeholder / Academic",
    affiliation: "AUB AI Research Lab",
    source: "Newsletter Footer",
    subscribedAt: "2026-08-28 11:20",
    status: "Active",
    gdprConsent: true,
    notes: "Subscribed to Lebanon AI & DeepTech Dispatch."
  }
];

export function getMailingList(): MailingListSubscriber[] {
  try {
    const raw = localStorage.getItem(MAILING_LIST_STORAGE_KEY);
    let list: MailingListSubscriber[] = raw ? JSON.parse(raw) : [];

    // If empty, initialize with seed
    if (!list || list.length === 0) {
      list = INITIAL_SUBSCRIBERS;
      localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(list));
    }

    // Auto-sync with registered users in localStorage
    try {
      const regUsersRaw = localStorage.getItem("961ai_registered_users");
      if (regUsersRaw) {
        const regUsers = JSON.parse(regUsersRaw);
        let hasNew = false;
        regUsers.forEach((u: any) => {
          const cleanEmail = (u.email || "").trim().toLowerCase();
          const cleanName = (u.name || (u.session && u.session.name) || "").trim();
          if (!cleanEmail) return;

          const existing = list.find((s) => s.email.toLowerCase() === cleanEmail);
          if (!existing) {
            list.unshift({
              id: `sub_reg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              email: cleanEmail,
              name: cleanName || cleanEmail.split("@")[0],
              role: u.role || (u.session && u.session.role) || "User",
              affiliation: u.affiliation || (u.session && u.session.affiliation) || "961AI Member",
              source: "Signup & Demo",
              subscribedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
              status: "Active",
              gdprConsent: true,
              notes: "Auto-synced from 961AI registered account & 6-hour demo session."
            });
            hasNew = true;
          } else if (cleanName && (!existing.name || existing.name === "Ecosystem User" || existing.name === "Community Member" || existing.name === cleanEmail.split("@")[0])) {
            existing.name = cleanName;
            hasNew = true;
          }
        });
        if (hasNew) {
          localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(list));
        }
      }
    } catch {
      // ignore
    }

    // Auto-sync active authenticated session if present
    try {
      const authRaw = localStorage.getItem("961ai_auth_user");
      if (authRaw) {
        const authUser = JSON.parse(authRaw);
        const cleanEmail = (authUser.email || "").trim().toLowerCase();
        const cleanName = (authUser.name || "").trim();
        if (cleanEmail) {
          const existing = list.find((s) => s.email.toLowerCase() === cleanEmail);
          if (!existing) {
            list.unshift({
              id: `sub_auth_${Date.now()}`,
              email: cleanEmail,
              name: cleanName || cleanEmail.split("@")[0],
              role: authUser.role || "User",
              affiliation: authUser.affiliation || "961AI Member",
              source: "Signup & Demo",
              subscribedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
              status: "Active",
              gdprConsent: true,
              notes: "Auto-synced from active signed-in user session."
            });
            localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(list));
          } else if (cleanName && (!existing.name || existing.name === "Ecosystem User" || existing.name === "Community Member" || existing.name === cleanEmail.split("@")[0])) {
            existing.name = cleanName;
            localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(list));
          }
        }
      }
    } catch {
      // ignore
    }

    return list;
  } catch {
    return INITIAL_SUBSCRIBERS;
  }
}

export function addSubscriberToMailingList(
  email: string,
  name?: string,
  role?: string,
  source?: MailingListSubscriber["source"],
  affiliation?: string,
  notes?: string,
  lastMessagePayload?: string
): MailingListSubscriber {
  const cleanEmail = (email || "").trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    throw new Error("Invalid email address.");
  }

  const currentList = getMailingList();
  const existingIndex = currentList.findIndex((s) => s.email.toLowerCase() === cleanEmail);

  const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

  if (existingIndex >= 0) {
    // Update existing subscriber record
    const finalName = (name && name.trim() && name !== "Community Member" && name !== "Ecosystem User")
      ? name.trim()
      : (currentList[existingIndex].name || name?.trim() || cleanEmail.split("@")[0]);

    const updated = {
      ...currentList[existingIndex],
      name: finalName,
      role: role || currentList[existingIndex].role,
      affiliation: affiliation || currentList[existingIndex].affiliation,
      notes: notes ? `${currentList[existingIndex].notes || ""} | ${notes}` : currentList[existingIndex].notes,
      lastMessagePayload: lastMessagePayload || currentList[existingIndex].lastMessagePayload,
      status: "Active" as const
    };
    currentList[existingIndex] = updated;
    localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(currentList));
    return updated;
  }

  const newSub: MailingListSubscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    email: cleanEmail,
    name: name?.trim() || cleanEmail.split("@")[0],
    role: role || "Ecosystem Member",
    affiliation: affiliation || "Al Khawarizmi Solutions & NCEI Network",
    source: source || "Quick Lead Capture",
    subscribedAt: nowStr,
    status: "Active",
    gdprConsent: true,
    notes: notes || "Subscribed via interactive 961AI prompt.",
    lastMessagePayload: lastMessagePayload
  };

  currentList.unshift(newSub);
  localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(currentList));
  return newSub;
}

export function removeSubscriberFromMailingList(id: string): void {
  const currentList = getMailingList();
  const filtered = currentList.filter((s) => s.id !== id);
  localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(filtered));
}

export function updateSubscriberStatus(id: string, status: MailingListSubscriber["status"]): void {
  const currentList = getMailingList();
  const index = currentList.findIndex((s) => s.id === id);
  if (index >= 0) {
    currentList[index].status = status;
    localStorage.setItem(MAILING_LIST_STORAGE_KEY, JSON.stringify(currentList));
  }
}

export function exportMailingListCsv(): string {
  const list = getMailingList();
  const headers = ["ID", "Name", "Email", "Role", "Affiliation", "Source", "Subscribed At", "Status", "GDPR Consent", "Notes"];
  const rows = list.map((s) => [
    `"${s.id}"`,
    `"${(s.name || "").replace(/"/g, '""')}"`,
    `"${s.email}"`,
    `"${(s.role || "").replace(/"/g, '""')}"`,
    `"${(s.affiliation || "").replace(/"/g, '""')}"`,
    `"${s.source}"`,
    `"${s.subscribedAt}"`,
    `"${s.status}"`,
    `"${s.gdprConsent ? "Yes (Explicit Opt-In)" : "No"}"`,
    `"${(s.notes || "").replace(/"/g, '""')}"`
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function getDailyDigestSubscribers(): DailyDigestSubscription[] {
  try {
    const raw = localStorage.getItem(DAILY_DIGEST_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    const initial: DailyDigestSubscription[] = [
      {
        id: "digest_sub_1",
        name: "Carla Chammas",
        email: "c.chammas@cedarventures.ai",
        role: "Investor / VC",
        organization: "Cedar Ventures Paris",
        preferredTopics: ["Latest News & Wire", "Investment Reports & Deals", "BDL Circular 165 Sandbox"],
        digestFrequency: "Daily",
        subscribedAt: "2026-09-14 08:30",
        timestamp: Date.now() - 172800000,
        status: "Active",
        gdprConsent: true
      },
      {
        id: "digest_sub_2",
        name: "Ziad El-Khoury",
        email: "ziad@phoeniciamedtech.com",
        role: "Founder",
        organization: "Phoenicia MedTech AI",
        preferredTopics: ["Latest News & Wire", "Investment Reports & Deals", "MITA & OMSAR Dispatches"],
        digestFrequency: "Daily",
        subscribedAt: "2026-09-15 09:15",
        timestamp: Date.now() - 86400000,
        status: "Active",
        gdprConsent: true
      }
    ];
    localStorage.setItem(DAILY_DIGEST_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  } catch {
    return [];
  }
}

export function subscribeToDailyDigest(data: {
  name: string;
  email: string;
  role: string;
  organization?: string;
  preferredTopics: string[];
  digestFrequency: "Daily" | "Weekly";
}): { subscriber: MailingListSubscriber; digest: DailyDigestSubscription } {
  const cleanEmail = (data.email || "").trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }
  const cleanName = (data.name || "").trim() || cleanEmail.split("@")[0];
  const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

  // 1. Add / Update in general mailing list with Daily Ecosystem Digest source
  const notesText = `Daily Ecosystem Digest | Topics: ${data.preferredTopics.join(", ")} | Freq: ${data.digestFrequency}${data.organization ? ` | Org: ${data.organization}` : ""}`;

  const subscriber = addSubscriberToMailingList(
    cleanEmail,
    cleanName,
    data.role || "Ecosystem Member",
    "Daily Ecosystem Digest",
    data.organization || "961AI Community",
    notesText,
    JSON.stringify({
      preferredTopics: data.preferredTopics,
      digestFrequency: data.digestFrequency,
      organization: data.organization
    })
  );

  subscriber.preferredTopics = data.preferredTopics;
  subscriber.digestFrequency = data.digestFrequency;

  // 2. Add / Update in dedicated Daily Digest registry
  const currentDigests = getDailyDigestSubscribers();
  const existingIdx = currentDigests.findIndex((d) => d.email.toLowerCase() === cleanEmail);
  const newDigest: DailyDigestSubscription = {
    id: existingIdx >= 0 ? currentDigests[existingIdx].id : `digest_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: cleanName,
    email: cleanEmail,
    role: data.role,
    organization: data.organization,
    preferredTopics: data.preferredTopics,
    digestFrequency: data.digestFrequency,
    subscribedAt: nowStr,
    timestamp: Date.now(),
    status: "Active",
    gdprConsent: true
  };

  if (existingIdx >= 0) {
    currentDigests[existingIdx] = newDigest;
  } else {
    currentDigests.unshift(newDigest);
  }
  localStorage.setItem(DAILY_DIGEST_STORAGE_KEY, JSON.stringify(currentDigests));

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("961ai_mailing_list_updated"));
    window.dispatchEvent(new Event("961ai_daily_digest_updated"));
  }

  return { subscriber, digest: newDigest };
}

export function removeDailyDigestSubscriber(id: string): void {
  const currentDigests = getDailyDigestSubscribers();
  const filtered = currentDigests.filter((d) => d.id !== id);
  localStorage.setItem(DAILY_DIGEST_STORAGE_KEY, JSON.stringify(filtered));

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("961ai_daily_digest_updated"));
  }
}

export function exportDailyDigestCsv(): string {
  const list = getDailyDigestSubscribers();
  const headers = ["ID", "Name", "Email", "Role", "Organization", "Topics", "Frequency", "Subscribed At", "Status", "GDPR Consent"];
  const rows = list.map((d) => [
    `"${d.id}"`,
    `"${(d.name || "").replace(/"/g, '""')}"`,
    `"${d.email}"`,
    `"${(d.role || "").replace(/"/g, '""')}"`,
    `"${(d.organization || "").replace(/"/g, '""')}"`,
    `"${d.preferredTopics.join("; ")}"`,
    `"${d.digestFrequency}"`,
    `"${d.subscribedAt}"`,
    `"${d.status}"`,
    `"${d.gdprConsent ? "Yes" : "No"}"`
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
