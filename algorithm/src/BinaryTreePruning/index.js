/**
 * Binary Tree Pruning
 */
export default root =>{
  const containsOne = root =>{
    if (!root) return false
    const left_tree = containsOne(root.left);
    const right_tree = containsOne(root.right);
    if (!left_tree) root.left === null;
    if (!right_tree) root.right === null;
    return root.val === 1 || left_tree || right_tree
  }
  if (containsOne(root)) return root;
  return null;
}