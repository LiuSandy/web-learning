/**
 * 150 Evaluate Reverse Polish Notation
 * 150. 逆波兰表达式求值
 */

const evalRPN = function (tokens) {
  const stack = []
  let i = 0;
  while (i < tokens.length) {
    const cur = tokens[i]

    if (cur === "+") {
      stack.push(Number(stack.pop()) + Number(stack.pop()))
    } else if (cur === "-") {
      const first = Number(stack.pop())
      const second = Number(stack.pop())
      stack.push(second - first)
    } else if (cur === "*") {
      stack.push(Number(stack.pop()) * Number(stack.pop()))
    } else if (cur === "/") {
      // 需要注意
      const first = Number(stack.pop())
      const second = Number(stack.pop())
      const result = second / first
      stack.push(result > 0 ? Math.floor(result) : Math.ceil(result))

    } else {
      stack.push(Number(cur))
    }
    i++
  }
  return stack.pop()
};

const result = evalRPN(["4", "-2", "/", "2", "-3", "-", "-"])
console.log(result)