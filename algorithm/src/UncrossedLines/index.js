/**
 * 1035. Uncrossed Lines
 * 1035. 不相交的线
 */
const maxUncrossedLines = function (nums1, nums2) {
  const m = nums1.length, n = nums2.length;
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    const num1 = nums1[i - 1];
    for (let j = 1; j <= n; j++) {
      const num2 = nums2[j - 1];
      if (num1 === num2) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
};

const result = maxUncrossedLines([1, 4, 2], [1, 2, 4])
console.log(result)