import { useState } from 'react'
import TreeChart from './base/TreeChart'

const initialData = {
  name: "😐",
  children: [
    {
      name: "🙂",
      children: [
        {
          name: "😀"
        },
        {
          name: "😁"
        },
        {
          name: "🤣"
        }
      ]
    },
    {
      name: "😔"
    }
  ]
};

const Index = props => {
  const [data, setData] = useState(initialData);

  return (
    <>
      <h1>Animated Tree Chart</h1>
      <TreeChart data={data} />
      <button onClick={() => setData(initialData.children[0])}>
        Update data
      </button>
    </>
  )
}

export default Index