import { Work } from '../../types/atlas';
import { SOURCES_DB } from '../sources';

export const PANORAMIC_MAPS_WORKS: Work[] = [
  {
    id: 'work-berann-grossglockner-35',
    title: 'Großglockner-Hochalpenstraße — Offizielle Panoramakarte',
    creatorId: 'heinrich-c-berann',
    creatorName: 'Heinrich C. Berann',
    researchStatus: 'CONFIRMED',
    year: 1935,
    yearDisplay: '1935',
    locationId: 'innsbruck',
    locationName: 'Innsbruck',
    geographicDistinction: {
      designedInPlaceId: 'innsbruck',
      printedInPlaceId: 'vienna',
      commissionedByPlaceId: 'innsbruck',
      representedPlaceId: 'innsbruck',
    },
    publisher: 'Großglockner-Hochalpenstraßen AG',
    printer: 'Freytag & Berndt, Wien',
    technique: 'Chromolithographic panoramic bird’s-eye perspective map',
    dimensions: '88 × 62 cm',
    category: 'Panoramic Map',
    themes: ['Panoramic Maps', 'Automobile Tourism', 'Glacier Topography'],
    visualCharacteristics: {
      typography: 'sans serif',
      composition: 'dynamic',
      figure: 'none',
      landscape: 'mountain',
      style: 'realist',
    },
    colors: [
      { hex: '#047857', name: 'Alpine Valley Green', percentage: 35 },
      { hex: '#475569', name: 'Glockner Gneiss Slate', percentage: 35 },
      { hex: '#0284C7', name: 'Pasterze Glacier Blue', percentage: 30 },
    ],
    visualMotif: {
      bgGradient: 'from-emerald-950 via-slate-900 to-cyan-950',
      primaryColor: '#047857',
      secondaryColor: '#475569',
      accentColor: '#0284C7',
      motifType: 'climbing_peak',
      subtext: 'GROSSGLOCKNER HOCHALPENSTRASSE · 3798 m · PANORAMA',
    },
    collection: 'Berann Archiv Lans bei Innsbruck',
    source: SOURCES_DB.src_berann_panoramas,
  },
];
