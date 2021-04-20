import React from 'react'

/* eslint import/no-anonymous-default-export: off */
export default (props) => {
  const onClick = () => {
    props.push("/user/1/18")
  }
  const onClick1 = () =>{
    props.push("/user")
  }
  return (
    <div>
      <button onClick={onClick}>带参数</button>
      <button onClick={onClick1}>不带参数</button>
      <h1>这是首页</h1>
    </div>

  )
}