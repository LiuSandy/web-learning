const Selection = {
    sort: (array) => {
        for (let i = 0; i < array.length - 2; i++) {
            let min_index = i;
            for (let j = i + 1; j < array.length; j++) {
                if (Selection.greater(array[min_index], array[j])) {
                    min_index = j
                }
            }
            Selection.exch(array, min_index, i)
        }
    },
    /**
     * 判断 m 是否大于 n
     */
    greater: (m, n) => m > n,
    /**
     * 元素替换
     * @param array 
     * @param i
     * @param j
     */
    exch: (array, i, j) => {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

export default Selection