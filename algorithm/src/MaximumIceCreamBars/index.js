/**
 * 1833. Maximum Ice Cream Bars
 * 1833. 雪糕的最大数量
 */

const maxIceCream = function (costs, coins) {
  let count = 0
  const newCosts = costs.sort((a, b) => a - b);
  for (let i = 0; i < newCosts.length; i++) {
    const cost = newCosts[i];
    if (coins >= cost) {
      coins -= cost
      count++
    }

  }
  return count
};

const result = maxIceCream([1, 3, 2, 4, 1], 7)
console.log(result)