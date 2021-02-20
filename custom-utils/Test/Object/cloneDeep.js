const object = require('../../Object')

const obj = { x: 1, y: { a: 1 },z:[1,2,3] }

// obj.y.j = obj.z
// obj.z.push(obj.y)

const result = object.cloneDeep(obj)

result.y.a = "XXX";

console.log(obj)
console.log(result)