/**
 * 542. 01 矩阵
 */
const updateMatrix = function (mat) {
  // 定义数组
  const X = [-1, 1, 0, 0]
  const Y = [0, 0, -1, 1]
  const [m, n] = [mat.length, mat[0].length] // 行 列
  const dist = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 定义已经搜索过的位置
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false))

  const q = [] // 定义 0 的位置
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        q.push([i, j])
        visited[i][j] = true
      }
    }
  }

  // 开始遍历
  while (q.length > 0) {
    const [x, y] = q.shift() // 当前 0 的位置的 行 列
    for (let i = 0; i < 4; i++) {
      const newX = x + X[i], newY = y + Y[i]
      if (newX >= 0 && newY >= 0 && newX < dist.length && newY < dist[0].length && !visited[newX][newY]) {
        console.log(x, y, newX, newY)
        dist[newX][newY] = dist[x][y] + 1;
        q.push([newX, newY])
        visited[newX][newY] = true
      }
    }
  }
  return dist
};

// const result = updateMatrix(
//   [[0, 0, 0], [0, 1, 0], [1, 1, 1]])
// console.log(result)



const orangesRotting = function (grid) {
  const X = [-1, 1, 0, 0]
  const Y = [0, 0, -1, 1]
  const [m, n] = [grid.length, grid[0].length] // 行 列
  // 定义已经搜索过的位置
  let newFruit = 0
  const q = [] // 定义 0 的位置
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        q.push([i, j])
      }
      if (grid[i][j] === 1) {
        newFruit += 1
      }
    }
  }
  if (!newFruit) return 0
  let minutes = 0
  while (q.length > 0) {
    for (let j = 0; j < q.length; j++) {
      const [x, y] = q.shift() // 当前 0 的位置的 行 列
      for (let i = 0; i < 4; i++) {
        const newX = x + X[i], newY = y + Y[i]
        if (newX >= 0 && newY >= 0 && newX < grid.length && newY < grid[0].length && grid[newX][newY] === 1) {
          grid[newX][newY] = 2
          console.log([x, y], [newX, newY], grid)
          q.push([newX, newY])
          newFruit -= 1
        }
      }
    }
    minutes += 1
  }
  return newFruit === 0 ? minutes - 1 : -1
};

const result = orangesRotting([[2, 1, 1], [1, 1, 1], [0, 1, 2]])
console.log(result)