const object = require('../../Object')

function Person() { }

const p = new Person()

console.log(object.myInstanceOf(p, Person))
console.log(object.myInstanceOf(p, Function))