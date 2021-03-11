/** 766. 托普利茨矩阵 */
var isToeplitzMatrix = function (matrix) {
  // 获取行和列的长度
  const row = matrix.length, col = matrix[0].length;
  // 循环判断从 数组的1,1 开始循环
  for (let r = 1; r < row; r++) {
    for (let c = 1; c < col.length; c++) {
      if (matrix[r][c] !== matrix[r - 1][c - 1]) {
        return false;
      }
    }
  }
  return true
};