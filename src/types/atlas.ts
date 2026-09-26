export type ResearchStatus =
  | 'CONFIRMED'
  | 'ATTRIBUTED'
  | 'PROBABLE'
  | 'UNVERIFIED'
  | 'UNIDENTIFIED';

export type EntityType =
  | 'person'
  | 'work'
  | 'place'
  | 'organization'
  | 'publication'
  | 'theme'
  | 'archiveItem';

export type MapScale = 'alps' | 'regions' | 'cities';

export type SemanticRelationType =
  | 'worked-in'
  | 'lived-in'
  | 'designed'
  | 'commissioned-by'
  | 'published-in'
  | 'printed-by'
  | 'represented'
  | 'associated-with'
  | 'influenced-by'
  | 'collaborated-with'
  | 'held-by'
  | 'documented-in';

export interface SourceReference {
  id: string;
  citation: string;
  archiveOrCollection: string;
  sourceType: 'archive_document' | 'monograph' | 'museum_catalog' | 'periodical' | 'registry';
  url?: string;
  page?: string;
  verified: boolean;
  notes?: string;
}

export interface ColorSwatch {
  hex: string;
  name: string;
  percentage: number;
}

export type TypographyStyle =
  | 'geometric'
  | 'serif'
  | 'sans serif'
  | 'hand lettering'
  | 'condensed'
  | 'decorative';

export type CompositionStyle =
  | 'diagonal'
  | 'central'
  | 'symmetrical'
  | 'photomontage'
  | 'minimal'
  | 'dynamic';

export type FigureSubject =
  | 'skier'
  | 'climber'
  | 'tourist'
  | 'woman'
  | 'worker'
  | 'mountaineer'
  | 'none';

export type LandscapeElement =
  | 'mountain'
  | 'snow'
  | 'forest'
  | 'hut'
  | 'railway'
  | 'cable car';

export type GraphicStyle =
  | 'geometric'
  | 'expressionist'
  | 'modernist'
  | 'illustrative'
  | 'photographic'
  | 'realist'
  | 'abstract';

export interface VisualCharacteristics {
  typography: TypographyStyle;
  composition: CompositionStyle;
  figure: FigureSubject;
  landscape: LandscapeElement;
  style: GraphicStyle;
}

export interface GeographicRouteDistinction {
  designedInPlaceId?: string;
  printedInPlaceId?: string;
  commissionedByPlaceId?: string;
  representedPlaceId?: string;
}

export interface Work {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  researchStatus?: ResearchStatus;
  year: number;
  yearDisplay: string; // e.g. "1934", "c. 1932", "1930–1935", "date unknown"
  isDateUncertain?: boolean;
  locationId: string;
  locationName: string;
  geographicDistinction?: GeographicRouteDistinction;
  clientId?: string;
  clientName?: string;
  hotelId?: string;
  hotelName?: string;
  publisher?: string;
  printer?: string;
  technique: string;
  dimensions: string;
  category:
    | 'Poster'
    | 'Hotel Label'
    | 'Advertisement'
    | 'Magazine Cover'
    | 'Brochure'
    | 'Catalogue'
    | 'Illustration'
    | 'Map'
    | 'Panoramic Map'
    | 'Packaging'
    | 'Ephemera';
  themes: string[];
  visualCharacteristics: VisualCharacteristics;
  colors: ColorSwatch[];
  visualMotif: {
    bgGradient: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    motifType:
      | 'ski_diagonal'
      | 'climbing_peak'
      | 'railway_curve'
      | 'promenade_sun'
      | 'photomontage_grid'
      | 'typographic_banner'
      | 'cable_car_wire';
    subtext: string;
  };
  collection: string;
  source: SourceReference;
}

export interface Person {
  id: string;
  name: string;
  birthYear: number;
  deathYear?: number;
  nationality: string;
  researchStatus?: ResearchStatus;
  identityNotes?: string;
  cities: string[];
  activeYears: string;
  activeStart: number;
  activeEnd: number;
  professions: string[];
  biography: string;
  associatedInstitutions: string[];
  associatedCompanies: string[];
  associatedPlaces: string[];
  associatedPublications: string[];
  visualCharacteristics: string[];
  bibliography: string[];
  sources: SourceReference[];
}

export interface Place {
  id: string;
  name: string;
  alternateNames?: string[];
  region: string;
  country: string;
  elevation: string;
  elevationMeters: number;
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // 0-100 relative to map view
    yPercent: number; // 0-100 relative to map view
  };
  description: string;
  keyRoles: string[];
  connectedPersonIds: string[];
  connectedWorkIds: string[];
  connectedOrganizationIds: string[];
  connectedPublicationIds: string[];
}

export interface CityClusterSummary {
  placeId: string;
  placeName: string;
  region: string;
  activeDecade: string;
  peopleCount: number;
  worksCount: number;
  organizationsCount: number;
  publicationsCount: number;
  featuredActivities: string[];
}

export interface Organization {
  id: string;
  name: string;
  type:
    | 'Company'
    | 'Tourism Board'
    | 'Railway'
    | 'Publisher'
    | 'Alpine Club'
    | 'Hotel'
    | 'Sport Brand';
  headquartersPlaceId: string;
  headquartersPlaceName: string;
  activePeriod: string;
  description: string;
  keyCommissions: string[];
  connectedPersonIds: string[];
  connectedWorkIds: string[];
}

export interface Publication {
  id: string;
  title: string;
  type: 'Magazine' | 'Book' | 'Catalogue' | 'Brochure' | 'Monograph';
  placeId: string;
  placeName: string;
  years: string;
  startYear: number;
  endYear?: number;
  editorsOrPublishers: string;
  description: string;
  graphicInnovations: string[];
  connectedPersonIds: string[];
  connectedWorkIds: string[];
  source: SourceReference;
}

export interface ArchiveItem {
  id: string;
  title: string;
  objectType: 'ORIGINAL OBJECT' | 'REPRODUCTION' | 'DIGITAL SOURCE' | 'BIBLIOGRAPHIC SOURCE';
  year: string;
  yearNumeric: number;
  creatorId?: string;
  creatorName?: string;
  publisher?: string;
  dimensions: string;
  condition: string;
  provenance: string;
  collection: string;
  relatedPersonIds: string[];
  relatedWorkIds: string[];
  bibliographicReferences: string[];
  notes: string;
  callNumber: string;
}

export interface Relationship {
  id: string;
  sourceId: string;
  sourceType: EntityType;
  sourceName: string;
  targetId: string;
  targetType: EntityType;
  targetName: string;
  relationLabel: string;
  relationType?: SemanticRelationType;
  year?: number;
}

export interface GlobalFilterState {
  searchQuery: string;
  startYear: number;
  endYear: number;
  placeId: string | 'all';
  regionId: string | 'all';
  personId: string | 'all';
  category: string | 'all';
  style: string | 'all';
  theme: string | 'all';
  organizationId: string | 'all';
}

export interface SelectedEntityRef {
  id: string;
  type: EntityType;
}

export type ViewTab =
  | 'explore'
  | 'atlas' // backwards compatibility alias for explore
  | 'timeline'
  | 'map'
  | 'people'
  | 'works'
  | 'visual_dna'
  | 'compare'
  | 'archive'
  | 'about';
