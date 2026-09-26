import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const emilCardinaux: Person = {
  id: 'emil-cardinaux',
  name: 'Emil Cardinaux',
  birthYear: 1877,
  deathYear: 1936,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Bern', 'Zermatt', 'Munich', 'St. Moritz'],
  activeYears: '1903–1936',
  activeStart: 1903,
  activeEnd: 1936,
  professions: ['Painter', 'Poster artist', 'Founding father of Swiss poster design'],
  biography: 'Emil Cardinaux is widely recognized as the foundational pioneer of modern Swiss poster art. His 1908 poster for Zermatt—depicting the Matterhorn glowing violently in yellow and violet morning light—broke completely with nineteenth-century scenic realism, establishing a monumentally simplified lithographic language that inspired generations of Alpine graphic artists across Europe.',
  associatedInstitutions: ['Schweizerische Bundesbahnen (SBB)', 'Kurverein Zermatt', 'Schweizerischer Werkbund (SWB)'],
  associatedCompanies: ['J.E. Wolfensberger Zürich', 'Graphische Anstalt Müller & Cie.'],
  associatedPlaces: ['bern', 'zermatt', 'st-moritz', 'munich'],
  associatedPublications: ['Die Schweizerische Baukunst', 'L’Art en Suisse'],
  visualCharacteristics: [
    'Radical reduction of mountain topography into colossal tectonic color masses',
    'Audacious expressionist lighting: violet shadows paired with burning ochre and sulfur peaks',
    'Total suppression of anecdotal detail in favor of raw mountain monumentality',
    'Heavy, hand-drawn lithographic lettering anchored firmly to the pictorial base',
  ],
  bibliography: [
    'Kunstmuseum Bern, Emil Cardinaux: Retrospektive und Plakatwerk, Bern, 1984.',
    'Brunner, T., Die Erfindung der Schweizer Alpen im Plakat: Von Cardinaux bis Matter, Zürich, 2011.',
  ],
  sources: [SOURCES_DB.src_cardinaux_matterhorn, SOURCES_DB.src_swiss_poster_collection],
};
