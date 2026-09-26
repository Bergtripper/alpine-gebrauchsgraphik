import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const alfonsWalde: Person = {
  id: 'alfons-walde',
  name: 'Alfons Walde',
  birthYear: 1891,
  deathYear: 1958,
  nationality: 'Austrian / Tyrolean',
  researchStatus: 'CONFIRMED',
  cities: ['Kitzbühel', 'Innsbruck', 'Vienna'],
  activeYears: '1913–1958',
  activeStart: 1913,
  activeEnd: 1958,
  professions: ['Painter', 'Architect', 'Publisher', 'Graphic designer'],
  biography: 'Alfons Walde fundamentally forged the romantic and athletic modern identity of Kitzbühel and the Austrian ski paradise. Trained in architecture at the Technische Hochschule in Vienna where he befriended Egon Schiele and Gustav Klimt, Walde returned to Kitzbühel to paint sun-drenched snowfields, wooden chalets under heavy powder blankets, and athletic skiers. He founded his own publishing house to distribute art postcards, posters, and hotel graphics worldwide.',
  associatedInstitutions: ['Kitzbüheler Ski Club (K.S.C.)', 'Hahnenkamm-Rennen Komitee', 'Verkehrsverein Kitzbühel'],
  associatedCompanies: ['Kunstverlag Alfons Walde Kitzbühel', 'Druckerei Wagner Innsbruck'],
  associatedPlaces: ['kitzbuehel', 'innsbruck', 'vienna'],
  associatedPublications: ['Walde Kunstpostkarten', 'Kitzbühel Winterprogramm'],
  visualCharacteristics: [
    'Dense, sculptural impasto and stark contrasting cast shadows on sparkling snowdrifts',
    'Deep cobalt and indigo winter skies setting off blinding white alpine summits',
    'Chiseled mountaineers and skiers clothed in signature red sweaters against snow crystals',
    'Iconic silhouette lettering with sturdy, rustic elegance',
  ],
  bibliography: [
    'Museum Kitzbühel, Alfons Walde (1891–1958): Der Maler des Winters, Kitzbühel, 2005.',
    'Messner, R. & Widmoser, E., Schnee, Sonne, Sehnsucht: Alfons Walde, Innsbruck, 1998.',
  ],
  sources: [SOURCES_DB.src_walde_kitzbuehel],
};
