// 执行用时 : 72 ms
// 内存消耗 : 33.9 MB
// export default function(head,n){
//     // 初始化 p q
//     let dummy = new ListNode(0)
//     dummy.next = head
//     let p = dummy;
//     let q = dummy;
//     for(let i = 1;i<=n+1;i++){
//         p = p.next 
//     }
//     while(p!==null){
//         p = p.next;
//         q = q.next;
//     }
//     q.next = q.next.next;
//     return dummy.next
// }

// const removeNthFromEnd = function (head, n) {
//   let p = head, num = 0
//   while (p !== null) {
//     p = p.next
//     num++
//   }
//   // 获得正序索引
//   const index = num - n
//   const dummy = new ListNode(0, head)
//   let q = dummy, cur = 0
//   while (q !== null) {
//     if (index === cur) {
//       q.next = q.next.next
//     } else {
//       q = q.next
//     }
//     cur++
//   }
//   return dummy.next
// };

// const removeNthFromEnd = function (head, n) {
//   let dummy = new ListNode(0, head)
//   const stack = []
//   let p = dummy
//   while (p !== null) {
//     stack.push(p)
//     p = p.next
//   }
//   for (let i = 0; i < n; ++i) {
//     stack.pop();
//   }
//   let prev = stack[stack.length - 1]
//   prev.next = prev.next.next

//   return dummy.next
// }

const removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head)
  let p = head;
  let q = dummy;
  for (let i = 0; i < n; i++) {
    p = p.next
  }
  while (p !== null) {
    p = p.next;
    q = q.next;
  }
  q.next = q.next.next;
  return dummy.next
}
