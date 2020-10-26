function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 第一次 执行 156ms 内存消耗 38.7 MB
export default function (l1, l2) {
  let head = new ListNode(0)
  let push = 0, p = head
  while (l1 || l2 || push) {
    p = p.next = new ListNode()
    const count = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + push
    l1 = l1 ? l1.next : l1
    l2 = l2 ? l2.next : l2
    p.val = count % 10
    // 进位
    push = count > 9 ? 1 : 0
  }
  return head.next || head
};

// 示例 执行 96ms
var addTwoNumbers = function (l1, l2) {
  let data = new ListNode(0);
  let l = data;
  let sum;
  let pre = 0;
  do {
    sum = +(l1 && l1.val) + +(l2 && l2.val) + pre;
    l1 && (l1 = l1.next);
    l2 && (l2 = l2.next);
    if (sum >= 10) {
      pre = 1;
      sum = sum - 10;
    } else {
      pre = 0;
    }
    l = l.next = new ListNode(sum);
  } while (l1 || l2);
  if (pre) {
    l.next = new ListNode(pre);
  }
  return data.next;
};
