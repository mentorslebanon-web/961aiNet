import { MailingListSubscriber } from "../types";
import { triggerNotificationForSubscriberStatus } from "./notificationQueue";

export interface MailingListRegistration {
  id: string;
  email: string;
  name: string;
  role?: string;
  affiliation?: string;
  source: string;
  subscribedAt: string;
  status: "Active" | "Verified" | "Unsubscribed";
  gdprConsent: boolean;
  notes?: string;
}

export interface TrialUser {
  id: string;
  email: string;
  name: string;
  role: string;
  affiliation: string;
  whatsappPhone?: string;
  registeredAt: string;
  demoExpiresAt: number; // timestamp ms
  isTrialActive: boolean;
  credits: number;
  secondBrainId?: string;
  status: "Active Trial" | "Expired Demo" | "Converted to Paid";
  notes?: string;
}

export type SubscriptionPaymentStatus = "Pending Approval" | "Manual Payment Confirmed" | "Active";

export interface ConfirmedSubscriber {
  id: string;
  email: string;
  name: string;
  phone?: string;
  affiliation?: string;
  plan: string;
  amountPaid: string;
  paymentMethod: "OMT" | "WHISH" | "USDT (TRC20)";
  paymentRef: string;
  confirmedAt: string;
  expiresAt: string;
  paymentStatus: SubscriptionPaymentStatus;
  salesContactStatus: "Pending Contact" | "Contacted" | "Onboarded";
  salesNotes?: string;
}

const STORAGE_KEYS = {
  MAILING_LIST: "961ai_mailing_list",
  TRIAL_USERS: "961ai_trial_users",
  CONFIRMED_SUBSCRIBERS: "961ai_confirmed_subscribers",
  REGISTERED_ACCOUNTS: "961ai_registered_users",
  AUTH_USER: "961ai_auth_user"
};

// Seed Data for Mailing List
const SEED_MAILING_LIST: MailingListRegistration[] = [
  {
    id: "mail_1",
    email: "tariq.nader@polytechnique.fr",
    name: "Dr. Tariq Nader",
    role: "AI Guru / Researcher",
    affiliation: "École Polytechnique / PhoeniciaAI",
    source: "Hero Mailing List (Early Opt-In)",
    subscribedAt: "2026-08-20 10:14",
    status: "Verified",
    gdprConsent: true,
    notes: "Lead researcher on Arabic LLM quantization."
  },
  {
    id: "mail_2",
    email: "samir.matar@aub.edu.lb",
    name: "Prof. Samir Matar",
    role: "Stakeholder / Academic",
    affiliation: "AUB AI Research Lab",
    source: "Newsletter Footer (Lead Capture)",
    subscribedAt: "2026-08-28 11:20",
    status: "Active",
    gdprConsent: true,
    notes: "Subscribed to Lebanon AI & DeepTech Dispatch."
  },
  {
    id: "mail_3",
    email: "layla.kassir@beirut-ai.org",
    name: "Layla Kassir",
    role: "Community Lead",
    affiliation: "Beirut AI Collective",
    source: "Mailing List (Hero Bar)",
    subscribedAt: "2026-09-02 14:05",
    status: "Verified",
    gdprConsent: true,
    notes: "Requested monthly GPU and hackathon bulletins."
  },
  {
    id: "mail_4",
    email: "ziad.elkhoury@alumni.mit.edu",
    name: "Ziad El Khoury",
    role: "Diaspora Founder",
    affiliation: "Boston-Beirut AI Bridge",
    source: "Hero Lead Bar (Auto Opt-In)",
    subscribedAt: "2026-09-05 09:30",
    status: "Active",
    gdprConsent: true,
    notes: "Interested in sovereign LLM hosting & sandboxes."
  }
];

