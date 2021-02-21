/**
 * 翻转字符串
 */
function reverse(str){
  return str.split('').reverse().join("")
}
/**
 * 判断是否回文字符串
 */
function palindrome(str){
  return reverse(str) === str
}
/**
 * 截取字符串多余显示...
 */
function truncate(str,size){
  return str.slice(0,size)+'...'
}

module.exports = {
  reverse,
  palindrome,
  truncate
}