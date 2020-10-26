// 执行 232 ms 内存消耗 39.2 MB
export default function(nums1, nums2){
  // 断言 判断两个数组都有值
  if(!nums1.length && !nums2.length){
    throw "The two arrays must have a valid value!";
  }
  // 可优化 median = [...nums1,...nums2].sort((a,b)=>a-b)
  let median = nums1;
  nums2.forEach(num =>median.push(num));
  median = median.sort((a,b)=>a-b)
  // end 
  let len = median.length
  console.log(median)
  if (len % 2 === 0){
    return (median[Math.floor((len-1)/2)] + median[Math.round((len-1)/2)]) / 2
  }
  return median[parseInt(len/2)] 

}

// 示例代码
var findMedianSortedArrays = function(nums1, nums2) {
  let arr = [...nums1, ...nums2].sort((a,b)=>a-b);
  let m = +((arr.length/2).toString().split('.')[0]);
  if(arr.length % 2 === 0) {
    return (arr[m-1] + arr[m]) / 2;
  } else {
    return arr[m];
  }
};