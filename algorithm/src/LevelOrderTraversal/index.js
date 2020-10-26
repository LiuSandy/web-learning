/**
 * Binary Tree Zigzag Level Order Traversal
 */
export default (root) => {
  if (!root) return []
  const ans = [];
  let list = [];

  const queue = [root, null];
  let is_order_left = true

  while (queue.length) {
    const current_root = queue.shift();
    if (current_root) {
      if (is_order_left) {
        list.push(current_root.val)
      } else {
        list.unshift(current_root.val)
      }
      if (current_root.left) {
        queue.push(current_root.left)
      }
      if (current_root.right) {
        queue.push(current_root.right)
      }
    } else {
      ans.push(list);
      if (queue.length) queue.push(null)
      list = [];
      is_order_left = !is_order_left
    }

  }
  return ans
}
