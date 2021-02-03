import React from "react";
import { Input, Button, List } from "antd";
import store from "./store";
import {getMyListAction, changeInputAction, changeAddItem, changeDeleteItem } from './store/actionCreators'

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    // this.changeInputValue = this.changeInputValue.bind(this);
    // this.changeInputValue = this.changeInputValue.bind(this);
    store.subscribe(this.storeChange)
  }

  componentDidMount(){
    const action = getMyListAction()
    store.dispatch(action)
  }

  changeInputValue = (e) => {
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
  };

  storeChange = () => {
    this.setState(store.getState())
  }

  clickBtn = () => {
    const action = changeAddItem()
    store.dispatch(action)
  }

  deleteItem = index => {
    const action = changeDeleteItem(index)
    store.dispatch(action)
  }

  render() {

    return (
      <div style={{ margin: 10 }}>
        <div>
          <Input
            placeholder={this.state.inputValue}
            style={{ width: 250, marginRight: 10 }}
            onChange={this.changeInputValue}
            value={this.state.inputValue}
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
            dataSource={this.state.list}
            renderItem={(item, index) => <List.Item extra={<Button type='primary' onClick={() => this.deleteItem(index)}>删除</Button>}>{item}</List.Item>}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
