/**
 * 456. 132 Pattern
 * 132模式
 * i<j<k
 * a[i] < a[k] < a[j]
 */
const find132pattern = nums => {
  if (!nums || nums.length < 3) return false
  let [s, stack] = [Number.MIN_SAFE_INTEGER, []]
  for (let i = nums.length; i > 0; i--) {
    if (nums[i] < s) {
      return true
    }
    while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
      s = stack.pop()
    }

    stack.push(nums[i])
  }

  return false
};

const result = find132pattern([1,2,3,4])
console.log(result)