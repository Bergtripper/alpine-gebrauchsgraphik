import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const heinrichCBerann: Person = {
  id: 'heinrich-c-berann',
  name: 'Heinrich C. Berann',
  birthYear: 1915,
  deathYear: 1999,
  nationality: 'Austrian',
  researchStatus: 'CONFIRMED',
  cities: ['Innsbruck', 'Vienna', 'Munich'],
  activeYears: '1934–1994',
  activeStart: 1934,
  activeEnd: 1994,
  professions: ['Painter', 'Cartographer', 'Panoramic map artist', 'Poster designer'],
  biography: 'Heinrich Caesar Berann was the world’s undisputed master of modern panoramic cartography. Born into an Innsbruck sculptor family, Berann developed a revolutionary painting technique fusing mathematical topographic projection with artistic perspective, atmospheric light, and hyper-realistic alpine textures. From 1934 onward, he produced legendary panoramic maps and posters for Grossglockner High Alpine Road, Innsbruck, Cortina, and later the National Geographic Society and Swiss Alps.',
  associatedInstitutions: ['Großglockner-Hochalpenstraßen AG', 'National Geographic Society', 'Tirol Werbung'],
  associatedCompanies: ['Freytag & Berndt Wien', 'Pestalozzi-Verlag'],
  associatedPlaces: ['innsbruck', 'vienna', 'munich'],
  associatedPublications: ['National Geographic Magazine', 'Großglockner Führer'],
  visualCharacteristics: [
    'Sweeping panoramic bird’s-eye projections blending cartographic fidelity with artistic drama',
    'Luminous alpine sunlight raking across jagged limestone peaks and crevasse-riven glaciers',
    'Precise topographic clarity combined with lush valley vegetation and highway serpentine curves',
    'Signature hand-painted cartographic lettering and classical heraldry',
  ],
  bibliography: [
    'Patterson, T., Heinrich Berann and the Art of Panoramic Cartography, Cartographic Perspectives, 2000.',
    'Berann Archiv, Heinrich C. Berann: Die Alpen im Panorama, Lans bei Innsbruck, 1995.',
  ],
  sources: [SOURCES_DB.src_berann_panoramas],
};
