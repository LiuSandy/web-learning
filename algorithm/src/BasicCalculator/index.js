/**
 * Basic Calculator
 * 224. 基本计算器
 * 栈 保存 括号内容
 * 0 - 9 + - () 空格
 */
const calculate = s => {
  let sign = 1; // + 1, - -1
  let result = 0; // 结果值
  const stack = [1];// 计算栈
  let i = 0; // 索引
  const n = s.length;
  while (i < n) {
    const cur = s[i]
    if (cur === ' ') {
      i++
    } else if (cur === "+") {
      sign = stack[stack.length - 1]
      i++;
    } else if (cur === '-') {
      sign = -stack[stack.length - 1]
      i++
    } else if (cur === "(") {
      stack.push(sign)
      i++
    } else if (cur === ")") {
      stack.pop()
      i++
    } else {
      let num = 0
      while (i < n && !isNaN(Number(s[i])) && s[i] !== " ") {
        num = num * 10 + Number(s[i]);
        i++;
      }
      result += sign * num
    }
  }
  return result
};

console.log(calculate("1 + 1"))