import {
  GlobalFilterState,
  Person,
  Place,
  Publication,
  Relationship,
  Work,
  Organization,
  ArchiveItem,
  EntityType,
} from '../types/atlas';

export const filterWorksCollection = (
  works: Work[],
  filters: GlobalFilterState,
  authorScopeOnly: boolean,
  activeAuthor: Person | null
): Work[] => {
  return works.filter((work) => {
    // Author-scoped filtering when an author is active
    if (authorScopeOnly && activeAuthor && work.creatorId !== activeAuthor.id) {
      return false;
    }

    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchesTitle = work.title.toLowerCase().includes(q);
      const matchesCreator = work.creatorName.toLowerCase().includes(q);
      const matchesLocation = work.locationName.toLowerCase().includes(q);
      const matchesTheme = work.themes.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCreator && !matchesLocation && !matchesTheme) {
        return false;
      }
    }

    if (work.year < filters.startYear || work.year > filters.endYear) {
      return false;
    }

    if (filters.personId !== 'all' && work.creatorId !== filters.personId) {
      return false;
    }

    if (filters.placeId !== 'all' && work.locationId !== filters.placeId) {
      return false;
    }

    if (filters.category !== 'all' && work.category !== filters.category) {
      return false;
    }

    if (filters.style !== 'all' && work.visualCharacteristics.style !== filters.style) {
      return false;
    }

    if (filters.theme !== 'all' && !work.themes.includes(filters.theme)) {
      return false;
    }

    if (filters.organizationId !== 'all' && work.clientId !== filters.organizationId) {
      return false;
    }

    return true;
  });
};

export const filterPeopleCollection = (
  people: Person[],
  filters: GlobalFilterState,
  places: Place[]
): Person[] => {
  return people.filter((person) => {
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchesName = person.name.toLowerCase().includes(q);
      const matchesBio = person.biography.toLowerCase().includes(q);
      const matchesCities = person.cities.some((c) => c.toLowerCase().includes(q));
      if (!matchesName && !matchesBio && !matchesCities) return false;
    }

    if (person.activeEnd < filters.startYear || person.activeStart > filters.endYear) {
      return false;
    }

    if (filters.placeId !== 'all') {
      const place = places.find((p) => p.id === filters.placeId);
      const placeName = place?.name.toLowerCase();
      if (
        !person.associatedPlaces.some(
          (p) =>
            p.toLowerCase() === placeName ||
            (place?.alternateNames &&
              place.alternateNames.some((alt) => alt.toLowerCase() === p.toLowerCase()))
        )
      ) {
        return false;
      }
    }

    if (filters.personId !== 'all' && person.id !== filters.personId) {
      return false;
    }

    return true;
  });
};

export const filterPlacesCollection = (
  places: Place[],
  filters: GlobalFilterState,
  activeRegion: string
): Place[] => {
  return places.filter((place) => {
    if (filters.placeId !== 'all' && place.id !== filters.placeId) {
      return false;
    }
    if (activeRegion !== 'all') {
      const regionLower = place.region.toLowerCase();
      if (activeRegion === 'south-tyrol' && !regionLower.includes('south tyrol')) return false;
      if (activeRegion === 'tyrol' && !regionLower.includes('tyrol')) return false;
      if (activeRegion === 'dolomites' && !regionLower.includes('dolomite')) return false;
      if (activeRegion === 'austria' && !place.country.toLowerCase().includes('austria')) return false;
      if (activeRegion === 'lombardy' && !regionLower.includes('lombardy')) return false;
    }
    return true;
  });
};

export const filterOrganizationsCollection = (
  orgs: Organization[],
  filters: GlobalFilterState
): Organization[] => {
  return orgs.filter((org) => {
    if (filters.organizationId !== 'all' && org.id !== filters.organizationId) {
      return false;
    }
    return true;
  });
};

export const filterPublicationsCollection = (
  pubs: Publication[],
  filters: GlobalFilterState
): Publication[] => {
  return pubs.filter((pub) => {
    if (pub.endYear && pub.endYear < filters.startYear) return false;
    if (pub.startYear > filters.endYear) return false;
    return true;
  });
};

export const findConnectedEntities = (
  id: string,
  relationships: Relationship[],
  people: Person[],
  works: Work[],
  places: Place[],
  organizations: Organization[],
  publications: Publication[]
) => {
  const rels = relationships.filter((r) => r.sourceId === id || r.targetId === id);

  const connectedIds = new Set<string>();
  rels.forEach((r) => {
    if (r.sourceId === id) connectedIds.add(r.targetId);
    if (r.targetId === id) connectedIds.add(r.sourceId);
  });

  return {
    relationships: rels,
    people: people.filter((p) => connectedIds.has(p.id)),
    works: works.filter((w) => connectedIds.has(w.id)),
    places: places.filter((pl) => connectedIds.has(pl.id)),
    organizations: organizations.filter((o) => connectedIds.has(o.id)),
    publications: publications.filter((pub) => connectedIds.has(pub.id)),
  };
};

export const findEntityDetails = (
  id: string,
  type: EntityType,
  people: Person[],
  works: Work[],
  places: Place[],
  organizations: Organization[],
  publications: Publication[],
  archiveItems: ArchiveItem[]
) => {
  let entity: Person | Work | Place | Organization | Publication | ArchiveItem | null = null;
  switch (type) {
    case 'person':
      entity = people.find((p) => p.id === id) || null;
      break;
    case 'work':
      entity = works.find((w) => w.id === id) || null;
      break;
    case 'place':
      entity = places.find((pl) => pl.id === id) || null;
      break;
    case 'organization':
      entity = organizations.find((o) => o.id === id) || null;
      break;
    case 'publication':
      entity = publications.find((pub) => pub.id === id) || null;
      break;
    case 'archiveItem':
      entity = archiveItems.find((a) => a.id === id) || null;
      break;
    default:
      entity = null;
  }
  return { entity, type };
};
