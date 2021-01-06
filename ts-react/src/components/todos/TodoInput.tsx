import React from 'react'
import { Todo } from '@/models'

interface Props {
  addTodo: (todo: Todo) => void
}

interface State {
  text: string
}

let id = 0;

export default class TodoInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { text: "" }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value })
  }

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = this.state.text.trim();
    if (!text) return
    this.props.addTodo({ id: id++, text })
    this.setState({ text: "" })
  }
  render() {
    const { handleChange, handleSubmit } = this
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={this.state.text} onChange={handleChange} />
        <input type="submit" value="添加" />
      </form>
    )
  }
}