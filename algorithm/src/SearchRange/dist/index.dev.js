"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(nums, target) {
  if (!nums || !nums.length) {
    return [-1, -1];
  }

  var left = findIndex(nums, target, true);

  if (left === nums.length || nums[left] !== target) {
    return [-1, -1];
  }

  return [left, findIndex(nums, target, false) - 1];
}

function findIndex(nums, target, left) {
  // 使用二分法查找
  var l = 0,
      r = nums.length;

  while (l < r) {
    var mid = parseInt((l + r) / 2);

    if (nums[mid] > target || left && nums[mid] === target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return l;
}