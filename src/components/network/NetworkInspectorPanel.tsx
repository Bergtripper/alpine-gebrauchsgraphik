import React from 'react';
import { GraphNode } from './networkGraphBuilder';
import { EntityBadge } from '../ui/EntityBadge';

interface NetworkInspectorPanelProps {
  focusedNode: GraphNode;
  onClose: () => void;
  selectAuthor: (id: string) => void;
  openEntity: (id: string, type: any) => void;
}

export const NetworkInspectorPanel: React.FC<NetworkInspectorPanelProps> = ({
  focusedNode,
  onClose,
  selectAuthor,
  openEntity,
}) => {
  return (
    <aside
      aria-label="Node Details"
      className="absolute top-4 right-4 z-20 w-80 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-300 dark:border-stone-700 rounded-lg p-4 shadow-xl space-y-3 font-mono text-xs animate-fade-in"
    >
      <div className="flex items-start justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <EntityBadge type={focusedNode.type} />
            <span className="text-[10px] text-stone-500">
              {focusedNode.degree === 0 ? 'CENTRAL AUTHOR' : focusedNode.degree === 1 ? 'DIRECT 1ST DEGREE' : 'SECONDARY 2ND DEGREE'}
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-stone-950 dark:text-stone-50">
            {focusedNode.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Semantic Relationship Explanation */}
      {focusedNode.parentConnection && (
        <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-950 dark:text-amber-200 space-y-1">
          <span className="block font-bold uppercase tracking-wider text-[9px] text-amber-700 dark:text-amber-400">
            HISTORICAL CONNECTION TYPE:
          </span>
          <p className="font-semibold">
            {focusedNode.parentConnection.relationLabel}
          </p>
          <p className="text-[10px] text-stone-600 dark:text-stone-400 pt-0.5">
            Connecting {focusedNode.parentConnection.sourceName} ↔ {focusedNode.parentConnection.targetName}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="pt-2 flex items-center justify-between">
        {focusedNode.type === 'person' && focusedNode.degree !== 0 && (
          <button
            onClick={() => selectAuthor(focusedNode.id)}
            className="text-amber-700 dark:text-amber-400 hover:underline font-bold cursor-pointer"
          >
            Set as Central Author →
          </button>
        )}

        <button
          onClick={() => openEntity(focusedNode.id, focusedNode.type)}
          className="px-3 py-1.5 rounded bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold ml-auto cursor-pointer"
        >
          Full Dossier ↗
        </button>
      </div>
    </aside>
  );
};
