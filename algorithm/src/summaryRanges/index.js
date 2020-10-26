export default (nums) => {
    const result = []
    for (let i = 0; i < nums.length; ++i) {
        let j = i;
        // 判断相邻
        while (i + 1 < nums.length && nums[i] + 1 === nums[i + 1]) {
            // 更新至界点下标
            ++i
        }
        if (i === j) {
            result.push(`${nums[j]}`)
        } else {
            result.push(`${nums[j]}->${nums[i]}`)
        }
    }
    return result
}