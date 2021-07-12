/**
 * 344. 反转字符串
 */
const reverseString = function (s) {
  if (!s || !s.length) return s;
  let left = 0, right = s.length - 1
  while (left < right) {
    const temp = s[right]
    s[right] = s[left]
    s[left] = temp
    left++
    right--
  }
  return s
};

const reverseString1 = function (s) {
  for (let left = 0, right = s.length - 1; left < right; left++, right--) {
    [s[left], s[right]] = [s[right], s[left]]
  }
  return s
};

// const result = reverseString1("hello")
// console.log(result)

/**
 * 557. 反转字符串中的单词 III
 */
const reverseWords = function (s) {
  const reverseS = (s) => {
    for (let left = 0, right = s.length - 1; left < right; left++, right--) {
      [s[left], s[right]] = [s[right], s[left]]
    }
    return s.join("")
  }
  const sArr = s.split(" ")
  const result = sArr.map(item => reverseS(item.split("")))
  return result.join(" ")
};

const result = reverseWords("Let's take LeetCode contest")
console.log(result)