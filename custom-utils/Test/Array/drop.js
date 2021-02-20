const array = require('../../Array')

const arr = [1, 2, 5, 6, 7, 9]

const result1 = array.drop(arr, 2)
const result2 = array.dropRight(arr, 2)

console.log(result1)
console.log(result2)