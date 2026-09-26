import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const gustavJahn: Person = {
  id: 'gustav-jahn',
  name: 'Gustav Jahn',
  birthYear: 1879,
  deathYear: 1919,
  nationality: 'Austrian',
  researchStatus: 'CONFIRMED',
  cities: ['Vienna', 'Innsbruck', 'Munich'],
  activeYears: '1901–1919',
  activeStart: 1901,
  activeEnd: 1919,
  professions: ['Painter', 'Graphic artist', 'Secessionist poster designer', 'Alpinist'],
  biography: 'Gustav Jahn was a pivotal figure in the transition from Vienna Secession decorative arts to early alpine tourism identity. Commissioned by the Imperial Royal Austrian State Railways (KkStB) and alpine hotel cooperatives, Jahn’s chromolithographs fused Japanese woodblock aesthetics with razor-sharp observation of alpine geology and early winter touring equipment.',
  associatedInstitutions: ['K.k. Österreichische Staatsbahnen (KkStB)', 'Wiener Werkstätte'],
  associatedCompanies: ['Berger Lithographie Wien', 'Tyrolia Druck Innsbruck'],
  associatedPlaces: ['vienna', 'innsbruck', 'munich'],
  associatedPublications: ['Der Berg (early editions)', 'Mitteilungen des DÖAV'],
  visualCharacteristics: [
    'Sweeping panoramic alpine views with strong foreground graphic silhouettes',
    'Secessionist sinuous line elegance combined with topographic precision',
    'Subtle polychrome lithographic printing with delicate atmospheric aerial perspective',
    'Integrated hand-drawn Roman titling with Art Nouveau florid capitals',
  ],
  bibliography: [
    'Haberl, A., Gustav Jahn (1879–1919): Bergsteiger und Meister des Alpenplakats, Innsbruck, 1999.',
    'Neuwirth, W., Wiener Plakatkunst um 1900, Wien, 1982.',
  ],
  sources: [SOURCES_DB.src_jahn_alpenverein],
};
