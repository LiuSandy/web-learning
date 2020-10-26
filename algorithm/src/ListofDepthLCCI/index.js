export default tree => {
  if (!tree) return [];
  let quence = [tree];
  let res = [];
  while (quence.length) {
    let temp = new ListNode(null);
    let p = temp;
    for (let i = 0; i < quence.length; i++) {
      const item = new ListNode(quence[0].val);
      if (quence[0].left) {
        quence.push(quence[0].left)
      }
      if (quence[0].right) {
        quence.push(quence[0].right)
      }
      p.next = item
      p = p.next
      quence.shift()
    }
    res.push(temp.next)
  }
  return res
}