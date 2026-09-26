import React from 'react';
import { EntityType, Relationship } from '../../../types/atlas';

interface GenericDossierProps {
  entity: any;
  type: EntityType;
  relationships: Relationship[];
}

export const GenericDossier: React.FC<GenericDossierProps> = ({
  entity,
  type,
  relationships,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-stone-200 pb-3">
        <div className="text-xs font-mono uppercase text-stone-500">
          {type.toUpperCase()} NODE
        </div>
        <h1 className="text-2xl font-serif text-stone-900">
          {entity.name || entity.title}
        </h1>
      </div>
      <p className="text-xs text-stone-700 font-mono">
        {entity.description || entity.notes || ''}
      </p>

      {relationships.length > 0 && (
        <div className="pt-4 border-t border-stone-200">
          <h3 className="text-xs font-mono uppercase text-stone-500 mb-2">Interconnected Entities</h3>
          <div className="space-y-1.5">
            {relationships.map((rel) => (
              <div key={rel.id} className="text-xs font-mono p-2 bg-stone-50 border border-stone-200 rounded flex justify-between">
                <span>{rel.sourceName} → {rel.targetName}</span>
                <span className="text-stone-500 italic">{rel.relationLabel}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
