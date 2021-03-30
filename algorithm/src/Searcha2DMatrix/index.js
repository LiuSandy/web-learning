/**
 * Search a 2D Matrix
 * 74. 搜索二维矩阵
 */
const searchMatrix = function (matrix, target) {
  // 定义 行 列
  const m = matrix.length, n = matrix[0].length
  let arr = []
  for (let i = 0; i < m; i++) {
    const [min, max] = [matrix[i][0], matrix[i][n - 1]]
    if (min <= target && max >= target) {
      arr = matrix[i]
      break
    }
  }
  if (arr.length > 0) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return true
      } else if (arr[mid] > target) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
  }
  return false
};

const result = searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13)
console.log(result)