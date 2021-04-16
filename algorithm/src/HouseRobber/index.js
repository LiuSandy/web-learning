/**
 * 198. House Robber
 * 198. 打家劫舍
 */
const rob = function (nums) {
  let cur = 0, pre = 0
  for (const num of nums) {
    [cur, pre] = [Math.max(pre + num, cur), cur]
  }
  return cur
};

const result = rob([1, 2, 3, 1])
console.log(result)