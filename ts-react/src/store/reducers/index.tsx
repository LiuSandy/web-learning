import counter, { CounterState } from './counter'
import todos, { TodosState } from './todos'
import { combineReducers } from 'redux'
import { connectRouter } from "connected-react-router";
import history from "@/history";

const reducers = {
  counter,
  todos,
  router:connectRouter(history)
}

type ReducersType = typeof reducers

type CombinedState = {
  [k in keyof ReducersType]: ReturnType<ReducersType[k]>
}


const combinedReducers = combineReducers(reducers);

export type { CounterState, TodosState, CombinedState }

export default combinedReducers;