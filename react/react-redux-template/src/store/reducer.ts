 import { combineReducers } from 'redux';
 import { History } from 'history';
 import thunkReducer from './reducers';
 
 // combineReducers接受一个对象， 对象里面是一个一个的小的reducer
 // const obj = {a: 1, B: 2}
 const rootReducer = (history: History) => combineReducers({
   ...thunkReducer,
 });
 
 export default rootReducer;