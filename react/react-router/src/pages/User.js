import React, { useEffect } from 'react'

/* eslint import/no-anonymous-default-export: off */
export default (props) => {

  const onClick = () => {
    props.history.go(-1)
  }
  useEffect(() => {
    console.log("User页面DIDMOUNT", props)
  }, [])

  return (
    <div>
      <h1>这是用户页</h1>
      <button onClick={onClick}>返回</button>
    </div>

  )
}