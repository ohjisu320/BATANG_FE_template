import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ProtectedRoute from '@/shared/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectMainLayout from '@/pages/ProjectMainLayout'
import ViewerPage from '@/pages/ViewerPage'
import FloorPage from '@/pages/FloorPage'
import BubblePage from '@/pages/BubblePage'

// Three.js 중복 import 경고 억제
const originalWarn = console.warn.bind(console)
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.')) return
  originalWarn(...args)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5분
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected: 프로젝트 목록 (DESIGNER) */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />

          {/* Protected: 프로젝트 내부 */}
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectMainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="viewer" replace />} />
            <Route path="viewer" element={<ViewerPage />} />
            <Route path="floor" element={<FloorPage />} />
            <Route path="bubble" element={<BubblePage />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      {/* DevTools — 개발 환경에서만 */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
