import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const karlBickel: Person = {
  id: 'karl-bickel',
  name: 'Karl Bickel',
  birthYear: 1886,
  deathYear: 1982,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Walenstadt', 'Zurich', 'St. Gallen'],
  activeYears: '1908–1965',
  activeStart: 1908,
  activeEnd: 1965,
  professions: ['Engraver', 'Graphic designer', 'Stamp designer', 'Poster artist'],
  biography: 'Karl Bickel was a master of engraving, precision typography, and alpine lithography. Over four decades, Bickel designed more than 90 iconic postage stamps for the Swiss Post (PTT) and magnificent travel posters for the Walensee region, St. Moritz, and the Swiss Alps, characterized by crystalline line precision, deep mountain reverie, and meticulous compositional balance.',
  associatedInstitutions: ['Schweizerische Post-, Telefon- und Telegrafenbetriebe (PTT)', 'Schweizerischer Werkbund'],
  associatedCompanies: ['Gebrüder Fretz Zürich', 'Buchdruckerei Berichthaus'],
  associatedPlaces: ['walenstadt', 'zurich'],
  associatedPublications: ['Schweizerische Monatshefte', 'Werk'],
  visualCharacteristics: [
    'Mathematical engraving precision applied to alpine geological strata and sheer cliffs',
    'Chiaroscuro contrasts of sharp sunlight glancing off glacial surfaces',
    'Exquisite classical and humanist Roman typography rendered with lapidary clarity',
    'Harmonious integration of nature, spiritual quietude, and modern industrial craft',
  ],
  bibliography: [
    'Museum Bickel Walenstadt, Karl Bickel: Das grafische und bildnerische Lebenswerk, 1996.',
    'Schweizerisches Landesmuseum, Die Schweizer Briefmarke und ihre Meister, Bern, 1986.',
  ],
  sources: [SOURCES_DB.src_swiss_poster_collection],
};
