import { useRef, useState, useEffect } from 'react'
import { select, scaleLinear, scaleBand, axisBottom, axisLeft } from 'd3'

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

const defaultData = [19, 40, 25, 78, 36]

const Index = () => {

  const [data, setData] = useState(defaultData);
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)

    svg.selectAll('.axis').remove()
    // svgRef.current.innerHTML = ""

    const xScale = scaleBand().domain(data.map((v, i) => i)).range([0, innerWidth]).padding(0.5);

    const yScale = scaleLinear().domain([0, innerHeight]).range([innerHeight, 0]);

    const colorSCale = scaleLinear().domain([Math.min(...data), innerHeight]).range(['green', 'red']).clamp(true)

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);

    const yAxis = axisLeft(yScale);

    svg
      // .select('.x-axis')
      .append('g')
      .attr('class', 'axis')
      .style('transform', `translateY(${innerHeight}px)`)
      .call(xAxis)

    svg
      // .select(".y-axis")
      .append('g')
      .attr('class', 'axis')
      .call(yAxis);

    svg.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1,-1)')
      .attr('x', (value, index) => xScale(index))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function(e, value) {
        const index = svg.selectAll(".bar").nodes().indexOf(this);
        svg.selectAll('.tooltip')
          .data([value])
          .join(enter => enter.append('text').attr('y', yScale(value) - 4))
          .attr('class', 'tooltip')
          .text(value)
          // .attr('x',e.offsetX)
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('y', yScale(value) - 4)
          .attr('opacity', 1)
      })
      .on("mouseleave", () => svg.select('.tooltip').remove())
      .attr('y', -innerHeight)
      .transition()
      .attr('fill', colorSCale)
      .attr('height', v => innerHeight - yScale(v))
      

  }, [data])

  return (
    <>
      <svg ref={svgRef} style={svgStyle} />

      <br /><br />
      <button onClick={() => setData([...data.map(item => item * 2)])}>updata Data</button>
      <br /><br />
      <button onClick={() => setData([...defaultData])}>reset Data</button>
      <br /><br />
      <button onClick={() => {
        const randomData = Math.random() * innerHeight;
        data.push(Math.round(randomData))
        setData([...data])
      }}>Add Data</button>
    </>
  )

}

export default Index