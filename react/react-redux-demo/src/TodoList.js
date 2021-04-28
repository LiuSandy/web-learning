import React, { Component } from "react";
import { Input, Button, List } from "antd";
import DragResizeDialog from 'react-drag-resize-dialog'
import 'react-drag-resize-dialog/lib/min.min.css'
import { connect } from 'react-redux'

class TodoList extends Component {

  state = {
    visible: false
  }

  clickBtn = () => {
    this.props.addTodo(this.props.inputValue)
  }

  render() {
    return (
      <div>
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
            renderItem={(item, index) => <List.Item extra={<Button type='primary' onClick={() => { }}>删除</Button>}>{item}</List.Item>}
          />
        </div>
        <DragResizeDialog
          visible={this.state.visible}
          onCancel={() => { this.setState({ visible: false }) }}
        />
        <button onClick={() => { this.setState({ visible: true }) }}>点击</button>
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
  }
})

export default connect(mapstateToProps, mapDispatchToProps)(TodoList)
// export default TodoList