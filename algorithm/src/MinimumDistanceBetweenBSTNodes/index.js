/**
 * 783. Minimum Distance Between BST Nodes
 * 783. 二叉搜索树节点最小距离
 */

const minDiffInBST = function (root) {
  let result = Number.MAX_SAFE_INTEGER;
  let preVal = -1
  const dfs = root => {
    if (!root) {
      return
    }
    dfs(root.left);
    if (preVal === -1) {
      preVal = root.val
    }else{
      result = Math.min(result, root.val - preVal);
      preVal = root.val
    }
    dfs(root.right);
  }
  dfs(root)
  return result
};