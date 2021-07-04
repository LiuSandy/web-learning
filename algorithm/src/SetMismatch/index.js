/**
 * 645. Set Mismatch
 * 645. 错误的集合
 */
const findErrorNums = function (nums) {

  const result = []

  const numsSort = nums.sort((a, b) => a - b)
  let prev = 0;
  numsSort.forEach(item => {
    if (prev === item) {
      result[0] = item
    } else if (item - prev > 1) {
      result[1] = item - 1
    }
    prev = item
  })
  const len = numsSort.length
  if (numsSort[len - 1] !== len) {
    result[1] = len
  }

  return result

}

const result = findErrorNums([1, 2, 2, 4])
console.log(result)