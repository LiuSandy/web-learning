const object = require('../../Object')

function Person(name,age){
  this.name = name;
  this.age = age;
  // return {a:1}
  return "i"
}

const newInstance = object.newInstance(Person,'aa',12)

console.log(newInstance)