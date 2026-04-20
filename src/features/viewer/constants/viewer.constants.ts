import {
  MousePointer2, Square, Layers, Minus, DoorOpen, AppWindow,
  Move, RotateCcw, Trash2, Ruler, BoxSelect, Triangle,
} from 'lucide-react'
import type { AuthoringTool } from '@/shared/types'

// ──────────────────────────────────────────
// 도구 목록
// ──────────────────────────────────────────
export const VIEWER_TOOLS: {
  id: AuthoringTool
  label: string
  icon: typeof MousePointer2
  group: 'select' | 'create' | 'edit'
}[] = [
  { id: 'select',  label: '선택',   icon: MousePointer2, group: 'select' },
  { id: 'wall',    label: '벽',     icon: Square,        group: 'create' },
  { id: 'slab',    label: '슬래브', icon: Layers,        group: 'create' },
  { id: 'column',  label: '기둥',   icon: BoxSelect,     group: 'create' },
  { id: 'beam',    label: '보',     icon: Minus,         group: 'create' },
  { id: 'door',    label: '문',     icon: DoorOpen,      group: 'create' },
  { id: 'window',  label: '창',     icon: AppWindow,     group: 'create' },
  { id: 'stair',   label: '계단',   icon: Layers,        group: 'create' },
  { id: 'roof',    label: '지붕',   icon: Triangle,      group: 'create' },
  { id: 'move',    label: '이동',   icon: Move,          group: 'edit'   },
  { id: 'rotate',  label: '회전',   icon: RotateCcw,     group: 'edit'   },
  { id: 'delete',  label: '삭제',   icon: Trash2,        group: 'edit'   },
  { id: 'measure', label: '측정',   icon: Ruler,         group: 'edit'   },
]

// ──────────────────────────────────────────
// 기본 치수 (mm)
// ──────────────────────────────────────────
export const DEFAULT_DIMENSIONS: Record<string, Record<string, number>> = {
  wall:   { length: 4000, thickness: 200, height: 3000 },
  slab:   { length: 6000, width: 4000, thickness: 250 },
  column: { width: 400, depth: 400, height: 3000 },
  beam:   { width: 300, depth: 4000, height: 600, elevation: 2500 },
  door:   { width: 900, height: 2100, sill_height: 0 },
  window: { width: 1500, height: 1200, sill_height: 900 },
  stair:  { width: 1200, depth: 4200, height: 3000 },
  roof:   { length: 6000, width: 4000, height: 900, thickness: 250, pitch: 30 },
}

// ──────────────────────────────────────────
// 렌더 스타일 옵션
// ──────────────────────────────────────────
export const TIME_OF_DAY_OPTIONS = [
  { value: 'morning', label: '아침' },
  { value: 'noon',    label: '낮'   },
  { value: 'evening', label: '저녁' },
  { value: 'night',   label: '밤'   },
] as const

export const SEASON_OPTIONS = [
  { value: 'spring', label: '봄' },
  { value: 'summer', label: '여름' },
  { value: 'autumn', label: '가을' },
  { value: 'winter', label: '겨울' },
] as const

export const WEATHER_OPTIONS = [
  { value: 'clear',  label: '맑음'  },
  { value: 'cloudy', label: '흐림'  },
  { value: 'rainy',  label: '비'    },
] as const

// ──────────────────────────────────────────
// FloatingPanel 기본 레이아웃 위치
// ──────────────────────────────────────────
export const VIEWER_PANEL_LAYOUT = {
  tools: {
    defaultPosition: { x: 12, y: 12 },
    defaultSize: { width: 200, height: 480 },
  },
  properties: {
    defaultPosition: { x: 12, y: 510 },
    defaultSize: { width: 200, height: 220 },
  },
  chat: {
    defaultPosition: { x: 800, y: 12 },
    defaultSize: { width: 280, height: 460 },
  },
} as const
