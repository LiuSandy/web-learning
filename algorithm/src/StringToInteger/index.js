export default function(str){
  // 去除前后空格,正则匹配
  const num = str.trim().match(/^(-|\+)?\d+/g)
  if(num&&num.length>0){
    return Math.max(Math.min(Number(num[0]), 2 ** 31 - 1), -(2 ** 31))
  }else{
    return 0
  }  
}