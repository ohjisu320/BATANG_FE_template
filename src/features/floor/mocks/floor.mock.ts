import type { FloorPlan } from '@/shared/types'

export const MOCK_FLOOR_PLAN: FloorPlan = {
  storeys: [
    { id: 'storey-1', name: '1층', elevation: 0 },
    { id: 'storey-2', name: '2층', elevation: 3000 },
    { id: 'storey-3', name: '3층', elevation: 6000 },
  ],
  rooms: [
    { id: 'room-1', name: '거실', x: 50, y: 50, width: 200, height: 150, color: '#bfdbfe', storey_id: 'storey-1' },
    { id: 'room-2', name: '주방', x: 250, y: 50, width: 120, height: 100, color: '#bbf7d0', storey_id: 'storey-1' },
    { id: 'room-3', name: '침실1', x: 50, y: 200, width: 150, height: 130, color: '#fde68a', storey_id: 'storey-1' },
    { id: 'room-4', name: '침실2', x: 200, y: 200, width: 150, height: 130, color: '#fde68a', storey_id: 'storey-1' },
    { id: 'room-5', name: '화장실', x: 350, y: 150, width: 80, height: 90, color: '#e9d5ff', storey_id: 'storey-1' },
    { id: 'room-6', name: '회의실', x: 50, y: 50, width: 180, height: 140, color: '#bfdbfe', storey_id: 'storey-2' },
    { id: 'room-7', name: '사무실', x: 230, y: 50, width: 220, height: 200, color: '#bbf7d0', storey_id: 'storey-2' },
  ],
  walls: [
    { id: 'wall-1', points: [50, 50, 450, 50], storey_id: 'storey-1' },
    { id: 'wall-2', points: [450, 50, 450, 350], storey_id: 'storey-1' },
    { id: 'wall-3', points: [450, 350, 50, 350], storey_id: 'storey-1' },
    { id: 'wall-4', points: [50, 350, 50, 50], storey_id: 'storey-1' },
  ],
}
