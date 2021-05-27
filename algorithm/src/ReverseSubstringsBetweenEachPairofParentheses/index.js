/**
 * 1190. Reverse Substrings Between Each Pair of Parentheses
 * 1190. 反转每对括号间的子串
 */
const reverseParentheses = function (s) {
  const stack = [];
  let str = ""
  for (let i = 0; i < s.length; i++) {
    const cur = s[i]
    if (cur === "(") {
      stack.push(str)
      str = ""
    } else if (cur === ")") {
      str = str.split("").reverse().join("")
      str = stack[stack.length - 1] + str
      stack.pop()
    } else {
      str += cur
    }
  }

  return str
};

const result = reverseParentheses("(abcd)")
console.log(result)