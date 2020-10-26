import { sum } from "../util";

export default function (board) {
  const len = board.length
  // 行 列 左对角 右对角
  let sum_row = "";
  let sum_col = "";
  let sum_left = "";
  let sum_right = "";
  let isFull = true
  function everyString(str, char) {
    return str.split("").every(item => item === char)
  }
  for (let i = 0; i < len; i++) {
    // 初始值
    sum_row = ""; sum_col = "";
    sum_left += board[i][i];
    sum_right += board[i][len - 1 - i];
    for (let j = 0; j < len; j++) {
      sum_row += board[i][j]
      sum_col += board[j][i]
      if (board[i][j] === ' ') isFull = false
    }
    if (everyString(sum_row,'X')||everyString(sum_col,'X')) {
      return "X"
    }
    if (everyString(sum_row,'O')||everyString(sum_col,'O')) {
      return "O"
    }
  }
  if (everyString(sum_left,'X')||everyString(sum_right,'X')) {
    return "X"
  }
  if (everyString(sum_left,'O')||everyString(sum_right,'O')) {
    return "O"
  }
  if (!isFull) {
    return "Pending"
  }
  return 'Draw'
}

var tictactoe = function (board) {
  let size = 0, len = board.length, leftX = 0, rightX = 0, leftO = 0, rightO = 0;
  let rowX = Array(len).fill(0), colX = Array(len).fill(0), rowO = Array(len).fill(0), colO = Array(len).fill(0)
  for (let i = 0; i < len; i++){
      for (let j = 0; j < len; j++){
          if (board[i][j] == 'X') {
              rowX[i]++; colX[j]++;
              if (i == j) leftX++;
              if (i + j == len - 1) rightX++;
              size++;
          } else if (board[i][j] == 'O') {
              rowO[i]++; colO[j]++;
              if (i == j) leftO++;
              if (i + j == len - 1) rightO++;
              size++;
          }}}
  if (leftX == len || rightX == len) return "X";
  if (leftO == len || rightO == len) return "O";
  for (let i = 0; i < len; i++) {
      if (rowX[i] == len || colX[i] == len) return "X";
      if (rowO[i] == len || colO[i] == len) return "O";
  }
  return size == len * len ? "Draw" : "Pending";
};