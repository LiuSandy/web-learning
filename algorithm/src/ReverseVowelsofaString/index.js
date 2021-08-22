/**
 * 345. Reverse Vowels of a String
 * 345. 反转字符串中的元音字母
 */
const reverseVowels = function (s) {
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  const sArr = Array.from(s)
  const len = sArr.length
  let l = 0, r = sArr.length - 1;
  const list = ['a', 'e', 'i', 'o', 'u']
  while (l < r) {
    while (l < len && !list.includes(sArr[l].toLowerCase())) {
      l++
    }
    while (r > 0 && !list.includes(sArr[r].toLowerCase())) {
      r--
    }
    if (l < r) {
      swap(sArr, l, r)
      l++
      r--
    }
  }
  return sArr.join("")
};

const result = reverseVowels("Euston")
console.log(result)