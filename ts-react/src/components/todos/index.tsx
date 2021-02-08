import React from 'react';
import { Todo } from '@/models';
import { CombinedState, TodosState } from '@/store/reducers'
import { addTodo } from '@/store/actions/todos'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from "react-router";
import TodoItem from './TodoItem'
import TodoInput from './TodoInput'

const actions = {
  addTodo
}

export interface TodoLocationState { name?: string }

type Props = TodosState & typeof actions & RouteComponentProps<{}, StaticContext, TodoLocationState>


class Index extends React.Component<Props> {

  addTodo = (todo: Todo) => {
    this.props.addTodo(todo)
  }

  public render() {
    const { list, location } = this.props
    return (
      <div>
        <p>name:{location.state.name}</p>
        <TodoInput addTodo={this.addTodo} />
        {
          list.map((todo: Todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        }
      </div>
    )
  }
}
const mapStateToProps = (state: CombinedState): TodosState => state.todos
export default connect(mapStateToProps, actions)(Index)