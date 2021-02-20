
function difference(arr1, arr2=[]) {
  if (!arr1?.length) {
    return []
  }
  if (!arr2?.length) {
    return arr1
  }

  return arr1.filter(item => !arr2.includes(item))
}

module.exports = difference