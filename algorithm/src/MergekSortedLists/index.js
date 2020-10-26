import { range } from '../util'

export default function mergeKList(lists) {
    const listLen = lists.length
    let currentIndex = 1
    if (listLen > 0) {
        while (currentIndex < listLen) {
            for (const i of range(0, listLen - currentIndex, currentIndex * 2)) {
                lists[i] = merge2Lists(lists[i], lists[i + currentIndex])
            }
            currentIndex *= 2
        }
        return lists[0]
    }
    return null

}

/**
 * 合并两个列表并排序
 */
function merge2Lists(l1, l2) {
    // 定义一个首字符
    let prehead = new ListNode(-1);
    let pre = prehead
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            pre.next = l1
            l1 = l1.next
        } else {
            pre.next = l2
            l2 = l2.next
        }
        pre = pre.next
    }
    if (l1 === null) {
        pre.next = l2
    } else {
        pre.next = l1
    }
    return prehead.next
}

/**
 * 实例
 */
let mergeKLists = function(lists) {
    let len = lists.length;
    if(len < 3){
      return merge2Lists(lists[0] || null,lists[1] || null);
    }else{
      let mid = len >> 1;
      return merge2Lists(mergeKLists(lists.slice(0,mid)),mergeKLists(lists.slice(mid)));
    }
  };