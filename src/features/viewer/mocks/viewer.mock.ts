// 3D 뷰어 Mock — IFC 없이 빈 scene으로 초기화
// 실제 API: GET /api/v1/projects/:id/model → ArrayBuffer

export const MOCK_VIEWER_CONFIG = {
  wasmPath: '/wasm/',
  gridEnabled: true,
  defaultCamera: {
    position: { x: 10, y: 10, z: 10 },
    target: { x: 0, y: 0, z: 0 },
  },
}

export const MOCK_AUTHORING_TOOLS = [
  { id: 'select', label: '선택', icon: 'MousePointer2' },
  { id: 'wall', label: '벽', icon: 'Square' },
  { id: 'slab', label: '슬래브', icon: 'LayoutGrid' },
  { id: 'column', label: '기둥', icon: 'PillarIcon' },
  { id: 'beam', label: '보', icon: 'Minus' },
  { id: 'door', label: '문', icon: 'DoorOpen' },
  { id: 'window', label: '창', icon: 'AppWindow' },
  { id: 'stair', label: '계단', icon: 'Stairs' },
  { id: 'roof', label: '지붕', icon: 'Triangle' },
  { id: 'move', label: '이동', icon: 'Move' },
  { id: 'rotate', label: '회전', icon: 'RotateCcw' },
  { id: 'delete', label: '삭제', icon: 'Trash2' },
  { id: 'measure', label: '측정', icon: 'Ruler' },
] as const

export const MOCK_DEFAULT_DIMENSIONS: Record<string, Record<string, number>> = {
  wall:   { length: 4000, thickness: 200, height: 3000 },
  slab:   { length: 6000, width: 4000, thickness: 250 },
  column: { width: 400, depth: 400, height: 3000 },
  beam:   { width: 300, depth: 4000, height: 600, elevation: 2500 },
  door:   { width: 900, height: 2100, sill_height: 0 },
  window: { width: 1500, height: 1200, sill_height: 900 },
  stair:  { width: 1200, depth: 4200, height: 3000 },
  roof:   { length: 6000, width: 4000, height: 900, thickness: 250, pitch: 30 },
}
