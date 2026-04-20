import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/stores/authStore'
import type { UserType } from '@/shared/types'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserType
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, token } = useAuthStore()

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.user_type !== requiredRole) {
    // CLIENT는 viewer만 접근 가능
    if (user.user_type === 'CLIENT') {
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}
