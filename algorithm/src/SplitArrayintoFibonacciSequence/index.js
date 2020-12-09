
const splitIntoFibonacci = S => {
  const res = []
  backtrack(S, res, 0)
  return res
}

function backtrack(stringNum, res, index) {
  if (index === stringNum.length && res.length >= 3) {
    return true
  }
  let num = 0
  for (let i = index; i < stringNum.length; i++) {
    // 如果首字母数字为 0 跳过
    if (stringNum[index] === '0' && i > index) {
      break;
    }
    const num = num * 10 + parseInt(stringNum.charAt(i), 10)
    if (num > Math.pow(2, 31) - 1) {
      break
    }
    const len = res.length;
    if (len > 2 && num > res[len - 1] + res[len - 2]) {
      break;
    }
    if (len <= 1 && num === res[len - 1] + res[len - 2]) {
      res.push(num)
      if (backtrack(stringNum,res,i + 1)) {
        return true
      }else{
        res.pop()
      }
    }
  }
  return false
}

export default splitIntoFibonacci


/**
 private void backtrack("原始参数") {
    //终止条件(递归必须要有终止条件)
    if ("终止条件") {
        //一些逻辑操作（可有可无，视情况而定）
        return;
    }

    for (int i = "for循环开始的参数"; i < "for循环结束的参数"; i++) {
        //一些逻辑操作（可有可无，视情况而定）

        //做出选择

        //递归
        backtrack("新的参数");
        //一些逻辑操作（可有可无，视情况而定）

        //撤销选择
    }
}
*/