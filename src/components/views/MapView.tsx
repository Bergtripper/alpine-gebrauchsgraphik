import React, { useState, useMemo } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { PLACES, INITIAL_RELATIONSHIPS, CITY_CLUSTERS, WORKS, PEOPLE, CULTURAL_CORRIDORS } from '../../data';
import { Navigation, ArrowRight, Layers, MapPin, Building2, BookOpen, Users, Compass, ChevronRight } from 'lucide-react';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { ElevationProfile } from '../ui/ElevationProfile';
import { generatePlaceProfile } from '../../lib/elevationUtils';
import { MapScale, EntityType } from '../../types/atlas';
import { cn } from '../../lib/cn';
import { EntityBadge } from '../ui/EntityBadge';

export const MapView: React.FC = () => {
  const {
    openEntity,
    selectNode,
    activeNode,
    activeAuthor,
    authorScopeOnly,
    toggleAuthorScope,
    getConnectedEntities,
    theme,
    activeMapScale,
    setActiveMapScale,
    activeRegion,
    setActiveRegion,
    filters,
  } = useAtlas();

  // If an author is active, default place selection to their primary associated place or studio
  const initialPlaceId = useMemo(() => {
    if (activeNode?.type === 'place') return activeNode.id;
    if (activeAuthor) {
      const match = PLACES.find((pl) =>
        activeAuthor.associatedPlaces.some((ap) => ap.toLowerCase() === pl.name.toLowerCase()) ||
        activeAuthor.cities.some((c) => c.toLowerCase() === pl.name.toLowerCase())
      );
      if (match) return match.id;
    }
    return 'bolzano';
  }, [activeNode, activeAuthor]);

  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(initialPlaceId);
  const [filterRouteType, setFilterRouteType] = useState<
    'all' | 'designed' | 'printed' | 'commissioned' | 'represented'
  >('all');

  const selectedPlace = PLACES.find((p) => p.id === selectedPlaceId) || PLACES[0];
  const connections = getConnectedEntities(selectedPlace.id);
  const isDark = theme === 'dark';

  const selectedCluster = CITY_CLUSTERS.find((c) => c.placeId === selectedPlace.id);

  const filteredCorridors = CULTURAL_CORRIDORS.filter((c) => {
    if (filterRouteType === 'all') return true;
    return c.type === filterRouteType;
  });

  const regionsList = [
    { id: 'all', label: 'All Alps' },
    { id: 'south-tyrol', label: 'South Tyrol / Südtirol' },
    { id: 'tyrol', label: 'Tyrol' },
    { id: 'dolomites', label: 'Dolomites' },
    { id: 'switzerland', label: 'Switzerland' },
    { id: 'austria', label: 'Austria' },
    { id: 'lombardy', label: 'Lombardy / Milan' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row bg-[#FAF9F5] dark:bg-[#080A0E] overflow-hidden transition-colors">
      {/* Main Map Canvas Area */}
      <div className="relative flex-1 h-[55vh] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800">
        {/* Top Hierarchical Scale & Geographic Filter Bar */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 max-w-[calc(100vw-2rem)]">
          {/* Geographic Scale Switcher (Section 3: ALPS → REGIONS → CITIES) */}
          <div className="bg-white/95 dark:bg-[#12161f]/95  border border-stone-300 dark:border-stone-700  px-3 py-1.5 flex items-center gap-2 text-xs font-mono">
            <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold flex items-center gap-1">
              <Layers size={11} className="text-stone-700" />
              <span>SCALE:</span>
            </span>
            {(['alps', 'regions', 'cities'] as MapScale[]).map((scale) => (
              <button
                key={scale}
                onClick={() => setActiveMapScale(scale)}
                className={cn(
                  'px-2 py-0.5 text-[10px] uppercase font-mono transition-colors cursor-pointer',
                  activeMapScale === scale
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                )}
              >
                {scale}
              </button>
            ))}
          </div>

          {/* Region selector if REGIONS or CITIES scale */}
          {activeMapScale !== 'alps' && (
            <div className="bg-white/95 dark:bg-[#12161f]/95  border border-stone-300 dark:border-stone-700  px-2 py-1 flex items-center gap-1 text-xs font-mono">
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value)}
                aria-label="Filter by Alpine Region"
                className="bg-transparent text-stone-800 dark:text-stone-200 text-xs font-mono cursor-pointer focus:outline-none"
              >
                {regionsList.map((r) => (
                  <option key={r.id} value={r.id} className="bg-white dark:bg-stone-900">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Author Universe Scoped Geographic Banner */}
          {activeAuthor && (
            <div className="bg-[#F6F4EE]/95 dark:bg-[#101217]/95  border border-stone-400 dark:border-stone-600  px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-stone-900 dark:text-stone-200">
              <span className="font-bold text-[10px] uppercase bg-[#9E3E2F] text-white px-1.5 py-0.5 ">
                AUTHOR GEO
              </span>
              <span>
                <strong>{activeAuthor.name}</strong> · Studio: {activeAuthor.cities.join(', ')}
              </span>
            </div>
          )}

          {/* Relationship Route Type Filter (Section 11, 12) */}
          <div className="hidden sm:flex bg-white/95 dark:bg-[#12161f]/95  border border-stone-300 dark:border-stone-700  px-2 py-1 items-center gap-1 text-xs font-mono">
            <span className="text-[10px] text-stone-400 uppercase font-semibold">ROUTE:</span>
            {(['all', 'designed', 'printed', 'commissioned', 'represented'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterRouteType(mode)}
                className={cn(
                  'px-1.5 py-0.5 text-[9px] uppercase font-mono transition-colors cursor-pointer',
                  filterRouteType === mode
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Alpine Map SVG */}
        <svg
          viewBox="0 0 1000 650"
          className="w-full h-full object-cover select-none bg-[#F7F5EE] dark:bg-[#0B0E14] transition-colors"
        >
          <defs>
            <pattern id="survey-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke={isDark ? '#20242C' : '#D8D4CA'} strokeWidth="0.7" />
            </pattern>
          </defs>

          {/* Geodetic survey grid */}
          <rect width="1000" height="650" fill="url(#survey-grid)" />

          {/* Faceted Alpine field: geometric rather than topographic decoration */}
          <polygon
            points="80,455 150,360 225,405 315,285 390,350 470,235 545,330 620,260 710,345 805,205 920,335 960,455"
            fill={isDark ? '#171B22' : '#E8E3D8'}
          />
          <polyline
            points="80,455 150,360 225,405 315,285 390,350 470,235 545,330 620,260 710,345 805,205 920,335 960,455"
            fill="none"
            stroke={isDark ? '#ECE9E0' : '#252522'}
            strokeWidth="2"
          />
          <polygon
            points="470,235 545,330 620,260 570,390"
            fill={isDark ? '#773329' : '#9E3E2F'}
            opacity="0.88"
          />
          <line x1="470" y1="235" x2="470" y2="520" stroke={isDark ? '#76716A' : '#8C877D'} strokeWidth="1" strokeDasharray="4 5" />
          <text x="482" y="248" fill={isDark ? '#D8D3C9' : '#514D46'} fontSize="9" fontFamily="var(--font-mono)">SECTION A / 3343 M</text>

          {/* Alpine Mountain Peaks */}
          <g className="peaks">
            {[
              { name: 'Ortles / Ortler', alt: '3,905 m', x: 410, y: 350 },
              { name: 'Tre Cime di Lavaredo', alt: '2,999 m', x: 600, y: 340 },
              { name: 'Marmolada', alt: '3,343 m', x: 530, y: 390 },
              { name: 'Großglockner', alt: '3,798 m', x: 720, y: 290 },
              { name: 'Matterhorn / Cervino', alt: '4,478 m', x: 140, y: 380 },
            ].map((peak, idx) => (
              <g key={idx} transform={`translate(${peak.x}, ${peak.y})`} className="opacity-80 pointer-events-none select-none">
                <polygon points="0,-10 -7,4 7,4" fill={isDark ? '#C26452' : '#9E3E2F'} />
                <polygon points="0,-10 -3,-4 0,0 3,-4" fill="#FFFFFF" />
                <text
                  x="0"
                  y="-14"
                  textAnchor="middle"
                  fill={isDark ? '#E2E8F0' : '#475569'}
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                >
                  {peak.name.toUpperCase()}
                </text>
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fill={isDark ? '#94A3B8' : '#64748B'}
                  fontSize="7.5"
                  fontFamily="var(--font-mono)"
                >
                  ▲ {peak.alt}
                </text>
              </g>
            ))}
          </g>

          {/* Historic Mountain Passes */}
          <g className="passes" opacity="0.75">
            {[
              { label: 'Brenner Pass (1,374 m)', x: 480, y: 310 },
              { label: 'Arlberg Pass (1,793 m)', x: 300, y: 275 },
              { label: 'Gotthard (2,106 m)', x: 210, y: 340 },
            ].map((pass, pIdx) => (
              <g key={pIdx} transform={`translate(${pass.x}, ${pass.y})`} className="pointer-events-none">
                <circle r="2.5" fill="none" stroke={isDark ? '#38BDF8' : '#0284C7'} strokeWidth="1.5" />
                <text x="5" y="3" fill={isDark ? '#7DD3FC' : '#0369A1'} fontSize="7.5" fontFamily="var(--font-mono)">
                  × {pass.label}
                </text>
              </g>
            ))}
          </g>

          {/* Cultural & Commercial Corridors (Section 11, 12) */}
          <g className="corridors">
            {filteredCorridors.map((c, i) => {
              const fromPlace = PLACES.find((p) => p.id === c.from);
              const toPlace = PLACES.find((p) => p.id === c.to);
              if (!fromPlace || !toPlace) return null;

              const x1 = (fromPlace.coordinates.xPercent / 100) * 1000;
              const y1 = (fromPlace.coordinates.yPercent / 100) * 650;
              const x2 = (toPlace.coordinates.xPercent / 100) * 1000;
              const y2 = (toPlace.coordinates.yPercent / 100) * 650;

              const isCorridorActive = selectedPlaceId === c.from || selectedPlaceId === c.to;

              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      isCorridorActive
                        ? isDark ? '#38BDF8' : '#0284C7'
                        : isDark ? '#2A3444' : '#94A3B8'
                    }
                    strokeWidth={isCorridorActive ? 2.5 : 1.5}
                    strokeDasharray={isCorridorActive ? '6 4' : '4 4'}
                    opacity={isCorridorActive ? 1 : 0.45}
                    
                  />
                </g>
              );
            })}
          </g>

          {/* Geographic Node Pins & City Clusters (Section 9, 10) */}
          <g className="pins">
            {PLACES.map((place) => {
              const cx = (place.coordinates.xPercent / 100) * 1000;
              const cy = (place.coordinates.yPercent / 100) * 650;
              const isSelected = selectedPlaceId === place.id;
              const cluster = CITY_CLUSTERS.find((c) => c.placeId === place.id);

              return (
                <g
                  key={place.id}
                  transform={`translate(${cx}, ${cy})`}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedPlaceId(place.id);
                    selectNode(place.id, 'place');
                  }}
                >
                  {/* Selection Glow Ring */}
                  {isSelected && (
                    <circle
                      r="26"
                      fill="none"
                      stroke={isDark ? '#F59E0B' : '#0F172A'}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      
                    />
                  )}

                  {/* Outer circle with glow */}
                  <circle
                    r={isSelected ? '14' : cluster ? '12' : '9'}
                    fill={isSelected ? (isDark ? '#F3F1EA' : '#171714') : (isDark ? '#C26452' : '#9E3E2F')}
                    stroke={isDark ? '#0F172A' : '#FFFFFF'}
                    strokeWidth="2.5"
                    
                    className="transition-transform duration-200 group-hover:scale-125"
                  />

                  {/* Inner center dot */}
                  <circle r="3.5" fill="#FFFFFF" />

                  {/* City Label */}
                  <text
                    y={isSelected ? '-20' : '-16'}
                    textAnchor="middle"
                    fill={
                      isDark
                        ? isSelected ? '#F8FAFC' : '#CBD5E1'
                        : isSelected ? '#09090B' : '#27272A'
                    }
                    fontSize={isSelected ? '13' : '11'}
                    fontFamily="var(--font-mono)"
                    fontWeight={isSelected ? '900' : '700'}
                    className="select-none pointer-events-none drop-shadow-sm tracking-wider"
                  >
                    {place.name.toUpperCase()}
                  </text>

                  {/* Cluster Activity Badge (Section 9: Multiple activity in one city) */}
                  {activeMapScale === 'cities' && cluster && (
                    <g transform="translate(0, 24)">
                      <rect
                        x="-38"
                        y="0"
                        width="76"
                        height="16"
                        rx="3"
                        fill={isDark ? '#1E293B' : '#FFFFFF'}
                        stroke={isDark ? '#475569' : '#CBD5E1'}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="11"
                        textAnchor="middle"
                        fill={isDark ? '#FACC15' : '#D97706'}
                        fontSize="8.5"
                        fontFamily="var(--font-mono)"
                        fontWeight="700"
                      >
                        {cluster.worksCount}W · {cluster.peopleCount}P
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 dark:bg-[#12161f]/95  border border-stone-300 dark:border-stone-700 p-2.5 text-[10px] font-mono text-stone-600 dark:text-stone-400 space-y-1">
          <div className="font-bold text-stone-900 dark:text-stone-100 uppercase">Cartographic Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block" />
            <span>Geographic Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 border-t border-dashed border-sky-500 inline-block" />
            <span>Cultural & Publishing Pipeline</span>
          </div>
        </div>
      </div>

      {/* Right City Cluster & Ecosystem Dossier (Section 10) */}
      <div className="w-full lg:w-96 h-[45vh] lg:h-full bg-white dark:bg-[#0e1218] flex flex-col p-6 overflow-y-auto transition-colors select-none">
        {/* City Cluster Overview */}
        <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
              CITY CLUSTER · {selectedPlace.region}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold">
              {filters.startYear}—{filters.endYear}
            </span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-50 mt-1">
            {selectedPlace.name}
          </h2>
          <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-0.5">
            Elevation: {selectedPlace.elevation} · {selectedPlace.country}
          </div>

          <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
            <ElevationProfile 
              points={generatePlaceProfile(selectedPlace.id, selectedPlace.elevationMeters)} 
              height={50} 
              showAxes={true}
              label="Altimetric Section"
              color="stroke-stone-700 dark:stroke-stone-300"
            />
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mt-4 font-sans italic">
            {selectedPlace.description}
          </p>

          {/* Section 10: City Cluster Local Concentration Breakdown */}
          {selectedCluster && (
            <div className="mt-3 p-3 bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-stone-900 dark:text-stone-100 block">
                Cluster Concentration ({selectedCluster.activeDecade})
              </span>
              <ul className="text-[11px] font-mono text-stone-600 dark:text-stone-300 space-y-1">
                {selectedCluster.featuredActivities.map((act, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-1.5">
                    <span className="text-stone-700">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => openEntity(selectedPlace.id, 'place')}
            className="mt-3 text-xs font-mono font-bold text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Comprehensive Place Dossier</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Quantified Breakdown */}
        <div className="py-4 border-b border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 ">
            <span className="text-base font-bold text-stone-950 dark:text-stone-100 block">{connections.people.length}</span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">Active Creators</span>
          </div>
          <div className="p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 ">
            <span className="text-base font-bold text-stone-950 dark:text-stone-100 block">{connections.works.length}</span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">Catalogued Works</span>
          </div>
          <div className="p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 ">
            <span className="text-base font-bold text-stone-950 dark:text-stone-100 block">{connections.organizations.length}</span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">Institutions</span>
          </div>
          <div className="p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 ">
            <span className="text-base font-bold text-stone-950 dark:text-stone-100 block">{connections.publications.length}</span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">Periodicals</span>
          </div>
        </div>

        {/* Related Artists in this Node */}
        <div className="pt-4 space-y-4">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Associated Graphic Artists
            </h3>
            <div className="space-y-1.5">
              {connections.people.map((p) => (
                <div
                  key={p.id}
                  onClick={() => selectNode(p.id, 'person')}
                  className="p-2 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 cursor-pointer flex items-center justify-between text-xs font-mono transition-colors group"
                >
                  <span className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-700">
                    {p.name}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">{p.activeYears}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Works in this Node */}
          {connections.works.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                Works Created in / for {selectedPlace.name}
              </h3>
              <div className="space-y-2">
                {connections.works.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => selectNode(w.id, 'work')}
                    className="p-2 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 cursor-pointer flex items-center gap-2 text-xs transition-colors group"
                  >
                    <div className="w-9 h-12 shrink-0 bg-stone-200 dark:bg-stone-800 overflow-hidden">
                      <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-blue-500">
                        {w.title}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                        {w.creatorName} · {w.yearDisplay}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
