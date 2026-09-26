import React from 'react';
import { Person, Work, Place, Organization, Publication, EntityType } from '../../types/atlas';
import { ChevronRight } from 'lucide-react';

interface ContextConnectedNodesProps {
  connected: {
    people: Person[];
    works: Work[];
    places: Place[];
    organizations: Organization[];
    publications: Publication[];
  };
  selectNode: (id: string, type: EntityType) => void;
}

export const ContextConnectedNodes: React.FC<ContextConnectedNodesProps> = ({
  connected,
  selectNode,
}) => {
  const totalRelations =
    connected.people.length +
    connected.works.length +
    connected.places.length +
    connected.organizations.length +
    connected.publications.length;

  return (
    <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-4">
      <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-stone-400 dark:text-stone-500 flex items-center justify-between">
        <span>CONNECTED NODES</span>
        <span className="text-[9px] text-stone-400">
          {totalRelations} RELATIONS
        </span>
      </div>

      {/* Related People */}
      {connected.people.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-red-600 dark:text-red-400 font-bold block">
            Related Creators
          </span>
          <div className="space-y-1">
            {connected.people.map((p) => (
              <button
                key={p.id}
                onClick={() => selectNode(p.id, 'person')}
                className="w-full text-left p-2 rounded bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800/80 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs font-mono transition-all group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">
                    {p.professions[0]} · {p.activeYears}
                  </div>
                </div>
                <ChevronRight size={13} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Related Works */}
      {connected.works.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold block">
            Related Catalogued Works
          </span>
          <div className="space-y-1">
            {connected.works.map((w) => (
              <button
                key={w.id}
                onClick={() => selectNode(w.id, 'work')}
                className="w-full text-left p-2 rounded bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800/80 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs font-mono transition-all group cursor-pointer"
              >
                <div className="truncate pr-2">
                  <div className="font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {w.title}
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">
                    {w.yearDisplay} · {w.category}
                  </div>
                </div>
                <ChevronRight size={13} className="text-stone-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Related Places */}
      {connected.places.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold block">
            Associated Geographic Places
          </span>
          <div className="space-y-1">
            {connected.places.map((pl) => (
              <button
                key={pl.id}
                onClick={() => selectNode(pl.id, 'place')}
                className="w-full text-left p-2 rounded bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800/80 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs font-mono transition-all group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {pl.name}
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">
                    {pl.region} · {pl.elevation}
                  </div>
                </div>
                <ChevronRight size={13} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Related Organizations */}
      {connected.organizations.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold block">
            Associated Organizations & Clients
          </span>
          <div className="space-y-1">
            {connected.organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => selectNode(org.id, 'organization')}
                className="w-full text-left p-2 rounded bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800/80 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs font-mono transition-all group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {org.name.split('—')[0].trim()}
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">
                    {org.type} · {org.headquartersPlaceName}
                  </div>
                </div>
                <ChevronRight size={13} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Related Publications */}
      {connected.publications.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-purple-600 dark:text-purple-400 font-bold block">
            Periodicals & Catalogues
          </span>
          <div className="space-y-1">
            {connected.publications.map((pub) => (
              <button
                key={pub.id}
                onClick={() => selectNode(pub.id, 'publication')}
                className="w-full text-left p-2 rounded bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800/80 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs font-mono transition-all group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {pub.title.split(':')[0]}
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">
                    {pub.years} · {pub.placeName}
                  </div>
                </div>
                <ChevronRight size={13} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
