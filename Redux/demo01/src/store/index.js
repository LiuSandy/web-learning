import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'
import thunk from 'redux-thunk'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

// const enhancers = composeEnhancers(applyMiddleware(thunk))
const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware))

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
  reducer,
  enhancers,
);

sagaMiddleware.run(mySaga)

export default store;
