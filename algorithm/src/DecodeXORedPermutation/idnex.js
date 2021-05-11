/**
 * 1734. Decode XORed Permutation
 * 1734. 解码异或后的排列
 * encoded[i] = perm[i] XOR perm[i + 1]
 * 由于数组 perm 是前 nn 个正整数的排列，
 * 因此数组 perm 的全部元素的异或运算结果即为从 1 到 n 的全部正整数的异或运算结果
 */
const decode = function (encoded) {
  const n = encoded.length + 1
  const perm = new Array(n).fill(0)
  let count = 0;
  for (let i = 1; i <= n; i++) {
    count ^= i
  }

  let encodedCount = 0
  for (let i = 1; i < n - 1; i += 2) {
    encodedCount ^= encoded[i];
  }

  perm[0] = count ^ encodedCount

  for (let i = 1; i < n; i++) {
    perm[i] = perm[i - 1] ^ encoded[i - 1];

  }
  return perm
};

const result = decode([3, 1])
console.log(result)