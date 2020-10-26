class Bubble {
    /**
     * 对数组元素排序
     * @param array 要排序的数组
     * @returns void
     */
    sort(array) {
        for (let i = array.length - 1; i > 0; i--) {
            for (let j = 0; j < i; j++) {
                if (this.greater(array[j], array[j + 1])) {
                    this.exch(array, j, j + 1)
                }
            }
        }
    };

    /**
     * 判断 m 是否大于 n
     */
    greater(m, n) {
        return m > n
    }

    /**
     * 元素替换
     * @param array 
     * @param i
     * @param j
     */
    exch(array, i, j) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

export default Bubble