const setZeroes = matrix => {
  const m = matrix.length, n = matrix[0].length
  const copy_rows = new Array(m).fill(false);
  const copy_columns = new Array(n).fill(false)

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        copy_rows[i] = copy_columns[j] = true
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (copy_rows[i] || copy_columns[j]) {
        matrix[i][j] = 0
      }
    }
  }
  return matrix
};
