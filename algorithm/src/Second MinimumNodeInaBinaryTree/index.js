/**
 * 671. Second Minimum Node In a Binary Tree
 * 671. 二叉树中第二小的节点
 * @重点：本题中二叉树的根节点是最小值
 */

const findSecondMinimumValue = function (root) {

  let result = -1
  const rootV = root.val
  const dfs = root => {
    if (!root) return null
    if (result !== -1 && root.val >= result) return

    if (root.val > rootV) {
      result = root.val
    }
    dfs(root.left)
    dfs(root.right)
  }
  dfs(root)
  return result
};