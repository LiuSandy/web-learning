/**
 * 227. Basic Calculator II
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 * 整数除法仅保留整数部分。
 * + - * /
 */

const calculate = s => {
  const stack = [];
  let curSign = "+";/* 当前计算符号 */
  const n = s.length;
  let num = 0;
  for (let i = 0; i < n; i++) {
    const cur = s[i];
    const curNum = Number(cur)
    // 如果是数字
    if (!isNaN(curNum) && cur !== ' ') {
      // * 10 体现在进位，在符号位是重置为0，重新计算当前值
      num = num * 10 + curNum;
    }

    // 非数字情况
    if (isNaN(curNum) || i === n - 1) {
      switch (curSign) {
        case "+":
          stack.push(num)
          break;
        case "-":
          stack.push(-num)
          break;
        case "*":
          stack.push(stack.pop() * num)
          break
        default:
          stack.push(parseInt(stack.pop() / num || 0))
          break
      }
      curSign = cur
      num = 0
    }
  }
  let result = 0
  console.log(stack)
  while (stack.length > 0) {
    result += stack.pop()
  }
  return result
}

console.log(calculate("14-3/2"))