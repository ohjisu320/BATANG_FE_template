import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Box } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Spinner from '@/shared/components/Spinner'

export default function LoginPage() {
  const { login, isLoggingIn, loginError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#2563eb] flex items-center justify-center mb-3 shadow-sm">
            <Box className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#111827]">BATANG</h1>
          <p className="text-sm text-[#6b7280] mt-1">BIM 3D Authoring Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h2 className="text-base font-semibold text-[#111827] mb-5">로그인</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-medium text-[#374151] mb-1.5">
                이메일
              </label>
              <input
                id="login-email"
                type="email"
                className="input-base"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-medium text-[#374151] mb-1.5">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  className="input-base pr-10"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  id="toggle-password-visible"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-[#dc2626] bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-2">
                {(loginError as Error).message}
              </p>
            )}

            <button
              id="login-submit"
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <><Spinner size="sm" /> 로그인 중...</> : '로그인'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#e5e7eb] text-center">
            <p className="text-xs text-[#6b7280]">
              계정이 없으신가요?{' '}
              <Link to="/register" className="text-[#2563eb] font-medium hover:underline">
                회원가입
              </Link>
            </p>
          </div>

          {/* Mock 힌트 */}
          <div className="mt-4 bg-[#f8f9fa] border border-[#e5e7eb] rounded-md p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9ca3af] mb-1">테스트 계정</p>
            <p className="text-xs text-[#6b7280]"><span className="font-medium">설계자:</span> designer@batang.io</p>
            <p className="text-xs text-[#6b7280]"><span className="font-medium">고객사:</span> client@batang.io</p>
            <p className="text-xs text-[#6b7280]"><span className="font-medium">비밀번호:</span> password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
