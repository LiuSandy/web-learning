import React from 'react'
import { DrawRectangle } from '../../components';
import {insert,deleteItem,selectAll} from "@/DrawRectangle/_utils"

// const url = 'http://127.0.0.1:9002/p0.pdf'

const Index = props => {

  const onInsert=(data,callback)=>{
    data.status = 'done'
    console.log(data)
    const allData = insert(data)
    callback(allData)
  }

  return (
    <div>
      <DrawRectangle onInsert={onInsert} linkedList={selectAll()} />
    </div>
  )
}

export default Index;