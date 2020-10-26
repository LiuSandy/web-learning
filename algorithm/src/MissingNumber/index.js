export default (nums) => {
    let left = 0; let right = nums.length-1;
    while (left <= right) {
        const mid = parseInt((left + right) / 2, 10);
        nums[mid] === mid ? left = mid + 1 : right = mid - 1
    }
    return left
}