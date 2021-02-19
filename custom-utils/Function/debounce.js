function debounce(callback, time) {
  // 定时器变量
  let timeId = null
  return function (e) {
    // 判断timeId 不是null 证明已有定时器正在执行
    if (timeId !== null) {
      clearInterval(timeId)
    }
    // 启动定时器
    timeId = setTimeout(() => {
      callback.call(this, e)
      // 重置定时器变量
      timeId = null
    }, time)
  }
}

module.exports = debounce