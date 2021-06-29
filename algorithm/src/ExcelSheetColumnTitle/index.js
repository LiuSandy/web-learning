/**
 * 168. Excel Sheet Column Title
 * 168. Excel表列名称
 */
const convertToTitle = function (columnNumber) {
  const result = []
  while (columnNumber > 0) {
    columnNumber--;
    result.unshift(String.fromCharCode(columnNumber % 26 + 'A'.charCodeAt()));
    columnNumber = Math.floor(columnNumber / 26);
  }
  return result.join("")
}

const result = convertToTitle(28)
console.log(result)