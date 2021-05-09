/**
 * 1482. 制作 m 束花所需的最少天数
 * 现需要制作 m 束花。制作花束时，需要使用花园中 相邻的 k 朵花 
 * 所以需要花的数量 > m * k
 */
const minDays = function (bloomDay, m, k) {
  if (m * k > bloomDay.length) {
    return -1
  }
  let left = Math.min.apply(null, bloomDay)
  let right = Math.max.apply(null, bloomDay)
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (canMake(bloomDay, m, k, mid)) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
};

const canMake = (bloomDay, m, k, day) => {
  let bouquets = 0, flowers = 0; // 可以制作多少束花，以及需要的花
  for (let i = 0; i < bloomDay.length && bouquets < m; i++) {
    if (bloomDay[i] <= day) {
      flowers++
      if (flowers === k) {
        bouquets++
        flowers = 0
      }
    } else {
      flowers = 0
    }

  }
  return bouquets >= m
}


const result = minDays([1, 10, 3, 10, 2], 3, 1)
console.log(result)