import {
  PEOPLE,
  WORKS,
  PLACES,
  ORGANIZATIONS,
  PUBLICATIONS,
  INITIAL_RELATIONSHIPS,
} from '../../data';
import { EntityType, Relationship } from '../../types/atlas';

export interface GraphNode {
  id: string;
  name: string;
  type: EntityType;
  x: number;
  y: number;
  radius: number;
  category?: string;
  year?: number | string;
  degree?: 0 | 1 | 2; // 0 = root author, 1 = direct, 2 = secondary
  parentConnection?: Relationship;
  connectionsCount: number;
}

export function getNodeColor(type: EntityType, degree?: number): string {
  if (degree === 0) return '#d97706'; // Amber-600 for Root Author
  switch (type) {
    case 'person':
      return '#0284c7';
    case 'work':
      return '#059669';
    case 'place':
      return '#dc2626';
    case 'organization':
      return '#7c3aed';
    case 'publication':
      return '#ea580c';
    case 'theme':
      return '#4b5563';
    default:
      return '#78716c';
  }
}

export function buildLocalGraph(
  rootNodeId: string,
  rootNodeType: string | undefined,
  expandedNodeIds: Set<string>
): { nodes: GraphNode[]; edges: Relationship[] } {
  const width = 1100;
  const height = 750;
  const centerX = width / 2;
  const centerY = height / 2;

  const nodeList: GraphNode[] = [];
  const edgeList: Relationship[] = [];
  const visitedIds = new Set<string>();

  // 1. Root Node (Selected Author)
  const rootPerson = PEOPLE.find((p) => p.id === rootNodeId);
  const rootName = rootPerson?.name || rootNodeId;
  nodeList.push({
    id: rootNodeId,
    name: rootName,
    type: (rootNodeType || 'person') as EntityType,
    x: centerX,
    y: centerY,
    radius: 36,
    degree: 0,
    connectionsCount: INITIAL_RELATIONSHIPS.filter(
      (r) => r.sourceId === rootNodeId || r.targetId === rootNodeId
    ).length,
  });
  visitedIds.add(rootNodeId);

  // 2. Direct 1st-Degree Connections
  const directRelationships = INITIAL_RELATIONSHIPS.filter(
    (r) => r.sourceId === rootNodeId || r.targetId === rootNodeId
  );

  const directNodes: { id: string; name: string; type: EntityType; rel: Relationship }[] = [];
  directRelationships.forEach((r) => {
    const neighborId = r.sourceId === rootNodeId ? r.targetId : r.sourceId;
    const neighborType = r.sourceId === rootNodeId ? r.targetType : r.sourceType;
    const neighborName = r.sourceId === rootNodeId ? r.targetName : r.sourceName;

    if (!visitedIds.has(neighborId)) {
      visitedIds.add(neighborId);
      directNodes.push({ id: neighborId, name: neighborName, type: neighborType, rel: r });
      edgeList.push(r);
    }
  });

  // Position direct nodes in an orbit ring around center
  const directRadius = 240;
  directNodes.forEach((dn, idx) => {
    const angle = (idx / directNodes.length) * 2 * Math.PI - Math.PI / 2;
    const nx = centerX + Math.cos(angle) * directRadius;
    const ny = centerY + Math.sin(angle) * directRadius;

    nodeList.push({
      id: dn.id,
      name: dn.name,
      type: dn.type,
      x: nx,
      y: ny,
      radius: dn.type === 'person' ? 24 : dn.type === 'place' ? 22 : 20,
      degree: 1,
      parentConnection: dn.rel,
      connectionsCount: INITIAL_RELATIONSHIPS.filter(
        (r) => r.sourceId === dn.id || r.targetId === dn.id
      ).length,
    });

    // 3. Secondary 2nd-Degree Connections (Only for expanded nodes)
    if (expandedNodeIds.has(dn.id)) {
      const secRels = INITIAL_RELATIONSHIPS.filter(
        (r) => (r.sourceId === dn.id || r.targetId === dn.id) && r.id !== dn.rel.id
      ).slice(0, 4); // Keep progressive disclosure clean

      secRels.forEach((sr, sIdx) => {
        const secId = sr.sourceId === dn.id ? sr.targetId : sr.sourceId;
        const secType = sr.sourceId === dn.id ? sr.targetType : sr.sourceType;
        const secName = sr.sourceId === dn.id ? sr.targetName : sr.sourceName;

        if (!visitedIds.has(secId)) {
          visitedIds.add(secId);
          const spreadAngle = angle + (sIdx - 1.5) * 0.35;
          const secRadius = directRadius + 150;
          nodeList.push({
            id: secId,
            name: secName,
            type: secType,
            x: centerX + Math.cos(spreadAngle) * secRadius,
            y: centerY + Math.sin(spreadAngle) * secRadius,
            radius: 16,
            degree: 2,
            parentConnection: sr,
            connectionsCount: 1,
          });
          edgeList.push(sr);
        }
      });
    }
  });

  return { nodes: nodeList, edges: edgeList };
}

