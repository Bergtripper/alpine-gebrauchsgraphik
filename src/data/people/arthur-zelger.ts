import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const arthurZelger: Person = {
  id: 'arthur-zelger',
  name: 'Arthur Zelger',
  birthYear: 1914,
  deathYear: 2004,
  nationality: 'Austrian / Tyrolean',
  researchStatus: 'CONFIRMED',
  cities: ['Innsbruck', 'Vienna'],
  activeYears: '1935–1985',
  activeStart: 1935,
  activeEnd: 1985,
  professions: ['Graphic designer', 'Commercial artist', 'Typographer', 'Signet designer'],
  biography: 'Arthur Zelger was the defining graphic voice of post-war Tyrol and Austrian winter sports. Trained at the Graphische Lehr- und Versuchsanstalt in Vienna, he established his influential studio in Innsbruck. Zelger designed iconic visual identities for the 1964 and 1976 Innsbruck Winter Olympic Games, the modern Tyrolean tourism brand symbol, and hundreds of winter posters combining crystalline mountain geometry with stark, legible modernist typography.',
  associatedInstitutions: ['Tirol Werbung (Landesverkehrsamt Tirol)', 'Österreichische Fremdenverkehrswerbung', 'Organisationskomitee Innsbruck 1964/1976'],
  associatedCompanies: ['Wagner’sche Universitäts-Buchdruckerei Innsbruck', 'Tyrolia Druck'],
  associatedPlaces: ['innsbruck', 'vienna'],
  associatedPublications: ['Tirol Magazin', 'Graphis', 'Gebrauchsgraphik'],
  visualCharacteristics: [
    'Pure graphic reduction to essential geometric mountain forms',
    'Bold emblematic heraldic silhouettes combined with International Typographic Style',
    'High-contrast chromatic blocks: Tyrolean red, glacier blue, solar yellow, pristine snow white',
    'Pioneering system of functional pictograms and winter sports signets',
  ],
  bibliography: [
    'Tiroler Landesmuseum Ferdinandeum, Arthur Zelger: Plakate und Signete 1935–1985, Innsbruck, 1988.',
    'Neuwirth, M., Grafikdesign in Tirol im 20. Jahrhundert, Innsbruck, 2012.',
  ],
  sources: [SOURCES_DB.src_zelger_innsbruck],
};
