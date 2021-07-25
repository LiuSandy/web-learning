import React, { useEffect } from 'react'

/* eslint import/no-anonymous-default-export: off */
export default (props) => {
  useEffect(() => {
    console.log("Other页面DIDMOUNT", props)
  }, [])

  return (
    <div>
      <h1>这是其他页面</h1>
    </div>

  )
}