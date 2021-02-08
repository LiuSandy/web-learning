import {createStore} from 'redux';
import reducer from './reducer';

const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


const store = createStore(reducer,extension)

export default store