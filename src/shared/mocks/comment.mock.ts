import type { Pin, Comment } from '@/shared/types'

export const MOCK_PINS: Pin[] = [
  {
    id: 'pin-1',
    project_id: 'mock-project-1',
    type: '2d',
    position: { x: 120, y: 80 },
    storey_id: 'storey-1',
    resolved: false,
    created_by: 'mock-user-2',
    created_at: '2025-04-08T10:00:00Z',
    comment_count: 2,
  },
  {
    id: 'pin-2',
    project_id: 'mock-project-1',
    type: '3d',
    position: { x: 5.2, y: 1.5, z: 3.1 },
    resolved: true,
    created_by: 'mock-user-2',
    created_at: '2025-04-06T09:00:00Z',
    comment_count: 3,
  },
  {
    id: 'pin-3',
    project_id: 'mock-project-1',
    type: '2d',
    position: { x: 300, y: 180 },
    storey_id: 'storey-2',
    resolved: false,
    created_by: 'mock-user-1',
    created_at: '2025-04-10T14:00:00Z',
    comment_count: 1,
  },
]

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    pin_id: 'pin-1',
    content: '이 부분 창문 크기가 너무 작은 것 같습니다. 최소 1500mm는 되어야 할 것 같아요.',
    author: {
      id: 'mock-user-2',
      email: 'client@batang.io',
      name: '이건축주',
      user_type: 'CLIENT',
      created_at: '2025-01-05T00:00:00Z',
    },
    created_at: '2025-04-08T10:05:00Z',
    updated_at: '2025-04-08T10:05:00Z',
    resolved: false,
  },
  {
    id: 'comment-2',
    pin_id: 'pin-1',
    content: '확인했습니다. 다음 버전에서 1500x1200으로 수정하겠습니다.',
    author: {
      id: 'mock-user-1',
      email: 'designer@batang.io',
      name: '김설계',
      user_type: 'DESIGNER',
      created_at: '2025-01-01T00:00:00Z',
    },
    created_at: '2025-04-08T11:00:00Z',
    updated_at: '2025-04-08T11:00:00Z',
    resolved: false,
  },
]
