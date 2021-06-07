/**
 * 494. Target Sum
 * 494. 目标和
 */

const findTargetSumWays = function (nums, target) {
  // 计算 nums 和
  const sum = nums.reduce((acc, cur) => acc + cur, 0)

  // 设 负数和为x 则正数和为 sum - x；因此 (sum-x) - x = target
  // 所以 x = (sum - target) / 2
  const diff = sum - target
  if (diff < 0 || diff % 2 !== 0) {
    return 0
  }

  const n = nums.length, neg = diff / 2;
  const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }
  return dp[n][neg];
};

const result = findTargetSumWays([1, 1, 1, 1, 1], 3)
console.log(result)