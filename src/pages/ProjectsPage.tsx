import { useState } from 'react'
import { Plus, Box, Bell, LogOut, Search, FolderOpen } from 'lucide-react'
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject, useInviteToProject } from '@/features/project/hooks/useProjects'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ProjectCard from '@/features/project/components/ProjectCard'
import ProjectCreateModal from '@/features/project/components/ProjectCreateModal'
import ProjectShareModal from '@/features/project/components/ProjectShareModal'
import EmptyState from '@/shared/components/EmptyState'
import Spinner from '@/shared/components/Spinner'
import type { Project } from '@/shared/types'

export default function ProjectsPage() {
  const { user, logout } = useAuth()
  const { data: projects, isLoading } = useProjects()
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()
  const deleteProject = useDeleteProject()
  const inviteToProject = useInviteToProject()

  const [createOpen, setCreateOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [shareProject, setShareProject] = useState<Project | null>(null)
  const [search, setSearch] = useState('')

  const filteredProjects = projects?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  const isDesigner = user?.user_type === 'DESIGNER'

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Nav */}
      <header className="h-14 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center">
            <Box className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-[#111827] text-sm">BATANG</span>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9ca3af]" />
          <input
            id="project-search"
            type="text"
            className="input-base pl-8 py-1.5 text-xs"
            placeholder="프로젝트 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <button id="notification-btn" className="btn-icon" title="알림">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-xs font-medium" title={user?.name}>
            {user?.name?.[0] ?? 'U'}
          </div>
          <button id="logout-btn" className="btn-icon" title="로그아웃" onClick={() => logout()}>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">프로젝트</h1>
            <p className="text-sm text-[#6b7280] mt-0.5">
              안녕하세요, {user?.name}님. {isDesigner ? '설계자' : '고객사'} 계정입니다.
            </p>
          </div>
          {isDesigner && (
            <button
              id="create-project-btn"
              className="btn-primary flex items-center gap-1.5"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="w-4 h-4" /> 새 프로젝트
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title={search ? '검색 결과가 없습니다' : '프로젝트가 없습니다'}
            description={search ? '다른 검색어를 시도해보세요.' : '새 프로젝트를 만들어 시작하세요.'}
            action={isDesigner && !search ? { label: '새 프로젝트 만들기', onClick: () => setCreateOpen(true) } : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                userType={user?.user_type ?? 'CLIENT'}
                onDelete={(id) => deleteProject.mutate(id)}
                onEdit={(p) => setEditProject(p)}
                onShare={(p) => setShareProject(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <ProjectCreateModal
        isOpen={createOpen || !!editProject}
        onClose={() => { setCreateOpen(false); setEditProject(null) }}
        onSubmit={({ name, description }) => {
          if (editProject) {
            updateProject.mutate({ id: editProject.id, data: { name, description } },
              { onSuccess: () => setEditProject(null) })
          } else {
            createProject.mutate({ name, description }, { onSuccess: () => setCreateOpen(false) })
          }
        }}
        isPending={createProject.isPending || updateProject.isPending}
        editProject={editProject}
      />

      <ProjectShareModal
        isOpen={!!shareProject}
        onClose={() => setShareProject(null)}
        project={shareProject}
        onInvite={(email) => inviteToProject.mutateAsync({ projectId: shareProject!.id, email })}
      />
    </div>
  )
}
