import {createStore,applyMiddleware} from 'redux'
import combinedReducers from './reducers'
import { routerMiddleware } from "connected-react-router";
import history from "@/history";

const store = applyMiddleware(routerMiddleware(history))(createStore)(combinedReducers);

export default store