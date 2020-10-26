// 工具函数
/**
 * 1、列举出所有的排列组合
 * @param array 需要排列组合的数组
 * @param num   排列组合的位数
 * @returns 根据 num 返回数组中所有的排列组合,如果为 0 返回所有的
 */
export function permutationAndCombination(array, num = 0) {
    const allGroup = array.reduce((a, b) => {
        return a.concat(a.map(item => item.concat(b)))
    }, [[]])
    if (!num) {
        return allGroup
    } else {
        return allGroup.filter(group => group.length === num)
    }
}

/**
 * 2、数组求和函数
 * @param array 需要求和的函数
 */
export function sum(array) {
    return array.reduce((a, b) => a + b)
}

/**
 * 3、找到数组最大值及下标
 * @param array 需要查找的数组
 * @param index 是否需要查找下标
 * @returns true [index,max] false max
 */
export function max(array, index = false) {
    const max = Math.max.apply(null, array)
    if (!index) {
        return max
    }
    return [array.indexOf(max), max]
}

/**
 * 4、找到数组最小值及下标
 * @param array 需要查找的数组
 * @param index 是否需要查找下标
 * @returns true [index,min] false min
 */
export function min(array, index = false) {
    const min = Math.min.apply(null, array)
    if (!index) {
        return min
    }
    return [array.indexOf(min), min]
}

/**
 * 5、二维数组去重
 * @param array 需要去重的二维数组
 * @returns 去重后的二维数组
 */
export function delRepeat(array) {
    let res = {}
    arr.forEach(item => {
        item.sort((a, b) => a - b);
        res[item] = item;
    });
    return Object.values(res)
}

/**
 * 实现 python 的 range 函数
 */
export function range(start, end, step = 1) {
    let newArr = []
    for (let i = start; i < end; i++) {
        if (i % step === 0) {
            newArr.push(i)
        }
    }
    return newArr
}

export default {
    permutationAndCombination,
    sum,
    range
}