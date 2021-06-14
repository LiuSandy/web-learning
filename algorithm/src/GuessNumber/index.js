/**
 * 374. 猜数字大小
 */
const target = 6
const guess = (num) => {
  if (num === target) {
    return 0
  }
  if (num < target) {
    return 1
  }
  return -1
}

const guessNumber = function (n) {
  let left = 0, right = n;
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (guess(mid) > 0) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left
};

const result = guessNumber(10)
console.log(result)