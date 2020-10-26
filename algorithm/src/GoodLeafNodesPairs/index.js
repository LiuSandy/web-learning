/**
 * Number of Good Leaf Nodes Pairs
 */
export default (root, distance) => {
  if (!root) return [0]
  let ans = 0
  const dfs = (root, distance, ans) => {
    if (!root) return [0]
    if (!root.left && !root.right) return [1]
    const left_root = dfs(root.left, distance, ans);
    const right_root = dfs(root.right, distance, ans);
    for (let i = 0; i < left_root.length; i++) {
      for (let j = 0; j < right_root.length; j++) {
        console.log(left_root[i])
      }
    }
    return ans
  }

  dfs(root, distance, ans);
  return ans
}

