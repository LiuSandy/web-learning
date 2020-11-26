import { useEffect, useRef } from 'react'
import { select, hierarchy, tree, linkHorizontal } from 'd3'
import useResizeObserver from '../../hooks/useResizeObserver'


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// dimensions

export default ({ data }) => {

  const wrapperRef = useRef(null);
  const svgRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  const previouslyRenderedData = usePrevious(data)

  useEffect(() => {

    const svg = select(svgRef.current)

    if (!dimensions) return

    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect()

    const root = hierarchy(data)
    const treeLayout = tree().size([height, width])

    // linkGenerator
    const linkGenerator = linkHorizontal().x(link => link.y).y(link => link.x)

    // 填充 x y 坐标
    treeLayout(root)

    // console.log("descendants", root.descendants());
    // console.log("links", root.links());

    // 添加节点
    svg.selectAll('.node')
      .data(root.descendants())
      .join(entry => entry.append('circle').attr('opacity', 0))
      .attr('class', 'node')
      .attr('r', 4)
      .attr('cx', node => node.y)
      .attr('cy', node => node.x)
      .transition()
      .duration(500)
      .delay(node => node.depth * 300)
      .attr('opacity', 1)

    // 文字
    svg.selectAll('.label')
      .data(root.descendants())
      .join(entry => entry.append('text').attr('opacity', 0))
      .attr('class', 'label')
      .attr('y', node => node.x - 12)
      .attr('x', node => node.y)
      .attr('text-anchor', 'middle')
      .attr('font-size', 14)
      .text(node => node.data.name)
      .transition()
      .duration(500)
      .duration(500)
      .delay(node => node.depth * 300)
      .attr('opacity', 1)

    // 连线
    const enteringAndUpdatingLinks = svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke-dasharray', function () {
        const lenght = this.getTotalLength()
        return `${lenght} ${lenght}`
      })
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('opacity', 1)

    // 判断更新
    if (previouslyRenderedData !== data) {
      enteringAndUpdatingLinks
        .attr('stroke-dashoffset', function () {
          return this.getTotalLength()
        })
        .transition()
        .duration(500)
        .delay(link => link.source.depth * 300)
        .attr('stroke-dashoffset', 0)

    }



  }, [dimensions, data])

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef} />
    </div>
  )
}

