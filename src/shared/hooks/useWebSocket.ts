import { useEffect, useRef } from 'react'
import { createStompClient } from '@/shared/lib/stomp'
import { useViewerStore } from '@/shared/stores/viewerStore'
import { useNotificationStore } from '@/shared/stores/notificationStore'
import { useChatStore } from '@/shared/stores/chatStore'
import type { WebSocketMessage } from '@/shared/types'

export const useWebSocket = (projectId: string, sessionId: string) => {
  const clientRef = useRef(createStompClient())
  const { setModelRevision, setPresence, setLocks, setPreviews } = useViewerStore()
  const { addNotification } = useNotificationStore()
  const { updateLastMessageStatus } = useChatStore()

  useEffect(() => {
    if (!projectId) return

    const client = clientRef.current
    client.activate()

    client.onConnect = () => {
      // 모델 업데이트
      client.subscribe(`/topic/project.${projectId}.model`, (msg) => {
        const data: WebSocketMessage = JSON.parse(msg.body)
        if (data.type === 'model_update') {
          const payload = data.payload as { revision: number }
          setModelRevision(payload.revision)
          window.dispatchEvent(new CustomEvent('bim-model-update', { detail: payload }))
        } else if (data.type === 'model_reset') {
          window.dispatchEvent(new CustomEvent('bim-model-reset'))
        }
      })

      // Presence
      client.subscribe(`/topic/project.${projectId}.presence`, (msg) => {
        const data: WebSocketMessage = JSON.parse(msg.body)
        if (data.type === 'presence.state') {
          setPresence(data.payload as Parameters<typeof setPresence>[0])
        }
      })

      // Locks
      client.subscribe(`/topic/project.${projectId}.locks`, (msg) => {
        const data: WebSocketMessage = JSON.parse(msg.body)
        if (data.type === 'lock.state') {
          setLocks(data.payload as Parameters<typeof setLocks>[0])
        }
      })

      // Previews
      client.subscribe(`/topic/project.${projectId}.previews`, (msg) => {
        const data: WebSocketMessage = JSON.parse(msg.body)
        if (data.type === 'preview.state') {
          setPreviews(data.payload as Parameters<typeof setPreviews>[0])
        }
      })

      // 핀 알림
      client.subscribe(`/topic/project.${projectId}.pins`, (msg) => {
        const data: WebSocketMessage = JSON.parse(msg.body)
        if (data.type === 'pin.new') {
          addNotification({
            id: `notif-${Date.now()}`,
            type: 'pin_new',
            message: '새 댓글 핀이 생성되었습니다.',
            read: false,
            created_at: new Date().toISOString(),
          })
        }
      })

      // LLM 처리 상태
      client.subscribe(`/queue/processing.${sessionId}`, (msg) => {
        const data: WebSocketMessage = JSON.parse(msg.body)
        if (data.type === 'processing') {
          const payload = data.payload as { status: 'analyzing' | 'modifying' | 'success' | 'error'; message?: string }
          updateLastMessageStatus(payload.status, payload.message)
        } else if (data.type === 'commit.accepted') {
          const p = data.payload as { revision: number }
          setModelRevision(p.revision)
          updateLastMessageStatus('success')
        } else if (data.type === 'commit.rejected') {
          updateLastMessageStatus('error', '처리 중 오류가 발생했습니다.')
        }
      })

      // Presence join 발행
      client.publish({
        destination: '/app/presence.join',
        body: JSON.stringify({ session_id: sessionId, display_name: '사용자', user_type: 'DESIGNER' }),
      })
    }

    return () => {
      client.deactivate()
    }
  }, [projectId, sessionId])

  const publishSelection = (expressID: number | null) => {
    const client = clientRef.current
    if (client.connected) {
      client.publish({
        destination: '/app/selection.set',
        body: JSON.stringify({ session_id: sessionId, selection: expressID }),
      })
    }
  }

  return { publishSelection }
}
