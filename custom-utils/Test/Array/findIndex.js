const array = require('../../Array')

const arr = [1, 2, 3, 4, 5]

const result = array.findIndex(arr, item => item > 10)
console.log(result)