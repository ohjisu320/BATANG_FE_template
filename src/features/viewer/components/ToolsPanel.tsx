import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { VIEWER_TOOLS, DEFAULT_DIMENSIONS } from '@/features/viewer/constants/viewer.constants'
import { useViewerStore } from '@/shared/stores/viewerStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { AuthoringTool } from '@/shared/types'

/** 도구 팔레트 + 치수 입력 + 속성 패널 */
export default function ToolsPanel() {
  const { id: projectId } = useParams<{ id: string }>()
  const { user } = useAuth()
  const isDesigner = user?.user_type === 'DESIGNER'
  const { activeTool, setActiveTool, selectedElementProperties } = useViewerStore()
  const [dimensions, setDimensions] = useState<Record<string, number>>(
    DEFAULT_DIMENSIONS[activeTool] ?? {}
  )

  const handleToolClick = (tool: AuthoringTool) => {
    setActiveTool(tool)
    setDimensions(DEFAULT_DIMENSIONS[tool] ?? {})
  }

  const groups = ['select', 'create', 'edit'] as const
  const groupLabels = { select: '선택', create: '생성', edit: '편집' }

  return (
    <div className="flex flex-col h-full">
      {/* Tool Groups */}
      {groups.map((group) => {
        const tools = VIEWER_TOOLS.filter((t) => t.group === group)
        if (!tools.length) return null
        return (
          <div key={group}>
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af] bg-[#f9fafb]">
              {groupLabels[group]}
            </p>
            <div className="grid grid-cols-3 gap-0.5 p-1.5">
              {tools.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  id={`tool-${id}`}
                  onClick={() => isDesigner && handleToolClick(id)}
                  title={label}
                  disabled={!isDesigner && id !== 'select' && id !== 'measure'}
                  className={`flex flex-col items-center gap-0.5 p-1.5 rounded-md text-[10px] font-medium transition-colors ${
                    activeTool === id
                      ? 'bg-[#eff6ff] text-[#2563eb]'
                      : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {/* Dimensions */}
      {Object.keys(dimensions).length > 0 && isDesigner && (
        <>
          <div className="panel-header">
            <span>치수 (mm)</span>
          </div>
          <div className="p-2 space-y-1.5">
            {Object.entries(dimensions).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <label className="text-[11px] text-[#9ca3af] w-16 capitalize shrink-0">{key}</label>
                <input
                  type="number"
                  className="input-base flex-1 text-xs py-1"
                  value={val}
                  onChange={(e) =>
                    setDimensions((p) => ({ ...p, [key]: +e.target.value }))
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Selected element properties */}
      {selectedElementProperties && (
        <>
          <div className="panel-header">
            <span>선택 속성</span>
          </div>
          <div className="p-2 space-y-1 overflow-y-auto">
            {Object.entries(selectedElementProperties).slice(0, 12).map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-[10px] text-[#9ca3af] w-14 shrink-0 truncate">{k}</span>
                <span className="text-[10px] text-[#111827] font-mono truncate">{String(v)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
