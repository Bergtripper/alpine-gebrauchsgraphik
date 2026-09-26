import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const loisPregartbauer: Person = {
  id: 'lois-pregartbauer',
  name: 'Lois Pregartbauer',
  birthYear: 1899,
  deathYear: 1971,
  nationality: 'Austrian',
  researchStatus: 'CONFIRMED',
  cities: ['Vienna', 'Innsbruck', 'Zurich'],
  activeYears: '1925–1965',
  activeStart: 1925,
  activeEnd: 1965,
  professions: ['Painter', 'Graphic designer', 'Typographer', 'Photomontage artist'],
  biography: 'Pregartbauer spearheaded the penetration of Central European Constructivism and New Typography into alpine travel advertising. Commissioned extensively by ÖBB (Austrian Federal Railways), he dispensed with picturesque mountain views, instead deploying aggressive diagonal angles, railway tracks rushing into the foreground, photographic cutouts of skiers, and stark sans-serif typography set in strict mathematical relationships.',
  associatedInstitutions: ['ÖBB (Österreichische Bundesbahnen)', 'Bund Österreichischer Gebrauchsgraphiker (BÖG)'],
  associatedCompanies: ['Brüder Rosenbaum Wien', 'Vorarlberger Graphik'],
  associatedPlaces: ['vienna', 'innsbruck', 'zurich'],
  associatedPublications: ['Der Berg', 'Gebrauchsgraphik Wien'],
  visualCharacteristics: [
    'Constructivist dynamic diagonals cutting across the pictorial plane',
    'Hybrid photomontage combining halftone photographs with solid flat ink shapes',
    'Geometric sans-serif typography as an active compositional armature',
    'High-contrast two- and three-color printing schemes (red, black, snow white)',
  ],
  bibliography: [
    'BÖG, Österreichische Gebrauchsgrafik 1920–1960, Wien, 1988.',
    'Denscher, B., Tagebuch der Plakatkunst: Österreich 1900–1970, Wien, 2012.',
  ],
  sources: [SOURCES_DB.src_der_berg_journal],
};
