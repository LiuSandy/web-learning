export default function (nums) {
    let curentIndex = 0
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[curentIndex]) {
            curentIndex ++
            nums[curentIndex] = nums[i]
        }
    }
    return curentIndex
}

export function validation(nums, len) {
    if (len < 2) {
        return nums
    }
    // 验证
    const result = []
    for (let i = 0; i < len - 1; i++) {
        result.push(nums[i])
    }
    return result
}