import React from 'react';
import ReactDOM from 'react-dom';
import AppContextComponent from './AppContext'
import App from './App'
import { app, AppContext } from './store/app'
import 'antd/dist/antd.css'


// ReactDOM.render(
//   <App app={app} />,
//   document.getElementById('root')
// );


ReactDOM.render(
  <AppContext.Provider value={app}>
    <AppContextComponent />
  </AppContext.Provider>,
  document.getElementById('root')
);