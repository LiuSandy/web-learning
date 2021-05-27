/**
 * 461. Hamming Distance
 * 461. 汉明距离
 * 在信息论中，两个等长字符串之间的『汉明距离』（英语：Hamming distance）
 *  是两个字符串对应位置的不同字符的个数。
 *  换句话说，它就是将一个字符串变换成另外一个字符串所需要替换的字符个数。
 * 『汉明重量』是字符串相对于同样长度的零字符串的汉明距离，
 *    也就是说，它是字符串中非零的元素个数：
 *    对于二进制字符串来说，就是1的个数，所以11101的汉明重量是4
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