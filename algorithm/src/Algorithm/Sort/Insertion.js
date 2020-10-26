export default {
    sort: function (array) {
        for (let i = 1; i < array.length; i++) {
            for (let j = i; j > 0; j--) {
                if (this.greater(array[j - 1], array[j])) {
                    this.exch(array, j - 1, j)
                } else {
                    break
                }
            }

        }
    },
    /**
     * 判断 m 是否大于 n
     */
    greater: function (m, n) {
        return m > n
    },
    /**
     * 元素替换
     * @param array 
     * @param i
     * @param j
     */
    exch: function (array, i, j) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}