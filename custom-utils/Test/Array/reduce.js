const array = require('../../Array')

const arr = [1, 2, 3, 4, 5];
const result = array.reduce(arr, (acc, cur) => {
  return acc + cur
})
console.log(result)

const result1 = arr.reduce((acc, cur,index) => {
  console.log(index)
  return acc + cur
},0)
console.log(result1)
