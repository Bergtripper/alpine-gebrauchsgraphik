import React, { useState, useMemo } from 'react';
import { useAtlas } from '../../context/AtlasContext';
import { EntityType } from '../../types/atlas';
import { cn } from '../../lib/cn';
import {
  GraphNode,
  getNodeColor,
  buildLocalGraph,
  buildGlobalGraph,
} from '../network/networkGraphBuilder';
import { NetworkEmptyState } from '../network/NetworkEmptyState';
import { NetworkToolbar } from '../network/NetworkToolbar';
import { NetworkInspectorPanel } from '../network/NetworkInspectorPanel';

export const AtlasNetworkView: React.FC = () => {
  const {
    activeNode,
    selectNode,
    openEntity,
    theme,
    selectAuthor,
  } = useAtlas();

  // Mode: 'local' (Author-first local network) or 'global' (Full macroscopic graph)
  const [networkMode, setNetworkMode] = useState<'local' | 'global'>('local');

  // Progressive disclosure: set of node IDs that user has expanded to reveal secondary connections
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set());

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [focusedDetailId, setFocusedDetailId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Type visibility toggles
  const [visibleTypes, setVisibleTypes] = useState<Record<EntityType, boolean>>({
    person: true,
    work: true,
    place: true,
    organization: true,
    publication: true,
    theme: true,
    archiveItem: false,
  });

  const toggleTypeVisibility = (type: EntityType) => {
    setVisibleTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleExpandNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Determine current active root for local network
  const rootNodeId = activeNode?.id || null;

  // BUILD LOCAL NETWORK (Author-First Progressive Disclosure)
  const localGraph = useMemo(() => {
    if (!rootNodeId) return null;
    return buildLocalGraph(rootNodeId, activeNode?.type, expandedNodeIds);
  }, [rootNodeId, activeNode, expandedNodeIds]);

  // BUILD GLOBAL GRAPH (Macro View for All Alpine Entities)
  const globalGraph = useMemo(() => {
    return buildGlobalGraph();
  }, []);

  // Select active graph based on mode and whether rootNodeId exists
  const activeGraph = networkMode === 'local' && localGraph ? localGraph : globalGraph;

  // Filter nodes by visible types
  const visibleNodes = useMemo(() => {
    return activeGraph.nodes.filter((n) => visibleTypes[n.type]);
  }, [activeGraph.nodes, visibleTypes]);

  const visibleNodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    visibleNodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [visibleNodes]);

  const edges = useMemo(() => {
    return activeGraph.edges.filter(
      (r) => visibleNodeMap.has(r.sourceId) && visibleNodeMap.has(r.targetId)
    );
  }, [activeGraph.edges, visibleNodeMap]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setExpandedNodeIds(new Set());
  };

  // Focused node for detail overlay
  const focusedNode = focusedDetailId ? visibleNodeMap.get(focusedDetailId) : null;

  // EMPTY STATE: If no active author is chosen and mode is 'local'
  if (!rootNodeId && networkMode === 'local') {
    return (
      <NetworkEmptyState
        selectAuthor={selectAuthor}
        onExploreGlobal={() => setNetworkMode('global')}
      />
    );
  }

  return (
    <div
      className="flex-1 relative bg-[#FAF9F5] dark:bg-[#0c0f14] overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Controls & Mode Toolbar */}
      <NetworkToolbar
        networkMode={networkMode}
        onModeChange={(mode) => setNetworkMode(mode)}
        hasActiveNode={!!activeNode}
        zoom={zoom}
        onZoomIn={() => setZoom((z) => Math.min(2.5, z + 0.2))}
        onZoomOut={() => setZoom((z) => Math.max(0.4, z - 0.2))}
        onResetView={resetView}
        visibleTypes={visibleTypes}
        onToggleType={toggleTypeVisibility}
      />

      {/* Node Detail & Relationship Explainer Panel */}
      {focusedNode && (
        <NetworkInspectorPanel
          focusedNode={focusedNode}
          onClose={() => setFocusedDetailId(null)}
          selectAuthor={selectAuthor}
          openEntity={openEntity}
        />
      )}

      {/* SVG Canvas for Network Graph */}
      <svg
        className="w-full h-full cursor-grab active:cursor-grabbing"
        viewBox="0 0 1100 750"
      >
        <defs>
          <marker
            id="network-arrow"
            viewBox="0 0 10 10"
            refX={18}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path
              d="M 0 1 L 10 5 L 0 9 z"
              fill={theme === 'dark' ? '#71717a' : '#a1a1aa'}
            />
          </marker>
          <marker
            id="network-arrow-active"
            viewBox="0 0 10 10"
            refX={18}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
          </marker>
        </defs>

        <g
          transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
          style={{ transformOrigin: 'center' }}
        >
          {/* Subtle concentric orbit rings in local network */}
          {networkMode === 'local' && (
            <g className="pointer-events-none opacity-20 dark:opacity-25" stroke="currentColor" fill="none">
              <circle cx={550} cy={375} r={240} strokeDasharray="4 4" strokeWidth={1} />
              {expandedNodeIds.size > 0 && (
                <circle cx={550} cy={375} r={390} strokeDasharray="3 6" strokeWidth={1} />
              )}
            </g>
          )}

          {/* Edges */}
          {edges.map((edge) => {
            const sourceNode = visibleNodeMap.get(edge.sourceId);
            const targetNode = visibleNodeMap.get(edge.targetId);
            if (!sourceNode || !targetNode) return null;

            const isHighlighted =
              hoveredNodeId === edge.sourceId ||
              hoveredNodeId === edge.targetId ||
              focusedDetailId === edge.sourceId ||
              focusedDetailId === edge.targetId;

            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;

            return (
              <g key={edge.id} className="transition-all">
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? '#d97706' : theme === 'dark' ? '#27272a' : '#e4e4e7'}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeDasharray={(edge as any).isDirect !== false ? 'none' : '4 3'}
                  markerEnd={isHighlighted ? 'url(#network-arrow-active)' : 'url(#network-arrow)'}
                />

                {/* Semantic Relationship Label on Highlight or Local Center */}
                {(isHighlighted || (networkMode === 'local' && sourceNode.degree === 0)) && (
                  <g transform={`translate(${midX}, ${midY})`} className="pointer-events-none select-none">
                    <rect
                      x={-(edge.relationLabel.length * 3.2)}
                      y={-6}
                      width={edge.relationLabel.length * 6.4}
                      height={12}
                      rx={3}
                      fill={theme === 'dark' ? '#18181b' : '#ffffff'}
                      stroke={isHighlighted ? '#d97706' : theme === 'dark' ? '#3f3f46' : '#d4d4d8'}
                      strokeWidth={0.8}
                    />
                    <text
                      textAnchor="middle"
                      y={3.5}
                      fontSize={8}
                      fontFamily="monospace"
                      fontWeight="bold"
                      fill={isHighlighted ? '#d97706' : theme === 'dark' ? '#a1a1aa' : '#52525b'}
                    >
                      {edge.relationLabel.length > 15 ? edge.relationLabel.slice(0, 14) + '…' : edge.relationLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {visibleNodes.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isFocused = focusedDetailId === node.id;
            const isRoot = node.degree === 0;
            const isExpanded = expandedNodeIds.has(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => {
                  setFocusedDetailId(node.id);
                  selectNode(node.id, node.type);
                }}
              >
                {/* Outer Glow on Hover/Focus/Root */}
                {(isHovered || isFocused || isRoot) && (
                  <circle
                    r={node.radius + (isRoot ? 8 : 6)}
                    fill="none"
                    stroke={getNodeColor(node.type, node.degree)}
                    strokeWidth={2}
                    strokeDasharray={isRoot ? 'none' : '3 2'}
                    className={cn(isRoot && 'animate-pulse')}
                  />
                )}

                {/* Main Node Body */}
                <circle
                  r={node.radius}
                  fill={getNodeColor(node.type, node.degree)}
                  stroke={theme === 'dark' ? '#09090b' : '#ffffff'}
                  strokeWidth={2.5}
                />

                {/* Node Center Glyph or Initial */}
                <text
                  textAnchor="middle"
                  dy={4}
                  fontSize={node.radius > 20 ? 12 : 9}
                  fontWeight="bold"
                  fill="#ffffff"
                  fontFamily="sans-serif"
                >
                  {node.type === 'person'
                    ? 'P'
                    : node.type === 'place'
                    ? 'M'
                    : node.type === 'work'
                    ? 'W'
                    : node.type === 'organization'
                    ? 'O'
                    : 'Pub'}
                </text>

                {/* Node Label Below */}
                <text
                  textAnchor="middle"
                  y={node.radius + 14}
                  fontSize={isRoot ? 12 : 10}
                  fontWeight={isRoot ? 'bold' : 'normal'}
                  fontFamily="sans-serif"
                  fill={theme === 'dark' ? '#f4f4f5' : '#18181b'}
                  className="pointer-events-none select-none"
                >
                  {node.name.length > 20 ? node.name.slice(0, 18) + '…' : node.name}
                </text>

                {/* Expand (+) Badge on Direct Nodes in Local Network */}
                {networkMode === 'local' && node.degree === 1 && (
                  <g
                    transform={`translate(${node.radius - 2}, ${-node.radius + 2})`}
                    onClick={(e) => toggleExpandNode(node.id, e)}
                    className="cursor-pointer group/plus"
                  >
                    <circle
                      r={8}
                      fill={isExpanded ? '#ef4444' : '#10b981'}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                    />
                    <text
                      textAnchor="middle"
                      dy={3.5}
                      fontSize={11}
                      fontWeight="black"
                      fill="#ffffff"
                      fontFamily="monospace"
                    >
                      {isExpanded ? '−' : '+'}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
