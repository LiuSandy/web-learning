// export default function (nums, val) {
//     let curentIndex = 0
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] !== val) {
//             nums[curentIndex] = nums[i]
//             curentIndex++
//         }
//     }
//     return curentIndex
// }

// /**
//  * 使用 splice
//  */
// export function removeElement(nums, val) {
//     while (nums.includes(val)) { 
//         nums.splice(nums.indexOf(val, 0), 1); 
//     }
//     return nums.length
// }

const removeElement = (nums, val) => {
  let left = 0, right = nums.length;
  while (left < right) {
    if (nums[left] === val) {
      nums[left] = nums[right - 1]
      right--
    } else {
      left++
    }
  }
  return left
}

const result = removeElement([3, 2, 2, 3], 2)
console.log(result)
