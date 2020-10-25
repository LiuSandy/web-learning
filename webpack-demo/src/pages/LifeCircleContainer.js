import React from 'react'
import LifeCircle from './LifeCircle'

class LifeCircleContainer extends React.Component {
  // state 也可以像这样用属性声明的形式初始化
  constructor(props) {
    super(props);
    this.state = {
      text: "父组件的文本",
      hideChild: false
    }
  }

  // 点击按钮，修改父组件文本的方法
  changeText = () => {
    this.setState({
      text: "修改后的父组件文本"
    });
  };

  // 点击按钮，隐藏（卸载）LifeCircle 组件的方法
  hideChild = () => {
    this.setState({
      hideChild: true
    });
  };
  
  render() {
    return (
      <div className="fatherContainer">
        <button onClick={this.changeText} className="changeText">
          修改父组件文本内容
        </button>
        <button onClick={this.hideChild} className="hideChild">
          隐藏子组件
        </button>
        {this.state.hideChild ? null : <LifeCircle text={this.state.text} />}
      </div>
    );
  }
}

export default LifeCircleContainer;
