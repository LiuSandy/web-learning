/**
 * Merge Sorted Array
 * 88. 合并两个有序数组
 */
const merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2)
  return nums1.sort((a,b)=>a-b)
};

const result = merge([1, 2, 3, 0, 0, 0],
  3,
  [2, 5, 6],
  3)

console.log(result)