export default function (x) {
  return x.toString() === x.toString().split("").reverse().join("");
}