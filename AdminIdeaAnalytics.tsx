import React from "react";
import { ModuleHomePage } from "./ModuleHomePage";
import { GraphNode, GraphEdge, StartupNewsArticle, KnowledgeResource, IntroductionRequestLog } from "../../types";

export interface ModuleYellowPagesProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
  deductCredits: (amount: number) => boolean;
  credits: number;
  onNavigateToQuestionnaire: () => void;
  onOpenGraphView?: () => void;
  onNavigateToMatchmaking?: () => void;
  onNavigateToDirectory?: () => void;
  introLogs?: IntroductionRequestLog[];
  onAddIntroLog?: (log: IntroductionRequestLog) => void;
  news?: StartupNewsArticle[];
  resources?: KnowledgeResource[];
  onNavigateToNews?: () => void;
  onNavigateToMarketplace?: () => void;
  onNavigateToSandbox?: () => void;
  onNavigateToDashboard?: () => void;
  onQuickAskLegalAi?: (question: string) => void;
}

/**
 * ModuleYellowPages now serves as the clean Home Page
 * The last directory section was extracted into ModuleYellowPagesDirectory
 */
export const ModuleYellowPages: React.FC<ModuleYellowPagesProps> = (props) => {
  return (
    <ModuleHomePage
      nodes={props.nodes}
      edges={props.edges}
      onSelectNode={props.onSelectNode}
      deductCredits={props.deductCredits}
      credits={props.credits}
      onNavigateToQuestionnaire={props.onNavigateToQuestionnaire}
      onOpenGraphView={props.onOpenGraphView}
      onNavigateToMatchmaking={props.onNavigateToMatchmaking}
      onNavigateToDirectory={props.onNavigateToDirectory || (() => {})}
      news={props.news}
      resources={props.resources}
      onNavigateToNews={props.onNavigateToNews}
      onNavigateToMarketplace={props.onNavigateToMarketplace}
      onNavigateToSandbox={props.onNavigateToSandbox}
      onNavigateToDashboard={props.onNavigateToDashboard}
      onQuickAskLegalAi={props.onQuickAskLegalAi}
    />
  );
};
