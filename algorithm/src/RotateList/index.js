/**
 * 61. Rotate List
 * 1、构成环
 * 2、循环
 * 3、断开
 */
const rotateRight = (head, k) => {
  if (!head) return null;
  if (!head.next) return head;

  // 1. 构成环
  let tail_node = head;
  let n = 1;
  while (tail_node.next) {
    tail_node = tail_node.next;
    n += 1;
  }
  tail_node.next = head;

  // 2. 循环
  // 计算断开位置
  const cycles = n - k % n - 1
  for (let i = 0; i <= cycles; i++) {
    tail_node = tail_node.next;    
  }
  const new_head = tail_node.next;
  // 3. 断开
  tail_node.next = null;

  return new_head
}