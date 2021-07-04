/**
 * 451. Sort Characters By Frequency
 * 451. 根据字符出现频率排序
 */

const frequencySort = function (s) {
  const map = new Map()
  for (const item of s) {
    const count = (map.get(item) || 0) + 1
    map.set(item, count)
  }
  const sortS = [...map.keys()].sort((a, b) => map.get(b) - map.get(a))

  let result = []

  for (const item of sortS) {
    const tempStr = new Array(map.get(item)).fill(item)
    result = result.concat(tempStr)
  }
  return result.join("")
};

const result = frequencySort("tree")
console.log(result)