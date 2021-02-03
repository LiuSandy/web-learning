import { CHANGEINPUT, DELETEITEM, ADDITEM } from './actionTypes'

const defaultState = {
  inputValue: "Write Something",
  list: ["早8点开晨会", "早9点开晨会,需求沟通会", "早8点开晨会", "早8点开晨会"],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  // Reducer 里面只能接受state 不能改变State
  if (action.type === CHANGEINPUT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState
  }

  if (action.type === ADDITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue)
    newState.inputValue = ""
    return newState
  }

  if (action.type === DELETEITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    // newState.list = newState.list.filter((item, index) => index !== action.index)
    newState.list.splice(action.index, 1)
    return newState
  }

  return state;
};
