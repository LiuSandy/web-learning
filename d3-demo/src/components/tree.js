import { useRef, useEffect, useState } from "react"

import * as d3 from "d3";

const Index = props => {

  const { games } = props
  console.log("----", games);

  const root = useRef(null)
  const color = useRef(null)
  const initialSetting = useRef(null)

  /**
   * 初始化环境
   */
  const initial = () => {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const svg = d3.select("#mainsvg")
      .attr('width', width)
      .attr('height', height)
    const margin = { top: 50, right: 150, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    initialSetting.current = {
      innerWidth,
      innerHeight,
      g
    }
  }

  /**
   * 读取数据
   */
  const readData = () => {
    const { innerHeight, innerWidth } = initialSetting.current
    // 数据预处理
    root.current = d3.hierarchy(games)
    root.current = d3.tree().size([innerHeight, innerWidth])(root.current);
    root.current.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth === 1) d.children = null;
    });
    renderTree()
  }

  /**
   * 渲染数据
   */
  const renderTree = () => {
    const { g } = initialSetting.current
    color.current = d3.scaleOrdinal()
      .domain(root.current.descendants().filter(d => d.depth <= 1).map(d => d.data.name))
      .range(d3.schemeCategory10)

    // 画线
    g.selectAll("path")
      .data(root.current.links())
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

    // 画点
    g.selectAll('circle')
      .data(root.current.descendants()).join('circle')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('stroke-width', 3)
      .attr('r', 6)
      .attr('fill', fill)
      .on("click", d => {
        d.children = d.children ? null : d._children
        renderTree();
      });

    // 显示文字
    g.selectAll('text')
      .data(root.current.descendants()).join('text')
      .attr('font-size', '1em')
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .attr('x', d => (d.children ? -6 : 6) + d.y)
      .attr('y', d => d.x + 6)
      .text(d => d.data.name)

  }

  const fill = (d) => {
    if (d.depth === 0) {
      return color.current(d.data.name)
    }
    while (d.depth > 1) {
      d = d.parent
    }
    return color.current(d.data.name)
  }


  useEffect(() => {
    initial();
    readData()
  }, []);

  useEffect(() => {
    readData()
  }, [games])


  return (
    <svg id="mainsvg" className="svgs"
      style={{ display: 'block', margin: 'auto' }} />
  )
}

export default Index