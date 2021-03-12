/**
 * 815. 公交路线
 * @param routes [[1,2,7],[3,6,7]]
 * @param source 1
 * @param target 6
 */
const numBusesToDestination = (routes, source, target) => {
  // 定义站点所在的线路
  const graph = {};
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].length; j++) {
      if (!graph[routes[i][j]]) {
        graph[routes[i][j]] = new Set();
      }
      graph[routes[i][j]].add(i);
    }
  }
  let step = 0;
  const stack = [source]
  // 定义经过的站点
  const visited = new Set()
  visited.add(source)
  while (stack.length > 0) {
    const n = stack.length
    for (let i = 0; i < n ; i++) {
      const s = stack.shift()
      if (s === target) {
        return step
      }
      // 根据站点查找线路
      for (const route of graph[s]) {
        // 根据线路查询所有的站点
        for (const site of routes[route]) {
          if (visited.has(site)) {
            continue
          }
          stack.push(site)
          visited.add(site)
        }
      }
    }
    step += 1
  }
  return -1
};

const result = numBusesToDestination(
  [[24], [3, 6, 11, 14, 22], [1, 23, 24], [0, 6, 14], [1, 3, 8, 11, 20]],
  20,
  8,
)
console.log(result)