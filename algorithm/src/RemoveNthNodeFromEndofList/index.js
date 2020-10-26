// 执行用时 : 72 ms
// 内存消耗 : 33.9 MB
export default function(head,n){
    // 初始化 p q
    let dummy = new ListNode(0)
    dummy.next = head
    let p = dummy;
    let q = dummy;
    for(let i = 1;i<=n+1;i++){
        p = p.next 
    }
    while(p!==null){
        p = p.next;
        q = q.next;
    }
    q.next = q.next.next;
    return dummy.next
}