/**
 * 划分字母区间
 */
const partitionLabels = S => {
  const map = {};
  for (let i = 0; i < S.length; i++) {
    map[S[i]] = i
  }
  const result = [];
  let start = 0; let end = 0;
  for (let i = 0; i < S.length; i++) {
    end = Math.max(end, map[S[i]])
    if (i === end) {
      result.push(end - start + 1);
      start = end + 1
    }
  }
  return result
}