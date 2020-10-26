/**
 * 平衡二叉树 
 * 左子树与右子树深度相差不大于1
 */
const isBalanced = root => {
  if (!root) return true;
  const maxDepth = root => {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
  }
  const left_depth = maxDepth(root.left);
  const right_depth = maxDepth(root.right);
  return Math.abs(left_depth - right_depth) <= 1 && isBalanced(root.left) && isBalanced(root.right);
}