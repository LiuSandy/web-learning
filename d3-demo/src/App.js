import { useState } from 'react'
import Tree from './components/tree1'
import Circle from './components/base/circle'
import Line from './components/base/line'
import Bar from './components/base/bar'
import games from './static/games'
import gamesCopy from './static/games-copy'
import './App.css'

function App() {
  const [data, setData] = useState(games);
  return (
    <div className="App">
      <Bar />
      {/* <button onClick={() => { setData(gamesCopy) }}>点击</button> */}
    </div>
  );
}

export default App;
