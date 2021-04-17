/**
 * 220. Contains Duplicate III
 * 220. 存在重复元素 III
 */
const containsNearbyAlmostDuplicate = function (nums, k, t) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i]
    const id = Math.floor(nums[i] / (t + 1))
    // 在桶内
    if (map.has(id)) {
      return true
    }
    map.set(id, cur)
    // 遍历相邻桶
    if (map.has(id - 1) && Math.abs(cur - map.get(id - 1)) <= t) {
      return true
    }
    if (map.has(id + 1) && Math.abs(cur - map.get(id + 1)) <= t) {
      return true
    }
    if (i >= k) {
      map.delete(Math.floor(nums[i - k] / (t + 1)))
    }
  }
  return false
};

const result = containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3)

console.log(result)