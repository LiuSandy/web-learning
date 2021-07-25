/**
 * 231. 2 的幂
 */

const isPowerOfTwo = function (n) {
  return n > 0 && (n & (n - 1)) === 0
};

/**
 * 191. 位1的个数
 * 位运算 & 运算
 * 1 & 0 = 0
 * 1 & 1 = 1
 */
const hammingWeight = function (n) {
  let count = 0
  for (let i = 0; i < 32; i++) {
    if ((n & (1 << i)) !== 0) {
      count++
    }
  }
  return count
};

const result = hammingWeight(00000000000000000000000000001011)
console.log(result)