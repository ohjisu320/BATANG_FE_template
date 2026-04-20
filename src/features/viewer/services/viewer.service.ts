// import { api } from '@/shared/lib/axios'
import type { AuthoringOperation, RenderStyle, RenderPreviewResponse } from '@/shared/types'

export const viewerService = {
  getModel: async (projectId: string): Promise<ArrayBuffer | null> => {
    await new Promise((r) => setTimeout(r, 300))
    console.log(`[mock] Load IFC model for project ${projectId}`)
    return null // mock: 빈 scene
    // const res = await api.get<ArrayBuffer>(`/projects/${projectId}/model`, { responseType: 'arraybuffer' })
    // return res.data
  },

  createOperation: async (projectId: string, op: AuthoringOperation, preview = false): Promise<void> => {
    await new Promise((r) => setTimeout(r, 500))
    console.log(`[mock] Operation ${preview ? '(preview)' : ''}:`, op, 'for project', projectId)
    // return api.post(`/projects/${projectId}/authoring/operations${preview ? '?mode=preview' : ''}`, op)
  },

  deleteElement: async (projectId: string, guid: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300))
    console.log(`[mock] Delete element ${guid} in project ${projectId}`)
    // return api.delete(`/projects/${projectId}/elements/${guid}`)
  },

  moveElement: async (projectId: string, guid: string, position: { x: number; y: number; z: number }): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300))
    console.log(`[mock] Move element ${guid}:`, position)
    // return api.put(`/projects/${projectId}/elements/${guid}/move`, position)
  },

  rotateElement: async (projectId: string, guid: string, rotation: { x: number; y: number; z: number }): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300))
    console.log(`[mock] Rotate element ${guid}:`, rotation)
    // return api.put(`/projects/${projectId}/elements/${guid}/rotate`, rotation)
  },

  sendCommand: async (projectId: string, text: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 800))
    console.log(`[mock] LLM command: "${text}" for project ${projectId}`)
    // return api.post(`/projects/${projectId}/command?text=${encodeURIComponent(text)}`)
  },

  renderPreview: async (
    projectId: string,
    imageB64: string,
    style: RenderStyle,
    denoisingStrength = 0.7
  ): Promise<RenderPreviewResponse> => {
    await new Promise((r) => setTimeout(r, 2000))
    console.log(`[mock] Render preview for project ${projectId}`, style)
    return {
      image_b64: imageB64, // mock: 원본 이미지 그대로 반환
      prompt: `A ${style.time_of_day} ${style.season} ${style.weather} architectural render`,
      generation_time_sec: 2.0,
    }
    // return api.post<RenderPreviewResponse>(`/projects/${projectId}/render-preview`, { image_b64: imageB64, style, denoising_strength: denoisingStrength }).then(r => r.data)
  },

  undo: async (projectId: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200))
    // return api.post(`/projects/${projectId}/undo`)
  },

  redo: async (projectId: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200))
    // return api.post(`/projects/${projectId}/redo`)
  },

  save: async (projectId: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 400))
    console.log(`[mock] Saved project ${projectId}`)
    // return api.post(`/projects/${projectId}/save`)
  },
}
