/**
 * Populating Next Right Pointers in Each Node
 * 填充每个节点的下一个右侧节点指针
 */

const connect = root => {
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
}
