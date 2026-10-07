import React from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeNode,
    activeMapScale,
    activeRegion,
    filters,
    getEntityDetails,
  } = useAtlas();

  const nodeDetails = activeNode ? getEntityDetails(activeNode.id, activeNode.type) : null;
  const nodeTitle =
    nodeDetails?.entity && 'name' in nodeDetails.entity
      ? nodeDetails.entity.name
      : nodeDetails?.entity && 'title' in nodeDetails.entity
      ? nodeDetails.entity.title
      : null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="h-8 px-4 sm:px-6 bg-[#F3F2EB]/90 dark:bg-[#0c0f14]/90 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono select-none"
    >
      <div className="flex items-center gap-1.5 overflow-x-auto text-stone-600 dark:text-stone-400">
        <button
          onClick={() => setActiveTab('explore')}
          className="uppercase text-[9px] tracking-[.18em] font-bold text-stone-500 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          ATLAS
        </button>

        <span className="text-stone-300 dark:text-stone-700 shrink-0" aria-hidden="true">/</span>

        {/* Current Primary Tab */}
        <button
          onClick={() => setActiveTab(activeTab)}
          className="uppercase font-semibold text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          {activeTab === 'explore' ? 'NETWORK' : activeTab.toUpperCase()}
        </button>

        {/* Map Scale or Region if in Map view */}
        {activeTab === 'map' && (
          <>
            <span className="text-stone-300 dark:text-stone-700 shrink-0" aria-hidden="true">/</span>
            <span className="text-stone-900 dark:text-stone-100 uppercase font-semibold">
              SCALE: {activeMapScale.toUpperCase()}
            </span>
            {activeRegion !== 'all' && (
              <>
                <span className="text-stone-300 dark:text-stone-700 shrink-0" aria-hidden="true">/</span>
                <span className="text-stone-700 dark:text-stone-300 uppercase">
                  {activeRegion.replace('-', ' ')}
                </span>
              </>
            )}
          </>
        )}

        {/* Active Node context */}
        {nodeTitle && (
          <>
            <span className="text-stone-300 dark:text-stone-700 shrink-0" aria-hidden="true">/</span>
            <span className="text-stone-900 dark:text-white font-bold truncate max-w-[200px]">
              {nodeTitle}
            </span>
          </>
        )}
      </div>

      {/* Active Temporal Filter Badge */}
      <div className="hidden md:flex items-center gap-2 text-stone-500 dark:text-stone-400">
        <span>EPOCH:</span>
        <span className="px-1.5 py-0.5 border-l border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-200 font-bold">
          {filters.startYear}—{filters.endYear}
        </span>
      </div>
    </nav>
  );
};
