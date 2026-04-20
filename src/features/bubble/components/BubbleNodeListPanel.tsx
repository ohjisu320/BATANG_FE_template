import { Trash2 } from 'lucide-react'
import type { BubbleNode, BubbleDiagram } from '@/shared/types'

interface BubbleNodeListPanelProps {
  diagram: BubbleDiagram
  selectedNode: BubbleNode | null
  isDesigner: boolean
  onSelect: (node: BubbleNode) => void
  onDelete: (nodeId: string) => void
}

/** 버블 노드 목록 + 삭제 */
export default function BubbleNodeListPanel({
  diagram, selectedNode, isDesigner, onSelect, onDelete,
}: BubbleNodeListPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {diagram.nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => onSelect(node)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors ${
              selectedNode?.id === node.id
                ? 'bg-[#eff6ff] text-[#2563eb]'
                : 'text-[#374151] hover:bg-[#f3f4f6]'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0 border border-black/10"
              style={{ background: node.color }}
            />
            <span className="flex-1 text-left font-medium truncate">{node.label}</span>
            <span className="text-[#9ca3af] shrink-0">{node.area}㎡</span>
          </button>
        ))}
      </div>

      {/* Selected actions */}
      {selectedNode && isDesigner && (
        <div className="p-2 border-t border-[#e5e7eb] shrink-0">
          <p className="text-[11px] font-medium text-[#374151] mb-1.5 truncate">{selectedNode.label}</p>
          <button
            className="btn-danger w-full text-xs flex items-center justify-center gap-1.5 py-1"
            onClick={() => onDelete(selectedNode.id)}
          >
            <Trash2 className="w-3 h-3" /> 삭제
          </button>
        </div>
      )}
    </div>
  )
}
