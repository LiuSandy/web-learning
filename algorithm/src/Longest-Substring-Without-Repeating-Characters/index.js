// 第一次 执行 160ms 内存消耗 37.7 MB
export default function (s) {
  let list = []
  let max = 0
  for (let item of s) {
    if(list.includes(item)){
      // 如果存在
      list.splice(list.indexOf(item),list.length)
    }
    list.unshift(item)
    max = Math.max(max,list.length)
  }
  console.log(max,list)
  return max
};

// 示例 执行 64ms
var lengthOfLongestSubstring = function(s) {
  if (!s) {
      return 0
  }
  let left = 0
  let right = 1
  let result = 0
  const len = s.length
  while(right < len) {
      const text = s.substr(left, right - left)
      const index = text.indexOf(s[right])
      if (index >= 0) {
          if (result < right - left) {
              result = right - left
          }
          left = left + index + 1
      }
      ++right
  }
  if (result < right - left) {
      result = right - left
  }
  return result
  
};