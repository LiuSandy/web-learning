export default (nums, k) => {
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1)
    }
    const values = []
    for (const [key, value] of map.entries()) {
        values.push([key, value])
    }

    const ret = []

    qsort(values, 0, values.length - 1, ret, 0, k)
    console.log(ret);
}

const qsort = (values, start, end, ret, retIndex, k) => {
    const picked = (parseInt(Math.random() * (end - start + 1), 10)) + start;
    exch(values, picked, start)

    const pivot = values[start][1]
    let index = start;
    for (let i = start + 1; i <= end; i++) {
        if (values[i][1] >= pivot) {
            exch(values, index + 1, i)
            index++
        }
    }
    exch(values, start, index)

    if (k <= index - start) {
        qsort(values, start, index - 1, ret, retIndex, k)
    } else {
        for (let i = start; i <= index; i++) {
            ret[retIndex++] = values[i][0]
        }
        if (k > index - start + 1) {
            qsort(values, index + 1, end, ret, retIndex, k - (index - start + 1))
        }
    }
}

const exch = (array, i, j) => {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}