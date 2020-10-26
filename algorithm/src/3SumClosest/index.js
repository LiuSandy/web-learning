export default function(nums, target){
    // 所有的排列组合
    const allGroup = nums.reduce((a,b)=>{
		return a.concat(a.map(item=>item.concat(b)))
    },[[]])
    const group = allGroup.filter(group=>group.length === 3)
    // 数组求和
    const groupSum = group.map(item=>item.reduce((a,b)=>a+b))
    // 
    const result = groupSum.map(item=>Math.abs(item-target))
    const min = Math.min.apply(null,result)
    return groupSum[result.indexOf(min)]
    
}