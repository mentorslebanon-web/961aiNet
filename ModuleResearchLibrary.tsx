import React, { useState, useEffect, useMemo } from "react";
import { 
  CommunityNewsStory, 
  getCommunityNews, 
  likeCommunityNewsStory, 
  incrementCommunityNewsViews 
} from "../../lib/communityNews";
import { SocialShareButtons } from "../common/SocialShareButtons";
import { 
  Newspaper, 
  ArrowRight, 
  PlusCircle, 
  Search,
  Calendar, 
  Clock, 
  Tag, 
  User, 
  Building2, 
  ExternalLink, 
  Heart, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  X,
  TrendingUp,
  Flame,
  Award,
  BookOpen
} from "lucide-react";

interface CommunityNewsSectionProps {
  onNavigateToCommunityNews: () => void;
  onNavigateToSubmitNews: () => void;
}

export const CommunityNewsSection: React.FC<CommunityNewsSectionProps> = ({
  onNavigateToCommunityNews,
  onNavigateToSubmitNews
}) => {
  const [allStories, setAllStories] = useState<CommunityNewsStory[]>(() => {
    const all = getCommunityNews();
    const published = all.filter((s) => s.status === "published" || s.status === "featured");
    published.sort((a, b) => b.timestamp - a.timestamp);
    return published;
  });

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedStory, setSelectedStory] = useState<CommunityNewsStory | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    const handleUpdate = () => {
      const all = getCommunityNews();
      const published = all.filter((s) => s.status === "published" || s.status === "featured");
      published.sort((a, b) => b.timestamp - a.timestamp);
      setAllStories(published);
    };
    window.addEventListener("961ai_community_news_updated", handleUpdate);
    return () => window.removeEventListener("961ai_community_news_updated", handleUpdate);
  }, []);

  const filteredStories = useMemo(() => {
    const q = searchKeyword.toLowerCase().trim();
    if (!q) {
      return allStories.slice(0, 4);
    }
    return allStories.filter((story) => {
      return (
        story.title.toLowerCase().includes(q) ||
        story.excerpt.toLowerCase().includes(q) ||
        story.content.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q) ||
        story.entityName.toLowerCase().includes(q) ||
        story.authorName.toLowerCase().includes(q) ||
        (story.tags && story.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [allStories, searchKeyword]);

  const handleOpenStory = (story: CommunityNewsStory) => {
    setSelectedStory(story);
    incrementCommunityNewsViews(story.id);
  };

  const handleLike = (storyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedIds.includes(storyId)) return;
    const newLikes = likeCommunityNewsStory(storyId);
    setLikedIds((prev) => [...prev, storyId]);
    setAllStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, likesCount: newLikes } : s))
    );
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory({ ...selectedStory, likesCount: newLikes });
    }
  };

  const handleShare = (story: CommunityNewsStory, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/community-news#${story.slug}` : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url || story.title);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const getCategoryColor = (category: CommunityNewsStory["category"]) => {
    switch (category) {
      case "Funding Round":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "AI & DeepTech":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "Startup Launch":
        return "bg-indigo-100 text-indigo-900 border-indigo-300";
      case "Grants & Awards":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "Partnership":
        return "bg-blue-100 text-blue-900 border-blue-300";
      case "Community & Talent":
        return "bg-rose-100 text-rose-900 border-rose-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  return (
    <section 
      id="community-news-home-section" 
      className="rounded-2xl bg-white border-2 border-[#D7E7D6] p-5 sm:p-7 shadow-sm space-y-6 font-sans transition-all"
    >
      {/* Header with Title and the Two Requested Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7E7D6]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-[#EBF3EA] text-[#2E5A2C] border border-[#B0CFAD] flex items-center gap-1.5">
              <Newspaper className="w-3 h-3 text-[#4D7D4B]" />
              <span>Ecosystem Wire • On (Y)Our Agenda</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Latest 4 Published
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            On (Y)Our Agenda
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl font-medium leading-relaxed">
            What's on our agenda & your agenda: direct dispatches, seed funding announcements, AI breakthroughs, and research spin-outs authored by Lebanese founders and researchers.
          </p>
        </div>

        {/* The Two Requested Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Button 1: Read More -> Takes user to the dedicated On (Y)Our Agenda page */}
          <button
            id="community-news-read-more-btn"
            onClick={onNavigateToCommunityNews}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm border-2 border-slate-300 hover:border-slate-800 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer group"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Button 2: List Your News for free -> Takes user to the submission page */}
          <button
            id="community-news-list-free-btn"
            onClick={onNavigateToSubmitNews}
            className="px-4 py-2.5 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer transform active:scale-98"
          >
            <PlusCircle className="w-4 h-4 text-emerald-200" />
            <span>List Your News for free</span>
          </button>
        </div>
      </div>

      {/* Text Search Input Field for Keyword Filtering */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F4F9F4] border border-[#D7E7D6] rounded-xl p-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4D7D4B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="community-news-keyword-search"
            type="text"
            placeholder="Search community news by keyword (e.g. AI, funding, healthtech, Berytech, Cedars)..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full bg-white border border-[#C5DEC3] rounded-lg pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4D7D4B]/30 focus:border-[#4D7D4B] shadow-2xs"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {searchKeyword.trim() && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 px-2 shrink-0">
            <span>Found <strong>{filteredStories.length}</strong> matching {filteredStories.length === 1 ? "article" : "articles"}</span>
            <button
              onClick={() => setSearchKeyword("")}
              className="text-xs text-[#2E5A2C] underline hover:text-[#1E3E1D] font-bold cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* News Cards Grid or Empty Search State */}
      {filteredStories.length === 0 ? (
        <div className="py-12 px-4 text-center rounded-xl bg-[#F9FCF9] border border-dashed border-[#C5DEC3] space-y-3">
          <Newspaper className="w-9 h-9 text-[#75AC73] mx-auto opacity-70" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">No community news found matching "{searchKeyword}"</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try different keywords or check out all published articles on the main agenda wire.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              onClick={() => setSearchKeyword("")}
              className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Reset Filter
            </button>
            <button
              onClick={onNavigateToSubmitNews}
              className="px-3.5 py-1.5 rounded-lg bg-[#4D7D4B] hover:bg-[#3D633C] text-white text-xs font-bold cursor-pointer"
            >
              Submit This Story
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStories.map((story, index) => (
            <article
              key={story.id}
              onClick={() => handleOpenStory(story)}
              className="group rounded-xl bg-[#FAFCFA] hover:bg-white border border-[#D7E7D6] hover:border-[#4D7D4B] p-4 flex flex-col justify-between space-y-3 transition-all duration-200 hover:shadow-md cursor-pointer relative overflow-hidden"
            >
              {/* Top Tag and Date */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${getCategoryColor(story.category)}`}>
                    {story.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {story.publishedAt.split(",")[0]}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {story.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-black text-slate-900 group-hover:text-[#2E5A2C] transition-colors leading-snug line-clamp-2">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>

              {/* Author & Entity Footer */}
              <div className="pt-3 border-t border-[#E6EFE5] flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5 truncate max-w-[70%]">
                  <div className="w-5 h-5 rounded-full bg-[#EBF3EA] text-[#2E5A2C] flex items-center justify-center font-bold text-[10px] shrink-0">
                    {story.authorName.charAt(0)}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-slate-900 text-[11px] block truncate">
                      {story.authorName}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate font-mono">
                      {story.entityName}
                    </span>
                  </div>
                </div>

                {/* Action icons (WhatsApp, Telegram, Likes & Read More link) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <SocialShareButtons
                    title={story.title}
                    excerpt={story.excerpt}
                    url={typeof window !== "undefined" ? `${window.location.origin}/community-news#${story.slug}` : undefined}
                    variant="card"
                  />

                  <button
                    type="button"
                    onClick={(e) => handleLike(story.id, e)}
                    className={`flex items-center gap-1 text-[11px] font-mono transition-colors ${
                      likedIds.includes(story.id) ? "text-rose-600 font-bold" : "text-slate-400 hover:text-rose-500"
                    }`}
                    title="Upvote story"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedIds.includes(story.id) ? "fill-rose-600" : ""}`} />
                    <span>{story.likesCount}</span>
                  </button>

                  <div className="text-[11px] font-mono font-bold text-[#4D7D4B] group-hover:translate-x-0.5 transition-transform flex items-center">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Section Alert Sharing Bar */}
      <SocialShareButtons
        title="On (Y)Our Agenda: Lebanon & Diaspora AI Community News Wire"
        excerpt="Breaking startup funding deals, AI agent deployments, academic research, and deeptech news across the Lebanese ecosystem."
        url={typeof window !== "undefined" ? `${window.location.origin}/community-news` : undefined}
        variant="section"
      />

      {/* Bottom Ribbon with quick summary CTA */}
      <div className="p-3.5 rounded-xl bg-[#EBF3EA] border border-[#B0CFAD] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-800">
          <div className="w-7 h-7 rounded-lg bg-[#4D7D4B] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-950 block">Are you a Lebanese startup, lab, or founder?</strong>
            <span className="text-slate-600">List your launch, funding round, or research article for free across the 961AI network.</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onNavigateToSubmitNews}
            className="px-3.5 py-1.5 rounded-lg bg-[#2E5A2C] hover:bg-[#1E3E1D] text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>List Your News for free</span>
          </button>
          <button
            onClick={onNavigateToCommunityNews}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-[#B0CFAD] transition-colors cursor-pointer"
          >
            <span>Explore On (Y)Our Agenda ({getCommunityNews().length})</span>
          </button>
        </div>
      </div>

      {/* Quick Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
          <div className="bg-white border-2 border-[#B0CFAD] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${getCategoryColor(selectedStory.category)}`}>
                  {selectedStory.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {selectedStory.publishedAt} • {selectedStory.readTime}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                  ✓ Verified Community Dispatch
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {selectedStory.title}
              </h2>

              <div className="flex items-center gap-3 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-slate-900">{selectedStory.authorName}</span>
                  <span className="text-slate-500">({selectedStory.authorRole})</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-700">{selectedStory.entityName}</span>
                </div>
              </div>
            </div>

            {/* Founder Quote Box if present */}
            {selectedStory.founderQuote && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border-l-4 border-[#4D7D4B] text-xs italic text-emerald-950 font-serif leading-relaxed">
                "{selectedStory.founderQuote}"
              </div>
            )}

            {/* Body Content */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans border-t border-b border-slate-100 py-4">
              {selectedStory.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedStory.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-mono">
                  {tag}
                </span>
              ))}
            </div>

            {/* WhatsApp, Telegram & Social Alert Share */}
            <SocialShareButtons
              title={selectedStory.title}
              excerpt={selectedStory.excerpt}
              url={typeof window !== "undefined" ? `${window.location.origin}/community-news#${selectedStory.slug}` : undefined}
              variant="modal"
            />

            {/* Modal Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleLike(selectedStory.id, e)}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono text-xs transition-colors cursor-pointer ${
                    likedIds.includes(selectedStory.id)
                      ? "bg-rose-50 border-rose-300 text-rose-700 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedIds.includes(selectedStory.id) ? "fill-rose-600 text-rose-600" : ""}`} />
                  <span>{selectedStory.likesCount} Upvotes</span>
                </button>

                <button
                  onClick={(e) => handleShare(selectedStory, e)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {selectedStory.externalSourceUrl && (
                  <a
                    href={selectedStory.externalSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Source Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    onNavigateToCommunityNews();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#4D7D4B] hover:bg-[#3D633C] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Go to Community News Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
