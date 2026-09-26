import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const ruprich: Person = {
  id: 'ruprich',
  name: 'Ruprich',
  birthYear: 1900,
  nationality: 'Austrian / Italian (historical attribution uncertain)',
  researchStatus: 'UNIDENTIFIED',
  identityNotes: 'Identity: UNIDENTIFIED. Biographical records remain undocumented in civil registers. Known exclusively through autographed interwar ski, travel, and hotel posters printed for Dobbiaco / Toblach, Cortina, and South Tyrolean destinations.',
  cities: ['Cortina d’Ampezzo', 'Dobbiaco', 'Bolzano'],
  activeYears: 'c. 1930–1940',
  activeStart: 1930,
  activeEnd: 1940,
  professions: ['Designer', 'Illustrator', 'Poster artist'],
  biography: 'Ruprich represents one of the most intriguing bibliographic mysteries in Alpine applied graphics. Despite leaving behind an exceptional corpus of interwar lithographic posters advertising winter sports in Dobbiaco, San Candido, and Cortina d’Ampezzo, no official archival biography or civil register entry has conclusively identified the person behind the signature. The work exhibits masterly handling of lithographic chalk textures, stylized skiers against dramatic Dolomite towers, and bold modern lettering typical of the 1930s.',
  associatedInstitutions: ['Pro Loco Dobbiaco / Toblach', 'Consorzio Turistico Dolomiti'],
  associatedCompanies: ['Tipografia Richter & C. Napoli', 'Litografia Daprà Bolzano'],
  associatedPlaces: ['cortina', 'bolzano'],
  associatedPublications: ['Dolomiti Inverno (1934–1938)'],
  visualCharacteristics: [
    'Diagonal ski trajectories slicing through virgin snowfields',
    'Bold silhouette treatment of Dolomite rock spires (Tre Cime, Cristallo)',
    'Characteristic stylized lowercase and condensed Roman signature: “Ruprich”',
    'Contrast between warm golden sunlit snow and deep violet cast shadows',
  ],
  bibliography: [
    'Scudiero, M., Il Segno della Montagna: Cartellonismo Dolomitico 1900–1950, Trento, 1999.',
    'Archivio Manifesti Storici Alto Adige, Scheda di catalogazione anonimi / sigle, Bolzano, 2011.',
  ],
  sources: [SOURCES_DB.src_ruprich_dossier],
};
