/**
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 */
function every(arr,callback){
  for (let i = 0; i < arr.length; i++) {
    // 只要有一个为false 那么就为false
    if(!callback(arr[i],i)){
      return false
    }
  }
  return true
}

module.exports = every