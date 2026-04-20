import { ZONE_COLORS, ZONE_LABELS } from '@/features/bubble/constants/bubble.constants'
import type { BubbleNode } from '@/shared/types'

interface BubbleLegendPanelProps {
  selectedNode: BubbleNode | null
  onSelectNode: (node: BubbleNode) => void
}

/** Zone 범례 */
export default function BubbleLegendPanel({ selectedNode, onSelectNode }: BubbleLegendPanelProps) {
  return (
    <div className="p-3 space-y-1.5">
      {Object.entries(ZONE_COLORS).map(([zone, color]) => (
        <div key={zone} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full shrink-0 border border-black/10"
            style={{ background: color }}
          />
          <span className="text-xs text-[#374151]">{ZONE_LABELS[zone] ?? zone}</span>
        </div>
      ))}
    </div>
  )
}
