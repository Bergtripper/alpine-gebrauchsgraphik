import React, { useState } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { ARCHIVE_ITEMS } from '../../data/atlasData';
import { ArchiveItem } from '../../types/atlas';
import { ExternalLink } from 'lucide-react';

export const ArchiveView: React.FC = () => {
  const { openEntity } = useAtlas();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArchive = ARCHIVE_ITEMS.filter((item) => {
    if (selectedType !== 'all' && item.objectType !== selectedType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchProv = item.provenance.toLowerCase().includes(q);
      const matchCall = item.callNumber.toLowerCase().includes(q);
      if (!matchTitle && !matchProv && !matchCall) return false;
    }
    return true;
  });

  const getBadgeStyle = (type: ArchiveItem['objectType']) => {
    switch (type) {
      case 'ORIGINAL OBJECT':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      case 'REPRODUCTION':
        return 'bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'DIGITAL SOURCE':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700';
      case 'BIBLIOGRAPHIC SOURCE':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      default:
        return 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-300 dark:border-stone-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5 transition-colors">
        <div className="text-xs uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 mb-1">
          PRIMARY HISTORICAL REPOSITORY · PROVENANCE & MATERIALITY
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-50 tracking-tight">
              Primary Archival Collection
            </h1>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl mt-1.5 leading-relaxed">
              Direct access to physical artefacts: original gouache maquettes, alpine expedition sketchbooks, printer proofs, and rare periodical runs with documented chain of custody.
            </p>
          </div>

          <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
            {ARCHIVE_ITEMS.length} registered accessions in the DOTZERO vault
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#12161f] border border-stone-200 dark:border-stone-800 rounded-lg p-3 text-xs font-mono transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-stone-400 dark:text-stone-500 uppercase text-[10px]">Filter Status:</span>
          {['all', 'ORIGINAL OBJECT', 'REPRODUCTION', 'DIGITAL SOURCE'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedType === t
                  ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by accession # or provenance..."
          className="border border-stone-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 rounded px-3 py-1 text-stone-900 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-stone-800 dark:focus:border-amber-400 font-mono"
        />
      </div>

      {/* Archival Catalog Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArchive.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#12161f] border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-4 hover:border-stone-500 dark:hover:border-stone-600 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Type Classification & Call Number */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getBadgeStyle(
                    item.objectType
                  )}`}
                >
                  {item.objectType}
                </span>
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  REF: {item.callNumber}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-serif font-bold text-stone-950 dark:text-stone-50">
                {item.title}
              </h2>

              {/* Accession Data */}
              <dl className="divide-y divide-stone-100 dark:divide-stone-800 text-xs font-mono space-y-1.5 pt-1">
                <div className="pt-1.5 flex justify-between">
                  <dt className="text-stone-500 dark:text-stone-400">Date of Origin:</dt>
                  <dd className="font-semibold text-stone-900 dark:text-stone-100">{item.year}</dd>
                </div>
                {item.creatorName && (
                  <div className="pt-1.5 flex justify-between">
                    <dt className="text-stone-500 dark:text-stone-400">Creator / Attribution:</dt>
                    <dd className="text-stone-900 dark:text-stone-100 font-semibold">{item.creatorName}</dd>
                  </div>
                )}
                <div className="pt-1.5 flex justify-between">
                  <dt className="text-stone-500 dark:text-stone-400">Physical Dimensions:</dt>
                  <dd className="text-stone-900 dark:text-stone-100">{item.dimensions}</dd>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <dt className="text-stone-500 dark:text-stone-400">Physical Condition:</dt>
                  <dd className="text-stone-900 dark:text-stone-200 text-right max-w-xs">{item.condition}</dd>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <dt className="text-stone-500 dark:text-stone-400">Provenance:</dt>
                  <dd className="text-stone-900 dark:text-stone-200 text-right max-w-xs">{item.provenance}</dd>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <dt className="text-stone-500 dark:text-stone-400">Vault Repository:</dt>
                  <dd className="text-stone-900 dark:text-stone-100">{item.collection}</dd>
                </div>
              </dl>

              {/* Curatorial Notes */}
              <div className="p-3 bg-stone-50 dark:bg-stone-900/70 border-l-2 border-stone-800 dark:border-amber-400 text-xs font-mono text-stone-700 dark:text-stone-300 leading-relaxed">
                {item.notes}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400 dark:text-stone-500 text-[10px]">
                {item.bibliographicReferences.length} verified citations
              </span>
              {item.relatedWorkIds.length > 0 && (
                <button
                  onClick={() => openEntity(item.relatedWorkIds[0], 'work')}
                  className="text-stone-900 dark:text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Associated Work Dossier</span>
                  <ExternalLink size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
