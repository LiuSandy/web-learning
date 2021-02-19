const array = require('../../Array')

const arr = [1, 2, 3, 4, 5];
const result = array.map(arr, (item,index) => {
  console.log(index)
  return item * 10
})

console.log(result)