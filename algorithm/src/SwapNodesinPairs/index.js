export default function (head) {
    const pre = new ListNode(0);
    pre.next = head;
    let temp = pre;
    while (temp.next !== null && temp.next.next !== null) {
        let start = temp.next;
        let end = temp.next.next;
        temp.next = end;
        start.next = end.next;
        end.next = start;
        temp = start;
    }
    return pre.next
}

/**
 * 使用递归
 */
export function swapPairs(head){
    if(!head || !head.next){
        return head
    }
    let next = head.next
    head.next = swapPairs(head.next.next)
    next.next = head;
    return next
}
