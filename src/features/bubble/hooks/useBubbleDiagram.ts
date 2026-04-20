import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bubbleService } from '@/features/bubble/services/bubble.service'
import type { BubbleDiagram } from '@/shared/types'

export const useBubbleDiagram = (projectId: string) => {
  const qc = useQueryClient()

  const query = useQuery({
    queryKey: ['bubble', projectId],
    queryFn: () => bubbleService.get(projectId),
    enabled: !!projectId,
  })

  const updateMutation = useMutation({
    mutationFn: (data: BubbleDiagram) => bubbleService.update(projectId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bubble', projectId] }),
  })

  const undoMutation = useMutation({
    mutationFn: () => bubbleService.undo(projectId),
    onSuccess: (data) => qc.setQueryData(['bubble', projectId], data),
  })

  const redoMutation = useMutation({
    mutationFn: () => bubbleService.redo(projectId),
    onSuccess: (data) => qc.setQueryData(['bubble', projectId], data),
  })

  return {
    diagram: query.data,
    isLoading: query.isLoading,
    error: query.error,
    updateDiagram: updateMutation.mutate,
    undo: undoMutation.mutate,
    redo: redoMutation.mutate,
  }
}
