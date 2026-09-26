import { Work } from '../../types/atlas';
import { POSTERS_WORKS } from './posters';
import { HOTEL_LABELS_WORKS } from './hotelLabels';
import { PANORAMIC_MAPS_WORKS } from './panoramicMaps';
import { BROCHURES_CATALOGUES_WORKS } from './brochuresCatalogues';
import { RESEARCH_PILOT_WORKS } from './researchPilot';

export * from './posters';
export * from './hotelLabels';
export * from './panoramicMaps';
export * from './brochuresCatalogues';
export * from './researchPilot';

export const WORKS: Work[] = [
  ...POSTERS_WORKS,
  ...HOTEL_LABELS_WORKS,
  ...PANORAMIC_MAPS_WORKS,
  ...BROCHURES_CATALOGUES_WORKS,
  ...RESEARCH_PILOT_WORKS,
];
