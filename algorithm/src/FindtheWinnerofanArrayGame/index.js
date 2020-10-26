export default (arr, k) => {
    let prev = Math.max(arr[0], arr[1]); // 上一个最大值
    if (k === 1) return prev;
    let currMax = prev; // 当前最大值
    let count = 1; // 计数
    for (let i = 2; i < arr.length; i++) {
        const curr = arr[i]
        if(prev>curr){
            count ++ 
            if (count === k) {
                return prev
            }
        }else{
            prev = curr;
            count = 1
        }
        currMax = Math.max(currMax,curr)
    }
    return currMax
}