// Seed Data for Trial Users (Free 6-Hour Demo)
const SEED_TRIAL_USERS: TrialUser[] = [
  {
    id: "trial_1",
    email: "kareem.chahine@beirutangels.vc",
    name: "Kareem Chahine",
    role: "Investor",
    affiliation: "Beirut Diaspora Capital",
    whatsappPhone: "+961 70 882 119",
    registeredAt: "2026-09-12 16:20",
    demoExpiresAt: Date.now() + 3.5 * 3600 * 1000, // active trial
    isTrialActive: true,
    credits: 50,
    secondBrainId: "ws_kareem_angel",
    status: "Active Trial",
    notes: "Evaluating 5 Lebanon deeptech startups on platform."
  },
  {
    id: "trial_2",
    email: "maya.khoury@hellotree.dev",
    name: "Maya Khoury",
    role: "Agency Lead",
    affiliation: "Hellotree Digital Beirut",
    whatsappPhone: "+961 71 445 231",
    registeredAt: "2026-09-10 11:15",
    demoExpiresAt: Date.now() - 48 * 3600 * 1000, // expired trial
    isTrialActive: false,
    credits: 12,
    secondBrainId: "ws_hellotree_dev",
    status: "Expired Demo",
    notes: "Demo completed. Looking to upgrade via Whish Money."
  },
  {
    id: "trial_3",
    email: "rami.ghosn@cedarcloud.lb",
    name: "Rami Ghosn",
    role: "Founder",
    affiliation: "CedarCloud Serverless",
    whatsappPhone: "+961 03 992 410",
    registeredAt: "2026-09-14 08:45",
    demoExpiresAt: Date.now() + 5.2 * 3600 * 1000, // active trial
    isTrialActive: true,
    credits: 50,
    secondBrainId: "ws_rami_cloud",
    status: "Active Trial",
    notes: "Testing 0% Offshore S.A.L. calculator & directory."
  },
  {
    id: "trial_4",
    email: "jad.bouhabib@beirutlab.ai",
    name: "Jad Bou Habib",
    role: "AI Developer",
    affiliation: "Beirut Vision Labs",
    whatsappPhone: "+961 81 229 004",
    registeredAt: "2026-09-08 19:10",
    demoExpiresAt: Date.now() - 72 * 3600 * 1000, // expired trial
    isTrialActive: false,
    credits: 0,
    secondBrainId: "ws_jad_vision",
    status: "Expired Demo",
    notes: "Reached demo limit. Sent automated upgrade prompt."
  }
];

// Seed Data for Confirmed Subscribers (Paid $100/yr via OMT / Whish / USDT)
const SEED_CONFIRMED_SUBSCRIBERS: ConfirmedSubscriber[] = [
  {
    id: "sub_paid_1",
    email: "nour.haddad@cedarshealth.ai",
    name: "Nour Haddad",
    phone: "+961 81 041 334",
    affiliation: "CedarsHealth AI / Founder",
    plan: "Annual Pro ($100/yr)",
    amountPaid: "$100 USD",
    paymentMethod: "WHISH",
    paymentRef: "WHISH-961-88492-X",
    confirmedAt: "2026-09-11 14:30",
    expiresAt: "2027-09-11 14:30",
    paymentStatus: "Active",
    salesContactStatus: "Onboarded",
    salesNotes: "Full payment received via Whish Money. 2,500 credits loaded."
  },
  {
    id: "sub_paid_2",
    email: "anthony.salameh@levantventure.com",
    name: "Anthony Salameh",
    phone: "+961 70 119 550",
    affiliation: "Levant Venture Partners",
    plan: "Annual Pro ($100/yr)",
    amountPaid: "$100 USD",
    paymentMethod: "OMT",
    paymentRef: "OMT-BEY-440291-B",
    confirmedAt: "2026-09-13 10:15",
    expiresAt: "2027-09-13 10:15",
    paymentStatus: "Active",
    salesContactStatus: "Contacted",
    salesNotes: "OMT Cash transfer confirmed by finance desk. Sales team confirmed syndicate access."
  },
  {
    id: "sub_paid_3",
    email: "fadi.makdissi@phoeniciatech.sal",
    name: "Fadi Makdissi",
    phone: "+961 03 552 918",
    affiliation: "Phoenicia Tech S.A.L.",
    plan: "Annual Pro ($100/yr)",
    amountPaid: "$100 USD",
    paymentMethod: "WHISH",
    paymentRef: "WHISH-LB-771890",
    confirmedAt: "2026-09-14 18:00",
    expiresAt: "2027-09-14 18:00",
    paymentStatus: "Pending Approval",
    salesContactStatus: "Pending Contact",
    salesNotes: "User upgraded via Whish Money. Manual settlement receipt submitted; pending approval."
  },
  {
    id: "sub_paid_4",
    email: "elena.mansour@diasporacap.org",
    name: "Elena Mansour",
    phone: "+1 617 892 4410",
    affiliation: "Boston Diaspora Syndicate",
    plan: "Annual Pro ($100/yr)",
    amountPaid: "$100 USD",
    paymentMethod: "USDT (TRC20)",
    paymentRef: "TRC20-0x9a88fbc23190e7",
    confirmedAt: "2026-09-09 12:00",
    expiresAt: "2027-09-09 12:00",
    paymentStatus: "Manual Payment Confirmed",
    salesContactStatus: "Onboarded",
    salesNotes: "On-chain verification complete. Manual payment confirmed."
  }
];

