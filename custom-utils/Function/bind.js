const call = require('./call')
/**
 * bind 会返回一个新函数
 */
function bind(Fn, obj, ...args) {

  return function (...args2) {
    // 执行call函数
    return call(Fn, obj, ...args, ...args2)
  }

}

module.exports = bind