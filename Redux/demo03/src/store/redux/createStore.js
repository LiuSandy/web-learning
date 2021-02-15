export default (reducer) => {
  let store;
  const eventListeners = []
  const getState = () => store;

  const dispatch = (action) => {
    store = reducer(store, action)
    eventListeners.forEach(fn => fn && fn())
  }

  // 注册监听器, 返回销毁
  const subscribe = (fn) => {
    eventListeners.push(fn);
    return () => {
      const index = eventListeners.indexOf(fn)
      eventListeners.splice(index, 1)
    }
  }
  dispatch({})
  return {
    getState,
    dispatch,
    subscribe
  }
}