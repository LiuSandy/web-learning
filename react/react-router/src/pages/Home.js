import React from 'react'

/* eslint import/no-anonymous-default-export: off */
export default (props) => {
  const onClick = () => {
    
    props.push("/user")
  }
  return (
    <div>
      <button onClick={onClick}>click</button>
      <h1>这是首页</h1>
    </div>

  )
}