const kthToLast = (head, k) => {
  let p = head, q = head;
  while (k--) {
    p = p.next
  }
  while (p !== null) {
    p = p.next;
    q = q.next;
  }
  return q.val
}