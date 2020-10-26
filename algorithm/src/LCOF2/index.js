export default (root, key) => {
    let ans;
    let count = k
    const dfs = (root) => {
        if (!root) return;
        dfs(root.right);
        if (!count) return 
        count -= 1
        if (!count) ans = root.val
        dfs(root.left)
    }
    dfs(root);
    return ans

}