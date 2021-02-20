
function newInstance(Fn, ...args) {
  // 1. 创建一个新对象
  const obj = {}
  // 2. 修改this指向为新对象
  const result = Fn.call(obj, ...args)
  // 3. 修改新对象的原型
  obj.__proto__ = Fn.prototype;
  // 返回新的对象
  /**
   * 需要判断
   * 1. 如果result 是一个对象类型则返回这个对象
   * 2. 如果是一个非对象类型，则返回新对象
   */
  return result instanceof Object ? result : obj
}

module.exports = newInstance 