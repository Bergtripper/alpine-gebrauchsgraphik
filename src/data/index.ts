export * from './sources';
export * from './people';
export * from './places';
export * from './works';
export * from './organizations';
export * from './publications';
export * from './archive';
export * from './relationships';
export * from './timeline';

import { PEOPLE } from './people';
import { WORKS } from './works';
import { PLACES } from './places';
import { ORGANIZATIONS } from './organizations';
import { PUBLICATIONS } from './publications';
import { ARCHIVE_ITEMS } from './archive';
import { INITIAL_RELATIONSHIPS } from './relationships';

export const ATLAS_STATS = {
  peopleCount: PEOPLE.length,
  worksCount: WORKS.length,
  placesCount: PLACES.length,
  organizationsCount: ORGANIZATIONS.length,
  publicationsCount: PUBLICATIONS.length,
  archiveCount: ARCHIVE_ITEMS.length,
  connectionsCount: INITIAL_RELATIONSHIPS.length,
};
