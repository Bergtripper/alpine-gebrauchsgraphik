import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const ottoBaumberger: Person = {
  id: 'otto-baumberger',
  name: 'Otto Baumberger',
  birthYear: 1889,
  deathYear: 1961,
  nationality: 'Swiss',
  researchStatus: 'CONFIRMED',
  cities: ['Zurich', 'Munich', 'Paris'],
  activeYears: '1911–1960',
  activeStart: 1911,
  activeEnd: 1960,
  professions: ['Painter', 'Graphic designer', 'Lithographic master', 'Professor at ETH Zürich'],
  biography: 'Otto Baumberger was a giant in twentieth-century Swiss graphic design and print culture. Producing over 200 extraordinary lithographic posters, Baumberger revolutionized alpine tourism advertising and the Sachplakat (object poster). He taught for decades at the Kunstgewerbeschule Zürich and the ETH Zürich, combining formidable technical mastery of stone lithography with acute psychological and spatial perception.',
  associatedInstitutions: ['Eidgenössische Technische Hochschule (ETH) Zürich', 'Kunstgewerbeschule Zürich', 'Schweizerischer Werkbund'],
  associatedCompanies: ['J.E. Wolfensberger Lithographische Kunstanstalt Zürich'],
  associatedPlaces: ['zurich', 'munich', 'paris'],
  associatedPublications: ['Das Plakat', 'Werk: Architektur, Kunst, Handwerk'],
  visualCharacteristics: [
    'Monumental tectonic clarity: mountains portrayed with physical granite weight and sculptural density',
    'Unsurpassed lithographic craft utilizing chalk stippling, flat tints, and wash techniques on stone',
    'Constructivist spatial organization anticipating the Swiss Style of the 1950s',
    'Robust, custom-drawn lettering integrated harmoniously into the stone plate',
  ],
  bibliography: [
    'Museum für Gestaltung Zürich, Otto Baumberger: 1889–1961 Der Plakatkünstler, Zürich, 1988.',
    'Brunner, F., Otto Baumberger und das Schweizer Plakat, Bern, 1999.',
  ],
  sources: [SOURCES_DB.src_swiss_poster_collection],
};
