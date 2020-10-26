/**
 * How Many Numbers Are Smaller Than the Current Number
 */
const smallerNumbersThanCurrent = nums => {
  const max = Math.max(...nums);
  const cnt = new Array(max).fill(0);

  for (const item of nums) {
    cnt[item] = cnt[item] + 1
  }

  for (let i = 1; i <= max; i++) {
    cnt[i] += cnt[i - 1]
  }
  const result = []
  for (let i = 0; i < nums.length; i++) {
    result.push(nums[i] ? cnt[nums[i] - 1] : 0);
  }
  return result
}