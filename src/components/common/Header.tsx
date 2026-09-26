import React, { useState, useRef, useEffect } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ViewTab, MapScale } from '../../types/atlas';
import {
  SlidersHorizontal,
  Menu,
  X,
  RotateCcw,
  Sun,
  Moon,
  ChevronDown,
  Layers,
  Sparkles,
  Type,
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface HeaderProps {
  onToggleFilterBar: () => void;
  isFilterBarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleFilterBar, isFilterBarOpen }) => {
  const {
    activeTab,
    setActiveTab,
    activeFilterCount,
    resetFilters,
    theme,
    toggleTheme,
    activeMapScale,
    setActiveMapScale,
    dotzeroProject,
    setDotzeroProject,
  } = useAtlas();

  const { textScale, togglePanel: toggleA11yPanel } = useAccessibility();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [mapDropdownOpen, setMapDropdownOpen] = useState(false);

  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const mapDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target as Node)
      ) {
        setProjectDropdownOpen(false);
      }
      if (mapDropdownRef.current && !mapDropdownRef.current.contains(event.target as Node)) {
        setMapDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: ViewTab; label: string; isDropdown?: boolean }[] = [
    { id: 'people', label: 'People' },
    { id: 'works', label: 'Works' },
    { id: 'map', label: 'Map', isDropdown: true },
    { id: 'timeline', label: 'Timeline' },
    { id: 'visual_dna', label: 'Visual DNA' },
    { id: 'archive', label: 'Archive' },
    { id: 'compare', label: 'Compare' },
    { id: 'explore', label: 'Atlas / Network' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 dark:bg-[#090b10]/95  border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Zone 1: DOTZERO Family Dropdown & Wordmark */}
        <div className="flex items-center gap-3">
          {/* DOTZERO Project Family Switcher */}
          <div className="relative" ref={projectDropdownRef}>
            <button
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest font-bold px-2 py-1 bg-stone-200/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer select-none"
              title="DOTZERO Research Ecosystem Projects"
            >
              <span>DOTZERO</span>
              <ChevronDown size={11} className={cn('transition-transform', projectDropdownOpen && 'rotate-180')} />
            </button>

            {projectDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 py-1 z-50 text-xs font-mono">
                <div className="px-3 py-1.5 text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800">
                  DOTZERO Research Ecosystem
                </div>
                <button
                  onClick={() => {
                    setDotzeroProject('alpine-graphic-atlas');
                    setActiveTab('people');
                    setProjectDropdownOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 flex items-center justify-between hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer',
                    dotzeroProject === 'alpine-graphic-atlas' && 'bg-stone-50 dark:bg-stone-800/60 font-bold text-stone-900 dark:text-stone-100'
                  )}
                >
                  <div>
                    <div className="text-stone-900 dark:text-white">Alpine Gebrauchsgraphik</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">Atlas of Alpine Visual Culture · 1900—1970</div>
                  </div>
                  {dotzeroProject === 'alpine-graphic-atlas' && <span className="text-xs">✓</span>}
                </button>

                <div className="border-t border-stone-100 dark:border-stone-800 my-0.5" />

                <div className="px-3 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer flex items-center justify-between">
                  <div>
                    <div className="text-stone-800 dark:text-stone-200">Avant-Garde Atlas</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">Modernist Movements · 1900—1939</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    Sibling
                  </span>
                </div>
              </div>
            )}
          </div>

          <span className="text-stone-300 dark:text-stone-700 hidden sm:inline">/</span>

          {/* Project Title */}
          <button
            onClick={() => setActiveTab('people')}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-8 h-8 relative flex items-center justify-center bg-stone-900 dark:bg-stone-100-sm transform transition-colors duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white dark:text-stone-950 transition-colors duration-200">
                <path d="M3 18 L9 6 L12 12 L16 4 L21 18 Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors uppercase">
              Alpine Gebrauchsgraphik
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Matching Avant-Garde Atlas) */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
          {navItems.map((item) => {
            if (item.isDropdown && item.id === 'map') {
              return (
                <div key={item.id} className="relative" ref={mapDropdownRef}>
                  <button
                    onClick={() => {
                      setActiveTab('map');
                      setMapDropdownOpen(!mapDropdownOpen);
                    }}
                    className={cn(
                      'flex items-center gap-1 py-1 transition-colors cursor-pointer relative',
                      activeTab === 'map'
                        ? 'text-stone-950 dark:text-white font-bold'
                        : 'hover:text-stone-950 dark:hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={11} className={cn('transition-transform', mapDropdownOpen && 'rotate-180')} />
                    {activeTab === 'map' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 dark:bg-stone-100" />
                    )}
                  </button>

                  {/* MAP Geographic Scales Dropdown */}
                  {mapDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 py-1 z-50 text-xs font-mono">
                      <div className="px-3 py-1.5 text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800">
                        Geographic Scale
                      </div>
                      {(
                        [
                          { scale: 'alps' as MapScale, label: 'Alps (Overview)' },
                          { scale: 'regions' as MapScale, label: 'Regions (Südtirol, Tyrol...)' },
                          { scale: 'cities' as MapScale, label: 'Cities & Clusters' },
                        ] as const
                      ).map((m) => (
                        <button
                          key={m.scale}
                          onClick={() => {
                            setActiveTab('map');
                            setActiveMapScale(m.scale);
                            setMapDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full text-left px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-between',
                            activeTab === 'map' && activeMapScale === m.scale && 'font-bold text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800/40'
                          )}
                        >
                          <span>{m.label}</span>
                          {activeTab === 'map' && activeMapScale === m.scale && <span className="text-xs">✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'transition-colors py-1 cursor-pointer relative',
                  activeTab === item.id
                    ? 'text-stone-950 dark:text-white font-bold'
                    : 'hover:text-stone-950 dark:hover:text-white'
                )}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 dark:bg-stone-100" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Functional Controls (Theme Inverter, Filter Toggle, Reset) */}
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Reset all active filters"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}

          {/* Theme Inverter (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5-md text-xs font-mono border transition-all cursor-pointer bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 group"
            title={theme === 'dark' ? 'Passa al Tema Chiaro (Carta d\'Archivio)' : 'Passa al Tema Scuro (Ossidiana)'}
            aria-label="Inverti tema globale chiaro e scuro"
          >
            <div className="relative w-3.5 h-3.5 flex items-center justify-center">
              {theme === 'dark' ? (
                <Sun size={13} className="text-amber-400 " />
              ) : (
                <Moon size={13} className="text-stone-700" />
              )}
            </div>
            <span className="hidden md:inline font-semibold text-[10px] tracking-wider text-stone-700 dark:text-stone-300">
              {theme === 'dark' ? 'SCURO' : 'CHIARO'}
            </span>
          </button>

          {/* Filters Drawer Toggle */}
          <button
            onClick={onToggleFilterBar}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-colors border cursor-pointer',
              isFilterBarOpen || activeFilterCount > 0
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 border-stone-900 dark:border-white font-bold'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
            )}
          >
            <SlidersHorizontal size={13} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 w-4 h-4-full bg-stone-200 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#0c0e12] px-4 py-3 flex flex-col gap-3 text-xs font-mono uppercase tracking-wider">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'px-3 py-2 text-left transition-colors',
                  activeTab === item.id
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Map sub-scales if in Map */}
          {activeTab === 'map' && (
            <div className="p-2.5 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">SCALA DELLA MAPPA:</div>
              <div className="flex gap-1.5">
                {(['alps', 'regions', 'cities'] as MapScale[]).map((scale) => (
                  <button
                    key={scale}
                    onClick={() => {
                      setActiveMapScale(scale);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      'px-2 py-1 text-[10px] border',
                      activeMapScale === scale
                        ? 'bg-amber-400 text-stone-950 font-bold border-amber-500'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                    )}
                  >
                    {scale.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <span className="text-stone-500 dark:text-stone-400">Modalità Visiva</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="text-amber-400" />
                  <span>SCURO</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-indigo-600" />
                  <span>CHIARO</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
