/**
 * 46. 全排列
 */
const permute = nums => {
  // 3
  const len = nums.length;
  const res = []
  const swapArray =(arr, index1, index2)=> {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  }
  const backtrack = first => {
    if (first === len) {
      res.push(nums.slice())
    }
    for (let i = first; i < len; i++) {
      nums = swapArray(nums,first,i);
      backtrack(first + 1)
      nums = swapArray(nums,first,i);
    }
  }
  backtrack(0)
  return res
}

export default permute