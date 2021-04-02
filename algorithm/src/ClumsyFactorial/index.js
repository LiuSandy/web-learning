/**
 * Clumsy Factorial
 * 1006. 笨阶乘
 * * / + -
 */
const clumsy = function (N) {
  const stack = [N--]
  let index = 0
  while (N > 0) {
    if (index % 4 === 0) {
      stack.push(stack.pop() * N)
    } else if (index % 4 === 1) {
      const curNum = stack.pop()
      stack.push(curNum > 0 ? Math.floor(curNum / N) : Math.ceil(curNum / N))
    } else if (index % 4 === 2) {
      stack.push(N)
    } else {
      stack.push(-N)
    }
    index++
    N--
  }
  let result = 0
  for (const item of stack) {
    result += item
  }
  return result
};

const result = clumsy(4)
console.log(result)

const factorial = function (n) {
  if (n <= 1) {
    return 1
  }
  return n * factorial(n - 1)
}

