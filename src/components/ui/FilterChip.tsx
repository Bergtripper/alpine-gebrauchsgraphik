import React from 'react';
import { cn } from '../../lib/cn';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  value?: string;
  onRemove?: () => void;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  value,
  onRemove,
  onClick,
  active = false,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-colors cursor-pointer select-none',
        active
          ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 border-stone-900 dark:border-amber-400 font-bold'
          : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600',
        className
      )}
    >
      <span className="font-semibold">{label}</span>
      {value && <span className="opacity-80">({value})</span>}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded"
        >
          <X size={11} />
        </button>
      )}
    </div>
  );
};
