function reduce(arr, callback, initValue) {
  // 定义变量接受结果,如果不存在使用数组的第一个值
  let result = initValue || arr[0];

  const startIndex = !!initValue ? 0 : 1

  for (let i = startIndex; i < arr.length; i++) {
    result = callback(result, arr[i], i)
  }
  return result
}


module.exports = reduce
