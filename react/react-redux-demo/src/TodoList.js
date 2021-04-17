import React, { Component } from "react";
import { Input, Button, List } from "antd";
import { connect } from 'react-redux'

class TodoList extends Component {

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
      </div>
    )
  }
}

const mapstateToProps = state => ({
  ...state
})

const mapDispatchToProps=(dispatch)=>({
  inputChange:e=>{
    const action = {
      type:'input_change',
      value:e.target.value
    }
    dispatch(action)
  },
  addTodo:v=>{
    dispatch({
      type:'add',
      value:v
    })
  }
})

export default connect(mapstateToProps, mapDispatchToProps)(TodoList)
// export default TodoList