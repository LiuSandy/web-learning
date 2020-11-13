/**
 * Sum Root to Leaf Numbers
 */
const sumNumbers = root => {

  const handleSum = (root, prevNum) => {
    if (!root) return 0;
    const sum = prevNum * 10 + root.val;
    if (!root.left && !root.right) {
      return sum
    } else {
      return handleSum(root.left, sum) + handleSum(root.right, sum)
    }
  }
  return handleSum(root, 0)
}

console.log(a);
console.log("temp start if", temp);
var a = 1
if (a > 0) {
  var temp = 1
}
console.log("temp end if", temp);

console.log("num before for", num);
var num = 0;
for (var i = 0; i < 10; i++) {
  num = i
}
console.log("num end for", num);