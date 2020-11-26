import { useRef, useEffect } from 'react'
import { select, max, min, scaleTime, axisBottom, scaleLinear } from 'd3'
import useResizeObserver from '../../hooks/useResizeObserver'

const getDate = dateString => {
  const date = dateString.split("-");
  return new Date(date[2], date[0] - 1, date[1])
}

const Index = props => {
  const { highlight, data } = props
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    console.log("changed");
    const svg = select(svgRef.current)
    // svg.selectAll('.axis').remove()
    svgRef.current.innerHTML = ""
    
    if (!dimensions) return

    const minDate = min(data, episode => getDate(episode.air_date));
    const maxDate = max(data, episode => getDate(episode.air_date));

    // X 比例尺
    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, dimensions.width])
    // x 轴
    const xAxis = axisBottom(xScale)
    // 添加 X 轴
    svg.append('g')
      .attr('class', 'axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis)

    const yScale = scaleLinear()
      .domain([max(data, episode => episode.characters.length), 0])
      .range([0, dimensions.height])

    // 渲染数据
    svg.selectAll('.episode')
      .data(data)
      .join('line')
      .attr('class', 'episode')
      .attr('stroke', episode => episode.characters.includes(highlight) ? "red" : 'black')
      .attr('x1', episode => xScale(getDate(episode.air_date)))
      .attr('y1', dimensions.height)
      .attr('x2', episode => xScale(getDate(episode.air_date)))
      .attr('y2', episode => yScale(episode.characters.length))

  }, [data, dimensions, highlight]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef} />
    </div>
  )
}

export default Index