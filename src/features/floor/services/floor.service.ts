import { MOCK_FLOOR_PLAN } from '@/features/floor/mocks/floor.mock'
// import { api } from '@/shared/lib/axios'

import type { FloorPlan } from '@/shared/types'

let floorPlanCache: FloorPlan = { ...MOCK_FLOOR_PLAN }

export const floorService = {
  get: async (projectId: string): Promise<FloorPlan> => {
    await new Promise((r) => setTimeout(r, 300))
    return floorPlanCache
    // return api.get<FloorPlan>(`/projects/${projectId}/floor`).then(r => r.data)
  },

  update: async (projectId: string, data: FloorPlan): Promise<FloorPlan> => {
    await new Promise((r) => setTimeout(r, 300))
    floorPlanCache = data
    console.log(`[mock] Floor plan saved for project ${projectId}`)
    return floorPlanCache
    // return api.put<FloorPlan>(`/projects/${projectId}/floor`, data).then(r => r.data)
  },

  command: async (projectId: string, text: string): Promise<FloorPlan> => {
    await new Promise((r) => setTimeout(r, 800))
    console.log(`[mock] LLM floor command: "${text}" for project ${projectId}`)
    return floorPlanCache
    // return api.post<FloorPlan>(`/projects/${projectId}/floor/command?text=${encodeURIComponent(text)}`).then(r => r.data)
  },

  undo: async (projectId: string): Promise<FloorPlan> => {
    await new Promise((r) => setTimeout(r, 200))
    return floorPlanCache
    // return api.post<FloorPlan>(`/projects/${projectId}/floor/undo`).then(r => r.data)
  },

  redo: async (projectId: string): Promise<FloorPlan> => {
    await new Promise((r) => setTimeout(r, 200))
    return floorPlanCache
    // return api.post<FloorPlan>(`/projects/${projectId}/floor/redo`).then(r => r.data)
  },
}
