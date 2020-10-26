export default (nums, limit) => {
    const len = nums.length;
    let start = 0, end = 1, ans = 1;
    const minNums = [nums[0]], maxNums = [nums[0]]
    while (end < len) {
        // 当前指向
        const current = nums[end]
        // 排序 min 升序 max 降序
        while (minNums.length > 0 && minNums[minNums.length - 1] > current) {
            minNums.pop()
        }
        while (maxNums.length > 0 && maxNums[maxNums.length - 1] < current) {
            maxNums.pop()
        }
        minNums.push(current);
        maxNums.push(current);

        // 窗口内最大值与最小值小于等于limit
        while (Math.abs(maxNums[0] - minNums[0]) > limit) {
            if (minNums[0] === nums[start]) minNums.shift();
            if (maxNums[0] === nums[start]) maxNums.shift();
            start++;
        }
        ans = Math.max(ans, end - start + 1)
        end++
    }
    return ans
}