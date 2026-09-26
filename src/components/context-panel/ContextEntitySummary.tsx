import React from 'react';
import { EntityType, Person, Work, Place, Organization, Publication } from '../../types/atlas';
import { EntityBadge, ResearchStatusBadge } from '../ui/EntityBadge';
import { Button } from '../ui/Button';
import { ArtworkVisualizer } from '../common/ArtworkVisualizer';
import { ResearchProvenance } from '../common/ResearchProvenance';
import { MapPin, AlertCircle, ExternalLink } from 'lucide-react';

interface ContextEntitySummaryProps {
  entity: Person | Work | Place | Organization | Publication | any;
  type: EntityType;
  connected: {
    people: Person[];
    works: Work[];
    places: Place[];
    organizations: Organization[];
    publications: Publication[];
  };
  openEntity: (id: string, type: EntityType) => void;
  selectAuthor: (id: string) => void;
  updateFilter: (key: any, val: any) => void;
  setActiveTab: (tab: any) => void;
}

export const ContextEntitySummary: React.FC<ContextEntitySummaryProps> = ({
  entity,
  type,
  connected,
  openEntity,
  selectAuthor,
  updateFilter,
  setActiveTab,
}) => {
  switch (type) {
    case 'person': {
      const p = entity as Person;
      return (
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <EntityBadge type="person" />
              <ResearchStatusBadge status={p.researchStatus || 'CONFIRMED'} size="xs" />
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {p.nationality} · {p.activeYears}
              </span>
            </div>
            <h2 className="text-xl font-serif font-black text-stone-950 dark:text-stone-50 leading-tight">
              {p.name}
            </h2>
            <div className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-1">
              {p.professions.join(' · ')}
            </div>
            <div className="text-xs font-mono text-amber-700 dark:text-amber-400 mt-0.5 flex items-center gap-1">
              <MapPin size={11} />
              <span>{p.cities.join(' · ')}</span>
            </div>
          </div>

          {/* Identity Notes if uncertain */}
          {p.identityNotes && (
            <div className="p-2.5 rounded bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] font-mono text-stone-700 dark:text-stone-300 flex items-start gap-2">
              <AlertCircle size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-snug">{p.identityNotes}</p>
            </div>
          )}

          {/* Metrics Bar */}
          <div className="grid grid-cols-4 gap-1.5 text-center py-2.5 px-2 bg-stone-100 dark:bg-stone-800/80 rounded border border-stone-200 dark:border-stone-700/60 font-mono">
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {connected.works.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Works</span>
            </div>
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {p.associatedPlaces.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Places</span>
            </div>
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {p.associatedCompanies.length + p.associatedInstitutions.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Clients</span>
            </div>
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {connected.publications.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Pubs</span>
            </div>
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans line-clamp-3">
            {p.biography}
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                selectAuthor(p.id);
                setActiveTab('people');
              }}
              className="w-full py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Explore Author Universe →</span>
            </button>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 gap-1.5 font-bold"
                onClick={() => openEntity(p.id, 'person')}
              >
                <span>Dossier</span>
                <ExternalLink size={12} />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  updateFilter('personId', p.id);
                  setActiveTab('works');
                }}
                title="Filter catalogued works by this creator"
              >
                Works ({connected.works.length})
              </Button>
            </div>
          </div>
        </div>
      );
    }

    case 'work': {
      const w = entity as Work;
      return (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <EntityBadge type="work" />
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {w.category} · {w.yearDisplay}
              </span>
            </div>
            <h2 className="text-xl font-serif font-black text-stone-950 dark:text-stone-50 leading-tight">
              {w.title}
            </h2>
            <div className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-1">
              By {w.creatorName} ({w.locationName})
            </div>
          </div>

          <div className="w-full h-44 bg-stone-100 dark:bg-stone-900 rounded overflow-hidden border border-stone-200 dark:border-stone-800">
            <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={true} />
          </div>

          <div className="space-y-1.5 text-xs font-mono text-stone-600 dark:text-stone-400 border-t border-b border-stone-200 dark:border-stone-800 py-2.5">
            {w.hotelName && (
              <div className="flex justify-between text-amber-800 dark:text-amber-400 font-bold">
                <span>Grand Hotel:</span>
                <span>{w.hotelName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Technique:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-200">{w.technique}</span>
            </div>
            <div className="flex justify-between">
              <span>Dimensions:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-200">{w.dimensions}</span>
            </div>
          </div>

          <ResearchProvenance work={w} compact />

          {/* Action */}
          <Button
            variant="primary"
            size="sm"
            className="w-full gap-1.5 font-bold"
            onClick={() => openEntity(w.id, 'work')}
          >
            <span>Examine Historical Dossier</span>
            <ExternalLink size={12} />
          </Button>
        </div>
      );
    }

    case 'place': {
      const pl = entity as Place;
      return (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <EntityBadge type="place" />
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {pl.region} · {pl.elevation}
              </span>
            </div>
            <h2 className="text-xl font-serif font-black text-stone-950 dark:text-stone-50 leading-tight">
              {pl.name}
            </h2>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
              {pl.country}
            </div>
          </div>

          {/* Metric counters */}
          <div className="grid grid-cols-4 gap-1.5 text-center py-2.5 px-2 bg-stone-100 dark:bg-stone-800/80 rounded border border-stone-200 dark:border-stone-700/60 font-mono">
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {connected.people.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Artists</span>
            </div>
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {connected.works.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Works</span>
            </div>
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {connected.organizations.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Clients</span>
            </div>
            <div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block">
                {connected.publications.length}
              </span>
              <span className="text-[9px] uppercase text-stone-500 dark:text-stone-400">Pubs</span>
            </div>
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans line-clamp-4">
            {pl.description}
          </p>

          <Button
            variant="primary"
            size="sm"
            className="w-full gap-1.5 font-bold"
            onClick={() => openEntity(pl.id, 'place')}
          >
            <span>Explore Geographic Node</span>
            <ExternalLink size={12} />
          </Button>
        </div>
      );
    }

    case 'organization': {
      const o = entity as Organization;
      return (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <EntityBadge type="organization" />
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {o.type} · {o.activePeriod}
              </span>
            </div>
            <h2 className="text-xl font-serif font-black text-stone-950 dark:text-stone-50 leading-tight">
              {o.name}
            </h2>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
              HQ: {o.headquartersPlaceName}
            </div>
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans line-clamp-4">
            {o.description}
          </p>

          <Button
            variant="primary"
            size="sm"
            className="w-full gap-1.5 font-bold"
            onClick={() => openEntity(o.id, 'organization')}
          >
            <span>Open Institutional Record</span>
            <ExternalLink size={12} />
          </Button>
        </div>
      );
    }

    case 'publication': {
      const pub = entity as Publication;
      return (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <EntityBadge type="publication" />
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {pub.type} · {pub.years}
              </span>
            </div>
            <h2 className="text-xl font-serif font-black text-stone-950 dark:text-stone-50 leading-tight">
              {pub.title}
            </h2>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
              {pub.editorsOrPublishers} · {pub.placeName}
            </div>
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans line-clamp-4">
            {pub.description}
          </p>

          <Button
            variant="primary"
            size="sm"
            className="w-full gap-1.5 font-bold"
            onClick={() => openEntity(pub.id, 'publication')}
          >
            <span>Open Periodical Dossier</span>
            <ExternalLink size={12} />
          </Button>
        </div>
      );
    }

    default:
      return null;
  }
};
