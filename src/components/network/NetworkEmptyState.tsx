import React from 'react';
import { PEOPLE } from '../../data';
import { Share2, Globe } from 'lucide-react';

interface NetworkEmptyStateProps {
  selectAuthor: (id: string) => void;
  onExploreGlobal: () => void;
}

export const NetworkEmptyState: React.FC<NetworkEmptyStateProps> = ({
  selectAuthor,
  onExploreGlobal,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-3xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 shadow-xs">
        <Share2 size={28} className="text-amber-600 dark:text-amber-400" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
          AUTHOR-FIRST RELATIONAL EXPLORATION
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-stone-100">
          Select an Author to Explore Their Local Network
        </h2>
        <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
          The network interface visualizes direct historical relationships: clients worked for, places lived or represented in, publications, printers, and artistic collaborations.
        </p>
      </div>

      {/* Quick Author Selection Chips */}
      <div className="space-y-3 w-full">
        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 dark:text-stone-500 block">
          CHOOSE AN INITIAL AUTHOR:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {PEOPLE.slice(0, 10).map((person) => (
            <button
              key={person.id}
              onClick={() => selectAuthor(person.id)}
              className="px-3 py-1.5 rounded bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono font-semibold text-stone-800 dark:text-stone-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group"
            >
              <span>{person.name}</span>
              <span className="text-[10px] text-stone-400 group-hover:text-amber-600 transition-colors">↗</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alternative: Full Global Network */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 w-full">
        <button
          onClick={onExploreGlobal}
          className="px-4 py-2.5 rounded bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-mono text-xs font-bold hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-2 mx-auto cursor-pointer shadow-sm"
        >
          <Globe size={14} />
          <span>Explore Full Global Alpine Graph (All 25 Authors & 100+ Nodes)</span>
        </button>
      </div>
    </div>
  );
};
