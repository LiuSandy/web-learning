/**
 * 977. 有序数组的平方
 */
const sortedSquares = function (nums) {
  // 1. 先统计正数开始位置
  const len = nums.length;
  let positive = 0;
  while (positive < len && nums[positive] < 0) {
    positive++
  }
  // 2. 负数结束的位置
  let minus = positive - 1
  // 3. 开始循环比较大小
  const result = []
  while (minus >= 0 && positive < len) {
    if (nums[minus] * nums[minus] < nums[positive] * nums[positive]) {
      result.push(nums[minus] * nums[minus])
      minus--
    } else {
      result.push(nums[positive] * nums[positive])
      positive++
    }
  }
  while (minus >= 0) {
    result.push(nums[minus] * nums[minus])
    minus--
  }
  while (positive < len) {
    result.push(nums[positive] * nums[positive])
    positive++
  }
  return result
};

// const result = sortedSquares([-4, -1, 0, 3, 10])
// console.log(result)

/**
 * 189. 旋转数组
 */
const rotate = function (nums, k) {
  const len = nums.length
  const step = k % len
  for (let i = 0; i <= step; i++) {
    nums.unshift(nums.pop())
  }
  return nums
};

const result = rotate([1, 2, 3, 4, 5, 6, 7], 3)
console.log(result)