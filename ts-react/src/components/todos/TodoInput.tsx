import React from 'react'
import { Todo } from '@/models'
import { DefaultProps, withDefaultProps } from '@/HOC'

interface OwnProps {
  addTodo: (todo: Todo) => void
}

interface State {
  text: string
}

type Props = OwnProps & DefaultProps

let id = 0;

class TodoInput extends React.Component<Props, State> {
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
    const { setting } = this.props
    const { handleChange, handleSubmit } = this
    return (
      <form onSubmit={handleSubmit}>
        <input {...setting} type="text" value={this.state.text} onChange={handleChange} />
        <input type="submit" value="添加" />
      </form>
    )
  }
}

export default withDefaultProps(TodoInput)