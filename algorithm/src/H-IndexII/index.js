/**
 * 275. H-Index II
 * 275. H 指数 II
 */
const hIndex = function (citations) {
  const len = citations.length;
  let left = 0, right = len - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    console.log(mid)
    if (citations[mid] >= len - mid) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return len - left
};

const result = hIndex([0, 1, 3, 5, 6])
console.log(result)