import React from 'react'

class Child extends React.Component {

  constructor(props) {
    console.log("初始化子组件")
    super(props)
    this.state = { text: '子组件文字' }
  }

  /** 挂载阶段 */
  componentWillMount() {
    console.log("componentWillMount")
  }
  componentDidMount() {
    console.log("componentDidMount")
  }

  /** 更新阶段 */

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps")
  }

  componentWillUpdate() {
    console.log("componentWillUpdate")
  }
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate")
    return true;
  }
  componentDidUpdate() {
    console.log("componentDidUpdate")
  }

  /** 卸载阶段 */
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  changeText = () => {
    this.setState({
      text: "修改后的子组件文本"
    });
  };

  render() {
    console.log("render")
    return (
      <div>
        <button onClick={this.changeText} className="changeText">
          修改子组件文本内容
        </button>
        <p className="textContent">{this.state.text}</p>
        <p className="fatherContent">{this.props.text}</p>
      </div>
    )
  }
}

export default Child