/**
 * 861. 翻转矩阵后的得分
 * 首列为 0 则翻转该行
 */
const matrixScore = A => {
  const m = A.length, n = A[0].length;
  const temp = A;

  // 行
  for (let i = 0; i < m; i++) {
    if (!temp[i][0]) {
      // 列
      for (let j = 0; j < n; j++) {
        temp[i][j] = 1 - temp[i][j]
      }
    }
  }

  for (let j = 0; j < n; j++) {
    let noZore = 0
    for (let i = 0; i < m; i++) {
      noZore += temp[i][j]
    }
    if (m - noZore > noZore) {
      // 翻转列
      for (let i = 0; i < m; i++) {
        temp[i][j] = 1 - temp[i][j]
      }
    }
  }
  // 计算
  let result = 0
  let total = 0
  for (let j = 0; j < n; j++) {
    result = Math.pow(2, n - j - 1)
    for (let i = 0; i < m; i++) {
      total += temp[i][j] * result
    }
  }
  return total
}

export default matrixScore