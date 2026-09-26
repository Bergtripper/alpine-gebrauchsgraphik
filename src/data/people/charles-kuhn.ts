import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const charlesKuhn: Person = {
  id: 'charles-kuhn',
  name: 'Charles Kuhn',
  birthYear: 1903,
  deathYear: 1999,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Zurich', 'Bern', 'Geneva'],
  activeYears: '1928–1975',
  activeStart: 1928,
  activeEnd: 1975,
  professions: ['Graphic designer', 'Commercial illustrator', 'Typographer'],
  biography: 'Charles Kuhn was a leading Swiss graphic designer and founding member of Alliance Graphique Internationale (AGI). Renowned for his clean, modern line and sophisticated wit, Kuhn designed influential travel posters for Swissair, Swiss Federal Railways, and Central Swiss destinations like Lucerne, Engelberg, and the Bernese Oberland.',
  associatedInstitutions: ['Alliance Graphique Internationale (AGI)', 'Schweizerische Verkehrszentrale (SVZ)'],
  associatedCompanies: ['J.C. Müller AG Zürich', 'Offsetdruckerei Gebrüder Fretz'],
  associatedPlaces: ['zurich', 'bern', 'geneva'],
  associatedPublications: ['Graphis', 'Publimondial'],
  visualCharacteristics: [
    'Clean, rationalized linework paired with airbrush color gradations',
    'Modernist spatial clarity influenced by Bauhaus and Swiss Constructivism',
    'Playful personification of alpine travel elements (skis, sun hats, luggage tags)',
    'Strict alignment with Akzidenz-Grotesk and modern Swiss sans-serif typography',
  ],
  bibliography: [
    'Kuhn, C., Plakate und Illustrationen 1930–1970, Zürich, 1983.',
    'Bärtschi, C., Schweizer Grafikdesign der Moderne, Zürich, 2007.',
  ],
  sources: [SOURCES_DB.src_swiss_poster_collection],
};
