/**
 * LCOF 二叉树的深度
 */

export default root => {
  const dfs = root => {
    if (!root) return 0;
    return Math.max(dfs(root.left), dfs(root.right)) + 1
  }
  return dfs(root);
}
