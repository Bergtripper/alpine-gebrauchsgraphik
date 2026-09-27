import React from 'react';
import { Work } from '../../../types/atlas';
import { ArtworkVisualizer } from '../../common/ArtworkVisualizer';
import { ResearchProvenance } from '../../common/ResearchProvenance';
import { Sliders } from 'lucide-react';
import { AlpineSurveyMotif } from '../../common/AlpineSurveyMotif';

interface WorkDossierProps {
  work: Work;
  openEntity: (id: string, type: any) => void;
  closeEntity: () => void;
  setComparison: (mode: any, id1: string, id2: string) => void;
}

export const WorkDossier: React.FC<WorkDossierProps> = ({
  work,
  openEntity,
  closeEntity,
  setComparison,
}) => {
  return (
    <div className="space-y-6">
      <div className="relative border-b border-stone-300 pb-4 survey-cut">
        <div className="absolute right-0 top-0 w-48 opacity-50 hidden sm:block">
          <AlpineSurveyMotif variant="section" />
        </div>
        <div className="survey-coordinate text-stone-500 mb-2 pt-3">
          OBJECT SURVEY / {work.category.toUpperCase()} / {work.yearDisplay}
        </div>
        <h1 className="survey-title text-2xl sm:text-4xl text-stone-900 max-w-[75%]">
          {work.title}
        </h1>
        <div className="text-xs font-mono text-stone-600 mt-1 flex flex-wrap items-center gap-2">
          <button
            onClick={() => openEntity(work.creatorId, 'person')}
            className="text-stone-900 font-semibold underline underline-offset-2 hover:text-stone-500 cursor-pointer"
          >
            {work.creatorName}
          </button>
          <span>·</span>
          <span>{work.yearDisplay}</span>
          <span>·</span>
          <button
            onClick={() => openEntity(work.locationId, 'place')}
            className="text-stone-800 hover:underline cursor-pointer"
          >
            {work.locationName}
          </button>
        </div>
      </div>

      {/* Visual Inspection Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <ArtworkVisualizer work={work} size="lg" showPalette={true} interactiveZoom={true} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-300 pb-2">
            <h3 className="survey-coordinate text-stone-500">
              Accession & Production Data
            </h3>
            <span className="survey-coordinate survey-accent">REF / {work.id.toUpperCase()}</span>
          </div>
          <dl className="divide-y divide-stone-200 text-xs font-mono">
            {work.hotelName && (
              <div className="py-2 flex justify-between bg-transparent px-2">
                <dt className="text-stone-600 font-semibold">Grand Hotel Destination:</dt>
                <dd className="font-bold text-stone-900">{work.hotelName}</dd>
              </div>
            )}
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Creator:</dt>
              <dd className="font-semibold text-stone-900">{work.creatorName}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Chronology:</dt>
              <dd className="text-stone-900">{work.yearDisplay} {work.isDateUncertain && '(date uncertain)'}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Technique:</dt>
              <dd className="text-stone-900">{work.technique}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Physical Dimensions:</dt>
              <dd className="text-stone-900">{work.dimensions}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Printer:</dt>
              <dd className="text-stone-900">{work.printer || 'Not documented'}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Client / Sponsor:</dt>
              <dd className="text-stone-900">{work.clientName || 'Not documented'}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Repository:</dt>
              <dd className="text-stone-900 text-right">{work.collection}</dd>
            </div>
          </dl>

          <ResearchProvenance work={work} />

          {/* Visual DNA Traits */}
          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              Visual DNA Archetype
            </h4>
            <div className="grid grid-cols-2 gap-px border border-stone-300 bg-stone-300 text-[11px] font-mono">
              <div className="p-2 bg-[#F7F5EE] dark:bg-[#101217]">
                <span className="text-stone-500 block">Typography:</span>
                <span className="font-bold text-stone-900 uppercase">{work.visualCharacteristics.typography}</span>
              </div>
              <div className="p-2 bg-[#F7F5EE] dark:bg-[#101217]">
                <span className="text-stone-500 block">Composition:</span>
                <span className="font-bold text-stone-900 uppercase">{work.visualCharacteristics.composition}</span>
              </div>
              <div className="p-2 bg-[#F7F5EE] dark:bg-[#101217]">
                <span className="text-stone-500 block">Figure:</span>
                <span className="font-bold text-stone-900 uppercase">{work.visualCharacteristics.figure}</span>
              </div>
              <div className="p-2 bg-[#F7F5EE] dark:bg-[#101217]">
                <span className="text-stone-500 block">Style:</span>
                <span className="font-bold text-stone-900 uppercase">{work.visualCharacteristics.style}</span>
              </div>
            </div>
          </div>

          {/* Compare CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                setComparison('work', work.id, '');
                closeEntity();
              }}
              className="w-full py-2 bg-stone-900 text-white text-xs font-mono hover:bg-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sliders size={13} />
              <span>Compare Side-by-Side ↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Source citation */}
      <div className="py-3.5 border-y border-stone-300 dark:border-stone-700 text-xs font-mono space-y-1">
        <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase">
          <span>Verified Source Reference</span>
          <span>SOURCE ↗</span>
        </div>
        <p className="font-serif text-stone-900">{work.source.citation}</p>
        <div className="text-[11px] text-stone-500">{work.source.archiveOrCollection}</div>
        {work.source.notes && (
          <p className="text-[11px] text-stone-600 leading-snug pt-1">{work.source.notes}</p>
        )}
        {work.source.url && (
          <a
            href={work.source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex pt-1 text-[10px] uppercase tracking-wider font-bold text-stone-900 hover:underline"
          >
            Open source record ↗
          </a>
        )}
      </div>
    </div>
  );
};
