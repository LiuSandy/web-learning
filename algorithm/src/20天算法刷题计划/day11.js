/**
 * 77. 组合
 * 没写完
 */
const combine = function (n, k) {
  const result = []

  const dfs = (start, arr) => {
    // 如果 数组的长度 加上 剩余数的长度 小于 k 则不能构成目标数组
    if (arr.length + n - start + 1 < k) {
      return
    }

    if (arr.length === k) {
      result.push(arr)
      return
    }
    dfs(start + 1, [...arr, start])
    dfs(start + 1, arr)
  }
  dfs(1, [])
  return result
};

// const result = combine(4, 2)
// console.log(result)

/**
 * 46. 全排列
 */
const permute = function (nums) {
  if (!nums || !nums.length) return nums
  const swapIndex = (arr, i, j) => {
    /**
     * temp = arr[j]
     * arr[j] = arr[i]
     * arr[i] = temp
     */
    arr[i] = arr.splice(j, 1, arr[i])[0]
    return arr
  }

  const result = []
  const dfs = (start) => {
    if (start === nums.length) {
      result.push([...nums])
    }
    for (let i = start; i < nums.length; i++) {
      nums = swapIndex(nums, start, i)
      dfs(start + 1)
      nums = swapIndex(nums, start, i)
    }
  }
  dfs(0)
  return result
};

// const result = permute([1, 2, 3])
// console.log(result)

const letterCasePermutation = function (s) {
  const result = []
  for (const char of s) {
    const charCode = char.charCodeAt()
    if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
      if (!result.length) {
        result.push(char.toLowerCase())
        result.push(char.toUpperCase())
      } else {
        for (let i = 0; i < result.length; i += 2) {
          result.splice(i + 1, 0, result[i])
          result[i] += char.toLowerCase()
          result[i + 1] += char.toUpperCase()
        }
      }
    } else {
      if (!result.length) {
        result.push(char)
      } else {
        for (let i = 0; i < result.length; i++) {
          result[i] += char;
        }
      }
    }
  }

  return result;
};

const result = letterCasePermutation('a1b2')
console.log(result)