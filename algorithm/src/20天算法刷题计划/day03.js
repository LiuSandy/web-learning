/**
 * 283. 移动零
 */
const moveZeroes = function (nums) {

  if (!nums || !nums.length) return nums

  for (let i = 0, j = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[i]
      nums[i] = nums[j]
      nums[j++] = temp
    }
  }
  return nums
};

// const result = moveZeroes([0, 1, 0, 3, 12])
// console.log(result)

/**
 * 167. 两数之和 II - 输入有序数组
 */
const twoSum = function (numbers, target) {
  if (!numbers || !numbers.length) return [-1, -1]
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    if (target === numbers[left] + numbers[right]) {
      return [left + 1, right + 1]
    } else if (target > numbers[left] + numbers[right]) {
      left += 1
    } else {
      right -= 1
    }
  }
  return [-1, -1]
};

const result = twoSum([2, 7, 11, 15], 9)
console.log(result)