// ================= MAILING LIST CRUD =================
export function getMailingListRegistrations(): MailingListRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MAILING_LIST);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MAILING_LIST, JSON.stringify(SEED_MAILING_LIST));
      return SEED_MAILING_LIST;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.MAILING_LIST, JSON.stringify(SEED_MAILING_LIST));
      return SEED_MAILING_LIST;
    }
    return parsed;
  } catch {
    return SEED_MAILING_LIST;
  }
}

export function addMailingListRegistration(
  email: string,
  name?: string,
  role?: string,
  affiliation?: string,
  source = "Hero Mailing List",
  notes?: string
): MailingListRegistration {
  const cleanEmail = (email || "").trim().toLowerCase();
  const list = getMailingListRegistrations();
  const existingIndex = list.findIndex((m) => m.email.toLowerCase() === cleanEmail);

  const nowStr = new Date().toISOString().replace("T", " ").substring(0, 16);

  if (existingIndex >= 0) {
    const updated = {
      ...list[existingIndex],
      name: name?.trim() || list[existingIndex].name,
      role: role || list[existingIndex].role,
      affiliation: affiliation || list[existingIndex].affiliation,
      notes: notes ? `${list[existingIndex].notes || ""} | ${notes}` : list[existingIndex].notes,
      status: "Active" as const
    };
    list[existingIndex] = updated;
    localStorage.setItem(STORAGE_KEYS.MAILING_LIST, JSON.stringify(list));
    return updated;
  }

  const newItem: MailingListRegistration = {
    id: `mail_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    email: cleanEmail,
    name: name?.trim() || cleanEmail.split("@")[0],
    role: role || "Ecosystem Subscriber",
    affiliation: affiliation || "961AI Network Member",
    source,
    subscribedAt: nowStr,
    status: "Active",
    gdprConsent: true,
    notes: notes || "Registered via 961AI mailing list opt-in."
  };

  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEYS.MAILING_LIST, JSON.stringify(list));
  return newItem;
}

export function deleteMailingListRegistration(id: string): void {
  const list = getMailingListRegistrations().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.MAILING_LIST, JSON.stringify(list));
}

export function toggleMailingListStatus(id: string): void {
  const list = getMailingListRegistrations();
  const idx = list.findIndex((m) => m.id === id);
  if (idx >= 0) {
    list[idx].status = list[idx].status === "Verified" ? "Active" : list[idx].status === "Active" ? "Unsubscribed" : "Verified";
    localStorage.setItem(STORAGE_KEYS.MAILING_LIST, JSON.stringify(list));
  }
}

// ================= TRIAL USERS CRUD =================
export function getTrialUsers(): TrialUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRIAL_USERS);
    let list: TrialUser[] = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(list) || list.length === 0) {
      list = SEED_TRIAL_USERS;
      localStorage.setItem(STORAGE_KEYS.TRIAL_USERS, JSON.stringify(list));
    }

    // Auto-sync with 961ai_registered_users
    try {
      const regRaw = localStorage.getItem(STORAGE_KEYS.REGISTERED_ACCOUNTS);
      if (regRaw) {
        const regAccounts = JSON.parse(regRaw);
        let updated = false;

        regAccounts.forEach((acc: any) => {
          const email = (acc.email || "").trim().toLowerCase();
          if (!email) return;

          // Check if this account is already in trial list
          const exists = list.find((t) => t.email.toLowerCase() === email);
          const isPremium = acc.session?.isPremium || false;

          if (!exists && !isPremium) {
            const demoExpires = acc.session?.demoExpiresAt || Date.now() + 6 * 3600 * 1000;
            const isTrialActive = demoExpires > Date.now();

            list.unshift({
              id: `trial_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              email,
              name: acc.name || acc.session?.name || email.split("@")[0],
              role: acc.role || acc.session?.role || "Founder",
              affiliation: acc.affiliation || acc.session?.affiliation || "Independent Tech Leader",
              whatsappPhone: acc.session?.whatsapp_phone || "",
              registeredAt: new Date(acc.session?.createdAt || Date.now()).toISOString().replace("T", " ").substring(0, 16),
              demoExpiresAt: demoExpires,
              isTrialActive,
              credits: acc.session?.credits ?? 50,
              secondBrainId: acc.session?.z961_second_brain_id || `ws_${email.split("@")[0]}`,
              status: isTrialActive ? "Active Trial" : "Expired Demo",
              notes: "Signed up via platform registration modal."
            });
            updated = true;
          }
        });

        if (updated) {
          localStorage.setItem(STORAGE_KEYS.TRIAL_USERS, JSON.stringify(list));
        }
      }
    } catch {
      // ignore
    }

    return list;
  } catch {
    return SEED_TRIAL_USERS;
  }
}

