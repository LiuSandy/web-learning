import React, { useContext } from "react"
import { Button, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { AppContext } from './store/app'

const boxStyle = {
  width: 500,
  margin: '10px auto',
  boxShadow: '10px 5px 5px #bfb7b7,-10px 5px 5px #bfb7b7',
  padding: 10
}

const index = observer((props) => {
  const store = useContext(AppContext)
  // console.log(store)
  const { list, secondsPassed, onClick, increaseTimer, total } = store
  return (
    <div style={boxStyle}>
      <h1>Hello World</h1>
      <h3>SecondsPassed:</h3><span>{secondsPassed}</span>
      <h3>List:</h3><span>{list}</span>
      <br />
      <Space>
        <Button type='primary' onClick={increaseTimer}>increaseTimer</Button>

        <Button type='danger' onClick={onClick}>onClick</Button>

        <Button type='text'>{total}</Button>
      </Space>
    </div>
  )
})


export default index;