/**
 * Search in Rotated Sorted Array II
 * 81. 搜索旋转排序数组 II
 */
const search = function (nums, target) {
  if (!nums || !nums.length) {
    return false
  }
  if (nums.length === 1) {
    return target === nums[0]
  }
  let left = 0, right = nums.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      return true
    }
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left ++
      right --
    }else if (nums[left] <= nums[mid]) {// 左侧有序
      if (nums[left] <= target && nums[mid] > target) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (nums[mid] < target && nums[right] >= target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return false
};

const result = search([1,0,1,1,1],0)
console.log(result)
