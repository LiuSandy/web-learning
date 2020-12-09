import { selection } from "d3";
import React, { useState } from "react";
import BrushChart from "./base/BrushChart";
import BrushChartChild from "./base/BrushChartChild";

export default () => {

  const [data, setData] = useState(
    Array.from({ length: 200 }).map(() => Math.round(Math.random() * 100))
  );

  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <h2>Sub-selections with d3-brush</h2>
      <BrushChart data={data}>
        {selection => <BrushChartChild data={data} selection={selection} />}
      </BrushChart>
      <button onClick={onAddDataClick}>Add data</button>
    </React.Fragment>
  )
}