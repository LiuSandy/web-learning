/**
 *  二维数组中的查找 LCOF
 */
const findNumberIn2DArray1 = function (matrix, target) {
  const binarySearch = (arr, target) => {
    let left = 0, right = arr.length - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (arr[mid] === target) {
        return true
      } else if (arr[mid] > target) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return false
  }
  for (let i = 0; i < matrix.length; i++) {
    if (binarySearch(matrix[i], target)) {
      return true
    }
  }
  return false
};

const findNumberIn2DArray = (matrix, target) => {
  let i = matrix.length - 1, j = 0;
  while (i >= 0 && j < matrix[0].length) {
    if (matrix[i][j] === target) {
      return true
    } else if (matrix[i][j] > target) {
      i -= 1
    } else {
      j += 1
    }
  }

  return false
}


const result = findNumberIn2DArray([
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 5)
console.log(result)