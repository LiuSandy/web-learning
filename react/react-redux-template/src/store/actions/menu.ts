import {Dispatch} from 'redux';
import axios from 'axios'

export const SET_MENU = 'setMenu';
export const ASYNC_SET_MENU = 'asyncSetMenu';

function delay(){
  return axios({
    url: 'http://localhost:3000/',
  });
}

export const getMenuData = () => {
  return async function (dispatch: Dispatch ) {
    // 在这里面 去处理异步
    return delay();

    // return dispatch({
    //   type: SET_MENU,
    //   payload: {name:'我是异步请求的数据'},
    // })
  }
}