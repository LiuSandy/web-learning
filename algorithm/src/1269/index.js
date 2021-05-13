/**
 * 1269. Number of Ways to Stay in the Same Place After Some Steps
 * 1269. 停在原地的方案数
 * 1. 方程 dp[i][j] = dp[i-1][j-1] + dp[i-1][j] + dp[i-1][j+1]
 * 2. 边界 dp[0][0] = 1 dp[0][j] = 0
 */

const numWays = function (steps, arrLen) {
  const mod = Math.pow(10, 9) + 7;
  const length = Math.min(arrLen - 1, steps)
  const dp = new Array(steps + 1).fill(0).map(() => new Array(length + 1).fill(0))
  dp[0][0] = 1
  for (let i = 1; i <= steps; i++) {
    for (let j = 0; j <= length; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j - 1 >= 0) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % mod;
      }
      if (j + 1 <= length) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j + 1]) % mod;
      }
    }
  }
  return dp[steps][0]
};

const result = numWays(3, 2)
console.log(result)