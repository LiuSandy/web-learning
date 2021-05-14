/**
 * 12. Integer to Roman
 * 12. 整数转罗马数字
 */

const intToRoman = function (num) {

  const list = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ]
  const result = []
  for (const [key, value] of list) {
    while (num >= value && num > 0) {
      num -= value
      result.push(key)
    }
  }
  return result.join("")
};
const result = intToRoman(4)
console.log(result)