/**
 * 删除链表的节点
 */

const deleteNode = (head, val) => {
  if(head.val===val){
    return head.next
  }
  head.next = deleteNode(head.next,val)
  return head
}