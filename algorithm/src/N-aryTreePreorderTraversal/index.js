// 递归
export const func1 = (root)=>{
    const dfs = (root,res) =>{
        if(!root) return []
        res.push(root.val);
        if (root.children) return
        for (const iterator of root.children) {
            dfs(iterator,res);
        }
    }
    const res = []
    dfs(root,res)
    return res
}

// 迭代
export const func2 = root => {
    
}