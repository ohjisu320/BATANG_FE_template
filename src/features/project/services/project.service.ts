import { MOCK_PROJECTS, MOCK_MEMBERS } from '@/features/project/mocks/project.mock'
// import { api } from '@/shared/lib/axios'  // API 완성 후 주석 해제

import type { Project, ProjectMember, CreateProjectDto, UpdateProjectDto } from '@/shared/types'

let projects = [...MOCK_PROJECTS]

export const projectService = {
  getList: async (): Promise<Project[]> => {
    await new Promise((r) => setTimeout(r, 300))
    return projects
    // return api.get<Project[]>('/projects').then(r => r.data)
  },

  getById: async (id: string): Promise<Project> => {
    await new Promise((r) => setTimeout(r, 200))
    const p = projects.find((p) => p.id === id)
    if (!p) throw new Error('프로젝트를 찾을 수 없습니다.')
    return p
    // return api.get<Project>(`/projects/${id}`).then(r => r.data)
  },

  create: async (data: CreateProjectDto): Promise<Project> => {
    await new Promise((r) => setTimeout(r, 400))
    const newProject: Project = {
      id: `mock-project-${Date.now()}`,
      ...data,
      owner_id: 'mock-user-1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      member_count: 1,
      ifc_uploaded: false,
    }
    projects = [newProject, ...projects]
    return newProject
    // return api.post<Project>('/projects', data).then(r => r.data)
  },

  update: async (id: string, data: UpdateProjectDto): Promise<Project> => {
    await new Promise((r) => setTimeout(r, 300))
    const idx = projects.findIndex((p) => p.id === id)
    if (idx < 0) throw new Error('프로젝트를 찾을 수 없습니다.')
    projects[idx] = { ...projects[idx], ...data, updated_at: new Date().toISOString() }
    return projects[idx]
    // return api.put<Project>(`/projects/${id}`, data).then(r => r.data)
  },

  delete: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300))
    projects = projects.filter((p) => p.id !== id)
    // return api.delete(`/projects/${id}`)
  },

  invite: async (projectId: string, email: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 400))
    console.log(`[mock] Invited ${email} to project ${projectId}`)
    // return api.post(`/projects/${projectId}/invite`, { email })
  },

  getMembers: async (projectId: string): Promise<ProjectMember[]> => {
    await new Promise((r) => setTimeout(r, 200))
    return MOCK_MEMBERS.filter(() => true) // mock: 모두 반환
    // return api.get<ProjectMember[]>(`/projects/${projectId}/members`).then(r => r.data)
  },
}
