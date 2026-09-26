import React from 'react';
import { Person, Work } from '../../types/atlas';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { ResearchStatusBadge } from '../ui/EntityBadge';
import { AlertCircle, Sliders, ArrowRight } from 'lucide-react';

interface PeopleCatalogCardProps {
  person: Person;
  sampleWorks: Work[];
  totalWorksCount: number;
  selectAuthor: (id: string) => void;
  setComparison: (mode: any, id1: string, id2: string) => void;
  setActiveTab: (tab: any) => void;
  viewMode: 'grid' | 'list';
}

export const PeopleCatalogCard: React.FC<PeopleCatalogCardProps> = ({
  person,
  sampleWorks,
  totalWorksCount,
  selectAuthor,
  setComparison,
  setActiveTab,
  viewMode,
}) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-stone-400 dark:hover:border-stone-600 transition-all shadow-xs">
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              onClick={() => selectAuthor(person.id)}
              className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors"
            >
              {person.name}
            </h2>
            <ResearchStatusBadge status={person.researchStatus || 'CONFIRMED'} size="xs" />
            <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
              ({person.birthYear ?? 'unknown'}—{person.deathYear || (person.researchStatus === 'UNIDENTIFIED' ? 'uncertain' : 'present')})
            </span>
          </div>
          <div className="text-xs font-mono text-stone-600 dark:text-stone-400">
            {person.nationality} · {person.professions.join(', ')} · Active: {person.activeYears} · {person.cities.join(', ')}
          </div>
          {person.identityNotes && (
            <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 flex items-center gap-1.5 pt-0.5">
              <AlertCircle size={12} className="shrink-0" />
              <span className="truncate">{person.identityNotes}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0 font-mono text-xs">
          <button
            onClick={() => {
              setComparison('artist', person.id, '');
              setActiveTab('compare');
            }}
            className="px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Sliders size={12} />
            <span>Compare</span>
          </button>

          <button
            onClick={() => selectAuthor(person.id)}
            className="px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold rounded hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Explore Author Universe</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-6 flex flex-col justify-between hover:border-stone-400 dark:hover:border-stone-600 transition-all shadow-sm group">
      <div className="space-y-4">
        {/* Header with Epistemic Research Status */}
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                onClick={() => selectAuthor(person.id)}
                className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 cursor-pointer transition-colors"
              >
                {person.name}
              </h2>
              <ResearchStatusBadge status={person.researchStatus || 'CONFIRMED'} size="xs" />
            </div>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
              {person.birthYear ?? 'unknown'}—{person.deathYear || (person.researchStatus === 'UNIDENTIFIED' ? 'uncertain' : 'present')} · {person.nationality}
            </div>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded border border-stone-200 dark:border-stone-700 shrink-0">
            Active: {person.activeYears}
          </span>
        </div>

        {/* Identity Notes if uncertain/unidentified */}
        {person.identityNotes && (
          <div className="p-2.5 rounded bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 text-[11px] font-mono text-stone-700 dark:text-stone-300 flex items-start gap-2">
            <AlertCircle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-snug">{person.identityNotes}</p>
          </div>
        )}

        {/* Professions */}
        <div className="text-xs font-mono text-stone-700 dark:text-stone-300 italic">
          {person.professions.join(' · ')}
        </div>

        {/* Biography excerpt */}
        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
          {person.biography}
        </p>

        {/* Visual characteristics bullet points */}
        <div className="space-y-1 pt-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 block">
            Visual Signature
          </span>
          <div className="text-xs font-mono text-stone-800 dark:text-stone-200 line-clamp-2">
            {person.visualCharacteristics.slice(0, 2).map((c, i) => (
              <span key={i} className="block">• {c}</span>
            ))}
          </div>
        </div>

        {/* Sample Works Thumbnail Strip */}
        {sampleWorks.length > 0 && (
          <div className="pt-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 block mb-2">
              Key Catalogued Works ({totalWorksCount})
            </span>
            <div className="grid grid-cols-2 gap-3">
              {sampleWorks.map((w) => (
                <div
                  key={w.id}
                  onClick={() => selectAuthor(person.id)}
                  className="cursor-pointer group/art"
                >
                  <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                  <div className="mt-1 text-[11px] font-medium text-stone-900 dark:text-stone-100 truncate group-hover/art:underline">
                    {w.title}
                  </div>
                  <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                    {w.yearDisplay} {w.category === 'Hotel Label' ? '· Hotel Label' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer — Primary CTA is EXPLORE AUTHOR UNIVERSE */}
      <div className="pt-5 mt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
        <button
          onClick={() => {
            setComparison('artist', person.id, '');
            setActiveTab('compare');
          }}
          className="text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Sliders size={12} />
          <span>Compare ↗</span>
        </button>

        <button
          onClick={() => selectAuthor(person.id)}
          className="px-3.5 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold rounded hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Explore Author Universe</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
