const array = require('../../Array')

const arr = [1, 2, 3, 4, 5];

const result = array.filter(arr, (item, index) => item % 2 === 0)

console.log(result)