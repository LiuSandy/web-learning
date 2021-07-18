import React from "react";
import { Input, Button, List } from "antd";
import store from "./store";
import { getMyListAction, changeInputAction, changeAddItem, changeDeleteItem } from './store/actionCreators'

const boxStyle = {
  width: 500,
  margin: '10px auto',
  boxShadow: '10px 5px 5px #bfb7b7,-10px 5px 5px #bfb7b7',
  padding: 10
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  changeInputValue = (e) => {

  };

  storeChange = () => {

  }

  clickBtn = () => {

  }

  deleteItem = index => {

  }

  render() {

    return (
      <div style={boxStyle}>
        <h2>redux</h2>
        <div>
          <Input
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

        </div>
      </div>
    );
  }
}

export default TodoList;
