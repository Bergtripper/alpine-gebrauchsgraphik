import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const alfonsBrugger: Person = {
  id: 'alfons-brugger',
  name: 'Brugger / Brügger',
  birthYear: 1894,
  deathYear: 1974,
  nationality: 'Austrian / South Tyrolean',
  researchStatus: 'UNVERIFIED',
  identityNotes: 'Identity still to be verified: historical corpus oscillates between painter-illustrator Alfons Brugger (1894–1974) and independent studio monogram Brügger documented in Merano hotel and health resort graphics.',
  cities: ['Merano', 'Munich', 'Innsbruck'],
  activeYears: '1922–1958',
  activeStart: 1922,
  activeEnd: 1958,
  professions: ['Painter', 'Commercial graphic designer', 'Typographer'],
  biography: 'Alfons Brugger was the central visual architect of Merano’s interwar identity as the premier southern alpine health and winter-sun sanctuary. Brugger formulated a distinct visual dialect contrasting sub-Mediterranean vegetation (palm trees, cypresses, blossoming orchards) against jagged snow-covered alpine ridges.',
  associatedInstitutions: ['Kurverwaltung Meran', 'Azienda Autonoma di Cura di Merano'],
  associatedCompanies: ['Pötzelberger Druck Meran', 'Druckerei Vogel Bozen'],
  associatedPlaces: ['merano', 'munich', 'innsbruck'],
  associatedPublications: ['Meraner Kur-Zeitung', 'Vie Latine'],
  visualCharacteristics: [
    'Crisp geometric contrasts between Mediterranean vegetation and snowy alpine walls',
    'Stylized Art Deco figures with elongated fashionable silhouettes',
    'Pure sunlit pastel yellows, warm terracottas, and glacial teals',
    'Hand-lettered sans-serif type with exaggerated crossbars and condensed vertical proportions',
  ],
  bibliography: [
    'Azienda Autonoma Merano, Manifesti Storici 1900–1960, Merano, 1985.',
    'Südtiroler Landesarchiv, Alfons Brugger und die Werbegrafik in Südtirol, 2005.',
  ],
  sources: [SOURCES_DB.src_brugger_meran],
};
