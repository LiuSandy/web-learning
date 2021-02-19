export default function (x) {
  // 判断特殊值
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false
  }
  // 记录翻转后的数字
  let reverseNum = 0;
  while (x > reverseNum) {
    const temp = x % 10
    reverseNum = reverseNum * 10 + temp;
    // 更新X
    x = Math.floor(x / 10)
  }

  return x === reverseNum || x === Math.floor(x / 10);
}