/**
 * 179. Largest Number
 * 179 最大数
 * [10,2,5]
 */
const largestNumber = function (nums) {
  if (nums.length === 1) {
    return `${nums[0]}`
  }
  nums.sort((a, b) => `${b}${a}` - `${a}${b}`)
  if (nums[0] === 0) {
    return '0'
  }
  return nums.join("")
};

const result = largestNumber([3, 30, 34, 5, 9])
console.log(result)