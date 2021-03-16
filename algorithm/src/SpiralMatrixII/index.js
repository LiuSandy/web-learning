/**
 * 59. Spiral Matrix II
 * 螺旋矩阵 II
 */
const generateMatrix = function (n) {
  const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0))
  // 定义相关属性
  let row = matrix.length - 1,
    column = matrix[0].length - 1,
    r = 0, c = 0, /** 遍历到行和列的索引 */
    curNum = 1; /** 当前数字 */

  while (r <= row && c <= column) {
    // 遍历行数据
    for (let i = c; i <= column; i++) {
      matrix[r][i] = curNum
      curNum++
    }
    // 遍历列数据
    for (let i = r + 1; i <= row; i++) {
      matrix[i][column] = curNum
      curNum++
    }
    if (r < row && c < column) {
      for (let i = column - 1; i > c; i--) {
        matrix[row][i] = curNum
        curNum++
      }
      for (let i = row; i > r; i--) {
        matrix[i][r] = curNum
        curNum++
      }
    }
    r++;
    row--;
    c++;
    column--;

  }
  return matrix
};

generateMatrix(3)
