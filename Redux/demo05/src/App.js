import React from 'react';
import './App.css';

function App() {
  const onClick = () => {
    console.log('-----');
  };

  return (
    <div className="App">
      <button type="button" onClick={() => { onClick(); }}>onClick</button>
    </div>
  );
}

export default App;
