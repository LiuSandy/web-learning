// 第一次 执行 204ms 内存消耗 35.3MB
export default function (nums, target) {
  let indexList = []
  try {
    nums.forEach((num, index) => {
      const sub = target - num;
      const i = nums.findIndex(item => item === sub)
      if(i !== index){
        indexList = [index, i]
        throw new Error("ending");
      }

    });
  } catch (e) {

  }
  return indexList
};

// 第二次 执行 240ms 内存消耗 35.2MB
function towSum1 (nums, target){
  for(let i = 0;i<nums.length;i++){
    const sub = target - nums[i];
    if (nums.includes(sub) && nums.findIndex(item => item === sub) !== i){
      console.log([i,nums.findIndex(item => item === sub)])
      return [i,nums.findIndex(item => item === sub)]
    }
  }
} 

// 别人代码 
function towSum(nums, target){
  let mapping = new Map(nums.map((c, i) => [c, i]));
    for(let i =0; i < nums.length; i++){
        let result = target - nums[i];
        if(mapping.has(result) && mapping.get(result) !== i){
            return [mapping.get(result), i];
        }
    }
}
