import { useState } from 'react'
import Modal from '@/shared/components/Modal'
import Spinner from '@/shared/components/Spinner'
import { UserPlus, Check } from 'lucide-react'
import type { Project } from '@/shared/types'

interface ProjectShareModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  onInvite: (email: string) => Promise<void>
}

export default function ProjectShareModal({ isOpen, onClose, project, onInvite }: ProjectShareModalProps) {
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsPending(true)
    try {
      await onInvite(email)
      setSuccess(true)
      setEmail('')
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="프로젝트 공유">
      {project && (
        <div className="mb-4 bg-[#f8f9fa] rounded-md px-3 py-2">
          <p className="text-xs text-[#6b7280]">프로젝트</p>
          <p className="text-sm font-medium text-[#111827]">{project.name}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="invite-email" className="block text-xs font-medium text-[#374151] mb-1.5">
            초대할 이메일 (CLIENT)
          </label>
          <div className="flex gap-2">
            <input
              id="invite-email"
              type="email"
              className="input-base flex-1"
              placeholder="client@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              id="invite-submit"
              type="submit"
              className="btn-primary flex items-center gap-1.5 shrink-0"
              disabled={isPending}
            >
              {isPending ? <Spinner size="sm" /> : success ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {success ? '완료' : '초대'}
            </button>
          </div>
        </div>
        {error && <p className="text-xs text-[#dc2626]">{error}</p>}
      </form>

      <p className="text-xs text-[#9ca3af] mt-4">
        초대받은 CLIENT는 3D 뷰어 조회 및 댓글 작성이 가능합니다.
      </p>
    </Modal>
  )
}
