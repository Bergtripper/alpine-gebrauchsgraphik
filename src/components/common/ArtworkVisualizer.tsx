import React, { useState } from 'react';
import { Work } from '../../types/atlas';
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Sparkles } from 'lucide-react';
import { useAtlas } from '../../context/AtlasContext';

interface ArtworkVisualizerProps {
  work: Work;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showPalette?: boolean;
  interactiveZoom?: boolean;
}

export const ArtworkVisualizer: React.FC<ArtworkVisualizerProps> = ({
  work,
  size = 'md',
  showPalette = true,
  interactiveZoom = true,
}) => {
  const { artworkZoomId, setArtworkZoomId, openEntity } = useAtlas();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showLithoGrain, setShowLithoGrain] = useState(true);
  const isZoomed = artworkZoomId === work.id;
  const realImage = work.images?.find((image) => Boolean(image.src));
  const hasRealImage = Boolean(realImage?.src);

  const heightClasses = {
    sm: 'h-48',
    md: 'h-72',
    lg: 'h-96',
    hero: 'h-[500px]',
  }[size];

  const renderMotifGraphic = (scale: number = 1) => {
    const { motifType, primaryColor, secondaryColor, accentColor, subtext } = work.visualMotif;
    const filterId = `grain-${work.id}`;

    switch (motifType) {
      case 'ski_diagonal':
        return (
          <svg
            viewBox="0 0 400 560"
            className="w-full h-full object-cover select-none"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          >
            <defs>
              <linearGradient id={`sky-grad-${work.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="35%" stopColor={primaryColor} />
                <stop offset="70%" stopColor="#1C7ED6" />
                <stop offset="100%" stopColor="#A5D8FF" />
              </linearGradient>
              <linearGradient id={`snow-grad-${work.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id={`dolomite-rock-${work.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <filter id={filterId}>
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0" />
                <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
              </filter>
            </defs>

            {/* Alpine Sky Field */}
            <rect width="400" height="560" fill={`url(#sky-grad-${work.id})`} filter={showLithoGrain ? `url(#${filterId})` : undefined} />

            {/* Intense High-Altitude Alpine Sun */}
            <circle cx="320" cy="115" r="50" fill="#FEF08A" opacity="0.95" />
            <circle cx="320" cy="115" r="75" fill="#FEF08A" opacity="0.25" />

            {/* Distant Dolomite Limestone Towers (Tre Cime style) */}
            <polygon points="120,240 180,95 240,230" fill="#1E293B" />
            <polygon points="180,95 210,135 240,230 220,230" fill="#94A3B8" opacity="0.8" />
            
            <polygon points="210,230 270,80 340,240" fill="#334155" />
            <polygon points="270,80 295,120 340,240 320,240" fill="#CBD5E1" opacity="0.7" />

            <polygon points="20,260 90,130 160,250" fill="#1E293B" />
            <polygon points="90,130 115,170 160,250 140,250" fill="#94A3B8" opacity="0.8" />

            {/* Glacial Ridges & Cirque Snow Fields */}
            <polygon points="0,270 400,210 400,320 0,380" fill="#E2E8F0" opacity="0.85" />

            {/* Steep Downhill Slope - Modernist Diagonal Knife Cut */}
            <polygon points="-20,260 420,410 420,580 -20,580" fill={`url(#snow-grad-${work.id})`} />
            
            {/* Dynamic Ski Tracks and Carving Lines */}
            <path d="M -30 270 Q 180 360 420 420" stroke="#94A3B8" strokeWidth="4" fill="none" opacity="0.6" />
            <path d="M -40 290 Q 170 380 420 440" stroke="#94A3B8" strokeWidth="2.5" fill="none" opacity="0.5" />

            {/* Powder Snow Drift Particles */}
            <g opacity="0.85">
              <ellipse cx="120" cy="355" rx="35" ry="12" fill="#FFFFFF" transform="rotate(-15 120 355)" opacity="0.9" />
              <ellipse cx="160" cy="370" rx="50" ry="16" fill="#FFFFFF" transform="rotate(-15 160 370)" opacity="0.7" />
              <circle cx="95" cy="340" r="3" fill="#FFFFFF" />
              <circle cx="110" cy="335" r="4.5" fill="#FFFFFF" />
              <circle cx="130" cy="330" r="3.5" fill="#FFFFFF" />
              <circle cx="150" cy="345" r="5" fill="#FFFFFF" />
            </g>

            {/* Modernist Athletic Skier (Franz Lenhart Style) */}
            <g transform="translate(180, 245) rotate(-16)">
              {/* Skis */}
              <line x1="-110" y1="130" x2="80" y2="162" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
              <line x1="-100" y1="148" x2="90" y2="180" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />

              {/* Legs in dynamic athletic forward flex */}
              <path d="M 0,110 L 25,65 L 4,20 L -22,55 Z" fill={accentColor} />
              
              {/* Tanned Athletic Head & Alpine Wool Cap */}
              <circle cx="18" cy="8" r="14" fill="#D97706" />
              <path d="M 8,4 Q 24,-8 32,5 Z" fill={accentColor} />
              
              {/* Dynamic Flying Wool Scarf in high speed wind */}
              <path d="M 6,18 Q -30,10 -65,22 Q -40,30 2,24 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />

              {/* Ski Poles & Baskets */}
              <line x1="16" y1="38" x2="-70" y2="120" stroke="#0F172A" strokeWidth="3" />
              <circle cx="-70" cy="120" r="9" stroke="#0F172A" strokeWidth="2.5" fill="none" />
              
              <line x1="26" y1="42" x2="-45" y2="135" stroke="#0F172A" strokeWidth="3" />
              <circle cx="-45" cy="135" r="9" stroke="#0F172A" strokeWidth="2.5" fill="none" />
            </g>

            {/* Authentic Swiss / Italian Travel Poster Typography Block */}
            <rect x="25" y="465" width="350" height="70" fill="#0A0F1D" rx="2" stroke="#1E293B" strokeWidth="1" />
            <text x="200" y="500" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-sans)" fontWeight="900" fontSize="26" letterSpacing="4">
              {work.locationName.toUpperCase()}
            </text>
            <text x="200" y="522" textAnchor="middle" fill="#FACC15" fontFamily="var(--font-mono)" fontWeight="700" fontSize="10" letterSpacing="2.5">
              {subtext}
            </text>

            {/* Archival Litho Registration Target */}
            <circle cx="375" cy="25" r="6" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.6" />
            <line x1="365" y1="25" x2="385" y2="25" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
            <line x1="375" y1="15" x2="375" y2="35" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          </svg>
        );

      case 'climbing_peak':
        return (
          <svg
            viewBox="0 0 400 560"
            className="w-full h-full object-cover select-none"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          >
            <defs>
              <linearGradient id={`rock-grad-${work.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#18181B" />
                <stop offset="50%" stopColor="#27272A" />
                <stop offset="100%" stopColor="#09090B" />
              </linearGradient>
            </defs>

            <rect width="400" height="560" fill={`url(#rock-grad-${work.id})`} />

            {/* Sheer Vertical Strata (Granite & Dolomite Pillars) */}
            <polygon points="0,0 280,0 190,560 0,560" fill="#1C1917" />
            <polygon points="130,0 390,0 270,560 170,560" fill="#292524" />
            <polygon points="260,0 400,0 400,560 280,560" fill="#18181B" />

            {/* Overhanging Dolomite Pinnacle Wall */}
            <polygon points="70,110 230,30 330,150 220,350 100,230" fill={primaryColor} opacity="0.95" />
            
            {/* Rock Cracks & Fissures */}
            <path d="M 230,30 L 210,140 L 250,220 L 210,340" stroke="#F59E0B" strokeWidth="2.5" fill="none" opacity="0.75" />
            <path d="M 160,70 L 140,160 L 175,230" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M 270,90 L 300,180" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.4" />

            {/* Alpinist Climbing Rope in Free Vertical Drop */}
            <path d="M 230,30 Q 180,180 240,310 T 210,480" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeDasharray="8,3" />

            {/* Alpinist Figure Suspended on Overhang (Gino Merlet Style) */}
            <g transform="translate(195, 220)">
              <circle cx="0" cy="0" r="11" fill="#FACC15" />
              {/* Torso & Climber's Loden breeches */}
              <path d="M -9,12 L 14,20 L 9,46 L -11,36 Z" fill="#FFFFFF" />
              {/* Arm reaching for rock ledge */}
              <line x1="6" y1="20" x2="26" y2="4" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              {/* Leg braced against dolomite face */}
              <line x1="7" y1="44" x2="18" y2="72" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              {/* Heavy expedition rucksack */}
              <rect x="-22" y="16" width="15" height="24" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
              {/* Piton hammer at belt */}
              <line x1="-5" y1="40" x2="-14" y2="55" stroke="#CBD5E1" strokeWidth="2.5" />
            </g>

            {/* Archival Woodcut Title Cartouche */}
            <rect x="25" y="470" width="350" height="65" fill="#1C1917" stroke="#D97706" strokeWidth="1.5" />
            <text x="200" y="500" textAnchor="middle" fill="#FAFAF9" fontFamily="var(--font-sans)" fontWeight="900" fontSize="18" letterSpacing="3">
              {work.title.slice(0, 26).toUpperCase()}
            </text>
            <text x="200" y="522" textAnchor="middle" fill="#F59E0B" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">
              {subtext}
            </text>
          </svg>
        );

      case 'railway_curve':
        return (
          <svg
            viewBox="0 0 400 560"
            className="w-full h-full object-cover select-none"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          >
            {/* Alpine Sky & Valley Mist */}
            <rect width="400" height="560" fill="#0F172A" />
            <rect width="400" height="260" fill={primaryColor} opacity="0.85" />
            
            {/* Towering Snow Peaks */}
            <polygon points="0,220 110,80 200,190 290,60 400,200 400,340 0,340" fill="#1E293B" />
            <polygon points="110,80 140,120 200,190" fill="#F8FAFC" opacity="0.85" />
            <polygon points="290,60 320,110 400,200" fill="#F8FAFC" opacity="0.85" />

            {/* Pine Forest Ridge */}
            <polygon points="0,280 400,250 400,370 0,390" fill="#064E3B" />

            {/* Sweeping Stone Viaduct Across the Mountain Gorge */}
            <path d="M -40,470 Q 180,380 440,320" stroke="#F97316" strokeWidth="16" fill="none" />
            <path d="M -40,470 Q 180,380 440,320" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="12,6" fill="none" />

            {/* Electric Locomotive with Pantograph */}
            <g transform="translate(180, 350) rotate(-14)">
              <rect x="0" y="-22" width="76" height="28" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
              <rect x="8" y="-18" width="18" height="14" fill="#FEF08A" />
              <rect x="34" y="-18" width="18" height="14" fill="#FEF08A" />
              {/* Pantograph */}
              <line x1="22" y1="-22" x2="30" y2="-36" stroke="#E2E8F0" strokeWidth="2.5" />
              <line x1="30" y1="-36" x2="52" y2="-36" stroke="#E2E8F0" strokeWidth="3.5" />
            </g>

            {/* Typography Banner */}
            <rect x="25" y="470" width="350" height="65" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
            <text x="200" y="502" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-sans)" fontWeight="900" fontSize="20" letterSpacing="3">
              {work.title.slice(0, 24).toUpperCase()}
            </text>
            <text x="200" y="522" textAnchor="middle" fill="#FEF08A" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">
              {subtext}
            </text>
          </svg>
        );

      case 'promenade_sun':
        return (
          <svg
            viewBox="0 0 400 560"
            className="w-full h-full object-cover select-none"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          >
            {/* Luminous Warm Southern Resort Atmosphere */}
            <rect width="400" height="560" fill="#FEF9C3" />
            <rect width="400" height="260" fill="#38BDF8" />

            {/* Distant Glacial Texelgruppe Snow Peaks */}
            <polygon points="10,240 120,80 230,210 330,70 400,190 400,260 0,260" fill="#FFFFFF" />
            <polygon points="120,80 145,120 190,190" fill="#93C5FD" opacity="0.7" />
            <polygon points="330,70 355,110 400,190" fill="#93C5FD" opacity="0.7" />

            {/* Sunburst Rays (Art Deco Meran Health Resort Motif) */}
            <circle cx="200" cy="110" r="48" fill="#FDE047" opacity="0.95" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const x1 = 200 + Math.cos(angle) * 55;
              const y1 = 110 + Math.sin(angle) * 55;
              const x2 = 200 + Math.cos(angle) * 85;
              const y2 = 110 + Math.sin(angle) * 85;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FDE047" strokeWidth="2.5" opacity="0.6" />;
            })}

            {/* Sub-Mediterranean Fan Palms & Cypress Silhouettes */}
            <path d="M 40,560 L 60,320 L 70,560 Z" fill="#14532D" />
            <g transform="translate(60, 320)">
              <circle cx="0" cy="0" r="32" fill="#15803D" />
              <path d="M -35,5 Q -70,-20 -25,-45 Q 0,-5 0,0" fill="#166534" />
              <path d="M 35,5 Q 70,-20 25,-45 Q 0,-5 0,0" fill="#166534" />
            </g>

            {/* Thermal Spa Promenade Balustrade */}
            <rect x="0" y="420" width="400" height="16" fill="#E2E8F0" />
            {[20, 80, 140, 200, 260, 320, 380].map((bx) => (
              <line key={bx} x1={bx} y1={436} x2={bx} y2={470} stroke="#94A3B8" strokeWidth="6" />
            ))}

            {/* Art Deco Resort Typography */}
            <rect x="25" y="475" width="350" height="65" fill="#0F172A" />
            <text x="200" y="508" textAnchor="middle" fill="#FDE047" fontFamily="var(--font-sans)" fontWeight="900" fontSize="24" letterSpacing="5">
              {work.locationName.toUpperCase()}
            </text>
            <text x="200" y="526" textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3">
              {subtext}
            </text>
          </svg>
        );

      case 'photomontage_grid':
      default:
        return (
          <svg
            viewBox="0 0 400 560"
            className="w-full h-full object-cover select-none"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          >
            {/* Constructivist Avant-Garde Grid (Der Berg Style) */}
            <rect width="400" height="560" fill="#F5F5F4" />

            {/* Scarlet Dynamic Diagonal Band */}
            <polygon points="0,50 400,160 400,240 0,130" fill={accentColor} />

            {/* Photographic Halftone Frame Cutout */}
            <rect x="35" y="150" width="330" height="240" fill="#18181B" stroke="#09090B" strokeWidth="2" />
            <polygon points="35,320 180,200 240,270 365,180 365,390 35,390" fill="#52525B" />
            <circle cx="290" cy="220" r="32" fill="#E11D48" opacity="0.9" />

            {/* Silhouette Alpinist in the Frame */}
            <g transform="translate(190, 260)">
              <circle cx="0" cy="0" r="11" fill="#FFFFFF" />
              <line x1="0" y1="11" x2="-12" y2="40" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="0" y1="16" x2="22" y2="38" stroke="#FFFFFF" strokeWidth="5" />
            </g>

            {/* Heavy New Typography Sans-Serif Rules */}
            <line x1="35" y1="35" x2="365" y2="35" stroke="#09090B" strokeWidth="4" />
            <line x1="35" y1="410" x2="365" y2="410" stroke="#09090B" strokeWidth="2" />

            <text x="35" y="105" fill="#FFFFFF" fontFamily="var(--font-sans)" fontWeight="900" fontSize="34" letterSpacing="3">
              DER BERG
            </text>
            <text x="35" y="445" fill="#09090B" fontFamily="var(--font-sans)" fontWeight="800" fontSize="17" letterSpacing="1">
              {work.title}
            </text>
            <text x="35" y="475" fill="#71717A" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1">
              {subtext}
            </text>
            <text x="35" y="525" fill="#991B1B" fontFamily="var(--font-mono)" fontWeight="800" fontSize="11">
              HEFT 2 · JAHRGANG IV · 1932
            </text>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col">
      {/* Lithograph Artwork Frame */}
      <div
        className={`relative w-full ${heightClasses} bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-300 dark:border-stone-700 shadow-sm group transition-all duration-300 hover:shadow-md hover:border-stone-500`}
      >
        {/* Subtle Archival Registration Crosshairs in corners */}
        <div className="absolute top-2 left-2 z-10 opacity-30 group-hover:opacity-75 transition-opacity text-[8px] font-mono text-stone-700 dark:text-stone-300 pointer-events-none">
          + REG.01
        </div>
        <div className="absolute top-2 right-2 z-10 opacity-30 group-hover:opacity-75 transition-opacity text-[8px] font-mono text-stone-700 dark:text-stone-300 pointer-events-none">
          {work.dimensions}
        </div>

        {/* CMYK Test Dots Strip on side */}
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1 opacity-25 group-hover:opacity-60 transition-opacity pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
        </div>

        {/* Historical object image when available; analytical visualization remains the fallback. */}
        <div className="w-full h-full flex items-center justify-center bg-stone-900/5 dark:bg-stone-950/20">
          {hasRealImage && realImage?.src ? (
            <img
              src={realImage.src}
              alt={work.title}
              className="w-full h-full object-contain bg-stone-100 dark:bg-stone-950"
              loading="lazy"
            />
          ) : (
            renderMotifGraphic(1)
          )}
        </div>

        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="px-1.5 py-0.5 rounded bg-stone-950/80 text-white text-[8px] font-mono uppercase tracking-wider">
            {hasRealImage ? 'Object image' : 'Analytical visualization'}
          </span>
        </div>

        {/* Hover Action Bar with Blur Effect */}
        {interactiveZoom && (
          <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setArtworkZoomId(work.id);
                setZoomLevel(1);
              }}
              className="px-3 py-1.5 bg-stone-900 text-white text-xs font-mono rounded hover:bg-black flex items-center gap-1.5 transition-colors border border-stone-600 shadow-lg cursor-pointer"
              title="Inspect high-resolution work"
            >
              <Maximize2 size={13} />
              <span>Inspect</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEntity(work.id, 'work');
              }}
              className="px-3 py-1.5 bg-white text-stone-900 text-xs font-mono rounded hover:bg-stone-100 transition-colors shadow-lg cursor-pointer font-bold"
            >
              Dossier ↗
            </button>
          </div>
        )}

        {/* Uncertainty / Date Tag */}
        <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
          <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 bg-stone-900/90 text-white rounded border border-stone-700 shadow-xs">
            {work.yearDisplay} {work.isDateUncertain && '*'}
          </span>
        </div>
      </div>

      {/* Dominant Color Palette Strip */}
      {showPalette && work.colors && work.colors.length > 0 && (
        <div className="mt-2.5">
          <div className="flex h-3 w-full rounded overflow-hidden border border-stone-300 dark:border-stone-700 shadow-2xs">
            {work.colors.map((color, idx) => (
              <div
                key={idx}
                className="h-full group/swatch relative transition-all hover:opacity-90 cursor-help"
                style={{
                  backgroundColor: color.hex,
                  width: `${color.percentage}%`,
                }}
                title={`${color.name} (${color.hex}) · ${color.percentage}%`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400 mt-1">
            <span>{work.technique}</span>
            <span className="truncate max-w-[140px] text-right">{work.colors[0]?.name}</span>
          </div>
        </div>
      )}

      {/* Fullscreen High-Resolution Inspection Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setArtworkZoomId(null)}
        >
          {/* Header Controls */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="text-xs font-mono text-stone-400">
                HIGH RESOLUTION ARCHIVE INSPECTION · {work.dimensions}
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-100">{work.title}</h2>
              <div className="text-xs text-stone-400">
                {work.creatorName} · {work.yearDisplay} · {work.technique}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!hasRealImage && (
                <button
                  onClick={() => setShowLithoGrain(!showLithoGrain)}
                  className={`px-2.5 py-1.5 text-xs font-mono rounded border transition-colors flex items-center gap-1 ${
                    showLithoGrain ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-stone-900 text-stone-400 border-stone-700'
                  }`}
                  title="Toggle analytical lithograph grain texture"
                >
                  <Sparkles size={13} />
                  <span>Viz Grain</span>
                </button>
              )}

              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.25))}
                className="p-2 bg-stone-900 hover:bg-stone-800 rounded border border-stone-700 text-stone-300"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-2 bg-stone-900 hover:bg-stone-800 rounded border border-stone-700 text-stone-300"
                title="Reset Zoom"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-2 bg-stone-900 hover:bg-stone-800 rounded border border-stone-700 text-stone-300"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setArtworkZoomId(null)}
                className="p-2 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 ml-4 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div
            className="relative w-full max-w-4xl max-h-[75vh] flex-1 overflow-auto flex items-center justify-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-[440px] max-w-full shadow-2xl transition-transform duration-200 border-4 border-stone-900 bg-stone-950 rounded-sm overflow-hidden"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {hasRealImage && realImage?.src ? (
                <img
                  src={realImage.src}
                  alt={work.title}
                  className="w-full h-auto object-contain bg-stone-950"
                />
              ) : (
                renderMotifGraphic(1)
              )}
            </div>
          </div>

          {/* Footer Metadata & Curatorial Provenance */}
          <div
            className="w-full max-w-5xl pt-3 border-t border-stone-800 text-xs text-stone-400 flex flex-wrap items-center justify-between gap-4 font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div>Collection: {work.collection}</div>
            <div className="flex items-center gap-3">
              <span>Client: {work.clientName || 'Not documented'}</span>
              <span>·</span>
              <span>Printer: {work.printer || 'Not documented'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
