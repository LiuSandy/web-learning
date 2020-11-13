/**
 * Unique Number of Occurrences
 * 
 */
const uniqueOccurrences = arr => {
  const ret = {}
  for (const item of arr) {
    ret[item] = (ret[item] || 1) + 1
  }

  const value = {}
  Object.values(ret).forEach(item => {
    value[item] = (value[item] || 1) + 1
  })

  return Object.keys(ret).length === Object.keys(value).length
}