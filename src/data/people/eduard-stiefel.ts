import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const eduardStiefel: Person = {
  id: 'eduard-stiefel',
  name: 'Eduard Stiefel',
  birthYear: 1875,
  deathYear: 1967,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Zurich', 'Davos', 'Munich'],
  activeYears: '1902–1945',
  activeStart: 1902,
  activeEnd: 1945,
  professions: ['Painter', 'Graphic designer', 'Professor at Kunstgewerbeschule Zürich'],
  biography: 'Eduard Stiefel was an essential teacher and graphic innovator at the Kunstgewerbeschule Zürich. He influenced generations of Swiss designers and created historic posters for winter sports in Davos, the Engadine, and Swiss mountain railways, blending early modern flat-color lithography with bold decorative contours.',
  associatedInstitutions: ['Kunstgewerbeschule Zürich (KGSZ)', 'Kurverein Davos'],
  associatedCompanies: ['J.E. Wolfensberger Zürich'],
  associatedPlaces: ['zurich', 'davos', 'munich'],
  associatedPublications: ['Das Plakat', 'Schweizer Graphiker'],
  visualCharacteristics: [
    'Stylized silhouettes framed with clean decorative outlines',
    'Rich chromolithographic flat color areas without unnecessary gradations',
    'Rhythmic integration of early Grotesk and Jugendstil-derived display typography',
    'Poetic portrayal of high-altitude alpine light and winter convalescence',
  ],
  bibliography: [
    'Museum für Gestaltung Zürich, Eduard Stiefel: Maler und Lehrer, Zürich, 1976.',
  ],
  sources: [SOURCES_DB.src_swiss_poster_collection],
};
