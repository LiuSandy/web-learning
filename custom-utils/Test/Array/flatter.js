const array = require('../../Array')

const arr = [1, 3, [4, [5, 6], 8], 7]

const result = array.flatter(arr)

console.log(result)