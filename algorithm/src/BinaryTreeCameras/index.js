export default (root) => {
    const dfs = root => {
        if (!root) {
            return [Math.floor(Number.MAX_SAFE_INTEGER / 2), 0, 0];
        }
        // 左侧节点状态
        const [la, lb, lc] = dfs(root.left);
        const [ra, rb, rc] = dfs(root.right);
        const a = lc + rc + 1;
        const b = Math.min(a, Math.min(la + rb, lb + ra));
        const c = Math.min(a, lb + rb);
        return [a, b, c];
    }
    return dfs(root)[1]
}