import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Send, Loader2, Bot } from 'lucide-react'
import { useChatStore } from '@/shared/stores/chatStore'
import { viewerService } from '@/features/viewer/services/viewer.service'
import { useAuth } from '@/features/auth/hooks/useAuth'

/** AI 어시스턴트 채팅 패널 */
export default function ChatPanel() {
  const { id: projectId } = useParams<{ id: string }>()
  const { user } = useAuth()
  const isDesigner = user?.user_type === 'DESIGNER'
  const { messages, addMessage, updateLastMessageStatus } = useChatStore()
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSending) return
    const text = input.trim()
    setInput('')
    setIsSending(true)

    addMessage({
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      created_at: new Date().toISOString(),
    })
    addMessage({
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      content: '분석 중...',
      status: 'analyzing',
      created_at: new Date().toISOString(),
    })

    try {
      await viewerService.sendCommand(projectId!, text)
      updateLastMessageStatus('success', `"${text}" 처리 완료`)
    } catch {
      updateLastMessageStatus('error', '처리 중 오류가 발생했습니다.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-6">
            <Bot className="w-7 h-7 text-[#d1d5db] mb-2" />
            <p className="text-[11px] text-[#9ca3af]">텍스트로 모델을 수정하세요</p>
            <p className="text-[11px] text-[#d1d5db] mt-0.5">예: "북쪽 벽에 창문 추가"</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-lg px-3 py-1.5 text-[11px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#f3f4f6] text-[#374151]'
                }`}
              >
                <p>{msg.content}</p>
                {msg.status && msg.status !== 'success' && msg.status !== 'idle' && (
                  <div className="flex items-center gap-1 mt-0.5 opacity-70">
                    {msg.status !== 'error' && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                    <span className="text-[10px]">
                      {{ analyzing: '분석 중', modifying: '수정 중', error: '오류' }[msg.status]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      {isDesigner && (
        <form onSubmit={handleSubmit} className="p-2 border-t border-[#e5e7eb] shrink-0">
          <div className="flex gap-1.5">
            <input
              id="chat-input"
              type="text"
              className="input-base flex-1 text-xs py-1.5"
              placeholder="명령을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />
            <button
              id="chat-send-btn"
              type="submit"
              className="btn-primary p-1.5 shrink-0"
              disabled={isSending || !input.trim()}
            >
              {isSending
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
