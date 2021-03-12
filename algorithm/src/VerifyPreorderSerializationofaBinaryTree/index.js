/**
 * 331. 验证二叉树的前序序列化
 * "9,3,4,#,#,1,#,#,2,#,6,#,#"
 * 使用栈
 */
const isValidSerialization1 = preorder => {
  const n = preorder.length;
  const stack = [1];
  let i = 0;
  const getStackTopValue = () => stack[stack.length - 1];
  while (i < n) {
    if (!stack.length) {
      return false
    }
    if (preorder[i] === ',') {
      ++i
    } else if (preorder[i] === "#") {
      stack[stack.length - 1]--
      if (getStackTopValue() === 0) {
        stack.pop()
      }
      ++i
    } else {
      stack[stack.length - 1]--
      if (getStackTopValue() === 0) {
        stack.pop()
      }
      stack.push(2)
      ++i
    }
  }
  return !stack.length
};
// 计数方式
const isValidSerialization = preorder => {
  const preorderArr = preorder.split(",") // 转化为数组，减少判断
  const n = preorderArr.length;
  let num = 1;
  let i = 0;
  while (i < n) {
    if (!num) {
      return false
    }
    if (preorderArr[i] === "#") {
      num-=1
      ++i
    } else {
      num += 1
      ++i
    }
  }
  return num === 0
};

const result = isValidSerialization("9,#,92,#,#")
console.log(result)