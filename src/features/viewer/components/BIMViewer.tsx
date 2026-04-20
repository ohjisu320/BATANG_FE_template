import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useBIMModel } from '@/features/viewer/hooks/useBIMModel'

export interface BIMViewerHandle {
  takeScreenshot: () => string | null
}

interface BIMViewerProps {
  projectId: string
}

const BIMViewer = forwardRef<BIMViewerHandle, BIMViewerProps>(
  ({ projectId }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { takeScreenshot } = useBIMModel(containerRef, projectId)

    useImperativeHandle(ref, () => ({ takeScreenshot }), [takeScreenshot])

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      />
    )
  },
)

BIMViewer.displayName = 'BIMViewer'
export default BIMViewer
