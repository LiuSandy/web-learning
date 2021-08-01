/**
 * 1337. The K Weakest Rows in a Matrix
 * 1337. 矩阵中战斗力最弱的 K 行
 */
const kWeakestRows = function (mat, k) {
  const sum = arr => arr.reduce((acc, cur) => acc + cur, 0)

  const sumRows = mat.map((item, index) => ({ index, sum: sum(item) }))

  const sortRows = sumRows.sort((a, b) => a.sum - b.sum)

  return sortRows.slice(0, k).map(item => item.index)

};

const result = kWeakestRows([[1, 1, 0, 0, 0],
[1, 1, 1, 1, 0],
[1, 0, 0, 0, 0],
[1, 1, 0, 0, 0],
[1, 1, 1, 1, 1]], 3)
console.log(result)