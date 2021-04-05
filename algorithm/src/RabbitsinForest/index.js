/**
 * Rabbits in Forest
 * 781. 森林中的兔子
 */
const numRabbits = function (answers) {
  const map = {};
  let result = 0;
  answers.forEach(item => {
    map[item] = (map[item] || 0) + 1
  })
  Object.keys(map).forEach(key => {
    result += (Math.ceil(map[key] / (+key + 1))) * (+key+1)
  })
  return result
};

const result = numRabbits([1, 1, 2])
console.log(result)