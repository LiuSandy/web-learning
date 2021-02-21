/**
 * 
 * @param {Array} arr 
 * @param {Number} begin 截取字符串开始位置
 * @param {Number} end 截取字符串结束位置
 * @returns 返回一个新的数组
 */
function slice(arr, begin, end) {
  // 特殊值判断
  if (!arr.length) {
    return []
  }
  // 如果begin 为undefined 默认为0
  begin = begin || 0
  if (begin > arr.length) {
    return []
  }

  end = end || arr.length
  if (end < begin) {
    end = arr.length
  }

  // 定义数组变量
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (i >= begin && i < end) {
      result.push(arr[i])
    }
  }
  return result
}

module.exports = slice