import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from "./TodoList";
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/antd.css';


ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
