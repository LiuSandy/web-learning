/**
 * 每个偶数索引对应的元素都大于相邻的元素，即 A[0] > A[1] < A[2] > A[3] < A[4] > ...
 * 每个奇数索引对应的元素都大于相邻的元素，即 A[0] < A[1] > A[2] < A[3] > A[4] < ...=
 */
export default function (nums) {
  const len = nums.length;
  let ans1 = 0, ans2 = 0;
  for (let i = 0; i < len; i++) {
    if (i % 2 === 0) {
      let d1 = 0, d2 = 0
      if (i > 0 && nums[i] >= nums[i - 1]) {
        d1 = nums[i] - nums[i - 1] + 1
      }
      if (i < len - 1 && nums[i] >= nums[i + 1]) {
        d2 = nums[i] - nums[i + 1] + 1
      }
      ans1 += Math.max(d1, d2)
    } else {
      let d1 = 0, d2 = 0
      if (nums[i] >= nums[i - 1]) {
        d1 = nums[i] - nums[i - 1] + 1
      }
      if (i < len - 1 && nums[i] >= nums[i + 1]) {
        d2 = nums[i] - nums[i + 1] + 1
      }
      ans2 += Math.max(d1, d2)
    }

  }
  return Math.min(ans1, ans2)
}