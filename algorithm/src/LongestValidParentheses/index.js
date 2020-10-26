export default function (s) {
    if (!s) {
        return 0
    }
    const stack = []
    let i = 0
    // 判断有效括号对
    while (i < s.length) {
        const curentChart = s[i]
        if (!stack.length) {
            stack.push(curentChart)
        } else {
            const prevChart = stack[stack.length - 1];
            if (prevChart === '(' && curentChart === ')') {
                stack.pop()
            } else {
                stack.push(curentChart)
            }
        }
        i++
    }
    return s.length - stack.length
}