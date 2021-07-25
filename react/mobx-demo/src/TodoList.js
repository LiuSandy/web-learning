import React from "react";
import { Input, Button, List } from "antd";
import { observer } from 'mobx-react-lite'

const boxStyle = {
  width: 500,
  margin: '10px auto',
  boxShadow: '10px 5px 5px #bfb7b7,-10px 5px 5px #bfb7b7',
  padding: 10
}


export default observer(({ store }) => {
  const changeInputValue = (e) => {
    store.handleInputChange(e.target.value)

  };

  const clickBtn = () => {
    // store.inputValue
    store.handleAddTodos("新增一条")
    // this.forceUpdate()
  }

  const deleteItem = index => {
    store.handleDeleteTodos(index)
  }

  console.log('---', store.list)

  return (
    <div style={boxStyle}>
      <h2>Mobx</h2>
      <div>
        <Input
          value={store.inputValue}
          style={{ width: 250, marginRight: 10 }}
          onChange={changeInputValue}
        />
        <Button
          type="primary"
          onClick={clickBtn}
        >
          增加
        </Button>
      </div>
      <div style={{ margin: 10, width: 300 }}>
        <List
          bordered
          dataSource={store.list}
          renderItem={(item, index) => <List.Item extra={<Button type='primary' onClick={() => { deleteItem(index) }}>删除</Button>}>{item}</List.Item>}
        />

      </div>
      {/* {
        store.list.map((item, index) => (<p key={index}>{item}</p>))
      } */}
    </div>
  );
})
