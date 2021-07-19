import React, { Component } from "react";
import { Input, Button, List } from "antd";
import DragResizeDialog from 'react-drag-resize-dialog'
import 'react-drag-resize-dialog/lib/min.min.css'
import { connect } from 'react-redux'

const boxStyle = {
  width: 500,
  margin: '10px auto',
  boxShadow: '10px 5px 5px #bfb7b7,-10px 5px 5px #bfb7b7',
  padding: 10
}
class TodoList extends Component {

  state = {
    visible: false
  }

  clickBtn = () => {
    this.props.addTodo(this.props.inputValue)
  }

  render() {
    return (
      <div style={boxStyle}>
        <h2>Redux</h2>
        <div>
          <Input
            onChange={this.props.inputChange}
            value={this.props.inputValue}
            style={{ width: 250, marginRight: 10 }}
          />
          <Button
            type="primary"
            onClick={this.clickBtn}
          >增加</Button>
        </div>
        <div style={{ margin: 10, width: 300 }}>
          <List
            bordered
            dataSource={this.props.list}
            renderItem={(item, index) => <List.Item extra={<Button type='primary' onClick={() => {this.props.delTodo(index) }}>删除</Button>}>{item}</List.Item>}
          />
        </div>
      </div>
    )
  }
}

const mapstateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  inputChange: e => {
    const action = {
      type: 'input_change',
      value: e.target.value
    }
    dispatch(action)
  },
  addTodo: v => {
    dispatch({
      type: 'add',
      value: v
    })
  },
  delTodo: index => {
    dispatch({
      type: 'delete',
      value: index
    })
  }
})

export default connect(mapstateToProps, mapDispatchToProps)(TodoList)
// export default TodoList