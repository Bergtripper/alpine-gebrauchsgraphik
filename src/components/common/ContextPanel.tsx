import React from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { ContextEntitySummary } from '../context-panel/ContextEntitySummary';
import { ContextConnectedNodes } from '../context-panel/ContextConnectedNodes';

export const ContextPanel: React.FC = () => {
  const {
    activeNode,
    selectNode,
    clearActiveNode,
    openEntity,
    getEntityDetails,
    getConnectedEntities,
    isContextPanelOpen,
    updateFilter,
    setActiveTab,
    selectAuthor,
  } = useAtlas();

  if (!isContextPanelOpen || !activeNode) {
    return null;
  }

  const { entity, type } = getEntityDetails(activeNode.id, activeNode.type);
  if (!entity) return null;

  const connected = getConnectedEntities(activeNode.id);

  return (
    <aside
      aria-label="Contextual Node Information Panel"
      className={cn(
        'w-80 md:w-96 shrink-0 h-full border-l border-stone-200 dark:border-stone-800 bg-[#F6F4EE] dark:bg-[#0c0e14] flex flex-col z-30 transition-all select-none overflow-y-auto'
      )}
    >
      {/* Panel Header */}
      <div className="sticky top-0 z-20 h-10 px-4 bg-[#FBFBF9]/95 dark:bg-[#0c0e14]/95  border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
        <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400">
          NODE CONTEXT
        </span>
        <button
          onClick={clearActiveNode}
          className="p-1 text-stone-500 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 cursor-pointer"
          title="Close context panel"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-0 flex-1 divide-y divide-stone-300 dark:divide-stone-800">
        {/* Main Entity Summary */}
        <div className="p-4">
        <ContextEntitySummary
          entity={entity}
          type={type}
          connected={connected}
          openEntity={openEntity}
          selectAuthor={selectAuthor}
          updateFilter={updateFilter}
          setActiveTab={setActiveTab}
        />
        </div>

        {/* Continuous Exploration — Connected Entities */}
        <div className="p-4">
        <ContextConnectedNodes
          connected={connected}
          selectNode={selectNode}
        />
        </div>
      </div>
    </aside>
  );
};
