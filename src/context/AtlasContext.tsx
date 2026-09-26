import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  GlobalFilterState,
  Work,
  Person,
  Place,
  Organization,
  Publication,
  ArchiveItem,
  Relationship,
  ViewTab,
  MapScale,
  EntityType,
  SelectedEntityRef,
  CityClusterSummary,
} from '../types/atlas';
import { PEOPLE, PLACES } from '../data';
import {
  filterWorks,
  filterPeople,
  filterPlaces,
  filterOrganizations,
  filterPublications,
} from './atlasFiltering';
import {
  traverseConnectedEntities,
  lookupEntityDetails,
  ConnectedEntitiesResult,
} from './atlasTraversal';

export interface ExtendedFilterState extends GlobalFilterState {
  century?: string;
}

export interface CompareState {
  mode: 'artist' | 'work' | 'place' | 'period';
  item1Id: string;
  item2Id: string;
}

interface AtlasContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // DOTZERO Project Family
  dotzeroProject: 'alpine-graphic-atlas' | 'avant-garde-atlas';
  setDotzeroProject: (project: 'alpine-graphic-atlas' | 'avant-garde-atlas') => void;

  // Primary Navigation
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;

  // Author-First Exploration & Persistent Context
  activeAuthor: Person | null;
  selectAuthor: (id: string) => void;
  exitAuthorMode: () => void;
  authorScopeOnly: boolean;
  setAuthorScopeOnly: (scoped: boolean) => void;
  toggleAuthorScope: () => void;

  // Persistent Context Panel & Active Node Exploration
  activeNode: SelectedEntityRef | null;
  selectNode: (id: string, type: EntityType) => void;
  clearActiveNode: () => void;
  isContextPanelOpen: boolean;
  setIsContextPanelOpen: (open: boolean) => void;
  toggleContextPanel: () => void;

  // Map Navigation Family Scales
  activeMapScale: MapScale;
  setActiveMapScale: (scale: MapScale) => void;
  activeRegion: string;
  setActiveRegion: (region: string) => void;
  selectedCityCluster: CityClusterSummary | null;
  setSelectedCityCluster: (cluster: CityClusterSummary | null) => void;

  // Global Synchronized Filters
  filters: GlobalFilterState;
  updateFilter: <K extends keyof GlobalFilterState>(key: K, value: GlobalFilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  selectDecade: (startYear: number | null, endYear?: number | null) => void;

  // Entity Modal / Full Dossier
  selectedEntity: SelectedEntityRef | null;
  openEntity: (id: string, type: EntityType) => void;
  closeEntity: () => void;

  // Comparison State
  compareState: CompareState;
  setCompareState: React.Dispatch<React.SetStateAction<CompareState>>;
  setComparison: (mode: CompareState['mode'], id1: string, id2: string) => void;

  // Synchronized Filtered Collections
  filteredWorks: Work[];
  filteredPeople: Person[];
  filteredPlaces: Place[];
  filteredOrganizations: Organization[];
  filteredPublications: Publication[];

  // Graph Traversal
  getConnectedEntities: (id: string) => ConnectedEntitiesResult;
  getEntityDetails: (id: string, type: EntityType) => {
    entity: Person | Work | Place | Organization | Publication | ArchiveItem | null;
    type: EntityType;
  };

  // Lightbox Zoom
  artworkZoomId: string | null;
  setArtworkZoomId: (id: string | null) => void;
}

const defaultFilters: GlobalFilterState = {
  searchQuery: '',
  startYear: 1900,
  endYear: 1970,
  placeId: 'all',
  regionId: 'all',
  personId: 'all',
  category: 'all',
  style: 'all',
  theme: 'all',
  organizationId: 'all',
};

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

