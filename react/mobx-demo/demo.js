const numeral = require('numeral');

const divideNum = num => !num ? 0 : numeral(num).divide(100)

const customToFixed = (num, scale = 2) => {
  const dec = scale > 0 ? `0.${'0' * scale}` : '0'
  return num.format(dec)
}

function formatNum(num) {

  return numeral(num).divide(100).format('0,000.00')
}
// const r = formatNum(divideNum(123))
// console.log(r)
// const r = parseInt(fun(123).toFixed('0'), 10)
// console.log(numeral(123).divide(100).value().format('0.00'))
// console.log(Array(0).fill(0).join(''))
function toCent(value) {
  // 解决浮点数计算bug
  return numeral(value).multiply(100).value()
}

function toYuan(value, precision = 2) {

  value = parseFloat(value);
  return parseFloat((value / 100).toFixed(precision));
}
const a = 8
const list = [1, 2, 3, a > 10 ? 4 : 0]

console.log(list)