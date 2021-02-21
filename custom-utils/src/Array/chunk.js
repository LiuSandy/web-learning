function chunk(arr, size = 1) {
  if (!arr.length) {
    return []
  }
  // 定义两个变量，分别作为子数组和结果数组
  const result = [];
  let temp = [];
  arr.forEach(item => {
    if (temp.length === 0) {
      result.push(temp)
    }
    temp.push(item)
    if (temp.length === size) {
      temp = []
    }
  })
  return result
}

module.exports = chunk