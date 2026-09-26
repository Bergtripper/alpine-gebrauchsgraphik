import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const carlMariaReisch: Person = {
  id: 'carl-maria-reisch',
  name: 'Carl Maria Reisch',
  birthYear: 1900,
  deathYear: 1975,
  nationality: 'Austrian / Tyrolean',
  researchStatus: 'PROBABLE',
  identityNotes: 'Identity: PROBABLE. Connected to the prominent Reisch family of Kitzbühel (hotel pioneers and early winter sports innovators); attributed several rare interwar hotel labels and resort prospectuses.',
  cities: ['Kitzbühel', 'Innsbruck', 'Munich'],
  activeYears: '1925–1955',
  activeStart: 1925,
  activeEnd: 1955,
  professions: ['Commercial artist', 'Hotel graphic designer', 'Painter'],
  biography: 'Carl Maria Reisch worked intimately with the emergence of luxury alpine grand hospitality in Kitzbühel and the Austrian Tyrol. Closely associated with the Grand Hotel Kitzbühel and local tourism syndicates, Reisch designed hotel baggage labels, menu covers, and regional promotional booklets that combined traditional alpine heraldry with sleek Art Deco sophistication.',
  associatedInstitutions: ['Grand Hotel Kitzbühel', 'Verkehrsverein Kitzbühel'],
  associatedCompanies: ['Druckerei Tyrolia Innsbruck', 'Graphische Kunstanstalt Kitzbühel'],
  associatedPlaces: ['kitzbuehel', 'innsbruck', 'munich'],
  associatedPublications: ['Kitzbühel Gäste-Verzeichnis', 'Tiroler Hotel-Revue'],
  visualCharacteristics: [
    'Refined heraldic motifs paired with modern Art Deco geometric framing',
    'Exquisite miniature composition suited for hotel luggage labels and luggage stickers',
    'Rich gold-bronze metallic inks, royal cobalt blue, and winter crimson',
    'Crisp classical Roman and transitional serif typography',
  ],
  bibliography: [
    'Archiv für Tiroler Kulturgeschichte, Die Gastlichkeit der Alpen: Hotelwerbung 1900–1950, Innsbruck, 1993.',
    'Reisch, F., 100 Jahre Skisport Kitzbühel, Kitzbühel, 1992.',
  ],
  sources: [SOURCES_DB.src_hotel_label_archive, SOURCES_DB.src_walde_kitzbuehel],
};
