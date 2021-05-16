/**
 * 113. Path Sum II
 * 113. 路径总和 II
 */
const pathSum = function (root, targetSum) {
  const result = []
  const sum = []
  const dfs = (root, target) => {
    if (!root) return;
    sum.push(root.val)
    target -= root.val
    if (root.left === null && root.right === null && target === 0) {
      result.push(sum)
    }
    dfs(root.left, target)
    dfs(root.right, target)
    sum.pop()
  }
  dfs(root, targetSum)
  return result
};
