export default function (haystack, needle) {
    const len = needle.length

    if(!len) return 0
    
    if (len > haystack.length) return -1

    // 计算偏移量
    function calShiftMat(s) {
        const map = {}
        for (let i = 0; i < len; i++) {
            map[needle[i]] = len - i
        }
        return map[s] || len
    }


    let idx = 0
    while (idx <= haystack.length - len) {
        let temp = 0;
        for (let i = 0; i < len; i++) {
            if (haystack[idx + i] === needle[i]) {
                temp++
            } else {
                break
            }
        }
        if (temp === len) {
            return idx
        } else {
            idx += calShiftMat(haystack[idx + len])
        }
    }
    return -1
}