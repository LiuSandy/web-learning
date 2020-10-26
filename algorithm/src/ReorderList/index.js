/**
 * Reorder List 
 * L0→L1→…→Ln-1→Ln ，
 * L0→Ln→L1→Ln-1→L2→Ln-2→…
 */
const reorderList = head => {
  if (!head) return
  const nodeList = [];
  let temp = head
  while (temp) {
    nodeList.push(temp);
    temp = temp.next
  }
  let i = 0, j = nodeList.length - 1
  while(i < j){
    nodeList[i].next = nodeList[j];
    i ++;
    if (i === j) break;
    nodeList[j].next = nodeList[i];
    j --;
  }
  nodeList[i].next = null;
  
}