/**
 *  在排序数组中查找数字 I
 */
const search = function (nums, target) {
  const map = new Map()
  nums.forEach(num => {
    map.set(num, (map.get(num) || 0) + 1)
  })
  return map.get(target) || 0
};

const result = search([5, 7, 7, 8, 8, 10], 8)
console.log(result)