import React from "react";
import {Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {getMenuData} from '../../store/actions/menu'
import store from '../../store'
export type AppDispatch = typeof store.dispatch

const Index = ()=>{
  const store = useSelector((state:IState)=>state.menu)
  const dispatch:AppDispatch = useDispatch()
  
  const onClick = ()=>{
    console.log('点击', store)
    // getMenuData()(dispatch).then(res=>{
    //   console.log(res)
    // })
    const result = dispatch(getMenuData())
    // console.log(result)
  }

  return (
    <div>
      <h1>{store.name}</h1>
      <Button onClick={onClick}>Click</Button>
    </div>
  )
}

Index.displayName = "Home"

export default Index

