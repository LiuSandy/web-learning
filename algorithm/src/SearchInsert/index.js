export default function (nums, target) {
    if (!nums || !nums.length) {
        return null;
    }
    const leftV = nums[0];
    const rightV = nums[nums.length - 1];
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
    let l = 0, r = nums.length;
    while (l < r) {
        const mid = parseInt((l + r) / 2)
        if (target <= nums[mid]) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
}
