import {SET_MENU} from '../actions/menu'

export interface IMenu {
  name:string
}

const initialState: IMenu ={
  name:'测试'
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initialState,action:ActionParams)=>{
  switch (action.type) {
    case SET_MENU: {
      return {
        ...state,
        ...action.payload
      }
    }
    default: 
    return state
  }
}