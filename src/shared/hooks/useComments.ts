import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentService } from '@/shared/services/comment.service'
import type { Pin } from '@/shared/types'

export const usePins = (projectId: string, type?: '2d' | '3d') => {
  return useQuery({
    queryKey: ['pins', projectId, type],
    queryFn: () => commentService.getPins(projectId, type),
    enabled: !!projectId,
  })
}

export const useComments = (projectId: string, pinId: string) => {
  return useQuery({
    queryKey: ['comments', projectId, pinId],
    queryFn: () => commentService.getComments(projectId, pinId),
    enabled: !!projectId && !!pinId,
  })
}

export const useCreatePin = (projectId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Pin, 'id' | 'project_id' | 'created_at' | 'comment_count'>) =>
      commentService.createPin(projectId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pins', projectId] }),
  })
}

export const useAddComment = (projectId: string, pinId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (content: string) => commentService.addComment(projectId, pinId, content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', projectId, pinId] })
      qc.invalidateQueries({ queryKey: ['pins', projectId] })
    },
  })
}

export const useDeleteComment = (projectId: string, pinId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(projectId, pinId, commentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments', projectId, pinId] }),
  })
}

export const useResolvePin = (projectId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (pinId: string) => commentService.resolvePin(projectId, pinId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pins', projectId] }),
  })
}
