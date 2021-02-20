/**
 * 从左侧截取，获取剩余数组
 * @param {Array} arr 
 * @param {Number} size 
 */
function drop(arr, size) {
  // 过滤原数组，返回新数组
  return arr.filter((item, index) => index >= size)
}
/**
 * 从右侧截取，获取剩余数组
 * @param {Array} arr 
 * @param {Number} size 
 */
function dropRight(arr, size) {
  return arr.filter((item, index) => index < arr.length - size)
}

module.exports = {
  drop,
  dropRight
}