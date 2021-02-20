
/**
 * 
 * @param {Array} arr 
 */
function unique(arr) {
  // 创建临时变量保存数据
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }

  return result
}

module.exports = unique