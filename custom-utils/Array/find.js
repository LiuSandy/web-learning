
/**
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 */
function find(arr,callback){
  for (let i = 0; i < arr.length; i++) {
    const res = callback(arr[i],i)
    if (res) {
      return arr[i]
    }
  }
  return undefined
}

module.exports=find