import React from 'react'
import { Todo } from '@/models'

interface Props {
  todo: Todo
}

const todoItemStyle: React.CSSProperties = {
  color: 'red',
  backgroundColor: "green"
}

const TodoItem: React.FC<Props> = (props: Props) => (
  <li style={todoItemStyle}>{props.todo.text}</li>
)


export default TodoItem