/**
 * Palindrome Linked List
 * 1. 双指针找出前半部分和后半部分
 * 2. 反转链表
 * 3. 对比
 */
const isPalindrome = head => {
  /**
   * 1.
   */
  const findAfterList = head => {
    let slow = head;
    let fast = head;
    while (fast && fast.next && fast.next.next) {
      fast = fast.next.next;
      slow = slow.next
    }
    return slow;
  }
  /**
   * 2. 
   */
  const reverseList = head => {
    let prev = null;
    let curr = head;
    while (curr) {
      const temp = curr.next;
      curr.next = prev
      prev = curr
      curr = temp;
    }
    return prev
  }
  /**
   * 3.
   */
  if (!head) return true;
  // 取出后半部分 并 反转链表
  const firstEnd = findAfterList(head);
  const secondBefore = reverseList(firstEnd.next);

  let f = head;
  let s = secondBefore;
  let result = true;
  while (result && s) {
    if (f.val !== s.val) result = false;
    f = f.next;
    s = s.next
  }
  firstEnd.next = reverseList(secondBefore);
  return result
}