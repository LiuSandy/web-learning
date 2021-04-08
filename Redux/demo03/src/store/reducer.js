const initState = {
  count: 0,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + action.value
      }
    case 'sub':
      return {
        ...state,
        count: state.count - action.value
      }
    case 'set':
      return {
        ...state,
        count: action.value
      }
    default:
      return state
  }
}