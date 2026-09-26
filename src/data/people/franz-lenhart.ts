import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const franzLenhart: Person = {
  id: 'franz-lenhart',
  name: 'Franz Lenhart',
  birthYear: 1898,
  deathYear: 1992,
  nationality: 'Austrian / Italian',
  researchStatus: 'CONFIRMED',
  identityStatus: 'CONFIRMED',
  knownSignatures: ['LENHART'],
  claims: [
    {
      id: 'claim-lenhart-death-1992',
      field: 'deathYear',
      value: '1992',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: [],
      note: '1992 is retained as the project canonical death year; South Tyrol provincial museum records also identify Franz Lenhart as 1898–1992.',
    },
    {
      id: 'claim-lenhart-salce-signature',
      field: 'knownSignature',
      value: 'LENHART',
      status: 'CONFIRMED',
      evidenceKind: 'DOCUMENTED',
      sourceIds: ['src_lenhart_salce_concorso_ippico', 'src_lenhart_salce_dolomiti_1938'],
    },
  ],
  cities: ['Merano', 'Bolzano', 'Cortina d’Ampezzo', 'Vienna'],
  activeYears: '1925–1965',
  activeStart: 1925,
  activeEnd: 1965,
  professions: ['Graphic designer', 'Illustrator', 'Poster artist'],
  biography: 'Franz Lenhart was the foremost architect of the modern visual mythos of the Dolomites. Trained at the Kunstgewerbeschule in Vienna and the Accademia di Belle Arti in Florence, he settled in South Tyrol in the early 1920s. Lenhart synthesized Art Deco dynamism with athletic modernist vitality. His posters for ENIT, Cortina d’Ampezzo, Merano, and Dolomiti mountain passes established the iconic figure of the sun-tanned skier and the monumental, geometric limestone tower.',
  associatedInstitutions: ['ENIT (Ente Nazionale Industrie Turistiche)', 'Azienda Autonoma di Soggiorno Cortina'],
  associatedCompanies: ['Barabino & Graeve', 'Edizioni Richter Napoli', 'Athesia Bozen'],
  associatedPlaces: ['merano', 'bolzano', 'cortina', 'vienna'],
  associatedPublications: ['Vie Latine', 'Vetta d’Italia'],
  visualCharacteristics: [
    'Diagonal dynamic ski slopes cutting through deep ultramarine skies',
    'Chiseled athletic figures with high-contrast sunlit highlights',
    'Geometric sans-serif and condensed block lettering integrated into the composition',
    'Palette dominated by cobalt blue, fir green, and signal vermilion',
  ],
  bibliography: [
    'Lenhart, F., Manifesti delle Dolomiti, Bolzano, 1989.',
    'Scudiero, M., Arte e Turismo nelle Dolomiti, Trento, 1996.',
    'Martignoni, C., Franz Lenhart: La linea della montagna, Merano, 2004.',
  ],
  sources: [SOURCES_DB.src_lenhart_salce_concorso_ippico, SOURCES_DB.src_lenhart_salce_dolomiti_1938],
};
