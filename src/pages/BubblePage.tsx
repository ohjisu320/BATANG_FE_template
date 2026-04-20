import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as d3 from 'd3'
import { Circle, List } from 'lucide-react'
import FloatingPanel from '@/shared/components/FloatingPanel'
import BubbleLegendPanel from '@/features/bubble/components/BubbleLegendPanel'
import BubbleNodeListPanel from '@/features/bubble/components/BubbleNodeListPanel'
import { useBubbleDiagram } from '@/features/bubble/hooks/useBubbleDiagram'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { BUBBLE_SIMULATION, BUBBLE_PANEL_LAYOUT } from '@/features/bubble/constants/bubble.constants'
import Spinner from '@/shared/components/Spinner'
import type { BubbleNode } from '@/shared/types'

export default function BubblePage() {
  const { id: projectId } = useParams<{ id: string }>()
  const { user } = useAuth()
  const isDesigner = user?.user_type === 'DESIGNER'
  const { diagram, isLoading, updateDiagram } = useBubbleDiagram(projectId!)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedNode, setSelectedNode] = useState<BubbleNode | null>(null)

  /* ── D3 시뮬레이션 ── */
  useEffect(() => {
    if (!diagram || !svgRef.current || !containerRef.current) return

    const width  = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('width', width).attr('height', height)

    // Shadow filter
    const defs   = svg.append('defs')
    const filter = defs.append('filter').attr('id', 'bshadow')
    filter.append('feDropShadow')
      .attr('dx', 0).attr('dy', 2)
      .attr('stdDeviation', 3)
      .attr('flood-opacity', 0.1)

    const g = svg.append('g')

    const nodes = diagram.nodes.map((n) => ({ ...n })) as (BubbleNode & d3.SimulationNodeDatum)[]
    const links = diagram.links.map((l) => ({ ...l, source: l.source, target: l.target }))

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id((d) => (d as BubbleNode).id)
        .strength((d) => (d as typeof links[0]).strength))
      .force('charge', d3.forceManyBody().strength(BUBBLE_SIMULATION.chargeStrength))
      .force('center',    d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(
        (d) =>
          Math.sqrt((d as BubbleNode).area) * BUBBLE_SIMULATION.radiusScale + BUBBLE_SIMULATION.radiusPadding
      ))

    // Links
    const link = g.append('g')
      .selectAll('line').data(links).join('line')
      .attr('stroke', '#d1d5db')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '5 3')

    // Nodes
    const node = g.append('g')
      .selectAll<SVGGElement, typeof nodes[0]>('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, typeof nodes[0]>()
          .on('start', (ev, d) => { if (!ev.active) simulation.alphaTarget(BUBBLE_SIMULATION.alphaTarget).restart(); d.fx = d.x; d.fy = d.y })
          .on('drag',  (ev, d) => { d.fx = ev.x; d.fy = ev.y })
          .on('end',   (ev, d) => { if (!ev.active) simulation.alphaTarget(0); d.fx = null; d.fy = null })
      )

    node.append('circle')
      .attr('r', (d) => Math.sqrt(d.area) * BUBBLE_SIMULATION.radiusScale)
      .attr('fill',         (d) => d.color + '33')
      .attr('stroke',       (d) => d.color)
      .attr('stroke-width', 2)
      .style('filter', 'url(#bshadow)')
      .on('click', (_, d) => setSelectedNode(d))

    node.append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle').attr('dy', '0.35em')
      .attr('font-size', 12).attr('font-weight', 600)
      .attr('fill', '#374151').style('pointer-events', 'none')

    node.append('text')
      .text((d) => `${d.area}㎡`)
      .attr('text-anchor', 'middle').attr('dy', '1.6em')
      .attr('font-size', 10).attr('fill', '#9ca3af')
      .style('pointer-events', 'none')

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as unknown as typeof nodes[0]).x ?? 0)
        .attr('y1', (d) => (d.source as unknown as typeof nodes[0]).y ?? 0)
        .attr('x2', (d) => (d.target as unknown as typeof nodes[0]).x ?? 0)
        .attr('y2', (d) => (d.target as unknown as typeof nodes[0]).y ?? 0)
      node.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
    })

    // Zoom
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.2, 4])
        .on('zoom', (e) => g.attr('transform', e.transform))
    )

    return () => { simulation.stop() }
  }, [diagram])

  if (isLoading)
    return <div className="flex-1 flex items-center justify-center"><Spinner size="lg" /></div>

  return (
    <div className="relative flex-1 overflow-hidden bg-[#fafbfc]">

      {/* ── D3 Canvas (배경) ── */}
      <div className="absolute inset-0" ref={containerRef}>
        <svg ref={svgRef} className="w-full h-full" />
      </div>

      {/* 안내 */}
      <p className="absolute bottom-4 right-4 text-[11px] text-[#9ca3af] pointer-events-none">
        드래그 이동 · 스크롤 확대/축소
      </p>

      {/* ── Floating: Zone 범례 ── */}
      <FloatingPanel
        id="panel-bubble-legend"
        title="Zone 범례"
        icon={<Circle className="w-3.5 h-3.5" />}
        defaultPosition={BUBBLE_PANEL_LAYOUT.legend.defaultPosition}
        defaultSize={BUBBLE_PANEL_LAYOUT.legend.defaultSize}
      >
        <BubbleLegendPanel
          selectedNode={selectedNode}
          onSelectNode={setSelectedNode}
        />
      </FloatingPanel>

      {/* ── Floating: 버블 노드 목록 ── */}
      {diagram && (
        <FloatingPanel
          id="panel-bubble-nodes"
          title="공간 목록"
          icon={<List className="w-3.5 h-3.5" />}
          defaultPosition={BUBBLE_PANEL_LAYOUT.nodeList.defaultPosition}
          defaultSize={BUBBLE_PANEL_LAYOUT.nodeList.defaultSize}
        >
          <BubbleNodeListPanel
            diagram={diagram}
            selectedNode={selectedNode}
            isDesigner={isDesigner}
            onSelect={setSelectedNode}
            onDelete={(nodeId) => {
              updateDiagram({
                nodes: diagram.nodes.filter((n) => n.id !== nodeId),
                links: diagram.links.filter(
                  (l) => l.source !== nodeId && l.target !== nodeId
                ),
              })
              setSelectedNode(null)
            }}
          />
        </FloatingPanel>
      )}
    </div>
  )
}
