/**
 * 剑指 Offer 10- II. 青蛙跳台阶问题
 * 动态规划，寻找边界 f(0) = 1, f(1) = 1 
 * 公式 f(n) = f(n-1) + f(n-2)
 */

const numWays = function (n) {
  let [a, b] = [1, 1]
  for (let i = 0; i < n; i++) {
    [a, b] = [b, (a + b) % 1000000007]
  }
  return a
};

const result = numWays(78)
console.log(result)