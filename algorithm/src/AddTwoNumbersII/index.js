/**
 * Add Two Numbers II
 * 栈
 */
const addTwoNumbers = (l1, l2) => {
  let list1 = l1, list2 = l2;
  // 定义两个栈
  const s1 = [], s2 = [];
  while (list1!==null) {
    s1.push(list1.val);
    list1 = list1.next
  }
  while (list2!==null) {
    s2.push(list2.val);
    list2 = list2.next
  }

  // 开始计算
  let ans = null, carry = 0;
  while (s1.length || s2.length || carry !== 0) {
    let a = 0, b = 0;
    if (s1.length) a = s1.pop();
    if (s2.length) b = s2.pop();
    let cur = a + b + carry;
    carry = parseInt(cur / 10);
    cur %= 10
    const curNode = new ListNode(cur);
    curNode.next = ans
    ans = curNode
  }
  return ans
}