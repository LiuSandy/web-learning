/** String to Integer (atoi) */

var myAtoi = function (s) {
  // 结果、索引
  let result = 0, i = 0;
  // 是否是小数
  let flag = 1;
  // 去除前面空格
  const trimS = s.trim()
  // 判断极端情况
  if (!trimS.length) {
    return 0
  }
  // 记录第一个字符
  const firstS = trimS[i];
  if ("+" === firstS) {
    i++
  } else if ("-" === firstS) {
    i++
    flag = -1;
  }

  while (i < trimS.length) {
    const curN = parseInt(trimS[i]);
    // 不合法字符
    if (isNaN(curN)) {
      break
    }

    result = result * 10 + curN;
    if ((result * flag) <= -2147483648 || (result * flag) >= 2147483647) {
      return flag > 0 ? 2147483647 : -2147483648
    }

    i++;
  }
  return result * flag
};