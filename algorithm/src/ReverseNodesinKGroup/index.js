export default function (head, k) {
    let pre = new ListNode(0)
    let temp = pre
    while (true) {
        let count = k;
        // 定义栈
        let stack = []
        let tmp = head
        while (count && tmp) {
            stack.push(tmp)
            tmp = tmp.next
            count -= 1
        }
        if (count) {
            temp.next = head
            break
        }

        while (stack.length > 0) {
            temp.next = stack.pop()
            temp = temp.next
        }
        temp.next = tmp
        head = tmp
    }
    return pre.next
}