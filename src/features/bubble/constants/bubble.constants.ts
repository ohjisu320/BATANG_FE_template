// ──────────────────────────────────────────
// Zone 색상
// ──────────────────────────────────────────
export const ZONE_COLORS: Record<string, string> = {
  public:  '#3b82f6',
  service: '#10b981',
  private: '#f59e0b',
  utility: '#8b5cf6',
}

export const ZONE_LABELS: Record<string, string> = {
  public:  '공용',
  service: '서비스',
  private: '개인',
  utility: '설비',
}

// ──────────────────────────────────────────
// D3 시뮬레이션 파라미터
// ──────────────────────────────────────────
export const BUBBLE_SIMULATION = {
  chargeStrength: -150,
  radiusScale: 1.8,       // Math.sqrt(area) * radiusScale
  radiusPadding: 10,
  alphaTarget: 0.3,
} as const

// ──────────────────────────────────────────
// FloatingPanel 기본 레이아웃 위치
// ──────────────────────────────────────────
export const BUBBLE_PANEL_LAYOUT = {
  legend: {
    defaultPosition: { x: 12, y: 12 },
    defaultSize: { width: 180, height: 200 },
  },
  nodeList: {
    defaultPosition: { x: 12, y: 224 },
    defaultSize: { width: 180, height: 340 },
  },
} as const
