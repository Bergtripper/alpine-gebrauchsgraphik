import React from 'react';
import { EntityType } from '../../types/atlas';
import { cn } from '../../lib/cn';
import { User, Image, MapPin, Building2, BookOpen, Tag, Archive } from 'lucide-react';

interface EntityBadgeProps {
  type: EntityType;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  count?: number;
}

export const EntityBadge: React.FC<EntityBadgeProps> = ({
  type,
  label,
  size = 'sm',
  className,
  count,
}) => {
  const config = {
    person: {
      label: 'Person',
      icon: User,
      color: 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-600',
      dot: 'bg-red-500',
    },
    work: {
      label: 'Work',
      icon: Image,
      color: 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-600',
      dot: 'bg-blue-500',
    },
    place: {
      label: 'Place',
      icon: MapPin,
      color: 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-600',
      dot: 'bg-amber-500',
    },
    organization: {
      label: 'Organization',
      icon: Building2,
      color: 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-600',
      dot: 'bg-emerald-500',
    },
    publication: {
      label: 'Publication',
      icon: BookOpen,
      color: 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-600',
      dot: 'bg-purple-500',
    },
    theme: {
      label: 'Theme',
      icon: Tag,
      color: 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-600',
      dot: 'bg-rose-500',
    },
    archiveItem: {
      label: 'Archive',
      icon: Archive,
      color: 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-600',
      dot: 'bg-stone-500',
    },
  }[type];

  const Icon = config.icon;
  const displayLabel = label || config.label;

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[9px] gap-1',
    sm: 'px-2 py-0.5 text-[10px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-medium border uppercase tracking-[0.12em] select-none',
        config.color,
        sizeClasses,
        className
      )}
    >
      <Icon size={size === 'xs' ? 10 : size === 'sm' ? 11 : 13} className="shrink-0" />
      <span>{displayLabel}</span>
      {count !== undefined && (
        <span className="font-bold opacity-80 text-[9px]">({count})</span>
      )}
    </span>
  );
};

export const ResearchStatusBadge: React.FC<{
  status?: string;
  size?: 'xs' | 'sm';
  className?: string;
}> = ({ status = 'CONFIRMED', size = 'xs', className }) => {
  const normalized = status.toUpperCase();
  const config: Record<string, { label: string; style: string; badge: string }> = {
    CONFIRMED: {
      label: 'CONFIRMED',
      style: 'border-emerald-400/40 text-emerald-700 dark:text-emerald-400 bg-transparent',
      badge: '●',
    },
    ATTRIBUTED: {
      label: 'ATTRIBUTED',
      style: 'border-blue-400/40 text-blue-700 dark:text-blue-400 bg-transparent',
      badge: '◐',
    },
    PROBABLE: {
      label: 'PROBABLE',
      style: 'border-amber-400/40 text-amber-700 dark:text-amber-400 bg-transparent',
      badge: '◑',
    },
    UNVERIFIED: {
      label: 'UNVERIFIED',
      style: 'border-purple-400/40 text-purple-700 dark:text-purple-400 bg-transparent',
      badge: '?',
    },
    UNIDENTIFIED: {
      label: 'UNIDENTIFIED',
      style: 'border-stone-400/50 text-stone-700 dark:text-stone-300 bg-transparent border-dashed',
      badge: '⊗',
    },
  };

  const current = config[normalized] || config.CONFIRMED;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-mono font-semibold tracking-[0.12em] px-1.5 py-0.5 border text-[9px] uppercase select-none',
        current.style,
        size === 'sm' && 'text-[10px] px-2 py-0.5',
        className
      )}
      title={`Epistemic Research Status: ${current.label}`}
    >
      <span className="text-[8px] font-mono leading-none">{current.badge}</span>
      <span>{current.label}</span>
    </span>
  );
};
