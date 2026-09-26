import React from 'react';
import { cn } from '../../lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'active';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'sm',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:bg-black dark:hover:bg-white border-transparent shadow-xs',
    secondary:
      'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 shadow-2xs',
    outline:
      'bg-transparent text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100/60 dark:hover:bg-stone-800/60',
    ghost:
      'bg-transparent text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 border-transparent hover:bg-stone-100/50 dark:hover:bg-stone-800/50',
    active:
      'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 border-stone-900 dark:border-amber-400 font-bold shadow-xs',
  }[variant];

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  }[size];

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-mono tracking-wide rounded-sm border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none',
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
