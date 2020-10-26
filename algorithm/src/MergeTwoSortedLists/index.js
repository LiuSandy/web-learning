export default function (l1, l2) {
    // 定义一个首字符
    let prehead = new ListNode(-1);
    let pre = prehead
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            pre.next = l1
            l1 = l1.next
        } else {
            pre.next = l2
            l2 = l2.next
        }
        pre = pre.next
    }
    if (l1 === null) {
        pre.next = l2
    } else {
        pre.next = l1
    }
    return prehead.next
}