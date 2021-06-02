/**
 * 523. 连续的子数组和
 * 
 * 遍历每一个元素，记录当前元素的和，如果当前元素减去前面某一个元素差值是k的倍数 True
 * 所以记录和对k取余，{remainder:index}
 * 
 */
const checkSubarraySum = function (nums, k) {
  const map = new Map()
  map.set(0, -1)
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (k !== 0) {
      sum %= k
    }

    if (map.has(sum) && i - map.get(sum) > 1) {
      return true
    }
    if (!map.has(sum)) {
      map.set(sum, i)
    }
  }
  return false
};

const result = checkSubarraySum([23, 2, 4, 6, 7], 6)
console.log(result)