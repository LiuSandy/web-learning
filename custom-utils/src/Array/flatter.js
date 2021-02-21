/**
 * [1,2,3,[4,[5,6]],7]
 * @param {Array} arr 
 */
function flatter(arr) {
  // 定义结果变量
  let result = []

  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatter(item))
    } else {
      result = result.concat(item)
    }
  })
  return result
}

function flatter2(arr) {
  // 定义结果变量 复制
  let result = [...arr]
  // 判断数组里面是否还具有子数组
  while (result.some(item=>Array.isArray(item))) {
    result = [].concat(...result)
  }
  return result
}

module.exports = flatter2