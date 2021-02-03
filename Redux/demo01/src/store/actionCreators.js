import { CHANGEINPUT, ADDITEM, DELETEITEM } from './actionTypes'

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
