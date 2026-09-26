import React from 'react';
import { Search, Filter, RotateCcw, LayoutGrid, List } from 'lucide-react';

interface PeopleFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedDecade: string;
  onDecadeChange: (decade: string) => void;
  selectedDiscipline: string;
  onDisciplineChange: (discipline: string) => void;
  selectedMedium: string;
  onMediumChange: (medium: string) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  filteredCount: number;
  totalCount: number;
}

export const PeopleFilterToolbar: React.FC<PeopleFilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedRegion,
  onRegionChange,
  selectedDecade,
  onDecadeChange,
  selectedDiscipline,
  onDisciplineChange,
  selectedMedium,
  onMediumChange,
  hasActiveFilters,
  onResetFilters,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
}) => {
  const regions = [
    { id: 'all', label: 'All Alpine Regions' },
    { id: 'South Tyrol', label: 'South Tyrol / Alto Adige' },
    { id: 'Tyrol', label: 'North / East Tyrol' },
    { id: 'Dolomites', label: 'Dolomites / Belluno' },
    { id: 'Switzerland', label: 'Switzerland' },
    { id: 'Austria', label: 'Austria' },
    { id: 'Italy', label: 'Northern Italy' },
  ];

  const decades = [
    { id: 'all', label: 'All Decades' },
    { id: '1900', label: '1900—1910' },
    { id: '1910', label: '1910—1920' },
    { id: '1920', label: '1920—1930' },
    { id: '1930', label: '1930—1940' },
    { id: '1940', label: '1940—1950' },
    { id: '1950', label: '1950—1960' },
    { id: '1960', label: '1960—1970' },
  ];

  const disciplines = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'Graphic Designer', label: 'Graphic Designer' },
    { id: 'Painter', label: 'Painter' },
    { id: 'Illustrator', label: 'Illustrator' },
    { id: 'Cartographer', label: 'Cartographer' },
    { id: 'Photographer', label: 'Photographer' },
    { id: 'Architect', label: 'Architect' },
  ];

  const mediums = [
    { id: 'all', label: 'All Mediums' },
    { id: 'Posters', label: 'Tourism Posters' },
    { id: 'Hotel Labels', label: 'Luggage Labels' },
    { id: 'Brochures', label: 'Brochures / Catalogues' },
    { id: 'Panoramic Maps', label: 'Panoramic Maps' },
  ];

  return (
    <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-5 space-y-4 shadow-xs">
      {/* Search Input Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search authors by name, active city, studio, visual style..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-xs font-mono text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 border border-stone-300 dark:border-stone-700 rounded p-1 bg-stone-50 dark:bg-stone-900 shrink-0">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
            title="Grid view"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
            title="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1 text-xs font-mono">
        {/* Region */}
        <div>
          <label className="text-[10px] uppercase text-stone-400 dark:text-stone-500 block mb-1">
            Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400"
          >
            {regions.map((r) => (
              <option key={r.id} value={r.id} className="dark:bg-stone-900">{r.label}</option>
            ))}
          </select>
        </div>

        {/* Period / Decade */}
        <div>
          <label className="text-[10px] uppercase text-stone-400 dark:text-stone-500 block mb-1">
            Active Era
          </label>
          <select
            value={selectedDecade}
            onChange={(e) => onDecadeChange(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400"
          >
            {decades.map((d) => (
              <option key={d.id} value={d.id} className="dark:bg-stone-900">{d.label}</option>
            ))}
          </select>
        </div>

        {/* Discipline */}
        <div>
          <label className="text-[10px] uppercase text-stone-400 dark:text-stone-500 block mb-1">
            Discipline
          </label>
          <select
            value={selectedDiscipline}
            onChange={(e) => onDisciplineChange(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400"
          >
            {disciplines.map((dis) => (
              <option key={dis.id} value={dis.id} className="dark:bg-stone-900">{dis.label}</option>
            ))}
          </select>
        </div>

        {/* Medium */}
        <div>
          <label className="text-[10px] uppercase text-stone-400 dark:text-stone-500 block mb-1">
            Medium
          </label>
          <select
            value={selectedMedium}
            onChange={(e) => onMediumChange(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400"
          >
            {mediums.map((m) => (
              <option key={m.id} value={m.id} className="dark:bg-stone-900">{m.label}</option>
            ))}
          </select>
        </div>

        {/* Research Status */}
        <div>
          <label className="text-[10px] uppercase text-stone-400 dark:text-stone-500 block mb-1">
            Epistemic Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400"
          >
            <option value="all" className="dark:bg-stone-900">All Research Statuses</option>
            <option value="CONFIRMED" className="dark:bg-stone-900">Confirmed Biographies</option>
            <option value="ATTRIBUTED" className="dark:bg-stone-900">Attributed / Stylistic</option>
            <option value="UNIDENTIFIED" className="dark:bg-stone-900">Unidentified Monograms</option>
          </select>
        </div>
      </div>

      {/* Active Filter Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800/80 text-xs font-mono">
        <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
          <Filter size={12} />
          <span>
            Displaying <strong className="text-stone-900 dark:text-stone-100">{filteredCount}</strong> of{' '}
            {totalCount} catalogued creators
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
          >
            <RotateCcw size={11} />
            <span>Reset Author Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
