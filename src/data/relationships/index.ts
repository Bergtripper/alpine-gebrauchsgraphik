import { Relationship } from '../../types/atlas';
import { AUTHOR_RELATIONSHIPS } from './authorRelationships';
import { WORK_RELATIONSHIPS } from './workRelationships';
import { HOTEL_LABEL_RELATIONSHIPS } from './hotelLabelRelationships';
import { GEOGRAPHIC_RELATIONSHIPS } from './geographicRelationships';

export * from './authorRelationships';
export * from './workRelationships';
export * from './hotelLabelRelationships';
export * from './geographicRelationships';

export const INITIAL_RELATIONSHIPS: Relationship[] = [
  ...AUTHOR_RELATIONSHIPS,
  ...WORK_RELATIONSHIPS,
  ...HOTEL_LABEL_RELATIONSHIPS,
  ...GEOGRAPHIC_RELATIONSHIPS,
];
