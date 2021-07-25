import React from 'react';
import ReactDOM from 'react-dom';
import { makeAutoObservable, makeObservable, observable, action } from "mobx"
import { observer, Provider } from "mobx-react"
import TodoList from './TodoList'
import Demo from './demo'
import store from './store/newStore'
// import store from './store'
import 'antd/dist/antd.css'

// Model the application state.

class newStore {
  inputValue = "222"
  list = ["早8点开晨会", "早9点开晨会,需求沟通会", "早8点开晨会", "早8点开晨会"]

  constructor() {
    makeAutoObservable(this)
  }

  handleInputChange(value) {
    this.inputValue = value
  }
  handleAddTodos(todo) {
    this.list.push(todo)
  }
  handleDeleteTodos(index) {
    this.list.splice(index, 1)
  }
}

const myStore = new newStore()

// ReactDOM.render(<Demo store={store} />, document.getElementById('root'))

// Update the 'Seconds passed: X' text every second.
// setInterval(() => {
//   myTimer.increase()
// }, 1000)

ReactDOM.render(
  <TodoList store={store} />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
