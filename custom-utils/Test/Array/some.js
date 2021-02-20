const array = require('../../Array')

const arr = [1, 2, 3, 4]

const result = array.some(arr, item => item > 5)

console.log(result)