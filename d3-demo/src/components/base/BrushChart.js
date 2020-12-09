import { useState, useRef, useEffect } from 'react'
import { select, scaleLinear, axisBottom, axisLeft, curveCardinal, line, brushX, max } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver'
import usePrevious from '../../hooks/usePrevious'

const height = 50

export default ({ data, children }) => {
  const wrapperRef = useRef(null)
  const svgRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  const [selection, setSelection] = useState([0, 4.5]);
  const prevSelection = usePrevious(selection)

  useEffect(() => {

    const svg = select(svgRef.current)
    if (!dimensions) return

    // svg.selectAll('.axis').remove()

    const { width } = dimensions || wrapperRef.current.getBoundingClientRect()

    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, width]);

    const yScale = scaleLinear().domain([0, max(data)]).range([height, 0]);

    const xAxis = axisBottom(xScale).ticks(data.length * 2).tickFormat(index => index.toFixed(1));

    const yAxis = axisLeft(yScale);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    svg.selectAll(".line")
      .data([data])
      .join('path')
      .attr("class", "line")
      .attr("d", myLine)
      .attr('stroke', 'black')
      .attr('fill', 'none')

    svg.selectAll(".myDot")
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

    const brush = brushX()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('start brush end', event => {
        if (event.selection) {
          const indexSelection = event.selection.map(xScale.invert)
          setSelection(indexSelection);
        }
      })

    if (prevSelection === selection) {
      svg
        .selectAll('.brush')
        .call(brush)
        .call(brush.move, selection.map(xScale))
    }

  }, [dimensions, data, prevSelection, selection])

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      {children(selection)}
      <svg ref={svgRef} style={{height:`${height}px`}}>
        <g className="brush" />
      </svg>
    </div>
  )
}