export function addTrialUser(user: Partial<TrialUser> & { email: string; name: string }): TrialUser {
  const list = getTrialUsers();
  const cleanEmail = user.email.trim().toLowerCase();
  const now = Date.now();
  const demoExpiresAt = user.demoExpiresAt || now + 6 * 3600 * 1000;

  const newTrial: TrialUser = {
    id: `trial_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    email: cleanEmail,
    name: user.name.trim(),
    role: user.role || "Founder",
    affiliation: user.affiliation || "Independent Tech Leader",
    whatsappPhone: user.whatsappPhone || "",
    registeredAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    demoExpiresAt,
    isTrialActive: demoExpiresAt > now,
    credits: user.credits ?? 50,
    secondBrainId: user.secondBrainId || `ws_${cleanEmail.split("@")[0]}`,
    status: demoExpiresAt > now ? "Active Trial" : "Expired Demo",
    notes: user.notes || "Free 6-hour demo session started."
  };

  const existingIndex = list.findIndex((t) => t.email.toLowerCase() === cleanEmail);
  if (existingIndex >= 0) {
    list[existingIndex] = newTrial;
  } else {
    list.unshift(newTrial);
  }

  localStorage.setItem(STORAGE_KEYS.TRIAL_USERS, JSON.stringify(list));
  return newTrial;
}

export function extendTrialTime(id: string, hoursToAdd = 24): void {
  const list = getTrialUsers();
  const idx = list.findIndex((t) => t.id === id);
  if (idx >= 0) {
    const currentExpiry = Math.max(list[idx].demoExpiresAt, Date.now());
    list[idx].demoExpiresAt = currentExpiry + hoursToAdd * 3600 * 1000;
    list[idx].isTrialActive = true;
    list[idx].status = "Active Trial";
    list[idx].credits = (list[idx].credits || 0) + 100;
    list[idx].notes = `${list[idx].notes || ""} | Trial extended +${hoursToAdd}h by Admin.`;
    localStorage.setItem(STORAGE_KEYS.TRIAL_USERS, JSON.stringify(list));
  }
}

export function deleteTrialUser(id: string): void {
  const list = getTrialUsers().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TRIAL_USERS, JSON.stringify(list));
}

// ================= CONFIRMED SUBSCRIBERS CRUD =================
export function getConfirmedSubscribers(): ConfirmedSubscriber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIRMED_SUBSCRIBERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONFIRMED_SUBSCRIBERS, JSON.stringify(SEED_CONFIRMED_SUBSCRIBERS));
      return SEED_CONFIRMED_SUBSCRIBERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.CONFIRMED_SUBSCRIBERS, JSON.stringify(SEED_CONFIRMED_SUBSCRIBERS));
      return SEED_CONFIRMED_SUBSCRIBERS;
    }
    return parsed;
  } catch {
    return SEED_CONFIRMED_SUBSCRIBERS;
  }
}

export function addConfirmedSubscriber(
  sub: {
    email: string;
    name?: string;
    phone?: string;
    affiliation?: string;
    paymentMethod: "OMT" | "WHISH" | "USDT (TRC20)";
    paymentRef?: string;
    amountPaid?: string;
    paymentStatus?: SubscriptionPaymentStatus;
  }
): ConfirmedSubscriber {
  const list = getConfirmedSubscribers();
  const cleanEmail = (sub.email || "").trim().toLowerCase();
  const now = new Date();
  const oneYearLater = new Date(now.getTime() + 365 * 24 * 3600 * 1000);

  const confirmedItem: ConfirmedSubscriber = {
    id: `sub_paid_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    email: cleanEmail,
    name: sub.name?.trim() || cleanEmail.split("@")[0],
    phone: sub.phone || "+961 81 041 334",
    affiliation: sub.affiliation || "961AI Network Member",
    plan: "Annual Pro ($100/yr)",
    amountPaid: sub.amountPaid || "$100 USD",
    paymentMethod: sub.paymentMethod,
    paymentRef: sub.paymentRef?.trim() || `${sub.paymentMethod}-${Date.now().toString().slice(-6)}`,
    confirmedAt: now.toISOString().replace("T", " ").substring(0, 16),
    expiresAt: oneYearLater.toISOString().replace("T", " ").substring(0, 16),
    paymentStatus: sub.paymentStatus || (sub.paymentMethod === "USDT (TRC20)" ? "Manual Payment Confirmed" : "Pending Approval"),
    salesContactStatus: "Pending Contact",
    salesNotes: `Subscribed via ${sub.paymentMethod}. Sales team notification generated.`
  };

  const existingIdx = list.findIndex((s) => s.email.toLowerCase() === cleanEmail);
  if (existingIdx >= 0) {
    list[existingIdx] = confirmedItem;
  } else {
    list.unshift(confirmedItem);
  }

  localStorage.setItem(STORAGE_KEYS.CONFIRMED_SUBSCRIBERS, JSON.stringify(list));

  // If user is also in trial list, mark as Converted to Paid
  try {
    const trials = getTrialUsers();
    const trialIdx = trials.findIndex((t) => t.email.toLowerCase() === cleanEmail);
    if (trialIdx >= 0) {
      trials[trialIdx].status = "Converted to Paid";
      trials[trialIdx].notes = `Upgraded to Annual Pro via ${sub.paymentMethod}.`;
      localStorage.setItem(STORAGE_KEYS.TRIAL_USERS, JSON.stringify(trials));
    }
  } catch {
    // ignore
  }

  return confirmedItem;
}

