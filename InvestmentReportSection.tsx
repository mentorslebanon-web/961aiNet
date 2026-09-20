import React, { useState, useEffect } from "react";
import { 
  Search, 
  Command, 
  ArrowRight, 
  Building2, 
  Newspaper, 
  FileText, 
  Briefcase, 
  Calculator, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles,
  X,
  Scale,
  Home,
  Layers,
  Gift,
  Info,
  Trophy,
  Brain,
  Landmark
} from "lucide-react";
import { GraphNode, StartupNewsArticle, KnowledgeResource } from "../types";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: GraphNode[];
  news: StartupNewsArticle[];
  resources: KnowledgeResource[];
  onSelectNode: (node: GraphNode) => void;
  onNavigateToModule: (moduleId: number) => void;
  onNavigateToAdmin?: () => void;
  onOpenTaxCalculator: () => void;
  onOpenLegalCodex: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  nodes,
  news,
  resources,
  onSelectNode,
  onNavigateToModule,
  onNavigateToAdmin,
  onOpenTaxCalculator,
  onOpenLegalCodex
}) => {
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search Results
  const matchingNodes = q
    ? nodes.filter(
        (n) =>
          n.label.toLowerCase().includes(q) ||
          n.tags?.some((t) => t.toLowerCase().includes(q)) ||
          n.location?.toLowerCase().includes(q) ||
          n.bio?.toLowerCase().includes(q)
      ).slice(0, 5)
    : nodes.slice(0, 3);

  const matchingNews = q
    ? news.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags?.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : news.slice(0, 3);

  const matchingResources = q
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : resources.slice(0, 3);

  // Quick Action Shortcuts
  const quickActions = [
    {
      id: "home_nav",
      title: "Home: Community Portal & Ecosystem Wire",
      category: "Navigation",
      icon: <Home className="w-4 h-4 text-[#4D7D4B]" />,
      action: () => {
        onClose();
        onNavigateToModule(0);
      }
    },
    {
      id: "mita_initiatives_nav",
      title: "MITA Initiatives: Building the Digital Republic & National AI Strategy (mitai.gov.lb)",
      category: "Public Sector Initiatives",
      icon: <Landmark className="w-4 h-4 text-emerald-600" />,
      action: () => {
        onClose();
        onNavigateToModule(20);
      }
    },
    {
      id: "omsar_projects_nav",
      title: "OMSAR Projects: Reinventing Government 2030, BIND-Leb Behavioral Lab (omsar.gov.lb)",
      category: "Public Sector Initiatives",
      icon: <Building2 className="w-4 h-4 text-blue-600" />,
      action: () => {
        onClose();
        onNavigateToModule(21);
      }
    },
    {
      id: "second_brain_nav",
      title: "Second Brain (NotebookLLM): Save & Arrange Docs, Multi-Doc AI Synthesis & Audio",
      category: "Sovereign Cognitive Engine",
      icon: <Brain className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onClose();
        onNavigateToModule(17);
      }
    },
    {
      id: "pitch_room_nav",
      title: "Pitch Room: Automated AI Due Diligence, Code Moat Audit & Diaspora SPVs",
      category: "Venture Acceleration",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onClose();
        onNavigateToModule(15);
      }
    },
    {
      id: "about_specs_nav",
      title: "About Us: Sovereign Mission, Technical Specs & Services Matrix",
      category: "Platform & Specifications",
      icon: <Info className="w-4 h-4 text-emerald-600" />,
      action: () => {
        onClose();
        onNavigateToModule(13);
      }
    },
    {
      id: "quests_rewards_nav",
      title: "Community Quests & Rewards: Gamified Bounties, Cedar XP & Service Subsidies",
      category: "Community & Gamification",
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
      action: () => {
        onClose();
        onNavigateToModule(14);
      }
    },
    {
      id: "directory_nav",
      title: "Yellow Pages Directory: Verified Startups & Agencies",
      category: "Directory",
      icon: <Layers className="w-4 h-4 text-[#2E5A2C]" />,
      action: () => {
        onClose();
        onNavigateToModule(1);
      }
    },
    {
      id: "pricing_nav",
      title: "Pricing & Plans: 6-Hour Demo vs Annual Pro ($100/yr)",
      category: "Membership & Upgrades",
      icon: <Sparkles className="w-4 h-4 text-amber-600" />,
      action: () => {
        onClose();
        onNavigateToModule(12);
      }
    },
    {
      id: "referrals_nav",
      title: "Founder Referrals: Earn 1 Month Free for Every Startup Invited",
      category: "Growth & Rewards",
      icon: <Gift className="w-4 h-4 text-emerald-600" />,
      action: () => {
        onClose();
        onNavigateToModule(2);
      }
    },
    {
      id: "tax_calc",
      title: "0% Offshore S.A.L. & Runway Engine",
      category: "Tools & Financials",
      icon: <Calculator className="w-4 h-4 text-[#4D7D4B]" />,
      action: () => {
        onClose();
        onOpenTaxCalculator();
      }
    },
    {
      id: "legal_sandbox",
      title: "Lebanon Sandbox & Law 81 AI Legal Codex",
      category: "Regulatory & Compliance",
      icon: <Scale className="w-4 h-4 text-[#2E5A2C]" />,
      action: () => {
        onClose();
        onNavigateToModule(10);
      }
    },
    {
      id: "research_papers_nav",
      title: "Research Papers & PDF Intelligence: Institutional Publications & Downloads",
      category: "Intelligence Wire",
      icon: <FileText className="w-4 h-4 text-[#2E5A2C]" />,
      action: () => {
        onClose();
        onNavigateToModule(24);
      }
    },
    {
      id: "newsroom",
      title: "961AINews Dispatch & Venture Rounds",
      category: "Intelligence Wire",
      icon: <Newspaper className="w-4 h-4 text-rose-600" />,
      action: () => {
        onClose();
        onNavigateToModule(8);
      }
    },
    {
      id: "marketplace",
      title: "Verified Lebanese Software & AI Agencies",
      category: "Procurement",
      icon: <Briefcase className="w-4 h-4 text-indigo-600" />,
      action: () => {
        onClose();
        onNavigateToModule(9);
      }
    },
    {
      id: "admin_control",
      title: "Admin Root Console: Password Protected (/admin)",
      category: "Root Operations",
      icon: <ShieldCheck className="w-4 h-4 text-rose-600" />,
      action: () => {
        onClose();
        if (onNavigateToAdmin) {
          onNavigateToAdmin();
        } else {
          onNavigateToModule(4);
        }
      }
    },
    {
      id: "questionnaire",
      title: "Intake Questionnaire & AI Matchmaking",
      category: "Workspace",
      icon: <Sparkles className="w-4 h-4 text-amber-600" />,
      action: () => {
        onClose();
        onNavigateToModule(2);
      }
    }
  ].filter((a) => !q || a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20 overflow-y-auto animate-in fade-in duration-100">
      <div className="bg-white rounded-2xl border-2 border-[#B0CFAD] max-w-2xl w-full shadow-2xl overflow-hidden font-mono flex flex-col">
        {/* Search Header Bar */}
        <div className="p-4 border-b border-[#D7E7D6] bg-[#FAFCFA] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#4D7D4B] shrink-0" />
          <input
            type="text"
            placeholder="Type to search entities, SAFEs, tax codex, news, or press 'ESC' to close..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-[#000000] placeholder-slate-400 focus:outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:bg-slate-200 rounded text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-300 rounded">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Action Tools */}
          {quickActions.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Engines & Direct Actions
              </div>
              <div className="space-y-1">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-[#F6FAF5] hover:border-[#B0CFAD] border border-transparent flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#EBF3EA]">
                        {action.icon}
                      </div>
                      <div>
                        <div className="font-bold text-[#000000] group-hover:text-[#2E5A2C]">
                          {action.title}
                        </div>
                        <div className="text-[10px] text-slate-500">{action.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2E5A2C] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Directory Entities */}
          {matchingNodes.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Directory Entities ({matchingNodes.length})
              </div>
              <div className="space-y-1">
                {matchingNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      onClose();
                      onSelectNode(node);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-[#F6FAF5] hover:border-[#B0CFAD] border border-transparent flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EBF3EA] border border-[#B0CFAD] flex items-center justify-center text-xs font-black text-[#2E5A2C]">
                        {node.avatar || node.label.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[#000000] flex items-center gap-2">
                          <span>{node.label}</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 text-slate-700 border border-slate-200">
                            {node.type}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-sm">
                          {node.title || node.bio || node.location}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2E5A2C] bg-[#EBF3EA] px-2 py-0.5 rounded border border-[#B0CFAD]">
                      Open Profile
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Resources & Legal Codices */}
          {matchingResources.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Knowledge Resources & Legal Toolkits
              </div>
              <div className="space-y-1">
                {matchingResources.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => {
                      onClose();
                      onNavigateToModule(8);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-[#F6FAF5] hover:border-[#B0CFAD] border border-transparent flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-[#2E5A2C] border border-[#B0CFAD]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#000000] group-hover:text-[#2E5A2C]">
                          {res.title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {res.format} • {res.category}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">Read Toolkit</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* News Dispatches */}
          {matchingNews.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                News Dispatches & Deals
              </div>
              <div className="space-y-1">
                {matchingNews.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => {
                      onClose();
                      onNavigateToModule(8);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-[#F6FAF5] hover:border-[#B0CFAD] border border-transparent flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
                        <Newspaper className="w-4 h-4" />
                      </div>
                      <div className="truncate max-w-md">
                        <div className="font-bold text-[#000000] truncate">{article.title}</div>
                        <div className="text-[10px] text-slate-500">
                          {article.category} • {article.publishedAt}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Story
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingNodes.length === 0 && matchingNews.length === 0 && matchingResources.length === 0 && quickActions.length === 0 && (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <div className="font-bold text-sm text-slate-700">No matching ecosystem assets found</div>
              <div className="text-xs">Try searching for "Offshore S.A.L.", "CedarsLLM", "SAFE", or "Berytech".</div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 border-t border-[#D7E7D6] bg-[#FAFCFA] flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded">↑</kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded">↓</kbd>
            <span>Select:</span>
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded">↵</kbd>
          </div>
          <div>961AINetwork Global Command Engine</div>
        </div>
      </div>
    </div>
  );
};
