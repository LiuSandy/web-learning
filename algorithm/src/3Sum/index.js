function threeSum1(nums) {
  // 先判空
  if (nums && !nums.length) return []
  // 排序
  nums.sort((a, b) => a - b)
  // 最小最大下标,结果集
  const len = nums.length
  const res = []
  for (let i = 0; i < len; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) { continue };
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const result = nums[i] + nums[L] + nums[R]
      if (L === i) {
        L++
      } else if (R === i) {
        R--
      } else if (result === 0) {
        res.push([nums[i], nums[L], nums[R]])
        while (nums[L] === nums[L + 1]) {
          L++
        }
        L++
        while (nums[R] === nums[R - 1]) {
          R--
        }
        R--
      } else if (result > 0) {
        R--
      } else {
        L++
      }
    }
  }

  return res;
}

const threeSum = nums => {
  if (!nums || !nums.length) return []
  nums.sort((a, b) => a - b)
  let i = 0;
  const len = nums.length;
  const result = []

  while (i < len) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      i++
      continue
    }
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]])
        // 判断重复字段
        while (nums[left] === nums[left + 1]) {
          left++
        }
        while (nums[right] === nums[right - 1]) {
          right--
        }
        left++
        right--
      } else if (sum < 0) {
        left++
      } else {
        right--
      }
    }
    i++
  }
  return result
}

const result = threeSum([-1, 0, 1, 2, -1, -4])
console.log(result)