import React, { useState } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { Clock, RotateCcw, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import { cn } from '../../lib/cn';

export const PersistentTimeline: React.FC = () => {
  const { filters, updateFilter, selectDecade, resetFilters } = useAtlas();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const decades = [
    { label: 'ALL (1900—1970)', start: 1900, end: 1970 },
    { label: '1900s (Secession)', start: 1900, end: 1909 },
    { label: '1910s (Early Rail)', start: 1910, end: 1919 },
    { label: '1920s (Modernism)', start: 1920, end: 1929 },
    { label: '1930s (Golden Age)', start: 1930, end: 1939 },
    { label: '1940s (War & Post)', start: 1940, end: 1949 },
    { label: '1950s (Ski Boom)', start: 1950, end: 1959 },
    { label: '1960s (Swiss Style)', start: 1960, end: 1970 },
  ];

  const handleStartYearChange = (val: number) => {
    const clamped = Math.min(val, filters.endYear);
    updateFilter('startYear', clamped);
  };

  const handleEndYearChange = (val: number) => {
    const clamped = Math.max(val, filters.startYear);
    updateFilter('endYear', clamped);
  };

  const isFiltered = filters.startYear > 1900 || filters.endYear < 1970;

  return (
    <footer
      aria-label="Chronological Global Control Bar"
      className="sticky bottom-0 z-30 w-full bg-[#FAF9F5]/95 dark:bg-[#090b10]/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 transition-colors select-none text-xs font-mono"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col gap-2">
        {/* Top Mini Control Line */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">
              <Clock size={12} className="text-amber-500" />
              <span>TIMELINE FILTER:</span>
            </span>
            <span className="font-bold text-stone-900 dark:text-white px-2 py-0.5  bg-stone-200 dark:bg-stone-800">
              {filters.startYear} — {filters.endYear}
            </span>
            {isFiltered && (
              <button
                onClick={() => selectDecade(null)}
                className="text-[10px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-0.5 cursor-pointer underline"
                title="Reset year range to 1900-1970"
              >
                <RotateCcw size={10} />
                <span>All Years</span>
              </button>
            )}
          </div>

          {/* Quick Decade Selector Chips */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            {decades.map((d) => {
              const isActive = filters.startYear === d.start && filters.endYear === d.end;
              return (
                <button
                  key={d.label}
                  onClick={() => selectDecade(d.start, d.end)}
                  className={cn(
                    'px-2 py-0.5 text-[10px]  border transition-colors cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-bold border-stone-900 dark:border-amber-400'
                      : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                  )}
                >
                  {d.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100  hover:bg-stone-200/60 dark:hover:bg-stone-800 cursor-pointer flex items-center gap-1"
            title="Toggle Slider Bar"
          >
            <span className="hidden sm:inline text-[10px]">
              {isExpanded ? 'Hide Slider' : 'Show Slider'}
            </span>
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        {/* Dual Thumb Range Sliders */}
        {isExpanded && (
          <div className="pt-1 pb-1">
            <div className="relative flex items-center gap-3">
              <span className="text-[10px] text-stone-500 font-bold">1900</span>
              
              <div className="relative flex-1 flex flex-col">
                {/* Year Tick Marks */}
                <div className="flex justify-between text-[9px] text-stone-400 dark:text-stone-600 px-1 mb-1">
                  <span>1900</span>
                  <span>1910</span>
                  <span>1920</span>
                  <span>1930</span>
                  <span>1940</span>
                  <span>1950</span>
                  <span>1960</span>
                  <span>1970</span>
                </div>

                <div className="relative h-6 flex items-center">
                  {/* Base Track */}
                  <div className="absolute w-full h-1.5 bg-stone-200 dark:bg-stone-800 -full" />
                  
                  {/* Highlighted Selected Span */}
                  <div
                    className="absolute h-1.5 bg-stone-900 -full pointer-events-none"
                    style={{
                      left: `${((filters.startYear - 1900) / 70) * 100}%`,
                      right: `${100 - ((filters.endYear - 1900) / 70) * 100}%`,
                    }}
                  />

                  {/* Dual Range Inputs */}
                  <input
                    type="range"
                    min="1900"
                    max="1970"
                    value={filters.startYear}
                    onChange={(e) => handleStartYearChange(parseInt(e.target.value))}
                    className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-auto cursor-pointer accent-stone-900 dark:accent-amber-400"
                  />
                  <input
                    type="range"
                    min="1900"
                    max="1970"
                    value={filters.endYear}
                    onChange={(e) => handleEndYearChange(parseInt(e.target.value))}
                    className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-auto cursor-pointer accent-stone-900 dark:accent-amber-400"
                  />
                </div>
              </div>

              <span className="text-[10px] text-stone-500 font-bold">1970</span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
