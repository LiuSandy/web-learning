/**
 * Legal Binary Search Tree LCCI
 * 合法二叉搜索树 
 *        10
 *       /  \
 *      5   15
 *         /  \
 *        6   20
 * 6 不合法 6 < 10
 */
const isValidBST = root => {
  if (!root) return true;
  let left_tree = root.left;
  while (left_tree && left_tree.right) {
    left_tree = left_tree.right
  }
  let right_tree = root.right;
  while (right_tree && right_tree.left) {
    right_tree = right_tree.left
  }
  const _bool = (!left_tree || root.val > left_tree.val) && (!right_tree || right_tree.val > root.val)
  return _bool && isValidBST(root.left) && isValidBST(root.right);
}