/**
 * 输入: [3,2,3,null,3,null,1]
 *
 *   3
 *  / \
 *  2   3
 *  \   \ 
 *   3   1
 * 输出: 7 
 * 解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
 * 
 * 输入: [3,4,5,1,3,null,1]
 *     3
 *    / \
 *   4   5
 *  / \   \ 
 * 1   3   1
 * 输出: 9
 * 解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
 */

var rob = function(root) {
  const dfs = (node) => {
      if (node === null) {
          return [0, 0];
      }
      const l = dfs(node.left);
      const r = dfs(node.right);
      const selected = node.val + l[1] + r[1];
      const notSelected = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
      return [selected, notSelected];
  }
  
  const rootStatus = dfs(root);
  return Math.max(rootStatus[0], rootStatus[1]);
}; 