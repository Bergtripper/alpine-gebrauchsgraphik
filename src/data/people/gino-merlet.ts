import { Person } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const ginoMerlet: Person = {
  id: 'gino-merlet',
  name: 'Alexander Erwin Merlet (Gino Merlet)',
  birthYear: 1886,
  deathYear: 1939,
  nationality: 'Italian / South Tyrolean',
  researchStatus: 'CONFIRMED',
  cities: ['Bolzano', 'Trento', 'Munich'],
  activeYears: '1920–1955',
  activeStart: 1920,
  activeEnd: 1955,
  professions: ['Graphic artist', 'Photographer', 'Mountaineer', 'Publisher'],
  biography: 'Alexander Gino Merlet operated at the exact intersection of technical alpinism and modern visual communication in Bolzano. Founder of the Foto-Sport studio and commercial partner of legendary sporting-goods suppliers like Oberrauch & Zitt, Merlet was a pioneer of alpine photography and catalog design. His climbing guidebooks and gear advertisements abandoned romantic pictorialism in favor of stark, functional line drawings and dramatic low-angle photography.',
  associatedInstitutions: ['CAI (Club Alpino Italiano) Sezione Bolzano', 'DÖAV (Deutscher und Österreichischer Alpenverein)'],
  associatedCompanies: ['Oberrauch & Zitt Bozen', 'Tipografia Athesia'],
  associatedPlaces: ['bolzano', 'munich'],
  associatedPublications: ['Vetta d’Italia', 'Oberrauch & Zitt Wintersport-Katalog'],
  visualCharacteristics: [
    'Stark vertical perspective lines mimicking sheer rock faces and climbing chimneys',
    'Technical clarity combined with expressive woodcut-like linework',
    'Modernist bold typography paired with German Fraktur or condensed Roman titling',
    'Deep earth tones: dolomite ochre, granite grey, soot black, and paper cream',
  ],
  bibliography: [
    'Archivio Merlet, Cento anni di alpinismo fotografico, Bolzano, 1995.',
    'Marchetti, L., Alpinisti e Grafici a Bolzano tra le due guerre, Bolzano, 2001.',
  ],
  sources: [SOURCES_DB.src_merlet_archive],
};
