/**
 * Find Minimum in Rotated Sorted Array
 * 153. 寻找旋转排序数组中的最小值
 */

const findMin = function (nums) {
  let left = 0, right = nums.length - 1
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] < nums[right]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return nums[left]
};

const result = findMin([4,5,6,7,0,1,2])
console.log(result)