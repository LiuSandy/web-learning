/**
 * 70. 爬楼梯
 * 动态方程：f(x) = f(x-2) + f(x-1)
 * 动态边界：f(1) = 1 f(0) = 1
 */
const climbStairs1 = function (n) {
  const computed = num => {
    if (num < 0) {
      return 0
    }
    if (num < 2) {
      return 1
    }
    return computed(num - 1) + computed(num - 2)
  }

  if (num < 2) {
    return 1
  }

  return computed(n - 1) + computed(n - 2)
};

const climbStairs = function (n) {
  let p = 0, q = 0, result = 1
  for (let i = 0; i < n; i++) {
    p = q;
    q = result;
    result = p + q;
  }
  return result
};

// const result = climbStairs(2)
// console.log(result)

/**
 * 198. 打家劫舍
 * 使用 pre 记录上一个值
 */
const rob = function (nums) {
  let cur = 0, pre = 0
  for (const num of nums) {
    [cur, pre] = [Math.max(pre + num, cur), cur]
  }
  return cur
};

// const result = rob([1,2,3,1])
// console.log(result)

/**
 * 120. 三角形最小路径和
 */
const minimumTotal = function (triangle) {
  let count = 0, pre = 0
  for (const nums of triangle) {
    // 计算出最小的值和坐标
    if ((nums[pre] || Number.MAX_SAFE_INTEGER) > (nums[pre + 1] || Number.MAX_SAFE_INTEGER)) {
      count += nums[pre + 1]
      pre++
    } else {
      count += nums[pre]
    }
  }
  return count
};

const result = minimumTotal([[-1], [2, 3], [1, -1, -3]])
console.log(result)