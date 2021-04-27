/**
 * 938. Range Sum of BST
 * 938. 二叉搜索树的范围和
 */

const rangeSumBST1 = function (root, low, high) {
  let result = 0
  const dfs = root => {
    if (!root) return
    dfs(root.left)
    if (root.val >= low && root.val <= high) {
      result += root.val
    }
    dfs(root.right)
  }
  dfs(root)
  return result
};


const rangeSumBST = function (root, low, high) {
  if (!root) return 0;

  if (root.val > high) {
    return rangeSumBST(root.left, low, high)
  }

  if (root.val < low) {
    return rangeSumBST(root.right, low, high)
  }

  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
};

const result = rangeSumBST([10, 5, 15, 3, 7, null, 18], 7, 15)
console.log(result)