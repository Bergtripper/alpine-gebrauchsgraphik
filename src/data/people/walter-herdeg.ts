import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const walterHerdeg: Person = {
  id: 'walter-herdeg',
  name: 'Walter Herdeg',
  birthYear: 1908,
  deathYear: 1995,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['St. Moritz', 'Zurich'],
  activeYears: '1930–1986',
  activeStart: 1930,
  activeEnd: 1986,
  professions: ['Graphic designer', 'Art director', 'Publisher', 'Corporate identity pioneer'],
  biography: 'Walter Herdeg was a titanic pioneer of modern graphic design and tourism branding. In the 1930s, working as art director for the Kurverein St. Moritz, Herdeg designed the famous smiling sun symbol for St. Moritz—the world’s first registered graphic trademark for a geographical destination (1937). In 1944, Herdeg founded Graphis magazine in Zurich, which became the world’s leading international journal of graphic and applied visual arts.',
  associatedInstitutions: ['Kurverein St. Moritz', 'Schweizerischer Werkbund (SWB)', 'Alliance Graphique Internationale (AGI)'],
  associatedCompanies: ['Graphis Press Zürich', 'Amstutz & Herdeg'],
  associatedPlaces: ['st-moritz', 'zurich'],
  associatedPublications: ['Graphis: International Journal of Graphic Art and Applied Art', 'St. Moritz Kurzeitung'],
  visualCharacteristics: [
    'Creation of the archetypal St. Moritz smiling sun signet: pure modernist graphic economy',
    'Integration of dynamic photography with crisp geometric Sans-Serif and Akzidenz-Grotesk',
    'Luminous solar gold, deep Engadine sky cyan, and glacier white',
    'Systematic editorial layout discipline that influenced twentieth-century global publishing',
  ],
  bibliography: [
    'Herdeg, W., 50 Years of Graphis, Graphis Press, Zürich, 1994.',
    'Margadant, B., Das Schweizer Plakat 1900–1983, Birkhäuser, Basel, 1983.',
  ],
  sources: [SOURCES_DB.src_herdeg_graphis, SOURCES_DB.src_swiss_poster_collection],
};
