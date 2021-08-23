/**
 * 1646. Get Maximum in Generated Array
 * 1646. 获取生成数组中的最大值
 * 
 * - nums[0] = 0
 * - nums[1] = 1
 * - 当 2 <= 2 * i <= n 时，nums[2 * i] = nums[i] => nums[i] = num[i/2] => i 为偶数
 * - 当 2 <= 2 * i + 1 <= n 时，nums[2 * i + 1] = nums[i] + nums[i + 1]
 *  => nums[2 * i] = nums[i] + nums[i + 1]
 */
const getMaximumGenerated = function (n) {
  if (n < 2) {
    return n
  }
  const nums = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    if (i < 2) {
      nums[i] = i
    }
    if (2 * i <= n) {
      nums[2 * i] = nums[i]
    }
    if (2 * i + 1 <= n) {
      nums[2 * i + 1] = nums[i] + nums[i + 1]
    }
  }
  return Math.max(...nums)
};

const result = getMaximumGenerated(7)
console.log(result)