import React, { Component } from "react";
import { Input, Button, List } from "antd";
import store from './store';

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state=store.getState()
  }

  clickBtn = () => {
    console.log('ssd');
  }

  

  render() {
    return (
      <div>
        <div>
          <Input value={this.state.inputValue} style={{ width: 250, marginRight: 10 }} />
          <Button
            type="primary"
            onClick={this.clickBtn}
          >增加</Button>
        </div>
        <div style={{ margin: 10, width: 300 }}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => <List.Item extra={<Button type='primary' onClick={() => { }}>删除</Button>}>{item}</List.Item>}
          />
        </div>
      </div>
    )
  }
}

export default TodoList