export function updateSubscriptionPaymentStatus(
  id: string,
  newStatus: SubscriptionPaymentStatus,
  options: { triggerNotification?: boolean; autoSendNotification?: boolean } = { triggerNotification: true }
): ConfirmedSubscriber | null {
  const list = getConfirmedSubscribers();
  const idx = list.findIndex((s) => s.id === id);
  if (idx >= 0) {
    const prevStatus = list[idx].paymentStatus;
    list[idx].paymentStatus = newStatus;
    list[idx].salesNotes = `${list[idx].salesNotes || ""} | Payment status shifted to ${newStatus} on ${new Date().toISOString().substring(0, 10)}.`;
    localStorage.setItem(STORAGE_KEYS.CONFIRMED_SUBSCRIBERS, JSON.stringify(list));

    // Auto trigger notification into queue if status changed and option enabled
    if (options.triggerNotification !== false && prevStatus !== newStatus) {
      try {
        triggerNotificationForSubscriberStatus({
          userId: list[idx].id,
          userName: list[idx].name,
          userEmail: list[idx].email,
          userPhone: list[idx].phone,
          userPlan: list[idx].plan,
          paymentMethod: list[idx].paymentMethod,
          paymentRef: list[idx].paymentRef,
          amount: list[idx].amountPaid,
          newStatus,
          channel: "email",
          autoSend: options.autoSendNotification ?? false
        });
      } catch (err) {
        console.error("Failed to enqueue notification:", err);
      }
    }

    return list[idx];
  }
  return null;
}

