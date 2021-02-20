function clone(target) {

  // 判断是否是对象类型
  if (target !== null && typeof target === 'object') {
    if (Array.isArray(target)) {
      return [...target]
    } else {
      return { ...target }
    }
  } else {
    return target
  }
}

function clone2(target){
  if (target !== null && typeof target === 'object') {
    // 定义容器接受数据
    let result = Array.isArray(target)?[]:{}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = target[key]        
      }
    }
    return result
  } else {
    return target
  }
}

module.exports = clone2