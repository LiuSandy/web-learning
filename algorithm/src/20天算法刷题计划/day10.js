/**
 * 21. 合并两个有序链表
 */

const mergeTwoLists = function (l1, l2) {
  const temp = new ListNode(-1)
  let prev = temp
  // 比较大小
  while (l1 && l2) {
    if (l1.val >= l2.val) {
      prev.next = l2
      l2 = l2.next
    } else {
      prev.next = l1
      l1 = l1.next
    }
    prev = prev.next
  }
  // 如果有不为空的连接到 prev
  prev.next = l1 ?? l2
  return temp.next
};

/**
 * 206. 反转链表
 */
const reverseList = function (head) {
  let prev = null, cur = head;
  while (cur) {
    const temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }
  return prev
};