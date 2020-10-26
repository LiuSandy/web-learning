export default (A) => {
    const len = A.length;
    let j = 0
    // 负数部分
    while (j < len && A[j] < 0) {
        j++
    }
    let i = j - 1;
    const result = []
    while (i >= 0 && j < len) {
        if (A[i] * A[i] < A[j] * A[j]) {
            result.push(A[i] * A[i])
            i--
        } else {
            result.push(A[j] * A[j])
            j++
        }
    }
    while (i >= 0) {
        result.push(A[i] * A[i])
        i--
    }
    while (j < len) {
        result.push(A[j] * A[j])
        j++
    }
    return result
}