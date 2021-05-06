/**
 * 1720. Decode XORed Array
 * 1720. 解码异或后的数组
 * encoded[i] = arr[i] XOR arr[i + 1]
 */

const decode = function (encoded, first) {
  const result = new Array(encoded.length + 1).fill(first, 0, 1)
  for (let index = 1; index < encoded.length + 1; index++) {
    result[index] = result[index - 1] ^ encoded[index - 1]
  }
  return result
};

const result = decode([1, 2, 3], 1)
console.log(result)