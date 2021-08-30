import React from "react";
import {Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {getMenuData} from '../../store/actions/menu'

const Index = ()=>{
  const store = useSelector((state:IState)=>state.menu)
  const dispatch:AppDispatch = useDispatch()
  
  const onClick = ()=>{
    console.log('点击', store)
    
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

