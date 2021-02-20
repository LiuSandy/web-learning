const array = require('../../Array')

const arr = [1, 2, 3, 4, 5]

const result = array.pullAll(arr, [1, 3, 4, 7])
console.log(result)
console.log(arr)