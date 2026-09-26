import {
  PEOPLE,
  WORKS,
  PLACES,
  ORGANIZATIONS,
  PUBLICATIONS,
  ARCHIVE_ITEMS,
  INITIAL_RELATIONSHIPS,
} from '../data';
import {
  EntityType,
  Person,
  Work,
  Place,
  Organization,
  Publication,
  ArchiveItem,
  Relationship,
} from '../types/atlas';

export interface ConnectedEntitiesResult {
  relationships: Relationship[];
  people: Person[];
  works: Work[];
  places: Place[];
  organizations: Organization[];
  publications: Publication[];
}

export function traverseConnectedEntities(id: string): ConnectedEntitiesResult {
  const relationships = INITIAL_RELATIONSHIPS.filter(
    (r) => r.sourceId === id || r.targetId === id
  );

  const connectedIds = new Set<string>();
  relationships.forEach((r) => {
    if (r.sourceId === id) connectedIds.add(r.targetId);
    if (r.targetId === id) connectedIds.add(r.sourceId);
  });

  const connectedPeople = PEOPLE.filter((p) => connectedIds.has(p.id));
  const connectedWorks = WORKS.filter((w) => connectedIds.has(w.id));
  const connectedPlaces = PLACES.filter((pl) => connectedIds.has(pl.id));
  const connectedOrgs = ORGANIZATIONS.filter((o) => connectedIds.has(o.id));
  const connectedPubs = PUBLICATIONS.filter((pub) => connectedIds.has(pub.id));

  return {
    relationships,
    people: connectedPeople,
    works: connectedWorks,
    places: connectedPlaces,
    organizations: connectedOrgs,
    publications: connectedPubs,
  };
}

export function lookupEntityDetails(
  id: string,
  type: EntityType
): {
  entity: Person | Work | Place | Organization | Publication | ArchiveItem | null;
  type: EntityType;
} {
  let entity: Person | Work | Place | Organization | Publication | ArchiveItem | null = null;
  switch (type) {
    case 'person':
      entity = PEOPLE.find((p) => p.id === id) || null;
      break;
    case 'work':
      entity = WORKS.find((w) => w.id === id) || null;
      break;
    case 'place':
      entity = PLACES.find((p) => p.id === id) || null;
      break;
    case 'organization':
      entity = ORGANIZATIONS.find((o) => o.id === id) || null;
      break;
    case 'publication':
      entity = PUBLICATIONS.find((pub) => pub.id === id) || null;
      break;
    case 'archiveItem':
      entity = ARCHIVE_ITEMS.find((a) => a.id === id) || null;
      break;
    default:
      entity = null;
  }
  return { entity, type };
}
