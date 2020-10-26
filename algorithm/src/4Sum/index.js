export default function (nums, target) {
    // 所有的排列组合
    const allGroup = nums.reduce((a, b) => {
        return a.concat(a.map(item => {
            console.log(a,item)
            return item.concat(b)
        }))
    }, [[]])
    let group = allGroup.filter(group => group.length === 4)
    // 去重
    let res={}
    group.forEach(item=>{
        item.sort((a,b)=>a-b);
        res[item]=item;
    });
    group = Object.values(res)
    return group.filter(item => item.reduce((a, b) => a + b) === target)
}

// [
//     [-1, 0, 0, 1],
//     [-2, 0, 0, 2],
//     [-2, -1, 1, 2],
//     [-3, 0, 1, 2],
//     [-3, 0, 1, 2],
//     [-2, -1, 0, 3],
//     [-2, -1, 0, 3],
//     [-3, 0, 0, 3],
//     [-3, -1, 1, 3],
//     [-3, -2, 2, 3]
// ]
// [
//     [-1, 0, 0, 1],
//     [-2, 0, 0, 2],
//     [-2, -1, 1, 2],
//     [-3, 0, 1, 2],
//     [-2, -1, 0, 3],
//     [-3, 0, 0, 3],
//     [-3, -1, 1, 3],
//     [-3, -2, 2, 3],
// ]