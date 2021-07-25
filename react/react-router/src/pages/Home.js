import React, { useEffect } from 'react'

/* eslint import/no-anonymous-default-export: off */
export default (props) => {
  const onClick = () => {

  }
  const onClick1 = () => {
    props.push("/user")
  }

  const onClick2 = () => {
    props.history.push('/other')
    console.log("props", props)
  }

  useEffect(() => {
    console.log('props', props)
    console.log("Home页面DIDMOUNT")
  }, [])
  return (
    <div>
      <button onClick={onClick}>带参数</button>
      <button onClick={onClick1}>不带参数</button>
      <button onClick={onClick2}>重定向</button>
      <h1>这是首页</h1>
    </div>

  )
}