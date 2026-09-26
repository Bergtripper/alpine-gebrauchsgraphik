/**
 * Deterministic random number generator based on a seed string.
 */
export function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return () => {
    hash = (hash * 16807) % 2147483647;
    return (hash - 1) / 2147483646;
  };
}

/**
 * Generates a deterministic elevation profile for a place.
 * Returns an array of { x, y } points.
 */
export function generatePlaceProfile(id: string, baseElevation: number) {
  const rand = seededRandom(id);
  const points = [];
  const segments = 20;
  
  // We want baseElevation to be the "peak" or a major point in the profile
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * 100;
    
    // Create a mountain-like curve
    const distFromCenter = Math.abs(i - segments / 2) / (segments / 2);
    const bellCurve = Math.exp(-Math.pow(distFromCenter * 2, 2));
    
    // Add some noise
    const noise = (rand() - 0.5) * 0.2;
    
    // Scale by base elevation
    const y = baseElevation * (bellCurve + 0.2 + noise);
    
    points.push({ x, y });
  }
  
  return points;
}

/**
 * Generates a profile connecting multiple places.
 */
export function generateRouteProfile(placeElevations: number[]) {
  const points = [];
  const segmentsPerLeg = 10;
  
  for (let i = 0; i < placeElevations.length - 1; i++) {
    const start = placeElevations[i];
    const end = placeElevations[i + 1];
    
    for (let j = 0; j < segmentsPerLeg; j++) {
      const legProgress = j / segmentsPerLeg;
      const globalProgress = (i * segmentsPerLeg + j) / ((placeElevations.length - 1) * segmentsPerLeg);
      
      // Interpolate with some "alpine" noise
      const base = start + (end - start) * legProgress;
      const noise = Math.sin(legProgress * Math.PI) * (100 + Math.random() * 50);
      
      points.push({ x: globalProgress * 100, y: base + noise });
    }
  }
  
  // Add final point
  points.push({ x: 100, y: placeElevations[placeElevations.length - 1] });
  
  return points;
}
