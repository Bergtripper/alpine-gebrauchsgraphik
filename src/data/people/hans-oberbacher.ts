import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const hansOberbacher: Person = {
  id: 'hans-oberbacher',
  name: 'Hans Oberbacher',
  birthYear: 1914,
  deathYear: 2012,
  nationality: 'Austrian / Tyrolean',
  researchStatus: 'CONFIRMED',
  cities: ['Innsbruck', 'Schwaz', 'Vienna'],
  activeYears: '1938–1980',
  activeStart: 1938,
  activeEnd: 1980,
  professions: ['Commercial artist', 'Illustrator', 'Poster designer'],
  biography: 'Hans Oberbacher was a prolific Tyrolean poster artist and commercial illustrator whose posters for St. Anton am Arlberg, Seefeld, Igls, and Austrian Federal Railways (ÖBB) captured the optimistic athletic spirit of mid-century alpine skiing. Collaborating closely with regional tourism boards and sports apparel makers, his dynamic illustrations brought joyful post-war vibrancy and graphic refinement to international winter tourism.',
  associatedInstitutions: ['Landesverkehrsamt Tirol', 'Österreichische Bundesbahnen (ÖBB)', 'Skiclub Arlberg'],
  associatedCompanies: ['Universitätsverlag Wagner', 'Offsetdruckerei Steyrermühl'],
  associatedPlaces: ['innsbruck', 'vienna'],
  associatedPublications: ['Tiroler Kalender', 'Austrian Winter Travel Guide'],
  visualCharacteristics: [
    'Dynamic perspective curves tracing fresh ski tracks through powder snow',
    'Radiant solar halos illuminating athletic figures in mid-jump or carving turns',
    'Optimistic mid-century color harmony: turquoise, saffron, coral red, and pine green',
    'Playful brush lettering integrated with structured display sans-serifs',
  ],
  bibliography: [
    'Tiroler Landesarchiv, Tiroler Fremdenverkehrsplakate 1945–1975, Innsbruck, 1994.',
    'BÖG Jahrbuch, Meister der österreichischen Gebrauchsgraphik, Wien, 1968.',
  ],
  sources: [SOURCES_DB.src_zelger_innsbruck],
};
