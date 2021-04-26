// 中序 左 中 右
// export default root => {
//   let ans = new TreeNode(0);
//   let temp = ans
//   const inorder = root => {
//     if (!root) return
//     inorder(root.left);
//     temp.right = root;
//     temp = root;
//     root.left = null
//     inorder(root.right)
//   }
//   inorder(root);
//   return ans.right
// }



/**
 * 897. Increasing Order Search Tree
 * 897. 递增顺序搜索树
 */
const increasingBST = function (root) {
  const result = new TreeNode(0)
  let temp = result
  const dfs = root => {
    if (!root) return
    dfs(root.left)
    temp.right = root
    temp = root
    root.left = null
    dfs(root.right)
  }

  dfs(root)
  return result.right
};