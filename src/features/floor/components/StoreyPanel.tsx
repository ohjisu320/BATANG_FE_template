import { Layers } from 'lucide-react'
import { useViewerStore } from '@/shared/stores/viewerStore'
import type { Storey } from '@/shared/types'

interface StoreyPanelProps {
  storeys: Storey[]
  showOverlay: boolean
  onToggleOverlay: (v: boolean) => void
}

/** 층 선택 + 겹쳐보기 토글 */
export default function StoreyPanel({ storeys, showOverlay, onToggleOverlay }: StoreyPanelProps) {
  const { activeStoreyGuid, setActiveStoreyGuid } = useViewerStore()

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 space-y-0.5">
        {storeys.map((storey) => (
          <button
            key={storey.id}
            id={`storey-${storey.id}`}
            onClick={() => setActiveStoreyGuid(storey.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors ${
              activeStoreyGuid === storey.id
                ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                : 'text-[#374151] hover:bg-[#f3f4f6]'
            }`}
          >
            <span>{storey.name}</span>
            <span className="text-[#9ca3af]">{storey.elevation / 1000}m</span>
          </button>
        ))}
      </div>

      <div className="px-3 py-2 border-t border-[#e5e7eb]">
        <label className="flex items-center gap-2 text-xs text-[#374151] cursor-pointer">
          <input
            type="checkbox"
            checked={showOverlay}
            onChange={(e) => onToggleOverlay(e.target.checked)}
            className="rounded accent-[#2563eb]"
          />
          <Layers className="w-3.5 h-3.5 text-[#6b7280]" />
          층 겹쳐보기
        </label>
      </div>
    </div>
  )
}
