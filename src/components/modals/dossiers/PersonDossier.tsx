import React, { useState } from 'react';
import { Person, Work, Place, Organization, Publication, Relationship } from '../../../types/atlas';
import { ArtworkVisualizer } from '../../common/ArtworkVisualizer';
import { ResearchStatusBadge } from '../../ui/EntityBadge';
import { AlertCircle, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PersonDossierProps {
  person: Person;
  connections: {
    relationships: Relationship[];
    people: Person[];
    works: Work[];
    places: Place[];
    organizations: Organization[];
    publications: Publication[];
  };
  openEntity: (id: string, type: any) => void;
  closeEntity: () => void;
  selectAuthor: (id: string) => void;
  setActiveTab: (tab: any) => void;
  setComparison: (mode: any, id1: string, id2: string) => void;
}

export const PersonDossier: React.FC<PersonDossierProps> = ({
  person,
  connections,
  openEntity,
  closeEntity,
  selectAuthor,
  setActiveTab,
  setComparison,
}) => {
  const [activeTab, setActiveTabLocal] = useState<'overview' | 'works' | 'visual_dna' | 'connections' | 'sources'>('overview');

  return (
    <div className="space-y-6">
      {/* Header Kicker */}
      <div className="border-b border-stone-200 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div className="text-xs uppercase font-mono tracking-widest text-stone-500">
            CREATOR DOSSIER · {person.nationality}
          </div>
          <ResearchStatusBadge status={person.researchStatus || 'CONFIRMED'} size="sm" />
        </div>
        <h1 className="text-3xl font-serif text-stone-900 tracking-tight">
          {person.name}
        </h1>
        <div className="text-sm font-mono text-stone-600 mt-1 flex flex-wrap items-center gap-2">
          <span>{person.birthYear ?? 'unknown'}—{person.deathYear || (person.researchStatus === 'UNIDENTIFIED' ? 'uncertain' : 'present')}</span>
          <span>·</span>
          <span>Active: {person.activeYears}</span>
          <span>·</span>
          <span className="italic">{person.professions.join(', ')}</span>
        </div>

        {/* Identity Notes if unverified/unidentified */}
        {person.identityNotes && (
          <div className="mt-3 p-3 rounded bg-stone-100 border border-stone-200 text-xs font-mono text-stone-800 flex items-start gap-2">
            <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">{person.identityNotes}</p>
          </div>
        )}

        {/* Quick Action Bar */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => {
              selectAuthor(person.id);
              closeEntity();
              setActiveTab('people');
            }}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono font-bold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Explore Author Universe →</span>
          </button>

          <button
            onClick={() => {
              setComparison('artist', person.id, '');
              closeEntity();
            }}
            className="px-3 py-1.5 bg-stone-900 text-white text-xs font-mono rounded hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders size={13} />
            <span>Compare with Contemporary ↗</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation inside Dossier */}
      <div className="flex border-b border-stone-200 text-xs font-mono uppercase tracking-wider gap-4">
        {(['overview', 'works', 'visual_dna', 'connections', 'sources'] as const).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTabLocal(tabKey)}
            className={`pb-2.5 transition-colors cursor-pointer relative ${
              activeTab === tabKey ? 'text-stone-900 font-bold border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            {tabKey.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              Biographical & Curatorial Synthesis
            </h3>
            <p className="text-stone-800 text-sm leading-relaxed max-w-prose">
              {person.biography}
            </p>
          </div>

          {/* Geographic Stations */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              Geographic Trajectory & Studios
            </h3>
            <div className="flex flex-wrap gap-2">
              {person.cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    const matchedPlace = connections.places.find((p) => p.name.toLowerCase() === city.toLowerCase() || p.alternateNames?.includes(city));
                    if (matchedPlace) openEntity(matchedPlace.id, 'place');
                  }}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono rounded border border-stone-200 transition-colors"
                >
                  📍 {city}
                </button>
              ))}
            </div>
          </div>

          {/* Institutional Clients */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              Key Institutional Clients & Commissions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {person.associatedInstitutions.map((inst, i) => (
                <div key={i} className="p-2.5 bg-stone-50 border border-stone-200 rounded text-xs">
                  <span className="font-semibold text-stone-900 block">{inst}</span>
                  <span className="text-stone-500 text-[11px] font-mono">Commissioned campaign partner</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'works' && (
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">
            Identified Catalogued Works ({connections.works.length})
          </h3>
          {connections.works.length === 0 ? (
            <p className="text-xs font-mono text-stone-500">No works catalogue assigned yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {connections.works.map((w) => (
                <div
                  key={w.id}
                  onClick={() => openEntity(w.id, 'work')}
                  className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded cursor-pointer transition-all group"
                >
                  <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                  <div className="mt-2">
                    <div className="text-xs font-bold text-stone-900 group-hover:text-blue-900 transition-colors">
                      {w.title}
                    </div>
                    <div className="text-[11px] font-mono text-stone-500">
                      {w.yearDisplay} · {w.technique}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'visual_dna' && (
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
            Visual Language & Formal Characteristics
          </h3>
          <div className="space-y-2.5">
            {person.visualCharacteristics.map((trait, idx) => (
              <div key={idx} className="p-3 bg-stone-50 border-l-2 border-stone-800 rounded-r text-xs text-stone-800 font-mono">
                {trait}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
            Active Network Nodes ({connections.relationships.length} links)
          </h3>
          <div className="divide-y divide-stone-200 border border-stone-200 rounded bg-white text-xs font-mono">
            {connections.relationships.map((rel) => {
              const isSource = rel.sourceId === person.id;
              const otherName = isSource ? rel.targetName : rel.sourceName;
              const otherId = isSource ? rel.targetId : rel.sourceId;
              const otherType = isSource ? rel.targetType : rel.sourceType;

              return (
                <div
                  key={rel.id}
                  onClick={() => openEntity(otherId, otherType)}
                  className="p-3 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors"
                >
                  <div>
                    <span className="text-stone-500 mr-2 uppercase text-[10px]">
                      [{otherType}]
                    </span>
                    <span className="font-semibold text-stone-900">{otherName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <span className="italic text-[11px]">{rel.relationLabel}</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
            Verified Academic Sources & Primary Archives
          </h3>
          <div className="space-y-3">
            {person.sources.map((src) => (
              <div key={src.id} className="p-3.5 bg-stone-50 border border-stone-200 rounded text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-stone-500 uppercase text-[10px]">
                    {src.sourceType.replace('_', ' ')}
                  </span>
                  {src.verified && (
                    <span className="flex items-center gap-1 text-emerald-700 font-mono text-[11px]">
                      <CheckCircle2 size={12} />
                      Verified
                    </span>
                  )}
                </div>
                <p className="font-serif text-stone-900">{src.citation}</p>
                <div className="text-[11px] text-stone-500 font-mono">{src.archiveOrCollection}</div>
                {src.notes && <p className="text-[11px] text-stone-600 italic">{src.notes}</p>}
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-stone-200">
            <h4 className="text-xs font-mono uppercase text-stone-500 mb-2">Key Bibliography</h4>
            <ul className="list-disc list-inside text-xs font-mono text-stone-700 space-y-1">
              {person.bibliography.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
