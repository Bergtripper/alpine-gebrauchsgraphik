import React from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { PEOPLE, WORKS, PLACES } from '../../data';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { ResearchStatusBadge } from '../ui/EntityBadge';
import { ElevationProfile } from '../ui/ElevationProfile';
import { generateRouteProfile } from '../../lib/elevationUtils';
import { Sliders, HelpCircle, ArrowRight, MapPin } from 'lucide-react';
import { cn } from '../../lib/cn';

export const CompareView: React.FC = () => {
  const { compareState, setCompareState, openEntity, getConnectedEntities, activeAuthor } = useAtlas();

  const handleModeChange = (mode: 'artist' | 'work') => {
    if (mode === 'artist') {
      setCompareState({
        mode: 'artist',
        item1Id: activeAuthor?.id || '',
        item2Id: '',
      });
    } else if (mode === 'work') {
      setCompareState({
        mode: 'work',
        item1Id: '',
        item2Id: '',
      });
    }
  };

  // Render Artist vs Artist
  const renderArtistComparison = () => {
    const artist1 = PEOPLE.find((p) => p.id === compareState.item1Id) || (activeAuthor ? activeAuthor : null);
    const artist2 = PEOPLE.find((p) => p.id === compareState.item2Id && p.id !== artist1?.id) || null;

    const conn1 = artist1 ? getConnectedEntities(artist1.id) : null;
    const conn2 = artist2 ? getConnectedEntities(artist2.id) : null;

    const profile1 = React.useMemo(() => {
      if (!artist1) return [];
      const elevations = [...artist1.cities, ...artist1.associatedPlaces].map(name => 
        PLACES.find(p => p.name.toLowerCase() === name.toLowerCase())?.elevationMeters || 0
      ).filter(v => v > 0);
      return elevations.length > 1 ? generateRouteProfile(elevations) : [];
    }, [artist1]);

    const profile2 = React.useMemo(() => {
      if (!artist2) return [];
      const elevations = [...artist2.cities, ...artist2.associatedPlaces].map(name => 
        PLACES.find(p => p.name.toLowerCase() === name.toLowerCase())?.elevationMeters || 0
      ).filter(v => v > 0);
      return elevations.length > 1 ? generateRouteProfile(elevations) : [];
    }, [artist2]);

    return (
      <div className="space-y-8">
        {/* Comparative Altimetric Overlay (Unique Graphic) */}
        {(profile1.length > 0 || profile2.length > 0) && (
          <div className="bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-amber-600" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 font-bold">
                  Geographic Elevation Overlay
                </h3>
              </div>
              <div className="flex gap-4 text-[10px] font-mono">
                {artist1 && <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-600" /> {artist1.name}</span>}
                {artist2 && <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600" /> {artist2.name}</span>}
              </div>
            </div>
            <div className="relative h-24">
              {profile1.length > 0 && (
                <ElevationProfile 
                  points={profile1} 
                  height={80} 
                  showAxes={true} 
                  className="absolute inset-0" 
                  color="stroke-amber-600"
                />
              )}
              {profile2.length > 0 && (
                <ElevationProfile 
                  points={profile2} 
                  height={80} 
                  showAxes={false} 
                  className={cn("absolute inset-0", profile1.length > 0 ? "opacity-60" : "")} 
                  color="stroke-blue-600"
                />
              )}
            </div>
          </div>
        )}

        {/* Side-by-Side Selector Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-5 shadow-xs">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
              RESEARCH SUBJECT A
            </span>
            <select
              value={artist1?.id || ''}
              onChange={(e) => setCompareState((prev) => ({ ...prev, item1Id: e.target.value }))}
              aria-label="Select Research Subject A"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-3 py-2 text-sm font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400 font-mono"
            >
              <option value="" className="dark:bg-stone-900">— Select an Author —</option>
              {PEOPLE.map((p) => (
                <option key={p.id} value={p.id} disabled={p.id === artist2?.id} className="dark:bg-stone-900">
                  {p.name} ({p.nationality} · {p.activeYears})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
              RESEARCH SUBJECT B
            </span>
            <select
              value={artist2?.id || ''}
              onChange={(e) => setCompareState((prev) => ({ ...prev, item2Id: e.target.value }))}
              aria-label="Select Research Subject B"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-3 py-2 text-sm font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400 font-mono"
            >
              <option value="" className="dark:bg-stone-900">— Select an Author to Compare —</option>
              {PEOPLE.map((p) => (
                <option key={p.id} value={p.id} disabled={p.id === artist1?.id} className="dark:bg-stone-900">
                  {p.name} ({p.nationality} · {p.activeYears})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by Side Comparative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Column A */}
          {artist1 && conn1 ? (
            <div className="bg-white dark:bg-[#12161f] border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-6 shadow-xs">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  SUBJECT A
                </span>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                  <h2 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-50">
                    {artist1.name}
                  </h2>
                  <ResearchStatusBadge status={artist1.researchStatus || 'CONFIRMED'} size="xs" />
                </div>
                <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
                  {artist1.birthYear ?? 'unknown'}—{artist1.deathYear || (artist1.researchStatus === 'UNIDENTIFIED' ? 'uncertain' : 'present')} · {artist1.nationality} · Active: {artist1.activeYears}
                </div>
                <button
                  onClick={() => openEntity(artist1.id, 'person')}
                  className="mt-3 text-xs font-mono font-bold text-stone-900 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Open Full Dossier ↗
                </button>
              </div>

              {/* Visual Characteristics */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Visual Traits & Style
                </h3>
                <div className="space-y-1.5 text-xs font-mono">
                  {artist1.visualCharacteristics.map((c, i) => (
                    <div key={i} className="p-2 bg-stone-50 dark:bg-stone-900 border-l-2 border-stone-800 dark:border-amber-400 text-stone-800 dark:text-stone-200">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Output & Client Base */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Alpine Clients & Commissions
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Catalogued Works</span>
                    <strong className="text-lg text-stone-900 dark:text-stone-100">{conn1.works.length}</strong>
                  </div>
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Client Bodies</span>
                    <strong className="text-lg text-stone-900 dark:text-stone-100">
                      {artist1.associatedCompanies.length + artist1.associatedInstitutions.length}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Key Works Strip */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Key Catalogued Works
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {conn1.works.slice(0, 2).map((w) => (
                    <div
                      key={w.id}
                      onClick={() => openEntity(w.id, 'work')}
                      className="cursor-pointer group"
                    >
                      <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                      <div className="text-[11px] font-bold text-stone-900 dark:text-stone-100 mt-1 truncate group-hover:underline">
                        {w.title}
                      </div>
                      <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400">{w.yearDisplay}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Stations */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Geographic Nodes
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {artist1.cities.map((c) => (
                    <span key={c} className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded text-xs font-mono text-stone-700 dark:text-stone-300">
                      📍 {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#12161f] border border-dashed border-stone-300 dark:border-stone-800 rounded-lg p-10 text-center space-y-3 font-mono text-xs shadow-2xs">
              <Sliders size={28} className="mx-auto text-stone-400 dark:text-stone-600" />
              <div className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                No Subject A Selected
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-xs max-w-xs mx-auto leading-relaxed">
                Choose an author from the first dropdown above to initialize Subject A.
              </p>
            </div>
          )}

          {/* Column B */}
          {artist2 && conn2 ? (
            <div className="bg-white dark:bg-[#12161f] border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-6 shadow-xs">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  SUBJECT B
                </span>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                  <h2 className="text-2xl font-serif font-bold text-stone-950 dark:text-stone-50">
                    {artist2.name}
                  </h2>
                  <ResearchStatusBadge status={artist2.researchStatus || 'CONFIRMED'} size="xs" />
                </div>
                <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
                  {artist2.birthYear ?? 'unknown'}—{artist2.deathYear || (artist2.researchStatus === 'UNIDENTIFIED' ? 'uncertain' : 'present')} · {artist2.nationality} · Active: {artist2.activeYears}
                </div>
                <button
                  onClick={() => openEntity(artist2.id, 'person')}
                  className="mt-3 text-xs font-mono font-bold text-stone-900 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Open Full Dossier ↗
                </button>
              </div>

              {/* Visual Characteristics */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Visual Traits & Style
                </h3>
                <div className="space-y-1.5 text-xs font-mono">
                  {artist2.visualCharacteristics.map((c, i) => (
                    <div key={i} className="p-2 bg-stone-50 dark:bg-stone-900 border-l-2 border-stone-800 dark:border-amber-400 text-stone-800 dark:text-stone-200">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Output & Client Base */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Alpine Clients & Commissions
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Catalogued Works</span>
                    <strong className="text-lg text-stone-900 dark:text-stone-100">{conn2.works.length}</strong>
                  </div>
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Client Bodies</span>
                    <strong className="text-lg text-stone-900 dark:text-stone-100">
                      {artist2.associatedCompanies.length + artist2.associatedInstitutions.length}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Key Works Strip */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Key Catalogued Works
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {conn2.works.slice(0, 2).map((w) => (
                    <div
                      key={w.id}
                      onClick={() => openEntity(w.id, 'work')}
                      className="cursor-pointer group"
                    >
                      <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                      <div className="text-[11px] font-bold text-stone-900 dark:text-stone-100 mt-1 truncate group-hover:underline">
                        {w.title}
                      </div>
                      <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400">{w.yearDisplay}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Stations */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
                  Geographic Nodes
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {artist2.cities.map((c) => (
                    <span key={c} className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded text-xs font-mono text-stone-700 dark:text-stone-300">
                      📍 {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#12161f] border border-dashed border-stone-300 dark:border-stone-800 rounded-lg p-10 text-center space-y-3 font-mono text-xs shadow-2xs">
              <Sliders size={28} className="mx-auto text-stone-400 dark:text-stone-600" />
              <div className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                No Subject B Selected
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-xs max-w-xs mx-auto leading-relaxed">
                Choose a second author from the dropdown above to display side-by-side comparative analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render Work vs Work
  const renderWorkComparison = () => {
    const work1 = WORKS.find((w) => w.id === compareState.item1Id) || null;
    const work2 = WORKS.find((w) => w.id === compareState.item2Id && w.id !== work1?.id) || null;

    return (
      <div className="space-y-8">
        {/* Work Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-5 shadow-xs">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
              WORK A
            </span>
            <select
              value={work1?.id || ''}
              onChange={(e) => setCompareState((prev) => ({ ...prev, item1Id: e.target.value }))}
              aria-label="Select Work A"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-3 py-2 text-sm font-bold text-stone-900 dark:text-stone-100 font-mono"
            >
              <option value="" className="dark:bg-stone-900">— Select Work A —</option>
              {WORKS.map((w) => (
                <option key={w.id} value={w.id} disabled={w.id === work2?.id} className="dark:bg-stone-900">
                  {w.title} ({w.creatorName} · {w.yearDisplay})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
              WORK B
            </span>
            <select
              value={work2?.id || ''}
              onChange={(e) => setCompareState((prev) => ({ ...prev, item2Id: e.target.value }))}
              aria-label="Select Work B"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded px-3 py-2 text-sm font-bold text-stone-900 dark:text-stone-100 font-mono"
            >
              <option value="" className="dark:bg-stone-900">— Select Work B to Compare —</option>
              {WORKS.map((w) => (
                <option key={w.id} value={w.id} disabled={w.id === work1?.id} className="dark:bg-stone-900">
                  {w.title} ({w.creatorName} · {w.yearDisplay})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {work1 ? (
            <div className="bg-white dark:bg-[#12161f] border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-4 shadow-xs">
              <ArtworkVisualizer work={work1} size="lg" showPalette={true} interactiveZoom={true} />
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">{work1.title}</h3>
              <dl className="divide-y divide-stone-200 dark:divide-stone-800 text-xs font-mono">
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Creator</dt>
                  <dd className="font-semibold">{work1.creatorName}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Year / Date</dt>
                  <dd className="font-semibold">{work1.yearDisplay}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Category</dt>
                  <dd className="font-semibold">{work1.category}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Typography</dt>
                  <dd className="font-semibold uppercase">{work1.visualCharacteristics.typography}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Composition</dt>
                  <dd className="font-semibold uppercase">{work1.visualCharacteristics.composition}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Style</dt>
                  <dd className="font-semibold uppercase">{work1.visualCharacteristics.style}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Technique</dt>
                  <dd className="font-semibold text-right max-w-[200px]">{work1.technique}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#12161f] border border-dashed border-stone-300 dark:border-stone-800 rounded-lg p-10 text-center space-y-3 font-mono text-xs shadow-2xs">
              <Sliders size={28} className="mx-auto text-stone-400 dark:text-stone-600" />
              <div className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                No Work A Selected
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-xs max-w-xs mx-auto leading-relaxed">
                Choose an artwork from the first dropdown above to examine its formal traits.
              </p>
            </div>
          )}

          {work2 ? (
            <div className="bg-white dark:bg-[#12161f] border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-4 shadow-xs">
              <ArtworkVisualizer work={work2} size="lg" showPalette={true} interactiveZoom={true} />
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">{work2.title}</h3>
              <dl className="divide-y divide-stone-200 dark:divide-stone-800 text-xs font-mono">
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Creator</dt>
                  <dd className="font-semibold">{work2.creatorName}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Year / Date</dt>
                  <dd className="font-semibold">{work2.yearDisplay}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Category</dt>
                  <dd className="font-semibold">{work2.category}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Typography</dt>
                  <dd className="font-semibold uppercase">{work2.visualCharacteristics.typography}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Composition</dt>
                  <dd className="font-semibold uppercase">{work2.visualCharacteristics.composition}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Style</dt>
                  <dd className="font-semibold uppercase">{work2.visualCharacteristics.style}</dd>
                </div>
                <div className="py-1.5 flex justify-between">
                  <dt className="text-stone-500">Technique</dt>
                  <dd className="font-semibold text-right max-w-[200px]">{work2.technique}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#12161f] border border-dashed border-stone-300 dark:border-stone-800 rounded-lg p-10 text-center space-y-3 font-mono text-xs shadow-2xs">
              <Sliders size={28} className="mx-auto text-stone-400 dark:text-stone-600" />
              <div className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                No Work B Selected
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-xs max-w-xs mx-auto leading-relaxed">
                Choose a second artwork above to compare compositional schemas, palettes, and techniques.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Title & Mode Switcher */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5 transition-colors">
        <div className="text-xs uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 mb-1">
          COMPARATIVE MORPHOLOGY · DIALECTICAL ANALYSIS
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-50 tracking-tight font-black">
              Side-by-Side Comparison
            </h1>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl mt-1.5 leading-relaxed">
              Examine stylistic differences, overlapping alpine destinations, client patronage, and compositional formulas between creators or individual works.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-md text-xs font-mono font-semibold border border-stone-300 dark:border-stone-700">
            <button
              onClick={() => handleModeChange('artist')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                compareState.mode === 'artist'
                  ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Author vs Author
            </button>
            <button
              onClick={() => handleModeChange('work')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                compareState.mode === 'work'
                  ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Work vs Work
            </button>
          </div>
        </div>
      </div>

      {/* Render Active Comparison Mode */}
      {compareState.mode === 'artist' ? renderArtistComparison() : renderWorkComparison()}
    </div>
  );
};
