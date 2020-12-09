import { useRef, useEffect } from 'react'
import { select, scaleLinear, axisBottom, axisLeft, curveCardinal, line, max } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver'

export default ({ data, selection }) => {
  const wrapperRef = useRef(null)
  const svgRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {

    const svg = select(svgRef.current)
    const svgContent = svg.select('.content')
    if (!dimensions) return

    // svg.selectAll('.axis').remove()

    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect()

    const xScale = scaleLinear().domain(selection).range([0, width]);

    const yScale = scaleLinear().domain([0, max(data)]).range([height - 10, 10]);

    const xAxis = axisBottom(xScale).ticks(data.length / 2);

    const yAxis = axisLeft(yScale);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    svgContent.selectAll(".line")
      .data([data])
      .join('path')
      .attr("class", "line")
      .attr("d", myLine)
      .attr('stroke', 'black')
      .attr('fill', 'none')

    svgContent.selectAll(".myDot")
      .data(data)
      .join('circle')
      .attr('class', 'myDot')
      .attr('r', (v, i) => i >= selection[0] && i <= selection[1] ? 4 : 2)
      .attr('fill', (v, i) => i >= selection[0] && i <= selection[1] ? 'orange' : 'black')
      .attr('stroke', 'black')
      .attr('cx', (v, i) => xScale(i))
      .attr('cy', yScale)

    // svg
    //   .selectAll('.x-axis')
    //   .data(data)
    //   .join('g')
    //   .attr('class', 'x-axis')
    //   .style('transform', `translateY(${height}px)`)
    //   .call(xAxis);

    // svg
    //   .selectAll('.y-axis')
    //   .data(data)
    //   .join('g')
    //   .attr('class', 'y-axis')
    //   .call(yAxis);

    svg.select('.x-axis').style('transform', `translateY(${height}px)`).call(xAxis)
    svg.select('.y-axis').call(yAxis)

  }, [dimensions, data, selection])

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <svg ref={svgRef} >
        <defs>
          <clipPath id="myClipPath">
            <rect x="0" y="0" width="100%" height="100%" />
          </clipPath>
        </defs>
        <g className="content" clipPath="url(#myClipPath)"></g>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}