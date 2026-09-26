import React, { useState, useMemo } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { WORKS } from '../../data/atlasData';
import { Work } from '../../types/atlas';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { Palette, Type, Compass, User, Sparkles } from 'lucide-react';

type DnaDimension = 'typography' | 'composition' | 'figure' | 'style' | 'color';

export const VisualDnaView: React.FC = () => {
  const { openEntity } = useAtlas();
  const [activeDimension, setActiveDimension] = useState<DnaDimension>('composition');

  const groupedWorks = useMemo(() => {
    const groups: Record<string, Work[]> = {};

    WORKS.forEach((w) => {
      let key = '';
      if (activeDimension === 'typography') key = w.visualCharacteristics.typography;
      else if (activeDimension === 'composition') key = w.visualCharacteristics.composition;
      else if (activeDimension === 'figure') key = w.visualCharacteristics.figure;
      else if (activeDimension === 'style') key = w.visualCharacteristics.style;
      else if (activeDimension === 'color') key = w.colors[0]?.name || 'Neutral';

      if (!groups[key]) groups[key] = [];
      groups[key].push(w);
    });

    return groups;
  }, [activeDimension]);

  const extractedPalettes = useMemo(() => {
    const colorsMap = new Map<string, { hex: string; name: string; count: number; sampleWork: Work }>();
    WORKS.forEach((w) => {
      w.colors.forEach((c) => {
        if (!colorsMap.has(c.hex)) {
          colorsMap.set(c.hex, { hex: c.hex, name: c.name, count: 1, sampleWork: w });
        } else {
          colorsMap.get(c.hex)!.count += 1;
        }
      });
    });
    return Array.from(colorsMap.values()).sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Editorial Title */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5 transition-colors">
        <div className="text-xs uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 mb-1">
          FORMAL ARCHAEOLOGY · MORPHOLOGICAL TAXONOMY
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-50 tracking-tight">
              Visual DNA of the Alps
            </h1>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl mt-1.5 leading-relaxed">
              Explore works by formal structural characteristics rather than author or date. Deconstruct the alpine visual identity into composition, type geometry, athletic figures, and chromatic formulas.
            </p>
          </div>

          <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
            {WORKS.length} works categorized across 5 formal dimensions
          </div>
        </div>
      </div>

      {/* Dimension Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <span className="text-xs font-mono uppercase text-stone-400 dark:text-stone-500 mr-2">Dimension:</span>
        {[
          { id: 'composition' as const, label: 'Compositional Armature', icon: Compass },
          { id: 'typography' as const, label: 'Typography Systems', icon: Type },
          { id: 'figure' as const, label: 'Human Figure Archetypes', icon: User },
          { id: 'style' as const, label: 'Graphic Style Movement', icon: Sparkles },
          { id: 'color' as const, label: 'Alpine Chromatic Palettes', icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeDimension === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDimension(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded transition-colors cursor-pointer ${
                isActive
                  ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 font-bold'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Typographic Specimen Showcase if Typography dimension */}
      {activeDimension === 'typography' && (
        <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
                TYPOGRAPHIC LABORATORY · 1900—1970
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-50">
                Alpine Typeface Archetypes
              </h2>
            </div>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
              5 Primary Lettering Traditions
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded">
              <div className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold mb-1">
                Constructivist & Geometric Sans
              </div>
              <div className="text-2xl font-black font-sans tracking-tight text-stone-900 dark:text-stone-100 uppercase">
                DOLOMITI 1934
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-2">
                Pure circles, strict diagonals, mathematical proportions without serifs. Used by Franz Lenhart and ENIT campaigns.
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded">
              <div className="text-[10px] font-mono uppercase text-sky-600 dark:text-sky-400 font-bold mb-1">
                Modernist Condensed Grotesk
              </div>
              <div className="text-2xl font-bold font-mono tracking-tighter text-stone-900 dark:text-stone-100 uppercase">
                WINTERSPORT BOZEN
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-2">
                Compressed vertical forms maximizing poster impact across train station platforms and ski lodge noticeboards.
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded">
              <div className="text-[10px] font-mono uppercase text-rose-600 dark:text-rose-400 font-bold mb-1">
                Classical Serif & Secession Roman
              </div>
              <div className="text-2xl font-serif font-bold italic text-stone-900 dark:text-stone-100">
                Meran Südtirol
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-2">
                High contrast thick-thin strokes, graceful brackets, evoking Belle Époque grand hotels and sanatoriums.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compositional Armatures Showcase if Composition dimension */}
      {activeDimension === 'composition' && (
        <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
                GEOMETRIC BLUEPRINTS · PICTORIAL MECHANICS
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-50">
                Compositional Armatures of Alpine Posters
              </h2>
            </div>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
              Structural Vectors
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              {
                title: 'Dynamic Diagonal',
                desc: 'Downhill ski descent cutting pictorial frame from top-left to bottom-right.',
                svg: (
                  <svg viewBox="0 0 100 140" className="w-full h-24 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                    <line x1="0" y1="30" x2="100" y2="110" stroke="#EF4444" strokeWidth="2.5" />
                    <line x1="0" y1="50" x2="100" y2="130" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="65" cy="80" r="8" fill="#F59E0B" />
                  </svg>
                ),
              },
              {
                title: 'Monumental Pyramid',
                desc: 'Dolomite rock spire or solitary mountain peak stabilizing the central vertical axis.',
                svg: (
                  <svg viewBox="0 0 100 140" className="w-full h-24 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                    <polygon points="50,20 15,120 85,120" stroke="#10B981" strokeWidth="2" fill="none" />
                    <line x1="50" y1="20" x2="50" y2="120" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                ),
              },
              {
                title: 'Asymmetric Tension',
                desc: 'Constructivist New Typography: heavy headline block balanced against high-altitude photography cutout.',
                svg: (
                  <svg viewBox="0 0 100 140" className="w-full h-24 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                    <rect x="10" y="15" width="80" height="25" fill="#EF4444" opacity="0.8" />
                    <rect x="35" y="55" width="55" height="70" fill="#3B82F6" opacity="0.6" />
                    <line x1="10" y1="48" x2="90" y2="48" stroke="#FFFFFF" strokeWidth="2" />
                  </svg>
                ),
              },
              {
                title: 'Tripartite Horizon',
                desc: 'Foreground promenade/balustrade, middle-ground valley mist, background eternal snows.',
                svg: (
                  <svg viewBox="0 0 100 140" className="w-full h-24 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                    <line x1="0" y1="40" x2="100" y2="40" stroke="#38BDF8" strokeWidth="1.5" />
                    <line x1="0" y1="80" x2="100" y2="80" stroke="#F59E0B" strokeWidth="1.5" />
                    <line x1="0" y1="110" x2="100" y2="110" stroke="#10B981" strokeWidth="2.5" />
                  </svg>
                ),
              },
            ].map((arm, aIdx) => (
              <div key={aIdx} className="p-3 bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded space-y-2">
                {arm.svg}
                <div className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100 uppercase">{arm.title}</div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">{arm.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeDimension === 'color' ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-mono uppercase tracking-widest text-stone-700 dark:text-stone-300">
              Extracted Alpine Chromatic Spectra
            </h3>
            <p className="text-xs font-serif text-stone-600 dark:text-stone-400 max-w-2xl">
              Historical alpine posters deployed deliberate chromatic contrasts: deep cobalt skies, blinding snow whites, ochre limestone cliffs, and signal vermilion clothing.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-3">
              {extractedPalettes.map((p, i) => (
                <div
                  key={i}
                  onClick={() => openEntity(p.sampleWork.id, 'work')}
                  className="p-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded hover:border-stone-400 dark:hover:border-stone-600 cursor-pointer transition-all group"
                >
                  <div
                    className="w-full h-16 rounded shadow-xs mb-2 border border-black/10 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: p.hex }}
                  />
                  <div className="text-[11px] font-mono font-bold text-stone-900 dark:text-stone-100 truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                    {p.hex} · {p.count} works
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Structural Dimension Groups */
        <div className="space-y-8">
          {Object.entries(groupedWorks).map(([attributeKey, works]) => (
            <div
              key={attributeKey}
              className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-6 space-y-4 shadow-xs"
            >
              {/* Group Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
                    {activeDimension.toUpperCase()} FORM
                  </span>
                  <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">
                    {attributeKey}
                  </h2>
                </div>
                <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  <strong>{works.length}</strong> works exhibiting this visual trait
                </div>
              </div>

              {/* Works Grid in this Visual Archetype */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {works.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => openEntity(w.id, 'work')}
                    className="p-3 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded cursor-pointer transition-all group"
                  >
                    <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                    <div className="mt-2.5">
                      <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-500 transition-colors line-clamp-1">
                        {w.title}
                      </div>
                      <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 flex justify-between mt-1">
                        <span>{w.creatorName}</span>
                        <span>{w.yearDisplay}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
