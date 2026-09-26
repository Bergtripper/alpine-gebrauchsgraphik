import React, { useMemo } from 'react';
import { Person, Work, Relationship } from '../../types/atlas';
import { PLACES } from '../../data';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { ResearchStatusBadge } from '../ui/EntityBadge';
import { ElevationProfile } from '../ui/ElevationProfile';
import { generateRouteProfile } from '../../lib/elevationUtils';
import { Sliders, Share2, AlertCircle, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { cn } from '../../lib/cn';

interface AuthorUniverseViewProps {
  activeAuthor: Person;
  connections: {
    relationships: Relationship[];
    people: Person[];
    works: Work[];
  };
  exitAuthorMode: () => void;
  openEntity: (id: string, type: any) => void;
  setActiveTab: (tab: any) => void;
  setComparison: (mode: any, id1: string, id2: string) => void;
}

export const AuthorUniverseView: React.FC<AuthorUniverseViewProps> = ({
  activeAuthor,
  connections,
  exitAuthorMode,
  openEntity,
  setActiveTab,
  setComparison,
}) => {
  const authorWorks = connections.works;

  // Career Elevation Profile: Collect elevations of associated cities/places
  const careerElevations = useMemo(() => {
    const elevations: number[] = [];
    
    // Add primary cities
    activeAuthor.cities.forEach(cityName => {
      const p = PLACES.find(pl => pl.name.toLowerCase() === cityName.toLowerCase());
      if (p) elevations.push(p.elevationMeters);
    });
    
    // Add associated places
    activeAuthor.associatedPlaces.forEach(placeName => {
      const p = PLACES.find(pl => pl.name.toLowerCase() === placeName.toLowerCase());
      if (p) elevations.push(p.elevationMeters);
    });

    if (elevations.length < 2) return [];
    return generateRouteProfile(elevations);
  }, [activeAuthor]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in relative">
      {/* Background unique flourish: Mountain Silhouette */}
      <div className="absolute top-0 right-0 left-0 h-64 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10 overflow-hidden">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full text-stone-900">
          <path d="M0,200 L0,150 L100,100 L250,170 L400,60 L550,140 L700,20 L850,120 L1000,80 L1000,200 Z" fill="currentColor" />
        </svg>
      </div>

      {/* 1. Header: Curatorial Identity */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="space-y-4 max-w-3xl">
          <button
            onClick={exitAuthorMode}
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>← RETURN TO ALL AUTHORS</span>
          </button>
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-950 dark:text-stone-50 tracking-tighter">
                {activeAuthor.name}
              </h1>
              <ResearchStatusBadge status={activeAuthor.researchStatus || 'CONFIRMED'} size="sm" />
            </div>
            
            <div className="text-sm sm:text-base font-serif italic text-stone-600 dark:text-stone-400 flex flex-wrap items-center gap-2 pt-1">
              <span>{activeAuthor.birthYear ?? 'unknown'}—{activeAuthor.deathYear || (activeAuthor.researchStatus === 'UNIDENTIFIED' ? 'uncertain' : 'present')}</span>
              <span className="text-stone-300">/</span>
              <span>{activeAuthor.nationality}</span>
              <span className="text-stone-300">/</span>
              <span>{activeAuthor.professions.join(' · ')}</span>
            </div>
          </div>
        </div>

        {/* Top Right Action Block */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="bg-stone-50 dark:bg-stone-900/50 p-3 rounded-lg border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
              EXPLORATION ACTIONS
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setComparison('artist', activeAuthor.id, '');
                  setActiveTab('compare');
                }}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded border border-stone-300 dark:border-stone-700 transition-colors flex items-center justify-between gap-2 cursor-pointer text-xs font-mono font-bold"
              >
                <span>Compare with Contemporary</span>
                <Sliders size={13} />
              </button>

              <button
                onClick={() => setActiveTab('explore')}
                className="w-full px-3 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold rounded hover:bg-black dark:hover:bg-white transition-colors flex items-center justify-between gap-2 cursor-pointer shadow-sm text-xs font-mono"
              >
                <span>Follow Connections</span>
                <Share2 size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Career Elevation Profile Section (Unique Element) */}
      {careerElevations.length > 0 && (
        <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-xl p-6 alpine-shadow overflow-hidden relative group transition-all">
          {/* Decorative topo background */}
          <div className="absolute inset-0 opacity-5 bg-topo-light dark:bg-topo-dark pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2">
                <MapPin size={12} />
                <span>Geographic Altimetric Profile</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Career Altitude Trajectory
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md leading-relaxed font-sans">
                Tracing the elevation of {activeAuthor.name}'s professional hubs and commissioned alpine destinations, from valleys to high-altitude resorts.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {activeAuthor.cities.map(c => (
                  <span key={c} className="text-[10px] font-mono px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:w-3/5">
              <ElevationProfile 
                points={careerElevations} 
                height={120} 
                label="ALPINE ELEVATION SCALE (METERS)"
                className="py-4"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Thematic Narrative Grid (Asymmetric) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Biography Column (70%) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
              01 / CURATORIAL SYNTHESIS
            </div>
            <p className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100 leading-relaxed text-justify first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-amber-600">
              {activeAuthor.biography}
            </p>
            
            {/* Visual DNA Highlight */}
            <div className="bg-stone-50 dark:bg-stone-900/40 p-8 rounded-lg border-l-4 border-amber-500 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-500" />
                <span>Formal Characteristics & Visual Signature</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeAuthor.visualCharacteristics.map((trait, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-amber-600 font-serif font-black text-lg">0{idx + 1}.</span>
                    <span className="text-sm font-sans text-stone-700 dark:text-stone-300 leading-tight pt-1">
                      {trait}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Catalogued Works Showcase */}
          <div className="space-y-6 pt-6">
            <div className="flex items-end justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                02 / IDENTIFIED WORKS ({authorWorks.length})
              </div>
              <button
                onClick={() => setActiveTab('works')}
                className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Full Catalogue</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {authorWorks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authorWorks.map((work) => (
                  <div
                    key={work.id}
                    onClick={() => openEntity(work.id, 'work')}
                    className="group flex flex-col space-y-3 cursor-pointer"
                  >
                    <div className="aspect-[3/4] bg-stone-100 dark:bg-stone-900 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 transition-all group-hover:alpine-shadow group-hover:-translate-y-1">
                      <ArtworkVisualizer work={work} size="lg" showPalette={false} interactiveZoom={false} />
                    </div>
                    <div className="space-y-1 px-1">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-stone-500">
                        <span>{work.category}</span>
                        <span>{work.yearDisplay}</span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 transition-colors">
                        {work.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl text-center font-mono text-stone-400 text-xs">
                No catalogued works currently linked. Check archive sources.
              </div>
            )}
          </div>
        </div>

        {/* Marginalia / Sidebar Column (30%) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-8 space-y-8">
            {/* Identity Note Callout */}
            {activeAuthor.identityNotes && (
              <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-sans italic text-amber-900 dark:text-amber-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 opacity-20">
                  <AlertCircle size={40} />
                </div>
                <div className="relative z-10 space-y-2">
                  <strong className="block not-italic font-mono uppercase tracking-widest text-[9px]">RESEARCHER'S NOTE:</strong>
                  {activeAuthor.identityNotes}
                </div>
              </div>
            )}

            {/* Institutional Network Sidebar */}
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                PATRONAGE & CLIENTS
              </div>
              <div className="space-y-3">
                {activeAuthor.associatedCompanies.map((c, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded flex items-center justify-between group hover:border-amber-400 transition-colors">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{c}</span>
                    <span className="text-[9px] font-mono text-stone-400 group-hover:text-amber-600 uppercase">Partner</span>
                  </div>
                ))}
                {activeAuthor.associatedInstitutions.map((inst, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded flex items-center justify-between group hover:border-amber-400 transition-colors">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{inst}</span>
                    <span className="text-[9px] font-mono text-stone-400 group-hover:text-amber-600 uppercase">Institutional</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Relations List */}
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                ACTIVE RELATIONS
              </div>
              <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden bg-white dark:bg-stone-900">
                {connections.relationships.slice(0, 6).map((rel) => {
                  const targetName = rel.sourceId === activeAuthor.id ? rel.targetName : rel.sourceName;
                  const targetType = rel.sourceId === activeAuthor.id ? rel.targetType : rel.sourceType;
                  return (
                    <div key={rel.id} className="p-3 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                      <div className="truncate">
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{targetName}</div>
                        <div className="text-[9px] uppercase text-amber-600 font-mono tracking-tighter">{rel.relationLabel}</div>
                      </div>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-500 rounded uppercase">{targetType}</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setActiveTab('explore')}
                className="w-full text-center text-[10px] font-mono font-bold text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors uppercase tracking-widest"
              >
                Expand Network Graph +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

