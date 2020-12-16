/**
 * 32. 最长有效括号
 * 需要连续
 * @param {*} s 
 */
export default function (s) {
  if (!s) {
    return 0
  }
  const stack = [-1]
  let i = 0;
  let max = 0
  // 判断有效括号对
  while (i < s.length) {
    const curentChart = s[i]
    if (currentChart === "(") {
      stack.push(i)
    } else {
      stack.pop()
      if (!stack.length) {
        stack.push(i)
      } else {
        max = Math.max(max, i - stack[stack.length-1])
      }
    }
  }
  return max
}