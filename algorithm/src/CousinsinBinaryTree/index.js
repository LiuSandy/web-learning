/**
 * 993. Cousins in Binary Tree
 * 993. 二叉树的堂兄弟节点
 */
const isCousins = function (root, x, y) {
  let xDepth = 0, xParent = null;
  let yDepth = 0, yParent = null;
  const dfs = (root, depth,parent) => {
    if (!root) return
    if (root.val === x) {
      [xDepth, xParent] = [depth, parent]
    } else if (root.val === y) {
      [yDepth, yParent] = [depth, parent]
    }
    dfs(root.left, depth + 1,root)
    dfs(root.right, depth + 1,root)
  }
  dfs(root, 0,null)
  return xDepth === yDepth && xParent !== yParent
};