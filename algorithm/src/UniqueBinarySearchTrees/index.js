/**
 * 95. Unique Binary Search Trees
 * 95. 不同的二叉搜索树
 * G(0) = 1
 * G(1) = 1
 * G(2) = G(0) * G(1) + G(1) * G(0)
 */
const numTrees = function (n) {
  const result = new Array(n + 1).fill(0)
  result[0] = 1
  result[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      result[i] += result[j - 1] * result[i - j]
    }
  }
  return result[n]
};

const result = numTrees(3)
console.log(result)