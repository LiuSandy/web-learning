/**
 * Find Minimum in Rotated Sorted Array II
 * 154. 寻找旋转排序数组中的最小值 II
 * 较比153 多了重复数据
 */
const findMin = function (nums) {
  // 先去重
  const newNums = [...new Set(nums)]
  let left = 0, right = newNums.length - 1
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (newNums[mid] < newNums[right]) {
      right = mid
    } else {
      left = mid + 1
    }

  }
  return newNums[left]
};

const result = findMin([2,2,2,0,1])
console.log(result)