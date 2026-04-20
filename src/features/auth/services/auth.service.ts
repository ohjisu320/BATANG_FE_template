import { mockLogin, mockRegister, mockGetMe } from '@/features/auth/mocks/auth.mock'
// import { api } from '@/shared/lib/axios'  // API 완성 후 주석 해제

import type { User } from '@/shared/types'

interface LoginDto { email: string; password: string }
interface RegisterDto { email: string; password: string; name: string; user_type: 'DESIGNER' | 'CLIENT' }

export const authService = {
  login: async (data: LoginDto) => {
    return mockLogin(data.email, data.password)
    // return api.post<{ access_token: string; user: User }>('/auth/login', data).then(r => r.data)
  },

  register: async (data: RegisterDto): Promise<User> => {
    return mockRegister(data)
    // return api.post<User>('/auth/register', data).then(r => r.data)
  },

  logout: async () => {
    await new Promise((r) => setTimeout(r, 100))
    // return api.post('/auth/logout')
  },

  getMe: async (token: string): Promise<User> => {
    return mockGetMe(token)
    // return api.get<User>('/auth/me').then(r => r.data)
  },
}
