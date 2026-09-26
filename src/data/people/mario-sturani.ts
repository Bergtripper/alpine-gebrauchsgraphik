import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const marioSturani: Person = {
  id: 'mario-sturani',
  name: 'Mario Sturani',
  birthYear: 1906,
  deathYear: 1978,
  nationality: 'Italian',
  researchStatus: 'CONFIRMED',
  cities: ['Turin', 'Milan', 'Cortina d’Ampezzo'],
  activeYears: '1926–1962',
  activeStart: 1926,
  activeEnd: 1962,
  professions: ['Futurist painter', 'Graphic designer', 'Ceramist'],
  biography: 'Linked with Second Futurism and Turin’s industrial design avant-garde (Fiat, Lenci), Mario Sturani transformed the skier into a sleek aerodynamic machine. His work for Sestriere and Western Alpine winter centers celebrated the speed, mechanical lifts, and pure geometry of modern alpine sport, influencing Italian alpine poster design through ENIT commissions.',
  associatedInstitutions: ['ENIT', 'Società Anonima Esercizi Sestriere', 'Movimento Futurista'],
  associatedCompanies: ['Grafiche Pizzi & Pizio Milano'],
  associatedPlaces: ['milan', 'cortina'],
  associatedPublications: ['Vie Latine'],
  visualCharacteristics: [
    'Futurist velocity vectors and multiple exposure speed trails',
    'Aerodynamic stylized human bodies in streamline ski posture',
    'Luminescent chromatic gradients transitioning from violet to golden sun',
    'Constructed modular display lettering',
  ],
  bibliography: [
    'Bossaglia, R., Futurismo e Sport: Manifesti e Grafica, Milano, 1991.',
    'Scudiero, M., Futurismo Trentino e Alpino, Rovereto, 1987.',
  ],
  sources: [SOURCES_DB.src_enit_registry],
};
