import { MOCK_BUBBLE_DIAGRAM } from '@/features/bubble/mocks/bubble.mock'
// import { api } from '@/shared/lib/axios'

import type { BubbleDiagram } from '@/shared/types'

let bubbleCache: BubbleDiagram = { ...MOCK_BUBBLE_DIAGRAM }

export const bubbleService = {
  get: async (projectId: string): Promise<BubbleDiagram> => {
    await new Promise((r) => setTimeout(r, 300))
    return bubbleCache
    // return api.get<BubbleDiagram>(`/projects/${projectId}/bubble`).then(r => r.data)
  },

  update: async (projectId: string, data: BubbleDiagram): Promise<BubbleDiagram> => {
    await new Promise((r) => setTimeout(r, 300))
    bubbleCache = data
    return bubbleCache
    // return api.put<BubbleDiagram>(`/projects/${projectId}/bubble`, data).then(r => r.data)
  },

  undo: async (projectId: string): Promise<BubbleDiagram> => {
    await new Promise((r) => setTimeout(r, 200))
    return bubbleCache
    // return api.post<BubbleDiagram>(`/projects/${projectId}/bubble/undo`).then(r => r.data)
  },

  redo: async (projectId: string): Promise<BubbleDiagram> => {
    await new Promise((r) => setTimeout(r, 200))
    return bubbleCache
    // return api.post<BubbleDiagram>(`/projects/${projectId}/bubble/redo`).then(r => r.data)
  },
}
