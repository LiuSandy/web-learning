import React from 'react';
import {Provider} from 'react-redux'
import store from './store'
import Home from './pages/Home'

function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;
