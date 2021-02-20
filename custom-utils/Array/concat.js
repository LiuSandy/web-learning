/**
 * 
 * @param {Array} arr 
 * @param  {...any} args 
 * @returns 返回一个新的数组
 */
function concat(arr, ...args) {
  // 定义变量接受结果
  const result = [...arr]
  args.forEach(item => {
    // 判断item是否为数组
    if (Array.isArray(item)) {
      result.push(...item)
    } else {
      result.push(item)
    }
  })
  return result
}

module.exports = concat