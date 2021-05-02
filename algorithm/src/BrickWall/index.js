/**
 * 554. Brick Wall
 * 554. 砖墙
 * 根据缝隙位置创建 hash 表，求出最大缝隙值就是穿过最小砖的长度
 */
const leastBricks = function (wall) {
  const map = new Map();
  let max = 0
  for (const item of wall) {
    let location = 0 /** 缝隙位置 */
    for (let i = 0; i < item.length - 1; i++) {
      location += item[i]
      map.set(location, (map.get(location) || 0) + 1)
      max = Math.max(max, map.get(location))
    }
  }
  return wall.length - max
};

const result = leastBricks([[1],[1],[1]])
console.log(result)
