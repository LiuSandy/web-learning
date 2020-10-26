/**
 * Linked List Cycle LCCI
 */
const detectCycle = head => {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next
    if (fast === slow) break;
  }
  if (!fast || !fast.next) return null
  fast = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next
  }
  return fast
}