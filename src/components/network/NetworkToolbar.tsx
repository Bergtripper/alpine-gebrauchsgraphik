import React from 'react';
import { EntityType } from '../../types/atlas';
import { Share2, Globe, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/cn';

interface NetworkToolbarProps {
  networkMode: 'local' | 'global';
  onModeChange: (mode: 'local' | 'global') => void;
  hasActiveNode: boolean;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  visibleTypes: Record<EntityType, boolean>;
  onToggleType: (type: EntityType) => void;
}

export const NetworkToolbar: React.FC<NetworkToolbarProps> = ({
  networkMode,
  onModeChange,
  hasActiveNode,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  visibleTypes,
  onToggleType,
}) => {
  const typePills = [
    { type: 'person' as EntityType, label: 'People', color: '#0284c7' },
    { type: 'place' as EntityType, label: 'Places', color: '#dc2626' },
    { type: 'work' as EntityType, label: 'Works', color: '#059669' },
    { type: 'organization' as EntityType, label: 'Clients / Orgs', color: '#7c3aed' },
    { type: 'publication' as EntityType, label: 'Publications', color: '#ea580c' },
  ] as const;

  return (
    <>
      {/* Top Left: Controls & Mode Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        {/* Local vs Global Network Mode Switcher */}
        <div className="flex items-center rounded-md border border-stone-300 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-xs p-0.5 text-xs font-mono">
          <button
            onClick={() => {
              if (hasActiveNode) onModeChange('local');
            }}
            className={cn(
              'px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5',
              networkMode === 'local'
                ? 'bg-amber-500 text-white font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
            )}
            title="Local network centered on selected author"
          >
            <Share2 size={12} />
            <span>Local Network</span>
          </button>

          <button
            onClick={() => onModeChange('global')}
            className={cn(
              'px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5',
              networkMode === 'global'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
            )}
            title="Full global graph across all authors and entities"
          >
            <Globe size={12} />
            <span>Global Atlas</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center rounded-md border border-stone-300 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-xs p-1 text-xs font-mono">
          <button
            onClick={onZoomIn}
            className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-700 dark:text-stone-300 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <span className="px-2 font-mono text-[11px] text-stone-600 dark:text-stone-400">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomOut}
            className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-700 dark:text-stone-300 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <div className="w-[1px] h-4 bg-stone-200 dark:border-stone-800 mx-1" />
          <button
            onClick={onResetView}
            className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-700 dark:text-stone-300 cursor-pointer"
            title="Reset View"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Left: Network Legend & Type Toggles */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-300 dark:border-stone-700 rounded-md p-1.5 shadow-xs text-[11px] font-mono">
        <span className="text-stone-400 dark:text-stone-500 uppercase px-1 text-[9px]">TOGGLE:</span>
        {typePills.map((t) => (
          <button
            key={t.type}
            onClick={() => onToggleType(t.type)}
            className={cn(
              'px-2 py-0.5 rounded border transition-colors flex items-center gap-1 cursor-pointer',
              visibleTypes[t.type]
                ? 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-600 text-stone-800 dark:text-stone-200'
                : 'opacity-40 border-dashed border-stone-300 dark:border-stone-700 text-stone-400'
            )}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};
