import React, { useState } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { LayoutGrid, List } from 'lucide-react';
import { AlpineSurveyMotif } from '../common/AlpineSurveyMotif';

export const WorksView: React.FC = () => {
  const {
    filteredWorks,
    openEntity,
    filters,
    updateFilter,
    activeAuthor,
    authorScopeOnly,
    toggleAuthorScope,
    setActiveTab,
  } = useAtlas();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'year' | 'title' | 'creator'>('year');

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'Poster', label: 'Posters' },
    { id: 'Hotel Label', label: 'Hotel Labels' },
    { id: 'Catalogue', label: 'Catalogues' },
    { id: 'Magazine Cover', label: 'Periodicals' },
    { id: 'Panoramic Map', label: 'Panoramic Maps' },
  ];

  const sortedWorks = [...filteredWorks].sort((a, b) => {
    if (sortBy === 'year') return a.year - b.year;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return a.creatorName.localeCompare(b.creatorName);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Editorial Title & Controls Bar */}
      <div className="relative border-b border-stone-300 dark:border-stone-700 pb-5 transition-colors survey-cut">
        <div className="absolute right-0 top-0 w-56 hidden lg:block opacity-60">
          <AlpineSurveyMotif variant="section" />
        </div>
        <div className="survey-coordinate text-stone-500 dark:text-stone-400 mb-2 pt-3">
          SURVEY 02 / WORKS · POSTERS · HOTEL LABELS · EPHEMERA
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="survey-title text-3xl sm:text-5xl text-stone-900 dark:text-stone-50">
              Visual Artefacts of the Alps
            </h1>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl mt-1.5 leading-relaxed">
              Historical object records are progressively migrated to source-backed metadata. Visual DNA remains a separate analytical layer.
            </p>
          </div>

          {/* View toggle and sort */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 p-1 bg-white dark:bg-stone-900">
              <span className="text-stone-400 dark:text-stone-500 pl-1">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-800 dark:text-stone-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="year" className="dark:bg-stone-900">Chronology (Year)</option>
                <option value="title" className="dark:bg-stone-900">Work Title</option>
                <option value="creator" className="dark:bg-stone-900">Creator Name</option>
              </select>
            </div>

            <div className="flex border border-stone-300 dark:border-stone-700 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
                title="Grid layout"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
                title="Table catalogue layout"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Category Filtering Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 mr-1">
            Category:
          </span>
          {categories.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => updateFilter('category', cat.id)}
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 border-stone-900 dark:border-stone-100 font-bold '
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Author Universe Scoped Banner */}
      {activeAuthor && authorScopeOnly && (
        <div className="p-3  bg-transparent dark:bg-transparent border border-stone-300 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-stone-200 flex flex-wrap items-center justify-between gap-3 ">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 bg-stone-900 text-white">
              AUTHOR SCOPED
            </span>
            <span>
              Showing {sortedWorks.length} catalogued works by <strong>{activeAuthor.name}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <button
              onClick={toggleAuthorScope}
              className="px-2.5 py-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              View All Alpine Works ({filters.category !== 'all' ? 'Filtered' : 'Global'})
            </button>
            <button
              onClick={() => setActiveTab('people')}
              className="hover:underline text-stone-700 dark:text-stone-300 cursor-pointer"
            >
              Author Universe →
            </button>
          </div>
        </div>
      )}

      {activeAuthor && !authorScopeOnly && (
        <div className="p-2.5 bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-700 dark:text-stone-300 flex items-center justify-between gap-3">
          <span>Viewing entire global catalogue ({sortedWorks.length} works).</span>
          <button
            onClick={toggleAuthorScope}
            className="px-2.5 py-1 bg-stone-900 text-white font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Re-scope to {activeAuthor.name}
          </button>
        </div>
      )}

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedWorks.map((work) => (
            <div
              key={work.id}
              className="bg-transparent border-t border-stone-300 dark:border-stone-700 pt-3.5 hover:border-stone-900 dark:hover:border-stone-300 transition-colors flex flex-col justify-between group"
            >
              <div>
                <ArtworkVisualizer work={work} size="md" showPalette={true} interactiveZoom={true} />

                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="uppercase tracking-wider">{work.category}</span>
                      {(work.attribution || work.date || work.images?.length) && (
                        <span className="px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 text-[9px] font-bold uppercase tracking-wider">
                          VERIFIED SOURCE
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 shrink-0">
                      {work.yearDisplay} {work.isDateUncertain && '*'}
                    </span>
                  </div>

                  <h3
                    onClick={() => openEntity(work.id, 'work')}
                    className="text-base font-serif font-bold text-stone-950 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 cursor-pointer leading-snug line-clamp-2 transition-colors"
                  >
                    {work.title}
                  </h3>

                  <div className="text-xs font-mono text-stone-600 dark:text-stone-400">
                    <button
                      onClick={() => openEntity(work.creatorId, 'person')}
                      className="hover:text-stone-950 dark:hover:text-stone-100 underline underline-offset-2 cursor-pointer"
                    >
                      {work.creatorName}
                    </button>
                    <span> · </span>
                    <button
                      onClick={() => openEntity(work.locationId, 'place')}
                      className="hover:text-stone-950 dark:hover:text-stone-100 cursor-pointer"
                    >
                      {work.locationName}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                <span className="truncate max-w-[150px]">{work.technique}</span>
                <button
                  onClick={() => openEntity(work.id, 'work')}
                  className="text-stone-900 dark:text-stone-100 font-semibold hover:underline cursor-pointer"
                >
                  Dossier ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="bg-transparent border-y border-stone-300 dark:border-stone-700 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Creator</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Technique</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
              {sortedWorks.map((w) => (
                <tr key={w.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="py-2 px-4 w-14">
                    <div className="w-10 h-14 bg-stone-200 dark:bg-stone-800 overflow-hidden">
                      <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-serif font-bold text-stone-950 dark:text-stone-100 max-w-xs">
                    <button
                      onClick={() => openEntity(w.id, 'work')}
                      className="hover:underline text-left block cursor-pointer"
                    >
                      {w.title}
                    </button>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 font-normal">
                      {w.dimensions}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openEntity(w.creatorId, 'person')}
                      className="hover:underline text-stone-900 dark:text-stone-100 cursor-pointer"
                    >
                      {w.creatorName}
                    </button>
                  </td>
                  <td className="py-3 px-4 font-mono-tabular">
                    {w.yearDisplay} {w.isDateUncertain && '(c.)'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openEntity(w.locationId, 'place')}
                      className="hover:underline text-stone-700 dark:text-stone-300 cursor-pointer"
                    >
                      {w.locationName}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-stone-600 dark:text-stone-400">{w.technique}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px]">
                      {w.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openEntity(w.id, 'work')}
                      className="text-stone-900 dark:text-stone-100 font-bold hover:underline cursor-pointer"
                    >
                      Inspect ↗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
