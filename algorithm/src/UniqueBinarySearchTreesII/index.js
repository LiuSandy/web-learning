/**
 * 95. Unique Binary Search Trees II
 * 95. 不同的二叉搜索树 II
 */
const generateTrees = function (n) {

  if (!n) return []

  const generateTree = (start, end) => {
    const tree = []
    if (start > end) {
      tree.push(null)
    }

    for (let index = start; index < end; index++) {
      // 左子树
      const leftTree = generateTree(start, index - 1)
      // 右子树
      const rightTree = generateTree(index + 1, end)

      for (const left of leftTree) {

        for (const right of rightTree) {
          const curTree = new TreeNode(index)
          curTree.left = left
          curTree.right = right
          tree.push(curTree)
        }
      }
    }
    return tree
  }
  return generateTree(1, n)
};
