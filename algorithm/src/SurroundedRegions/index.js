export default (board) => {
    if (!board || !board.length) {
        return
    }

    const len = board.length;
    const row = board[0].length

    function dfs(x, y) {
        if (x < 0 || x >= len || y < 0 || y >= row || board[x][y] !== 'O') {
            return null;
        }
        // 边界 O 做标记
        board[x][y] = "A"
        // 计算相邻的值 上下
        dfs(x + 1, y)
        dfs(x - 1, y)
        // 左右
        dfs(x, y + 1);
        dfs(x, y - 1);
    }

    // 左右边界
    for (let i = 0; i < len; i++) {
        dfs(i, 0)
        dfs(i, row - 1)
    }

    // 上下边界
    for (let i = 0; i < row; i++) {
        dfs(0, i)
        dfs(len - 1, i)
    }

    // 遍历
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < row; j++) {
            if (board[i][j] === 'A') {
                board[i][j] = 'O'
            } else if (board[i][j] === 'O') {
                board[i][j] = 'X'
            };
        }
    }
    return board
}