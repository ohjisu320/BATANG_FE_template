import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Stage, Layer, Rect, Line, Text } from 'react-konva'
import { useHotkeys } from 'react-hotkeys-hook'
import { LayoutGrid, Layers, MessageSquare } from 'lucide-react'
import FloatingPanel from '@/shared/components/FloatingPanel'
import StoreyPanel from '@/features/floor/components/StoreyPanel'
import RoomListPanel from '@/features/floor/components/RoomListPanel'
import FloorChatPanel from '@/features/floor/components/FloorChatPanel'
import { useFloorPlan } from '@/features/floor/hooks/useFloorPlan'
import { useViewerStore } from '@/shared/stores/viewerStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { FLOOR_STYLE, FLOOR_PANEL_LAYOUT } from '@/features/floor/constants/floor.constants'
import Spinner from '@/shared/components/Spinner'

export default function FloorPage() {
  const { id: projectId } = useParams<{ id: string }>()
  const { user } = useAuth()
  const isDesigner = user?.user_type === 'DESIGNER'
  const { floorPlan, isLoading, updateFloorPlan, sendCommand, isSendingCommand, undo, redo } =
    useFloorPlan(projectId!)
  const { activeStoreyGuid, setActiveStoreyGuid } = useViewerStore()
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 })

  useHotkeys('ctrl+z',       () => undo(), { preventDefault: true })
  useHotkeys('ctrl+shift+z', () => redo(), { preventDefault: true })

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const e of entries)
        setStageSize({ width: e.contentRect.width, height: e.contentRect.height })
    })
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (floorPlan && !activeStoreyGuid)
      setActiveStoreyGuid(floorPlan.storeys[0]?.id ?? null)
  }, [floorPlan])

  if (isLoading)
    return <div className="flex-1 flex items-center justify-center"><Spinner size="lg" /></div>
  if (!floorPlan) return null

  const activeRooms  = floorPlan.rooms.filter((r) => r.storey_id === activeStoreyGuid)
  const overlayRooms = showOverlay
    ? floorPlan.rooms.filter((r) => r.storey_id !== activeStoreyGuid)
    : []
  const activeWalls = floorPlan.walls.filter((w) => w.storey_id === activeStoreyGuid)

  return (
    <div className="relative flex-1 overflow-hidden bg-[#f8f9fa]">

      {/* ── Konva Canvas (배경) ── */}
      <div className="absolute inset-0" ref={containerRef}>
        <Stage width={stageSize.width} height={stageSize.height}>
          {/* Overlay layer (다른 층, 반투명) */}
          <Layer opacity={0.25}>
            {overlayRooms.map((room) => (
              <Rect key={room.id} x={room.x} y={room.y}
                width={room.width} height={room.height}
                fill={room.color} stroke="#9ca3af" strokeWidth={1} />
            ))}
          </Layer>

          {/* Active layer */}
          <Layer>
            {activeWalls.map((wall) => (
              <Line key={wall.id} points={wall.points}
                stroke={FLOOR_STYLE.wallStroke} strokeWidth={FLOOR_STYLE.wallWidth} lineCap="round" />
            ))}

            {activeRooms.map((room) => (
              <Rect
                key={room.id}
                x={room.x} y={room.y}
                width={room.width} height={room.height}
                fill={room.color}
                stroke={selectedRoomId === room.id
                  ? FLOOR_STYLE.roomStrokeSelected
                  : FLOOR_STYLE.roomStrokeDefault}
                strokeWidth={selectedRoomId === room.id
                  ? FLOOR_STYLE.roomStrokeWidthSelected
                  : FLOOR_STYLE.roomStrokeWidthDefault}
                draggable={isDesigner}
                onClick={() => setSelectedRoomId(room.id)}
                onDragEnd={(e) => {
                  if (!isDesigner || !floorPlan) return
                  updateFloorPlan({
                    ...floorPlan,
                    rooms: floorPlan.rooms.map((r) =>
                      r.id === room.id ? { ...r, x: e.target.x(), y: e.target.y() } : r,
                    ),
                  })
                }}
              />
            ))}

            {activeRooms.map((room) => (
              <Text
                key={`${room.id}-lbl`}
                x={room.x + room.width / 2}
                y={room.y + room.height / 2}
                text={room.name}
                fontSize={FLOOR_STYLE.labelFontSize}
                fill={FLOOR_STYLE.labelFill}
                align="center" verticalAlign="middle"
                offsetX={room.width / 2} offsetY={6}
                listening={false}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* ── Floating: 층 선택 ── */}
      <FloatingPanel
        id="panel-storey"
        title="층 선택"
        icon={<Layers className="w-3.5 h-3.5" />}
        defaultPosition={FLOOR_PANEL_LAYOUT.storey.defaultPosition}
        defaultSize={FLOOR_PANEL_LAYOUT.storey.defaultSize}
      >
        <StoreyPanel
          storeys={floorPlan.storeys}
          showOverlay={showOverlay}
          onToggleOverlay={setShowOverlay}
        />
      </FloatingPanel>

      {/* ── Floating: 공간 목록 ── */}
      <FloatingPanel
        id="panel-rooms"
        title="공간 목록"
        icon={<LayoutGrid className="w-3.5 h-3.5" />}
        defaultPosition={FLOOR_PANEL_LAYOUT.rooms.defaultPosition}
        defaultSize={FLOOR_PANEL_LAYOUT.rooms.defaultSize}
      >
        <RoomListPanel
          rooms={activeRooms}
          selectedRoomId={selectedRoomId}
          onSelect={setSelectedRoomId}
        />
      </FloatingPanel>

      {/* ── Floating: LLM 수정 (Designer only) ── */}
      {isDesigner && (
        <FloatingPanel
          id="panel-floor-chat"
          title="LLM 평면도 수정"
          icon={<MessageSquare className="w-3.5 h-3.5" />}
          defaultPosition={FLOOR_PANEL_LAYOUT.chat.defaultPosition}
          defaultSize={FLOOR_PANEL_LAYOUT.chat.defaultSize}
        >
          <FloorChatPanel onSend={sendCommand} isSending={isSendingCommand} />
        </FloatingPanel>
      )}
    </div>
  )
}
