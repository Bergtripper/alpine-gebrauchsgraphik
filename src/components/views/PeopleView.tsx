import React, { useState, useMemo } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { AuthorUniverseView } from '../people/AuthorUniverseView';
import { PeopleFilterToolbar } from '../people/PeopleFilterToolbar';
import { PeopleCatalogCard } from '../people/PeopleCatalogCard';
import { Users, RotateCcw } from 'lucide-react';

export const PeopleView: React.FC = () => {
  const {
    filteredPeople,
    openEntity,
    getConnectedEntities,
    activeAuthor,
    selectAuthor,
    exitAuthorMode,
    setActiveTab,
    setComparison,
  } = useAtlas();

  // Local View States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter authors list
  const filteredAuthorsList = useMemo(() => {
    return filteredPeople.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCity = p.cities.some((c) => c.toLowerCase().includes(q));
        const matchesBio = p.biography.toLowerCase().includes(q);
        const matchesProfession = p.professions.some((pr) => pr.toLowerCase().includes(q));
        const matchesTrait = p.visualCharacteristics.some((v) => v.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesBio && !matchesProfession && !matchesTrait) {
          return false;
        }
      }

      // 2. Epistemic Research Status
      if (selectedStatus !== 'all' && p.researchStatus !== selectedStatus) {
        return false;
      }

      // 3. Region
      if (selectedRegion !== 'all') {
        const r = selectedRegion.toLowerCase();
        const matchesNation = p.nationality.toLowerCase().includes(r);
        const matchesPlace = p.associatedPlaces.some((ap) => ap.toLowerCase().includes(r));
        if (!matchesNation && !matchesPlace) return false;
      }

      // 4. Decade / Period
      if (selectedDecade !== 'all') {
        const dec = parseInt(selectedDecade, 10);
        const decEnd = dec + 9;
        if (p.activeEnd < dec || p.activeStart > decEnd) {
          return false;
        }
      }

      // 5. Discipline
      if (selectedDiscipline !== 'all') {
        const d = selectedDiscipline.toLowerCase();
        if (!p.professions.some((prof) => prof.toLowerCase().includes(d))) {
          return false;
        }
      }

      // 6. Medium Filter via connected works
      if (selectedMedium !== 'all') {
        const conns = getConnectedEntities(p.id);
        if (selectedMedium === 'Posters' && !conns.works.some((w) => w.category === 'Poster')) {
          return false;
        }
        if (selectedMedium === 'Hotel Labels' && !conns.works.some((w) => w.category === 'Hotel Label')) {
          return false;
        }
        if (selectedMedium === 'Brochures' && !conns.works.some((w) => w.category === 'Brochure' || w.category === 'Catalogue')) {
          return false;
        }
        if (selectedMedium === 'Panoramic Maps' && !conns.works.some((w) => w.category === 'Panoramic Map')) {
          return false;
        }
      }

      return true;
    });
  }, [
    filteredPeople,
    searchQuery,
    selectedStatus,
    selectedRegion,
    selectedDecade,
    selectedDiscipline,
    selectedMedium,
    getConnectedEntities,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedStatus !== 'all' ||
    selectedRegion !== 'all' ||
    selectedDecade !== 'all' ||
    selectedDiscipline !== 'all' ||
    selectedMedium !== 'all';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedRegion('all');
    setSelectedDecade('all');
    setSelectedDiscipline('all');
    setSelectedMedium('all');
  };

  // If an author is actively selected, render their complete AUTHOR UNIVERSE view!
  if (activeAuthor) {
    const connections = getConnectedEntities(activeAuthor.id);

    return (
      <AuthorUniverseView
        activeAuthor={activeAuthor}
        connections={connections}
        exitAuthorMode={exitAuthorMode}
        openEntity={openEntity}
        setActiveTab={setActiveTab}
        setComparison={setComparison}
      />
    );
  }

  // DEFAULT VIEW: Clean, Author-First Primary Entry Point
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5 transition-colors">
        <div className="text-xs uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 mb-1">
          PRIMARY EXPLORATION · RESEARCH CORPUS OF AUTHORS
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif text-stone-950 dark:text-stone-50 tracking-tight font-black">
              Authors & Designers
            </h1>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl mt-1.5 leading-relaxed">
              Begin by selecting an author to explore their dedicated <strong>Author Universe</strong> — their catalogue of works, geographic routes, client networks, and stylistic signature.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('explore')}
              className="px-3.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-mono font-semibold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
            >
              Open Global Atlas ↗
            </button>
          </div>
        </div>
      </div>

      {/* Multifaceted Search & Filters Toolbar */}
      <PeopleFilterToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedDecade={selectedDecade}
        onDecadeChange={setSelectedDecade}
        selectedDiscipline={selectedDiscipline}
        onDisciplineChange={setSelectedDiscipline}
        selectedMedium={selectedMedium}
        onMediumChange={setSelectedMedium}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetAllFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filteredCount={filteredAuthorsList.length}
        totalCount={filteredPeople.length}
      />

      {/* Authors Catalog Display */}
      {filteredAuthorsList.length === 0 ? (
        <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-12 text-center space-y-3 font-mono">
          <Users size={32} className="mx-auto text-stone-400" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            No Authors Found
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            No designers matched your selected criteria or search term. Try broadening your filter settings.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-3 px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs rounded hover:bg-black dark:hover:bg-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw size={12} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-3'}>
          {filteredAuthorsList.map((person) => {
            const connections = getConnectedEntities(person.id);
            const sampleWorks = connections.works.slice(0, 2);

            return (
              <PeopleCatalogCard
                key={person.id}
                person={person}
                sampleWorks={sampleWorks}
                totalWorksCount={connections.works.length}
                selectAuthor={selectAuthor}
                setComparison={setComparison}
                setActiveTab={setActiveTab}
                viewMode={viewMode}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
