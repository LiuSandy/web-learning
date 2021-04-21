import React from 'react'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  onClick = () => {
    this.setState({ count: this.state.count + 1 })
    console.log(this.state)
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log(this.state)
    }, 0)
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.onClick}>click</button>
      </div>
    )
  }
}

export default Index