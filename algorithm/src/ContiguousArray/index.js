/**
 * 525 Contiguous Array
 * 525. 连续数组
 */
const findMaxLength = function (nums) {

  const map = new Map()
  map.set(0, -1)
  let maxLength = 0, cur = 0
  for (let i = 0; i < nums.length; i++) {
    nums[i] === 0 ? cur-- : cur++
    if (map.has(cur)) {
      maxLength = Math.max(maxLength, i - map.get(cur))
    } else {
      map.set(cur, i)
    }
  }
  return maxLength
}

const result = findMaxLength([0, 1])
console.log(result)