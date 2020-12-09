/**
 * Z 字形变换
 * numRows 3 
 */

const convert = (s, numRows) => {
  if (numRows < 2) return s
  const list = new Array(numRows).fill("")
  let i = 0;
  let step = -1
  for (const item of s) {
    list[i] += item
    if (i === 0 || i === numRows - 1) {
      step = -step;
    }
    i += step
  }
  return list.join("");
}

export default convert