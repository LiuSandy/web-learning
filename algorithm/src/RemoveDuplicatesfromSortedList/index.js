/**
 * Remove Duplicates from Sorted List II
 *  删除排序链表中的重复元素 II
 */
const deleteDuplicates = head => {
  if (!head || !head.next) return head;
  if (head.val === head.next.val) {
    while (head && head.next && head.val === head.next.val) {
      head = head.next
    }
    return deleteDuplicates(head.next)
  } else {
    head.next = deleteDuplicates(head.next);
    return head;
  }
}