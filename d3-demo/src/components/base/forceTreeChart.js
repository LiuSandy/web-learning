import { hierarchy, select,tree } from 'd3'
import { useRef } from 'react'
import useResizeObserver from '../../hooks/useResizeObserver'

export default ({ data }) => {

  const wrapperRef = useRef(null)
  const svgRef = useRef(null)
  const dimensions = useResizeObserver()

  useEffect(() => {
    const svg = select(svgRef.current)
    if (!dimensions) return

    const root = hierarchy(data)
    const nodeData = root.descendants()
    const linkData = root.links()


  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <svg ref={svgRef} />
    </div>
  )
}