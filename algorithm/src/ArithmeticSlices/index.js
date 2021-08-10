/**
 * 413. Arithmetic Slices
 * 413. 等差数列划分
 */
const numberOfArithmeticSlices = function (nums) {
  if (!nums || nums.length < 3) {
    return 0
  }

  let left = 2, poor = nums[1] - nums[0], result = 0
  for (let i = 0; i < nums.length; i++) {
    const curPoor = nums[i] - nums[i - 1]
    if (curPoor === poor) {
      left++
    } else {
      result += (left - 1) * (left - 2) / 2;
      left = 2;
      poor = curPoor
    }
  }
  result += (left - 1) * (left - 2) / 2;
  return result
};

const result = numberOfArithmeticSlices([1, 2, 3, 4])
console.log(result)