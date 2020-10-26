const faltten = head => {
  const dfs = (head, next) => {
    let current = head;
    while (current && (current.next || current.child)) {
      if (current.child) {
        current.next = dfs(current.child, current.child.next);
        current.child = null;
        current.next.prev = current
      }
      current = current.next
    }
    if (next) {
      next.prev = current;
      current.next = next
    }
    return head
  }
  return dfs(head, head.next)
}

const falttenV1 = head => {
  if (!head) return
  const dfs = (prev, curr) => {
    if (!curr) return prev;
    curr.prev = prev;
    prev.next = curr;
    const tempNext = curr.next
    tail = dfs(curr, curr.child)
    curr.child = null
    return dfs(tail, tempNext)
  }
  const tempHead = new Node(null, null, head, null);
  dfs(tempHead, head);
  tempHead.next.prev = null
  return tempHead.next
}
