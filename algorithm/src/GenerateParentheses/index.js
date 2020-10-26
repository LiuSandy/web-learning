// 执行用时 56 ms 
// 内存消耗 34.7 MB
export default function (n) {
    const ans = []
    function enumerate(S = '', l = 0, r = 0) {
        if (S.length === n * 2) {
            ans.push(S)
            return ans
        }
        if (l < n) {
            enumerate(S + '(', l + 1, r)
        }
        if (r < l) {
            enumerate(S + ')', l, r + 1)
        }
    }
    enumerate()
    return ans
}

// 执行用时 44 ms
const generateParenthesis = function (n) {
    if (n === 0) {
        return [];
    }
    const map = {
        0: [''],
        1: ['()'],
    };
    const generateParenthesisSub = (n) => {
        if (map[n]) {
            return map[n];
        }
        const result = [];
        for (let i = 0; i < n; i += 1) {
            const leftPart = generateParenthesisSub(i);
            const rightPart = generateParenthesisSub(n - i - 1);
            // if (leftPart.length === 0) {
            //   result = [...result, ...rightPart.map((rightStr) => `()${rightStr}`)];
            // } else if (rightPart.length === 0) {
            //   result = [...result, ...leftPart.map((leftStr) => `(${leftStr})`)];
            // } else {
            for (let leftI = 0; leftI < leftPart.length; leftI += 1) {
                for (let rightI = 0; rightI < rightPart.length; rightI += 1) {
                    result.push(`(${leftPart[leftI]})${rightPart[rightI]}`);
                }
            }
            // }
            // console.log(result);
        }
        map[n] = result;
        return result;
    };
    return generateParenthesisSub(n);
};