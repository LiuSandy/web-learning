/**
 * 477. Total Hamming Distance
 * 477. 汉明距离总和
 */
const totalHammingDistance = function (nums) {
  let count = 0, n = nums.length
  for (let i = 0; i < 30; i++) {
    let c = 0 // 1 的个数
    for (const num of nums) {
      c += (num >> i) & 1
    }
    count += c * (n - c)
  }
  return count
};

const result = totalHammingDistance([4, 14, 2])
console.log(result)