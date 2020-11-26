import { useEffect, useRef } from 'react'
import { select, scaleBand, scaleLinear, max } from 'd3'
import useResizeObserver from '../../hooks/useResizeObserver'

const Index = ({ data }) => {

  const wrapperRef = useRef(null)
  const svgRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return

    data.sort((a, b) => b.value - a.value)
    console.log("data", data);

    const yScale = scaleBand().padding(0.1).domain(data.map((v, i) => i)).range([0, dimensions.height])

    const xScale = scaleLinear().domain([0, max(data, entry => entry.value)]).range([0, dimensions.width])

    svg.selectAll('.bar')
      .data(data, entry => entry.name)
      .join(entry => entry.append('rect').attr('y', (entry, index) => yScale(index)))
      .attr('class', 'bar')
      .attr('fill', entry => entry.color)
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .attr('y', (entry, index) => yScale(index))
      .attr('width', entry => xScale(entry.value))

    svg.selectAll('.label')
      .data(data, entry => entry.name)
      .join(entry => entry.append('text').attr('y', (entry, index) => yScale(index)))
      .attr('class', 'label')
      .text(entry => `🐴...${entry.name} (${entry.value} meters)`)
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);


  }, [dimensions, data])


  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef} />
    </div>
  )

}

export default Index