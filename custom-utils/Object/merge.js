/**
 * 合并多个对象
 * @param  {...any} args 参数对象
 */
function merge(...args) {
  // 定义结果对象
  let result = {}
  args.forEach(obj => {
    // 变量对象
    Object.keys(obj).forEach(key => {
      // 判断结果对象中是否存在
      if (result.hasOwnProperty(key)) {
        result[key] = [].concat(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    })
  })
  return result
}

module.exports = merge