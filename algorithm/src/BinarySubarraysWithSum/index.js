/**
 * 930. Binary Subarrays With Sum
 * 930. 和相同的二元子数组
 */
const numSubarraysWithSum = function (nums, goal) {
  let count = 0, sum = 0
  const map = new Map()
  nums.forEach(num => {
    map.set(sum, (map.get(sum) || 0) + 1)
    sum += num;
    count += map.get(sum - goal) || 0
  })
  return count
};

const result = numSubarraysWithSum([1, 0, 1, 0, 1], 2)
console.log(result)