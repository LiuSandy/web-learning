import menuAction from '../actions/menu'

interface IMenu {
  name:string
}

const initialState: IMenu ={
  name:'测试'
}

export default (state=initialState,action:ActionParams)=>{
  switch (action.type) {
    case menuAction.SET_MENU: {
      console.log("this")
      return state
    }
    default: 
    return state
  }
}