/**
 * 649. Dota2 参议院
 * Radiant(天辉)和 Dire(夜魇)
 */
const predictPartyVictory = senate => {
  const n = senate.length;
  const radiant = [], dire = [];

  // 生成两个队列
  for (const [i, c] of Array.from(senate).entries()) {
    if (c === "R") {
      radiant.push(i)
    } else {
      dire.push(i)
    }
  }

  // 比较
  while (radiant.length && dire.length) {
    if (radiant[0] < dire[0]) {
      radiant.push(radiant[0] + n)
    } else {
      dire.push(radiant[0] + n)
    }
    radiant.shift();
    dire.shift();
  }
  return radiant.length ? "Radiant" : "Dire"
}