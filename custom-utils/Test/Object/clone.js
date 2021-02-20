const object = require('../../Object')

const obj = { x: 1, y: { a: 1 } }

const result = object.clone(obj)

result.y.a = "XXX";

console.log(obj)
console.log(result)