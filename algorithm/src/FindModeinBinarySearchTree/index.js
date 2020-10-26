export const func1 = root => {
  // 记录当前值 出现次数，最大次数
  let current = 0, count = 0, max_count = 0;
  let res = [];
  const findVal = val => {
    if (val === current) {
      count += 1;
    } else {
      count = 1;
      current = val;
    }
    if (count === max_count) {
      res.push(current);
    }
    if (count > max_count) {
      res = [current];
    }
  }

  // 中序遍历二叉树
  let temp = root, pre = null
  while (temp !== null) {
    if (temp.left === null) {
      findVal(temp.val);
      temp = temp.right;
      continue
    }
    pre = temp.left
    while (pre.right !== null && pre.right !== temp) {
      pre = pre.right
    }
    if (pre.right === null) {
      pre.right = temp;
      temp = temp.left;
    } else {
      pre.right = null;
      findVal(temp.val);
      temp = temp.right;
    }
  }
  return res
}

export const func2 = root => {
  let res = {}, max_count = 0; let result = []
  const dfs = root => {
    res[root.val] = (res[root.val] || 0) + 1;
    if (res[root.val] === max_count) {
      result.push(root.val);
    }
    if (res[root.val] > max_count) {
      result = [root.val];
      max_count = res[root.val]
    }
    root.left && dfs(root.left) || root.right && dfs(root.right)
  }

  return root && dfs(root) || result || []

}