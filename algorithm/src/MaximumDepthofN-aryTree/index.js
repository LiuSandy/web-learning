/**
 * 559. Maximum Depth of N-ary Tree
 * 559. N 叉树的最大深度
 */

// 深度优先遍历
const maxDepth1 = function (root) {
  if (!root) {
    return 0
  }
  if (!root.children) {
    return 1
  }
  let height = 0;
  for (const child of root.children) {
    const childHeight = maxDepth(child)
    height = Math.max(height, childHeight)
  }
  return height + 1
};
// 广度优先遍历
const maxDepth = function (root) {
  if (!root) return 0;
  let queue = [root]
  let height = 0;
  while (queue.length) {
    let list = []
    while (queue.length) {
      const root = queue.pop();
      if (!root) break;
      if (root.children) {
        for (const child of root.children) {
          list.push(child)
        }
      }
    }
    queue = list
    height++
  }
  return height
};