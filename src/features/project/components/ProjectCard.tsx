import { useState } from 'react'
import { MoreHorizontal, Users, Clock, Box, Trash2, Pencil, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatRelativeTime } from '@/shared/utils/format'
import type { Project } from '@/shared/types'
import type { UserType } from '@/shared/types'

interface ProjectCardProps {
  project: Project
  userType: UserType
  onDelete: (id: string) => void
  onEdit: (project: Project) => void
  onShare: (project: Project) => void
}

export default function ProjectCard({ project, userType, onDelete, onEdit, onShare }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isDesigner = userType === 'DESIGNER'

  return (
    <div className="card group relative cursor-pointer hover:shadow-md transition-all duration-200">
      {/* Thumbnail */}
      <Link to={`/projects/${project.id}`}>
        <div className="h-36 rounded-md bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center mb-3 overflow-hidden">
          <Box className="w-10 h-10 text-[#93c5fd]" />
        </div>
      </Link>

      {/* Info */}
      <div className="flex items-start justify-between gap-2">
        <Link to={`/projects/${project.id}`} className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#111827] truncate group-hover:text-[#2563eb] transition-colors">
            {project.name}
          </h3>
          <p className="text-xs text-[#6b7280] truncate mt-0.5">{project.description}</p>
        </Link>

        {/* Menu (DESIGNER only) */}
        {isDesigner && (
          <div className="relative shrink-0">
            <button
              id={`project-menu-${project.id}`}
              className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => { e.preventDefault(); setMenuOpen(!menuOpen) }}
              title="더보기"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 top-8 bg-white border border-[#e5e7eb] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-44 py-1 z-10"
                onBlur={() => setMenuOpen(false)}
              >
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#374151] hover:bg-[#f3f4f6]"
                  onClick={() => { onEdit(project); setMenuOpen(false) }}
                >
                  <Pencil className="w-4 h-4" /> 수정
                </button>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#374151] hover:bg-[#f3f4f6]"
                  onClick={() => { onShare(project); setMenuOpen(false) }}
                >
                  <UserPlus className="w-4 h-4" /> 공유 초대
                </button>
                <hr className="my-1 border-[#e5e7eb]" />
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#dc2626] hover:bg-[#fef2f2]"
                  onClick={() => { onDelete(project.id); setMenuOpen(false) }}
                >
                  <Trash2 className="w-4 h-4" /> 삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mt-2.5">
        <span className="flex items-center gap-1 text-[11px] text-[#9ca3af]">
          <Users className="w-3 h-3" /> {project.member_count}명
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[#9ca3af]">
          <Clock className="w-3 h-3" /> {formatRelativeTime(project.updated_at)}
        </span>
        {project.ifc_uploaded && (
          <span className="badge badge-success">IFC</span>
        )}
      </div>
    </div>
  )
}
