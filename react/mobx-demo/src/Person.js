import React from 'react'
import { observer } from 'mobx-react-lite'

const Index = observer(({ person }) => {
  const onChange = () => {
    console.log("onchange")
  }
  console.log('render')
  if (person.nickName) {
    return <h1 onClick={onChange}>{person.nickName}</h1>
  }
  return <h3 onClick={onChange}>{person.fullName}</h3>
})

export default Index