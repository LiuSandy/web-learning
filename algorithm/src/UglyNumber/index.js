/**
 * 263. Ugly Number
 * 263. 丑数
 */
const isUgly = n => {
  if (n < 1) {
    return false
  }
  const factors = [2, 3, 5];
  for (const item of factors) {
    while (n % item === 0) {
      n = parseInt(n / item, 10)
    }
  }
  return n === 1
}

const result = isUgly(7)
console.log(result)