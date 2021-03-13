/**
 * 
 * @param {*} Fn 需要执行的函数
 * @param {*} obj 需要改变this的对象
 * @param  {...any} args 函数参数
 */
function call(Fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    // 如果这个函数处于非严格模式下，
    // 则指定为 null 或 undefined 时会自动替换为指向全局对象，
    obj = globalThis /* ES11 提供的全局对象 */
  }
  // 为 obj 添加临时的方法 把Fn 给Temp
  obj.temp = Fn;
  let result = obj.temp(...args)
  // 删除 temp 方法
  delete obj.temp
  return result
}

function () {
  var r = bindThis(
    function (a, b) {
      return this.test + a + b
    }, 
    { test: 2 }
  )(2, 3);
  return r === 7;
}

module.exports = call