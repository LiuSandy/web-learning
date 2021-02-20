const array = require('../../Array')

const arr = [1, 2, 3, 4, 5]

const result = array.find(arr, item => item > 3)
console.log(result)