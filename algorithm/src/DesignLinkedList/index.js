/**
 * Design Linked List
 * 设计链表
 */

/**
* Definition for singly-linked list.
*/
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
* Initialize your data structure here.
*/
var MyLinkedList = function () {
  this.head = null;
  this.size = 0
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  const len = this.size;
  if (index < 0 || index > len - 1) return -1;
  let temp = this.head
  while (index > 0) {
    if (!temp.next) return -1;
    temp = temp.next;
    index -= 1
  }
  return temp.val
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const temp = this.head;
  const node = new ListNode(val);
  this.head = node;
  this.head.next = temp;
  this.size++;
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let len = this.size;
  const node = new ListNode(val);
  if (!len) {
    this.head = node
    this.size++;
  } else {
    let temp = this.head
    while (len > 1) {
      temp = temp.next
      len -= 1;
    }
    temp.next = node;
    this.size++
  }
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index === this.size) {
    this.addAtTail(val)
  } else if (index === 0) {
    this.addAtHead(val)
  } else {
    let i = 0;
    let temp = this.head;
    while (i < index - 1) {
      temp = temp.next;
      i++
    }
    const node = new ListNode(val);
    node.next = temp
    temp.next = node
    this.size++
  }
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (!index) {
    this.head = this.head.next
    this.size--;
  } else {
    let i = 0;
    let temp = this.head;
    let cur = null
    while (i < index + 1) {
      cur = temp
      temp = temp.next;
      i++
    }
    cur.next = temp.next
    this.size--;
  }
};