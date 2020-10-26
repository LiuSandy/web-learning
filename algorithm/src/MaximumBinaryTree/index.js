export default (nums) => {
  const construct = (nums) => {
    if (!nums || nums.length) return null
    const max = Math.max(...nums)
    const tree = new TreeNode(max);
    const max_index = nums.indexOf(max);
    tree.left = construct(nums.slice(0, max_index))
    tree.right = construct(nums.slice(max_index + 1, nums.length))
    return tree
  }

  return construct(nums)
}