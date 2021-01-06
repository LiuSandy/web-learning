import React from 'react';
import { Todo } from '@/models';
import TodoItem from './TodoItem'
import TodoInput from './TodoInput'

interface Props {

}

interface State {
  todos: Array<Todo>
}

export default class Index extends React.Component<Props, State> {

  state = {
    todos: [] as Array<Todo>
  }

  addTodo = (todo: Todo) => {
    this.setState({ todos: [...this.state.todos, todo] })
  }

  public render() {
    const { todos } = this.state
    return (
      <div>
        <TodoInput addTodo={this.addTodo} />
        {
          todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        }
      </div>
    )
  }

}