export function buildGlobalGraph(): { nodes: GraphNode[]; edges: Relationship[] } {
  const list: GraphNode[] = [];
  const width = 1100;
  const height = 750;
  const centerX = width / 2;
  const centerY = height / 2;

  // 1. People cluster
  PEOPLE.forEach((p, idx) => {
    const angle = (idx / PEOPLE.length) * 2 * Math.PI;
    const radius = 170;
    list.push({
      id: p.id,
      name: p.name,
      type: 'person',
      x: centerX - 80 + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      radius: 24,
      connectionsCount: INITIAL_RELATIONSHIPS.filter(
        (r) => r.sourceId === p.id || r.targetId === p.id
      ).length,
    });
  });

  // 2. Places cluster
  PLACES.forEach((pl, idx) => {
    const angle = (idx / PLACES.length) * Math.PI + Math.PI * 0.1;
    const radius = 340;
    list.push({
      id: pl.id,
      name: pl.name,
      type: 'place',
      x: centerX + Math.cos(angle) * (radius * 1.15),
      y: centerY + Math.sin(angle) * (radius * 0.8) - 40,
      radius: 20,
      connectionsCount: INITIAL_RELATIONSHIPS.filter(
        (r) => r.sourceId === pl.id || r.targetId === pl.id
      ).length,
    });
  });

  // 3. Works cluster
  WORKS.forEach((w, idx) => {
    const angle = (idx / WORKS.length) * 2 * Math.PI + 0.3;
    const radius = 320;
    list.push({
      id: w.id,
      name: w.title.slice(0, 22),
      type: 'work',
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      radius: 16,
      year: w.yearDisplay,
      category: w.category,
      connectionsCount: INITIAL_RELATIONSHIPS.filter(
        (r) => r.sourceId === w.id || r.targetId === w.id
      ).length,
    });
  });

  // 4. Organizations
  ORGANIZATIONS.forEach((o, idx) => {
    const offset = (idx - ORGANIZATIONS.length / 2) * 80;
    list.push({
      id: o.id,
      name: o.name.split('—')[0].trim(),
      type: 'organization',
      x: centerX + offset - 40,
      y: centerY + 280,
      radius: 18,
      connectionsCount: INITIAL_RELATIONSHIPS.filter(
        (r) => r.sourceId === o.id || r.targetId === o.id
      ).length,
    });
  });

  // 5. Publications
  PUBLICATIONS.forEach((pub, idx) => {
    const offset = (idx - PUBLICATIONS.length / 2) * 75;
    list.push({
      id: pub.id,
      name: pub.title.split(':')[0],
      type: 'publication',
      x: centerX - 340 + offset,
      y: centerY - 240,
      radius: 17,
      connectionsCount: INITIAL_RELATIONSHIPS.filter(
        (r) => r.sourceId === pub.id || r.targetId === pub.id
      ).length,
    });
  });

  return { nodes: list, edges: INITIAL_RELATIONSHIPS };
}
