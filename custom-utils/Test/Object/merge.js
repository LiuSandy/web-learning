const object = require('../../Object')

const obj1 = {
  a: [{ x: 1 }, { y: 2 }],
  b: 2,
  c: 'foo'
}

const obj2 = {
  a: [{ z: '4' }],
  b: [1, 4],
  c: 'bar',
  d: () => {
    console.log("Function")
  }
}

const result = object.merge(obj1, obj2)

console.log(result)