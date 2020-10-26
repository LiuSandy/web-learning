const getMinimumDifference = root => {
  let ans = Number.MAX_SAFE_INTEGER, pre = -1;
  const dfs = root => {
    if (!root) return
    dfs(root.left);
    if (pre === -1) {
      pre = root.val
    } else {
      ans = Math.min(ans, Math.abs(root.val - pre))
      pre = root.val
    }
    dfs(root.right)
  }
  dfs(root);
  return ans
}