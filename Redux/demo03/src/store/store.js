// import {createStore} from 'redux'
import createStore from './redux/createStore'
import reducer from './reducer'

const store = createStore(reducer);

export default store