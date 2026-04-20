import { useEffect, useRef, useCallback } from 'react'
import * as OBC from '@thatopen/components'
import * as OBCF from '@thatopen/components-front'
import { useViewerStore } from '@/shared/stores/viewerStore'
import { viewerService } from '@/features/viewer/services/viewer.service'
// Vite ?url import so the worker is available as a URL string
import fragmentsWorkerUrl from '@thatopen/fragments/worker?url'

export const useBIMModel = (
  containerRef: React.RefObject<HTMLDivElement>,
  projectId: string,
) => {
  const componentsRef = useRef<OBC.Components | null>(null)
  const worldRef = useRef<OBC.World | null>(null)
  const { setSelectedElement } = useViewerStore()

  useEffect(() => {
    if (!containerRef.current || !projectId) return
    const container = containerRef.current

    const components = new OBC.Components()
    componentsRef.current = components

    // World
    const worlds = components.get(OBC.Worlds)
    const world = worlds.create<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>()
    worldRef.current = world

    world.scene = new OBC.SimpleScene(components)
    world.camera = new OBC.SimpleCamera(components)
    world.renderer = new OBC.SimpleRenderer(components, container)

    components.init()

    // Lights / background
    const scene = world.scene as OBC.SimpleScene
    if (typeof scene.setup === 'function') scene.setup()

    // Grid
    const grids = components.get(OBC.Grids)
    grids.create(world)

    // FragmentsManager — init with worker URL
    const fragments = components.get(OBC.FragmentsManager)
    fragments.init(fragmentsWorkerUrl)

    // IfcLoader + Highlighter (async)
    const ifcLoader = components.get(OBC.IfcLoader)

    const init = async () => {
      await ifcLoader.setup({
        autoSetWasm: false,
        wasm: { path: '/wasm/', absolute: true },
      })

      const highlighter = components.get(OBCF.Highlighter)
      await highlighter.setup({ world })

      highlighter.events.select.onHighlight.add((fragMap: OBC.ModelIdMap) => {
        for (const [, expressIDs] of Object.entries(fragMap)) {
          const first = [...expressIDs][0]
          if (first !== undefined) {
            setSelectedElement(first, { expressID: first })
          }
          break
        }
      })

      highlighter.events.select.onClear.add(() => {
        setSelectedElement(null, null)
      })

      const arrayBuffer = await viewerService.getModel(projectId)
      if (arrayBuffer) {
        const model = await ifcLoader.load(new Uint8Array(arrayBuffer), true, projectId)
        world.scene.three.add(model.object)
      }
    }

    void init()

    // WebSocket model reload events
    const handleModelUpdate = () => {
      viewerService.getModel(projectId).then((ab) => {
        if (!ab) return
        fragments.dispose()
        ifcLoader.load(new Uint8Array(ab), true, projectId).then((model) => {
          world.scene.three.add(model.object)
        })
      })
    }

    window.addEventListener('bim-model-update', handleModelUpdate)
    window.addEventListener('bim-model-reset', handleModelUpdate)

    return () => {
      window.removeEventListener('bim-model-update', handleModelUpdate)
      window.removeEventListener('bim-model-reset', handleModelUpdate)
      components.dispose()
      componentsRef.current = null
      worldRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  const takeScreenshot = useCallback((): string | null => {
    const renderer = worldRef.current?.renderer as OBC.SimpleRenderer | undefined
    return renderer?.three?.domElement?.toDataURL('image/png') ?? null
  }, [])

  return { takeScreenshot }
}
