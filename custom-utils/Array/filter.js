/**
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 */
function filter(arr, callback) {

  let result = []
  for (let i = 0; i < arr.length; i++) {
    const res = callback(arr[i], i)
    if (res) {
      result.push(arr[i])
    }
  }
  return result
}

module.exports = filter