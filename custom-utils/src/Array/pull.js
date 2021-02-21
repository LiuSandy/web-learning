/**
 * 
 * @param {Array} arr 
 * @param  {...any} args 
 */
function pull(arr,...args){
  // 定义结果数组变量
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (args.includes(arr[i])) {
      // 先向结果数组中追加
      result.push(arr[i])
      // 在原数组中删除当前元素
      arr.splice(i,1);
      // 更新索引
      i--
    }    
  }
  return result
}

module.exports = pull