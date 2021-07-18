import React from "react";
import { Input, Button, List } from "antd";
import { inject, observer } from 'mobx-react'

@observer
class Demo extends React.Component {


  render() {
    const { store } = this.props
    console.log(store)
    return (
      <div>

        <button onClick={() => store.handleAddTodos("xxx")}>Insert</button>
        {
          store.list.map((item, index) => (
            <p key={index}>{item}</p>
          ))
        }
      </div>
    )
  }
}

export default Demo