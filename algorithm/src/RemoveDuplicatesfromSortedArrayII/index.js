/**
 * Remove Duplicates from Sorted Array II
 * 80. 删除有序数组中的重复项 II
 * 输入：nums = [1,1,1,2,2,3]
 * 输出：5, nums = [1,1,2,2,3]
 */
const removeDuplicates = function (nums) {
  if (!nums || nums.length < 3) {
    return nums.length
  }
  let left = 2, right = 2;
  while (right < nums.length) {
    if (nums[left - 2] !== nums[right]) {
      nums[left] = nums[right]
      left++
    }
    right++
  }

  return left
};

const result = removeDuplicates([1, 1, 1, 2, 2, 3])
console.log(result)