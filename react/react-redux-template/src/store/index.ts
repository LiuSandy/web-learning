import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history';
import reducer from './reducer';

export const history = createBrowserHistory();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(reducer(history), enhancer)

export default store