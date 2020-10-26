export default root => {
  const result = [];
  const dfs = root => {
    if (!root) return 
    dfs(root.left)
    result.push(root.val)
    dfs(root.right)
  }
  dfs(root)
  return result
}

// 事例
var inorderTraversal = function(root) {
  if (!root) return []
  return inorderTraversal(root.left).concat(root.val, inorderTraversal(root.right))
};