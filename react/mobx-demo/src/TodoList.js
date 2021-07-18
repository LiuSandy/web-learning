import React from "react";
import { Input, Button, List } from "antd";
import { inject, observer } from 'mobx-react'

const boxStyle = {
  width: 500,
  margin: '10px auto',
  boxShadow: '10px 5px 5px #bfb7b7,-10px 5px 5px #bfb7b7',
  padding: 10
}

@observer
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  changeInputValue = (e) => {
    const { store } = this.props
    store.handleInputChange(e.target.value)
    this.forceUpdate()

  };

  clickBtn = () => {
    const { store } = this.props
    // store.inputValue
    store.handleAddTodos("新增一条")
    this.forceUpdate()
  }

  deleteItem = index => {
    const { store } = this.props
    store.handleDeleteTodos(index)
    this.forceUpdate()
  }

  render() {
    let { store } = this.props
    console.log(store)
    return (
      <div style={boxStyle}>
        <h2>Mobx</h2>
        <div>
          <Input
            value={store.inputValue}
            style={{ width: 250, marginRight: 10 }}
            onChange={this.changeInputValue}
          />
          <Button
            type="primary"
            onClick={this.clickBtn}
          >
            增加
          </Button>
        </div>
        <div style={{ margin: 10, width: 300 }}>
          <List
            bordered
            dataSource={store.list}
            renderItem={(item, index) => <List.Item extra={<Button type='primary' onClick={() => {this.deleteItem(index) }}>删除</Button>}>{item}</List.Item>}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
