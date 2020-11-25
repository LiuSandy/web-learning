import { useRef, useState, useEffect } from 'react'
import { select } from 'd3'

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
const dx = 10;
const dy = 159;
const margin = { top: 10, right: 120, bottom: 10, left: 40 }

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const svgStyle = {
  width:innerWidth,
  height:innerHeight
}

const Index = () => {

  const [data, setData] = useState([10, 4, 23, 7, 38]);
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    console.log("svg", svg);
    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('class', 'new')
      .attr('cx', value => value * 2)
      .attr('cy', value => value * 2)
      .attr('r', value => value)
      .attr('stroke', 'red')
  }, [data])

  return (
    <>
      <svg ref={svgRef} style={svgStyle} />
      <br /><br />
      <button onClick={() => setData(data.map(item => item * 2))}>updata Data</button>
    </>
  )

}

export default Index