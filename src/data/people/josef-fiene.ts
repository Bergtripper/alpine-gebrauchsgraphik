import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const josefFiene: Person = {
  id: 'josef-fiene',
  name: 'Josef Fiene',
  birthYear: 1895,
  deathYear: 1970,
  nationality: 'Austrian / Italian',
  researchStatus: 'ATTRIBUTED',
  identityNotes: 'Identity: ATTRIBUTED. Several key interwar hotel labels and regional trade pamphlets in Trentino and South Tyrol bear the signature “J. Fiene” or are attributed to his Bolzano/Trento commercial studio.',
  cities: ['Bolzano', 'Trento', 'Rovereto'],
  activeYears: '1924–1958',
  activeStart: 1924,
  activeEnd: 1958,
  professions: ['Commercial draftsman', 'Hotel label designer', 'Typographer'],
  biography: 'Josef Fiene was a commercial draftsman and typographer active across the Adige valley and the Dolomites between 1924 and the late 1950s. Operating in an environment of political and linguistic transition, Fiene specialized in hotel identity programs, luggage labels, wine branding, and hiking maps, skillfully integrating German typography with Italian modern rationalism.',
  associatedInstitutions: ['Camera di Commercio di Bolzano e Trento', 'Consorzio Albergatori delle Dolomiti'],
  associatedCompanies: ['Tipografia Monauni Trento', 'Litografia Daprà Bolzano'],
  associatedPlaces: ['bolzano', 'trento'],
  associatedPublications: ['Guida Turistica delle Valli di Non e Sole', 'Dolomitenführer'],
  visualCharacteristics: [
    'Geometrically framed hotel and luggage labels designed for high contrast and durability',
    'Chiseled depiction of regional mountain massifs (Brenta, Rosengarten / Catinaccio)',
    'Careful dual-language typographic hierarchy combining Fraktur, Antiqua, and modern Sans',
    'Earthy lithographic pigments: pine bark brown, moss green, ochre, and deep crimson',
  ],
  bibliography: [
    'Belli, G., Grafica e pubblicità nel Trentino-Alto Adige del Novecento, Trento, 2004.',
  ],
  sources: [SOURCES_DB.src_hotel_label_archive],
};
