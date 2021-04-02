// export default (height) => {
//   if (height.length < 3) return 0

//   let left = 0,
//     right = height.length - 1;
//   let leftMax = height[left],
//     rightMax = height[right];
//   let res = 0
//   while (left < right) {
//     if (leftMax < rightMax) {
//       res += leftMax - height[left++];
//       leftMax = Math.max(height[left], leftMax);
//     } else {
//       res += rightMax - height[right--];
//       rightMax = Math.max(height[right], rightMax);
//     }
//   }
//   return res
// }

const trap = function (height) {
  if (height.length < 3) return 0
  let result = 0
  const stack = []
  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (!stack.length) {
        break
      }
      const minHeight = Math.min(height[stack[stack.length - 1]], height[i]) - height[top]
      result += ((i - stack[stack.length - 1] - 1) * minHeight)
    }
    stack.push(i)
  }
  return result
};

const result = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
console.log(result)