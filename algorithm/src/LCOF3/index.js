/**
 * 剑指 Offer 26. 树的子结构
 */

export default (A, B) => {

  const isSubTree = (A, B) => {
    const recur = (A, B) => {
      if (!B) return true;
      if (!A || A.val !== B.val) return false
      return recur(A.left, B.left) && recur(A.right, B.right)
    }

    return (A !== null && B !== null) && recur(A, B) || isSubTree(A.left, B) || isSubTree(A.right, B)
  }
  return isSubTree(A, B)
}
