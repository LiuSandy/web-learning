/**
 * 66. plus one
 * 66. 加一
 */
const plusOne = function (digits) {
  // digits.splice(digits.length - 1, 1, digits[digits.length - 1] + 1)
  let i = digits.length - 1;
  while (i >= 0) {
    digits[i]++
    digits[i] = digits[i] % 10;
    if (digits[i] !== 0) return digits;
    i--
  }
  digits.splice(0,0,1);
  return digits

};

const result = plusOne([9])
console.log(result)