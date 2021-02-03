import { takeEvery,put } from 'redux-saga/effects'
import { GET_MY_LIST } from './actionTypes'
import { getListAction } from "./actionCreators";
import axios from 'axios'


function* mySaga() {
    yield takeEvery(GET_MY_LIST, getList)
}

function* getList() {
    const res = yield axios.get('http://mock-api.com/ynWpwjK6.mock/todo_list')
    const { data } = res.data
    const action = getListAction(data)
    yield put(action)
}

export default mySaga