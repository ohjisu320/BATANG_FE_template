import { create } from 'zustand'
import { produce } from 'immer'
import type {
  AuthoringTool,
  ElementProperties,
  PresenceState,
  LockState,
  PreviewState,
  AuthoringOperation,
} from '@/shared/types'

interface AuthoringDraft {
  tool: AuthoringTool | null
  pendingOperation: AuthoringOperation | null
}

interface ViewerStore {
  // 선택된 요소
  selectedElementId: number | null
  selectedElementProperties: ElementProperties | null
  // 모델 버전
  modelRevision: number
  // 활성 도구
  activeTool: AuthoringTool
  // 층 (storey)
  activeStoreyGuid: string | null
  // 실시간 협업
  presence: PresenceState[]
  locks: LockState[]
  previews: PreviewState[]
  // 편집 세션
  authoringDraft: AuthoringDraft

  // Actions
  setSelectedElement: (id: number | null, props?: ElementProperties | null) => void
  setModelRevision: (rev: number) => void
  setActiveTool: (tool: AuthoringTool) => void
  setActiveStoreyGuid: (guid: string | null) => void
  setPresence: (presence: PresenceState[]) => void
  setLocks: (locks: LockState[]) => void
  setPreviews: (previews: PreviewState[]) => void
  setAuthoringDraft: (draft: Partial<AuthoringDraft>) => void
  resetAuthoringDraft: () => void
}

export const useViewerStore = create<ViewerStore>()((set) => ({
  selectedElementId: null,
  selectedElementProperties: null,
  modelRevision: 0,
  activeTool: 'select',
  activeStoreyGuid: null,
  presence: [],
  locks: [],
  previews: [],
  authoringDraft: { tool: null, pendingOperation: null },

  setSelectedElement: (id, props) =>
    set(produce<ViewerStore>((draft) => {
      draft.selectedElementId = id
      draft.selectedElementProperties = props ?? null
    })),
  setModelRevision: (rev) =>
    set(produce<ViewerStore>((draft) => { draft.modelRevision = rev })),
  setActiveTool: (tool) =>
    set(produce<ViewerStore>((draft) => { draft.activeTool = tool })),
  setActiveStoreyGuid: (guid) =>
    set(produce<ViewerStore>((draft) => { draft.activeStoreyGuid = guid })),
  setPresence: (presence) =>
    set(produce<ViewerStore>((draft) => { draft.presence = presence })),
  setLocks: (locks) =>
    set(produce<ViewerStore>((draft) => { draft.locks = locks })),
  setPreviews: (previews) =>
    set(produce<ViewerStore>((draft) => { draft.previews = previews })),
  setAuthoringDraft: (d) =>
    set(produce<ViewerStore>((draft) => {
      Object.assign(draft.authoringDraft, d)
    })),
  resetAuthoringDraft: () =>
    set(produce<ViewerStore>((draft) => {
      draft.authoringDraft = { tool: null, pendingOperation: null }
    })),
}))
