export interface CulturalCorridor {
  from: string;
  to: string;
  label: string;
  type: 'designed' | 'printed' | 'commissioned' | 'represented';
}

export const CULTURAL_CORRIDORS: CulturalCorridor[] = [
  { from: 'bolzano', to: 'milan', label: 'Commercial Lithography Corridor', type: 'printed' },
  { from: 'bolzano', to: 'merano', label: 'Spa & Health Resort Route', type: 'designed' },
  { from: 'bolzano', to: 'cortina', label: 'Great Dolomite Road (Dolomitenstraße)', type: 'represented' },
  { from: 'cortina', to: 'dobbiaco', label: 'Ferrovia delle Dolomiti (SFD Rail)', type: 'commissioned' },
  { from: 'innsbruck', to: 'vienna', label: 'Austrian State Railway (ÖBB) Graphic Line', type: 'designed' },
  { from: 'innsbruck', to: 'munich', label: 'Bavarian Alpine Expedition Exchange', type: 'represented' },
  { from: 'kitzbuehel', to: 'innsbruck', label: 'Tyrolean Ski Racing Corridor', type: 'designed' },
  { from: 'st-moritz', to: 'zurich', label: 'Engadine Express & Graphis Press Axis', type: 'printed' },
  { from: 'zermatt', to: 'zurich', label: 'Matterhorn SBB Railway Route', type: 'commissioned' },
  { from: 'zurich', to: 'milan', label: 'Modernist Grid & Typography Exchange', type: 'designed' },
];
