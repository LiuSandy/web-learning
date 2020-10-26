export default (nums) => {
    if (nums.length < 3) {
        return -1
    }
    const n = parseInt(nums.length / 2, 10)
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1)
        if (map.get(num) > n) {
            return num
        }
    }
    return -1
}