export const AtlasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('dotzero_atlas_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('dotzero_atlas_theme', next);
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // DOTZERO Project Family Switcher
  const [dotzeroProject, setDotzeroProject] = useState<'alpine-graphic-atlas' | 'avant-garde-atlas'>(
    'alpine-graphic-atlas'
  );

  // Primary Navigation — AUTHOR-FIRST ENTRY POINT
  const [activeTab, setActiveTabRaw] = useState<ViewTab>('people');
  const setActiveTab = (tab: ViewTab) => {
    if (tab === 'atlas') {
      setActiveTabRaw('explore');
    } else {
      setActiveTabRaw(tab);
    }
  };

  // Persistent Context Panel & Active Node (Initial state: null — NO default protagonist)
  const [activeNode, setActiveNode] = useState<SelectedEntityRef | null>(null);
  const [isContextPanelOpen, setIsContextPanelOpen] = useState<boolean>(false);
  const [authorScopeOnly, setAuthorScopeOnly] = useState<boolean>(true);

  // Active Author (Author-First Research Universe)
  const activeAuthor = useMemo<Person | null>(() => {
    if (!activeNode || activeNode.type !== 'person') return null;
    return PEOPLE.find((p) => p.id === activeNode.id) || null;
  }, [activeNode]);

  const selectAuthor = useCallback((id: string) => {
    setActiveNode({ id, type: 'person' });
    setAuthorScopeOnly(true);
    setIsContextPanelOpen(false);
  }, []);

  const exitAuthorMode = useCallback(() => {
    setActiveNode(null);
    setAuthorScopeOnly(false);
  }, []);

  const toggleAuthorScope = useCallback(() => {
    setAuthorScopeOnly((prev) => !prev);
  }, []);

  const selectNode = useCallback((id: string, type: EntityType) => {
    setActiveNode({ id, type });
    setIsContextPanelOpen(true);
  }, []);

  const clearActiveNode = useCallback(() => {
    setActiveNode(null);
    setIsContextPanelOpen(false);
  }, []);

  const toggleContextPanel = useCallback(() => {
    setIsContextPanelOpen((prev) => !prev);
  }, []);

  // Map Scales
  const [activeMapScale, setActiveMapScale] = useState<MapScale>('alps');
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [selectedCityCluster, setSelectedCityCluster] = useState<CityClusterSummary | null>(null);

  // Global Filters
  const [filters, setFilters] = useState<GlobalFilterState>(defaultFilters);

  const updateFilter = useCallback(<K extends keyof GlobalFilterState>(key: K, value: GlobalFilterState[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setActiveRegion('all');
    setSelectedCityCluster(null);
  }, []);

  const selectDecade = useCallback((startYear: number | null, endYear?: number | null) => {
    if (startYear === null) {
      setFilters((prev) => ({ ...prev, startYear: 1900, endYear: 1970 }));
    } else {
      setFilters((prev) => ({
        ...prev,
        startYear,
        endYear: endYear || startYear + 9,
      }));
    }
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim() !== '') count++;
    if (filters.startYear !== 1900 || filters.endYear !== 1970) count++;
    if (filters.placeId !== 'all') count++;
    if (filters.regionId !== 'all') count++;
    if (filters.personId !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.style !== 'all') count++;
    if (filters.theme !== 'all') count++;
    if (filters.organizationId !== 'all') count++;
    if (activeRegion !== 'all') count++;
    return count;
  }, [filters, activeRegion]);

  // Entity Modal / Full Dossier
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntityRef | null>(null);

  const openEntity = useCallback((id: string, type: EntityType) => {
    setSelectedEntity({ id, type });
  }, []);

  const closeEntity = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  // Lightbox Zoom
  const [artworkZoomId, setArtworkZoomId] = useState<string | null>(null);

  // Comparison State — neutral default without forcing any default author
  const [compareState, setCompareState] = useState<CompareState>({
    mode: 'artist',
    item1Id: '',
    item2Id: '',
  });

  const setComparison = useCallback((mode: CompareState['mode'], id1: string, id2: string) => {
    setCompareState({ mode, item1Id: id1, item2Id: id2 });
    setActiveTab('compare');
  }, []);

  // Synchronized Filtered Collections
  const filteredWorks = useMemo(() => {
    return filterWorks(filters, authorScopeOnly, activeAuthor);
  }, [filters, authorScopeOnly, activeAuthor]);

  const filteredPeople = useMemo(() => {
    return filterPeople(filters);
  }, [filters]);

  const filteredPlaces = useMemo(() => {
    return filterPlaces(filters, activeRegion);
  }, [filters, activeRegion]);

  const filteredOrganizations = useMemo(() => {
    return filterOrganizations(filters);
  }, [filters]);

  const filteredPublications = useMemo(() => {
    return filterPublications(filters);
  }, [filters]);

  // Graph Traversal Selector
  const getConnectedEntities = useCallback((id: string) => {
    return traverseConnectedEntities(id);
  }, []);

  const getEntityDetails = useCallback((id: string, type: EntityType) => {
    return lookupEntityDetails(id, type);
  }, []);

  return (
    <AtlasContext.Provider
      value={{
        theme,
        toggleTheme,
        dotzeroProject,
        setDotzeroProject,
        activeTab,
        setActiveTab,
        activeAuthor,
        selectAuthor,
        exitAuthorMode,
        authorScopeOnly,
        setAuthorScopeOnly,
        toggleAuthorScope,
        activeNode,
        selectNode,
        clearActiveNode,
        isContextPanelOpen,
        setIsContextPanelOpen,
        toggleContextPanel,
        activeMapScale,
        setActiveMapScale,
        activeRegion,
        setActiveRegion,
        selectedCityCluster,
        setSelectedCityCluster,
        filters,
        updateFilter,
        resetFilters,
        activeFilterCount,
        selectDecade,
        selectedEntity,
        openEntity,
        closeEntity,
        compareState,
        setCompareState,
        setComparison,
        filteredWorks,
        filteredPeople,
        filteredPlaces,
        filteredOrganizations,
        filteredPublications,
        getConnectedEntities,
        getEntityDetails,
        artworkZoomId,
        setArtworkZoomId,
      }}
    >
      {children}
    </AtlasContext.Provider>
  );
};

export const useAtlas = (): AtlasContextType => {
  const context = useContext(AtlasContext);
  if (!context) {
    throw new Error('useAtlas must be used within an AtlasProvider');
  }
  return context;
};
