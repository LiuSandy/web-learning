/**
 * 5. Longest Palindromic Substring
 * 5. 最长回文子串
 */
const longestPalindrome = function (s) {
  // 如果长度小于2 
  const length = s.length
  if (length < 2) return s
  const dp = new Array(length).fill(true).map(() => new Array(length).fill(true))
  let start = 0, end = 1;
  for (let L = 2; L <= length; L++) {
    for (let i = 0; i < length; i++) {
      const j = L + i - 1
      if (j >= length) break
      if (s[i] !== s[j]) {
        dp[i][j] = false
      } else {
        if (j - i < 3) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }
      if (dp[i][j] && j - i + 1 > end) {
        start = i
        end = j - i + 1
      }
    }
  }
  return s.substring(start, start + end)
};

const result = longestPalindrome("cbbd")
console.log(result)