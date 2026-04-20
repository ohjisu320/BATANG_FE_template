import { create } from 'zustand'
import { produce } from 'immer'
import type { ChatMessage, ChatStatus } from '@/shared/types'

interface ChatStore {
  messages: ChatMessage[]
  addMessage: (msg: ChatMessage) => void
  updateLastMessageStatus: (status: ChatStatus, content?: string) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatStore>()((set) => ({
  messages: [],
  addMessage: (msg) =>
    set(produce<ChatStore>((draft) => { draft.messages.push(msg) })),
  updateLastMessageStatus: (status, content) =>
    set(produce<ChatStore>((draft) => {
      const last = draft.messages[draft.messages.length - 1]
      if (last) {
        last.status = status
        if (content) last.content = content
      }
    })),
  clearMessages: () =>
    set(produce<ChatStore>((draft) => { draft.messages = [] })),
}))
