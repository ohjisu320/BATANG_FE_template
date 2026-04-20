import { useState } from 'react'
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom'
import {
  Box, ChevronRight, Bell, Share2, ChevronDown,
  Layers, LayoutGrid, Circle, MessageSquare, Settings,
  Save, Undo2, Redo2
} from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useProject } from '@/features/project/hooks/useProjects'
import { useViewerStore } from '@/shared/stores/viewerStore'
import { useNotificationStore } from '@/shared/stores/notificationStore'
import { viewerService } from '@/features/viewer/services/viewer.service'

type ViewTab = 'bubble' | 'floor' | 'viewer'

const tabs: { id: ViewTab; label: string; icon: typeof Box }[] = [
  { id: 'bubble', label: '버블', icon: Circle },
  { id: 'floor', label: '평면도', icon: LayoutGrid },
  { id: 'viewer', label: '3D', icon: Layers },
]

export default function ProjectMainLayout() {
  const { id: projectId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: project } = useProject(projectId!)
  const { modelRevision } = useViewerStore()
  const { unreadCount } = useNotificationStore()
  const [saving, setSaving] = useState(false)

  const isDesigner = user?.user_type === 'DESIGNER'

  const currentTab = (): ViewTab => {
    const path = window.location.pathname
    if (path.includes('/bubble')) return 'bubble'
    if (path.includes('/floor')) return 'floor'
    return 'viewer'
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await viewerService.save(projectId!)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* ===== TOP NAV ===== */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-[#e5e7eb] bg-white shrink-0 z-50">
        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">
          <Link to="/projects" className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center shrink-0">
            <Box className="w-4 h-4 text-white" />
          </Link>
          <Link to="/projects" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors hidden sm:block">
            프로젝트
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#d1d5db] hidden sm:block" />
          <span className="text-sm font-medium text-[#111827] truncate max-w-[160px]">
            {project?.name ?? '...'}
          </span>
        </div>

        {/* Center: Tabs */}
        <nav className="flex items-center gap-0.5 bg-[#f3f4f6] rounded-lg p-0.5">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = currentTab() === id
            return (
              <button
                key={id}
                id={`tab-${id}`}
                onClick={() => navigate(`/projects/${projectId}/${id}`)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6b7280] hover:text-[#374151]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            )
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          {isDesigner && (
            <>
              <button
                id="undo-btn"
                className="btn-icon"
                title="실행 취소 (Ctrl+Z)"
                onClick={() => viewerService.undo(projectId!)}
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                id="redo-btn"
                className="btn-icon"
                title="다시 실행 (Ctrl+Shift+Z)"
                onClick={() => viewerService.redo(projectId!)}
              >
                <Redo2 className="w-4 h-4" />
              </button>
              <button
                id="save-btn"
                className="btn-secondary flex items-center gap-1.5 text-xs px-3 py-1.5"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-3.5 h-3.5" />
                {saving ? '저장 중...' : '저장'}
              </button>
            </>
          )}
          <button id="share-btn" className="btn-secondary flex items-center gap-1.5 text-xs px-3 py-1.5">
            <Share2 className="w-3.5 h-3.5" /> 공유
          </button>
          <div className="relative">
            <button id="notification-btn" className="btn-icon relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#dc2626] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-xs font-medium">
              {user?.name?.[0] ?? 'U'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#9ca3af]" />
          </div>
        </div>
      </header>

      {/* ===== BODY ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Icon Sidebar */}
        <aside className="w-10 bg-[#f8f9fa] border-r border-[#e5e7eb] flex flex-col items-center py-2 shrink-0 gap-1">
          {isDesigner && (
            <>
              <button className="sidebar-icon active" title="도구">
                <Settings className="w-4 h-4" />
              </button>
              <button className="sidebar-icon" title="댓글">
                <MessageSquare className="w-4 h-4" />
              </button>
            </>
          )}
          {!isDesigner && (
            <button className="sidebar-icon" title="댓글">
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
        </aside>

        {/* Page Content (Outlet) */}
        <div className="flex flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
