/**
 * 290. 单词规律
 */
const wordPattern = (pattern, s) => {
  // s to Array
  const words = s.split(" ");
  if (words.length !== pattern.length) return false;
  const patternMap = new Map();
  const wordsMap = new Map();
  for (const [i, word] of words.entries()) {
    const chart = pattern[i];
    if (
      patternMap.has(chart) && patternMap.get(chart) !== word ||
      wordsMap.has(word) && wordsMap.get(word) !== chart
    ) {
      return false
    }
    patternMap.set(chart, word)
    wordsMap.set(word, chart)
  }
  return true
}