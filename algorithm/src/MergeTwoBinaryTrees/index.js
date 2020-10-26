export default (t1, t1) => {
    
    const merge = (t1, t2) => {
        if (!t1) return t2;
        if (!t2) return t1;
        const merged = new TreeNode(t1.val+t2.val)
        merged.left = merge(t1.left,t2.left);
        merged.right = merge(t1.right,t2.right);
        return merged
    }

    return merge(t1,t2)

}