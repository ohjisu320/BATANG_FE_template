import { create } from 'zustand'
import { produce } from 'immer'
import type { Notification } from '@/shared/types'

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (n: Notification) => void
  markAllRead: () => void
  clearNotifications: () => void
}

export const useNotificationStore = create<NotificationStore>()((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (n) =>
    set(produce<NotificationStore>((draft) => {
      draft.notifications.unshift(n)
      if (!n.read) draft.unreadCount++
    })),
  markAllRead: () =>
    set(produce<NotificationStore>((draft) => {
      draft.notifications.forEach((n) => { n.read = true })
      draft.unreadCount = 0
    })),
  clearNotifications: () =>
    set(produce<NotificationStore>((draft) => {
      draft.notifications = []
      draft.unreadCount = 0
    })),
}))
