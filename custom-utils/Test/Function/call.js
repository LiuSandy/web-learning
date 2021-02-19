const fun = require('../../Function/index.js')

// call 函数测试函数
function add(a, b) {
  // console.log(this)
  return a + b + this.c
}

// 声明一个对象
let obj = {
  c: 520
}

// 添加全局的属性
global.c = 1234

// 1. 传入参数1，2 执行 call 函数 期待结果 523
console.log(fun.call(add, obj, 1, 2)) // 523
// 2. 传入参数1，2 执行call函数，第二个参数传入null， 期待结果1237
console.log(fun.call(add, null, 1, 2)) // 1237s
// 3. 传入参数1，2 不执行 call 函数 期待结果 1237
console.log(add(1, 2)) // 1237