export default function countAndSay(n) {
    // 第一个数值
    if (n === 1) {
        return '1'
    }
    // 上一个数值
    let prev = ""
    // 结果数值
    let result = ""
    // 统计重复次数
    let count = 0
    let cur = ""
    for (cur of countAndSay(n - 1)) {
        if (cur !== prev) {
            if (count > 0) {
                result += `${count}${prev}`
            }
            prev = cur
            count = 1
        } else {
            count += 1
        }
    }
    result += `${count}${cur}`

    return result
}
