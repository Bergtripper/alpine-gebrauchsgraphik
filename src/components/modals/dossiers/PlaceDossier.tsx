import React, { useMemo } from 'react';
import { Place, Work, Person, Organization, Publication, Relationship } from '../../../types/atlas';
import { ArtworkVisualizer } from '../../common/ArtworkVisualizer';
import { ElevationProfile } from '../../ui/ElevationProfile';
import { generatePlaceProfile } from '../../../lib/elevationUtils';

interface PlaceDossierProps {
  place: Place;
  connections: {
    relationships: Relationship[];
    people: Person[];
    works: Work[];
    places: Place[];
    organizations: Organization[];
    publications: Publication[];
  };
  openEntity: (id: string, type: any) => void;
}

export const PlaceDossier: React.FC<PlaceDossierProps> = ({
  place,
  connections,
  openEntity,
}) => {
  const profilePoints = useMemo(() => 
    generatePlaceProfile(place.id, place.elevationMeters), 
    [place.id, place.elevationMeters]
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-xs uppercase font-mono tracking-widest text-stone-500 mb-1">
              GEOGRAPHIC RESEARCH NODE · {place.region} ({place.country})
            </div>
            <h1 className="text-3xl font-serif text-stone-900 tracking-tight">
              {place.name}
              {place.alternateNames && place.alternateNames.length > 0 && (
                <span className="text-xl font-normal text-stone-500 ml-2">
                  / {place.alternateNames.join(' · ')}
                </span>
              )}
            </h1>
            <div className="text-xs font-mono text-stone-600 mt-1">
              {place.coordinates.lat}° N, {place.coordinates.lng}° E
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-serif text-amber-700">{place.elevation}</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Surface Altitude</div>
          </div>
        </div>
      </div>

      <div className="relative h-24 bg-stone-50 rounded-lg border border-stone-100 overflow-hidden group">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <ElevationProfile 
          points={profilePoints} 
          height={60} 
          showAxes={true}
          label="Topographic Section"
          className="absolute bottom-4 left-4 right-4"
          color="stroke-amber-600"
        />
      </div>

      <p className="text-stone-800 text-sm leading-relaxed max-w-prose italic font-serif">
        {place.description}
      </p>

      {/* Ecosystem Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
        <div className="p-3 bg-stone-100 rounded border border-stone-200">
          <span className="text-xl font-bold text-stone-900 block">{connections.people.length}</span>
          <span className="text-stone-600 text-[11px]">Associated Artists</span>
        </div>
        <div className="p-3 bg-stone-100 rounded border border-stone-200">
          <span className="text-xl font-bold text-stone-900 block">{connections.works.length}</span>
          <span className="text-stone-600 text-[11px]">Catalogued Works</span>
        </div>
        <div className="p-3 bg-stone-100 rounded border border-stone-200">
          <span className="text-xl font-bold text-stone-900 block">{connections.organizations.length}</span>
          <span className="text-stone-600 text-[11px]">Institutions</span>
        </div>
        <div className="p-3 bg-stone-100 rounded border border-stone-200">
          <span className="text-xl font-bold text-stone-900 block">{connections.publications.length}</span>
          <span className="text-stone-600 text-[11px]">Periodicals</span>
        </div>
      </div>

      {/* Key Roles */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
          Historical Visual Culture Functions
        </h3>
        <div className="flex flex-wrap gap-2">
          {place.keyRoles.map((role, i) => (
            <span key={i} className="px-2.5 py-1 bg-stone-50 border border-stone-200 text-xs font-mono text-stone-800 rounded">
              • {role}
            </span>
          ))}
        </div>
      </div>

      {/* Works created in or for this location */}
      {connections.works.length > 0 && (
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            Works Originating or Commissioned for {place.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {connections.works.map((w) => (
              <div
                key={w.id}
                onClick={() => openEntity(w.id, 'work')}
                className="p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded cursor-pointer flex gap-3 items-center"
              >
                <div className="w-12 h-16 shrink-0 bg-stone-200 rounded overflow-hidden">
                  <ArtworkVisualizer work={w} size="sm" showPalette={false} interactiveZoom={false} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900">{w.title}</div>
                  <div className="text-[11px] font-mono text-stone-500">
                    {w.creatorName} · {w.yearDisplay}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
