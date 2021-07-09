/**
 * 704. 二分查找
 */
const search = function (nums, target) {

  if (nums.length < 2) {
    return nums[0] === target ? 0 : -1
  }

  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return -1
};

/**
 * 278. 第一个错误的版本
 */

const solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {

    let left = 1, right = n;
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (isBadVersion(mid)) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  };
};

/**
 * 35. 搜索插入位置
 */
const searchInsert = function (nums, target) {
  let left = 0, right = nums.length-1, result = nums.length
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] >= target) {
      result = mid;
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return result
};

const result = searchInsert([1, 3, 5, 6], 7)
console.log(result)