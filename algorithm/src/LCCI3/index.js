/**
 * 删除中间节点
 */

const deleteNode = node => {
  node.val = node.next.val
  node.next = node.next.next
}