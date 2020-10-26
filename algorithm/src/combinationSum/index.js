 function V1(candidates, target) {
     if (!candidates || !candidates.length) {
         return []
     }
     // 排序
     const sortCandidates = candidates.sort((a, b) => a - b)
     const list = []
     const res = []

     function dfs(target, list, begin) {
         if (target === 0) {
             res.push(list)
             return
         }
         for (let i = begin; i < sortCandidates.length; i++) {
             const element = sortCandidates[i]
             if (target < element) break;
             list.push(element)
             dfs(target - element, list.slice(), i)
             list.pop()
         }
     }
     dfs(target, list, 0)

     return res
 }

 export default (candidates, target) => {
     const ans = []
     const dfs = (target, list, index) => {
         if (candidates.length === index) {
             return;
         }
         if (target === 0) {
             ans.push(list)
             return
         }
         dfs(target, list, index + 1);
         if (target - candidates[index] >= 0) {
             dfs(target - candidates[index], [...list, candidates[index]], index)
         }
     }
     dfs(target, [], 0)
     return ans
 }