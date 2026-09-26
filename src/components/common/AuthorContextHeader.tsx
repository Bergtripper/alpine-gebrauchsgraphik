import React from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { ResearchStatusBadge } from '../ui/EntityBadge';
import {
  X,
  Sliders,
  Share2,
  MapPin,
  CheckCircle2,
  Globe,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { ViewTab } from '../../types/atlas';

export const AuthorContextHeader: React.FC = () => {
  const {
    activeAuthor,
    exitAuthorMode,
    activeTab,
    setActiveTab,
    authorScopeOnly,
    toggleAuthorScope,
    filteredWorks,
    setComparison,
    openEntity,
  } = useAtlas();

  if (!activeAuthor) return null;

  // Author universe view shortcuts
  const universeTabs: { id: ViewTab; label: string; count?: number }[] = [
    { id: 'people', label: 'Author Dossier' },
    { id: 'works', label: 'Works', count: filteredWorks.length },
    { id: 'map', label: 'Geographic Network' },
    { id: 'timeline', label: 'Active Epoch' },
    { id: 'visual_dna', label: 'Visual DNA' },
    { id: 'explore', label: 'Local Connections' },
    { id: 'archive', label: 'Archive Sources' },
  ];

  return (
    <aside
      aria-label="Active Author Context"
      className="bg-white/95 dark:bg-[#11141c]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs z-30 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Author Identity Dossier Bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-1.5 py-0.5 rounded bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950">
                AUTHOR UNIVERSE
              </span>
              <ResearchStatusBadge status={activeAuthor.researchStatus || 'CONFIRMED'} size="xs" />
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-950 dark:text-stone-50 tracking-tight flex items-center gap-1">
              <span>{activeAuthor.name}</span>
            </h2>

            <span className="text-xs font-mono text-stone-500 dark:text-stone-400 hidden sm:inline">
              ({activeAuthor.birthYear}—{activeAuthor.deathYear || (activeAuthor.researchStatus === 'UNIDENTIFIED' ? 'uncertain' : 'present')})
            </span>

            <span className="text-xs font-mono text-stone-400 dark:text-stone-600 hidden md:inline">·</span>

            <span className="text-xs font-mono text-stone-700 dark:text-stone-300 hidden md:inline">
              {activeAuthor.professions.slice(0, 2).join(' · ')}
            </span>

            <span className="text-xs font-mono text-stone-400 dark:text-stone-600 hidden lg:inline">·</span>

            <span className="text-xs font-mono text-amber-700 dark:text-amber-400 hidden lg:flex items-center gap-1">
              <MapPin size={11} />
              <span>{activeAuthor.nationality} · {activeAuthor.cities.slice(0, 2).join(' / ')}</span>
            </span>
          </div>

          {/* Right: Explicit Research Actions (Compare, Explore Connections, Exit) */}
          <div className="flex items-center gap-2 text-xs font-mono shrink-0">
            {/* Author Scope Toggle */}
            <button
              onClick={toggleAuthorScope}
              className={cn(
                'px-2.5 py-1 rounded border flex items-center gap-1.5 transition-colors cursor-pointer',
                authorScopeOnly
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700 hover:text-stone-900 dark:hover:text-white'
              )}
              title={authorScopeOnly ? 'Author-scoped mode active (showing only related entities)' : 'Global view active (showing all Alpine entities)'}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full', authorScopeOnly ? 'bg-amber-500 animate-pulse' : 'bg-stone-400')} />
              <span>{authorScopeOnly ? 'Scoped' : 'All Alps'}</span>
            </button>

            {/* Compare with... */}
            <button
              onClick={() => {
                setComparison('artist', activeAuthor.id, '');
                setActiveTab('compare');
              }}
              className="px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Compare this author with another creator in the corpus"
            >
              <Sliders size={12} className="text-stone-600 dark:text-stone-400" />
              <span>Compare with…</span>
            </button>

            {/* Explore Connections */}
            <button
              onClick={() => {
                setActiveTab('explore');
              }}
              className="px-2.5 py-1 rounded bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
              title="Open author-centered local network"
            >
              <Share2 size={12} />
              <span>Explore Connections</span>
            </button>

            {/* Exit Author Mode */}
            <button
              onClick={exitAuthorMode}
              className="px-2 py-1 rounded text-stone-500 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Exit author-scoped mode and return to global People directory"
            >
              <X size={13} />
              <span className="hidden sm:inline">Exit Author Mode</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Strip within Author Universe */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-100 dark:border-stone-800/80 overflow-x-auto text-[11px] font-mono">
          <span className="text-stone-400 dark:text-stone-500 uppercase tracking-widest text-[9px] shrink-0 mr-1">
            VIEW UNIVERSE:
          </span>
          {universeTabs.map((tab) => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1',
                  isCurrent
                    ? 'bg-stone-900 dark:bg-stone-200 text-white dark:text-stone-950 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                )}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      'text-[9px] px-1 rounded',
                      isCurrent
                        ? 'bg-stone-800 dark:bg-stone-300 text-stone-200 dark:text-stone-900'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
