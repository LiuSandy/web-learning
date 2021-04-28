/**
 * 633. Sum of Square Numbers
 * 633. 平方数之和
 */
/** 双指针 */
const judgeSquareSum1 = function (c) {
  let a = 0, b = Math.floor(Math.sqrt(c))
  while (a <= b) {
    const result = a * a + b * b
    if (result === c) {
      return true
    }
    if (result > c) {
      b -= 1
    }
    if (result < c) {
      a += 1
    }
  }
  return false
};
/** 暴力循环 */
const judgeSquareSum = function (c) {
  for (let a = 0; a * a <= c; a++) {
    const b = Math.sqrt(c - a * a)
    if (Number.isInteger(b)) {
      return true
    }
  }
  return false
};

const result = judgeSquareSum(5)
console.log(result)