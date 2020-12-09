import { useRef, useState, useEffect } from 'react'
import { select, curveCardinal, line, scaleLinear, axisBottom, axisLeft } from 'd3'

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
const dx = 10;
const dy = 159;
const margin = { top: 120, right: 120, bottom: 120, left: 120 }

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const svgStyle = {
  width: innerWidth,
  height: innerHeight
}

const Index = () => {

  const [data, setData] = useState([190, 400, 253, 78, 368]);
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)

    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, innerWidth]);

    const yScale = scaleLinear().domain([0, innerHeight]).range([innerHeight, 0]);

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);

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
      .attr('stroke', 'blue')
      .attr('fill', 'none')

    svg
      .append('g')
      .attr('class', 'x-axis')
      .style('transform', `translateY(${innerHeight}px)`)
      .call(xAxis);

    svg
      .append("g")
      .attr('class', 'y-axis')
      .call(yAxis);

  }, [data])

  return (
    <>
      <svg ref={svgRef} style={svgStyle} >
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
      <br /><br />
      <button onClick={() => setData(data.map(item => item * 2))}>updata Data</button>
    </>
  )

}

export default Index