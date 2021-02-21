/**
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 */
function findIndex(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    const res = callback(arr[i], i)
    if (res) {
      return i
    }
  }
  return -1
}

module.exports = findIndex