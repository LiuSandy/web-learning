function map(arr, callback) {
  // 声明一个空的数组
  let result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i],i))
  }
  return result
}

module.exports = map