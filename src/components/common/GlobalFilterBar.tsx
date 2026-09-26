import React from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { PEOPLE, PLACES, ORGANIZATIONS } from '../../data/atlasData';
import { Search, X, RotateCcw } from 'lucide-react';

interface GlobalFilterBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({ isOpen, onClose }) => {
  const {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    filteredWorks,
    filteredPeople,
  } = useAtlas();

  if (!isOpen) return null;

  const decades = [
    { label: 'All (1900–1970)', start: 1900, end: 1970 },
    { label: '1900–1919 (Pioneers)', start: 1900, end: 1919 },
    { label: '1920–1929 (Post-WWI Boom)', start: 1920, end: 1929 },
    { label: '1930–1939 (Modernist Peak)', start: 1930, end: 1939 },
    { label: '1940–1949 (War & Reconstruction)', start: 1940, end: 1949 },
    { label: '1950–1970 (Post-War & Olympics)', start: 1950, end: 1970 },
  ];

  const categories = [
    'all',
    'Poster',
    'Hotel Label',
    'Catalogue',
    'Magazine Cover',
    'Panoramic Map',
    'Illustration',
    'Advertisement',
  ];

  const styles = [
    'all',
    'modernist',
    'geometric',
    'illustrative',
    'expressionist',
  ];

  const themes = [
    'all',
    'Winter Sports',
    'Grand Hotels',
    'Luggage Labels',
    'Mountaineering',
    'Modern Skiing',
    'Dolomite Landscapes',
    'Railway Transport',
    'Panoramic Maps',
    'Sun & Health',
    'Alpine Architecture',
  ];

  return (
    <div className="bg-[#F4F3EE] dark:bg-[#12161f] border-b border-stone-300 dark:border-stone-800 px-4 sm:px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top bar with search & active stats */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" size={14} />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              placeholder="Search artists, places, themes, printers..."
              className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 pl-9 pr-8 py-1.5 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-stone-800 dark:focus:border-stone-100 font-mono transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Active stats & clear */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-stone-600 dark:text-stone-400">
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{filteredWorks.length}</span> works ·{' '}
              <span className="font-semibold text-stone-900 dark:text-stone-100">{filteredPeople.length}</span> creators
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-stone-800 dark:text-stone-200 hover:text-black dark:hover:text-white underline underline-offset-2 cursor-pointer font-bold"
              >
                <RotateCcw size={11} />
                <span>Clear ({activeFilterCount})</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 ml-2"
              title="Close filter bar"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2 border-t border-stone-300/70 dark:border-stone-800 text-xs font-mono">
          {/* Timeline Range */}
          <div className="col-span-1 sm:col-span-2 space-y-1.5">
            <div className="flex justify-between items-center text-stone-700 dark:text-stone-300">
              <span className="uppercase text-[11px] font-semibold tracking-wider">Chronology</span>
              <span className="text-stone-900 dark:text-stone-100 font-bold">
                {filters.startYear} — {filters.endYear}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1900}
                max={1970}
                value={filters.startYear}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= filters.endYear) updateFilter('startYear', val);
                }}
                className="w-full accent-stone-900 dark:accent-stone-100 h-1 bg-stone-300 dark:bg-stone-700 cursor-pointer"
              />
              <input
                type="range"
                min={1900}
                max={1970}
                value={filters.endYear}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= filters.startYear) updateFilter('endYear', val);
                }}
                className="w-full accent-stone-900 dark:accent-stone-100 h-1 bg-stone-300 dark:bg-stone-700 cursor-pointer"
              />
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {decades.map((d) => {
                const isActive = filters.startYear === d.start && filters.endYear === d.end;
                return (
                  <button
                    key={d.label}
                    onClick={() => {
                      updateFilter('startYear', d.start);
                      updateFilter('endYear', d.end);
                    }}
                    className={`px-1.5 py-0.5 text-[10px] transition-colors ${
                      isActive
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {d.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Place Filter */}
          <div className="space-y-1">
            <label className="block uppercase text-[11px] font-semibold text-stone-700 dark:text-stone-300 tracking-wider">
              Geographic Node
            </label>
            <select
              value={filters.placeId}
              onChange={(e) => updateFilter('placeId', e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-2 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-800 dark:focus:border-stone-100"
            >
              <option value="all">All Places ({PLACES.length})</option>
              {PLACES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.country})
                </option>
              ))}
            </select>
          </div>

          {/* Person Filter */}
          <div className="space-y-1">
            <label className="block uppercase text-[11px] font-semibold text-stone-700 dark:text-stone-300 tracking-wider">
              Creator
            </label>
            <select
              value={filters.personId}
              onChange={(e) => updateFilter('personId', e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-2 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-800 dark:focus:border-stone-100"
            >
              <option value="all">All Creators ({PEOPLE.length})</option>
              {PEOPLE.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label className="block uppercase text-[11px] font-semibold text-stone-700 dark:text-stone-300 tracking-wider">
              Work Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-2 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-800 dark:focus:border-stone-100"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Formats' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Style Filter */}
          <div className="space-y-1">
            <label className="block uppercase text-[11px] font-semibold text-stone-700 dark:text-stone-300 tracking-wider">
              Visual Style
            </label>
            <select
              value={filters.style}
              onChange={(e) => updateFilter('style', e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-2 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-800 dark:focus:border-stone-100"
            >
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'All Styles' : s.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
