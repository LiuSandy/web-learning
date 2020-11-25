import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@d3/collapsible-tree";

function CollapsibleTree() {
  const ref = useRef();

  useEffect(() => {
    (new Runtime).module(notebook, name => {
      if (name === "chart") return Inspector.into(ref.current.querySelector(".chart"))();
      if (name === "diagonal") return Inspector.into(ref.current.querySelector(".diagonal"))();
      if (name === "tree") return Inspector.into(ref.current.querySelector(".tree"))();
      if (name === "data") return Inspector.into(ref.current.querySelector(".data"))();
      if (name === "dx") return Inspector.into(ref.current.querySelector(".dx"))();
      if (name === "dy") return Inspector.into(ref.current.querySelector(".dy"))();
      if (name === "margin") return Inspector.into(ref.current.querySelector(".margin"))();
      if (name === "d3") return Inspector.into(ref.current.querySelector(".d3"))();
    });
  }, []);

  return (
    <div className="CollapsibleTree" ref={ref}>
      <div className="chart"></div>
      <div className="diagonal"></div>
      <div className="tree"></div>
      <div className="data"></div>
      <div className="dx"></div>
      <div className="dy"></div>
      <div className="margin"></div>
      <div className="d3"></div>
      <p>Credit: <a href="https://observablehq.com/@d3/collapsible-tree">Collapsible Tree by D3</a></p>
    </div>
  );
}

export default CollapsibleTree;