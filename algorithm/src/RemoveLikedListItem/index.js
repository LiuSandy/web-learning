/**
 * 203. Remove Linked List Elements
 * 203. 移除链表元素
 */
const removeElement = function (head, val) {
  const root = new ListNode(0)
  root.next = head
  let temp = root
  while (temp.next !== null) {
    if (temp.next.val === val) {
      temp.next = temp.next.next
    } else {
      temp = temp.next.next
    }
  }
  return root.next
}