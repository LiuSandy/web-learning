/**
 * 190. 颠倒二进制位
 */
const reverseBits = function (n) {
  let result = 0;
  for (let i = 0; i < 32 && n > 0; ++i) {
    result |= (n & 1) << (31 - i);
    n >>>= 1;
  }
  return result >>> 0
};

/**
 * 136. 只出现一次的数字
 */
const singleNumber = function (nums) {
  const map = new Map()
  for (const num of nums) {
    if (!map.get(num)) {
      map.set(num, 1)
    } else {
      map.delete(num)
    }
  }
  return [...map.keys()][0]
};

const result = singleNumber([4, 1, 2, 1, 2])
console.log(result)