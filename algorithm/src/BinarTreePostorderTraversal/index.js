/**
 * Binary Tree Postorder Traversal
 * 二叉树的后序遍历
 */
const postorderTraversal = root => {
  if (!root) return []
  return postorderTraversal(root.left).concat(postorderTraversal(root.right), root.val)
}

var postorderTraversal = function(root) {
  if (root) {
      return [...postorderTraversal(root.left), ...postorderTraversal(root.right), root.val]
  } else {
      return []
  }
};