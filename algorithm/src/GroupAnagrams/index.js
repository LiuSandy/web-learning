/**
 * 49. 字母异位词分组
 */
const groupAnagrams = strs => {
  const map = new Map();
  for (const str of strs) {
    const list = Array.from(str);
    list.sort();
    const mapKey = list.toString();
    const result = map.get(mapKey) ? map.get(mapKey) : new Array();
    result.push(str);
    map.set(mapKey, result)
  }
  return Array.from(map.values());
}

// 转化为数组进行排序，如果字母异位，则 toString 值相同，放到同一数组中