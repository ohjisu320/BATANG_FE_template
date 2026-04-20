import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { floorService } from '@/features/floor/services/floor.service'
import type { FloorPlan } from '@/shared/types'

export const useFloorPlan = (projectId: string) => {
  const qc = useQueryClient()

  const query = useQuery({
    queryKey: ['floor', projectId],
    queryFn: () => floorService.get(projectId),
    enabled: !!projectId,
  })

  const updateMutation = useMutation({
    mutationFn: (data: FloorPlan) => floorService.update(projectId, data),
    onSuccess: (data) => qc.setQueryData(['floor', projectId], data),
  })

  const commandMutation = useMutation({
    mutationFn: (text: string) => floorService.command(projectId, text),
    onSuccess: (data) => qc.setQueryData(['floor', projectId], data),
  })

  const undoMutation = useMutation({
    mutationFn: () => floorService.undo(projectId),
    onSuccess: (data) => qc.setQueryData(['floor', projectId], data),
  })

  const redoMutation = useMutation({
    mutationFn: () => floorService.redo(projectId),
    onSuccess: (data) => qc.setQueryData(['floor', projectId], data),
  })

  return {
    floorPlan: query.data,
    isLoading: query.isLoading,
    error: query.error,
    updateFloorPlan: updateMutation.mutate,
    sendCommand: commandMutation.mutate,
    isSendingCommand: commandMutation.isPending,
    undo: undoMutation.mutate,
    redo: redoMutation.mutate,
  }
}
