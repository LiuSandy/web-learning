const subtreeWithAllDeepest = root => {
  // 两次深度遍历
  const map = new Map();
  const dfs = (root, parent = null) => {
    if (root) {
      map.set(root, (map.get(parent) || 0) + 1);
      dfs(root.left, root);
      dfs(root.right, root);
    }
  }
  dfs(root);
  let max_depth = 0;
  for (const value of map.values()) {
    max_depth = value > max_depth ? value : max_depth
  }
  const findRoot = root => {
    if (!root || map.get(root) === max_depth) return root;
    const left = findRoot(root.left);
    const right = findRoot(root.right);
    if (left && right) return root;
    if (left) return left;
    if (right) return right;
  }
  return findRoot(root)
}