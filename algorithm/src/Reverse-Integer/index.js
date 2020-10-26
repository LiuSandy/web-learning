// 执行 108 ms 消耗内存 36.2 MB
export default function (x) {
  const strX = x.toString()
  let result = ""
  if (!isNaN(strX[0])) { // 第一个数是数字
    result = getStrList(strX)
  } else {
    const symbol = strX[0]
    const otherStr = strX.slice(1)
    result = `${symbol}${getStrList(otherStr)}`
  }
  result = parseInt(result)
  if (result > -2147483648 && result < 2147483647) {
    return result
  } else {
    return 0
  }
}

function getStrList(str) {
  const strList = []
  for (let s of str) {
    strList.unshift(s)
  };
  return strList.join("")
}

// 示例代码

var reverse = function(x) {
  const isNegative = x < 0; // false是x负数 true表示正数
  //parseInt(string,radix)
// string	必需。要被解析的字符串。
// radix	
// 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

// 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。

// 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
  let reverseX = parseInt(x.toString().split('').reverse().join(''),10);
  if(isNegative) reverseX = -reverseX;
  //Math.pow(x,y) x是底数必须的，y是幂数必须的
  if(reverseX > Math.pow(2,31) - 1 || reverseX < Math.pow(-2,31)) return 0
  return reverseX;
};