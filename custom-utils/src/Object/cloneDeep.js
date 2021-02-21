/**
 * 使用JSON字符串转化进行深拷贝，存在两个问题
 * 1. 函数属性不能够拷贝，属性丢失
 * 2. 循环引用报错
 * eg.
 * const obj = {
 *  a:1,
 *  b:[1,2,3],
 *  c:{x:'a'},
 * }
 * obj.b.push(obj.c)
 * obj.c.y= obj.b
 * 出错
 * @param {*} target 
 */
function cloneDeep1(target) {
  const res = JSON.stringify(target)
  return JSON.parse(res)
}

/**
 * 递归拷贝，能够解决JSON存在的函数属性问题，循环应用依然报错
 * @param {} target 
 */
function cloneDeep2(target) {
  if (target !== null && typeof target === 'object') {
    // 定义容器接受数据
    let result = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = cloneDeep(target[key])
      }
    }
    return result
  } else {
    return target
  }
}

function cloneDeep3(target, map = new Map()) {
  if (target !== null && typeof target === 'object') {
    const cache = map.get(target)
    if (cache) {
      return cache
    }
    // 定义容器接受数据
    let result = Array.isArray(target) ? [] : {};
    map.set(target, result)
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = cloneDeep(target[key], map)
      }
    }
    return result
  } else {
    return target
  }
}

function cloneDeep(target, map = new Map()) {
  if (target !== null && typeof target === 'object') {
    // 如果缓存存在使用缓存数据
    const cache = map.get(target)
    if (cache) {
      return cache
    }
    // 定义容器接受数据
    const isArray = Array.isArray(target)
    let result = isArray ? [] : {};
    // 对将要递归的数据做一次缓存
    map.set(target, result)
    if (isArray) {
      target.forEach((item,index) => {
        result[index] = cloneDeep(target[index], map)
      })
    } else {
      Object.keys(target).forEach(key => {
        result[key] = cloneDeep(target[key], map)
      })
    }
    return result
  } else {
    return target
  }
}


module.exports = cloneDeep