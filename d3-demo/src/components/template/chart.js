import {useState, useRef, useEffect} from 'react'
import { select } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver'

export default ({data})=>{
  const wrapperRef = useRef(null)
  const svgRef = useRef(null)
  const dimensions = useResizeObserver()

  useEffect(()=>{

    const svg = select(svgRef.current)
    if(!dimensions) return

  },[dimensions,data])

  return (
    <div ref={wrapperRef} style={{marginBottom:'2rem'}}>
      <svg ref={svgRef} />
    </div>
  )
}