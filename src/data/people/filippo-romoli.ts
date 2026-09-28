import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const filippoRomoli: Person = {
  id: 'filippo-romoli',
  name: 'Filippo Romoli',
  birthYear: 1901,
  deathYear: 1969,
  nationality: 'Italian',
  researchStatus: 'CONFIRMED',
  identityStatus: 'CONFIRMED',
  cities: ['Savona', 'Genova'],
  activeYears: '1920s–1960s',
  activeStart: 1926,
  activeEnd: 1968,
  professions: ['Graphic designer', 'Poster artist', 'Illustrator'],
  biography:
    'Filippo Romoli was an Italian graphic designer and poster artist active especially in tourism advertising. Born in Savona in 1901, he moved to Genoa after the First World War and joined Barabino & Graeve as an advertising painter in 1926. His documented tourism work includes Alpine destinations such as Conca di Pila in the Aosta Valley.',
  associatedInstitutions: ['Museo Nazionale della Montagna — CAI Torino'],
  associatedCompanies: ['Barabino & Graeve', 'SAIGA'],
  associatedPlaces: ['pila'],
  associatedPublications: [],
  visualCharacteristics: [
    'Tourism poster design combining Art Deco structure with later modernist and Futurist inflections',
    'Strong perspectival construction and simplified promotional imagery',
    'Graphic emphasis on destination, movement and travel',
  ],
  bibliography: [],
  claims: [
    {
      id: 'claim-romoli-biography',
      field: 'identity',
      value: 'Filippo Romoli (1901–1969), Savona-born graphic designer and poster artist active in Genoa',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: ['src_romoli_wolfsoniana'],
    },
    {
      id: 'claim-romoli-pila-1954',
      field: 'alpineWork',
      value: 'Conca di Pila Valle d’Aosta, 1954',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: ['src_romoli_pila_1954'],
    },
  ],
  sources: [SOURCES_DB.src_romoli_wolfsoniana, SOURCES_DB.src_romoli_pila_1954],
};
