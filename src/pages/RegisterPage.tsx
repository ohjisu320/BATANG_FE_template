import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/services/auth.service'
import Spinner from '@/shared/components/Spinner'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    user_type: 'DESIGNER' as 'DESIGNER' | 'CLIENT',
  })
  const [validationError, setValidationError] = useState('')

  const mutation = useMutation({
    mutationFn: () => authService.register({
      name: form.name,
      email: form.email,
      password: form.password,
      user_type: form.user_type,
    }),
    onSuccess: () => navigate('/login'),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')
    if (form.password !== form.passwordConfirm) {
      setValidationError('비밀번호가 일치하지 않습니다.')
      return
    }
    mutation.mutate()
  }

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

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

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h2 className="text-base font-semibold text-[#111827] mb-5">회원가입</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-xs font-medium text-[#374151] mb-1.5">이름</label>
              <input id="reg-name" type="text" className="input-base" placeholder="홍길동" value={form.name} onChange={update('name')} required />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-xs font-medium text-[#374151] mb-1.5">이메일</label>
              <input id="reg-email" type="email" className="input-base" placeholder="name@company.com" value={form.email} onChange={update('email')} required />
            </div>
            <div>
              <label htmlFor="reg-password" className="block text-xs font-medium text-[#374151] mb-1.5">비밀번호</label>
              <input id="reg-password" type="password" className="input-base" placeholder="8자 이상" value={form.password} onChange={update('password')} required minLength={8} />
            </div>
            <div>
              <label htmlFor="reg-pw-confirm" className="block text-xs font-medium text-[#374151] mb-1.5">비밀번호 확인</label>
              <input id="reg-pw-confirm" type="password" className="input-base" placeholder="비밀번호 재입력" value={form.passwordConfirm} onChange={update('passwordConfirm')} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-2">사용자 유형</label>
              <div className="grid grid-cols-2 gap-2">
                {(['DESIGNER', 'CLIENT'] as const).map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                      form.user_type === type
                        ? 'border-[#2563eb] bg-[#eff6ff]'
                        : 'border-[#e5e7eb] hover:bg-[#f9fafb]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="user_type"
                      value={type}
                      checked={form.user_type === type}
                      onChange={() => setForm((p) => ({ ...p, user_type: type }))}
                      className="sr-only"
                    />
                    <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${form.user_type === type ? 'border-[#2563eb]' : 'border-[#d1d5db]'}`}>
                      {form.user_type === type && <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />}
                    </div>
                    <span className="text-sm font-medium text-[#374151]">
                      {type === 'DESIGNER' ? '설계자' : '고객사'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {(validationError || mutation.error) && (
              <p className="text-xs text-[#dc2626] bg-[#fef2f2] border border-[#fecaca] rounded-md px-3 py-2">
                {validationError || (mutation.error as Error)?.message}
              </p>
            )}

            <button
              id="register-submit"
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <><Spinner size="sm" /> 가입 중...</> : '회원가입'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#e5e7eb] text-center">
            <p className="text-xs text-[#6b7280]">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-[#2563eb] font-medium hover:underline">로그인</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
