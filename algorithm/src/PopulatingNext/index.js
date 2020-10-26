/**
 * Populating Next Right Pointers in Each Node II
 */
export default (root) => {
  if (!root) return null;

  const queue = [root];

  while (queue.length) {
    let last = null;
    for (let i = 1; i <= queue.length; i++) {
      const item = queue.shift();
      if (item.left) {
        queue.push(item.left)
      }
      if (item.right) {
        queue.push(item.right)
      }
      if (i !== 1) {
        last.next = item
      }
      last = item
    }
  }

  return root

}
