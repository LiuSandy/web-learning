class Event {
  constructor() {
    this.events = {}
  }

  // 触发事件
  emit(event, ...args) {
    const cbs = this.events[event]
    if (!cbs) {
      return this
    }
    cbs.forEach(cb => cb.apply(this, args))
    return this
  }
  // 注册监听事件
  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(cb)
    return this

  }
  // 注册一次
  once(event, cb) {
    const func = (...args) => {
      this.off(event, func)
      cb.apply(this, argss)
    }
    this.on(event, func)
    return this

  }
  // 移除事件
  off(event, cb) {
    this.events[event] = null
  }
}


// script start
// async1 start
// async2 start