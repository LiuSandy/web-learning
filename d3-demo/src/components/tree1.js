import { useRef, useEffect, useState } from "react"
const d3 = require("d3")

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
const dx = 10;
const dy = 159;
const margin = { top: 10, right: 120, bottom: 10, left: 40 }


const Index = props => {

  const { data } = props

  const root = useRef(null)
  const svg = useRef(null)
  const gLink = useRef(null)
  const gNode = useRef(null)

  const color = useRef(null)
  const initialSetting = useRef(null)

  /**
   * 初始化环境
   */
  const initial = () => {


    // document.getElementById('d3Tree').append(svg.current.node());
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    initialSetting.current = {
      innerWidth,
      innerHeight,
    }
  }

  /**
   * 读取数据
   */
  const readData = () => {
    //   root.current = null;
    //   svg.current = null;
    //   gLink.current = null;
    //   gNode.current = null;

    // console.log("svg", svg.current);

    // svg.current?.exit()?.remove()
    document.getElementById('d3Tree').innerHTML = ""
    
    // d3.select("#d3Tree").exit().remove()

    root.current = d3.hierarchy(data);

    root.current.x0 = dy / 2;
    root.current.y0 = 0;

    root.current.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth >= 2) d.children = null;
    });

    svg.current = d3.create("svg")
      .attr("viewBox", [-margin.left, -margin.top, width, dx])
      .style("font", "10px sans-serif")
      .style("user-select", "none");

    gLink.current = svg.current.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    gNode.current = svg.current.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    update(root.current)

    document.getElementById('d3Tree').append(svg.current.node());
    // document.getElementById('d3Tree').style.display = 'block'
  }

  const tree = d3.tree().nodeSize([dx, dy])

  const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

  /**
   * 渲染数据
   */
  const update = (source) => {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.current.descendants().reverse();
    const links = root.current.links();

    // Compute the new tree layout.
    tree(root.current);

    let left = root.current;
    let right = root.current;
    root.current.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;

    const transition = svg.current.transition()
      .duration(duration)
      .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
      .tween("resize", window.ResizeObserver ? null : () => () => svg.current.dispatch("toggle"));

    // Update the nodes…
    const node = gNode.current.selectAll("g")
      .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
      .attr("transform", d => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (event, d) => {
        d.children = d.children ? null : d._children;
        update(d);
      });

    nodeEnter.append("circle")
      .attr("r", 2.5)
      .attr("fill", d => d._children ? "#555" : "#999")
      .attr("stroke-width", 10);

    nodeEnter.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d._children ? -6 : 6)
      .attr("text-anchor", d => d._children ? "end" : "start")
      .text(d => d.data.name)
      .clone(true).lower()
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .attr("stroke", "white");

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    // Update the links…
    const link = gLink.current.selectAll("path")
      .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
      .attr("d", d => {
        const o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
      .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
      .attr("d", d => {
        const o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      });

    // Stash the old positions for transition.
    root.current.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

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
    initial()
  }, []);

  useEffect(() => {
    readData()
  }, [data])


  return (
    <div id="d3Tree" />
  )
}

export default Index