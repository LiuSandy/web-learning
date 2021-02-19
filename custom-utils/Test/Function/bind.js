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

/**
 * 第一种执行方式
 * 1. 如果 obj 是 undefined | null 结果为 1237
 * 2. 否则结果为 523
 */
const fn = fun.bind(add, obj, 1, 2)
console.log(fn()) // 523

// 第二种执行方式
const fn1 = fun.bind(add, null)
console.log(fn1(1, 2)) // 1237