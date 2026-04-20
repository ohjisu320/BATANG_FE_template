import { MOCK_PINS, MOCK_COMMENTS } from '@/shared/mocks/comment.mock'
// import { api } from '@/shared/lib/axios'

import type { Pin, Comment } from '@/shared/types'

let pins = [...MOCK_PINS]
let comments = [...MOCK_COMMENTS]

export const commentService = {
  getPins: async (projectId: string, type?: '2d' | '3d'): Promise<Pin[]> => {
    await new Promise((r) => setTimeout(r, 200))
    const filtered = pins.filter(
      (p) => p.project_id === projectId && (type ? p.type === type : true)
    )
    return filtered
    // return api.get<Pin[]>(`/projects/${projectId}/pins`, { params: { type } }).then(r => r.data)
  },

  createPin: async (projectId: string, data: Omit<Pin, 'id' | 'project_id' | 'created_at' | 'comment_count'>): Promise<Pin> => {
    await new Promise((r) => setTimeout(r, 300))
    const newPin: Pin = {
      id: `pin-${Date.now()}`,
      project_id: projectId,
      ...data,
      created_at: new Date().toISOString(),
      comment_count: 0,
    }
    pins = [...pins, newPin]
    return newPin
    // return api.post<Pin>(`/projects/${projectId}/pins`, data).then(r => r.data)
  },

  getComments: async (_projectId: string, pinId: string): Promise<Comment[]> => {
    await new Promise((r) => setTimeout(r, 200))
    return comments.filter((c) => c.pin_id === pinId)
    // return api.get<Comment[]>(`/projects/${_projectId}/pins/${pinId}/comments`).then(r => r.data)
  },

  addComment: async (projectId: string, pinId: string, content: string): Promise<Comment> => {
    await new Promise((r) => setTimeout(r, 300))
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      pin_id: pinId,
      content,
      author: {
        id: 'mock-user-1',
        email: 'designer@batang.io',
        name: '김설계',
        user_type: 'DESIGNER',
        created_at: '2025-01-01T00:00:00Z',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      resolved: false,
    }
    comments = [...comments, newComment]
    return newComment
    // return api.post<Comment>(`/projects/${projectId}/pins/${pinId}/comments`, { content }).then(r => r.data)
  },

  deleteComment: async (_projectId: string, _pinId: string, commentId: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200))
    comments = comments.filter((c) => c.id !== commentId)
    // return api.delete(`/projects/${_projectId}/pins/${_pinId}/comments/${commentId}`)
  },

  resolvePin: async (_projectId: string, pinId: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200))
    const pin = pins.find((p) => p.id === pinId)
    if (pin) pin.resolved = true
    comments.filter((c) => c.pin_id === pinId).forEach((c) => { c.resolved = true })
    // return api.patch(`/projects/${_projectId}/pins/${pinId}/resolve`)
  },
}
