/**
 * 876. 链表的中间结点
 */
const middleNode = function (head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};

/**
 * 19. 删除链表的倒数第 N 个结点
 */
const removeNthFromEnd = function (head, n) {
  const dumpy = new ListNode(-1, head)
  let p = head, q = dumpy
  for (let i = 0; i < n; i++) {
    p = p.next
  }
  while (p !== null) {
    p = p.next
    q = q.next
  }
  q.next = q.next.next
  return dumpy.next
};