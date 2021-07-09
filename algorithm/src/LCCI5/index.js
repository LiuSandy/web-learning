/**
 * 面试题 17.10. Find Majority Element LCCI
 * 面试题 17.10. 主要元素
 */

const majorityElement = function (nums) {

  const map = new Map();
  const half = Math.floor(nums.length / 2);
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
    count = Math.max(count, map.get(nums[i]))
    if (count >= half) {
      return nums[i]
    }
  }
  return -1
};

const result = majorityElement([1, 2, 5, 9, 5, 9, 5, 5, 5])
console.log(result)