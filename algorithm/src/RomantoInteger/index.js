/**
 * 13. Roman to Integer
 * 13. 罗马数字转整数
 */

const romanToInt = function (s) {
  const map = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
  }
  let result = 0
  for (let i = 0; i < s.length; i++) {
    const value = map[s[i]]
    if (i < s.length - 1 && value < map[s[i + 1]]) {
      result -= value
    } else {
      result += value
    }
  }
  return result
};

const result = romanToInt("IV")
console.log(result)