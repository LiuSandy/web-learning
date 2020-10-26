// 执行用时: 68 ms 内存消耗 : 35.6 MB
export default function (height) {
  // 双指针
  if (height.length === 2) {
    return Math.min(height[0], height[1])
  }
  let l = 0, r = height.length - 1, maxArea = 0;
  while (l < r) {
    maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r-l))
    if (height[l] <= height[r]) {
      l++
    } else {
      r--
    }
  }
  return maxArea

}

// 执行 60 ms 
var maxArea = function(height) {
  var start = 0;
  var end = height.length - 1;
  var max = 0;
  while(start !== end) {
      max = Math.max(max, Math.min(height[start], height[end]) * (end - start));
      if (height[start] > height[end]) {
          end--;
      } else {
          start++;
      }
  }
  return max;
}