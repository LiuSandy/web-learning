import { range } from '../util'
export default function (s, words) {
    if (!s || !words || !words.length) {
        return []
    }

    const wordLen = words[0].length
    const allLen = words.length * wordLen
    const strLen = s.length
    const wordObj = {}
    
    const res = []
    for (let w of words) {
        wordObj[w] ? wordObj[w]++ : wordObj[w] = 1
    }
    // 'barfoothefoobarman', ["bar","foo"]
    for (const i of range(0, wordLen)) {
        let curCnt = 0;
        let left = i;
        let right = i;
        const logWord = {}
        while (right + wordLen <= strLen) {
            const curStr = s.slice(right, right + wordLen)
            right += wordLen;
            if(!wordObj[curStr]){
                left = right
                logWord = {}
                curCnt = 0
            }else{
                logWord[curStr] ? logWord[curStr]++ : logWord[curStr] = 1
                curCnt += 1
                while(logWord[curStr]>wordObj[curStr]){
                    const leftW = s.slice(left,left+wordLen)
                    left += wordLen;
                    logWord[leftW] ? logWord[leftW]-- : logWord[leftW] = -1
                    curCnt -=1
                }
                if(curCnt === words.length){
                    res.push(left)
                }
            }
        }
    }
    return res
}