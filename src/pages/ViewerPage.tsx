import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Wrench, Bot, Camera } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import FloatingPanel from '@/shared/components/FloatingPanel'
import ToolsPanel from '@/features/viewer/components/ToolsPanel'
import ChatPanel from '@/features/viewer/components/ChatPanel'
import BIMViewer, { type BIMViewerHandle } from '@/features/viewer/components/BIMViewer'
import { useViewerStore } from '@/shared/stores/viewerStore'
import { viewerService } from '@/features/viewer/services/viewer.service'
import { VIEWER_TOOLS, VIEWER_PANEL_LAYOUT } from '@/features/viewer/constants/viewer.constants'

export default function ViewerPage() {
  const { id: projectId } = useParams<{ id: string }>()
  const { activeTool, setActiveTool } = useViewerStore()
  const viewerRef = useRef<BIMViewerHandle>(null)

  useHotkeys('ctrl+z',       () => viewerService.undo(projectId!),   { preventDefault: true })
  useHotkeys('ctrl+shift+z', () => viewerService.redo(projectId!),   { preventDefault: true })
  useHotkeys('escape',       () => setActiveTool('select'))

  const activeToolLabel = VIEWER_TOOLS.find((t) => t.id === activeTool)?.label ?? '선택'

  const handleScreenshot = () => {
    const dataUrl = viewerRef.current?.takeScreenshot()
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `bim-screenshot-${Date.now()}.png`
    a.click()
  }

  return (
    <div className="relative flex-1 overflow-hidden bg-[#1a1a2e]">

      {/* ── @thatopen BIM Canvas ── */}
      <BIMViewer ref={viewerRef} projectId={projectId!} />

      {/* 활성 도구 배지 */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="badge badge-primary">{activeToolLabel}</span>
      </div>

      {/* 우상단 액션 버튼 */}
      <div className="absolute top-3 right-3 z-10 flex gap-1.5">
        <button
          id="screenshot-btn"
          className="w-8 h-8 bg-white border border-[#e5e7eb] rounded-md flex items-center justify-center hover:bg-[#f3f4f6] shadow-sm"
          title="스크린샷"
          onClick={handleScreenshot}
        >
          <Camera className="w-3.5 h-3.5 text-[#6b7280]" />
        </button>
      </div>

      {/* ── Floating: 도구 팔레트 ── */}
      <FloatingPanel
        id="panel-tools"
        title="도구"
        icon={<Wrench className="w-3.5 h-3.5" />}
        defaultPosition={VIEWER_PANEL_LAYOUT.tools.defaultPosition}
        defaultSize={VIEWER_PANEL_LAYOUT.tools.defaultSize}
      >
        <ToolsPanel />
      </FloatingPanel>

      {/* ── Floating: AI 채팅 ── */}
      <FloatingPanel
        id="panel-chat"
        title="AI 어시스턴트"
        icon={<Bot className="w-3.5 h-3.5" />}
        defaultPosition={VIEWER_PANEL_LAYOUT.chat.defaultPosition}
        defaultSize={VIEWER_PANEL_LAYOUT.chat.defaultSize}
      >
        <ChatPanel />
      </FloatingPanel>
    </div>
  )
}
