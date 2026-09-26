import React from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { Person, Work, Place } from '../../types/atlas';
import { X } from 'lucide-react';
import { PersonDossier } from './dossiers/PersonDossier';
import { WorkDossier } from './dossiers/WorkDossier';
import { PlaceDossier } from './dossiers/PlaceDossier';
import { GenericDossier } from './dossiers/GenericDossier';

export const EntityDetailModal: React.FC = () => {
  const {
    selectedEntity,
    closeEntity,
    openEntity,
    getConnectedEntities,
    getEntityDetails,
    setComparison,
    setActiveTab,
    selectAuthor,
  } = useAtlas();

  if (!selectedEntity) return null;

  const { entity, type } = getEntityDetails(selectedEntity.id, selectedEntity.type);
  const connections = getConnectedEntities(selectedEntity.id);

  if (!entity) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-end sm:p-4 overflow-hidden"
      onClick={closeEntity}
    >
      <div
        className="w-full max-w-2xl h-full sm:h-[95vh] bg-[#FBFBF9] border-l sm:border border-stone-300 shadow-2xl flex flex-col overflow-hidden sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close bar */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="text-[11px] font-mono uppercase text-stone-500 tracking-wider">
            RESEARCH NODE EXPLORER · ID: {selectedEntity.id}
          </div>
          <button
            onClick={closeEntity}
            className="p-1.5 hover:bg-stone-200 rounded text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            title="Close dossier"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Dossier Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {type === 'person' && (
            <PersonDossier
              person={entity as Person}
              connections={connections}
              openEntity={openEntity}
              closeEntity={closeEntity}
              selectAuthor={selectAuthor}
              setActiveTab={setActiveTab}
              setComparison={setComparison}
            />
          )}
          {type === 'work' && (
            <WorkDossier
              work={entity as Work}
              openEntity={openEntity}
              closeEntity={closeEntity}
              setComparison={setComparison}
            />
          )}
          {type === 'place' && (
            <PlaceDossier
              place={entity as Place}
              connections={connections}
              openEntity={openEntity}
            />
          )}
          {type !== 'person' && type !== 'work' && type !== 'place' && (
            <GenericDossier
              entity={entity}
              type={type}
              relationships={connections.relationships}
            />
          )}
        </div>

        {/* Bottom Dead-End Prevention: Related Nodes Strip */}
        <div className="p-3 bg-[#F4F3EE] border-t border-stone-200 text-xs font-mono flex items-center justify-between">
          <span className="text-stone-500 uppercase text-[10px]">Follow Network:</span>
          <div className="flex gap-2 overflow-x-auto max-w-md">
            {connections.people.slice(0, 2).map((p) => (
              <button
                key={p.id}
                onClick={() => openEntity(p.id, 'person')}
                className="px-2 py-0.5 bg-white border border-stone-300 rounded text-stone-800 hover:bg-stone-100 whitespace-nowrap text-[11px] cursor-pointer"
              >
                👤 {p.name}
              </button>
            ))}
            {connections.places.slice(0, 2).map((pl) => (
              <button
                key={pl.id}
                onClick={() => openEntity(pl.id, 'place')}
                className="px-2 py-0.5 bg-white border border-stone-300 rounded text-stone-800 hover:bg-stone-100 whitespace-nowrap text-[11px] cursor-pointer"
              >
                📍 {pl.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
