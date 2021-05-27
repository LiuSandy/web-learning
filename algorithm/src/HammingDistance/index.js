/**
 * 461. Hamming Distance
 * 461. 汉明距离
 */
const hammingDistance = function (x, y) {
  let s = x ^ y;
  let count = 0;
  while (s !== 0) {
    count += s & 1
    s >>= 1
  }
  return count
};
const result = hammingDistance(1, 4)
console.log(result)