export default (inorder, postorder) => {
  // 后序遍历 最后一个为跟节点
  let post_index = postorder.length - 1;
  const idx_map = new Map();
  inorder.forEach((val, index) => {
    idx_map.set(val, index)
  });
  const traversal = (idx_left, idx_right) => {
    // 如果左侧大大于右侧不构建
    if (idx_left > idx_right) return;
    const val = postorder[post_index]
    const tree = new TreeNode(val);
    //  获得当前节点在中序遍历的下标，左边为左子树 右边为右子数
    const index = idx_map.get(val);
    post_index -= 1;
    
    tree.right = traversal(index + 1, idx_right);
    // 构建左子树
    tree.left = traversal(idx_left, index - 1);
    
    return tree;
  }

  return traversal(0, inorder.length - 1)
}
