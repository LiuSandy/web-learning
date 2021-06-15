/**
 * 852. 山脉数组的峰顶索引
 * 其实就是查找数组中最大元素的索引
 */
// 1. 利用 Math.max 函数
const peakIndexInMountainArray = function (arr) {
  const max = Math.max.apply(null, arr)
  return arr.findIndex(item => item === max)
}

// 2. 采用二分查找

const peakIndexInMountainArray1 = function (arr) {
  let left = 0, right = arr.length - 2; ans = 0
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] >= arr[mid + 1]) {
      ans = mid;
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return ans
}

const result = peakIndexInMountainArray1([0, 1, 0])
console.log(result)