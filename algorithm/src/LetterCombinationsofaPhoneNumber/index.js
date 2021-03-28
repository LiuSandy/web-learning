
// 执行用时：64ms 内存消耗 33.7MB
// export default function (digits) {
//     const dict = {
//         '2': ['a', 'b', 'c'],
//         '3': ["d", "e", "f"],
//         '4': ["g", "h", "i"],
//         '5': ["j", "k", "l"],
//         '6': ["m", "n", "o"],
//         '7': ["p", "q", "r", "s"],
//         '8': ["t", "u", "v"],
//         '9': ["w", "x", "y", "z"],
//     }
//     const strDigits = digits.toString()
//     let outPut = []
//     function backtrack(combination, next_digits) {
//         if (next_digits.length === 0) {
//             outPut.push(combination)
//         } else {
//             const digit = next_digits[0]
//             for (const item of dict[digit]) {
//                 backtrack(combination + item, next_digits.slice(1))
//             }
//         }
//     }
//     if (digits) {
//         backtrack("", strDigits)
//     }
//     return outPut;
// }

const letterCombinations = (digits) => {
  const mapping = {
    '2': ['a', 'b', 'c'],
    '3': ["d", "e", "f"],
    '4': ["g", "h", "i"],
    '5': ["j", "k", "l"],
    '6': ["m", "n", "o"],
    '7': ["p", "q", "r", "s"],
    '8': ["t", "u", "v"],
    '9': ["w", "x", "y", "z"],
  }
  const strDigits = digits.toString();
  if (!strDigits) {
    return []
  }

  const result = []
  const backtrack = (combination, currentDigits) => {
    console.log(combination,"->",currentDigits)
    if (!currentDigits.length) {
      result.push(combination)
    } else {
      const cur = currentDigits[0]
      for (const item of mapping[cur]) {
        backtrack(combination + item, currentDigits.slice(1))
      }
    }
  }

  backtrack("", strDigits.split(""))
  return result
}

const result = letterCombinations(23)
console.log(result)