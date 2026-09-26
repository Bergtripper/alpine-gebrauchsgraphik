import React from 'react';
import { Work } from '../../../types/atlas';
import { ArtworkVisualizer } from '../../common/ArtworkVisualizer';
import { Sliders } from 'lucide-react';

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
      <div className="border-b border-stone-200 pb-4">
        <div className="text-xs uppercase font-mono tracking-widest text-stone-500 mb-1">
          WORK CATALOGUE ENTRY · {work.category.toUpperCase()}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight">
          {work.title}
        </h1>
        <div className="text-xs font-mono text-stone-600 mt-1 flex flex-wrap items-center gap-2">
          <button
            onClick={() => openEntity(work.creatorId, 'person')}
            className="text-stone-900 font-semibold underline underline-offset-2 hover:text-blue-900 cursor-pointer"
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
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500">
            Accession & Production Data
          </h3>
          <dl className="divide-y divide-stone-200 text-xs font-mono">
            {work.hotelName && (
              <div className="py-2 flex justify-between bg-amber-50 px-2 rounded">
                <dt className="text-amber-800 font-semibold">Grand Hotel Destination:</dt>
                <dd className="font-bold text-amber-950">{work.hotelName}</dd>
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
              <dd className="text-stone-900">{work.printer || 'Uncredited workshop'}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Client / Sponsor:</dt>
              <dd className="text-stone-900">{work.clientName || 'Private commission'}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Repository:</dt>
              <dd className="text-stone-900 text-right">{work.collection}</dd>
            </div>
          </dl>

          {/* Visual DNA Traits */}
          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              Visual DNA Archetype
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-stone-100 rounded">
                <span className="text-stone-500 block">Typography:</span>
                <span className="font-bold text-stone-900 uppercase">{work.visualCharacteristics.typography}</span>
              </div>
              <div className="p-2 bg-stone-100 rounded">
                <span className="text-stone-500 block">Composition:</span>
                <span className="font-bold text-stone-900 uppercase">{work.visualCharacteristics.composition}</span>
              </div>
              <div className="p-2 bg-stone-100 rounded">
                <span className="text-stone-500 block">Figure:</span>
                <span className="font-bold text-stone-900 uppercase">{work.visualCharacteristics.figure}</span>
              </div>
              <div className="p-2 bg-stone-100 rounded">
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
              className="w-full py-2 bg-stone-900 text-white text-xs font-mono rounded hover:bg-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sliders size={13} />
              <span>Compare Side-by-Side ↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Source citation */}
      <div className="p-3.5 bg-stone-50 border border-stone-200 rounded text-xs font-mono space-y-1">
        <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase">
          <span>Verified Source Reference</span>
          <span>SOURCE ↗</span>
        </div>
        <p className="font-serif text-stone-900">{work.source.citation}</p>
        <div className="text-[11px] text-stone-500">{work.source.archiveOrCollection}</div>
      </div>
    </div>
  );
};
