import React, { useMemo } from 'react';
import { cn } from '../../lib/cn';

interface ElevationProfileProps {
  points: { x: number; y: number }[];
  height?: number;
  className?: string;
  label?: string;
  color?: string;
  showAxes?: boolean;
}

export const ElevationProfile: React.FC<ElevationProfileProps> = ({
  points,
  height = 80,
  className,
  label,
  color = 'stroke-amber-600',
  showAxes = true,
}) => {
  const { pathData, areaData, maxVal, minVal } = useMemo(() => {
    if (points.length === 0) return { pathData: '', areaData: '', maxVal: 0, minVal: 0 };

    const max = Math.max(...points.map((p) => p.y));
    const min = Math.min(...points.map((p) => p.y));
    const range = max - min || 1;

    // Normalize points to SVG space (0-100 x, 0-height y)
    // SVG Y is inverted (0 is top)
    const normalized = points.map((p) => ({
      x: p.x,
      y: height - ((p.y - min) / range) * (height - 15) - 10,
    }));

    // Generate smooth bezier path
    const path = normalized.reduce((acc, p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      
      const prev = arr[i - 1];
      const cp1x = prev.x + (p.x - prev.x) / 2;
      const cp2x = prev.x + (p.x - prev.x) / 2;
      
      return acc + ` C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
    }, '');

    const area = path + ` L 100 ${height + 20} L 0 ${height + 20} Z`;

    return { pathData: path, areaData: area, maxVal: max, minVal: min };
  }, [points, height]);

  if (points.length === 0) return null;

  const id = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <div className="flex justify-between items-end mb-1 px-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 font-bold">
            {label}
          </span>
          <span className="text-[10px] font-mono text-amber-700 font-bold tabular-nums">
            {Math.round(maxVal)}m
          </span>
        </div>
      )}

      <div className="relative group">
        <svg
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          style={{ height: `${height}px` }}
        >
          <defs>
            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
            <filter id={`glow-${id}`}>
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle Grid Lines */}
          {showAxes && (
            <g className="opacity-10 dark:opacity-20" stroke="currentColor" strokeWidth="0.2">
              {[0, 25, 50, 75, 100].map(v => (
                <line key={`v-${v}`} x1={v} y1="0" x2={v} y2={height} />
              ))}
              {[0, height / 2, height].map(v => (
                <line key={`h-${v}`} x1="0" y1={v} x2="100" y2={v} />
              ))}
            </g>
          )}

          {/* Area Fill */}
          <path
            d={areaData}
            fill={`url(#grad-${id})`}
            className="text-amber-500 dark:text-amber-400"
          />

          {/* Elevation Line */}
          <path
            d={pathData}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#glow-${id})`}
            className={cn('transition-all duration-1000', color)}
          />

          {/* Peak Indicators */}
          {points.map((p, i) => {
            if (p.y === maxVal) {
              const py = height - ((p.y - minVal) / (maxVal - minVal || 1)) * (height - 15) - 10;
              return (
                <g key={i}>
                  <line 
                    x1={p.x} y1={py} x2={p.x} y2={height} 
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2" 
                    className="text-stone-300"
                  />
                  <circle
                    cx={p.x}
                    cy={py}
                    r="2.5"
                    className="fill-white stroke-amber-600 stroke-[1.5] shadow-lg"
                  />
                </g>
              );
            }
            return null;
          })}
        </svg>

        {/* Dynamic Labels */}
        {showAxes && (
          <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[8px] font-mono text-stone-400 uppercase tracking-tighter opacity-60">
            <span>Entry</span>
            <span>Altitude Curve</span>
            <span>Exit</span>
          </div>
        )}
      </div>
    </div>
  );
};
