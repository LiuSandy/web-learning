export default (height) => {
    if (height.length < 3) return 0

    let left = 0,
        right = height.length - 1;
    let leftMax = height[left],
        rightMax = height[right];
    let res = 0
    while (left < right) {
        if (leftMax < rightMax) {
            res += leftMax - height[left++];
            leftMax = Math.max(height[left], leftMax);
        } else {
            res += rightMax - height[right--];
            rightMax = Math.max(height[right], rightMax);
        }
    }
    return res
}