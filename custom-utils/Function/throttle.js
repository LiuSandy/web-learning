/**
 * 控制函数执行时间
 * @param {*} callback 需要执行的函数
 * @param {*} wait 世间范围
 * @returns {*} 函数
 */
function throttle(callback, wait) {
  // 定义开始时间
  let start = 0;
  // 返回一个函数
  return function (e) {
    // 获取当前时间戳
    let now = Date.now()
    // 判断
    if (now - start >= wait) {
      // 若满足条件执行回调
      callback.call(this,e)
      // 更新开始时间
      start = now
    }
  }
}

module.exports = throttle