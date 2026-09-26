import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const wilhelmNicolausPrachensky: Person = {
  id: 'wilhelm-nicolaus-prachensky',
  name: 'Wilhelm Nicolaus Prachensky',
  birthYear: 1898,
  deathYear: 1956,
  nationality: 'Austrian / Tyrolean',
  researchStatus: 'CONFIRMED',
  cities: ['Innsbruck', 'Munich', 'Kitzbühel'],
  activeYears: '1920–1955',
  activeStart: 1920,
  activeEnd: 1955,
  professions: ['Painter', 'Architect', 'Graphic artist', 'Poster designer'],
  biography: 'Wilhelm Nicolaus Prachensky was an architect, painter, and commercial designer at the forefront of the Tyrolean Expressionist and Modernist movements. A core member of the Innsbruck art circle with Alfons Walde, Prachensky designed architectural schemes, pavilions, hotel labels, and travel posters for Innsbruck, the Nordkette cable railway, and St. Anton am Arlberg, translating mountainous terrain into dynamic, faceted structural planes.',
  associatedInstitutions: ['Innsbrucker Nordkettenbahn AG', 'Tiroler Künstlerbund'],
  associatedCompanies: ['Druckerei Universitätsverlag Wagner Innsbruck', 'Hotel Maria Theresia'],
  associatedPlaces: ['innsbruck', 'munich', 'kitzbuehel'],
  associatedPublications: ['Der Berg', 'Tiroler Heimatblätter'],
  visualCharacteristics: [
    'Architectonic composition: mountains structured as faceted crystal prisms',
    'Expressionist palette of volcanic browns, deep alpine azures, and golden cadmium',
    'Integration of modernist cableway geometries cutting through mountain ridges',
    'Typographic strength balancing heavy hand-lettered sans-serifs with geometric stability',
  ],
  bibliography: [
    'Prachensky, M., Wilhelm Nicolaus Prachensky: 1898–1956 Werkmonografie, Innsbruck, 1998.',
    'Amann, G., Expressionismus in Tirol, Innsbruck, 1984.',
  ],
  sources: [SOURCES_DB.src_prachensky_tirol],
};
