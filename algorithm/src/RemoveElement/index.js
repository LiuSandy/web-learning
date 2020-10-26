export default function (nums, val) {
    let curentIndex = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[curentIndex] = nums[i]
            curentIndex++
        }
    }
    return curentIndex
}

/**
 * 使用 splice
 */
export function removeElement(nums, val) {
    while (nums.includes(val)) { 
        nums.splice(nums.indexOf(val, 0), 1); 
    }
    return nums.length
}

