
export default function (nums) {
	// 多维数组
	return nums.reduce((a,b)=>{
		return a.concat(a.map(item=>item.concat(b)))
	},[[]])
	// nums = [1,2,3]
	// callback			a						b 			return value
	// first call   	[[]]    				1			[[],[1]]
	// second call  	[[],[1]]    			2			[[],[1],[2],[1,2]]
	// third call  		[[],[1],[2],[1,2]]    	3			[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
}

// 示例代码
var subsets = function (nums) {
    let res = []
    function helper(start, path) {
        res.push(path)
        for (let i = start; i < nums.length; i++) {
            helper(i + 1, [...path,nums[i]])
        }
    }
    helper(0, [])
    return res
};