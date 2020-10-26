/**
 * Count Complete Tree Nodes
 */
export default root => {
  const dfs = root => {
    if (!root) return 0
    return 1 + dfs(root.left) + dfs(root.right)
  }
  return dfs(root)
}
