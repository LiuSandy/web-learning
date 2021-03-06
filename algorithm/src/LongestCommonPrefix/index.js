// 执行时间 76 ms 内存消耗 36MB
export default function (strs) {
  if (!strs.length) {
    return ""
  }
  const str = strs[0]
  if (strs.length === 1) {
    return str
  }
  let i = 0, maxPrefix = "", flag = false
  while (i < strs.length+2) {
    const strPre = str.slice(0, i)
    console.log(i,strPre,strs,strs.every(item => item.slice(0, i)===strPre));
    if (strs.every(item => item.slice(0, i)===strPre)) {
      maxPrefix = strPre
      
    }
    i++
  }

  return maxPrefix
}

// 执行时间 48 ms
var longestCommonPrefix = function(strs) {
  if(strs.length == 0) return '';
  let ans = strs[0];
  for (let i = 1; i < strs.length; i++) {
      let j = 0;
      for(; j < ans.length && j < strs[i].length; j++) {
          if (ans[j] != strs[i][j]) break;
      }
      ans = ans.substr(0, j);
      if (ans === '') return ans;
  }
  return ans;
};

var longestCommonPrefix = function(strs){
  // 特殊值判断一下
	if(!strs.length) return "";
  if(strs.length === 1) return strs[0];
  // 拆分数组
  const [first,...rest] = strs;
  
  let maxPrefix = "";
  for(let i = 1;i<first.length+1;i++){
  	const str = first.slice(0, i);
    if(rest.every(item=>item.slice(0, i) === str)){
    	maxPrefix = str
    }else{
      break
    }
  }
  return maxPrefix
}