export function updateSalesContactStatus(
  id: string,
  newStatus: ConfirmedSubscriber["salesContactStatus"]
): void {
  const list = getConfirmedSubscribers();
  const idx = list.findIndex((s) => s.id === id);
  if (idx >= 0) {
    list[idx].salesContactStatus = newStatus;
    list[idx].salesNotes = `${list[idx].salesNotes || ""} | Status changed to ${newStatus} on ${new Date().toISOString().substring(0, 10)}.`;
    localStorage.setItem(STORAGE_KEYS.CONFIRMED_SUBSCRIBERS, JSON.stringify(list));
  }
}

export function deleteConfirmedSubscriber(id: string): void {
  const list = getConfirmedSubscribers().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.CONFIRMED_SUBSCRIBERS, JSON.stringify(list));
}

// Global combined export
export function exportAllRegisteredUsersCsv(): string {
  const mailing = getMailingListRegistrations();
  const trials = getTrialUsers();
  const confirmed = getConfirmedSubscribers();

  const lines: string[] = [
    "--- CATEGORY 1: REGISTERED ON MAILING LIST ---",
    "ID,Name,Email,Role,Affiliation,Source,SubscribedAt,Status,GDPR",
    ...mailing.map((m) => `"${m.id}","${m.name}","${m.email}","${m.role || ''}","${m.affiliation || ''}","${m.source}","${m.subscribedAt}","${m.status}","${m.gdprConsent ? 'Yes' : 'No'}"`),
    "",
    "--- CATEGORY 2: USERS ON FREE TRIAL ---",
    "ID,Name,Email,Role,Affiliation,WhatsApp,RegisteredAt,Status,Credits",
    ...trials.map((t) => `"${t.id}","${t.name}","${t.email}","${t.role}","${t.affiliation}","${t.whatsappPhone || ''}","${t.registeredAt}","${t.status}","${t.credits}"`),
    "",
    "--- CATEGORY 3: CONFIRMED PAID SUBSCRIBERS ---",
    "ID,Name,Email,Phone,Affiliation,Plan,Amount,PaymentMethod,PaymentRef,ConfirmedAt,PaymentStatus,SalesStatus",
    ...confirmed.map((c) => `"${c.id}","${c.name}","${c.email}","${c.phone || ''}","${c.affiliation || ''}","${c.plan}","${c.amountPaid}","${c.paymentMethod}","${c.paymentRef}","${c.confirmedAt}","${c.paymentStatus}","${c.salesContactStatus}"`)
  ];

  return lines.join("\n");
}
