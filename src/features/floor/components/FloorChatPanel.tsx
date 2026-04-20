import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface FloorChatPanelProps {
  onSend: (text: string) => void
  isSending: boolean
}

/** 평면도 LLM 수정 채팅 */
export default function FloorChatPanel({ onSend, isSending }: FloorChatPanelProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSending) return
    onSend(input.trim())
    setInput('')
  }

  return (
    <div className="p-2">
      <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide mb-2">
        LLM 평면도 수정
      </p>
      <form onSubmit={handleSubmit} className="flex gap-1.5">
        <input
          id="floor-chat-input"
          type="text"
          className="input-base flex-1 text-xs py-1.5"
          placeholder='"거실 넓혀줘"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
        />
        <button
          type="submit"
          className="btn-primary p-1.5 shrink-0"
          disabled={isSending || !input.trim()}
        >
          {isSending
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Send className="w-3.5 h-3.5" />}
        </button>
      </form>
    </div>
  )
}
