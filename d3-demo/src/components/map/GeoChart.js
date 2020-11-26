import { useEffect, useRef, useState } from 'react'
import { select, max, min, scaleLinear, geoMercator, geoPath } from 'd3'
import useResizeObserver from '../../hooks/useResizeObserver'

export default ({ data, property }) => {

  const wrapperRef = useRef(null)
  const svgRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    console.log(selectedCountry)

    if (!dimensions) return

    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const maxProp = max(data.features, feature => feature.properties[property])
    const minProp = min(data.features, feature => feature.properties[property])

    const colorScale = scaleLinear().domain([minProp, maxProp]).range(['#ccc', 'red'])


    const projection = geoMercator().fitSize([width, height], selectedCountry || data).precision(100);

    const pathGenetator = geoPath().projection(projection);

    svg.selectAll('.country')
      .data(data.features)
      .join('path')
      .on('click', (e, feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature)
      })
      .attr('class', 'country')
      .transition()
      .duration(1000)
      .attr('fill', feature => colorScale(feature.properties[property]))
      .attr('d', feature => pathGenetator(feature))

  }, [data, property, dimensions, selectedCountry]);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef} />
    </div>
  )
}