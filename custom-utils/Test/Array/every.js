const array = require('../../Array')

const arr = [1, 2, 3, 4]

const result = array.every(arr, item => item > 0)

console.log(result)