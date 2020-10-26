// 中序 左 中 右
export default root => {
    let ans = new TreeNode(0);
    let temp = ans
    const inorder = root => {
        if(!root) return
        inorder(root.left);
        temp.right = root;
        temp = root;
        root.left = null
        inorder(root.right)
    }
    inorder(root);
    return ans.right

}