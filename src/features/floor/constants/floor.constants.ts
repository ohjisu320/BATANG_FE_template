// ──────────────────────────────────────────
// 방 기본 색상 팔레트
// ──────────────────────────────────────────
export const ROOM_COLOR_PALETTE = [
  '#bfdbfe', // blue-200
  '#bbf7d0', // green-200
  '#fde68a', // yellow-200
  '#fecaca', // red-200
  '#e9d5ff', // purple-200
  '#fed7aa', // orange-200
  '#a7f3d0', // emerald-200
  '#ddd6fe', // violet-200
]

// ──────────────────────────────────────────
// Konva 기본 스타일
// ──────────────────────────────────────────
export const FLOOR_STYLE = {
  wallStroke: '#374151',
  wallWidth: 3,
  roomStrokeDefault: '#9ca3af',
  roomStrokeSelected: '#2563eb',
  roomStrokeWidthDefault: 1,
  roomStrokeWidthSelected: 2,
  labelFontSize: 11,
  labelFill: '#374151',
} as const

// ──────────────────────────────────────────
// FloatingPanel 기본 레이아웃 위치
// ──────────────────────────────────────────
export const FLOOR_PANEL_LAYOUT = {
  storey: {
    defaultPosition: { x: 12, y: 12 },
    defaultSize: { width: 200, height: 220 },
  },
  rooms: {
    defaultPosition: { x: 12, y: 244 },
    defaultSize: { width: 200, height: 260 },
  },
  chat: {
    defaultPosition: { x: 12, y: 516 },
    defaultSize: { width: 200, height: 140 },
  },
} as const
