/**
 * LCP 07. 传递信息
 */
const numWays = function (n, relation, k) {
  let count = 0;
  const map = {}
  for (const [origin, target] of relation) {
    if (!map[origin]) {
      map[origin] = [target]
    } else {
      map[origin].push(target)
    }
  }
  const dfs = (index, step) => {
    if (step === k) {
      if (index === n - 1) {
        count++
      }
      return
    }
    const temp = map[index] || []

    for (const nextIndex of temp) {
      dfs(nextIndex, step + 1)
    }
  }
  dfs(0, 0);
  return count;
}

const result = numWays(5,
  [[0, 2], [2, 1], [3, 4], [2, 3], [1, 4], [2, 0], [0, 4]],
  3)

console.log(result)