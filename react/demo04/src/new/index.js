/** react 15 生命周期 */

import React from 'react'
import Child from './child'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '父组件文字', hideChild: false }
  }


  changeText = () => {
    this.setState({
      text: "修改后的父组件文本"
    });
  };
  // 点击按钮，隐藏（卸载）Child 组件的方法
  hideChild = () => {
    this.setState({
      hideChild: true
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.changeText} className="changeText">
          修改父组件文本内容
        </button>
        <button onClick={this.hideChild} className="hideChild">
          隐藏子组件
        </button>
        {this.state.hideChild ? null : <Child text={this.state.text} />}
      </div>
    )
  }
}

export default Index