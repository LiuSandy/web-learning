/**
 * 复杂链表的复制
 */

const copyRandomList = head => {
  const visited = {};
  const dfs = head => {
    if (!head) return null;
    if (visited[head]) return visited[head];
    const copy = new Node(head.val);
    visited[head] = copy;
    copy.next = dfs(head.next);
    copy.random = dfs(head.random);
    return copy;
  }
  return dfs(head);
}
