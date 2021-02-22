export const PubSub = {
  id: 0,
  // 订阅回调的容器
  callbacks: {}
}

PubSub.subscribe = function (channel, callback) {
  const token = 'token_' + this.id++
  if (this.callbacks[channel]) {
    this.callbacks[channel][token] = callback
  } else {
    this.callbacks[channel] = {
      [token]: callback
    }
  }
  return token
}

PubSub.publish = function (channel, data) {
  if (this.callbacks[channel]) {
    Object.values(this.callbacks[channel]).forEach(callback => callback(data))
  }
}

/**
 * 取消订阅 分三种情况
 * 1. 不传，删除所有的订阅
 * 2. 传入的是PubSub的ID，删除当前ID的监听
 * 3. 传入订阅name,删除name所有监听
 * @param {*} flag 
 */
PubSub.unsubscribe = function (flag) {
  // 1. 不传
  if (flag === undefined) {
    this.callbacks = {}
  } else if (typeof flag === 'string') {
    // 2. 判断是否是PubSub的ID
    if (flag.indexOf('token_') === 0) {
      const callbackObj = Object.values(this.callbacks).find(item => item.hasOwnProperty(flag))
      if (callbackObj) {
        delete callbackObj[flag]
      }
    } else {
      delete this.callbacks[flag]
    }
  }
}