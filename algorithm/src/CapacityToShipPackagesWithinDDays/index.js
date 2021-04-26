/**
 * 1011. Capacity To Ship Packages Within D Days
 * 1011. 在 D 天内送达包裹的能力
 */

const shipWithinDays = function (weights, D) {
  let left = Math.max(...weights);
  let right = weights.reduce((acc, cur) => acc + cur);

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    let need = 1, cur = 0
    for (const weight of weights) {
      if (cur + weight > mid) {
        cur = 0
        need++
      }
      cur += weight
    }
    if (need > D) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left
};

const result = shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)
console.log(result)