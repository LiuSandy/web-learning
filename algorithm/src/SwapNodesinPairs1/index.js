/**
 * 递归
 */
const swapPairs = head => {
  if (!head || !head.next) return head;
  const newHead = head.next
  head.next = swapPairs(newHead.next);
  newHead.next = head;
  return newHead
}

/**
 * 迭代
 */
const swapPairs = head => {
  // 
  const dummyHead = new ListNode(0);
  dummyHead.next = head
  const temp = dummyHead;
  while (temp.next && temp.next.next){
    const node1 = temp.next;
    const node2 = temp.next.next;
    temp.next = node2;
    node1.next = node2.next;
    node2.next = node1
  }
  return dummyHead.next
}
