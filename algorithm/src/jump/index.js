export default function (nums) {
  if (!nums || !nums.length) {
    return 0
  }
  let step = 0;
  let maxPos = 0;
  let end = 0;
  for (let i = 0; i < nums.length-1; i++) {
    if (maxPos >= i) {
      maxPos = Math.max(maxPos, i + nums[i])
      if (i === end) {
        end = maxPos
        step += 1
      }
    }
  }
  return step
}