/**
 * 33. 搜索旋转排序数组
 */
const search = (nums, target) => {
  if (!nums || !nums.length) return -1;
  let l = 0, r = nums.length - 1;

  while (l < r) {
    let mid = Math.floor((l + r) / 2)
    if (target === nums[mid]) return mid;
    if (nums[0] <= nums[mid]) {
      if (nums[0] <= target && target < nums[mid]) {
        r = mid - 1
      } else {
        l = mid + 1
      }
    } else {
      if (nums[mid] < target && target < nums[nums.length - 1]) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    }
  }
  return -1
}