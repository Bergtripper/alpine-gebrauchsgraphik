import { WORKS, PEOPLE, PLACES, ORGANIZATIONS, PUBLICATIONS } from '../data';
import { GlobalFilterState, Work, Person, Place, Organization, Publication } from '../types/atlas';

export function filterWorks(
  filters: GlobalFilterState,
  authorScopeOnly: boolean,
  activeAuthor: Person | null
): Work[] {
  return WORKS.filter((work) => {
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
}

export function filterPeople(filters: GlobalFilterState): Person[] {
  return PEOPLE.filter((person) => {
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
      const place = PLACES.find((p) => p.id === filters.placeId);
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
}

export function filterPlaces(filters: GlobalFilterState, activeRegion: string): Place[] {
  return PLACES.filter((place) => {
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
}

export function filterOrganizations(filters: GlobalFilterState): Organization[] {
  return ORGANIZATIONS.filter((org) => {
    if (filters.organizationId !== 'all' && org.id !== filters.organizationId) {
      return false;
    }
    return true;
  });
}

export function filterPublications(filters: GlobalFilterState): Publication[] {
  return PUBLICATIONS.filter((pub) => {
    if (pub.endYear && pub.endYear < filters.startYear) return false;
    if (pub.startYear > filters.endYear) return false;
    return true;
  });
}
