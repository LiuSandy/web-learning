/**
 * 551. Student Attendance Record I
 * 551. 学生出勤记录 I
 */

const checkRecordV1 = function (s) {
  let l = 0, a = 0
  for (let i = 0; i < s.length; i++) {
    const curStr = s[i]
    if (curStr === "L") {
      l++
      if (l >= 3) {
        return false
      }
    } else { l = 0 }

    if (curStr === 'A') {
      a++
      if (a >= 2) {
        return false
      }
    }
  }

  return true
};

const checkRecord = function (s) {
  const isL = s.split("LLL")
  const aNum = s.split("").reduce((acc, cur) => { if (cur === "A") { acc++ } return acc }, 0)
  return isL.length === 1 && aNum < 2
};

const result = checkRecord("PPALLP")
console.log(result)