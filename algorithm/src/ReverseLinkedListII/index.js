/**
 * 92. Reverse Linked List II
 * 92. 反转链表 II
 */

 const reverseBetween = function(head, left, right) {
  const dummy_node = new ListNode(0);
  dummy_node.next = head;
  let pre = dummy_node;
  for (let i = 0; i < left - 1; ++i) {
      pre = pre.next;
  }

  let cur = pre.next;
  let i = left
  //          curr  next 
  // 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> null
  while (i < right) {
    const next = cur.next
    cur.next = next.next
    next.next = pre.next
    pre.next = next
    i++
  }
  return dummy_node.next;
};
