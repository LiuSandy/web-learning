import { CHANGEINPUT, ADDITEM, DELETEITEM, GET_LIST, GET_MY_LIST } from './actionTypes'
import axios from 'axios'

export const changeInputAction = value => ({
    type: CHANGEINPUT,
    value
})

export const changeAddItem = () => ({
    type: ADDITEM,
})

export const changeDeleteItem = index => ({
    type: DELETEITEM,
    index
})

export const getListAction = data => ({
    type: GET_LIST,
    data
})

export const getTodoList = () => {
    return (dispatch) => {
        return axios.get('http://mock-api.com/ynWpwjK6.mock/todo_list')
            .then(res => {
                const { data } = res.data
                const action = getListAction(data)
                dispatch(action)
            })
    }
}

export const getMyListAction = () => ({
    type: GET_MY_LIST
})
