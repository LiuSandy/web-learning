/**
 * 
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

  let new_tail_node = head;
  const cycles = n - k % n - 1
  for (let i = 0; i < cycles; i++) {
    new_tail_node = new_tail_node.next;    
  }
  const new_head = new_tail_node.next;
  // 3. 断开
  new_tail_node.next = null;

  return new_head
}