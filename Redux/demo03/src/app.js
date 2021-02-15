import React, { useEffect, useState } from 'react'
import store from './store/store'

export default () => {
  const [force, setForce] = useState(null)
  const { count } = store.getState()

  const add = () => {
    store.dispatch({
      type: 'add',
      value: 1
    })
  }

  const sub = () => {
    store.dispatch({
      type: 'sub',
      value: 1
    })
  }

  const set = () => {
    store.dispatch({
      type: 'set',
      value: 100
    })
  }

  useEffect(() => {
    const listener = store.subscribe(() => {
      console.log("---", listener)
      setForce({})
      if (store.getState().count === 2) {
        listener()
      }
    })

    const listener2 = store.subscribe(() => {
      console.log("+++++", listener2)
      setForce({})
      if (store.getState().count === 4) {
        listener2()
      }
    })

  }, [])


  console.log(store.getState())
  return (
    <div>
      <button onClick={sub}>-</button>
      <span>{count}</span>
      <button onClick={add}>+</button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={set}>Set</button>
    </div>
  )
}