/**
 * Insert into a Binary Search Tree
 */

const insertIntoBST = (root, val) => {
  if (!root) return new TreeNode(val);
  let temp = root;
  while (temp) {
    if (val < temp.val) {
      // 需要插入左子树
      if (!temp.left) {
        temp.left = new TreeNode(val);
        break
      } else {
        temp = temp.left
      }
    } else {
      // 需要插入左子树
      if (!temp.right) {
        temp.right = new TreeNode(val);
        break
      } else {
        temp = temp.right
      }
    }
  }
  return root
}
