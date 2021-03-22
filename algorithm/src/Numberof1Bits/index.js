/**
 * 
 */

const hammingWeight = n => {
  let result = 0
  while (n) {
    n &= n - 1
    result++
  }
  return result
};

const result = hammingWeight(00000000000000000000000000001011)
console.log(result)