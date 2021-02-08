import React, { ReactNode } from 'react'
import { CombinedState, CounterState } from '@/store/reducers'
import { add, minus, go } from '@/store/actions/counter'
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router'
import { connect } from 'react-redux'
import { LocationDescriptorObject } from "history";
import { TodoLocationState } from './todos'
const actions = { add, minus,go }

interface Params { name?: string }

type Props = CounterState & typeof actions & RouteComponentProps<Params, StaticContext>;

class Counter extends React.Component<Props> {

  render() {
    const { count, add, minus, match: { params }, go } = this.props
    
    const path: LocationDescriptorObject<TodoLocationState> = { pathname: "/todos", state: { name: "YYYYYY" } }
    
    return (
      <div>
        <p>name:{params.name}</p>
        <button onClick={minus}>-</button>
        <span>{count}</span>
        <button onClick={add}>+</button>
        <hr />
        <button onClick={() => go(path)}>todo</button>
      </div>
    )
  }
}
const mapStateToProps = (state: CombinedState): CounterState => state.counter
export default connect(
  mapStateToProps,
  actions
)(Counter)

// type PropsWithChildren<Props> = Readonly<Props> & Readonly<{
//   children?: ReactNode
// }>

// type ComponentProps = PropsWithChildren<Props>