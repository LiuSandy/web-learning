/**
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 */
function some(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    // 只要有一个为true 结果就为true
    if (callback(arr[i], i)) return true
  }
  return false
}

module.exports = some