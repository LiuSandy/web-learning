import React from 'react'
import styles from './index.less'

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

  onMouseDown=(event)=>{
    event.stopPropagation()
    console.log("parent mousedown")
  }

  onChildClick=(event)=>{
    event.stopPropagation()
    console.log("child click")
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.onClick}>click</button>
        <div className={styles.parent} onMouseDown={this.onMouseDown}>
          <div className={styles.child} >
            <div className={styles.close} onClick={this.onChildClick}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index