// Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

import { sum } from "../util";

/**
 * 子数组的长度为 K 其平均值大于等于 threshold; 
 * 平均值 = sum(子数组) / K >= threshold; 可转换为 sum(子数组) >= K * threshold
 * 所以就是求子数组和大于等于一个定值的个数
 * @param {*} arr 
 * @param {*} k 
 * @param {*} threshold 
 */
export default function (arr, k, threshold) {
  let sum = 0; // 子数组的和
  let num = 0; // 子数组的个数
  const value = k * threshold; // 定值

  if (arr.length < k) return 0;

  for (let i = 0; i < k; i++) sum += arr[i]
  if (sum >= value) num++

  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k]
    if (sum>=value) num ++
  }
  return num
}

var numsOfsubarray = function (arr, k, threshold) {
  let sums = 0; // 子数组的和
  let nums = 0; // 最后返回值，即符合条件的子数组个数
  let len = arr.length; // 数组的长度
  let target = k * threshold; // 子数组的目标和，大于等于这个值就满足条件

  // 判断边界条件, 数组的长度 < 给定的子数组的长度, 必然不符合
  if (len < k) return 0;

  // 初始子数组的和
  for (let i = 0; i < k; i++) sums += arr[i];
  // 如果初始子数组就满足条件，nums加1
  if (sums >= target) nums++;

  for (let i = k; i < len; i++) {
    // 这两步是整个算法的关键
    // 新子数组和计算，即老子数组的和减去老子数组的第一个index的值，再加上当前index的值
    // 可以理解为长度为k的窗口往后移动一位
    sums -= arr[i - k]; // i = 3, k = 3, 就是减去arr[0]
    sums += arr[i]; // 再加上arr[3]
    if (sums >= target) nums++;
  }
  return nums;
};