/**
 * 872. Leaf-Similar Trees
 * 872. 叶子相似的树
 */
const leafSimilar = function (root1, root2) {
  const dfs = (root, visit = []) => {
    if (!root.left && !root.right) {
      visit.push(root.val)
    } else {
      if (root.left) {
        dfs(root.left, visit)
      }
      if (root.right) {
        dfs(root.right, visit)
      }
    }
  }

  const visit1 = []
  if (root1) {
    dfs(root1, visit1)
  }
  const visit2 = []
  if (root2) {
    dfs(root2, visit2)
  }
  return visit1.toString() === visit2.toString()
};