import type { BubbleDiagram } from '@/shared/types'

export const MOCK_BUBBLE_DIAGRAM: BubbleDiagram = {
  nodes: [
    { id: 'bubble-1', label: '로비', area: 80, color: '#3b82f6', zone: 'public' },
    { id: 'bubble-2', label: '거실', area: 45, color: '#3b82f6', zone: 'public' },
    { id: 'bubble-3', label: '주방', area: 20, color: '#10b981', zone: 'service' },
    { id: 'bubble-4', label: '식당', area: 30, color: '#10b981', zone: 'service' },
    { id: 'bubble-5', label: '침실1', area: 15, color: '#f59e0b', zone: 'private' },
    { id: 'bubble-6', label: '침실2', area: 12, color: '#f59e0b', zone: 'private' },
    { id: 'bubble-7', label: '욕실', area: 6, color: '#8b5cf6', zone: 'utility' },
    { id: 'bubble-8', label: '다용도실', area: 8, color: '#8b5cf6', zone: 'utility' },
  ],
  links: [
    { id: 'link-1', source: 'bubble-1', target: 'bubble-2', strength: 0.9 },
    { id: 'link-2', source: 'bubble-2', target: 'bubble-3', strength: 0.7 },
    { id: 'link-3', source: 'bubble-3', target: 'bubble-4', strength: 0.8 },
    { id: 'link-4', source: 'bubble-2', target: 'bubble-5', strength: 0.6 },
    { id: 'link-5', source: 'bubble-2', target: 'bubble-6', strength: 0.6 },
    { id: 'link-6', source: 'bubble-5', target: 'bubble-7', strength: 0.5 },
    { id: 'link-7', source: 'bubble-3', target: 'bubble-8', strength: 0.4 },
  ],
}
