import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const hermannKosel: Person = {
  id: 'hermann-kosel',
  name: 'Hermann Kosel',
  nationality: 'Unknown',
  researchStatus: 'UNVERIFIED',
  identityStatus: 'UNVERIFIED',
  identityNotes:
    'Seed record added from the Alpitypes “Historical Masters” list. Biographical dates, nationality, places, roles and works remain to be verified against independent sources.',
  cities: [],
  activeYears: 'To verify',
  professions: [],
  biography:
    'Provisional corpus entry. This record currently documents only that Hermann Kosel appears in the Alpitypes “Historical Masters” list; fuller biographical and object-level research is pending.',
  associatedInstitutions: [],
  associatedCompanies: [],
  associatedPlaces: [],
  associatedPublications: [],
  visualCharacteristics: [],
  bibliography: [],
  claims: [
    {
      id: 'claim-hermann-kosel-alpitypes',
      field: 'alpitypesHistoricalMaster',
      value: 'Listed in Alpitypes — Historical Masters',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: ['src_alpitypes_historical_masters'],
      note: 'The supplied Alpitypes page supports inclusion in the Historical Masters list only.',
    },
  ],
  sources: [SOURCES_DB.src_alpitypes_historical_masters],
};
