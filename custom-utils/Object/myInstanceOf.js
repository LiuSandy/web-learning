/**
 * 如何判断一个对象是一个构造函数的实例呢？
 * > 判断构造函数的显示原型(prototype)是否在实例的原型链(__proto__)上
 * @param {*} instance 实例
 * @param {*} Fn 原型
 */
function myInstanceOf(instance,Fn){
  // 获取实例原型
  let proto = instance.__proto__;
  // 获取函数的显示原型
  const prototype = Fn.prototype

  while (proto) {
    if (proto === prototype) {
      return true
    }
    proto =proto.__proto__
  }
  return false
}

module.exports=myInstanceOf