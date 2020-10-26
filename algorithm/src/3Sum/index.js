export default function (nums) {
  // 先判空
  if (nums && !nums.length) return []
  // 排序
  nums.sort((a, b) => a - b)
  // 最小最大下标,结果集
  const len = nums.length
  const res = []
  for (let i = 0; i < len; i++) {
    if (i > 0 && nums[i] === nums[i - 1]){ continue};
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const result = nums[i] + nums[L] + nums[R]
      if(L === i){
        L++
      }else if(R === i){
        R--
      }else if (result === 0) {
        res.push([nums[i], nums[L], nums[R]])
        while(nums[L]===nums[L+1]){
          L++
        }
        L++
        while(nums[R]===nums[R-1]){
          R--
        }
        R--
      } else if (result > 0) {
        R--
      } else {
        L++
      }
    }
  }

  return res;
}