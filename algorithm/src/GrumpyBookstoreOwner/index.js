/** 1052. 爱生气的书店老板 */

const maxSatisfied = function (customers, grumpy, X) {
  // 最大挽留客户数
  let maxRetainNum = 0;
  // 客户数 本应存在
  let customerNum = 0
  for (let i = 0; i < grumpy.length; i++) {
    if (grumpy[i] === 0) {
      customerNum += customers[i]
    }
  }
  for (let i = 0; i < X; i++) {
    // 第一次可以挽回的客户数
    maxRetainNum += grumpy[i] * customers[i];
  }
  // 当前窗口挽回的客户数
  let curRetainNum = maxRetainNum
  for (let i = X; i < grumpy.length; i++) {
    // 进入窗口的
    // if (grumpy[i] === 1) {
    //   // 此时为生气需要挽回
    //   curRetainNum += customers[i];
    // }
    // if (grumpy[i - X] === 1) {
    //   // 此时为生气需要删除
    //   curRetainNum -= customers[i - X];
    // }
    curRetainNum = curRetainNum + customers[i] * grumpy[i] - customers[i - X] * grumpy[i - X]
    maxRetainNum = Math.max(curRetainNum, maxRetainNum)
  }

  return customerNum + maxRetainNum
};