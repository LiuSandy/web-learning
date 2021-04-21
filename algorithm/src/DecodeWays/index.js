/**
 * 91. Decode Ways
 * 91. 解码方法
 * 1. 使用一个数字进行解码 
 */
const numDecodings = function (s) {
  const dp = new Array(s.length + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= s.length; i++) {
    if (s[i - 1] !== '0') {
      dp[i] += dp[i - 1]
    }
    const curNum = ((+s[i - 2]) * 10 + (+s[i - 1]))
    if (i > 1 && s[i - 2] !== '0' && curNum <= 26) {
      dp[i] += dp[i - 2]
    }
  }
  return dp[s.length]
};

const result = numDecodings('12')
console.log(result)