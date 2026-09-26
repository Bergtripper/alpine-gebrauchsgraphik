import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const pietroBernardini: Person = {
  id: 'pietro-bernardini',
  name: 'Pietro Bernardini',
  birthYear: 1891,
  deathYear: 1974,
  nationality: 'Italian',
  researchStatus: 'CONFIRMED',
  cities: ['Florence', 'Cortina d’Ampezzo', 'Milan', 'Rome'],
  activeYears: '1920–1960',
  activeStart: 1920,
  activeEnd: 1960,
  professions: ['Illustrator', 'Poster designer', 'Caricaturist', 'Painter'],
  biography: 'Pietro Bernardini was an esteemed Italian illustrator and humorist who brought narrative wit, elegant silhouettes, and lyrical lightness to alpine and tourism poster design. Commissioned by ENIT and Dolomite resort syndicates, Bernardini depicted skiers gliding across snowy plateaus and climbers among the spires of the Cadore with a buoyant line and a sophisticated pastel chromatic palette.',
  associatedInstitutions: ['ENIT (Ente Nazionale Industrie Turistiche)', 'Associazione Albergatori Cortina'],
  associatedCompanies: ['Officine Grafiche Ricordi Milano', 'Barabino & Graeve Genova'],
  associatedPlaces: ['cortina', 'milan'],
  associatedPublications: ['La Lettura', 'L’Illustrazione Italiana', 'Vie Latine'],
  visualCharacteristics: [
    'Lyrical expressive contour drawing with gentle figurative stylization',
    'Playful narrative vignettes capturing leisure, sunbathing, and winter gaiety',
    'Soft chromatic harmonies: powder blue, peach pink, lemon yellow, and slate',
    'Spontaneous hand-drawn script titling integrated organically into the illustration',
  ],
  bibliography: [
    'Pallottino, P., Storia dell’illustrazione italiana, Zanichelli, Bologna, 1988.',
    'Scudiero, M., I Maestri del Manifesto Italiano, Milano, 2003.',
  ],
  sources: [SOURCES_DB.src_enit_registry],
};
