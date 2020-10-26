/**
 * Convert Sorted List to Binary Search Tree
 * 有序链表转换二叉搜索树
 */
const sortedListToBST = head => {
  const getMedian = (left, right) => {
    let slow = left;
    let fast = left;
    while (fast !== right && fast.next !== right) {
      fast = fast.next.next;
      slow = slow.next;
    }
    return slow;
  }
  const build_B_tree = (left, right) => {
    if (left === right) return null;
    const mid = getMedian(left, right);
    const root = new TreeNode(mid.val);
    root.left = build_B_tree(left, mid);
    root.right = build_B_tree(mid.next, right);
    return root;
  }
  return build_B_tree(head, null);
}