import { useState, useRef, useCallback, useEffect } from 'react'
import { Minus, Maximize2, Minimize2, X, GripHorizontal } from 'lucide-react'

export interface FloatingPanelProps {
  id: string
  title: string
  defaultPosition: { x: number; y: number }
  defaultSize: { width: number; height: number }
  children: React.ReactNode
  /** 패널이 닫혀도 children을 유지할지 (캔버스 등) */
  keepMounted?: boolean
  /** 최소화 시 표시할 아이콘 */
  icon?: React.ReactNode
  /** 패널 닫힘 콜백 */
  onClose?: () => void
  /** 초기 최소화 여부 */
  defaultMinimized?: boolean
}

type PanelState = 'normal' | 'minimized' | 'maximized' | 'closed'

export default function FloatingPanel({
  id,
  title,
  defaultPosition,
  defaultSize,
  children,
  keepMounted = false,
  icon,
  onClose,
  defaultMinimized = false,
}: FloatingPanelProps) {
  const [state, setState] = useState<PanelState>(defaultMinimized ? 'minimized' : 'normal')
  const [position, setPosition] = useState(defaultPosition)
  const [size] = useState(defaultSize)

  const panelRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{
    dragging: boolean
    startX: number
    startY: number
    originX: number
    originY: number
  }>({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 })

  /* ──────────────── Drag ──────────────── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (state === 'maximized') return
    e.preventDefault()
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    }
  }, [state, position])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragState.current.dragging) return
      const dx = e.clientX - dragState.current.startX
      const dy = e.clientY - dragState.current.startY
      setPosition({
        x: Math.max(0, dragState.current.originX + dx),
        y: Math.max(0, dragState.current.originY + dy),
      })
    }
    const onUp = () => { dragState.current.dragging = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  /* ──────────────── Actions ──────────────── */
  const minimize  = () => setState(s => s === 'minimized' ? 'normal' : 'minimized')
  const maximize  = () => setState(s => s === 'maximized' ? 'normal' : 'maximized')
  const close     = () => { setState('closed'); onClose?.() }

  if (state === 'closed' && !keepMounted) return null

  /* ──────────────── Geometry ──────────────── */
  const isMaximized  = state === 'maximized'
  const isMinimized  = state === 'minimized'
  const isClosed     = state === 'closed'

  const panelStyle: React.CSSProperties = isMaximized
    ? { position: 'absolute', inset: 0, width: undefined, height: undefined, zIndex: 30 }
    : {
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: isMinimized ? 'auto' : size.height,
        zIndex: 20,
      }

  return (
    <div
      id={id}
      ref={panelRef}
      style={{ ...panelStyle, display: isClosed ? 'none' : undefined }}
      className="flex flex-col bg-white border border-[#e5e7eb] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.12)] overflow-hidden select-none"
    >
      {/* ── Title Bar ── */}
      <div
        className="flex items-center gap-2 px-3 py-2 bg-white border-b border-[#e5e7eb] cursor-move shrink-0"
        onMouseDown={onMouseDown}
        onDoubleClick={maximize}
      >
        {/* Drag handle */}
        <GripHorizontal className="w-3.5 h-3.5 text-[#d1d5db] shrink-0" />

        {/* Icon + Title */}
        {icon && <span className="text-[#6b7280]">{icon}</span>}
        <span className="text-xs font-semibold text-[#374151] flex-1 truncate">{title}</span>

        {/* Controls */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Minimize */}
          <button
            id={`${id}-minimize`}
            className="w-5 h-5 rounded flex items-center justify-center hover:bg-[#f3f4f6] text-[#9ca3af] hover:text-[#374151] transition-colors"
            onClick={e => { e.stopPropagation(); minimize() }}
            title={isMinimized ? '펼치기' : '최소화'}
          >
            <Minus className="w-3 h-3" />
          </button>

          {/* Maximize */}
          <button
            id={`${id}-maximize`}
            className="w-5 h-5 rounded flex items-center justify-center hover:bg-[#f3f4f6] text-[#9ca3af] hover:text-[#374151] transition-colors"
            onClick={e => { e.stopPropagation(); maximize() }}
            title={isMaximized ? '원래 크기' : '최대화'}
          >
            {isMaximized
              ? <Minimize2 className="w-3 h-3" />
              : <Maximize2 className="w-3 h-3" />}
          </button>

          {/* Close */}
          <button
            id={`${id}-close`}
            className="w-5 h-5 rounded flex items-center justify-center hover:bg-[#fef2f2] text-[#9ca3af] hover:text-[#dc2626] transition-colors"
            onClick={e => { e.stopPropagation(); close() }}
            title="닫기"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          {children}
        </div>
      )}
    </div>
  )
}
