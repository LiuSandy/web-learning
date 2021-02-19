/** 使用react-redux */
import React from 'react';
import { connect } from './store/react-redux/index';

const Index = props => {
  console.log(props)
  return (
    <div>
      <span>{props.count}</span>
      <button onClick={()=>props.add(12)}>+</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  add: v => { dispatch({ type: 'add', value: v }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)