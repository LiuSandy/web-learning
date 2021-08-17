import React, { useContext } from "react"
import { Button, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { isAction } from 'mobx'
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
  const { list,
    secondsPassed,
    onClick,
    increaseTimer,
    total,
    fetchList,
    changeListValue,
    changeListLength
  } = store

  console.log(isAction(changeListValue))

  const handelAsyncClick = () => {
    fetchList().then(res => {
      console.log("---->", res)
    })
  }
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

        <Button type='ghost' onClick={handelAsyncClick}>异步</Button>
      </Space>
      <br />
      <br />
      <Space>
        <Button type='primary' onClick={changeListValue}>Change List Value</Button>

        <Button type='danger' onClick={changeListLength}>Change List Length</Button>
      </Space>
    </div>
  )
})


export default index;