/**
 * 90. Subsets II
 */
const subsetsWithDup = function (nums) {
  const result = []
  const map = {}
  const concat = (start, path) => {
    const strKey = path.sort().toString()
    if (!map[strKey]) {
      result.push(path)
      map[strKey] = path
    }

    for (let i = start; i < nums.length; i++) {
      concat(i + 1, [...path, nums[i]])
    }
  }
  concat(0, [])

  return result
}

const result = subsetsWithDup([1, 2, 2])
console.log(result)