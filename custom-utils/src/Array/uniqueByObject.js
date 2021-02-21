function uniqueByObject(arr) {
  // 声明数组对象
  const result = [];
  // 声明空对象
  const obj = {}

  arr.forEach(item => {
    if (!obj[item]) {
      obj[item] = true
      result.push(item)
    }
  });
  return result
}

module.exports = uniqueByObject