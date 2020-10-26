/**
 * Linked List Components
 * 链表组件
 */
const numComponents = (head, G) => {
  const set = new Set();
  G.map(item => set.add(item));
  let temp = head;
  let ans = 0;
  while (temp) {
    if (set.has(temp.val) && (!temp.next || !set.has(temp.next.val))) {
      ans += 1
    }
    temp = temp.next
  }
  return ans
}