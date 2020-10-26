export default (root, p, q) => {
  const dfs = (root, p, q) => {
    if (p.val < root.val && q.val < root.val) {
      return dfs(root.left, p, q);
    }
    if (p.val > root.val && q.val > root.val) {
      return dfs(root.right, p, q);
    }
    return root;
  }

  return dfs(root, p, q);
}