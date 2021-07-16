/**
 * 617. 合并二叉树
 */
const mergeTrees = function (root1, root2) {
  const merge = (r1, r2) => {
    if (!r1) return r2
    if (!r2) return r1
    const newTree = new TreeNode(r1.val + r2.val)
    newTree.left = merge(r1.left, r2.left)
    newTree.right = merge(r1.right, r2.right)
    return newTree
  }
  return merge(root1, root2)
};

mergeTrees([1, 3, 2, 5],
  [2, 1, 3, null, 4, null, 7])


/**
 * 116. 填充每个节点的下一个右侧节点指针
 */
const connect = function (root) {
  if (!root) return root;
  const queue = [root];
  while (queue.length) {
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const temp = queue.shift();
      if (i < size - 1) {
        temp.next = queue[0];
      }
      if (temp.left) {
        queue.push(temp.left)
      }
      if (temp.right) {
        queue.push(temp.right)
      }
    }
  }
  return root;
};

connect([1, 2, 3, 4, 5, 6, 7])