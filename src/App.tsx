import React, { useState, useEffect } from 'react';
import { AtlasProvider, useAtlas } from './context/AtlasContext';
import { Header } from './components/common/Header';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { AuthorContextHeader } from './components/common/AuthorContextHeader';
import { GlobalFilterBar } from './components/common/GlobalFilterBar';
import { ContextPanel } from './components/common/ContextPanel';
import { PersistentTimeline } from './components/common/PersistentTimeline';
import { AtlasHomeHeader } from './components/views/AtlasHomeHeader';
import { AtlasNetworkView } from './components/views/AtlasNetworkView';
import { PeopleView } from './components/views/PeopleView';
import { WorksView } from './components/views/WorksView';
import { MapView } from './components/views/MapView';
import { TimelineView } from './components/views/TimelineView';
import { VisualDnaView } from './components/views/VisualDnaView';
import { CompareView } from './components/views/CompareView';
import { ArchiveView } from './components/views/ArchiveView';
import { AboutView } from './components/views/AboutView';
import { EntityDetailModal } from './components/modals/EntityDetailModal';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AccessibilityTool } from './components/common/AccessibilityTool';
import { Sun, Moon, Sparkles } from 'lucide-react';

const AtlasApp: React.FC = () => {
  const { activeTab, theme, toggleTheme } = useAtlas();
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [showThemeToast, setShowThemeToast] = useState(false);

  // Global keyboard shortcut 'T' to toggle theme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
        setShowThemeToast(true);
        setTimeout(() => setShowThemeToast(false), 1600);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <div className="h-screen w-screen bg-[#F8F7F3] dark:bg-[#0b0d11] text-[#1a1a18] dark:text-[#f3f4f6] flex flex-col font-sans transition-colors duration-300 overflow-hidden bg-topo-light dark:bg-topo-dark">
      {/* 1. Global Navigation Bar with DOTZERO Family & MAP Submenu */}
      <Header
        onToggleFilterBar={() => setIsFilterBarOpen(!isFilterBarOpen)}
        isFilterBarOpen={isFilterBarOpen}
      />

      {/* 2. Persistent Location Breadcrumbs Bar */}
      <Breadcrumbs />

      {/* 2b. Persistent Author Context Header (Active Author-Scoped Universe) */}
      <AuthorContextHeader />

      {/* 3. Global Filter Panel Drawer */}
      <GlobalFilterBar
        isOpen={isFilterBarOpen}
        onClose={() => setIsFilterBarOpen(false)}
      />

      {/* 4. Desktop Research Workspace: Main Visualization + Persistent Context Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Visualization Viewport */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {(activeTab === 'explore' || activeTab === 'atlas') && (
            <div className="flex-1 flex flex-col">
              <AtlasHomeHeader />
              <AtlasNetworkView />
            </div>
          )}
          {activeTab === 'timeline' && <TimelineView />}
          {activeTab === 'map' && <MapView />}
          {activeTab === 'people' && <PeopleView />}
          {activeTab === 'works' && <WorksView />}
          {activeTab === 'visual_dna' && <VisualDnaView />}
          {activeTab === 'compare' && <CompareView />}
          {activeTab === 'archive' && <ArchiveView />}
          {activeTab === 'about' && <AboutView />}
        </main>

        {/* Persistent Context Area (Section 6, 7, 20) */}
        <ContextPanel />
      </div>

      {/* 5. Persistent Chronological Control Bar (Section 8: 1900—1970) */}
      <PersistentTimeline />

      {/* 6. Comprehensive Multi-Tab Entity Dossier Modal */}
      <EntityDetailModal />

      {/* 7. Sticky Lateral Accessibility & Display Tool (Ingrandimento Caratteri, Tema, Contrasto) */}
      <AccessibilityTool />

      {/* Toast Notification on Theme Switch */}
      {showThemeToast && (
        <div className="fixed top-18 right-6 z-50 animate-fade-in pointer-events-none select-none">
          <div className="px-4 py-2 rounded shadow-xl border text-xs font-mono flex items-center gap-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 border-stone-700 dark:border-stone-300">
            <Sparkles size={14} className="text-amber-400 dark:text-amber-600" />
            <span>
              {theme === 'dark' ? 'Tema Scuro Attivo (Obsidian Night)' : 'Tema Chiaro Attivo (Archival Paper)'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AtlasProvider>
      <AccessibilityProvider>
        <AtlasApp />
      </AccessibilityProvider>
    </AtlasProvider>
  );
}
