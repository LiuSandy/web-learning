/**
 * 171. Excel Sheet Column Number
 * 171. Excel 表列序号
 * @重点：从后向前查询
 */
const titleToNumber = function (columnTitle) {
  let count = 0; // 统计总数
  let number = 1;
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    // 计算当前字符对应的值
    const k = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1;
    count += k * number;
    number *= 26;
  }
  return count;
};
const result = titleToNumber("BA")
console.log(result)