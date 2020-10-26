"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(nums, target) {
  if (!nums || !nums.length) {
    return null;
  }

  var leftV = nums[0];
  var rightV = nums[nums.length - 1];

  if (target <= leftV) {
    return 0;
  }

  if (target > rightV) {
    return nums.length;
  }

  if (target == rightV) {
    return nums.length - 1;
  }

  return findInsert(nums, target);
}

function findInsert(nums, target) {
  var l = 0,
      r = nums.length;

  while (l < r) {
    var mid = parseInt((l + r) / 2);

    if (target <= nums[mid]) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return l;
}