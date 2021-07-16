/**
 * 733. 图像渲染
 */
const floodFill = function (image, sr, sc, newColor) {
  // 定义上下左右移动坐标上 下 左 右
  const X = [-1, 1, 0, 0]
  const Y = [0, 0, -1, 1]
  const color = image[sr][sc];
  const dfs = (x, y) => {
    if (image[x][y] === color) {
      image[x][y] = newColor
      for (let i = 0; i < 4; i++) {
        const newX = x + X[i], newY = y + Y[i]
        if (newX >= 0 && newY >= 0 && newX < image.length && newY < image[0].length) {
          dfs(newX, newY)
        }
      }
    }
  }
  if (color !== newColor) {
    dfs(sr, sc)
  }
  return image
};

// const result = floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2)
// console.log(result)

/**
 * 岛屿的最大面积
 */
const maxAreaOfIsland = function (grid) {
  // 定义上下左右移动坐标上 下 左 右
  const X = [-1, 1, 0, 0]
  const Y = [0, 0, -1, 1]
  let area = 0
  const dfs = (x, y) => {
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] !== 1) {
      return 0
    }
    grid[x][y] = 0
    let count = 1
    for (let i = 0; i < 4; i++) {
      const newX = x + X[i], newY = y + Y[i]
      count += dfs(newX, newY)
    }
    return count
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      area = Math.max(area, dfs(i, j))
    }
  }
  return area
};

const result = maxAreaOfIsland([
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
])
console.log(result)