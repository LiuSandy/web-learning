import React from 'react';
import ReactDOM from 'react-dom';
// import AppContextComponent from './AppContext'
// import App from './App'
import Person from './Person'
import PersonStore from './store/person'
import 'antd/dist/antd.css'


// ReactDOM.render(
//   <App app={app} />,
//   document.getElementById('root')
// );

// const michel = new PersonStore();

setTimeout(() => PersonStore.nickName = "new Name", 5000)

ReactDOM.render(
  <Person person={PersonStore} />,
  document.getElementById('root')
);