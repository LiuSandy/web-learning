/**
 * 863. All Nodes Distance K in Binary Tree
 * 863. 二叉树中所有距离为 K 的结点
 * @思路： 使用 HashMap 保存每个节点的父节点
 * 从 目标节点开始遍历，分别遍历该节点的左右子节点和父节点，统计距离
 */
const distanceK = function (root, target, k) {
  const parentMap = new Map()

  const getMap = (node) => {
    if (node.left) {
      parentMap.set(node.left.val, node)
      getMap(node.left)
    }
    if (node.right) {
      parentMap.set(node.right.val, node)
      getMap(node.right)
    }
  }
  getMap(root)
  const result = []
  const dfs = (node, start, dist) => {
    if (!node) return null
    if (dist === k) {
      result.push(node.val)
      return
    }
    if (node.left !== start) {
      dfs(node.left, node, dist + 1)
    }
    if (node.right !== start) {
      dfs(node.right, node, dist + 1)
    }
    if (parentMap.get(node.val) !== start) {
      dfs(parentMap.get(node.val), node, dist + 1)
    }
  }

  dfs(target, null, 0)
  return result
};