import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const carloDeZulian: Person = {
  id: 'carlo-de-zulian',
  name: 'Carlo De Zulian',
  birthYear: 1905,
  deathYear: 1978,
  nationality: 'Italian',
  researchStatus: 'CONFIRMED',
  identityStatus: 'CONFIRMED',
  knownSignatures: ['De Zulian'],
  cities: ['Cortina d’Ampezzo'],
  activeYears: '1940s (documented Alpine works)',
  activeStart: 1941,
  activeEnd: 1942,
  professions: ['Graphic designer', 'Poster artist', 'Illustrator'],
  biography:
    'Carlo De Zulian is documented through signed tourism posters for Cortina d’Ampezzo from the early 1940s. Institutional catalogue records identify him as Carlo De Zulian (1905–1978) and preserve the De Zulian signature on works promoting Cortina, skiing and Alpine transport.',
  associatedInstitutions: ['ENIT', 'Ufficio Propaganda e Informazioni Turistiche di Cortina'],
  associatedCompanies: [],
  associatedPlaces: ['cortina'],
  associatedPublications: [],
  visualCharacteristics: [
    'Winter tourism imagery centred on skiing and Cortina d’Ampezzo',
    'Prominent female skier figures integrated with Dolomite landscapes',
    'Clear promotional composition connecting sport, resort identity and Alpine transport',
  ],
  bibliography: [],
  claims: [
    {
      id: 'claim-dezulian-identity',
      field: 'identity',
      value: 'Carlo De Zulian (1905–1978)',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: ['src_dezulian_cortina_1941', 'src_dezulian_cortina_1942'],
    },
    {
      id: 'claim-dezulian-signature',
      field: 'knownSignature',
      value: 'De Zulian',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: ['src_dezulian_cortina_1941', 'src_dezulian_cortina_1942'],
    },
  ],
  sources: [SOURCES_DB.src_dezulian_cortina_1941, SOURCES_DB.src_dezulian_cortina_1942],
};
