import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TextScalePreset = 100 | 115 | 130 | 145;

export interface AccessibilitySettings {
  textScale: number; // percentage, e.g. 100, 115, 130, 145
  highContrast: boolean;
  relaxedSpacing: boolean;
  readableFont: boolean;
  highlightLinks: boolean;
  dockPosition: 'right' | 'left';
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  textScale: number;
  setTextScale: (scale: number) => void;
  increaseTextScale: () => void;
  decreaseTextScale: () => void;
  resetTextScale: () => void;
  toggleHighContrast: () => void;
  toggleRelaxedSpacing: () => void;
  toggleReadableFont: () => void;
  toggleHighlightLinks: () => void;
  toggleDockPosition: () => void;
  resetAllSettings: () => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  togglePanel: () => void;
}

const STORAGE_KEY = 'dotzero_atlas_a11y_v1';

const defaultSettings: AccessibilitySettings = {
  textScale: 100,
  highContrast: false,
  relaxedSpacing: false,
  readableFont: false,
  highlightLinks: false,
  dockPosition: 'right',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSettings,
          ...parsed,
          textScale: typeof parsed.textScale === 'number' ? Math.max(90, Math.min(160, parsed.textScale)) : 100,
        };
      }
    } catch {
      // Fallback to default
    }
    return defaultSettings;
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Sync settings to localStorage and HTML element
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}

    const html = document.documentElement;

    // Apply root font size scaling for rem units
    html.style.fontSize = `${settings.textScale}%`;
    html.setAttribute('data-text-scale', settings.textScale.toString());

    // Apply high contrast
    if (settings.highContrast) {
      html.classList.add('a11y-high-contrast');
    } else {
      html.classList.remove('a11y-high-contrast');
    }

    // Apply relaxed line and word spacing
    if (settings.relaxedSpacing) {
      html.classList.add('a11y-relaxed-spacing');
    } else {
      html.classList.remove('a11y-relaxed-spacing');
    }

    // Apply readable font
    if (settings.readableFont) {
      html.classList.add('a11y-readable-font');
    } else {
      html.classList.remove('a11y-readable-font');
    }

    // Apply highlight links
    if (settings.highlightLinks) {
      html.classList.add('a11y-highlight-links');
    } else {
      html.classList.remove('a11y-highlight-links');
    }
  }, [settings]);

  // Global keyboard shortcut: Alt + A or Option + A toggles accessibility panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsPanelOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isPanelOpen) {
        setIsPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen]);

  const setTextScale = useCallback((scale: number) => {
    const clamped = Math.max(90, Math.min(160, Math.round(scale)));
    setSettings((prev) => ({ ...prev, textScale: clamped }));
  }, []);

  const increaseTextScale = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      textScale: Math.min(160, prev.textScale + 10),
    }));
  }, []);

  const decreaseTextScale = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      textScale: Math.max(90, prev.textScale - 10),
    }));
  }, []);

  const resetTextScale = useCallback(() => {
    setSettings((prev) => ({ ...prev, textScale: 100 }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleRelaxedSpacing = useCallback(() => {
    setSettings((prev) => ({ ...prev, relaxedSpacing: !prev.relaxedSpacing }));
  }, []);

  const toggleReadableFont = useCallback(() => {
    setSettings((prev) => ({ ...prev, readableFont: !prev.readableFont }));
  }, []);

  const toggleHighlightLinks = useCallback(() => {
    setSettings((prev) => ({ ...prev, highlightLinks: !prev.highlightLinks }));
  }, []);

  const toggleDockPosition = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      dockPosition: prev.dockPosition === 'right' ? 'left' : 'right',
    }));
  }, []);

  const resetAllSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  const value = {
    settings,
    textScale: settings.textScale,
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
  };

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
