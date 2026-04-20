import type { Room } from '@/shared/types'

interface RoomListPanelProps {
  rooms: Room[]
  selectedRoomId: string | null
  onSelect: (id: string) => void
}

/** 공간 목록 패널 */
export default function RoomListPanel({ rooms, selectedRoomId, onSelect }: RoomListPanelProps) {
  if (rooms.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-xs text-[#9ca3af]">
        공간 없음
      </div>
    )
  }

  return (
    <div className="p-2 space-y-0.5">
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelect(room.id)}
          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
            selectedRoomId === room.id
              ? 'bg-[#eff6ff] text-[#2563eb]'
              : 'text-[#374151] hover:bg-[#f3f4f6]'
          }`}
        >
          <span
            className="w-3 h-3 rounded-sm shrink-0 border border-black/10"
            style={{ background: room.color }}
          />
          <span className="flex-1 text-left truncate">{room.name}</span>
          <span className="text-[#9ca3af] shrink-0">
            {Math.round(room.width / 10) * Math.round(room.height / 10) / 100}㎡
          </span>
        </button>
      ))}
    </div>
  )
}
