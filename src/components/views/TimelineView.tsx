import React, { useState, useMemo } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { PEOPLE, PUBLICATIONS, HISTORICAL_MILESTONES } from '../../data';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { AlpineSurveyMotif } from '../common/AlpineSurveyMotif';

export const TimelineView: React.FC = () => {
  const {
    filteredWorks,
    openEntity,
    updateFilter,
    activeAuthor,
    authorScopeOnly,
    toggleAuthorScope,
    selectAuthor,
  } = useAtlas();
  const [selectedDecade, setSelectedDecade] = useState<number | 'all'>('all');

  const startBound = selectedDecade === 'all' ? 1900 : selectedDecade;
  const endBound = selectedDecade === 'all' ? 1970 : selectedDecade + 9;
  const totalYears = endBound - startBound + 1;

  const getPositionPercent = (year: number) => {
    const clamped = Math.max(startBound, Math.min(endBound, year));
    return ((clamped - startBound) / (totalYears - 1)) * 100;
  };

  const worksInScope = useMemo(() => {
    return filteredWorks.filter((w) => w.year >= startBound && w.year <= endBound);
  }, [filteredWorks, startBound, endBound]);

  const milestonesInScope = useMemo(() => {
    return HISTORICAL_MILESTONES.filter((m) => m.year >= startBound && m.year <= endBound);
  }, [startBound, endBound]);

  const decades = [
    { label: 'All (1900–1970)', val: 'all' as const },
    { label: '1900s', val: 1900 },
    { label: '1910s', val: 1910 },
    { label: '1920s', val: 1920 },
    { label: '1930s', val: 1930 },
    { label: '1940s', val: 1940 },
    { label: '1950s', val: 1950 },
    { label: '1960s', val: 1960 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title & Chronology Controls */}
      <div className="relative border-b border-stone-300 dark:border-stone-700 pb-5 transition-colors survey-cut">
        <div className="absolute right-0 top-0 w-64 hidden lg:block opacity-60">
          <AlpineSurveyMotif variant="section" />
        </div>
        <div className="survey-coordinate text-stone-500 dark:text-stone-400 mb-2 pt-3">
          SURVEY 03 / CHRONOLOGY · 1900—1970
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="survey-title text-3xl sm:text-5xl text-stone-900 dark:text-stone-50 max-w-4xl">
              Horizontal Chronology of Alpine Visual Culture
            </h1>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl mt-1.5 leading-relaxed">
              Trace the simultaneous emergence of alpine railway campaigns, winter sport iconography, avant-garde periodicals, and designers’ lifespans.
            </p>
          </div>

          {/* Decade Zoom Selector */}
          <div className="flex flex-wrap gap-1 border border-stone-300 dark:border-stone-700 p-1 bg-white dark:bg-stone-900">
            {decades.map((d) => (
              <button
                key={d.label}
                onClick={() => {
                  setSelectedDecade(d.val);
                  if (d.val !== 'all') {
                    updateFilter('startYear', d.val);
                    updateFilter('endYear', d.val + 9);
                  } else {
                    updateFilter('startYear', 1900);
                    updateFilter('endYear', 1970);
                  }
                }}
                className={`px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                  selectedDecade === d.val
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Author Universe Scoped Banner */}
      {activeAuthor && (
        <div className="p-3 bg-transparent dark:bg-transparent border border-stone-300 dark:border-stone-700  text-xs font-mono flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-900 dark:text-stone-200">
            <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-stone-100 animate-pulse" />
            <span>
              Author-Scoped Timeline: <strong>{activeAuthor.name}</strong> ({activeAuthor.activeYears})
            </span>
          </div>
          <button
            onClick={toggleAuthorScope}
            className="text-[11px] underline text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 cursor-pointer"
          >
            {authorScopeOnly ? 'Show Full Alpine Scope' : 'Limit to Author Only'}
          </button>
        </div>
      )}

      {/* Main Interactive Chronological Board */}
      <div className="bg-white dark:bg-[#10141c] border border-stone-300 dark:border-stone-800  p-6 space-y-10  overflow-x-auto min-w-[760px] transition-colors">
        {/* Top Year Ruler */}
        <div className="relative h-12 border-b border-stone-300 dark:border-stone-800">
          {Array.from({ length: selectedDecade === 'all' ? 8 : 10 }).map((_, i) => {
            const yr =
              selectedDecade === 'all' ? 1900 + i * 10 : (selectedDecade as number) + i;
            const leftPercent = getPositionPercent(yr);

            return (
              <div
                key={yr}
                className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                style={{ left: `${leftPercent}%` }}
              >
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-200">
                  {yr}
                </span>
                <div className="w-[1px] h-3 bg-stone-400 dark:bg-stone-600 mt-1" />
              </div>
            );
          })}
        </div>

        {/* Lane 1: Historical Milestones & Tourism Developments */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-stone-100 inline-block " />
            <span>Tourism & Infrastructure Milestones</span>
          </div>

          <div className="relative h-20 bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 p-2">
            {milestonesInScope.map((m, idx) => {
              const leftPercent = getPositionPercent(m.year);
              return (
                <div
                  key={idx}
                  className="absolute top-2 -translate-x-1/2 group cursor-pointer"
                  style={{ left: `${leftPercent}%` }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-stone-900 dark:bg-stone-100 border-2 border-white dark:border-stone-900  flex items-center justify-center group-hover:scale-130 transition-transform" />
                  <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 w-64 bg-stone-900 text-white text-xs font-mono p-3 shadow-xl z-30 pointer-events-none border border-stone-700">
                    <div className="text-[#C26452] font-bold mb-1">
                      {m.year} · {m.category}
                    </div>
                    <div className="font-serif font-bold text-sm mb-1">{m.title}</div>
                    <div className="text-stone-300 text-[11px] leading-relaxed">
                      {m.description}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-stone-700 dark:text-stone-300 font-semibold block mt-1 whitespace-nowrap max-w-[100px] truncate">
                    {m.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lane 2: Creators' Lifespans & Active Eras */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-stone-200 inline-block" />
            <span>Designers & Illustrators Active Spans</span>
          </div>

          <div className="relative space-y-2 py-1">
            {PEOPLE.map((p) => {
              const startPct = getPositionPercent(p.activeStart);
              const endPct = getPositionPercent(p.activeEnd);
              const widthPct = Math.max(3, endPct - startPct);
              const isActive = activeAuthor?.id === p.id;

              return (
                <div key={p.id} className="relative h-7 flex items-center group">
                  <div
                    onClick={() => {
                      selectAuthor(p.id);
                      openEntity(p.id, 'person');
                    }}
                    className={`absolute h-6 px-2.5 flex items-center justify-between text-xs font-mono cursor-pointer transition-all  ${
                      isActive
                        ? 'bg-[#9E3E2F] text-white font-bold z-10'
                        : 'bg-stone-900 dark:bg-stone-200 hover:bg-stone-700 dark:hover:bg-white text-white dark:text-stone-950 font-semibold'
                    }`}
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                    title={`${p.name} (Active: ${p.activeYears})`}
                  >
                    <span className="truncate">{p.name}</span>
                    <span className="text-[10px] opacity-75 hidden sm:inline ml-2">
                      {p.activeYears}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lane 3: Catalogued Works */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            <span>Catalogued Works Produced ({worksInScope.length})</span>
          </div>

          <div className="relative min-h-[160px] bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 p-4">
            {worksInScope.map((w, index) => {
              const leftPct = getPositionPercent(w.year);
              const staggerY = (index % 3) * 44;

              return (
                <div
                  key={w.id}
                  onClick={() => openEntity(w.id, 'work')}
                  className="absolute cursor-pointer group -translate-x-1/2 transition-transform hover:z-30 hover:scale-105"
                  style={{ left: `${leftPct}%`, top: `${15 + staggerY}px` }}
                >
                  <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700  hover:border-stone-900 dark:hover:border-amber-400 max-w-[200px] transition-colors">
                    <div className="w-6 h-8 bg-stone-200 dark:bg-stone-800 overflow-hidden shrink-0">
                      <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                    </div>
                    <div className="truncate text-left">
                      <div className="text-[11px] font-serif font-bold text-stone-950 dark:text-stone-100 truncate">
                        {w.title}
                      </div>
                      <div className="text-[9px] font-mono text-stone-500 dark:text-stone-400">
                        {w.creatorName.split(' ')[1]} · {w.yearDisplay}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lane 4: Periodicals & Publications */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
            <span>Magazines & Trade Catalogues</span>
          </div>

          <div className="relative space-y-2 py-1">
            {PUBLICATIONS.map((pub) => {
              const startPct = getPositionPercent(pub.startYear);
              const endPct = getPositionPercent(pub.endYear || pub.startYear + 1);
              const widthPct = Math.max(4, endPct - startPct);

              return (
                <div key={pub.id} className="relative h-6 flex items-center">
                  <div
                    onClick={() => openEntity(pub.id, 'publication')}
                    className="absolute h-5 bg-purple-900 dark:bg-purple-700 hover:bg-purple-800 dark:hover:bg-purple-600 text-white px-2 flex items-center text-[11px] font-mono cursor-pointer transition-colors "
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  >
                    <span className="truncate">{pub.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
