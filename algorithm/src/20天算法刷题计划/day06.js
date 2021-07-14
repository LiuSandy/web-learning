/**
 * 3. 无重复字符的最长子串
 */
const lengthOfLongestSubstring1 = function (s) {
  // 双指针解法
  let left = -1, right = 0, max = 0;
  const map = {}
  while (right < s.length) {
    const cur = s[right]
    if (map[cur] >= 0) {
      left = Math.max(left, map[cur])
    }
    map[cur] = right
    max = Math.max(max, right - left)
    right++
  }
  return max
};

const lengthOfLongestSubstring = function (s) {
  // 滑动窗口解法
  const list = [];
  let max = 0
  for (const item of s) {
    if (list.includes(item)) {
      list.splice(0, list.indexOf(item) + 1)
    }
    list.push(item)
    max = Math.max(max, list.length)
  }
  return max
};
// const result = lengthOfLongestSubstring('abcabcbb')
// console.log(result)

/**
 * 567. 字符串的排列
 */

const checkInclusion = function (s1, s2) {

  return false
};

const result = checkInclusion('ab', 'eidbaooo')
console.log(result)