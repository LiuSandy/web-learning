export default (k) => {
    let a = 1, b = 1;
    // 构建斐波那契数字
    const list = [a, b]
    while (a + b <= k) {
        list.push(a + b)
        const temp = a;
        a = b;
        b = temp + b
    }

    return list
}