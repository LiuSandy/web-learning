/**
 * 860. 柠檬水找零
 */
const lemonadeChange = bills => {
  let five = 0, ten = 0
  for (const item of bills) {
    if (item === 5) {
      five++
    } else if (item === 10) {
      if (five < 0) {
        return false
      }
      five--;
      ten++
    } else {
      if (ten > 0 && five > 0) {
        ten--;
        five--
      } else if (five >= 3) {
        five -= 3
      } else {
        return false
      }
    }
  }
  return true
}