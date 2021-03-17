/**
 * 115. Distinct Subsequences
 * 115. 不同的子序列
 * 动态方程
 * 当 s[i]===t[j] dp[i][j] = dp[j-1][i-1] + dp[j][i-1]
 * 当 s[i]!==t[j] dp[i][j] = dp[j][i-1]
 */

const numDistinct = function (s, t) {
  const m = s.length, n = t.length;
  if (m < n) return 0
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
  for (let i = 0; i <= m; i++) {
    dp[0][i] = 1
  }
  for (let j = 1; j < n + 1; j++) {
    for (let i = 1; i < m + 1; i++) {
      if (s[i - 1] === t[j - 1]) {
        dp[j][i] = dp[j - 1][i - 1] + dp[j][i - 1]
      } else {
        dp[j][i] = dp[j][i - 1]
      }
    }
  }
  return dp[n][m]
};

const result = numDistinct("bab", 'b')
console.log(result)