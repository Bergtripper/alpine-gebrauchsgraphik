import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const herbertMatter: Person = {
  id: 'herbert-matter',
  name: 'Herbert Matter',
  birthYear: 1907,
  deathYear: 1984,
  nationality: 'Swiss / American',
  researchStatus: 'CONFIRMED',
  cities: ['Engelberg', 'Zurich', 'Paris', 'New York'],
  activeYears: '1929–1980',
  activeStart: 1929,
  activeEnd: 1980,
  professions: ['Photographer', 'Graphic designer', 'Photomontage pioneer', 'Professor at Yale'],
  biography: 'Herbert Matter revolutionized the international language of tourism graphics in the 1930s. Born in Engelberg in the Swiss Alps, Matter studied painting with Fernand Léger and worked in Paris with Cassandre and Le Corbusier. Returning to Zurich, he produced a groundbreaking series of travel posters for the Swiss National Tourist Office (SVZ) using dynamic photomontage, dramatic scale shifts, photographic cropping, and New Typography (Futura). His compositions set a world standard for modernist visual communication.',
  associatedInstitutions: ['Schweizerische Verkehrszentrale (SVZ)', 'Museum of Modern Art (MoMA) New York', 'Yale University School of Art'],
  associatedCompanies: ['Gebrüder Fretz AG Zürich', 'Condé Nast', 'Knoll Associates'],
  associatedPlaces: ['engelberg', 'zurich', 'paris'],
  associatedPublications: ['Graphis', 'Camera', 'Arts & Architecture'],
  visualCharacteristics: [
    'Revolutionary photomontage combining close-up human faces, snowy peaks, and cobblestone textures',
    'Extreme shifts of scale, dramatic camera angles, and dynamic diagonal spatial axes',
    'Integration of functional typographic bars, Futura sans-serif, and Swiss national symbols',
    'Monochromatic photographic halftones juxtaposed against vibrant flat inks (red, yellow, blue)',
  ],
  bibliography: [
    'Matter, H., Herbert Matter: A Retrospective, Lars Müller Publishers, Baden, 1999.',
    'Heller, S., Herbert Matter: Modernist Pioneer, MoMA Bulletin, New York, 2005.',
  ],
  sources: [SOURCES_DB.src_matter_photomontage, SOURCES_DB.src_swiss_poster_collection],
};
