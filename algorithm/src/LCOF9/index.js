/**
 * 剑指 Offer 25. 合并两个排序的链表
 */

const mergeTwoLists = function (l1, l2) {
  const temp = new ListNode(0)
  let currentNode = temp
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      currentNode.next = l1
      l1 = l1.next
    } else {
      currentNode.next = l2
      l2 = l2.next
    }
    currentNode = currentNode.next
  }

  currentNode.next = l1 !== null ? l1 : l2
  return temp.next
};