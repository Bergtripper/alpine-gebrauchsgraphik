import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const wilhelmBurger: Person = {
  id: 'wilhelm-burger',
  name: 'Wilhelm Burger',
  birthYear: 1882,
  deathYear: 1964,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Zurich', 'Lucerne', 'Munich'],
  activeYears: '1906–1954',
  activeStart: 1906,
  activeEnd: 1954,
  professions: ['Painter', 'Poster artist', 'Commercial designer'],
  biography: 'Willy (Wilhelm) Burger was one of the most prolific Swiss commercial poster artists of the first half of the twentieth century. Trained in Zurich and Munich, Burger created hundreds of radiant lithographs for Swiss mountain railways, lake steamers, grand hotels, and ski resorts (Jungfrau Railway, Rigi, Pilatus, and Zermatt), celebrated for their incandescent light, crystalline air, and technical virtuosity.',
  associatedInstitutions: ['Jungfraubahn AG', 'Rigi-Bahnen', 'Schweizerische Verkehrszentrale'],
  associatedCompanies: ['J.C. Müller AG Zürich', 'Graphische Anstalt Wolfensberger'],
  associatedPlaces: ['zurich', 'lucerne', 'zermatt'],
  associatedPublications: ['Die Schweiz: Illustrierte Monatsschrift', 'Schweizer Graphik'],
  visualCharacteristics: [
    'Incandescent alpine sun bursting over mountain peaks, illuminating mountain rail cars',
    'Vibrant polychrome lithography with masterful control of transparent ink layers',
    'Dramatic low-angle compositions emphasizing soaring rock needles and glacier tongues',
    'Expressive hand-drawn Roman titling with organic Art Nouveau and early modern inflections',
  ],
  bibliography: [
    'Giroud, V., Willy Burger: Der Meister des Schweizer Reiseplakats, Zürich, 2008.',
    'Brunner, T., Die Schweizer Alpen im Plakat, Zürich, 2011.',
  ],
  sources: [SOURCES_DB.src_swiss_poster_collection],
};
