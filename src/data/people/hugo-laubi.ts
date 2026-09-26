import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const hugoLaubi: Person = {
  id: 'hugo-laubi',
  name: 'Hugo Laubi',
  birthYear: 1888,
  deathYear: 1959,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Zurich', 'St. Moritz', 'Munich', 'Paris'],
  activeYears: '1912–1955',
  activeStart: 1912,
  activeEnd: 1955,
  professions: ['Painter', 'Graphic designer', 'Art director', 'Lithographer'],
  biography: 'Hugo Laubi was a celebrated Swiss poster artist and painter who studied in Munich and Paris before establishing his studio in Zurich. Laubi was commissioned extensively by the grand hotels and resort syndicates of St. Moritz, Klosters, and Davos, capturing the high-society glamour, elegant fashion, and thrilling winter sports of the Swiss Belle Époque and interwar decades.',
  associatedInstitutions: ['Kur- und Verkehrsverein St. Moritz', 'Kurverein Davos', 'Palace Hotel St. Moritz'],
  associatedCompanies: ['Gebrüder Fretz AG Zürich', 'J.E. Wolfensberger'],
  associatedPlaces: ['zurich', 'st-moritz', 'davos', 'paris'],
  associatedPublications: ['Nebelspalter', 'Schweizer Illustrierte'],
  visualCharacteristics: [
    'Elegant Art Deco and Belle Époque figurative stylization of winter tourists and skaters',
    'Rich saturated atmospheric lithography contrasting frozen lakes with crisp mountain air',
    'Sophisticated decorative framing often used in luxury hotel labels and luggage stickers',
    'Tailored typography blending hand-drawn calligraphy with modern Grotesk accents',
  ],
  bibliography: [
    'Museum für Gestaltung Zürich, Hugo Laubi: Plakate 1910–1950, Zürich, 1989.',
    'Margadant, B., Das Schweizer Plakat, Basel, 1983.',
  ],
  sources: [SOURCES_DB.src_swiss_poster_collection, SOURCES_DB.src_hotel_label_archive],
};
