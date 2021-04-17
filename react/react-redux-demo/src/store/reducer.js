const defaultState = {
  inputValue: "XXX",
  list: ["早8点开晨会", "早9点开晨会,需求沟通会", "早8点开晨会", "早8点开晨会"],
}

export default (state = defaultState, action) => {
  if (action.type === 'input_change') {
    return {
      ...state,
      inputValue: action.value
    }

  }
  if (action.type === 'add') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(action.value)
    return newState
  }
  return state
}