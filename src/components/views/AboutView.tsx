import React from 'react';
import { SOURCES_DB } from '../../data/atlasData';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useAtlas } from '../../context/AtlasContext';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useAtlas();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 transition-colors">
      {/* Manifesto Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400">
          DOTZERO RESEARCH PROGRAM · PROJECT DOSSIER
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
          Alpine Gebrauchsgraphik
        </h1>
        <div className="text-lg font-serif italic text-stone-600 dark:text-stone-400">
          Atlas of Alpine Visual Culture · 1900—1970
        </div>
        <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
          Posters · Hotel Labels · Typography · Tourism · Sport · Cartography · Brand Identity
        </p>
      </div>

      {/* Project Vision Narrative */}
      <div className="space-y-6 text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed font-serif">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-950 dark:first-letter:text-stone-100">
          Alpine Gebrauchsgraphik is an interactive digital research atlas investigating how modern Alpine visual culture was constructed through applied graphic design between 1900 and 1970.
        </p>

        <p>
          Between 1900 and 1970, the Alps transitioned from an intimidating topographical barrier into an international stage for health therapy, elite mountaineering, competitive skiing, and transit. This transformation did not occur in a vacuum: it was engineered by graphic designers, illustrators, railway companies, tourism boards, grand hotels, and sports apparel manufacturers across South Tyrol, Tyrol, the Dolomites, Switzerland, and Northern Italy.
        </p>

        <div className="p-6 bg-stone-100 dark:bg-[#12161f] border-l-2 border-stone-900 dark:border-amber-400 my-6 font-mono text-xs text-stone-900 dark:text-stone-200 space-y-2 rounded-r">
          <div className="font-bold uppercase tracking-wider text-[11px] text-stone-500 dark:text-amber-400">
            WHY “GEBRAUCHSGRAPHIK”?
          </div>
          <div className="text-base font-serif italic font-medium">
            The Historical Spelling as Methodological Principle
          </div>
          <div className="text-stone-600 dark:text-stone-300 leading-normal">
            The term <em>Gebrauchsgraphik</em> (utilizing the historical German spelling) intentionally anchors the atlas in the interwar discipline of applied commercial communication. It embraces posters, hotel luggage labels, railway timetables, exhibition catalogs, and trade signets. The digital environment, however, avoids nostalgic retro pastiche: the interface remains rigorously modern, neutral, and research-focused.
          </div>
        </div>

        <p>
          The experience is conceived as a hybrid between <strong>an archive, an atlas, a visual database, and an interconnected research instrument</strong>. Every person, poster, hotel label, geographic station, and printer behaves as an active node linked with bidirectional provenance.
        </p>
      </div>

      {/* Research Methodology & Uncertainty Discipline */}
      <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
        <h2 className="text-xs uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400">
          Methodological Transparency & Epistemic Uncertainty
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded space-y-2">
            <span className="font-bold text-stone-900 dark:text-stone-100 block uppercase">Five Epistemic Research Statuses</span>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Historical certainty is essential. Every entity is classified as <span className="text-emerald-600 dark:text-emerald-400 font-bold">CONFIRMED</span>, <span className="text-blue-600 dark:text-blue-400 font-bold">ATTRIBUTED</span>, <span className="text-amber-600 dark:text-amber-400 font-bold">PROBABLE</span>, <span className="text-purple-600 dark:text-purple-400 font-bold">UNVERIFIED</span> (e.g. Brugger / Brügger), or <span className="text-stone-700 dark:text-stone-300 font-bold">UNIDENTIFIED</span> (e.g. Ruprich). We do not fabricate biographical facts where sources remain silent.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded space-y-2">
            <span className="font-bold text-stone-900 dark:text-stone-100 block uppercase">Hotel Labels as Primary Medium</span>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Luggage stickers and grand hotel labels are treated as first-class applied graphic artifacts. They connect luxury hospitality (Cortina, St. Moritz, Kitzbühel, Merano) with commercial lithography, regional typography, and international travel routes.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Sources & Verified Archives */}
      <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
        <h2 className="text-xs uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400">
          Academic Bibliography & Verified Collections
        </h2>

        <div className="space-y-3">
          {Object.values(SOURCES_DB).map((src) => (
            <div key={src.id} className="p-4 bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded text-xs font-mono space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-stone-400 dark:text-stone-500 text-[10px] uppercase">
                  {src.sourceType.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                  <CheckCircle2 size={12} />
                  Verified Provenance
                </span>
              </div>
              <p className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">{src.citation}</p>
              <div className="text-stone-500 dark:text-stone-400 text-[11px]">
                Archive: {src.archiveOrCollection} {src.page && `· ${src.page}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Actions */}
      <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab('atlas')}
          className="px-4 py-2 bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 font-bold text-xs font-mono rounded hover:bg-black dark:hover:bg-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Explore Relational Atlas</span>
          <ArrowRight size={13} />
        </button>
        <button
          onClick={() => setActiveTab('visual_dna')}
          className="px-4 py-2 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 text-xs font-mono rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Explore Visual DNA ↗
        </button>
      </div>
    </div>
  );
};
