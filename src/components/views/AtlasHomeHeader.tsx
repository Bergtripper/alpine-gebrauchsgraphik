import React, { useState } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { ATLAS_STATS } from '../../data/atlasData';
import { Users, MapPin, Clock, Dna, ChevronUp, ChevronDown, Compass, Sun, Moon } from 'lucide-react';
import { AlpineSurveyMotif } from '../common/AlpineSurveyMotif';

export const AtlasHomeHeader: React.FC = () => {
  const { setActiveTab, updateFilter, theme, toggleTheme, selectAuthor } = useAtlas();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const curatedPathways = [
    { label: 'Browse Author Corpus (25 Designers)', action: () => { setActiveTab('people'); } },
    { label: 'Swiss Modernist Photomontage', action: () => { selectAuthor('herbert-matter'); setActiveTab('people'); } },
    { label: 'Alpine Grand Hotel Labels', action: () => { updateFilter('category', 'Hotel Label'); setActiveTab('works'); } },
    { label: 'Walter Herdeg & St. Moritz', action: () => { selectAuthor('walter-herdeg'); setActiveTab('people'); } },
    { label: 'Arthur Zelger Modernism', action: () => { selectAuthor('arthur-zelger'); setActiveTab('people'); } },
    { label: 'Heinrich C. Berann Panoramas', action: () => { selectAuthor('heinrich-c-berann'); setActiveTab('people'); } },
    { label: '1930s Golden Age of Posters', action: () => { updateFilter('startYear', 1930); updateFilter('endYear', 1939); setActiveTab('timeline'); } },
    { label: 'Morphological Visual DNA', action: () => { setActiveTab('visual_dna'); } },
  ];

  return (
    <div className="relative border-b border-stone-200 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#0c0e14] transition-colors overflow-hidden">
      {
      {/* Constructivist Alpine ridge — analytical interface motif */}
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-70 pointer-events-none">
        <AlpineSurveyMotif variant="ridge" />
      </div>
      <div className="absolute right-[12%] top-0 h-full w-24 -skew-x-[28deg] bg-[#9E3E2F]/8 dark:bg-[#B65443]/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300">
                DOTZERO
              </span>
              <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500 dark:text-stone-400">
                / RESEARCH ATLAS
              </span>
            </div>
            
            <h1 className="survey-title text-4xl sm:text-6xl text-stone-950 dark:text-stone-50 leading-[0.92] max-w-4xl">
              ALPINE GEBRAUCHSGRAPHIK
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 survey-coordinate text-stone-600 dark:text-stone-300">
              <span>46°32' N — 11°52' E</span>
              <span className="survey-accent">1900—1970</span>
              <span>ALPINE VISUAL CULTURE / SURVEY 01</span>
            </div>
            <div className="text-sm sm:text-base font-serif italic text-stone-700 dark:text-stone-300 pt-1">
              Atlas of Alpine Visual Culture
            </div>
            
            <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
              How was the modern visual culture of the Alps constructed through applied graphic design? An interactive research atlas investigating posters, hotel labels, typography, tourism advertising, railways, and alpine networks across South Tyrol, Tyrol, the Dolomites, Switzerland, and Northern Italy.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            {/* Quick Theme Switcher in Banner */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 text-xs font-mono border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Inverti tema globale"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="text-stone-300" />
                  <span className="hidden sm:inline">Tema Scuro</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-stone-700" />
                  <span className="hidden sm:inline">Tema Chiaro</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
              title="Toggle Project Metrics"
            >
              {isCollapsed ? (
                <>
                  <span className="hidden sm:inline">Espandi Metriche</span>
                  <ChevronDown size={14} />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Compatto</span>
                  <ChevronUp size={14} />
                </>
              )}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="mt-6 space-y-6 pt-5 border-t border-stone-200/80 dark:border-stone-800/80">
            {/* Live Data-Driven Statistics Grid with Alpine Accent Borders */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
              <div className="p-3 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 border-l-3 border-l-red-500  hover:border-stone-400 dark:hover:border-stone-600 transition-all">
                <span className="text-2xl font-bold font-mono text-stone-950 dark:text-stone-100 block">
                  {ATLAS_STATS.peopleCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400 uppercase text-[10px] tracking-wider font-semibold">
                  Creators & Artists
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 border-l-3 border-l-blue-500  hover:border-stone-400 dark:hover:border-stone-600 transition-all">
                <span className="text-2xl font-bold font-mono text-stone-950 dark:text-stone-100 block">
                  {ATLAS_STATS.worksCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400 uppercase text-[10px] tracking-wider font-semibold">
                  Posters & Objects
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 border-l-3 border-l-amber-500  hover:border-stone-400 dark:hover:border-stone-600 transition-all">
                <span className="text-2xl font-bold font-mono text-stone-950 dark:text-stone-100 block">
                  {ATLAS_STATS.placesCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400 uppercase text-[10px] tracking-wider font-semibold">
                  Alpine Nodes
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 border-l-3 border-l-purple-500  hover:border-stone-400 dark:hover:border-stone-600 transition-all">
                <span className="text-2xl font-bold font-mono text-stone-950 dark:text-stone-100 block">
                  {ATLAS_STATS.publicationsCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400 uppercase text-[10px] tracking-wider font-semibold">
                  Periodicals & Catalogues
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 border-l-3 border-l-emerald-500  hover:border-stone-400 dark:hover:border-stone-600 transition-all">
                <span className="text-2xl font-bold font-mono text-stone-950 dark:text-stone-100 block">
                  {ATLAS_STATS.connectionsCount}
                </span>
                <span className="text-stone-500 dark:text-stone-400 uppercase text-[10px] tracking-wider font-semibold">
                  Graph Edges
                </span>
              </div>
            </div>

            {/* Curated Research Pathways Fast Launch */}
            <div className="pt-1 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 uppercase tracking-widest text-[11px] font-semibold">
                <span className="w-8 h-px bg-[#9E3E2F] dark:bg-[#B65443]" />
                <span>Curated Research Pathways:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {curatedPathways.map((pathway, idx) => (
                  <button
                    key={idx}
                    onClick={pathway.action}
                    className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-all cursor-pointer text-[11px]"
                  >
                    {pathway.label} →
                  </button>
                ))}
              </div>
            </div>

            {/* Explore By Navigation Gates */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono pt-1">
              <span className="text-stone-500 dark:text-stone-400 uppercase tracking-widest text-[11px] font-semibold">
                Navigate Atlas Modes:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('people')}
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Users size={13} />
                  <span>People</span>
                </button>
                <button
                  onClick={() => setActiveTab('works')}
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Compass size={13} />
                  <span>Works</span>
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin size={13} />
                  <span>Map</span>
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Clock size={13} />
                  <span>Timeline</span>
                </button>
                <button
                  onClick={() => setActiveTab('visual_dna')}
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Dna size={13} />
                  <span>Visual DNA</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

