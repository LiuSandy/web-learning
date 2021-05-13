/**
 * 98. Validate Binary Search Tree
 * 98. 验证二叉搜索树
 */

const isValidBST = function (root) {
  const dfs = (root, min, max) => {
    if (!root) return true

    if (root.val <= min || root.val >= max) {
      return false
    }

    return dfs(root.left, min, root.val) && dfs(root.right, root.val, max)

  }

  return dfs(root, -Infinity, Infinity)

};