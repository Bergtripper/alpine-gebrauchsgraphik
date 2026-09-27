import React from 'react';

interface AlpineSurveyMotifProps {
  variant?: 'ridge' | 'section' | 'signal';
  className?: string;
  label?: string;
}

/**
 * Reusable visual grammar for the Constructivist Alpine Survey system.
 * These are analytical/interface motifs, not historical reproductions.
 */
export const AlpineSurveyMotif: React.FC<AlpineSurveyMotifProps> = ({
  variant = 'ridge',
  className = '',
  label = 'ALPINE SURVEY',
}) => {
  if (variant === 'signal') {
    return (
      <div className={`relative overflow-hidden border-y border-stone-300 dark:border-stone-700 h-14 ${className}`}>
        <div className="absolute inset-0 bg-[#F2EFE7] dark:bg-[#11141a]" />
        <div className="absolute -left-10 top-0 h-full w-40 -skew-x-[32deg] bg-stone-900 dark:bg-stone-100" />
        <div className="absolute left-28 top-0 h-full w-12 -skew-x-[32deg] bg-[#9E3E2F] dark:bg-[#B65443]" />
        <div className="absolute inset-y-0 right-4 flex items-center font-mono text-[9px] tracking-[0.18em] uppercase text-stone-600 dark:text-stone-300">
          {label}
        </div>
      </div>
    );
  }

  if (variant === 'section') {
    return (
      <svg
        viewBox="0 0 600 90"
        preserveAspectRatio="none"
        className={`w-full h-16 text-stone-900 dark:text-stone-100 ${className}`}
        aria-hidden="true"
      >
        <line x1="0" y1="72" x2="600" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        {[60, 160, 260, 360, 460, 560].map((x) => (
          <line key={x} x1={x} y1="68" x2={x} y2="77" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        ))}
        <polyline
          points="0,68 44,61 86,44 123,52 172,24 216,42 260,35 303,12 348,38 394,31 444,51 493,29 545,48 600,34"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <line x1="303" y1="12" x2="303" y2="72" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <text x="309" y="20" fill="currentColor" fontSize="8" fontFamily="var(--font-mono)" opacity="0.8">
          3343 M
        </text>
        <text x="6" y="86" fill="currentColor" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55">
          SECTION / WEST—EAST
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1000 180"
      preserveAspectRatio="none"
      className={`w-full h-full text-stone-900 dark:text-stone-100 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 158 L72 140 L124 112 L184 126 L250 78 L304 104 L356 90 L430 34 L492 98 L548 76 L604 112 L672 58 L726 88 L790 48 L854 100 L914 66 L1000 92 L1000 180 L0 180 Z"
        fill="currentColor"
        opacity="0.055"
      />
      <polyline
        points="0,158 72,140 124,112 184,126 250,78 304,104 356,90 430,34 492,98 548,76 604,112 672,58 726,88 790,48 854,100 914,66 1000,92"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line x1="430" y1="34" x2="430" y2="166" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <text x="440" y="48" fill="currentColor" fontSize="9" fontFamily="var(--font-mono)" opacity="0.7">
        P.430 / 3343 M
      </text>
      <line x1="0" y1="166" x2="1000" y2="166" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
};
