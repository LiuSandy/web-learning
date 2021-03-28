/**
 * Binary Search Tree Iterator
 * 173. 二叉搜索树迭代器
 * 前序遍历：根 -> 左 -> 右
 * 中序遍历：左 -> 根 -> 右
 * 后续遍历：左 -> 右 -> 根
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *      this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  this.currentIndex = 0
  this.tree = inorderTraversal(root)
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  return this.tree[this.currentIndex++]
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.currentIndex < this.tree.length
};

function inorderTraversal(root) {
  const tree = []
  const dfs = root => {
    if (!root) {
      return
    }
    dfs(root.left)
    tree.push(root.val)
    dfs(root.right)
  }
  dfs(root)
  return tree
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */