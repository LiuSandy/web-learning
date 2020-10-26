const sumRootToLeaf = root => {
  let sum = 0;
  let count = 0;
  const dfs = (root, sum) => {
    if (root) {
      sum = sum * 2 + root.val;
      if (!root.left && !root.right) {
        count += sum
      }
      dfs(root.left, sum);
      dfs(root.right, sum);
    }
  }
  dfs(root, sum);
  return count
}