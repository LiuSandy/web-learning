/**
 * 692. Top K Frequent Words
 * 692. 前K个高频单词
 */
const topKFrequent = function (words, k) {
  const map = {}, set_words_arr = [...new Set(words)]
  for (const word of words) {
    map[word] = (map[word] || 0) + 1
  }
  set_words_arr.sort((a, b) => {
    return map[b] === map[a] ? a.localeCompare(b) : map[b] - map[a]
  })
  return set_words_arr.slice(0, k)
};

const result = topKFrequent(["love", "love", "leetcode", "i", "love", "coding"], 2)
console.log(result)