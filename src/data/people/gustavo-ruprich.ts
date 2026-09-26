import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const gustavoRuprich: Person = {
  id: 'gustavo-ruprich',
  name: 'Gustavo Ruprich',
  nationality: 'Unknown',
  researchStatus: 'CONFIRMED',
  identityStatus: 'CONFIRMED',
  knownSignatures: ['RUPRICH'],
  identityNotes:
    'Gustavo Ruprich is the canonical identity used by Alpine Gebrauchsgraphik for the artist signing works RUPRICH. Public institutional catalogues currently preserve the surname attribution without biographical dates; birth, death and nationality therefore remain intentionally unset.',
  cities: [],
  activeYears: '1930s–1940s (documented works)',
  activeStart: 1930,
  activeEnd: 1950,
  professions: ['Graphic designer', 'Illustrator', 'Poster artist'],
  biography:
    'Gustavo Ruprich is documented through signed Alpine tourism graphics associated with the Dolomites. The surviving public catalogue records currently establish the works and the RUPRICH signature more securely than the artist’s biography. Alpine Gebrauchsgraphik therefore treats object-level evidence separately from unresolved biographical questions.',
  associatedInstitutions: [],
  associatedCompanies: ['B. V. Levi, Cortina d’Ampezzo'],
  associatedPlaces: ['dobbiaco', 'cortina', 'misurina', 'monte-piana'],
  associatedPublications: ['Cortina'],
  visualCharacteristics: [
    'Dynamic Alpine tourism imagery with strong diagonal movement',
    'Stylized skiers and monumental Dolomite scenery',
    'Graphic language showing notable affinities with interwar Cortina tourism design',
  ],
  bibliography: [],
  claims: [
    {
      id: 'claim-ruprich-signature',
      field: 'knownSignature',
      value: 'RUPRICH',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: ['src_ruprich_salce_misurina', 'src_ruprich_salce_monte_piana'],
      note: 'Both institutional catalogue records transcribe the printed signature RUPRICH.',
    },
    {
      id: 'claim-ruprich-levi-network',
      field: 'associatedCompany',
      value: 'B. V. Levi, Cortina d’Ampezzo',
      status: 'CONFIRMED',
      evidenceKind: 'USER_SUPPLIED',
      sourceIds: [],
      note: 'Curator reports Ruprich tourism brochures bearing the B. V. Levi imprint. Catalogue the specific objects before converting this to DOCUMENTED evidence.',
    },
  ],
  sources: [
    SOURCES_DB.src_ruprich_salce_misurina,
    SOURCES_DB.src_ruprich_salce_monte_piana,
  ],
};
