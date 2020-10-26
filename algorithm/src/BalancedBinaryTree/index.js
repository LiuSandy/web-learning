export default (root)=>{

    const dfs = root =>{
        if(!root) return 0;
        // 遍历左子树
        const left = dfs(root.left);
        if (left === -1) return -1;
        // 遍历右子树
        const right = dfs(root.right);
        if (right === -1) return -1;
        // 判断高度差
        if (Math.abs(left - right) < 2){
            // 高度 + 1
            return Math.max(left,right) + 1
        }
        return -1
    }

    return dfs(root) !== -1

}