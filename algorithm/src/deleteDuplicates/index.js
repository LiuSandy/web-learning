/**
 * 83. 删除排序链表中的重复元素
 */
const deleteDuplicates = head => {
  if (!head) {
    return head
  }
  let current = head
  while (current.next) {
    const p = current.next
    if (current.val === p.val) {
      current.next = p.next
    } else {
      current = current.next
    }
  }
  return head
}