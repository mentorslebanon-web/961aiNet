import React, { useState, useMemo } from "react";
import { StartupNewsArticle, KnowledgeResource, GraphNode } from "../../types";
import { EcosystemTalentAndGrantsTab } from "./EcosystemTalentAndGrantsTab";
import { EcosystemSentimentFeed } from "./EcosystemSentimentFeed";
import { 
  Newspaper, 
  TrendingUp, 
  Tag, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Rocket, 
  FlaskConical, 
  Building2, 
  Globe, 
  PlusCircle, 
  Send,
  X,
  History,
  ChevronRight,
  Layers,
  Flame,
  BarChart3,
  CalendarRange,
  BookOpen,
  Printer,
  Download,
  FileText,
  MessageCircle,
  Copy,
  Check,
  Scale,
  Shield,
  FileCode,
  ArrowUpRight,
  Eye,
  Info,
  CheckSquare,
  Briefcase,
  Award,
  Languages
} from "lucide-react";

interface Module961AiNewsProps {
  news: StartupNewsArticle[];
  resources?: KnowledgeResource[];
  nodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
  onNavigateToQuestionnaire?: () => void;
  onAddResource?: (resource: KnowledgeResource) => void;
}

export const Module961AiNews: React.FC<Module961AiNewsProps> = ({
  news,
  resources = [],
  nodes,
  onSelectNode,
  onNavigateToQuestionnaire,
  onAddResource
}) => {
  // Navigation / View state
  const [activeTab, setActiveTab] = useState<"feed" | "sentiment" | "knowledge" | "talent_grants" | "briefings" | "archive">("feed");
  const [languageMode, setLanguageMode] = useState<"EN" | "AR">("EN");

  // News Filtering states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Knowledge Resources Filtering states
  const [resourceCategory, setResourceCategory] = useState<string>("all");
  const [resourceFormat, setResourceFormat] = useState<string>("all");
  const [resourceSearch, setResourceSearch] = useState<string>("");

  // Archive Filtering states
  const [selectedArchiveMonth, setSelectedArchiveMonth] = useState<string>("all");
  const [selectedArchiveYear, setSelectedArchiveYear] = useState<string>("all");

  // Interaction states
  const [activeArticle, setActiveArticle] = useState<StartupNewsArticle | null>(null);
  const [activeResource, setActiveResource] = useState<KnowledgeResource | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showResourceModal, setShowResourceModal] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New submission form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<StartupNewsArticle["category"]>("Funding");
  const [newRegion, setNewRegion] = useState<StartupNewsArticle["region"]>("Lebanon");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newSourceName, setNewSourceName] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = [
    { id: "all", label: "All Dispatches", icon: Newspaper, count: news.length },
    { id: "Funding", label: "Funding & Rounds", icon: DollarSign, count: news.filter(n => n.category === "Funding").length },
    { id: "Product Launch", label: "Product Launches", icon: Rocket, count: news.filter(n => n.category === "Product Launch").length },
    { id: "Research & Lab", label: "Research & Labs", icon: FlaskConical, count: news.filter(n => n.category === "Research & Lab").length },
    { id: "Ecosystem & Grants", label: "Ecosystem & Grants", icon: Building2, count: news.filter(n => n.category === "Ecosystem & Grants").length },
    { id: "Diaspora Bridge", label: "Diaspora Bridge", icon: Globe, count: news.filter(n => n.category === "Diaspora Bridge").length }
  ];

  const regions = [
    { id: "all", label: "All Regions", flag: "🌍" },
    { id: "Lebanon", label: "Lebanon Onshore", flag: "🇱🇧" },
    { id: "UAE", label: "UAE & Dubai", flag: "🇦🇪" },
    { id: "Saudi Arabia", label: "Saudi Arabia & Riyadh", flag: "🇸🇦" },
    { id: "Egypt", label: "Egypt & Cairo", flag: "🇪🇬" },
    { id: "MENA", label: "Regional MENA", flag: "🌐" },
    { id: "Diaspora", label: "Global Diaspora", flag: "✈️" }
  ];

  const resourceCategories = [
    { id: "all", label: "All Knowledge Assets", count: resources.length },
    { id: "Regulatory & Legal", label: "Regulatory & Legal Codex", count: resources.filter(r => r.category === "Regulatory & Legal").length },
    { id: "MENA AI Map", label: "MENA AI Market Maps", count: resources.filter(r => r.category === "MENA AI Map").length },
    { id: "Toolkit & Templates", label: "Founder SAFE & Toolkits", count: resources.filter(r => r.category === "Toolkit & Templates").length },
    { id: "Research & Whitepaper", label: "Research Papers & arXiv", count: resources.filter(r => r.category === "Research & Whitepaper").length },
    { id: "Market Intelligence", label: "Salary & Talent Benchmarks", count: resources.filter(r => r.category === "Market Intelligence").length },
    { id: "Playbook & Guide", label: "Infrastructure & Playbooks", count: resources.filter(r => r.category === "Playbook & Guide").length }
  ];

  // Unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    news.forEach(item => item.tags?.forEach(t => set.add(t)));
    return Array.from(set).slice(0, 18);
  }, [news]);

  // Extract all available years and months from news items
  const archiveTimeBreakdown = useMemo(() => {
    const monthMap: Record<string, { year: string; month: string; monthLabel: string; count: number }> = {};
    const yearsSet = new Set<string>();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    news.forEach(item => {
      const datePart = item.publishedAt.split(" ")[0] || item.publishedAt;
      const parts = datePart.split("-");
      if (parts.length >= 2) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const monthKey = `${year}-${parts[1]}`;
        const monthName = monthNames[monthNum - 1] || parts[1];
        yearsSet.add(year);

        if (!monthMap[monthKey]) {
          monthMap[monthKey] = {
            year,
            month: parts[1],
            monthLabel: `${monthName} ${year}`,
            count: 0
          };
        }
        monthMap[monthKey].count += 1;
      }
    });

    const sortedMonths = Object.keys(monthMap)
      .sort((a, b) => b.localeCompare(a))
      .map(k => ({ key: k, ...monthMap[k] }));

    const sortedYears = Array.from(yearsSet).sort((a, b) => b.localeCompare(a));

    return {
      months: sortedMonths,
      years: sortedYears
    };
  }, [news]);

  // Filtered news for feed view
  const filteredFeedNews = useMemo(() => {
    return news.filter(item => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchRegion = selectedRegion === "all" || item.region === selectedRegion || (selectedRegion === "MENA" && ["UAE", "Saudi Arabia", "Egypt", "MENA"].includes(item.region || ""));
      const matchTag = !selectedTag || item.tags?.includes(selectedTag);
      const matchSearch = !searchQuery.trim() || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.sourceName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchRegion && matchTag && matchSearch;
    });
  }, [news, selectedCategory, selectedRegion, selectedTag, searchQuery]);

  // Filtered Knowledge Resources
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchCat = resourceCategory === "all" || res.category === resourceCategory;
      const matchFmt = resourceFormat === "all" || res.format === resourceFormat;
      const matchSearch = !resourceSearch.trim() ||
        res.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        res.summary.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        res.tags.some(t => t.toLowerCase().includes(resourceSearch.toLowerCase())) ||
        res.authorOrOrg.toLowerCase().includes(resourceSearch.toLowerCase());
      return matchCat && matchFmt && matchSearch;
    });
  }, [resources, resourceCategory, resourceFormat, resourceSearch]);

  // Filtered news for chronological archive view
  const filteredArchiveNews = useMemo(() => {
    return news.filter(item => {
      const datePart = item.publishedAt.split(" ")[0] || item.publishedAt;
      const parts = datePart.split("-");
      const itemYear = parts[0] || "";
      const itemMonthKey = parts.length >= 2 ? `${parts[0]}-${parts[1]}` : "";

      const matchYear = selectedArchiveYear === "all" || itemYear === selectedArchiveYear;
      const matchMonth = selectedArchiveMonth === "all" || itemMonthKey === selectedArchiveMonth;
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchTag = !selectedTag || item.tags?.includes(selectedTag);
      const matchSearch = !searchQuery.trim() || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchYear && matchMonth && matchCategory && matchTag && matchSearch;
    }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [news, selectedArchiveYear, selectedArchiveMonth, selectedCategory, selectedTag, searchQuery]);

  const featuredArticle = useMemo(() => {
    return news.find(n => n.featured) || news[0];
  }, [news]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    showToast(bookmarkedIds.includes(id) ? "Removed from bookmarks" : "Bookmarked article");
  };

  const handleShareWhatsApp = (title: string, summary: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = encodeURIComponent(`*961AI Ecosystem Dispatch*\n\n📰 *${title}*\n\n${summary}\n\nRead more on 961AINetwork: https://961ai.network`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handlePrint = (title: string, content: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.print();
  };

  const handleCopyLink = (itemSlugOrId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#item-${itemSlugOrId}`);
      showToast("Link copied to clipboard!");
    }
  };

  const handleEntityClick = (slug: string) => {
    const matchedNode = nodes.find(n => 
      n.wikiSlug === slug || 
      n.label.toLowerCase().includes(slug.replace(/-/g, " ").toLowerCase())
    );
    if (matchedNode) {
      onSelectNode(matchedNode);
    }
  };

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;
    setSubmittedMessage("Press release submitted for Karpathy editorial verification! It will appear upon graph verification.");
    setShowSubmitModal(false);
    setNewTitle("");
    setNewSummary("");
    setNewContent("");
    setNewSourceName("");
    setTimeout(() => setSubmittedMessage(null), 5000);
  };

  const getRegionFlag = (region?: string) => {
    switch (region) {
      case "Lebanon": return "🇱🇧 Beirut";
      case "UAE": return "🇦🇪 Dubai";
      case "Saudi Arabia": return "🇸🇦 Riyadh";
      case "Egypt": return "🇪🇬 Cairo";
      case "MENA": return "🌐 MENA";
      case "Diaspora": return "✈️ Diaspora";
      default: return "🇱🇧 Lebanon";
    }
  };

  const categoryColorMap: Record<string, { bg: string; text: string; border: string }> = {
    "Funding": { bg: "bg-[#EBF3EA]", text: "text-[#2E5A2C]", border: "border-[#B0CFAD]" },
    "Product Launch": { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200" },
    "Research & Lab": { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
    "Ecosystem & Grants": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
    "Diaspora Bridge": { bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200" }
  };

  return (
    <div id="961ai-news-hub" className="space-y-6 font-mono text-[#000000]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header Banner - Redesigned */}
      <div className="rounded-2xl bg-white border-2 border-[#B0CFAD] p-6 md:p-8 shadow-xs space-y-6">
        {/* Top Wire & Live Sync Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#EBF3EA] text-[#2E5A2C] border-2 border-[#75AC73] flex items-center gap-2 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4D7D4B] animate-pulse"></span>
              <Newspaper className="w-3.5 h-3.5 text-[#2E5A2C]" />
              <span>961AINews & Knowledge Repository</span>
            </span>

            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#F6FAF5] text-[#000000] border border-[#D7E7D6] flex items-center gap-1.5">
              <span>🇱🇧</span>
              <span>Lebanon & MENA DeepTech Wire • PDF Whitepapers • VC Standard SAFE</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#2E5A2C] bg-[#EBF3EA] px-3 py-1 rounded-full border border-[#B0CFAD] self-start lg:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#4D7D4B]"></span>
            <span>LIVE WIRE • 2026 INDEX ACTIVE</span>
          </div>
        </div>

        {/* Title & Description Row */}
        <div className="border-b border-[#EBF3EA] pb-5 space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#000000] tracking-tight leading-tight">
            Ecosystem Newsroom & Knowledge Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#000000] font-medium leading-relaxed max-w-4xl">
            Curated daily dispatches, venture rounds, Arabic foundation model drops, 0% offshore tax codices, and open-source investor templates for Lebanon and the MENA region.
          </p>
        </div>

        {/* Quick Intelligence Metric Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl p-3 text-xs">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF3EA] border border-[#B0CFAD] text-[#2E5A2C] flex items-center justify-center font-bold">
              📰
            </div>
            <div>
              <div className="font-black text-[#000000]">{news.length} Dispatches</div>
              <div className="text-[10px] text-slate-600 font-medium">Verified Lebanese & MENA Wire</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2 border-l border-[#D7E7D6]">
            <div className="w-7 h-7 rounded-lg bg-[#EBF3EA] border border-[#B0CFAD] text-[#2E5A2C] flex items-center justify-center font-bold">
              📚
            </div>
            <div>
              <div className="font-black text-[#000000]">{resources.length} Knowledge Toolkits</div>
              <div className="text-[10px] text-slate-600 font-medium">Legal Codex & Open SAFEs</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2 border-l border-[#D7E7D6]">
            <div className="w-7 h-7 rounded-lg bg-[#EBF3EA] border border-[#B0CFAD] text-[#2E5A2C] flex items-center justify-center font-bold">
              💰
            </div>
            <div>
              <div className="font-black text-[#000000]">$42.8M+ Deals</div>
              <div className="text-[10px] text-slate-600 font-medium">Beirut, Dubai & Riyadh</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2 border-l border-[#D7E7D6]">
            <div className="w-7 h-7 rounded-lg bg-[#EBF3EA] border border-[#B0CFAD] text-[#2E5A2C] flex items-center justify-center font-bold">
              ⚖️
            </div>
            <div>
              <div className="font-black text-[#000000]">0% Offshore Tax</div>
              <div className="text-[10px] text-slate-600 font-medium">Lebanon S.A.L. & Circular 165</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-b border-[#EBF3EA] pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("feed")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "feed"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Lebanon & MENA Newsfeed ({news.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sentiment")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "sentiment"
                  ? "bg-[#2E5A2C] text-white shadow-xs"
                  : "bg-[#EBF3EA] hover:bg-[#D7E7D6] text-[#2E5A2C] border border-[#75AC73]"
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Gemini Ecosystem Mood & Sentiment</span>
              <span className="px-1.5 py-0.2 bg-emerald-200 text-emerald-900 font-black text-[9px] rounded-full">
                AI Feed
              </span>
            </button>

            <button
              onClick={() => setActiveTab("knowledge")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "knowledge"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Knowledge Resources & Toolkits ({resources.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("talent_grants")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "talent_grants"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#2E5A2C]" />
              <span>AI Talent & Grants Board</span>
              <span className="px-1.5 py-0.2 bg-emerald-100 text-[#2E5A2C] font-bold text-[9px] rounded-full border border-emerald-300">
                New
              </span>
            </button>

            <button
              onClick={() => setActiveTab("briefings")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "briefings"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Executive Briefings</span>
            </button>

            <button
              onClick={() => setActiveTab("archive")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "archive"
                  ? "bg-[#4D7D4B] text-white shadow-xs"
                  : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
              }`}
            >
              <History className="w-4 h-4" />
              <span>Chronological Archive</span>
            </button>
          </div>

          <div className="text-xs text-[#2E5A2C] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#75AC73] animate-pulse"></span>
            <span>Real-time Live Sync</span>
          </div>
        </div>

        {/* Action CTAs at Bottom of Section: WhatsApp Daily Brief, Print/PDF Digest, Submit News/Asset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E5A2C]"></span>
            <span>Official Newsroom Intelligence & Dispatches Desk</span>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            {/* WhatsApp Daily Brief */}
            <a
              href="https://whatsapp.com/channel/0029Va961AiNetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs shadow-xs hover:shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 group"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366] group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <div className="leading-tight">WhatsApp Daily Brief</div>
                <div className="text-[10px] text-emerald-100 font-medium">Join Free Channel</div>
              </div>
            </a>

            {/* Print / PDF Digest */}
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#EBF3EA] text-[#000000] border-2 border-[#D7E7D6] hover:border-[#75AC73] font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-[#4D7D4B]" />
              <div className="text-left">
                <div className="leading-tight">Print / PDF Digest</div>
                <div className="text-[10px] text-slate-500 font-medium">Offline Briefing</div>
              </div>
            </button>

            {/* Submit News / Asset */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-black text-xs shadow-xs hover:shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <div className="text-left">
                <div className="leading-tight">Submit News / Asset</div>
                <div className="text-[10px] text-emerald-100 font-medium">Press Release / PDF</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {submittedMessage && (
        <div className="p-4 bg-[#EBF3EA] border border-[#75AC73] rounded-xl flex items-center gap-3 text-xs font-bold text-[#2E5A2C]">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{submittedMessage}</span>
        </div>
      )}

      {/* TAB: GEMINI ECOSYSTEM SENTIMENT FEED */}
      {activeTab === "sentiment" && (
        <div className="space-y-6">
          <EcosystemSentimentFeed
            news={news}
            onSelectArticle={(art) => setActiveArticle(art)}
          />
        </div>
      )}

      {/* TAB 1: CURATED LEBANON & MENA NEWSFEED */}
      {activeTab === "feed" && (
        <div className="space-y-6">
          {/* Top Live Sentiment Summary Widget */}
          <EcosystemSentimentFeed
            news={news}
            onSelectArticle={(art) => setActiveArticle(art)}
          />

          {/* Region & Category Fast Filter Row */}
          <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#EBF3EA] pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#000000] mr-1">Region:</span>
                {regions.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegion(r.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedRegion === r.id
                        ? "bg-[#2E5A2C] text-white shadow-2xs"
                        : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
                    }`}
                  >
                    <span>{r.flag}</span>
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="w-full sm:w-72 flex items-center gap-2 bg-[#F6FAF5] border border-[#D7E7D6] rounded-lg px-2.5 py-1.5">
                <Search className="w-3.5 h-3.5 text-[#2E5A2C] shrink-0" />
                <input
                  type="text"
                  placeholder="Search articles, tags, founders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#000000] focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-[10px] text-slate-500 font-bold">Clear</button>
                )}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-[#000000] mr-1">Topic:</span>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedCategory === c.id
                      ? "bg-[#4D7D4B] text-white shadow-2xs"
                      : "bg-white hover:bg-[#F6FAF5] text-[#000000] border border-[#D7E7D6]"
                  }`}
                >
                  <c.icon className="w-3 h-3" />
                  <span>{c.label}</span>
                  <span className="text-[10px] opacity-75 font-mono">({c.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article Banner */}
          {featuredArticle && selectedCategory === "all" && selectedRegion === "all" && !searchQuery && (
            <div 
              onClick={() => setActiveArticle(featuredArticle)}
              className="group cursor-pointer rounded-2xl bg-white border-2 border-[#B0CFAD] hover:border-[#75AC73] p-6 md:p-8 shadow-xs transition-all flex flex-col lg:flex-row items-start justify-between gap-6"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-rose-600" />
                    <span>FEATURED HEADLINE</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                    {getRegionFlag(featuredArticle.region)}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded font-bold border ${categoryColorMap[featuredArticle.category]?.bg || "bg-slate-100"} ${categoryColorMap[featuredArticle.category]?.text || "text-slate-900"} ${categoryColorMap[featuredArticle.category]?.border || "border-slate-300"}`}>
                    {featuredArticle.category}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{featuredArticle.readTimeMin} min read • {featuredArticle.publishedAt}</span>
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-[#000000] group-hover:text-[#2E5A2C] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs md:text-sm text-[#000000] font-medium leading-relaxed">
                  {featuredArticle.summary}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {featuredArticle.tags?.map(t => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-[#F6FAF5] border border-[#D7E7D6] text-slate-800 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-2 self-stretch lg:self-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#EBF3EA]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveArticle(featuredArticle);
                  }}
                  className="px-4 py-2.5 bg-[#4D7D4B] hover:bg-[#3D633C] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleShareWhatsApp(featuredArticle.title, featuredArticle.summary, e)}
                    className="flex-1 px-3 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-2xs"
                    title="Share via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={(e) => handlePrint(featuredArticle.title, featuredArticle.content, e)}
                    className="p-2 bg-white hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6] rounded-xl font-bold text-xs"
                    title="Print / Save PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#4D7D4B]" />
                  </button>

                  <button
                    onClick={(e) => handleCopyLink(featuredArticle.slug, e)}
                    className="p-2 bg-white hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6] rounded-xl font-bold text-xs"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* News Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFeedNews.map(article => {
              const colorInfo = categoryColorMap[article.category] || { bg: "bg-slate-100", text: "text-slate-900", border: "border-slate-300" };

              return (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="group cursor-pointer rounded-2xl bg-white border-2 border-[#D7E7D6] hover:border-[#75AC73] p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xs space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded font-bold border ${colorInfo.bg} ${colorInfo.text} ${colorInfo.border}`}>
                          {article.category}
                        </span>
                        <span className="px-1.5 py-0.5 rounded font-bold bg-[#F6FAF5] border border-[#D7E7D6] text-[10px]">
                          {getRegionFlag(article.region)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{article.readTimeMin}m</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-[#000000] group-hover:text-[#2E5A2C] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#000000] font-medium line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>

                    {article.tags && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {article.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] font-bold px-1.5 py-0.5 bg-[#F6FAF5] border border-[#EBF3EA] text-slate-700 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#D7E7D6] flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-600 truncate max-w-[120px]">
                      {article.sourceName}
                    </span>

                    {/* Card Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleShareWhatsApp(article.title, article.summary, e)}
                        className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-700 border border-transparent hover:border-emerald-200 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handlePrint(article.title, article.content, e)}
                        className="p-1.5 rounded-lg hover:bg-[#EBF3EA] text-[#2E5A2C] border border-transparent hover:border-[#B0CFAD] transition-colors"
                        title="Print / Save PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleCopyLink(article.slug, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-300 transition-colors"
                        title="Copy Link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-xs font-bold text-[#2E5A2C] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 ml-1">
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFeedNews.length === 0 && (
            <div className="p-12 text-center bg-white border-2 border-dashed border-[#D7E7D6] rounded-2xl space-y-3">
              <Newspaper className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-[#000000]">No news found matching filters</h3>
              <p className="text-xs text-slate-500">Try broadening your search query or switching region/topic filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedRegion("all");
                  setSearchQuery("");
                }}
                className="px-3 py-1.5 rounded-lg bg-[#4D7D4B] text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: KNOWLEDGE RESOURCES & TOOLKITS */}
      {activeTab === "knowledge" && (
        <div className="space-y-6">
          {/* Knowledge Header & Search */}
          <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#EBF3EA] pb-3">
              <div>
                <h2 className="text-sm font-black text-[#000000] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4D7D4B]" />
                  <span>Ecosystem Knowledge Repository & Open Toolkits</span>
                </h2>
                <p className="text-xs text-[#000000] font-medium">
                  Authoritative legal guides, standard SAFE templates, MENA market maps, salary indexes, and compute blueprints.
                </p>
              </div>

              <div className="w-full sm:w-72 flex items-center gap-2 bg-[#F6FAF5] border border-[#D7E7D6] rounded-lg px-2.5 py-1.5">
                <Search className="w-3.5 h-3.5 text-[#2E5A2C] shrink-0" />
                <input
                  type="text"
                  placeholder="Search resources, playbooks..."
                  value={resourceSearch}
                  onChange={(e) => setResourceSearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#000000] focus:outline-none"
                />
                {resourceSearch && (
                  <button onClick={() => setResourceSearch("")} className="text-[10px] text-slate-500 font-bold">Clear</button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-[#000000] mr-1">Category:</span>
              {resourceCategories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setResourceCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    resourceCategory === c.id
                      ? "bg-[#4D7D4B] text-white shadow-2xs"
                      : "bg-[#F6FAF5] hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6]"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="text-[10px] opacity-75 font-mono">({c.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map(res => {
              const formatBadges: Record<string, { bg: string; text: string; border: string }> = {
                "PDF": { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200" },
                "Interactive": { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
                "Doc": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
                "CheatSheet": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
                "Dataset": { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" }
              };
              const fmtInfo = formatBadges[res.format] || { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-300" };

              return (
                <div
                  key={res.id}
                  onClick={() => setActiveResource(res)}
                  className="group cursor-pointer rounded-2xl bg-white border-2 border-[#D7E7D6] hover:border-[#75AC73] p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xs space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <span className="px-2 py-0.5 rounded font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                        {res.category}
                      </span>

                      <span className={`px-2 py-0.5 rounded font-bold border ${fmtInfo.bg} ${fmtInfo.text} ${fmtInfo.border}`}>
                        {res.format}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#000000] group-hover:text-[#2E5A2C] transition-colors leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs text-[#000000] font-medium line-clamp-3 leading-relaxed">
                      {res.summary}
                    </p>

                    <div className="p-2.5 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl space-y-1 text-[11px] text-[#000000]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Format & Scope:</span>
                        <span className="font-bold font-mono text-[#2E5A2C]">{res.readTimeOrPages}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 text-[10px]">
                        <span>Author / Taskforce:</span>
                        <span className="font-semibold truncate max-w-[130px]">{res.authorOrOrg}</span>
                      </div>
                    </div>

                    {res.tags && (
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        {res.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] font-bold px-1.5 py-0.5 bg-white border border-[#D7E7D6] text-slate-700 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#D7E7D6] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* WhatsApp Share */}
                      <button
                        onClick={(e) => handleShareWhatsApp(res.title, res.summary, e)}
                        className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-700 border border-transparent hover:border-emerald-200 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      {/* Print / Save PDF */}
                      <button
                        onClick={(e) => handlePrint(res.title, res.contentMarkdown || res.description, e)}
                        className="p-1.5 rounded-lg hover:bg-[#EBF3EA] text-[#2E5A2C] border border-transparent hover:border-[#B0CFAD] transition-colors"
                        title="Print / Save PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy Link */}
                      <button
                        onClick={(e) => handleCopyLink(res.id, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-300 transition-colors"
                        title="Copy Link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveResource(res);
                      }}
                      className="px-3 py-1.5 bg-[#4D7D4B] hover:bg-[#3D633C] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs transition-all"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Resource</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: AI TALENT & GRANTS BOARD */}
      {activeTab === "talent_grants" && (
        <EcosystemTalentAndGrantsTab />
      )}

      {/* TAB 3: EXECUTIVE BRIEFINGS */}
      {activeTab === "briefings" && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D7E7D6] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3EA] text-[#2E5A2C] border border-[#75AC73]">
                  Weekly Executive Intelligence Dossier
                </span>
                <h2 className="text-xl font-black text-[#000000] mt-1">
                  Week of August 24–30, 2026: Lebanese DeepTech & MENA Cross-Border Deals
                </h2>
                <p className="text-xs text-[#000000] font-medium">
                  Key market developments compiled by Karpathy AI Ingestion Engine and 961AINetwork Editorial Desk.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white hover:bg-[#EBF3EA] text-[#000000] border border-[#D7E7D6] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#4D7D4B]" />
                  <span>Print Dossier</span>
                </button>
                <button
                  onClick={() => handleShareWhatsApp("961AI Weekly Executive Intelligence Dossier", "Summary of all Lebanese & MENA AI funding rounds, models, and regulatory updates for late August 2026.")}
                  className="px-3 py-1.5 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Share</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl space-y-2">
                <div className="text-xs font-bold text-[#2E5A2C] flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#4D7D4B]" />
                  <span>Venture Capital & Rounds</span>
                </div>
                <ul className="text-xs text-[#000000] space-y-2 font-medium">
                  <li>• <strong>CedarsLLM ($1.2M Seed)</strong>: Sovereign Arabic foundation models deployed at BDD.</li>
                  <li>• <strong>Saudi SCAI & Humain ($15M Allocation)</strong>: Cross-border expansion bridge into Riyadh.</li>
                  <li>• <strong>MEVP & Berytech ($10M FastTrack)</strong>: Seed checks for university lab spinouts.</li>
                </ul>
              </div>

              <div className="p-4 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl space-y-2">
                <div className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                  <Rocket className="w-4 h-4 text-indigo-600" />
                  <span>Model Drops & Releases</span>
                </div>
                <ul className="text-xs text-[#000000] space-y-2 font-medium">
                  <li>• <strong>Falcon-3 Levantine Adapter</strong>: TII & Beirut engineers open-source dialect LoRA weights.</li>
                  <li>• <strong>ArzVoice Sub-Second ASR</strong>: 94.8% accuracy on code-switched Arabic-French-English.</li>
                  <li>• <strong>Synapse Analytics</strong>: Live enterprise scoring in 14 GCC commercial banks.</li>
                </ul>
              </div>

              <div className="p-4 bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl space-y-2">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <span>Regulatory & Infrastructure</span>
                </div>
                <ul className="text-xs text-[#000000] space-y-2 font-medium">
                  <li>• <strong>Offshore S.A.L. (0% Tax)</strong>: BDL Circular 165 guarantees fresh USD wires for tech exports.</li>
                  <li>• <strong>BDD Solar Microgrid (2.4MW)</strong>: Continuous 100% clean power for AI training runs.</li>
                  <li>• <strong>Law 81/2018 Codex</strong>: Official digital e-signature compliance guidelines updated.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHRONOLOGICAL ARCHIVE */}
      {activeTab === "archive" && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#D7E7D6] rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#EBF3EA] pb-3">
              <div>
                <h2 className="text-sm font-black text-[#000000] flex items-center gap-2">
                  <History className="w-4 h-4 text-[#4D7D4B]" />
                  <span>Chronological Historical Archive</span>
                </h2>
                <p className="text-xs text-[#000000] font-medium">
                  Complete milestone ledger of the Lebanese and MENA artificial intelligence ecosystem.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedArchiveYear}
                  onChange={(e) => setSelectedArchiveYear(e.target.value)}
                  className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-lg px-2.5 py-1 text-xs font-bold text-[#000000]"
                >
                  <option value="all">All Years</option>
                  {archiveTimeBreakdown.years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <select
                  value={selectedArchiveMonth}
                  onChange={(e) => setSelectedArchiveMonth(e.target.value)}
                  className="bg-[#F6FAF5] border border-[#D7E7D6] rounded-lg px-2.5 py-1 text-xs font-bold text-[#000000]"
                >
                  <option value="all">All Months</option>
                  {archiveTimeBreakdown.months.map(m => (
                    <option key={m.key} value={m.key}>{m.monthLabel} ({m.count})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Archive Timeline List */}
            <div className="space-y-4">
              {filteredArchiveNews.map((article, idx) => (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="p-4 bg-[#F6FAF5] hover:bg-[#EBF3EA] border border-[#D7E7D6] hover:border-[#75AC73] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-all"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
                      <span className="font-bold text-[#2E5A2C]">{article.publishedAt}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{getRegionFlag(article.region)}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#000000]">{article.title}</h4>
                    <p className="text-[11px] text-slate-700 font-medium line-clamp-1">{article.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <button
                      onClick={(e) => handleShareWhatsApp(article.title, article.summary, e)}
                      className="p-1.5 bg-white border border-[#D7E7D6] rounded-lg text-emerald-700 hover:bg-emerald-50 text-xs"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handlePrint(article.title, article.content, e)}
                      className="p-1.5 bg-white border border-[#D7E7D6] rounded-lg text-[#2E5A2C] hover:bg-[#EBF3EA] text-xs"
                      title="Print"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-[#2E5A2C] flex items-center gap-0.5">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-mono animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#D7E7D6] bg-[#FAFCFA] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded font-bold text-xs border ${categoryColorMap[activeArticle.category]?.bg || "bg-slate-100"} ${categoryColorMap[activeArticle.category]?.text || "text-slate-900"} ${categoryColorMap[activeArticle.category]?.border || "border-slate-300"}`}>
                  {activeArticle.category}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-white border border-[#D7E7D6]">
                  {getRegionFlag(activeArticle.region)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <button
                  onClick={() => handleShareWhatsApp(activeArticle.title, activeArticle.summary)}
                  className="px-3 py-1 bg-[#25D366] text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                {/* Print */}
                <button
                  onClick={() => handlePrint(activeArticle.title, activeArticle.content)}
                  className="px-3 py-1 bg-white border border-[#D7E7D6] hover:bg-[#EBF3EA] text-[#000000] rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5 text-[#4D7D4B]" />
                  <span>Print / PDF</span>
                </button>

                {/* Close */}
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-[#000000]">
              <div className="space-y-2">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                  <span>Published: {activeArticle.publishedAt}</span>
                  <span>•</span>
                  <span>Source: {activeArticle.sourceName}</span>
                  <span>•</span>
                  <span>By: {activeArticle.author}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#000000] leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              <div className="p-3.5 bg-[#F6FAF5] border-l-4 border-[#4D7D4B] rounded-r-xl text-xs font-semibold text-[#000000] leading-relaxed">
                {activeArticle.summary}
              </div>

              <div className="prose prose-sm max-w-none text-xs leading-relaxed text-[#000000] space-y-3 whitespace-pre-line font-mono">
                {activeArticle.content}
              </div>

              {/* Related Entity Nodes */}
              {activeArticle.relatedEntitySlugs && activeArticle.relatedEntitySlugs.length > 0 && (
                <div className="pt-4 border-t border-[#D7E7D6] space-y-2">
                  <div className="text-xs font-bold text-[#2E5A2C]">Related Graph & Wiki Entities:</div>
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.relatedEntitySlugs.map(slug => (
                      <button
                        key={slug}
                        onClick={() => {
                          setActiveArticle(null);
                          handleEntityClick(slug);
                        }}
                        className="px-2.5 py-1 bg-[#EBF3EA] hover:bg-[#D7E7D6] text-[#2E5A2C] border border-[#B0CFAD] rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Building2 className="w-3 h-3" />
                        <span>{slug.replace(/-/g, " ")}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#D7E7D6] bg-[#FAFCFA] flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono">961AINetwork Verified Dispatch</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-1.5 bg-[#4D7D4B] text-white rounded-lg font-bold"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KNOWLEDGE RESOURCE READER MODAL */}
      {activeResource && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-mono animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#D7E7D6] bg-[#FAFCFA] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-bold text-xs bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD]">
                  {activeResource.category}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-white border border-[#D7E7D6]">
                  {activeResource.format} • {activeResource.readTimeOrPages}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <button
                  onClick={() => handleShareWhatsApp(activeResource.title, activeResource.summary)}
                  className="px-3 py-1 bg-[#25D366] text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                {/* Print / Save PDF */}
                <button
                  onClick={() => handlePrint(activeResource.title, activeResource.contentMarkdown || activeResource.description)}
                  className="px-3 py-1 bg-white border border-[#D7E7D6] hover:bg-[#EBF3EA] text-[#000000] rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5 text-[#4D7D4B]" />
                  <span>Print / PDF</span>
                </button>

                {/* Close */}
                <button
                  onClick={() => setActiveResource(null)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-[#000000]">
              <div className="space-y-2">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                  <span>Published: {activeResource.publishedAt}</span>
                  <span>•</span>
                  <span>Org: {activeResource.authorOrOrg}</span>
                  <span>•</span>
                  <span>{activeResource.downloadCount.toLocaleString()} Verified Accesses</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#000000] leading-tight">
                  {activeResource.title}
                </h2>
              </div>

              <div className="p-3.5 bg-[#F6FAF5] border-l-4 border-[#4D7D4B] rounded-r-xl text-xs font-semibold text-[#000000] leading-relaxed">
                {activeResource.summary}
              </div>

              <div className="prose prose-sm max-w-none text-xs leading-relaxed text-[#000000] space-y-3 whitespace-pre-line font-mono bg-[#FAFCFA] p-4 rounded-xl border border-[#D7E7D6]">
                {activeResource.contentMarkdown || activeResource.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeResource.tags?.map(t => (
                  <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD] rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#D7E7D6] bg-[#FAFCFA] flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono">Open-Source Ecosystem Resource</span>
              <button
                onClick={() => setActiveResource(null)}
                className="px-4 py-1.5 bg-[#4D7D4B] text-white rounded-lg font-bold"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] max-w-lg w-full p-6 space-y-5 shadow-2xl font-mono animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#D7E7D6] pb-3">
              <h3 className="text-base font-black text-[#000000] flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#4D7D4B]" />
                <span>Submit Ecosystem News / Resource</span>
              </h3>
              <button onClick={() => setShowSubmitModal(false)} className="p-1 bg-slate-100 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitNews} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#000000]">Headline / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Beirut AI Startup Closes Seed Round"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs text-[#000000] focus:outline-none focus:border-[#75AC73]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#000000]">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs text-[#000000] focus:outline-none"
                  >
                    <option value="Funding">Funding & Rounds</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Research & Lab">Research & Lab</option>
                    <option value="Ecosystem & Grants">Ecosystem & Grants</option>
                    <option value="Diaspora Bridge">Diaspora Bridge</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#000000]">Region</label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value as any)}
                    className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs text-[#000000] focus:outline-none"
                  >
                    <option value="Lebanon">Lebanon Onshore</option>
                    <option value="UAE">UAE & Dubai</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Egypt">Egypt</option>
                    <option value="MENA">Regional MENA</option>
                    <option value="Diaspora">Global Diaspora</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#000000]">Short Summary</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Concise 1-2 sentence executive summary..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs text-[#000000] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#000000]">Full Content / Details</label>
                <textarea
                  rows={4}
                  placeholder="Markdown or press release text..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs text-[#000000] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#000000]">Source Name / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Startup Press Office / Wamda"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  className="w-full bg-[#F6FAF5] border border-[#D7E7D6] rounded-xl px-3 py-2 text-xs text-[#000000] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D7E7D6]">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 bg-white border border-[#D7E7D6] rounded-xl text-xs font-bold text-[#000000]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4D7D4B] hover:bg-[#3D633C] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Submit for Editorial Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
