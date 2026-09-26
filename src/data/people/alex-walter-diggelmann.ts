import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const alexWalterDiggelmann: Person = {
  id: 'alex-walter-diggelmann',
  name: 'Alex Walter Diggelmann',
  birthYear: 1902,
  deathYear: 1987,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Zurich', 'St. Moritz', 'Arosa', 'Gstaad'],
  activeYears: '1927–1972',
  activeStart: 1927,
  activeEnd: 1972,
  professions: ['Poster artist', 'Painter', 'Graphic designer', 'Olympic medalist in art competitions'],
  biography: 'Alex Walter Diggelmann was one of Switzerland’s most celebrated sports and tourism poster artists, winning three Olympic medals (gold in 1936, silver and bronze in 1948) in the Olympic art competitions for his graphic work. Diggelmann created masterworks for Arosa, St. Moritz, the FIS World Ski Championships, and Swiss Federal Railways, capturing the sheer athletic speed and kinetic power of downhill ski racing.',
  associatedInstitutions: ['Kurverein Arosa', 'Kur- und Verkehrsverein St. Moritz', 'Fédération Internationale de Ski (FIS)'],
  associatedCompanies: ['Gebrüder Fretz AG Zürich', 'J.C. Müller AG Zürich'],
  associatedPlaces: ['zurich', 'st-moritz', 'arosa'],
  associatedPublications: ['Schweizer Illustrierte Zeitung', 'Ski: Offizielles Organ des Schweizerischen Skiverbandes'],
  visualCharacteristics: [
    'Tremendous kinetic energy: diagonal motion vectors depicting downhill racers spraying powder snow',
    'Bold simplified anatomical figures carved in clean lithographic planes',
    'Vibrant primary palette: Swiss red, cobalt blue, radiant yellow, and crisp alpine whites',
    'Flawless integration of monumental poster titling along dynamic diagonals',
  ],
  bibliography: [
    'Museum für Gestaltung Zürich, Alex Walter Diggelmann: Plakate für Sport und Tourismus, Zürich, 1988.',
    'Rotzler, W., Schweizer Plakatkunst, Zürich, 1977.',
  ],
  sources: [SOURCES_DB.src_swiss_poster_collection],
};
