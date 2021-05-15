/**
 * 给你一个正方形矩阵 mat，请你返回矩阵对角线元素的和。
 * 请你返回在矩阵主对角线上的元素和副对角线上且不在主对角线上元素的和。
 */

const diagonalSum = function (mat) {
  let i = mat.length - 1, j = 0, result = 0;
  let m = 0, n = 0;
  while ((i >= 0 && j < mat[0].length) || m < mat.length && n < mat[0].length) {
    if (m === i && j === n) {
      result += mat[i][j]
    } else {
      result += mat[i][j] + mat[m][n]
    }
    i -= 1
    j += 1
    m += 1
    n += 1
  }

  return result
};

// const result = diagonalSum([[1, 2, 3],
// [4, 5, 6],
// [7, 8, 9]])
// console.log(result)

/**
 * 给定一个由 4 位数字组成的数组，返回可以设置的符合 24 小时制的最大时间。
 * 24 小时格式为 "HH:MM" ，其中 HH 在 00 到 23 之间，MM 在 00 到 59 之间。
 * 最小的 24 小时制时间是 00:00 ，而最大的是 23:59 。从 00:00 （午夜）开始算起，过得越久，时间越大。
 * 以长度为 5 的字符串，按 "HH:MM" 格式返回答案。如果不能确定有效时间，则返回空字符串。
 */

const largestTimeFromDigits = function (arr) {
  let result = -1
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (i !== j) {
        for (let m = 0; m < 4; m++) {
          if (m !== i && m !== j) {
            const n = 6 - i - j - m
            const h = 10 * arr[i] + arr[j]
            const mm = 10 * arr[m] + arr[n]
            if (h < 24 && mm < 60) {
              result = Math.max(result, h * 60 + mm)
            }
          }
        }
      }
    }
  }
  const HH = `0${Math.floor(result / 60)}`.slice(-2);
  const MM = `0${result % 60}`.slice(-2);
  return result >= 0 ? `${HH}:${MM}` : "";
};

// const result = largestTimeFromDigits([1, 2, 3, 4])
// console.log(result)


/**
 * 在 x 轴上有一个一维的花园。花园长度为 n，从点 0 开始，到点 n 结束。
 * 花园里总共有 n + 1 个水龙头，分别位于 [0, 1, ..., n] 。
 * 给你一个整数 n 和一个长度为 n + 1 的整数数组 ranges ，
 * 其中 ranges[i] （下标从 0 开始）
 * 表示：如果打开点 i 处的水龙头，可以灌溉的区域为 [i -  ranges[i], i + ranges[i]] 。
 */
const minTaps = function (n, ranges) {
  const water = []
  for (let i = 0; i < ranges.length; i++) {
    water[i] = [i - ranges[i], i + ranges[i]]
  }
  let start = 0, num = 0, result = []
  for (const item of water) {
    if (item[0] <= 0 && item[1] >= n) {
      return 1
    } else if (item[0] <= start && item[1] > 0 && item[1] < n) {
      num += 1
      start = item[1]
    } else if (start >= n) {
      result.push(num)
      start = 0
      num = 0
    }
  }
  console.log(result)
  return Math.min.apply(null, result)
};

const result = minTaps(7, [1, 2, 1, 0, 2, 1, 0, 1])
console.log(result)