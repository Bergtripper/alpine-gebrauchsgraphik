import React, { useState } from 'react';
import { useAccessibility, TextScalePreset } from '../../context/AccessibilityContext';
import { useAtlas } from '../../context/AtlasContext';
import {
  Type,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Eye,
  Check,
  RotateCcw,
  X,
  Sliders,
  Sparkles,
  MoveHorizontal,
  AlignLeft,
  Glasses,
  Highlighter,
} from 'lucide-react';
import { cn } from '../../lib/cn';

export const AccessibilityTool: React.FC = () => {
  const {
    settings,
    textScale,
    setTextScale,
    increaseTextScale,
    decreaseTextScale,
    resetTextScale,
    toggleHighContrast,
    toggleRelaxedSpacing,
    toggleReadableFont,
    toggleHighlightLinks,
    toggleDockPosition,
    resetAllSettings,
    isPanelOpen,
    setIsPanelOpen,
    togglePanel,
  } = useAccessibility();

  const { theme, toggleTheme } = useAtlas();

  // Collapsed state of the sticky tab (allows folding into a tiny button)
  const [isTabCollapsed, setIsTabCollapsed] = useState(false);

  const presets: { value: TextScalePreset; label: string; desc: string }[] = [
    { value: 100, label: '100%', desc: 'Standard' },
    { value: 115, label: '115%', desc: 'Medio (+15%)' },
    { value: 130, label: '130%', desc: 'Grande (+30%)' },
    { value: 145, label: '145%', desc: 'Massimo (+45%)' },
  ];

  const isDockRight = settings.dockPosition === 'right';

  return (
    <>
      {/* =========================================================================
          1. STICKY LATERAL BUTTON / TAB (Sempre visibile sul bordo dello schermo)
          ========================================================================= */}
      <aside
        aria-label="Strumenti di Accessibilità e Tema"
        className={cn(
          'fixed z-40 top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 pointer-events-auto select-none',
          isDockRight ? 'right-0' : 'left-0'
        )}
      >
        {isTabCollapsed ? (
          /* Minimized pill button */
          <button
            onClick={() => setIsTabCollapsed(false)}
            aria-label="Espandi strumenti di accessibilità"
            title="Espandi pulsante accessibilità e tema (Alt + A)"
            className={cn(
              'px-2 py-3 bg-[#FAF8F5]/95 dark:bg-[#141820]/95 backdrop-blur-md border border-stone-300 dark:border-stone-700 shadow-xl flex flex-col items-center gap-1 cursor-pointer transition-all hover:bg-white dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200',
              isDockRight ? 'rounded-l-lg border-r-0' : 'rounded-r-lg border-l-0'
            )}
          >
            <Glasses size={16} className="text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-tight write-vertical">
              {textScale}%
            </span>
          </button>
        ) : (
          /* Full tactile lateral sticky tab */
          <div
            className={cn(
              'flex flex-col items-center py-2 px-1.5 bg-[#FAF8F5]/95 dark:bg-[#12161f]/95 backdrop-blur-md border border-stone-300 dark:border-stone-700 shadow-2xl transition-all duration-200 group text-stone-800 dark:text-stone-200',
              isDockRight
                ? 'rounded-l-2xl border-r-0 pl-2 pr-1.5'
                : 'rounded-r-2xl border-l-0 pr-2 pl-1.5'
            )}
          >
            {/* Collapse toggle arrow */}
            <button
              onClick={() => setIsTabCollapsed(true)}
              className="mb-1 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded cursor-pointer transition-colors"
              title="Comprimi barra laterale"
              aria-label="Comprimi barra laterale"
            >
              <span className="text-[9px] font-mono uppercase tracking-widest block transform scale-90">
                {isDockRight ? '›' : '‹'}
              </span>
            </button>

            {/* Main Accessibility Trigger Button (Apre il Pannello) */}
            <button
              onClick={togglePanel}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer relative mb-1.5',
                isPanelOpen
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'bg-stone-200/80 dark:bg-stone-800/80 hover:bg-amber-100 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100'
              )}
              title="Apri pannello accessibilità & visualizzazione (Alt + A)"
              aria-label="Apri pannello accessibilità e dimensioni caratteri"
            >
              <div className="flex items-center gap-0.5">
                <Type size={15} />
                <span className="text-xs font-bold font-mono tracking-tight">Aa</span>
              </div>
              <span className="text-[10px] font-mono font-semibold mt-0.5 px-1 py-0.2 bg-black/10 dark:bg-white/10 rounded">
                {textScale}%
              </span>
            </button>

            <div className="w-5 h-[1px] bg-stone-300 dark:bg-stone-700 my-1" />

            {/* Quick 1-Click Steppers (Riduci / Ingrandisci subito) */}
            <div className="flex flex-col gap-1 my-0.5">
              <button
                onClick={increaseTextScale}
                disabled={textScale >= 160}
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer border',
                  textScale >= 160
                    ? 'opacity-40 cursor-not-allowed border-stone-200 dark:border-stone-800 text-stone-400'
                    : 'bg-white dark:bg-stone-850 hover:bg-amber-50 dark:hover:bg-stone-750 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 hover:border-amber-400 shadow-2xs active:scale-95'
                )}
                title="Ingrandisci caratteri di tutto il sito (+10%)"
                aria-label="Ingrandisci caratteri di tutto il sito"
              >
                <div className="flex items-center">
                  <span className="text-[11px] font-bold">A</span>
                  <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">+</span>
                </div>
              </button>

              <button
                onClick={decreaseTextScale}
                disabled={textScale <= 90}
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer border',
                  textScale <= 90
                    ? 'opacity-40 cursor-not-allowed border-stone-200 dark:border-stone-800 text-stone-400'
                    : 'bg-white dark:bg-stone-850 hover:bg-amber-50 dark:hover:bg-stone-750 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 hover:border-amber-400 shadow-2xs active:scale-95'
                )}
                title="Riduci caratteri (-10%)"
                aria-label="Riduci caratteri"
              >
                <div className="flex items-center">
                  <span className="text-[10px]">A</span>
                  <span className="text-[10px] font-black text-stone-500">-</span>
                </div>
              </button>
            </div>

            <div className="w-5 h-[1px] bg-stone-300 dark:bg-stone-700 my-1" />

            {/* Quick Theme Switch (Chiaro / Scuro) */}
            <button
              onClick={toggleTheme}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border shadow-2xs my-0.5',
                theme === 'dark'
                  ? 'bg-stone-850 hover:bg-stone-750 text-amber-400 border-stone-700 hover:border-amber-400'
                  : 'bg-white hover:bg-amber-50 text-indigo-600 border-stone-300 hover:border-indigo-400'
              )}
              title={
                theme === 'dark'
                  ? 'Passa al Tema Chiaro (Carta d\'Archivio)'
                  : 'Passa al Tema Scuro (Notte Ossidiana)'
              }
              aria-label="Inverti tema chiaro e scuro"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Quick full drawer expander */}
            <button
              onClick={togglePanel}
              className="mt-1 p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="Altre impostazioni di accessibilità"
              aria-label="Apri tutte le impostazioni"
            >
              <Sliders size={13} />
            </button>
          </div>
        )}
      </aside>

      {/* =========================================================================
          2. DETAILED ACCESSIBILITY & DISPLAY MODAL DRAWER
          ========================================================================= */}
      {isPanelOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black/40 backdrop-blur-xs animate-fade-in p-3 sm:p-6"
        >
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setIsPanelOpen(false)}
            aria-hidden="true"
          />

          {/* Panel Card */}
          <div
            className={cn(
              'relative z-10 w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl border transition-all flex flex-col',
              'bg-[#FDFBF7] dark:bg-[#11141c] border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100'
            )}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-5 py-4 bg-[#F7F5EE]/95 dark:bg-[#161a24]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Glasses size={18} />
                </div>
                <div>
                  <h2 id="a11y-panel-title" className="text-base font-bold tracking-tight">
                    Accessibilità & Visualizzazione
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                    Personalizza lettura, ingrandimento e contrasto
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Chiudi pannello accessibilità"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-6 flex-1">
              {/* ==========================================
                  SECTION 1: CARATTERI & INGRANDIMENTO GLOBALE
                  ========================================== */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-mono uppercase font-bold tracking-wider">
                      Dimensione Caratteri (Tutto il Sito)
                    </span>
                  </div>
                  {textScale !== 100 && (
                    <button
                      onClick={resetTextScale}
                      className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw size={11} />
                      <span>Ripristina 100%</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Ingrandisce proporzionalmente i testi di tutte le sezioni, schede opere, biografie, filtri e menu per risolvere i caratteri piccoli.
                </p>

                {/* Big Stepper Bar */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800">
                  <button
                    onClick={decreaseTextScale}
                    disabled={textScale <= 90}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs font-bold cursor-pointer transition-all shadow-2xs"
                    aria-label="Riduci dimensione caratteri"
                  >
                    <ZoomOut size={14} />
                    <span>Riduci (-10%)</span>
                  </button>

                  <div className="text-center">
                    <span className="text-xl font-bold font-mono text-stone-900 dark:text-amber-400 block">
                      {textScale}%
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                      {textScale === 100
                        ? 'Standard'
                        : textScale <= 115
                        ? 'Confortevole'
                        : textScale <= 130
                        ? 'Molto Grande'
                        : 'Ingrandimento Massimo'}
                    </span>
                  </div>

                  <button
                    onClick={increaseTextScale}
                    disabled={textScale >= 160}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold border border-amber-600 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs cursor-pointer transition-all shadow-2xs"
                    aria-label="Ingrandisci dimensione caratteri"
                  >
                    <ZoomIn size={14} />
                    <span>Ingrandisci (+10%)</span>
                  </button>
                </div>

                {/* Presets Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {presets.map((preset) => {
                    const isSelected = textScale === preset.value;
                    return (
                      <button
                        key={preset.value}
                        onClick={() => setTextScale(preset.value)}
                        className={cn(
                          'p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1',
                          isSelected
                            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-stone-950 dark:text-amber-200 ring-2 ring-amber-500/20'
                            : 'bg-white dark:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600'
                        )}
                      >
                        <span className="font-mono font-bold text-xs">{preset.label}</span>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                          {preset.desc}
                        </span>
                        {isSelected && <Check size={12} className="text-amber-600 dark:text-amber-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Live Preview Sample */}
                <div className="p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                    <span>Anteprima Lettura Archivio</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">Scala: {textScale}%</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base leading-snug">
                    Giulio Cisari · Rassegna Grafica Alpina (1928)
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                    L'eccellenza tipografica delle Alpi occidentali: manifesti litografici, cartografie d'epoca e identità visiva d'alta quota.
                  </p>
                </div>
              </div>

              {/* ==========================================
                  SECTION 2: TEMA CHIARO E SCURO
                  ========================================== */}
              <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-mono uppercase font-bold tracking-wider">
                      Tema & Atmosfera Visiva
                    </span>
                  </div>
                  <span className="text-xs font-mono text-stone-400">Tasto rapido [T]</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Carta d'Archivio (Chiaro) */}
                  <button
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={cn(
                      'p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-3',
                      theme === 'light'
                        ? 'border-amber-600 bg-amber-50/50 dark:bg-stone-800 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-850 hover:border-stone-400 opacity-75'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-300 flex items-center justify-center text-amber-700">
                        <Sun size={17} />
                      </div>
                      {theme === 'light' && (
                        <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        Carta d'Archivio
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                        Tema Chiaro solare
                      </div>
                    </div>
                  </button>

                  {/* Notte Ossidiana (Scuro) */}
                  <button
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={cn(
                      'p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-3',
                      theme === 'dark'
                        ? 'border-amber-400 bg-stone-900 ring-2 ring-amber-400/20 shadow-md'
                        : 'border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-850 hover:border-stone-400 opacity-75'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-stone-950 border border-stone-700 flex items-center justify-center text-amber-400">
                        <Moon size={17} />
                      </div>
                      {theme === 'dark' && (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        Notte Ossidiana
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                        Tema Scuro profondo
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* ==========================================
                  SECTION 3: STRUMENTI DI COMFORT & LEGGIBILITÀ
                  ========================================== */}
              <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider">
                    Comfort Visivo Avanzato
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Contrasto Elevato */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 cursor-pointer transition-colors">
                    <div className="flex items-start gap-2.5 pr-2">
                      <div className="mt-0.5 text-stone-500">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Contrasto Elevato
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                          Aumenta la separazione di contorni, testi e pulsanti
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.highContrast}
                      onChange={toggleHighContrast}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-500"
                    />
                  </label>

                  {/* Interlinea Rilassata */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 cursor-pointer transition-colors">
                    <div className="flex items-start gap-2.5 pr-2">
                      <div className="mt-0.5 text-stone-500">
                        <AlignLeft size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Interlinea e Spaziatura Rilassata
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                          Spazio extra tra le righe (+25%) per facilitare la lettura
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.relaxedSpacing}
                      onChange={toggleRelaxedSpacing}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-500"
                    />
                  </label>

                  {/* Font ad Alta Leggibilità */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 cursor-pointer transition-colors">
                    <div className="flex items-start gap-2.5 pr-2">
                      <div className="mt-0.5 text-stone-500">
                        <Type size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Carattere ad Alta Leggibilità
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                          Usa un font geometrico ultra-nitido senza grazie
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.readableFont}
                      onChange={toggleReadableFont}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-500"
                    />
                  </label>

                  {/* Evidenzia Collegamenti e Azioni */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 cursor-pointer transition-colors">
                    <div className="flex items-start gap-2.5 pr-2">
                      <div className="mt-0.5 text-stone-500">
                        <Highlighter size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          Evidenzia Link e Pulsanti
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                          Sottolineatura persistente su tutte le azioni interattive
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.highlightLinks}
                      onChange={toggleHighlightLinks}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-500"
                    />
                  </label>
                </div>
              </div>

              {/* ==========================================
                  SECTION 4: POSIZIONE & RESET
                  ========================================== */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={toggleDockPosition}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer transition-colors text-stone-600 dark:text-stone-300"
                  title="Sposta pulsante laterale a destra o sinistra"
                >
                  <MoveHorizontal size={13} />
                  <span>Posizione pulsante: {isDockRight ? 'Destra' : 'Sinistra'}</span>
                </button>

                <button
                  onClick={resetAllSettings}
                  className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 underline cursor-pointer"
                >
                  Ripristina tutto
                </button>
              </div>
            </div>

            {/* Footer with keyboard shortcuts note */}
            <div className="px-5 py-3 bg-stone-100 dark:bg-stone-900/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
              <span>Scorciatoie: <strong className="text-stone-700 dark:text-stone-300">[Alt + A]</strong> menu · <strong className="text-stone-700 dark:text-stone-300">[T]</strong> tema</span>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="px-3 py-1 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded font-bold hover:opacity-90 cursor-pointer transition-opacity"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
