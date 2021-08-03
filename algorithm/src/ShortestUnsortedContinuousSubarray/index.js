/**
 * 581. Shortest Unsorted Continuous Subarray
 * 581. 最短无序连续子数组
 * @重点：采用前缀和
 */
const findUnsortedSubarray = function (nums) {
  const isSorted = () => {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) {
        return false;
      }
    }
    return true;
  }

  // 判断 nums 是否是升序数组
  if (isSorted()) return 0;
  const copyNum = [...nums].sort((a, b) => a - b)
  let left = 0, right = nums.length - 1;
  while (nums[left] === copyNum[left]) {
    left++
  }
  while (nums[right] === copyNum[right]) {
    right--
  }

  return right - left + 1
};

const result = findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])
console.log(result)