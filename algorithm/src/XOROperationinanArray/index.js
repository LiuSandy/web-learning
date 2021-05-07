/**
 * 1486. XOR Operation in an Array
 * 1486. 数组异或操作
 */

const xorOperation = function (n, start) {
  let result = 0
  for (let i = 0; i < n; i++) {
    result ^= (start + 2 * i)
  }
  return result
};

const result = xorOperation(4,3)
console.log(result)