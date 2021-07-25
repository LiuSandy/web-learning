/**
 * 1743. Restore the Array From Adjacent Pairs
 * 1743. 从相邻元素对还原数组
 */

const restoreArray = function (adjacentPairs) {
  // 1. 设置 hash 表保存每个元素相邻的元素都有那些
  const map = new Map()
  for (const adjacentPair of adjacentPairs) {
    const [key, value] = adjacentPair
    map.set(key, [...(map.get(key) || []), value])
    map.set(value, [...(map.get(value) || []), key])
  }
  // 找到相邻元素数量为 1 的元素，那么他要么是第一个元素，要么是最后一个元素
  // 2. 把他设置为第一个元素
  const result = []
  for (const [key, value] of map.entries()) {
    if (value.length === 1) {
      result[0] = key
      break
    }
  }
  // 3. 找到第一个元素相邻的元素，把他设置为第二个元素
  result[1] = map.get(result[0])[0]
  // 4. 循环
  for (let i = 2; i <= adjacentPairs.length; i++) {
    const nextValue = map.get(result[i - 1])
    // 一个元素最多只能相邻两个元素
    const [first, second] = nextValue
    result[i] = result[i - 2] === first ? second : first
  }
  return result
};

const result = restoreArray([[2, 1], [3, 4], [3, 2]])
console.log(result)