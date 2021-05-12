/**
 * 1310. XOR Queries of a Subarray
 * 1310. 子数组异或查询
 */

const xorQueries = function (arr, queries) {
  const n = queries.length
  const result = new Array(n).fill(0)
  for (let i = 0; i < queries.length; i++) {
    const [l, r] = queries[i]
    let ans = 0
    for (let index = l; index <= r; index++) {
      ans ^= arr[index]
    }
    result[i] = ans
  }
  return result
};

const result = xorQueries([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])
console.log(result)