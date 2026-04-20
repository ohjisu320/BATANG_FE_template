import type { User } from '@/shared/types'

export const MOCK_USERS: User[] = [
  {
    id: 'mock-user-1',
    email: 'designer@batang.io',
    name: '김설계',
    user_type: 'DESIGNER',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'mock-user-2',
    email: 'client@batang.io',
    name: '이건축주',
    user_type: 'CLIENT',
    created_at: '2025-01-05T00:00:00Z',
  },
]

// 로컬 스토리지 기반 간단한 user DB (mock)
const MOCK_PASSWORD = 'password123'

export const mockLogin = async (email: string, password: string) => {
  await new Promise((r) => setTimeout(r, 500))
  if (password !== MOCK_PASSWORD) throw new Error('비밀번호가 올바르지 않습니다.')
  const user = MOCK_USERS.find((u) => u.email === email)
  if (!user) throw new Error('존재하지 않는 이메일입니다.')
  return {
    access_token: `mock-token-${user.id}`,
    user,
  }
}

export const mockRegister = async (data: {
  email: string
  password: string
  name: string
  user_type: 'DESIGNER' | 'CLIENT'
}) => {
  await new Promise((r) => setTimeout(r, 500))
  const newUser: User = {
    id: `mock-user-${Date.now()}`,
    email: data.email,
    name: data.name,
    user_type: data.user_type,
    created_at: new Date().toISOString(),
  }
  return newUser
}

export const mockGetMe = async (token: string): Promise<User> => {
  await new Promise((r) => setTimeout(r, 200))
  const userId = token.replace('mock-token-', '')
  const user = MOCK_USERS.find((u) => u.id === userId)
  if (!user) throw new Error('401')
  return user
}
