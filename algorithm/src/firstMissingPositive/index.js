export default function (nums) {
    if (!nums || !nums.length) {
        return 1
    }
    const size = nums.length
    const sortNums = nums.sort((a, b) => a - b)
    const minNum = sortNums[0]
    if (minNum>1) {
        return 1;
    }
    const maxNum = sortNums[size - 1]>size?size:sortNums[size - 1]
    if (maxNum <=0) {
        return 1
    }
    const allNums = []
    for (let i = minNum; i <= maxNum; i++) {
        if (i > 0) {
            allNums.push(i)
        }
    }
    let result = null
    for (let i = 0; i < allNums.length; i++) {
        const element = allNums[i];
        if (!sortNums.includes(element)) {
            result = element
            break
        }
    }
    return result || maxNum+1
}