export default function(candidates, target) {
    if (!candidates || !candidates.length) {
        return []
    }
    // 排序
    const sortCandidates = candidates.sort((a, b) => a - b)
    const list = []
    const res = []
    function dfs(target,list,begin){
        if(target===0){
            res.push(list)
            return
        }
        for (let i = begin; i < sortCandidates.length; i++) {
            const element = sortCandidates[i];
            if(target<element) break
            if(begin<i&&element === sortCandidates[i-1]){
                continue
            }
            list.push(element)
            dfs(target-element,list.slice(),i+1)
            list.pop()
            
        }
    }
    dfs(target,list,0)
    return res    
}